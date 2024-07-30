import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Alert variant="success">
        <Alert.Heading>Payment Successful!</Alert.Heading>
        <p>Your payment was successful. Thank you for your booking.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => navigate("/bookings")}
            variant="outline-success"
          >
            Back to Bookings
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default PaymentSuccess;
