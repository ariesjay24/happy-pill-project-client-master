import React, { useState } from "react";
import "./Gallery.css";
import { Modal } from "react-bootstrap";
import Img1 from "../../assets/wedding1.jpg";
import Img2 from "../../assets/wedding2.jpg";
import Img3 from "../../assets/wedding3.jpg";
import Img4 from "../../assets/wedding4.jpg";
import Img5 from "../../assets/birthday1.jpg";
import Img6 from "../../assets/birthday2.jpg";
import Img7 from "../../assets/birthday3.jpg";
import Img8 from "../../assets/birthday4.jpg";
import ModalImg1 from "../../assets/gallery/modal1.jpg";
import ModalImg2 from "../../assets/gallery/modal2.jpg";
import ModalImg3 from "../../assets/gallery/modal3.jpg";
import ModalImg4 from "../../assets/gallery/modal4.jpg";
import ModalImg5 from "../../assets/gallery/modal5.jpg";
import ModalImg6 from "../../assets/gallery/modal6.jpg";
import ModalImg7 from "../../assets/gallery/modal7.jpg";
import ModalImg8 from "../../assets/gallery/modal8.jpg";
import ModalImg9 from "../../assets/gallery/modal9.jpg";
import ModalImg10 from "../../assets/gallery/modal10.jpg";
import ModalImg11 from "../../assets/gallery/modal11.jpg";
import ModalImg12 from "../../assets/gallery/modal12.jpg";
import ModalImg13 from "../../assets/gallery/modal13.jpg";
import ModalImg14 from "../../assets/gallery/modal14.jpg";
import ModalImg15 from "../../assets/gallery/modal15.jpg";
import ModalImg16 from "../../assets/gallery/modal16.jpg";
import ModalImg17 from "../../assets/gallery/modal17.jpg";
import ModalImg18 from "../../assets/gallery/modal18.jpg";
import ModalImg19 from "../../assets/gallery/modal19.jpg";
import ModalImg20 from "../../assets/gallery/modal20.jpg";
import ModalImg21 from "../../assets/gallery/modal21.jpg";
import ModalImg22 from "../../assets/gallery/modal22.jpg";
import ModalImg23 from "../../assets/gallery/modal23.jpg";
import ModalImg24 from "../../assets/gallery/modal24.jpg";
import ModalImg25 from "../../assets/gallery/modal25.jpg";
import ModalImg26 from "../../assets/gallery/modal26.jpg";
import ModalImg27 from "../../assets/gallery/modal27.jpg";
import ModalImg28 from "../../assets/gallery/modal28.jpg";
import ModalImg29 from "../../assets/gallery/modal29.jpg";
import ModalImg30 from "../../assets/gallery/modal30.jpg";
import ModalImg31 from "../../assets/gallery/modal31.jpg";
import ModalImg32 from "../../assets/gallery/modal32.jpg";

const galleryImages = [
  { thumbnail: Img1, images: [ModalImg9, ModalImg10, ModalImg11, ModalImg12] },
  { thumbnail: Img2, images: [ModalImg5, ModalImg6, ModalImg7, ModalImg8] },
  { thumbnail: Img3, images: [ModalImg1, ModalImg2, ModalImg3, ModalImg4] },
  { thumbnail: Img4, images: [ModalImg13, ModalImg14, ModalImg15, ModalImg16] },
  { thumbnail: Img5, images: [ModalImg17, ModalImg18, ModalImg19, ModalImg20] },
  { thumbnail: Img6, images: [ModalImg25, ModalImg26, ModalImg27, ModalImg28] },
  { thumbnail: Img7, images: [ModalImg21, ModalImg22, ModalImg23, ModalImg24] },
  { thumbnail: Img8, images: [ModalImg29, ModalImg30, ModalImg31, ModalImg32] },
];

const Gallery = () => {
  const [show, setShow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (galleryIndex, imageIndex) => {
    setCurrentGalleryIndex(galleryIndex);
    setCurrentImageIndex(imageIndex);
    setShow(true);
  };

  const handleNext = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex + 1) % galleryImages[currentGalleryIndex].images.length
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + galleryImages[currentGalleryIndex].images.length) %
        galleryImages[currentGalleryIndex].images.length
    );
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Wedding Photography</h2>
      <div className="row">
        {galleryImages.slice(0, 4).map((img, index) => (
          <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div className="image-gallery" onClick={() => handleShow(index, 0)}>
              <img
                src={img.thumbnail}
                alt={`Wedding ${index + 1}`}
                className="img-fluid gallery-image"
              />
            </div>
          </div>
        ))}
      </div>

      <h2 className="gallery-title">Birthday Photography</h2>
      <div className="row">
        {galleryImages.slice(4).map((img, index) => (
          <div key={index + 4} className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div
              className="image-gallery"
              onClick={() => handleShow(index + 4, 0)}
            >
              <img
                src={img.thumbnail}
                alt={`Birthday ${index + 1}`}
                className="img-fluid gallery-image"
              />
            </div>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Body>
          <div className="modal-content-wrapper">
            <img
              src={galleryImages[currentGalleryIndex].images[currentImageIndex]}
              alt="Current"
              className="img-fluid modal-image"
            />
            <span className="modal-nav prev" onClick={handlePrev}>
              &#10094;
            </span>
            <span className="modal-nav next" onClick={handleNext}>
              &#10095;
            </span>
            <span className="modal-close" onClick={handleClose}>
              &#10005;
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Gallery;
