import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import hero_sale from "../assets/hero_sale.png";
import "./styles/Hero.css";
const Hero = () => {
  return (
    <Container fluid className="px-o">
      <Row className="justify-content-center align-items-center">
        <Col className="text-center px-0">
          <Link to="/products">
            <img src={hero_sale} alt="hero sale" className="hero-image" />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
