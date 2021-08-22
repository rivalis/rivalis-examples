import React, { Component } from 'react'
import { WebSocketClient } from '@rivalis/client-browser'
import MatchMaker from '../components/MatchMaker'
import { v4 as uuid } from 'uuid'
import Game from './tic-tac-toe/Game'
import fetch from '../utils/fetch'

class TicTacToe extends Component {

    /** @type {WebSocketClient} */
    client = null

    /** @type {TicTacToe} */
    game = null

    state = {
        connected: false
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
        if (this.game !== null) {
            this.game.destroy(false, false)
        }

    }

    onCreate = async () => {
        const { data: response } = await fetch.post('/api/rooms', { type: 'tic-tac-toe' })
        const { id } = await response
        this.onJoin(id)
    }

    onJoin = async (roomId) => {
        const { data: response } = await fetch.post('/api/signin', { roomId: roomId, actorId: uuid() })
        const { token } = response
        this.client.connect(token)
        this.client.on('connect', () => this.setState({ connected: true }, () => {
            this.game = new Game(this.client)
        }))
        this.client.on('disconnect', () => this.setState({ connected: false }, () => {
            if (this.game !== null) {
                this.game.destroy(true, false)
            }
        }))   
    }
    
    render() {
        return this.state.connected ? (<div id="game"></div>) : (<MatchMaker onJoin={this.onJoin} onCreate={this.onCreate} />)
    }

}

export default TicTacToe