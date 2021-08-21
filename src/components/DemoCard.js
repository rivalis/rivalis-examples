import React from 'react'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const DemoCard = ({ title = '[YOUR TITLE HERE]', description = '[YOUR DESCRIPTION HERE]', features = [], url = '/demo' }) => (
    <Card border="secondary" style={{ width: '18rem', margin: '20px 0' }}>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
            <Card.Text>{description}</Card.Text>
            <ListGroup className="list-group-flush">
                {features.map((feature, index) => <ListGroupItem key={index}><FaCheck /> {feature}</ListGroupItem>)}
            </ListGroup>
            <Card.Text></Card.Text>
            <Link to={url}><Button color="light" variant="outline-primary">Try</Button></Link>
        </Card.Body>
    </Card>
)

export default DemoCard