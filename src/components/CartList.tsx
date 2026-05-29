import { ListGroup, Row, Col } from "react-bootstrap";
import type { CartItem } from "../types/Order";

interface Props {
  items: CartItem[];
}

const CartList = ({ items }: Props) => {
  if (items.length === 0) {
    return <p>Korgen är tom.</p>;
  }

  return (
    <ListGroup variant="flush">
      {Array.from(items).map((item) => (
        <ListGroup.Item key={item.product.productId}>
          <Row className="mb-3">
            <Col>
              <img
                src={item.product.image}
                alt={item.product.title}
                className="img-fluid"
              />
            </Col>
            <Col>
              <strong>Produkt:</strong> {item.product.title}
            </Col>
            <Col className="text-end">
              <strong>Antal:</strong> {item.quantity}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CartList;
