import {
  Container,
  Col,
  Row,
  Button,
  DropdownButton,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useState } from "react";

interface Props {
  quantity: number;
  onChangeQuantity: (newQuantity: number) => void;
}

const QuantityButton = ({ quantity, onChangeQuantity }: Props) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onChangeQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onChangeQuantity(quantity + 1);
  };
  return (
    <InputGroup style={{ maxWidth: "150px" }}>
      {/* Minus-knapp */}
      <Button
        variant="outline-secondary"
        onClick={handleDecrease}
        disabled={quantity <= 1}
      >
        -
      </Button>

      {/* Siffran i mitten - Form.Control gör att det ser ut som ett inputfält */}
      <Form.Control className="text-center" value={quantity} readOnly />

      {/* Plus-knapp */}
      <Button variant="outline-secondary" onClick={handleIncrease}>
        +
      </Button>
    </InputGroup>
  );
};

export default QuantityButton;
