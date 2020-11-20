import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Card, Nav } from 'react-bootstrap';
import querystring from 'querystring';
import axios from 'axios';
import { LOGIN_URL } from '../Utils/constants';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEncrypted, setisEncrypted] = useState(false);
  let history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const requestBody = {
      username: username,
      password: password,
      encrypted: isEncrypted,
    };
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios
      .post(LOGIN_URL, querystring.stringify(requestBody), config)
      .then((result) => {
        if (result.data.success) {
          sessionStorage.setItem('SESSION_ID', result.data.value);
          sessionStorage.setItem('SESSION_USERNAME', result.data.user);
          props.toggleLogged(true);
          history.goBack();
        } else {
          alert('wrong username or password');
        }
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
              <Form.Check
                type="checkbox"
                label="Encrypted password?"
                onClick={(e) => setisEncrypted(!isEncrypted)}
              />
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
