import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
const Navi = () => {
    return(
      <div className="navbar_container">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Perfumer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/blog">Blog</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link className="justify-content-end" href="#home">Setting</Nav.Link>
            
            <Nav.Link href="/home">Log In</Nav.Link>
            <Nav.Link href="/home">Log Out</Nav.Link>
          </Nav>
          <Spinner animation="border" variant="danger" />
        </Navbar.Collapse>
       
    </Navbar>
    </div>
    )
}

export default Navi;
