import React from 'react'

import { Button, Form } from 'react-bootstrap'

const JoinWithUsername = ({ onJoin }) => {
    const input = React.createRef()
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nickname</Form.Label>
                <Form.Control ref={input} type="text" placeholder="Enter nickname" />
                <Form.Text className="text-muted">
                    Enter your nickname and start chatting.
                </Form.Text>
            </Form.Group>
            <Button onClick={e => {
                e.preventDefault()
                onJoin(input.current.value || null)
            }} variant="primary" type="submit">Join</Button>
        </Form>
    )

}

export default JoinWithUsername