import React from "react";
import Button from "react-bootstrap/Button";
import "./Contact.css";
import ContactImage from "../../assets/contactImage.jpg"; // Update this path to match your actual path

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-form-section">
          <div className="contact-info">
            <p>(+63) 956-970-3817</p>
            <p>undivourablejhunj@gmail.com</p>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <label>First Name*</label>
              <input type="text" placeholder="Enter Your First Name" />
            </div>
            <div className="form-group">
              <label>Last Name*</label>
              <input type="text" placeholder="Enter Your Last Name" />
            </div>
            <div className="form-group">
              <label>Email*</label>
              <input type="email" placeholder="Enter Your Email" />
            </div>
            <div className="form-group">
              <label>Subject*</label>
              <input type="text" placeholder="Enter Your Subject" />
            </div>
            <div className="form-group">
              <label>Message*</label>
              <textarea placeholder="Enter Your Message Here"></textarea>
            </div>
            <Button type="submit" className="contact-btn">
              Send
            </Button>
          </form>
        </div>
        <div className="contact-image">
          <img src={ContactImage} alt="Contact" />
        </div>
      </div>
      <div className="follow-instagram ">
        <h3>FOLLOW ME ON INSTAGRAM</h3>
        <a href="https://www.instagram.com/happypillphoto/">
          <p>@happypillphoto</p>
        </a>
      </div>
    </div>
  );
};

export default Contact;
