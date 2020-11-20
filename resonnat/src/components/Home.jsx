import React, { Component, Fragment } from 'react';
import MyNavbar from './MyNavBar.jsx';
import { Switch, Route } from 'react-router-dom';
import Catalog from './Catalog.jsx';
import Access from './Access.jsx';
import { Container } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: {},
    };

    this.changePage = this.changePage.bind(this);
  }

  render() {
    return (
      <Fragment>
        <MyNavbar />
        <Switch>
          <Route exact path={['/', '/products', '/products/:id']}>
            {/* <Container fluid> */}
            <Catalog />
            {/* </Container> */}
          </Route>
          <Route path={['/login', '/register']}>
            <Access />
          </Route>
        </Switch>
      </Fragment>
    );
  }

  changePage(pageNumber) {
    this.setState({ pageNumber: pageNumber });
  }
}

export default Home;
