import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF, FaInstagram,FaLinkedinIn,FaPhoneAlt,FaEnvelope,FaMapMarkerAlt,} from "react-icons/fa";
import "./Footer.css";
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="gy-4">
          {/* Logo & About */}
          <Col md={4} className="text-center text-md-start">
            <div className="footer-logo mb-3">
              <img src={logo} alt="Dryxo Logo" className="logo-img" />
            </div>
            <p>
              At Dryxo, we believe in caring for you with products that empower
              and protect. It’s time to break the silence and embrace your
              period with confidence. With Dryxo, feel confident, feel
              comfortable, and most importantly—
              <strong> Feel Dry, Feel Free.</strong>
            </p>
          </Col>

          {/* Useful Links */}
          <Col md={2} className="text-center text-md-start">
            <h5 className="fw-bold">Useful Links</h5>
            <ul className="list-unstyled footer-links">
              <li>Home</li>
              <li>About Us</li>
              <li>Products</li>
              <li>Career</li>
              <li>Channel Partner</li>
              <li>Media</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3} className="text-center text-md-start">
            <h5 className="fw-bold">Contact Info</h5>
            <p>
              <FaPhoneAlt className="me-2" /> +91 93155 22533
            </p>
            <p>
              <FaEnvelope className="me-2" /> dryxo179@gmail.com
            </p>
            <p className="fw-bold mb-1">Sharida Healthcare Pvt. Ltd</p>
            <p>
              <FaMapMarkerAlt className="me-2" />
              B-149 Sector-63, Noida, Gautam Buddh Nagar UP 201301, India
            </p>
          </Col>

          {/* Social Media */}
          <Col md={3} className="text-center text-md-start">
            <h5 className="fw-bold">Say hello on our socials</h5>
            <div className="social-icons mt-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
        </Row>

        <hr />
      </Container>
    </footer>
  );
};

export default Footer;
