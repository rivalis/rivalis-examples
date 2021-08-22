import { WebSocketClient } from '@rivalis/client-browser'
import Phaser from 'phaser'
import MainScene from './MainScene'

class Game extends Phaser.Game {

    /** @type {WebSocketClient} */
    client = null

    constructor(client) {
        super({
            parent: 'game',
            width: 800,
            height: 600
        })
        this.client = client

        this.scene.add('main', new MainScene())
        this.scene.start('main')
    }

}

export default Game