import React, { Component } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap/';
import Logo from '../logo.png';

class MyNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <img
          src={Logo}
          style={{ width: '12vh', height: '12vh' }}
          alt="Smiley face"
        />
        <Navbar.Brand href="/"> Resonat Marketplace</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Form inline>
            <Nav.Link href="/login">
              <Button variant="outline-success">Login</Button>
            </Nav.Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MyNavbar;
