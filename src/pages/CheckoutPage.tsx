import type { AddressRequest, AddressResponse } from "../types/Auth";
import type {
  OrderRequest,
  CartItemRequest,
  CheckoutResponse,
} from "../types/Order";
import { useEffect, useState, type SyntheticEvent } from "react";
import AddressForm from "../components/AddressForm";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { getCart } from "../services/cartService";
import { placeOrder } from "../services/api";

const CheckoutPage = () => {
  const [addressData, setAddressData] = useState<AddressRequest>({
    firstName: "",
    lastName: "",
    co: "",
    streetName: "",
    streetName2: "",
    postalCode: "",
    city: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<Set<CartItemRequest>>(new Set());

  // Hämta varukorgen när vi landar på checkout-sidan
  useEffect(() => {
    const savedItems = getCart();
    setCartItems(savedItems);
  }, []);

  const handleAddressSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const orderPayload: OrderRequest = {
      itemRequests: Array.from(cartItems),
      addressRequest: addressData,
    };
    setLoading(true);
    setError("");
    try {
      const response = await placeOrder(orderPayload);
      window.location.href = response.stripeUrl;
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to place order";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <AddressForm
        addressData={addressData}
        setAddressData={setAddressData}
        handleSubmit={handleAddressSubmit}
      />
    </Container>
  );
};
export default CheckoutPage;
