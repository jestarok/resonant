import { Fragment } from 'react';
import Categories from './Categories';
import ProductList from './ProductList';
import { Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { DESIGNERS } from '../Utils/constants';
import Product from './Product';
import { Container } from 'react-bootstrap';

const Catalog = () => {
  const { loading, error, data } = useQuery(DESIGNERS);
  if (data) {
    // console.log(data.designers);
  }
  return (
    <Fragment>
      <Route path="/products/:id">
        <Product />
      </Route>
      <Route exact path="/products">
        <Container fluid className="pt5">
          <ProductList />
        </Container>
      </Route>
      <Route exact path="/">
        <Categories />
      </Route>
    </Fragment>
  );
};

export default Catalog;
