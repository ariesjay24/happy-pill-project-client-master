import React, { useState, useEffect } from "react";
import Hero from "../Home/Hero";
import "./Home.css";
import Collage1 from "../../assets/Collage1.jpg";
import Collage2 from "../../assets/Collage2.jpg";
import Collage3 from "../../assets/Collage3.jpg";
import Collage4 from "../../assets/Collage4.jpg";
import Collage5 from "../../assets/Collage5.jpg";
import Collage6 from "../../assets/Collage6.jpg";
import TImage from "../../assets/TImage.jpg";
import Invitation from "../../assets/Invitation.jpg";
import ParallaxImage from "../../assets/parallax-image.jpg";
import AboutImage from "../../assets/about-image.jpg";

const Home = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Hero />
      <div className="image-collage-wrapper">
        <div className="image-collage-container">
          <div className="text-overlay">
            <span className="normal">WHERE</span>{" "}
            <span className="bold">EVERY</span>
            <br />
            <span className="bold">PICTURE</span>{" "}
            <span className="normal">TELLS</span>
            <br />
            <span className="normal">A</span>{" "}
            <span className="bold">STORY</span>
          </div>
          <div className="image-item image1">
            <img src={Collage1} alt="Image 1" />
          </div>
          <div className="image-item image2">
            <img src={Collage2} alt="Image 2" />
          </div>
          <div className="image-item image3">
            <img src={Collage3} alt="Image 3" />
          </div>
          <div className="image-item image4">
            <img src={Collage4} alt="Image 4" />
          </div>
          <div className="image-item image5">
            <img src={Collage5} alt="Image 5" />
          </div>
          <div className="image-item image6">
            <img src={Collage6} alt="Image 6" />
          </div>
        </div>
      </div>
      <div className="testimonial-section">
        <div className="testimonial-title">
          <span className="normal">VOICES OF </span>
          <span className="bold">DELIGHT</span>
        </div>
        <div className="testimonial-content">
          <img src={TImage} alt="Alice & JBoy" className="testimonial-image" />
          <blockquote className="testimonial-quote">
            <p>
              "The Happy Pill Project captured our love in such a magical way.{" "}
              <br />
              Looking through our photos feels like reliving our special day all
              over again. <br />
              Their attention to detail and ability to capture genuine emotions
              is truly remarkable."
            </p>
            <footer className="blockquote-footer mt-5">Alice & JBoy</footer>
          </blockquote>
        </div>
      </div>
      <div className="section-container">
        <div className="image-container">
          <img src={Invitation} alt="Invitation" className="invitation" />
        </div>
        <div className="text-container">
          <h2>Crafting memories that last a lifetime</h2>
          <p className="mb-5">Let's plan your perfect day!</p>
          <blockquote className="blockquote">
            <p className="mb-5">
              "Ready to turn your vision into reality? Reach out to us <br />
              and let's start planning your unforgettable event today!"
            </p>
          </blockquote>
          <button className="btn btn-light fw-bold p-2 px-4">
            <a href="/contact" className="btn-link">
              CONTACT US
            </a>
          </button>
        </div>
      </div>
      <div className="about-page">
        <div className="parallax-container">
          <div
            className="parallax-image"
            style={{ backgroundImage: `url(${ParallaxImage})` }}
          >
            <div className="dark-overlay"></div>
            <div className="parallax-overlay">
              <h1>Happy Pill Project</h1>
            </div>
          </div>
        </div>
        <div className="about-content-container">
          <div
            className="about-image"
            style={{ backgroundImage: `url(${AboutImage})` }}
          ></div>
          <div className="about-content">
            <h2>Hi, I'm Jhun Leowin</h2>
            <h3>I'm the owner of Happy Pill Project</h3>
            <hr />
            <p>
              Happy Pill Project started in 2019 and has grown significantly
              over the years. As more clients book our services, they come to
              see Happy Pill Project as an integral part of their cherished
              memories. We are proud to be a part of your special moments,
              capturing them with the utmost care and professionalism.
            </p>
            <p>
              Our clients have consistently appreciated the wonderful services
              we offer, from wedding photography to birthday and christening
              events. Our commitment to delivering high-quality and heartfelt
              photographs has made us a trusted name in the industry.
            </p>
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-light fw-bold p-2 px-4 me-4">
                <a href="/bookings" className="btn-book">
                  Book Now
                </a>
              </button>
              <button className="btn btn-light fw-bold p-2 px-4">
                <a href="/Faq" className="btn-book">
                  About Us
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
