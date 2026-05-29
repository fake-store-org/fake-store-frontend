import Hero from "../components/Hero";
import SaleBanner from "../components/SaleBanner";
import { Col, Container, Row } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container fluid className="px-0 my-3 bg-white">
      <Row>
        <Col className="my-4">
          <SaleBanner />
        </Col>
        <Col>
          <Hero />
        </Col>
        <Col className="my-4">
          <SaleBanner />
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage;
