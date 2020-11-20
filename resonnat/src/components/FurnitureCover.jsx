import f1 from '../static/furniture5.jpg';
import f2 from '../static/furniture6.jpg';
import f3 from '../static/furniture7.jpg';
import { Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>;
const FurnitureCover = () => {
  return (
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
    </Card>
  );
};

export default FurnitureCover;
