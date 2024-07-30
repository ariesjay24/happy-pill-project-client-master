import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Toast,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import http from "../../lib/http";
import "./Login.css";
import LoginImage from "../../assets/login-image.jpg"; // Import your image here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const api = http();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      console.log("Attempting to login with POST request");
      const body = { Email, Password };
      const user = await api.post("/login", body);
      console.log(user);
      localStorage.setItem("token", user.data.token);
      localStorage.setItem("user", JSON.stringify(user.data.user));
      setSuccessMessage("Login successful!");
      setShowSuccessToast(true);
      setTimeout(() => {
        window.dispatchEvent(new Event("storage"));
        const userRole = user.data.user.Role;
        if (userRole === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (e) {
      console.log(e.response?.data?.message || "Login failed");
      setToastMessage("Login failed. Please check your credentials.");
      setShowToast(true);
    }
  }

  const toggleToast = () => setShowToast(!showToast);
  const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);

  return (
    <div className="app-container">
      <div className="login-box">
        <Row className="align-items-center justify-content-center login-row">
          <Col md={6} className="login-image-container">
            <img src={LoginImage} alt="Login" className="login-image" />
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <Card className="p-4 login-card">
              <Form onSubmit={submit}>
                <h2 className="text-center">Login</h2>
                <p className="text-center">Welcome</p>
                <Form.Group className="mb-1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="mb-1 text-center">
                  <Button className="btn-login mt-3" type="submit">
                    Login
                  </Button>
                </Form.Group>
              </Form>
              <div className="text-center mt-3">
                <p>
                  Don't have an account? <Link to="/signup">Create one</Link>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Error Toast */}
      <Toast
        show={showToast}
        onClose={toggleToast}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "red",
          color: "white",
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      {/* Success Toast */}
      <Toast
        show={showSuccessToast}
        onClose={toggleSuccessToast}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "green",
          color: "white",
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{successMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Login;
