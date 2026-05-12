import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getCart, replaceCart } from "../services/cartService";
import type { CartItemRequest, AvailabilityResponse } from "../types/Order"; // Importera rätt typ
import LoadingSpinner from "../components/LoadingSpinner";
import CartList from "../components/CartList";
import { checkStock } from "../services/api";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Set<CartItemRequest>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCartItems = () => {
      setLoading(true);
      setError("");
      try {
        const data = getCart(); // getCart är synkron eftersom den läser från localStorage
        setCartItems(data);
      } catch (err: any) {
        setError("Kunde inte ladda varukorgen");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const response: AvailabilityResponse = await checkStock({
        cartItemRequests: Array.from(cartItems),
      });
      if (response.allAvailable) {
        navigate("/checkout");
      } else {
        console.log(cartItems);
        console.log(response.updatedCart);
        replaceCart(new Set(response.updatedCart)); // Uppdatera localStorage med nya data
        setCartItems(new Set(response.updatedCart));
        setErrorMessage(
          "Some of your items have limited stock. Check updated cart.",
        );
      }
    } catch (err: any) {
      setError("Failed to check stock availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          {errorMessage && (
            <Alert variant="info" className="mb-2 shadow-sm">
              <i className="bi bi-info-circle-fill me-2"></i>
              {errorMessage}
            </Alert>
          )}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <CartList items={cartItems} />
          )}
        </Col>
        <Button onClick={handleCheckout}>Continue to checkout</Button>
      </Row>
    </Container>
  );
};

export default CartPage;
