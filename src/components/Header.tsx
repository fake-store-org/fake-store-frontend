import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./styles/Header.css";
const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Navbar className="header">
      <Container className="d-flex flex-column">
        <Nav className="w-100 justify-content-end ">
          {!isLoggedIn && (
            <Nav.Link className="toggle-nav" as={Link} to="/login">
              Login
            </Nav.Link>
          )}
          {isLoggedIn && (
            <Nav.Link className="toggle-nav" as={Link} to="/my">
              My Account
            </Nav.Link>
          )}
        </Nav>

        <div className="w-100 d-flex justify-content-between align-items-center">
          <Navbar.Brand as={Link} className="logo-header" to="/">
            Fake Store
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/cart">
              <i className="bi bi-cart"></i>
            </Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
export default Header;
