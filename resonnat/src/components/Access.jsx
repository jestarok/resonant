import { Fragment } from 'react';
import { CardGroup, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import '../css/Access.css';
const { default: Registration } = require('./Registration');
const { default: Login } = require('./Login');

const Access = (props) => {
  function toggleRelay(logged) {
    props.toggleLogged(logged);
  }

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
            <Login toggleLogged={toggleRelay} />
          </Route>
        </CardGroup>
      </Col>
    </Fragment>
  );
};

export default Access;
