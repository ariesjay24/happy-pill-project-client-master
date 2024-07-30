import React from "react";
import { Carousel } from "react-bootstrap";
import banner1 from "./../../assets/banner1.jpg";
import banner2 from "./../../assets/banner2.jpg";
import banner3 from "./../../assets/banner3.jpg";
import Logo from "./../../assets/Logo.png";
import HP from "../../assets/HP.png";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="carousel-container1">
      <Carousel>
        <Carousel.Item>
          <img className="carousel-image" src={banner1} alt="First slide" />
          <div className="overlay-logo">
            <img src={Logo} alt="Happy Pill Project" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img className="carousel-image" src={banner2} alt="Second slide" />
          <div className="overlay-logo">
            <img src={HP} alt="Happy Pill Project" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img className="carousel-image" src={banner3} alt="Third slide" />
          <div className="overlay-logo">
            <img src={Logo} alt="Happy Pill Project" />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Hero;
