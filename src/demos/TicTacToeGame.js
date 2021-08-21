import React, { Component } from 'react'
import { WebSocketClient } from '@rivalis/client-browser'
import MatchMaker from '../components/MatchMaker'
import { v4 as uuid } from 'uuid'
import Game from './tic-tac-toe/Game'

class TicTacToeGame extends Component {

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
        this.client = new WebSocketClient({ baseURL: 'ws://localhost:3200' })
        // this.game = new Game(this.client)
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
        const response = await fetch('http://localhost:3200/api/room', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'tic-tac-toe' })
        })
        const { id } = await response.json()
        this.onJoin(id)
    }

    onJoin = async (roomId) => {
        const response = await fetch('http://localhost:3200/api/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomId: roomId, actorId: uuid() })
        })
        const { token } = await response.json()
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

    onStart() {
        
    }

    
    render() {
        return this.state.connected ? (<div id="game"></div>) : (<MatchMaker onJoin={this.onJoin} onCreate={this.onCreate} />)
    }

}

export default TicTacToeGame