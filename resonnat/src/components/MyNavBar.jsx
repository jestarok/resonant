import React, { Component, Fragment, useEffect, useState } from 'react';
import { Navbar, Nav, Form, Button, Breadcrumb } from 'react-bootstrap/';
import Logo from '../static/logo.png';
import { createBrowserHistory } from 'history';

const MyNavbar = (props) => {
  let button;
  let name;
  // let crumbs = {};
  // if (props.routes) {
  //   console.log('routes here ' + props.routes);
  //   crumbs = props.routes.map((route) => {
  //     return <Breadcrumb.Item href="/">{route}</Breadcrumb.Item>;
  //   });
  // }
  // console.log(crumbs);
  if (props.logged) {
    button = (
      <Nav.Link href="/">
        <Button variant="outline-danger" onClick={logout}>
          Logout
        </Button>
      </Nav.Link>
    );
  } else {
    button = (
      <Nav.Link href="/login">
        <Button variant="outline-success">Login</Button>
      </Nav.Link>
    );
  }

  if (sessionStorage.getItem('SESSION_USERNAME')) {
    name = (
      <Fragment>
        <h4>Welcome {sessionStorage.getItem('SESSION_USERNAME')}</h4>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar style={{ height: '10vh' }} bg="light" expand="lg">
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
            {/* <Nav.Link href="/">Home {props.logged}</Nav.Link> */}
          </Nav>
          <Form inline>
            {name}
            {button}
          </Form>
        </Navbar.Collapse>
      </Navbar>

      {/* <Breadcrumb> */}
      {/* {crumbs} */}
      {/* <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/catalog">Library</Breadcrumb.Item>
        <Breadcrumb.Item active>Product</Breadcrumb.Item>
        <Breadcrumb.Item active>Login</Breadcrumb.Item> */}
      {/* </Breadcrumb> */}
    </Fragment>
  );
};

export default MyNavbar;

function logout() {
  sessionStorage.removeItem('SESSION_ID');
  sessionStorage.removeItem('SESSION_USERNAME');
  const customHistory = createBrowserHistory();
  customHistory.push('/');
}
