import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./Faq.css";

const FAQ = () => {
  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What services do you offer?</Accordion.Header>
          <Accordion.Body>
            We offer a variety of photography services including wedding
            photography, birthday and christening photography, debut
            photography, and additional services and add-ons to enhance your
            experience.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How can I book a session?</Accordion.Header>
          <Accordion.Body>
            You can book a session by visiting our bookings page, selecting the
            service you are interested in, and following the prompts to complete
            your booking. If you have any questions, feel free to contact us.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>What is your pricing?</Accordion.Header>
          <Accordion.Body>
            Our pricing varies depending on the service package and add-ons you
            choose. Visit our services page for detailed information on pricing
            for each package.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Do you offer photo editing services?
          </Accordion.Header>
          <Accordion.Body>
            Yes, we offer professional photo editing services. All our packages
            include basic editing, and we also offer advanced editing as an
            add-on service.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>What is your cancellation policy?</Accordion.Header>
          <Accordion.Body>
            We understand that plans can change. If you need to cancel or
            reschedule your session, please contact us at least 48 hours in
            advance to avoid any cancellation fees.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FAQ;
