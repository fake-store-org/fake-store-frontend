import { Form, Button, Row, Col } from "react-bootstrap";
import type { AddressRequest } from "../types/Auth";
import type { SyntheticEvent, ChangeEvent } from "react";

interface Props {
  addressData: AddressRequest;
  buttonText: string;

  setAddressData: React.Dispatch<React.SetStateAction<AddressRequest>>;
  handleSubmit: (e: SyntheticEvent) => void;
}

const AddressForm = ({
  addressData,
  setAddressData,
  handleSubmit,
  buttonText,
}: Props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleSubmit} className="address-form text-start">
      <h3 className="mb-3">Address Details</h3>

      <Row>
        <Col md={12}>
          <Form.Group className="mb-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              value={addressData?.firstName || ""}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              value={addressData?.lastName || ""}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-2">
        <Form.Label>C/O (Optional)</Form.Label>
        <Form.Control
          name="co"
          value={addressData?.co || ""}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Street Address *</Form.Label>
        <Form.Control
          name="streetName"
          value={addressData?.streetName || ""}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Street Address 2</Form.Label>
        <Form.Control
          name="streetName2"
          value={addressData?.streetName2 || ""}
          onChange={onChange}
        />
      </Form.Group>

      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Postal Code *</Form.Label>
            <Form.Control
              name="postalCode"
              value={addressData?.postalCode || ""}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>City *</Form.Label>
            <Form.Control
              name="city"
              value={addressData?.city || ""}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Country *</Form.Label>
        <Form.Control
          name="country"
          value={addressData?.country || ""}
          onChange={onChange}
          required
        />
      </Form.Group>

      <Button variant="dark" type="submit" className="address-button w-100">
        {buttonText}
      </Button>
    </Form>
  );
};

export default AddressForm;
