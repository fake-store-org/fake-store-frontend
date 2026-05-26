import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import type { ProductDTO } from "../types/Product";
import { useState, useEffect } from "react";
import { getProductById } from "../services/api";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import QuantityButton from "../components/QuantityButton";
import { addToCart } from "../services/cartService";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      setError("Something went wrong. Please try again later.");
      return;
    }
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getProductById(id!);
        setProduct(data);
      } catch {
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          <Col xs={12}>
            <h1>{product?.title}</h1>
          </Col>
          <Col className="mt-5" xs={12} md={6}>
            <img src={product?.image} alt={product?.title} />
          </Col>
          <Col>
            <Col className="mt-5" xs={12}>
              <p>{product?.description}</p>
              <p>Price: ${product?.price}</p>
            </Col>

            <Col className="mt-5 align-items-center">
              <QuantityButton
                quantity={quantity}
                onChangeQuantity={setQuantity}
              />
              <Button onClick={() => addToCart(product!, quantity)}>
                Add to Cart
              </Button>
            </Col>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default ProductDetailsPage;
