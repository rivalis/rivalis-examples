// import { WebSocketClient } from '@rivalis/client-browser'
import { Scene } from 'phaser'

class MainScene extends Scene {

    /** @type {WebSocketClient} */
    client = null

    /** @type {string} */
    roomId = null

    init() {
        this.client = this.game.client
        this.client.send('lobby.ping')
        this.client.on('event:lobby.ping', event => {
            const { roomId } = event.data
            this.roomId = roomId
            console.log(roomId)
        })
    }

}

export default MainScene