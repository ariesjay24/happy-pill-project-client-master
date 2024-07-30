import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Table,
  Spinner,
  Modal,
} from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import http from "../../lib/http";
import "./Bookings.css";

const Bookings = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    userID: "",
    serviceType: "",
    bookingDate: "",
    total: 0,
    bookingTime: "",
    location: "",
    addOns: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthenticationStatus();
    window.addEventListener("storage", checkAuthenticationStatus);
    return () => {
      window.removeEventListener("storage", checkAuthenticationStatus);
    };
  }, []);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      bookingDate: selectedDate.toISOString().split("T")[0], // Update bookingDate
    }));
  }, [selectedDate]);

  useEffect(() => {
    if (user) {
      setForm((prevForm) => ({
        ...prevForm,
        userID: user.UserID || "", // Update form with userID
      }));
      fetchBookings();
      fetchServices();
      fetchAvailability();
    }
  }, [user]);

  function checkAuthenticationStatus() {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }

  const fetchServices = async () => {
    try {
      const api = http();
      const response = await api.get("/services");
      setServices(response.data.services || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to fetch services");
    }
  };

  const fetchAvailability = async () => {
    try {
      const api = http();
      const response = await api.get("/availabilities");
      setAvailability(response.data || []);
    } catch (error) {
      console.error("Error fetching availability:", error);
      setError("Failed to fetch availability");
    }
  };

  const fetchBookings = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const api = http();
      const response = await api.get("/bookings");
      const bookingsData = response.data.bookings || [];

      const parsedBookings = bookingsData
        .filter((booking) => booking.UserID === user?.UserID)
        .map((booking) => {
          let addOns = [];
          try {
            addOns = Array.isArray(booking.AddOns)
              ? booking.AddOns
              : JSON.parse(booking.AddOns || "[]");
          } catch (error) {
            console.error("Error parsing AddOns:", error);
          }
          return { ...booking, AddOns: addOns };
        });

      setBookings(parsedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prevForm) => {
        const updatedAddOns = checked
          ? [...prevForm.addOns, value]
          : prevForm.addOns.filter((addOn) => addOn !== value);
        return { ...prevForm, addOns: updatedAddOns };
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const calculateTotalPrice = () => {
    const selectedService = services.find(
      (service) => service.Name === form.serviceType
    );
    const servicePrice = selectedService
      ? parseFloat(selectedService.Price)
      : 0;
    const addOnsPrice = form.addOns.reduce((total, addOn) => {
      const addOnService = services.find((service) => service.Name === addOn);
      return total + (addOnService ? parseFloat(addOnService.Price) : 0);
    }, 0);
    const totalPrice = servicePrice + addOnsPrice;
    return totalPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Calculate the total price
      const totalPrice = calculateTotalPrice();

      // Update the form with the calculated total price
      setForm((prevForm) => ({
        ...prevForm,
        total: totalPrice,
      }));

      // Log the updated form values to the console
      console.log("Updated Form Values:", {
        ...form,
        total: totalPrice,
      });

      const api = http();
      const response = await api.post("/book", {
        ...form,
        userID: form.userID,
        bookingDate: form.bookingDate,
        total: totalPrice, // Use the calculated total price
      });

      window.location.reload();
    } catch (error) {
      console.error("Error creating booking:", error);
      setError("Failed to create booking");
    } finally {
      setLoading(true);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const api = http();
      const response = await api.post(
        `/bookings/${bookingId}/initiate-payment`
      );
      console.log(response.data);
      if (response.data.paymentUrl) {
        setPaymentUrl(response.data.paymentUrl);
        setShowPaymentModal(true);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      setError("Failed to initiate payment");
    }
  };

  const isDateAvailable = (date) => {
    return !availability.some(
      (avail) => new Date(avail.date).toDateString() === date.toDateString()
    );
  };

  return (
    <Container className="bookings-container">
      <Row>
        <Col md={6}>
          <h1>Client Details</h1>
          <hr />
          <h5 className="mb-4">Create your Booking</h5>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className="form-booking" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userID">
              <Form.Label>Account ID</Form.Label>
              <Form.Control
                type="number"
                name="userID"
                value={form.userID}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={user?.Email || ""}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="serviceType">
              <Form.Label>Service Type</Form.Label>
              <Form.Control
                as="select"
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">Select Service</option>
                {services
                  .filter((service) => !service.isAddOn)
                  .map((service) => (
                    <option key={service.ServiceID} value={service.Name}>
                      {service.Name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="addOns">
              <Form.Label>Add Ons</Form.Label>
              {services
                .filter((service) => service.isAddOn)
                .map((addOn) => (
                  <Form.Check
                    key={addOn.ServiceID}
                    type="checkbox"
                    label={`${addOn.Name} (₱${parseFloat(addOn.Price).toFixed(
                      2
                    )})`}
                    name="addOns"
                    value={addOn.Name}
                    checked={form.addOns.includes(addOn.Name)}
                    onChange={handleChange}
                  />
                ))}
            </Form.Group>

            <Form.Group className="mb-3" controlId="bookingDate">
              <Form.Label>Booking Date</Form.Label>
              <Form.Control
                type="date"
                name="bookingDate"
                value={selectedDate.toISOString().split("T")[0]} // Bind form.bookingDate to the input
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="bookingTime">
              <Form.Label>Booking Time</Form.Label>
              <Form.Control
                type="time"
                name="bookingTime"
                value={form.bookingTime}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="fs-5 mt-3">
              <strong id="totalprice">
                Total Price: ₱
                {calculateTotalPrice().toFixed(2).toLocaleString()}
              </strong>
            </div>
            <Button
              className="booking-btn mt-3"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
          </Form>
        </Col>

        <Col className="availability-section" md={6}>
          <div className="availability-title">
            <h2>Check Availability</h2>
            <h5 className="mb-4">Select a Time and Date</h5>
          </div>

          <Calendar
            className="calendar-section"
            onChange={setSelectedDate}
            value={selectedDate}
            tileDisabled={({ date }) => !isDateAvailable(date)}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Your Bookings</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User Name</th>
                <th>Service</th>
                <th>Add Ons</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookings) && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.BookingID}>
                    <td>{booking.BookingID}</td>
                    <td>{`${booking.user?.FirstName} ${booking.user?.LastName}`}</td>
                    <td>{booking.ServiceName}</td>
                    <td>{booking.AddOns.join(", ")}</td>
                    <td>
                      {new Date(booking.BookingDate).toLocaleDateString()}
                    </td>
                    <td>{booking.BookingTime}</td>
                    <td>{booking.Location}</td>
                    <td>{booking.Status}</td>
                    <td>
                      {booking.payment_status === "Paid" ? (
                        "Paid"
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handlePayment(booking.BookingID)}
                        >
                          Pay with PayPal
                        </Button>
                      )}
                    </td>
                    <td>₱{parseFloat(booking.Price).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No bookings available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your payment is being processed...</p>
          {paymentUrl && (
            <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
              Complete Payment
            </a>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Bookings;
