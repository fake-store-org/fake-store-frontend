import type { AddressRequest } from "../types/Auth";
import { useState, type SyntheticEvent } from "react";
import AddressForm from "../components/AddressForm";
import { Container, Row, Col } from "react-bootstrap";
import { updateUserAddress } from "../services/api";

const MyPage = () => {
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
    setLoading(true);
    try {
      await updateUserAddress(addressData);
    } catch {
      setError("Failed to update address. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <p>loading...</p>
  ) : error ? (
    <p className="text-danger">{error}</p>
  ) : (
    <Container>
      <Row>
        <Col xs={12}>
          <AddressForm
            addressData={addressData}
            setAddressData={setAddressData}
            handleSubmit={handleAddressSubmit}
            buttonText="Update Address"
          />
        </Col>
      </Row>
    </Container>
  );
};
export default MyPage;
