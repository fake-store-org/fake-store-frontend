import { ListGroup, Row, Col } from "react-bootstrap";
import type { CartItem } from "../types/Order";
import { useNavigate } from "react-router-dom";
interface Props {
  items: CartItem[];
}

const CartList = ({ items }: Props) => {
  const navigate = useNavigate();
  if (items.length === 0) {
    return <p>Korgen är tom.</p>;
  }

  return (
    <ListGroup variant="flush">
      {Array.from(items).map((item) => (
        <ListGroup.Item key={item.product.productId}>
          <Row className="align-items-center">
            <Col>
              <img
                onClick={() => navigate(`/products/${item.product.productId}`)}
                src={item.product.image}
                alt={item.product.title}
                className="img-fluid w-50"
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col>{item.product.title}</Col>
            <Col className="text-end">
              <strong> {item.quantity}</strong>
            </Col>
            <Col>
              <strong>{item.product.price * item.quantity}$</strong>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CartList;
