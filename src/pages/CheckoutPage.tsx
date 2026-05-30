import type { AddressRequest } from "../types/Auth";
import type { OrderRequest } from "../types/Order";
import { useState, type SyntheticEvent } from "react";
import AddressForm from "../components/AddressForm";
import { Container, Row, Col } from "react-bootstrap";
import { getCartForOrder } from "../services/cartService";
import { placeOrder } from "../services/api";
import CartList from "../components/CartList";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
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

  const handleAddressSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const orderData = getCartForOrder();
    const orderPayload: OrderRequest = {
      itemRequests: orderData,
      addressRequest: addressData,
    };
    setLoading(true);
    setError("");
    try {
      const response = await placeOrder(orderPayload);
      window.location.href = response.stripeUrl;
    } catch {
      setError("Failed to place order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <p>Processing your order...</p>
  ) : error ? (
    <p className="text-danger">{error}</p>
  ) : (
    <Container fluid className="mt-3 bg-light px-0">
      <Row className="justify-content-center mx-4">
        <Col xs={12} md={6} className="m-5">
          <AddressForm
            addressData={addressData}
            setAddressData={setAddressData}
            handleSubmit={handleAddressSubmit}
            buttonText="Place Order"
          />
        </Col>
        <Col xs={12} md={4} className="bg-white m-5">
          <h1>Your cart:</h1>
          <CartList items={cartItems} />
        </Col>
      </Row>
    </Container>
  );
};
export default CheckoutPage;
