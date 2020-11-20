import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Card, Col, Row } from 'react-bootstrap';
import { FURNITURES } from '../Utils/constants';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [pictureData, setPictureData] = useState('');
  const { loading, data } = useQuery(FURNITURES);

  useEffect(() => {
    let mounted = true;
    const PicureData = async () => {
      const result = await axios.get('http://localhost:5000/pictures');
      if (mounted) {
        setPictureData(result.data);
      }
    };

    PicureData();
    return () => (mounted = false);
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <Row className="productList">
        {data.furnitures.map((product, index) => {
          return (
            <Col key={index} md={{ span: 4 }}>
              <Card key={index} style={{ border: 'none', padding: '2.5vh 0' }}>
                <Link to={'/products/' + product.id}>
                  <Card.Img
                    variant="top"
                    src={
                      pictureData
                        ? pictureData.records[index].fields.Picture[0].url
                        : '#'
                    }
                    style={{
                      maxWidth: '20vw',
                      height: '20vw',
                      objectFit: 'contain',
                    }}
                    alt={'media available soon'}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Row>
                    {product.inStock ? (
                      <p className="ml-4 text-success">In Stock</p>
                    ) : (
                      <p className="ml-4 text-warning">Currently Unavailable</p>
                    )}
                    <p className="text-danger font-weight-bold ml-auto mr-4 ">
                      {product.unitCost.replace('undefined', '$')}
                    </p>
                  </Row>
                  <Card.Text className="text-justify">
                    {product.description.length > 180
                      ? product.description.slice(0, 180) + '...'
                      : product.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
};

export default ProductList;
