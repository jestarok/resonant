import { useQuery } from '@apollo/client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FURNITURES } from '../Utils/constants';
import { Fragment } from 'react';
import { Row, Card, Col, Button, Collapse, Form } from 'react-bootstrap';
import querystring from 'querystring';
import { INFO_URL } from '../Utils/constants';
import { useParams } from 'react-router-dom';

const Product = (props) => {
  const { loading, data } = useQuery(FURNITURES);
  const [pictureData, setPictureData] = useState('');
  const [showForm, setshowForm] = useState(false);
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const toggleForm = () => {
    setshowForm(!showForm);
  };

  useEffect(() => {
    const PicureData = async () => {
      const result = await axios.get('http://localhost:5000/pictures');

      setPictureData(result.data);
    };

    PicureData();
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${email}`);
    const requestBody = {
      email: email,
      product: id,
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios
      .post(INFO_URL, querystring.stringify(requestBody), config)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {});
  };

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    const product = data.furnitures.find((product) => {
      return product.id === id;
    });
    const productindex = data.furnitures.findIndex((product) => {
      return product.id === id;
    });

    return (
      <Fragment>
        <Row>
          <Col lg={{ span: 4 }}>
            <Card
              className="mt-4 mr-4 ml-4"
              style={{ border: 'none', paddingTop: '10vh' }}
            >
              <h1>{product.name}</h1>
              <Card.Title>
                {product.unitCost.replace('undefined', '$')}
              </Card.Title>
              <Card.Body>
                <p>{'Dimensions: '}</p>
                <p> {product.sizeWxLxH}</p>
                <Button variant="dark" onClick={toggleForm}>
                  More info
                </Button>
                <Collapse in={showForm}>
                  <Form className="mt-4" onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Collapse>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={{ span: 8 }} sm={{ span: 12 }}>
            <Card className="mt-4 mr-4 ml-4" style={{ border: 'none' }}>
              <Card.Img
                variant="top"
                src={
                  pictureData
                    ? pictureData.records[productindex].fields.Picture[0].url
                    : '#'
                }
                style={{
                  // maxWidth: '',
                  maxHeight: '50vh',
                  objectFit: 'contain',
                }}
                alt={'media available soon'}
              />
              {/* <img
                class="card-img-top img-fluid"
                src="http://placehold.it/900x400"
                alt=""
              /> */}
              <Card.Body>
                <p className="card-text text-justify">{product.description}</p>
              </Card.Body>
            </Card>
          </Col>

          {/* <div class="card card-outline-secondary my-4">
            <div class="card-header">Product Reviews</div>
            <div class="card-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                et enim aperiam inventore, similique necessitatibus neque non!
                Doloribus, modi sapiente laboriosam aperiam fugiat laborum.
                Sequi mollitia, necessitatibus quae sint natus.
              </p>
              <small class="text-muted">Posted by Anonymous on 3/1/17</small>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                et enim aperiam inventore, similique necessitatibus neque non!
                Doloribus, modi sapiente laboriosam aperiam fugiat laborum.
                Sequi mollitia, necessitatibus quae sint natus.
              </p>
              <small class="text-muted">Posted by Anonymous on 3/1/17</small>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                et enim aperiam inventore, similique necessitatibus neque non!
                Doloribus, modi sapiente laboriosam aperiam fugiat laborum.
                Sequi mollitia, necessitatibus quae sint natus.
              </p>
              <small class="text-muted">Posted by Anonymous on 3/1/17</small>
              <hr />
              <a href="#" class="btn btn-success">
                Leave a Review
              </a>
            </div>
          </div> */}
        </Row>
      </Fragment>
    );
  }
};

export default Product;
