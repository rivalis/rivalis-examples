import { Navbar, Nav, Container } from "react-bootstrap"

const NavBar = () => (
    <Navbar bg="secondary" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="/">
                <img alt="rivalis" src="/logo.png" width="30" height="30" className="d-inline-block align-top" />
                Rivalis Examples
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link target="_blank" href="https://rivalis.io/docs/">Documentation</Nav.Link>
                    <Nav.Link target="_blank" href="https://github.com/rivalis">GitHub</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)

export default NavBar