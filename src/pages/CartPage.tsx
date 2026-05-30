import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getCart, getCartForOrder, replaceCart } from "../services/cartService";
import type { AvailabilityResponse, CartItem } from "../types/Order"; // Importera rätt typ
import LoadingSpinner from "../components/LoadingSpinner";
import CartList from "../components/CartList";
import { checkStock } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCartItems = () => {
      setLoading(true);
      setError("");
      try {
        const data = getCart();
        setCartItems(data);
      } catch {
        setError("Could not load cart.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (cartItems.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before checkout.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const orderData = getCartForOrder();
      const response: AvailabilityResponse = await checkStock({
        cartItemRequests: orderData,
      });
      if (response.allAvailable) {
        navigate("/checkout", { state: { cartItems } });
      } else {
        const updatedCart: CartItem[] = cartItems.map((item) => {
          const backendUpdate = response.updatedCart.find(
            (update) => update.productId === item.product.productId,
          );
          return backendUpdate
            ? { ...item, quantity: backendUpdate.quantity }
            : item;
        });
        replaceCart(updatedCart);
        setCartItems(updatedCart);
        setErrorMessage(
          "Some items have limited stock. Cart has been updated.",
        );
      }
    } catch {
      setError("Unexpected error. Please try again later.");
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
        <Button className="button p-3 fs-3 mt-5" onClick={handleCheckout}>
          Continue to checkout
        </Button>
      </Row>
    </Container>
  );
};

export default CartPage;
