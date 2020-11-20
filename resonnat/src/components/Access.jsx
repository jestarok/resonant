import { Fragment } from 'react';
import { CardGroup, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import '../css/Access.css';
const { default: Registration } = require('./Registration');
const { default: Login } = require('./Login');

const Access = () => {
  return (
    <Fragment>
      <Col
        className="access"
        md={{ span: 6, offset: 3 }}
        sm={{ span: 4, offset: 4 }}
      >
        <CardGroup>
          <Route exact path="/register">
            <Registration />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </CardGroup>
      </Col>
    </Fragment>
  );
};

export default Access;
