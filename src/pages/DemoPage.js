import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { getDemo } from '../config'

const DemoPage = () => {

    let id = new URLSearchParams(window.location.search).get('id')
    let demo = getDemo(id) || <>COMING SOON! <br /></>
    return (
        <Container className={`${id} demo-container`}>
            {demo}
            <br />
            <Row>
                <Col>
                    <a href={`https://github.com/rivalis/rivalis-examples/tree/main/server/${id}`}>
                        <img alt="check the source code" src="https://img.shields.io/badge/GITHUB-SOURCE%20CODE-red?style=for-the-badge" />
                    </a>
                </Col>
            </Row>
        </Container>
    )

}

export default DemoPage