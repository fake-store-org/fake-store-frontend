import { Card } from "react-bootstrap";
import type { ProductDTO } from "../types/Product";
import "./styles/ProductCard.css";

interface Props {
  product: ProductDTO;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: Props) => {
  return (
    <Card
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className="card mb-3"
    >
      <Card.Img
        src={product.image}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title className="text-truncate">{product.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
