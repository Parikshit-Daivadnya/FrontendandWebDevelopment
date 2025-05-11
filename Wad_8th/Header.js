import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Student App
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Register
          </Nav.Link>
          <Nav.Link as={Link} to="/records">
            Registered Records
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
