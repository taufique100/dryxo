import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ContactBar.css";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa6";
import { MdAddCall, MdOutlineEmail } from "react-icons/md";

const ContactBar = () => {
  return (
    <div className="contact-bar-container">
      <Container fluid>
        <Row className="align-items-center justify-content-between">
          {/* Left Side Info */}
          <Col
            xs={12}
            md="auto"
            className="contact-info d-flex flex-wrap gap-3"
          >
            <div className="contact-item d-flex align-items-center gap-1">
              <MdAddCall className="contact-icon" />
              <span>+91 9315522533</span>
            </div>
            <div className="contact-item d-flex align-items-center gap-1">
              <MdOutlineEmail className="contact-icon" />
              <span>dryxo179@gmail.com</span>
            </div>
            <div className="contact-item">
              <span>GSTIN/UIN: 09ABGCS0982H1ZL</span>
            </div>
          </Col>

          {/* Right Side Social Icons */}
          <Col
            xs={12}
            md="auto"
            className="contact-social-icons text-md-end d-flex gap-3 justify-content-md-end mt-2 mt-md-0"
          >
            <a
              href="https://www.instagram.com/dryxo100?igsh=MWp6cGkzaDdrMG9ycw=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/dryxo-9512a7291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/share/1CZPmRk2nm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactBar;
