const { Actions } = require('@rivalis/core')

const chatActions = new Actions()

chatActions.handle('message', async (actor, key, data, context) => {
    context.broadcast(actor, key, data)
})

chatActions.filter('message', (actor, event, context) => {
    return actor.id === event.sender
})

module.exports = chatActions