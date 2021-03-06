import { Fragment, useState } from 'react';
import { Form, Button, Card, Nav, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';
import { REGISTER_URL } from '../Utils/constants';
import { createBrowserHistory } from 'history';

const Registration = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const requestBody = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios
      .post(REGISTER_URL, querystring.stringify(requestBody), config)
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          sessionStorage.setItem('SESSION_ID', result.data.value);
          sessionStorage.setItem('SESSION_USERNAME', result.data.user);
          props.toggleLogged(true);
          history.push('/');
        } else {
          alert("Something's gone wrong, please check again");
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <Card>
        <Card.Header>Register</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicUser">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="UserName"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Already got an account?
          <Nav.Link href="/login">
            <Button variant="outline-success">Login</Button>
          </Nav.Link>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export default Registration;
