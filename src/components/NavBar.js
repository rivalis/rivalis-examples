import { Navbar, Nav, Container } from "react-bootstrap"

const NavBar = () => (
    <Navbar bg="secondary" variant="dark">
        <Container>
            <Navbar.Brand href="/">Rivalis Examples</Navbar.Brand>
            <Nav className="justify-content-end">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link target="_blank" href="https://rivalis.io/docs/">Documentation</Nav.Link>
                <Nav.Link target="_blank" href="https://github.com/rivalis">GitHub</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
)

export default NavBar