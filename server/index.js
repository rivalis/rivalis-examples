const http = require('http')
const { v4: uuid } = require('uuid')
const express = require('express')
const { json } = require('body-parser')
const cors = require('cors')
const { Node, interfaces, Exception, Logger } = require('@rivalis/core')
const { WebSocketProtocol } = require('@rivalis/protocol-websocket')
const ChatAppStage = require('./chat-app/ChatAppStage')
const TicTacToeStage = require('./tic-tac-toe/TicTacToeStage')

const getRandomID = () => `${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`

const app = express()
const httpServer = http.createServer(app)
const websocket = new WebSocketProtocol({ server: httpServer })

const authMap = new Map()

app.use(json())
app.use(cors())
app.post('/api/signin', (request, response) => {
    const { roomId = null, actorId = null, data = {} } = request.body
    const token = uuid()
    authMap.set(token, { roomId, actorId, data })
    response.status(200).json({ token })
})

app.post('/api/room', async (request, response) => {
    const { type = null, options = {} } = request.body
    if (type === null) {
        response.status(500).json({})
        return
    }
    let roomId = getRandomID()
    let room = await node.rooms.create(roomId, type, options)
    response.status(200).json(room)
})

class CustomTokenAuth extends interfaces.AuthResolver {
    /**
     * 
     * @param {string} ticket 
     * @param {Node} node 
     */
    async onAuth(ticket, node) {
        if (!authMap.has(ticket)) {
            throw new Exception('ticket is not valid', 'invalid_ticket')
        }
        const { roomId, actorId, data } = authMap.get(ticket)
        authMap.delete(ticket)
        let room = await node.rooms.obtain(roomId)
        return room.actors.join(actorId, data)
    }
}

const node = new Node({
    auth: new CustomTokenAuth(),
    transports: [ websocket ],
    loggerLevel: Logger.LEVEL.TRACE
})

node.run().then(async () => {
    node.rooms.define('chat-app', new ChatAppStage())
    node.rooms.define('tic-tac-toe', new TicTacToeStage())

    await node.rooms.create('chat-app', 'chat-app')
})

httpServer.listen(3200, () => {
    console.log('[HTTP SERVER] listen on port 3200')
})