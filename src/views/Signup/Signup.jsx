import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Toast,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import http from "../../lib/http";
import "./Signup.css";
import SignupImage from "../../assets/signup-image.jpg";

const Signup = ({ isAdmin }) => {
  const api = http();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Address, setAddress] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const passwordValidation = (password) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  async function submit(e) {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      setToastMessage("Passwords do not match.");
      setShowToast(true);
      return;
    }

    if (!passwordValidation(Password)) {
      setToastMessage(
        "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
      );
      setShowToast(true);
      return;
    }

    try {
      const body = {
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        Password,
        Role: isAdmin ? "Admin" : "Client",
        Address,
      };

      const endpoint = isAdmin ? "/register-admin" : "/register";
      await api.post(endpoint, body);

      setSuccessMessage("Registration successful!");
      setShowSuccessToast(true);

      setTimeout(() => {
        window.dispatchEvent(new Event("storage"));
        navigate("/login");
      }, 2000);
    } catch (e) {
      console.error(e.response);
      const errors = e.response?.data?.errors;
      const errorMessage = errors
        ? Object.values(errors).flat().join(", ")
        : "Registration failed. Please check your details.";
      setToastMessage(errorMessage);
      setShowToast(true);
    }
  }

  const toggleToast = () => setShowToast(!showToast);
  const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);

  return (
    <div className="app-container">
      <div className="signup-box">
        <Row className="align-items-center justify-content-center signup-row">
          <Col md={6} className="signup-image-container">
            <img src={SignupImage} alt="Signup" className="signup-image" />
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <Card className="p-4 signup-card">
              <Form onSubmit={submit}>
                <h2 className="text-center">Sign Up</h2>
                <Form.Group className="mb-1">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-1 text-center">
                  <Button
                    className="btn-signup mt-4"
                    variant="primary"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Form.Group>
              </Form>
              <p className="text-center mt-1">
                Already have an account? <Link to="/login">Login</Link>
              </p>
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

export default Signup;
