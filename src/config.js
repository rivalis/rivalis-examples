import React from 'react'
import ChatApp from './demos/ChatApp'
import TicTacToeGame from './demos/TicTacToeGame'

const map = new Map()
const demos = [
    {
        id: 'chat-app',
        title: 'Chat App',
        description: 'Simple chat application',
        features: ['sending messages']
    },
    {
        id: 'tic-tac-toe-game',
        title: 'Tic Tac Toe Game',
        description: 'Tic Tac Toe Game made with Phaser',
        features: ['state management']
    }
]


map.set('chat-app', <ChatApp />)
// map.set('tic-tac-toe-game', <TicTacToeGame />)


const getDemo = (id) => map.get(id)
export { demos, getDemo }