import React from 'react';
import { useQuery } from '@apollo/client';
import { Card, Col, Row } from 'react-bootstrap';
import { DESIGNERS } from '../Utils/constants';
import a1 from '../static/avatar1.png';
import '../css/DesignerList.css';
import ClampLines from 'react-clamp-lines';

const ProductList = () => {
  const { loading, data } = useQuery(DESIGNERS);

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <Row className="productList">
        {data.designers.map((designer, index) => {
          return (
            <Col key={index} md={{ span: 6 }}>
              <Card className="designer-card">
                <Row noGutters>
                  <Col md={{ span: 5 }}>
                    <Card.Img
                      variant="top"
                      src={a1}
                      className="designer-card-img d-flex align-items-center"
                      alt={'media available soon'}
                    />
                  </Col>
                  <Col md={{ span: 7 }}>
                    <Card.Body>
                      <Card.Title>{designer.name}</Card.Title>
                      <ClampLines
                        text={designer.background}
                        id={index}
                        lines={8}
                        ellipsis="..."
                        lessText="Collapse"
                        className="custom-class"
                        innerElement="p"
                      />
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
};

export default ProductList;
