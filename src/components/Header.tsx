import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./styles/Header.css";
const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Navbar className="header">
      <Container>
        <Navbar.Brand as={Link} className="logo-header" to="/">
          Fake Store
        </Navbar.Brand>
        <Nav>
          <Nav.Link className="spacer"></Nav.Link>

          <Nav.Link as={Link} to="/cart">
            <i className="bi bi-cart"></i>
          </Nav.Link>

          {!isLoggedIn && (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
          {isLoggedIn && (
            <Nav.Link as={Link} to="/my">
              My Account
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
