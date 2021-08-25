import React, { Component } from 'react'
import Chat from '../components/Chat'
import JoinWithName from '../components/JoinWithName'
import { WebSocketClient } from '@rivalis/client-browser'
import fetch from '../utils/fetch'


class ChatApp extends Component {

    /** @type {WebSocketClient} */
    client = null

    state = {
        signed: false,
        nickname: null,
        messages: []
    }

    componentDidMount() {
        if (this.client !== null) {
            this.client.disconnect()
        }
        this.client = new WebSocketClient({ baseURL: process.env['REACT_APP_WS_URL'] })
    }

    componentWillUnmount() {
        if (this.client !== null) {
            this.client.disconnect()
        }
        this.client = null
    }

    onJoin = async (nickname) => {
        const { data: response } = await fetch.post('/api/signin', { roomId: 'chat-app', actorId: nickname })
        const { token } = response
        this.client.connect(token)
        this.client.on('connect', () => this.setState({ signed: true, nickname }))
        this.client.on('event:chat.message', event => {
            this.append(event.sender, event.data)
        })
        this.client.on('disconnect', () => {
            this.setState({
                nikcname: null,
                signed: false,
                messages: []
            })
        })
    }

    onSend = (message) => {
        this.client.send('chat.message', message)
        this.append(this.state.nickname, message)
    }

    append(sender, data) {
        let oldList = [ ...this.state.messages ]
        oldList.push({ sender: sender, data: data, date: new Date().getTime() })
        if (oldList.length > 50) {
            oldList.shift()
        }
        this.setState({ messages: oldList })
    }

    

    render() {
        return this.state.signed ? (
            <Chat title="Rivalis Chat" messages={this.state.messages} onSend={this.onSend}/>
        ) : (<JoinWithName onJoin={this.onJoin} />)
    }

}

export default ChatApp