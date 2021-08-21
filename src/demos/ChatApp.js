import React, { Component } from 'react'
import Chat from '../components/Chat'
import JoinWithName from '../components/JoinWithName'
import { WebSocketClient } from '@rivalis/client-browser'


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
        this.client = new WebSocketClient({ baseURL: 'ws://localhost:3200' })
    }

    componentWillUnmount() {
        if (this.client !== null) {
            this.client.disconnect()
        }
        this.client = null
    }

    onJoin = async (nickname) => {
        const response = await fetch('http://localhost:3200/api/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomId: 'chat-app', actorId: nickname })
        })
        const { token } = await response.json()
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
        this.setState({ messages: oldList })
    }

    

    render() {
        return this.state.signed ? (
            <Chat title="Rivalis Chat" messages={this.state.messages} onSend={this.onSend}/>
        ) : (<JoinWithName onJoin={this.onJoin} />)
    }

}

export default ChatApp