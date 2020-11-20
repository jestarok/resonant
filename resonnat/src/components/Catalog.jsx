import { Fragment } from 'react';
import Categories from './Categories';
import ProductList from './ProductList';
import DesignerList from './DesignerList';
import { Route, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { DESIGNERS } from '../Utils/constants';
import Product from './Product';
import PrivateRoute from './PrivateRoute';

const Catalog = () => {
  const { loading, error, data } = useQuery(DESIGNERS);
  let history = useHistory();

  return (
    <Fragment>
      <PrivateRoute path="/products/:id" component={Product} />
      <PrivateRoute exact path="/products" component={ProductList} />
      <PrivateRoute exact path="/designers" component={DesignerList} />
      <Route exact path="/">
        <Categories />
      </Route>
    </Fragment>
  );
};

export default Catalog;
