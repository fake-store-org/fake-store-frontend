import { Container, Col, Row } from "react-bootstrap";
import "./styles/SaleBanner.css";
const SaleBanner = () => {
  return (
    <Container fluid className="sale-container overflow-hidden px-0">
      <Row>
        <Col className="sale-col">
          <p className="sale-text">
            SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE SALE
            SALE SALE SALE SALE SALE
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SaleBanner;
