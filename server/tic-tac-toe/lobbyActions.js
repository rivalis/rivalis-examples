const { Actions } = require('@rivalis/core')

const lobbyActions = new Actions()

lobbyActions.handle('ping', async (actor, key, data, context) => {
    actor.send(key, { roomId: context.id })
    const actors = await context.actors.getAll()
    if (actors.length === 2) {
        context.broadcast(context, this.rename(key, 'start'))
    }

})

module.exports = lobbyActions