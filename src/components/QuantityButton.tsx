import { Button, InputGroup, Form } from "react-bootstrap";

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
      <Button
        variant="outline-secondary"
        onClick={handleDecrease}
        disabled={quantity <= 1}
      >
        -
      </Button>
      <Form.Control className="text-center" value={quantity} readOnly />
      <Button variant="outline-secondary" onClick={handleIncrease}>
        +
      </Button>
    </InputGroup>
  );
};

export default QuantityButton;
