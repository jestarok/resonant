import { Fragment } from 'react';
import Categories from './Categories';
import ProductList from './ProductList';
import DesignerList from './DesignerList';
import { Route } from 'react-router-dom';
import Product from './Product';
import PrivateRoute from './PrivateRoute';

const Catalog = () => {
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
