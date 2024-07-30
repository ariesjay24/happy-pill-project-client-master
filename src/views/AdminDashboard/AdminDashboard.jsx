import React, { useEffect, useState } from "react";
import http from "../../lib/http";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AdminDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  useEffect(() => {
    fetchBookings();
    fetchAvailability();
  }, []);

  const fetchBookings = async () => {
    try {
      const api = http();
      const response = await api.get("/admin/bookings");
      setBookings(response.data.bookings || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings");
      setLoading(false);
    }
  };

  const fetchAvailability = async () => {
    try {
      const api = http();
      const response = await api.get("/availabilities");
      setAvailability(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching availability:", error);
      setAlert({
        show: true,
        message: "Failed to fetch availability.",
        variant: "danger",
      });
    }
  };

  const handleStatusChange = async (bookingID, status) => {
    try {
      const api = http();
      await api.put(`/admin/bookings/${bookingID}`, { Status: status });
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const handleDelete = async (bookingID) => {
    try {
      const api = http();
      await api.delete(`/admin/bookings/${bookingID}`);
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const markDateAsUnavailable = async () => {
    try {
      const api = http();
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      await api.post("/availabilities", {
        date: formattedDate,
        available: false,
      });
      fetchAvailability();
      setAlert({
        show: true,
        message: "Date marked as unavailable.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error marking date as unavailable:", error);
      setAlert({
        show: true,
        message: "Failed to mark date as unavailable.",
        variant: "danger",
      });
    }
  };

  const unmarkDateAsUnavailable = async () => {
    try {
      const api = http();
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      await api.delete(`/availabilities/${formattedDate}`);
      fetchAvailability();
      setAlert({
        show: true,
        message: "Date marked as available again.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error unmarking date as unavailable:", error);
      setAlert({
        show: true,
        message: "Failed to mark date as available again.",
        variant: "danger",
      });
    }
  };

  const isDateUnavailable = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return availability.some(
      (avail) => moment(avail.date).format("YYYY-MM-DD") === formattedDate
    );
  };

  const tileClassName = ({ date }) => {
    if (isDateUnavailable(date)) {
      return "unavailable-date";
    }
    return "";
  };

  return (
    <Container className="mt-5 admin-dashboard">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User</th>
                <th>Service</th>
                <th>Add Ons</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Status</th>
                <th>Payment Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookings) && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.BookingID}>
                    <td>{booking.BookingID}</td>
                    <td>
                      {booking.user?.FirstName} {booking.user?.LastName}
                    </td>
                    <td>{booking.ServiceName}</td>
                    <td>{booking.AddOns.join(", ")}</td>
                    <td>{booking.BookingDate}</td>
                    <td>{booking.BookingTime}</td>
                    <td>{booking.Location}</td>
                    <td>{booking.Status}</td>
                    <td>{booking.payment_status}</td>
                    <td>₱{parseFloat(booking.Price).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(booking.BookingID, "Confirmed")
                        }
                        className="me-2"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(booking.BookingID, "Pending")
                        }
                        className="me-2"
                      >
                        <FontAwesomeIcon icon={faClock} />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(booking.BookingID)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    No bookings available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
      <Row className="mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Mark Date as Unavailable</Card.Title>
              {alert.show && (
                <Alert variant={alert.variant}>{alert.message}</Alert>
              )}
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={tileClassName}
              />
              <Button
                variant="danger"
                className="mt-3"
                onClick={markDateAsUnavailable}
              >
                Mark as Unavailable
              </Button>
              <Button
                variant="success"
                className="mt-3 ms-2"
                onClick={unmarkDateAsUnavailable}
              >
                Unmark as Unavailable
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
