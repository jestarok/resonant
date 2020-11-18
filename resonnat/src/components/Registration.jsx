import { Fragment, useState } from 'react';
import { Form, Button, Card, Nav } from 'react-bootstrap';
import axios from 'axios';
import querystring from 'querystring';
import { REGISTER_URL } from '../Utils/constants';

const Registration = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //validateFileds()

    alert(`Submitting Name ${username}`);
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
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <Card>
        <Card.Header>Register</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicUser">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="UserName"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
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
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
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
