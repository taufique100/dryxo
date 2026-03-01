import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <section style={{ background: "#f6f8fb", padding: "60px 0" }}>
      <Container>
        {/* HERO HEADER */}
        <div className="text-center mb-5">
          <h6 style={{ color: "#fd350d", letterSpacing: "2px" }}>
            CONTACT SUPPORT
          </h6>

          <h1 style={{ fontWeight: "700" }}>We’d Love To Hear From You</h1>

          <p style={{ color: "#6c757d", maxWidth: "600px", margin: "0 auto" }}>
            Have questions, feedback, or need assistance? Our team is here to
            help you anytime. Reach out and we’ll respond as quickly as
            possible.
          </p>
        </div>

        <Row className="g-4">
         
          <Col lg={6}>
            <Card
              className="border-0 shadow-lg"
              style={{ borderRadius: "18px" }}
            >
              <Card.Body style={{ padding: "35px" }}>
                <h4 className="mb-4 text-center fw-bold">
                  Consumer Feedback Form
                </h4>

                <Form>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        className="py-2 "
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        className="py-2"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Control
                        type="email"
                        placeholder="Email Address"
                        className="py-2"
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Subject"
                        className="py-2"
                      />
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Write your message here..."
                      className="py-3"
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      style={{
                        background: "linear-gradient(45deg,#fd350d,#ff7a59)",
                        border: "none",
                        padding: "6px 15px",
                        borderRadius: "50px",
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    >
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* ================= RIGHT SIDE INFO ================= */}
          <Col lg={6} className="d-flex flex-column justify-content-center">
            {/* ADDRESS */}
            <Card className="border-0 shadow-sm mb-4 p-3">
              <div className="d-flex align-items-start">
                <div
                  className="text-white py-2 px-2 rounded-circle me-3"
                  style={{ background: "#fd350d" }}
                >
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Sharida Healthcare Pvt. Ltd</h5>
                  <p className="mb-0 text-muted">
                    B-149, Sector-63, Noida, Gautam Buddh Nagar, Uttar Pradesh,
                    India - 201301
                  </p>
                </div>
              </div>
            </Card>

            {/* PHONE */}
            <Card className="border-0 shadow-sm mb-4 p-3">
              <div className="d-flex align-items-start">
                <div
                  className="text-white py-2 px-2 rounded-circle me-3"
                  style={{ background: "#fd350d" }}
                >
                  <FaPhoneAlt size={18} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Call Us</h5>
                  <p className="mb-0 text-muted">+91 9315522533</p>
                </div>
              </div>
            </Card>

            {/* EMAIL */}
            <Card className="border-0 shadow-sm p-3">
              <div className="d-flex align-items-start">
                <div
                  className="text-white py-2 px-2 rounded-circle me-3"
                  style={{ background: "#fd350d" }}
                >
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Email Support</h5>
                  <p className="mb-0 text-muted">dryxo179@gmail.com</p>
                </div>
              </div>
            </Card>

            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;



