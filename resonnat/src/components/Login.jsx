import { Fragment, useState } from 'react';
import { Form, Button, Card, Nav } from 'react-bootstrap';
import axios from 'axios';
import querystring from 'querystring';
import { LOGIN_URL } from '../Utils/constants';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${username} Submitting pass ${password}`);
    const requestBody = {
      username: username,
      password: password,
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios
      .post(LOGIN_URL, querystring.stringify(requestBody), config)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {});
  };

  return (
    <Fragment>
      <Card>
        <Card.Header>Log in</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Are you New around?
          <Nav.Link href="/register">
            <Button variant="outline-success">Register</Button>
          </Nav.Link>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export default Login;
