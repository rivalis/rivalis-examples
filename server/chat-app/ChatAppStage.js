const { Stage } = require('@rivalis/core')
const chatActions = require('./chatActions')

class ChatAppStage extends Stage {

    onCreate() {
        this.use('chat', chatActions)
    }

}

module.exports = ChatAppStage