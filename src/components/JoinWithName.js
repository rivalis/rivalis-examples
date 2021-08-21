import React from 'react'

import { Button, Form } from 'react-bootstrap'

const JoinWithName = ({ onJoin }) => {
    const input = React.createRef()
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nickname</Form.Label>
                <Form.Control ref={input} type="text" placeholder="Enter name" />
                <Form.Text className="text-muted">
                    Enter your nickname and start chatting.
                </Form.Text>
            </Form.Group>
            <Button onClick={e => {
                e.preventDefault()
                let name = input.current.value || null
                if (name !== null) {
                    onJoin(name)
                }
            }} variant="primary" type="submit">Join</Button>
        </Form>
    )

}

export default JoinWithName