import React from 'react'
import { Container } from 'react-bootstrap'
import { getDemo } from '../config'

const DemoPage = () => {

    let id = new URLSearchParams(window.location.search).get('id')
    let demo = getDemo(id) || <>Demo {id} doesn't exist!</>
    return (
        <Container className={id}>{demo}</Container>
    )

}

export default DemoPage