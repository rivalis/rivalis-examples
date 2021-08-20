import React from 'react'

import { Button } from 'react-bootstrap'
import { ChatItem, Input } from 'react-chat-elements'

import 'react-chat-elements/dist/main.css'


const input = React.createRef() 

const Chat = ({ title = "[YOUR CHAT TITLE]", messages = [], onSend }) => {
    return (
        <div className="chat">
            <h2>{title}</h2>
            <div className="messages">
                {messages.map((message, index) => (
                    <ChatItem key={index}
                    avatar={`https://avatars.githubusercontent.com/my%20name`}
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
                multiline={true}
                rightButtons={<Button onClick={() => onSend(input.current.input.value)} color="light" variant="outline-primary">Send</Button>}
            />
            </div>
        </div>
    )
}

export default Chat