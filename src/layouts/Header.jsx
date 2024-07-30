import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthenticationStatus();
    window.addEventListener("storage", checkAuthenticationStatus);
    return () => {
      window.removeEventListener("storage", checkAuthenticationStatus);
    };
  }, []);

  function checkAuthenticationStatus() {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }

  function logout() {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  }

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#193c3c" }}
      className="container-fluid"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
          <img className="Name-logo" src={Logo} alt="HP Logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ backgroundColor: "#FFCAE6" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {isAuthenticated && (
              <>
                {user?.Role === "Client" && (
                  <>
                    <Nav.Link as={Link} to="/" style={{ color: "white" }}>
                      HOME
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/gallery"
                      style={{ color: "white" }}
                    >
                      GALLERY
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/services"
                      style={{ color: "white" }}
                    >
                      SERVICES
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/bookings"
                      style={{ color: "white" }}
                    >
                      BOOKINGS
                    </Nav.Link>
                  </>
                )}
                {user?.Role === "Admin" && (
                  <>
                    <Nav.Link as={Link} to="/admin" style={{ color: "white" }}>
                      ADMIN DASHBOARD
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/admin/services"
                      style={{ color: "white" }}
                    >
                      ADMIN SERVICES
                    </Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link onClick={logout} style={{ color: "white" }}>
                Logout ({user?.FirstName} {user?.LastName})
              </Nav.Link>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  as={Link}
                  to="/login"
                  className="me-2"
                >
                  Log In
                </Button>
                <Button variant="outline-light" as={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
