import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, Col, Row } from 'react-bootstrap';
import { DESIGNERS } from '../Utils/constants';
import a1 from '../static/avatar1.png';
import '../css/DesignerList.css';

const ProductList = () => {
  const { loading, data } = useQuery(DESIGNERS);

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <Row className="productList">
        {data.designers.map((designer, index) => {
          return (
            <Col key={index} md={{ span: 4 }}>
              <Card className="designer-card">
                <Card.Img
                  variant="top"
                  src={a1}
                  className="designer-card"
                  alt={'media available soon'}
                />
                <Card.Body>
                  <Card.Title>{designer.name}</Card.Title>

                  <Card.Text className="text-justify">
                    {designer.background.length > 250
                      ? designer.background.slice(0, 250) + '...'
                      : designer.background}
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
