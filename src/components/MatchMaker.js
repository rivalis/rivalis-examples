import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const MatchMaker = ({ onJoin, onCreate }) => {
    const joinInput = React.createRef()
    return (
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="create">
                    <Form.Label>Create new room</Form.Label>
                </Form.Group>
                <Button onClick={e => {
                    e.preventDefault()
                    onCreate()
                }} variant="primary" type="submit">Create</Button>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="join">
                    <Form.Label>Join existing room</Form.Label>
                    <Form.Control ref={joinInput} type="text" placeholder="Room ID" />
                    <Form.Text className="text-muted">
                        Paste a room id of already created room.
                    </Form.Text>
                </Form.Group>
                <Button onClick={e => {
                    e.preventDefault()
                    let name = joinInput.current.value || null
                    if (name !== null) {
                        onJoin(name)
                    }
                }} variant="primary" type="submit">Join</Button>
            </Col>
        </Row>
    )

}

export default MatchMaker