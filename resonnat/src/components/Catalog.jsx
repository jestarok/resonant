import { Fragment } from 'react';
import Categories from './Categories';
import ProductList from './ProductList';
import { Route, useHistory, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { DESIGNERS } from '../Utils/constants';
import Product from './Product';
import { Container } from 'react-bootstrap';

const Catalog = () => {
  const { loading, error, data } = useQuery(DESIGNERS);
  let history = useHistory();
  // if (!sessionStorage.getItem('SESSION_ID')) {
  //   history.push('/login');
  // }
  return (
    <Fragment>
      <PrivateRoute path="/products/:id" component={Product} />

      <PrivateRoute exact path="/products" component={ProductList} />
      <Route exact path="/">
        <Categories />
      </Route>
    </Fragment>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem('SESSION_ID') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default Catalog;
