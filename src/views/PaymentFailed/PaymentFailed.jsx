import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>Payment Failed</Alert.Heading>
        <p>Unfortunately, your payment was not successful. Please try again.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => navigate("/bookings")}
            variant="outline-danger"
          >
            Back to Bookings
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default PaymentFailed;
