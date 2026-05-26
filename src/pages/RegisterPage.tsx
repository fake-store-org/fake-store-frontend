import { useState, type SyntheticEvent } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { RegisterUserRequest } from "../types/Auth";
import { useAuth } from "../hooks/useAuth";
import type { ErrorResponse } from "../types/Error";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterUserRequest>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const handleSubmit = async (e: SyntheticEvent) => {
    if (formData.password !== formData.confirmPassword) {
      setGeneralError("Passwords don't match!");
      return;
    }
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setGeneralError("");
    try {
      await registerUser(formData);
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as ErrorResponse;
        if (errorData?.fieldErrors) {
          setFieldErrors(errorData.fieldErrors);
        } else if (errorData?.message) {
          setGeneralError(errorData.message);
        } else {
          setGeneralError("Unexpected error. Please try again later.");
        }
      } else {
        setGeneralError("Unexpected error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={6} className="text-start">
          <h2>Register</h2>
          {generalError && <Alert variant="danger">{generalError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label className="text-muted">Email</Form.Label>
              <Form.Control
                className="shadow-sm mb-2"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                isInvalid={!!fieldErrors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.email}{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="text-muted">Password</Form.Label>
              <Form.Control
                className="shadow-sm mb-2"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                isInvalid={!!fieldErrors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.password}{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label className="text-muted">Confirm Password</Form.Label>
              <Form.Control
                className="shadow-sm mb-3"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                isInvalid={!!fieldErrors.confirmPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.confirmPassword}{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="dark" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterPage;
