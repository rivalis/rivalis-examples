import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import DemoCard from '../components/DemoCard'
import { demos } from '../config'

const grid = []
for (let [index, demo] of demos.entries()) {
    if (index % 4 === 0) {
        grid.push([])
    }
    let mIndex = Math.floor(index / 4)
    grid[mIndex].push(demo)
}

const HomePage = () => (
    <Container>
        {grid.map((row, index) => (<Row key={index}>{row.map((demo, index) => (
            <Col md={3} key={index}>
                <DemoCard 
                    key={demo.id}
                    title={demo.title}
                    description={demo.description}
                    features={demo.features || []}
                    url={`/demo?id=${demo.id}`}
                />
            </Col>
        ))}</Row>))}
    </Container>
)

export default HomePage