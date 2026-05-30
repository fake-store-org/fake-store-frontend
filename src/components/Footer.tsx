import { Container, Row, Col } from "react-bootstrap";
import "./styles/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer mt-3 p-5">
      <Container>
        <Row>
          <Col>
            <p>&copy; 2023 Fake Store. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
