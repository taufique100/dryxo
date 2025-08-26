import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center text-uppercase mb-4 fw-bold text-primary">
          Drop Us A Message
        </h2>
        <Row className="g-4">
          {/* Left Side - Form */}
          <Col md={6}>
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Body>
                <h4 className="text-center mb-4">Consumer Feedback</h4>
                <Form>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control type="text" placeholder="Name" />
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Phone No" />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control type="email" placeholder="Email" />
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Subject" />
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Message"
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button variant="primary" className="px-4 fw-bold">
                      Send
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side - Contact Info */}
          <Col md={6} className="d-flex flex-column justify-content-center">
            <div className="d-flex align-items-start mb-4">
              <div
                className="text-white p-3 rounded-circle me-3"
                style={{ backgroundColor: "#69727D", borderColor: "#69727D" }}>
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <h5 className="fw-bold">Sharida Healthcare Pvt. Ltd</h5>
                <p className="mb-0">
                  B-149 Sector-63, Noida, Gautam Buddh Nagar UP 201301, India
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <div
                className=" text-white p-3 rounded-circle me-3"
                style={{ backgroundColor: "#69727D", borderColor: "#69727D" }}
              >
                <FaPhoneAlt size={24} />
              </div>
              <div>
                <h5 className="fw-bold">Phone</h5>
                <p className="mb-0">+91 9315522533</p>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <div
                className="text-white p-3 rounded-circle me-3"
                style={{ backgroundColor: "#69727D", borderColor: "#69727D" }}
              >
                <FaEnvelope size={24} />
              </div>
              <div>
                <h5 className="fw-bold">Email Address</h5>
                <p className="mb-0">info@dryxo.in</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;

