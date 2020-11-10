import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './NavBar.css'


// this is a simple contact us component which is stateless functional component
const NavBar = () => {
    return (

        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect fixed='top'>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand ><h4 className="title" id="trend">TREND</h4><h4 className="title" id="init">INIT</h4></Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ml-auto">
                        <LinkContainer to="/admin" >
                            <Nav.Link >Admin</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contact" >
                            <Nav.Link >Contact</Nav.Link>
                        </LinkContainer>

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default NavBar;
