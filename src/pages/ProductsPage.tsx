import { useEffect, useState } from "react";
import { getAllProducts } from "../services/api";
import type { ProductDTO } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
    size: 0,
    number: 0,
    first: true,
    last: true,
    empty: true,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getAllProducts({
          q: searchTerm ? searchTerm : undefined,
          page: currentPage,
        });
        setProducts(data.content);
        setPageInfo(data);
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm, currentPage]);

  return (
    <Container>
      <Row xs={2} md={4}>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id}>
              <ProductCard
                product={product}
                onClick={() => navigate(`/products/${product.id}`)}
              />
            </Col>
          ))
        ) : (
          <Col>
            <p>No products found</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductsPage;
