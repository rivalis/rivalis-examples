import { WebSocketClient } from '@rivalis/client-browser'
import { Scene } from 'phaser'

class MainScene extends Scene {

    /** @type {WebSocketClient} */
    client = null

    init() {
        this.client = this.game.client
        this.client.send('lobby.ping')
    }

}

export default MainScene