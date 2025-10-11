import React from "react";
import "./Safety.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion"; 
import safety1 from "../../../assets/safety1.png";
import safety2 from "../../../assets/safety2.png";
import safety3 from "../../../assets/safety3.png";
import safety4 from "../../../assets/safety4.png";

const features = [
  {
    img: safety1,
    title: "No",
    subtitle: "Toxic chemicals",
  },
  {
    img: safety2,
    title: "No Wetness Gel",
    subtitle: "Super Gel lock",
  },
  {
    img: safety3,
    title: "No",
    subtitle: "Waste",
  },
  {
    img: safety4,
    title: "No",
    subtitle: "Pollution",
  },
];

const Safety = () => {
  return (
    <>
      <section className="safety-section bg-white text-center">
        <Container>
          <Row className="g-4 my-0">
            {features.map((feature, index) => (
              <Col xs={6} md={3} key={index}>
                <div className="feature-card">
                  <motion.img
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ duration: 1.4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    src={feature.img}
                    alt={feature.subtitle}
                    className="safety-img"
                  />
                  <h3 className="fw-bold">{feature.title}</h3>
                  <h5 className="fw-bold">{feature.subtitle}</h5>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Safety;
