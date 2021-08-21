import React from 'react'

import { Button } from 'react-bootstrap'
import { ChatItem, Input } from 'react-chat-elements'

import 'react-chat-elements/dist/main.css'


const input = React.createRef() 
const messagesDiv = React.createRef()

const Chat = ({ title = "[YOUR CHAT TITLE]", messages = [], onSend }) => {

    setTimeout(() => {
        messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight
    }, 1)

    return (
        <div className="chat">
            <h2>{title}</h2>
            <div className="messages" ref={messagesDiv}>
                {messages.map((message, index) => (
                    <ChatItem key={index}
                        avatar="/person.png"
                        title={message.sender}
                        subtitle={message.data}
                        date={new Date(message.date)}
                    />
                ))}
            </div>
            <div className="send-message">
            <Input
                ref={input}
                placeholder="Type here..."
                multiline={false}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        let value = input.current.input.value
                        if (value !== '') {
                            input.current.input.value = ''
                            onSend(value)
                        }
                    }
                }}
                rightButtons={<Button onClick={() => {
                    let value = input.current.input.value
                    if (value !== '') {
                        input.current.input.value = ''
                        onSend(value)
                    }
                }} color="light" variant="outline-primary">Send</Button>}
            />
            </div>
        </div>
    )
}

export default Chat