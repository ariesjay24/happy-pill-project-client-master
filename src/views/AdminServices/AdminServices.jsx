import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import http from "../../lib/http";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(false);
  const [service, setService] = useState({
    Name: "",
    Description: "",
    Price: 0,
    isAddOn: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const api = http();
      const response = await api.get("/services");
      setServices(response.data.services);
      setLoading(false);
    } catch (error) {
      setError("Error fetching services");
      setLoading(false);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setService({ Name: "", Description: "", Price: 0, isAddOn: false });
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setService({
      ...service,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const api = http();
      if (editMode) {
        await api.put(`/services/${service.ServiceID}`, service);
      } else {
        await api.post("/services", service);
      }
      fetchServices();
      handleClose();
    } catch (error) {
      setError("Error saving service");
    }
  };

  const handleEdit = (service) => {
    setService(service);
    setEditMode(true);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      const api = http();
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (error) {
      setError("Error deleting service");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Manage Services</h2>
      <Button onClick={handleShow}>Add New Service</Button>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Is Add-On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.ServiceID}>
                <td>{service.ServiceID}</td>
                <td>{service.Name}</td>
                <td>{service.Description}</td>
                <td>₱{service.Price.toLocaleString()}</td>
                <td>{service.isAddOn ? "Yes" : "No"}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(service)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(service.ServiceID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Edit Service" : "Add New Service"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service name"
                name="Name"
                value={service.Name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter service description"
                name="Description"
                value={service.Description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter service price"
                name="Price"
                value={service.Price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Add-On"
                name="isAddOn"
                checked={service.isAddOn}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editMode ? "Update Service" : "Add Service"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminServices;
