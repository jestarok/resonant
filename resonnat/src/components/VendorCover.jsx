import v1 from '../static/vendor1.jpg';
import v2 from '../static/vendor2.png';
import v3 from '../static/vendor3.jpg';
import { Card, Carousel } from 'react-bootstrap';

const VendorCover = () => {
  return (
    <Card>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={v1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={v2} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={v3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      <Card.Body>
        <Card.Title>Vendors</Card.Title>
        <Card.Text>
          We've associated with top-notch providers to bring forth the best
          deals without making any comprimises on our products quality.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default VendorCover;
