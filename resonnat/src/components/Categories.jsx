import { Card, CardDeck, Carousel } from 'react-bootstrap';
import f1 from '../static/furniture5.jpg';
import f2 from '../static/furniture6.jpg';
import f3 from '../static/furniture7.jpg';
import d1 from '../static/designer1.jpg';
import d2 from '../static/designer2.jpg';
import d3 from '../static/designer3.jpg';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { DFV_NAMES } from '../Utils/constants';
import { Fragment } from 'react';

const Categories = () => {
  const { loading, error, data } = useQuery(DFV_NAMES);
  if (data) {
    // console.log(data);
  }
  return (
    <Fragment>
      <Card>
        <Carousel>
          <Carousel.Item>
            <Link to="/products">
              <img className="d-block w-100" src={f1} alt="First slide" />
            </Link>
            <Carousel.Caption>
              <h3>Concious</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/products">
              <img className="d-block w-100" src={f2} alt="Third slide" />
            </Link>
            <Carousel.Caption>
              <h3>Modern</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/products">
              <img className="d-block w-100" src={f3} alt="Third slide" />
            </Link>
            <Carousel.Caption>
              <h3>Elegant</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Card.Body>
          <Card.Title>Furniture</Card.Title>
          <Card.Text>
            Explore our wide variety of styles and products made to fit every
            style.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {' '}
            {data
              ? data.furnitures.length + ' items found'
              : 'Browse selection'}{' '}
          </small>
        </Card.Footer>
      </Card>
      <CardDeck>
        <Card>
          <Carousel>
            <Carousel.Item>
              <Link to="/designers">
                <img className="d-block w-100" src={d1} alt="First slide" />
              </Link>
              <Carousel.Caption>
                <h3>Creative</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to="/designers">
                <img className="d-block w-100" src={d2} alt="Third slide" />
              </Link>

              <Carousel.Caption>
                <h3>Tailored</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to="/designers">
                <img className="d-block w-100" src={d3} alt="Third slide" />
              </Link>

              <Carousel.Caption>
                <h3>Innovative</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <Card.Body>
            <Card.Title>Designers</Card.Title>
            <Card.Text>
              We work with the top design profesionals to bring our custumers
              cutting edge, quality products.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              {' '}
              {data
                ? data.designers.length + ' items found'
                : 'Browse selection'}{' '}
            </small>
          </Card.Footer>
        </Card>

        <Card>
          <Carousel>
            <Carousel.Item>
              <Link to="/vendors">
                <img className="d-block w-100" src={f1} alt="First slide" />
              </Link>
              <Carousel.Caption>
                <h3>Concious</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to="/vendors">
                <img className="d-block w-100" src={f2} alt="Third slide" />
              </Link>
              <Carousel.Caption>
                <h3>Modern</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Link to="/vendors">
                <img className="d-block w-100" src={f3} alt="Third slide" />
              </Link>
              <Carousel.Caption>
                <h3>Elegant</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <Card.Body>
            <Card.Title>Vendors</Card.Title>
            <Card.Text>
              We've associated with top-notch providers to bring forth the best
              deals without making any comprimises on our products quality.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              {' '}
              {data
                ? data.vendors.length + ' items found'
                : 'Browse selection'}{' '}
            </small>
          </Card.Footer>
        </Card>
      </CardDeck>
    </Fragment>
  );
};

export default Categories;
