import d1 from '../static/designer1.jpg';
import d2 from '../static/designer2.jpg';
import d3 from '../static/designer3.jpg';
import { Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DesignerCover = () => {
  return (
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
    </Card>
  );
};

export default DesignerCover;
