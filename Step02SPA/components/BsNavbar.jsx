// src/components/BsNavbar.jsx

import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function BsNavbar() {
    return <>
        <Navbar fixed="top" expand="md" className="bg-warning mb-2">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Acorn</Navbar.Brand>
                <Navbar.Toggle aria-controls="collapseContent"/>
                <Navbar.Collapse id="collapseContent">
                    <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/study">Study</Nav.Link>
                        <Nav.Link as={NavLink} to="/play">Play</Nav.Link>
                        <Nav.Link as={NavLink} to="/members">Members</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>        
    </>
}

export default BsNavbar;