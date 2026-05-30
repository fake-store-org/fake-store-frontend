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
    <Container fluid className="px-0">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row className="align-center mt-5">
          <Col xs={12} md={6}>
            <img
              className="img-fluid w-70 mx-auto d-block"
              src={product?.image}
              alt={product?.title}
            />
          </Col>
          <Col className="px-5 mt-3" xs={12} md={6}>
            <h1 className="fw-semibold ">{product?.title}</h1>
            <p className="text-secondary small mt-0">#{product?.productId}</p>
            <p className="fs-2 fw-bold"> ${product?.price}</p>

            <QuantityButton
              quantity={quantity}
              onChangeQuantity={setQuantity}
            />
            <Button
              className="button w-100 mt-3"
              onClick={() => addToCart(product!, quantity)}
            >
              Add to Cart
            </Button>

            <p className="text-muted mt-4 fs-6">{product?.description}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default ProductDetailsPage;
