const { Stage, Context, Exception } = require('@rivalis/core')
const lobbyActions = require('./lobbyActions')

class TicTacToeStage extends Stage {

    onCreate() {
        this.use('lobby', lobbyActions)
    }

    /**
     * 
     * @param {Context} context 
     * @param {*} id 
     * @param {*} data 
     */
    async onJoin(context, id, data) {
        const counter = context.data.getCounter('players')
        const playerNo = await counter.increment()
        if (playerNo > 2) {
            throw new Exception('the room is full', 'room_full')
        }
    }

    /**
     * 
     * @param {Context} context 
     * @param {*} id 
     * @param {*} data 
     */
    async onLeave(context, id, data) {
        const counter = context.data.getCounter('players')
        const playerNo = await counter.decrement()
        if (playerNo === 0) {
            context.logger.info('destroy the room', context.id)
        }
    }

    onDispose() {

    }

}

module.exports = TicTacToeStage