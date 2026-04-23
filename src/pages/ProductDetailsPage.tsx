import { Container, Row, Col, Alert } from "react-bootstrap";
import type { ProductDTO } from "../types/Product";
import { useState, useEffect } from "react";
import { getProductById } from "../services/api";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const numericId = Number(id);
        const data = await getProductById(numericId);
        setProduct(data);
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Something went wrong";
        setError(message);
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
          <Col className="mt-5" xs={12}>
            <img src={product?.image} alt={product?.title} />
          </Col>
          <Col className="mt-5">
            <p>{product?.description}</p>
          </Col>
          <Col>
            <p>Price: ${product?.price}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default ProductDetailsPage;
