import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Carousel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import http from "../../lib/http";
import "./Services.css";
import CarouselImage1 from "../../assets/services/carousel1.jpg";
import CarouselImage2 from "../../assets/services/carousel2.jpg";
import CarouselImage3 from "../../assets/services/carousel3.jpg";
import CarouselImage4 from "../../assets/services/carousel4.jpg";
import CarouselImage5 from "../../assets/services/carousel5.jpg";
import CarouselImage6 from "../../assets/services/carousel6.jpg";
import CarouselImage7 from "../../assets/services/carousel7.jpg";
import CarouselImage8 from "../../assets/services/carousel8.jpg";
import CarouselImage9 from "../../assets/services/carousel9.jpg";
import CarouselImage10 from "../../assets/services/carousel10.jpg";
import CarouselImage11 from "../../assets/services/carousel11.jpg";
import CarouselImage12 from "../../assets/services/carousel12.jpg";
import SameDayEdit from "../../assets/SDE.mp4"; // Import your video file

const Services = () => {
  const [services, setServices] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const api = http();
      const response = await api.get("/services");
      const allServices = response.data.services || [];
      const servicePackages = allServices.filter((service) => !service.isAddOn);
      const serviceAddOns = allServices.filter((service) => service.isAddOn);

      setServices(servicePackages);
      setAddOns(serviceAddOns);
      setLoading(false);
    } catch (error) {
      setError("Error fetching services");
      setLoading(false);
    }
  };

  const handleShowModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const handleBookNow = () => {
    setShowModal(false);
    navigate("/bookings", {
      state: { service: selectedService, addOns: selectedAddOns },
    });
  };

  const filterServices = (keywords) => {
    return services.filter((service) =>
      keywords.some((keyword) =>
        service.Name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  const weddingPackages = filterServices(["wedding package"]);
  const debutPackages = filterServices(["debut package"]);
  const birthdayChristeningPackages = filterServices(["b/c package"]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const formatDescriptionAsList = (description) => {
    const items = description.split("\\n");
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <Container className="services-container">
      <div className="service-title">
        <h1 className="text-center mt-4">Wedding Packages</h1>
      </div>
      <Carousel className="carousel-container mb-4">
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <Row className="mt-4">
        {weddingPackages.length > 0 ? (
          weddingPackages.map((service) => (
            <Col md={4} key={service.ServiceID} className="mb-4">
              <Card className=" h-100 mb-3">
                <Card.Body className="card-services d-flex flex-column">
                  <Card.Title>
                    <span className="badge-title fs-4 badge w-75 rounded-pill">
                      {service.Name}
                    </span>
                  </Card.Title>
                  <Card.Text className="fw-bold fs-3 package-price">
                    ₱{service.Price.toLocaleString()}
                  </Card.Text>
                  <Card.Text className="service-description flex-grow-1">
                    {formatDescriptionAsList(service.Description)}
                  </Card.Text>
                  <Button
                    className="button-services mt-auto"
                    onClick={() => handleShowModal(service)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No wedding packages available</div>
        )}
      </Row>
      <div className="service-title">
        <h1 className="text-center mt-4">Debut Packages</h1>
      </div>
      <Carousel className="carousel-container mb-4">
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage4}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage5}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage6}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <Row className="mt-4">
        {debutPackages.length > 0 ? (
          debutPackages.map((service) => (
            <Col md={4} key={service.ServiceID} className="mb-4">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    <span className="badge-title fs-4 badge w-75 rounded-pill">
                      {service.Name}
                    </span>
                  </Card.Title>{" "}
                  <Card.Text className="fw-bold fs-3 package-price">
                    ₱{service.Price.toLocaleString()}
                  </Card.Text>
                  <Card.Text className="service-description flex-grow-1">
                    {formatDescriptionAsList(service.Description)}
                  </Card.Text>
                  <Button
                    className="button-services mt-auto"
                    onClick={() => handleShowModal(service)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No debut packages available</div>
        )}
      </Row>
      <div className="service-title">
        <h1 className="text-center mt-4">Birthday & Christening Packages</h1>
      </div>
      <Carousel className="carousel-container mb-4">
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage7}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage8}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage9}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage10}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage11}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image-services"
            src={CarouselImage12}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <Row className="mt-4">
        {birthdayChristeningPackages.length > 0 ? (
          birthdayChristeningPackages.map((service) => (
            <Col md={4} key={service.ServiceID} className="mb-4">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    <span className="badge-title fs-4 badge w-75 rounded-pill">
                      {service.Name}
                    </span>
                  </Card.Title>{" "}
                  <Card.Text className="fw-bold fs-3 package-price">
                    ₱{service.Price.toLocaleString()}
                  </Card.Text>
                  <Card.Text className="service-description flex-grow-1">
                    {formatDescriptionAsList(service.Description)}
                  </Card.Text>
                  <Button
                    className="button-services mt-auto"
                    onClick={() => handleShowModal(service)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No birthday & christening packages available</div>
        )}
      </Row>

      <h3 className="text-center mt-4">Add Ons</h3>
      <Row className="mt-4">
        {addOns.length > 0 ? (
          addOns.map((addOn) => (
            <Col md={4} key={addOn.ServiceID} className="mb-4">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    <span className="badge-title fs-4 badge w-75 rounded-pill">
                      {addOn.Name}
                    </span>
                  </Card.Title>
                  <Card.Text className="fw-bold fs-3 package-price">
                    ₱{addOn.Price.toLocaleString()}
                  </Card.Text>
                  <Button
                    className="button-services mt-auto"
                    onClick={() => handleShowModal(addOn)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No add-ons available</div>
        )}
      </Row>

      <div className="text-center mt-4">
        <h2 className="video-title">Same Day Edit</h2>
        <video width="850" height="500" controls>
          <source src={SameDayEdit} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {selectedService && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header className="modal-services" closeButton>
            <Modal.Title>{selectedService.Name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-services">
            <p>
              <strong>Description:</strong>{" "}
              {formatDescriptionAsList(selectedService.Description)}
            </p>
            <p>
              <strong>Price:</strong> ₱{selectedService.Price.toLocaleString()}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="closebutton-services" onClick={handleCloseModal}>
              Close
            </Button>
            <Button className="button-services" onClick={handleBookNow}>
              Book Now
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Services;
