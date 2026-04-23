import type { AddressRequest, AddressResponse } from "../types/Auth";
import { useState, type SyntheticEvent } from "react";
import AddressForm from "../components/AddressForm";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
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
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <AddressForm
            addressData={addressData}
            setAddressData={setAddressData}
            handleSubmit={handleAddressSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default MyPage;
