import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("User context:", user);
  }, [user]);

  const createPaymentSource = async () => {
    if (!user || !user.Email || !user.FirstName || !user.LastName) {
      setError("User information is incomplete.");
      return;
    }

    const payload = {
      amount: parseInt(amount, 10),
      type: "paymaya",
      currency: "PHP",
      description: "Booking Payment",
      statement_descriptor: "HPPill",
      owner: {
        email: user.Email,
        name: `${user.FirstName} ${user.LastName}`,
      },
      redirect: {
        success: "http://localhost:5173/payment/success",
        failed: "http://localhost:5173/payment/failed",
      },
    };

    console.log("Payload being sent:", payload);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-payment-source",
        payload
      );
      console.log("Payment Source Response:", response.data);
      return response.data.source.id;
    } catch (err) {
      setError(
        `Failed to create payment source: ${
          err.response ? err.response.data.error : err.message
        }`
      );
      console.error(
        "Error creating payment source:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handlePayment = async () => {
    try {
      const sourceId = await createPaymentSource();
      if (!sourceId) {
        throw new Error("No source ID returned");
      }
      const response = await axios.post(
        `http://127.0.0.1:8000/api/bookings/1/initiate-payment`,
        {
          source: sourceId,
        }
      );
      console.log("Payment Initiate Response:", response.data);
      setSuccess("Payment initiated successfully");
      window.location.href = response.data.paymentUrl;
    } catch (err) {
      setError(
        `Failed to initiate payment: ${
          err.response ? err.response.data.error : err.message
        }`
      );
      console.error(
        "Error initiating payment:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment}>Pay Now</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Payment;
