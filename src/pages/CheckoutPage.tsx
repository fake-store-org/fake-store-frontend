import type { AddressRequest } from "../types/Auth";
import type { OrderRequest } from "../types/Order";
import { useState, type SyntheticEvent } from "react";
import AddressForm from "../components/AddressForm";
import { Container } from "react-bootstrap";
import { getCartForOrder } from "../services/cartService";
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
