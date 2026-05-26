import { useEffect, useState } from "react";
import { getAllProducts } from "../services/api";
import type { ProductDTO } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [searchTerm] = useState("");
  const [currentPage] = useState(0);
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
      } catch {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm, currentPage]);

  return loading ? (
    <p>Loading products...</p>
  ) : error ? (
    <div>
      <p className="text-danger">{error}</p>
      {/* just to use those variables so i dont get error for now.....*/}

      <small className="text-muted">
        Sida {pageInfo.number + 1} av {pageInfo.totalPages}
      </small>
    </div>
  ) : (
    <Container className="pt-5">
      <Row xs={2} md={4}>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.productId}>
              <ProductCard
                product={product}
                onClick={() => navigate(`/products/${product.productId}`)}
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
