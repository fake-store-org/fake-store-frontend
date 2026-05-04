import { ListGroup, Row, Col } from "react-bootstrap";
import type { CartItemRequest } from "../types/Order";

interface Props {
  items: Set<CartItemRequest>;
}

const CartList = ({ items }: Props) => {
  // Om Setet är tomt (size istället för length)
  if (items.size === 0) {
    return <p>Korgen är tom.</p>;
  }

  return (
    <ListGroup variant="flush">
      {/* Vi skapar en array från Setet bara för loopen */}
      {Array.from(items).map((item) => (
        <ListGroup.Item key={item.productId}>
          <Row>
            <Col>
              <strong>Produkt:</strong> {item.productId}
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
