import React from "react";
import "./PadHome.css";
import { Container, Row, Col } from "react-bootstrap";
import images from "../../Media/galleryItems";
import { useNavigate } from "react-router-dom";

const PadHome = () => {
   
      const navigate = useNavigate();
      const handleClick = () => {
        navigate("/pad_atm");
      };

  return (
    <section className="community-section py-5">
      <Container>
        {/* Background Text */}
        <h1 className=" text-center">PAD ATM</h1>

        {/* Main Heading */}
        <h5 className="text-warning text-center">
          Community Empowerment Initiatives
          <p className="dot-line">--------------------</p>
        </h5>

        {/* Description */}
        <p className="description">
          Dryxo is proud to support the Pad ATM Initiative, an inspiring project
          by the Glad Bharat Foundation that tackles the critical issue of lack
          of access and affordability of menstrual cups and pads to women in
          Indian society. This initiative provides automated dispensers, making
          sanitary pads easily available to women in rural, remote areas, urban
          slums, and under-resourced schools. By addressing barriers such as
          cost and social stigma, the Pad ATM Initiative enables women to take
          care of their menstrual health comfortably and confidently.
        </p>
      </Container>

      {/* Image Section */}
      <Container className="image-section ">
        <Row className="g-2">
          {images
            .filter((img) => img.id !== 13)
            .map((img) => (
              <Col key={img.id} xs={12} sm={6} md={4} lg={3}  >
                <div className="gallery-card text-center">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="img-fluid rounded shadow"
                  />
                </div>
              </Col>
            ))}
        </Row>
      </Container>
      <div className="buttons">
        <button onClick={handleClick} className="button mt-3 px-3 py-1 ">Explore More</button>
      </div>
    </section>
  );
};

export default PadHome;
