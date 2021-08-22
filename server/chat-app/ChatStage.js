const { Stage } = require('@rivalis/core')
const chatActions = require('./chatActions')

class ChatStage extends Stage {

    onCreate() {
        this.use('chat', chatActions)
    }

}

module.exports = ChatStage