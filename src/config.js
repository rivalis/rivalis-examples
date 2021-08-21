import React from 'react'
import ChatApp from './demos/ChatApp'

const map = new Map()
const demos = [
    {
        id: 'chat-app',
        title: 'Chat App',
        description: 'Simple chat application',
        features: ['sending messages']
    }
]


map.set('chat-app', <ChatApp />)


const getDemo = (id) => map.get(id)
export { demos, getDemo }