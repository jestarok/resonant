import React, { Component } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap/';
import Logo from '../static/logo.png';

class MyNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img
            src={Logo}
            style={{ width: '7vh', height: '7vh', marginRight: '5vh' }}
            alt="Smiley face"
          />
          Resonat Marketplace
        </Navbar.Brand>
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
