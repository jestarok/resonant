import React, { Component, Fragment } from 'react';
import MyNavbar from './MyNavBar.jsx';
import { Switch, Route } from 'react-router-dom';
import Catalog from './Catalog.jsx';
import Access from './Access.jsx';
import { Card } from 'react-bootstrap';
import '../css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: {},
      logged: sessionStorage.getItem('SESSION_ID') ? true : false,
      routes: ['Home'],
    };

    this.changePage = this.changePage.bind(this);
    this.toggleLogged = this.toggleLogged.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
  }

  componentDidMount() {
    this.setState({ routes: ['Home'] });
  }
  render() {
    return (
      <Fragment>
        <MyNavbar logged={this.state.logged} routes={this.state.routes} />
        <Card.Body style={{ minHeight: '77vh', padding: '0' }}>
          <Switch>
            <Route
              exact
              path={['/', '/products', '/designers', '/products/:id']}
            >
              <Catalog
                changeRoute={this.changeRoute}
                toggleLogged={this.toggleLogged}
              />
            </Route>
            <Route path={['/login', '/register']}>
              <Access
                changeRoute={this.changeRoute}
                toggleLogged={this.toggleLogged}
              />
            </Route>
          </Switch>
        </Card.Body>
        <Card.Footer
          className="text-muted"
          style={{
            height: '8vh',
            fontFamily: 'Herr Von Muellerhoff',
            fontSize: '3vh',
            fontWeight: 'bold',
          }}
        >
          Jesús Henríquez
        </Card.Footer>
      </Fragment>
    );
  }

  changePage(pageNumber) {
    this.setState({ pageNumber: pageNumber });
  }

  changeRoute(route) {
    console.log('changing route');
    let updated;
    if (route.action === 'add') {
      updated = this.state.routes.push(route.value);
      console.log('update ' + updated);
      this.setState({ routes: updated });
    } else if (route.action === 'add') {
      console.log('remove route');
      updated = this.state.routes.remove(route.value);
      this.setState({ routes: updated });
    }
  }

  toggleLogged(logged) {
    console.log('toggled');
    this.setState({ logged });
    console.log(this.state.logged);
  }
}

export default Home;
