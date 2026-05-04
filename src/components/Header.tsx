import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Navbar className="bg-light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Fake Store
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>
        </Nav>

        <NavDropdown title="" align="end">
          {!isLoggedIn && (
            <NavDropdown.Item as={Link} to="/login">
              Login
            </NavDropdown.Item>
          )}
          {isLoggedIn && (
            <NavDropdown.Item as={Link} to="/my">
              My Account
            </NavDropdown.Item>
          )}
          <NavDropdown.Item as={Link} to="/products">
            Products
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};
export default Header;
