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
      logged: sessionStorage.getItem('SESSION_ID') ? true : false,
    };

    this.changePage = this.changePage.bind(this);
    this.toggleLogged = this.toggleLogged.bind(this);
  }

  render() {
    return (
      <Fragment>
        <MyNavbar logged={this.state.logged} />
        <Switch>
          <Route exact path={['/', '/products', '/products/:id']}>
            {/* <Container fluid> */}
            <Catalog toggleLogged={this.toggleLogged} />
            {/* </Container> */}
          </Route>
          <Route path={['/login', '/register']}>
            <Access toggleLogged={this.toggleLogged} />
          </Route>
        </Switch>
      </Fragment>
    );
  }

  changePage(pageNumber) {
    this.setState({ pageNumber: pageNumber });
  }

  toggleLogged(logged) {
    console.log('toggled');
    this.setState({ logged });
    console.log(this.state.logged);
  }
}

export default Home;
