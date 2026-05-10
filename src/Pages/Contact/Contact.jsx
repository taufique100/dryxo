import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "../../Pages/theme.css";
import "./Contact.css";

const Contact = () => (
  <div className="pg-root">

    {/* ── HERO ── */}
    <div className="pg-hero">
      <div className="pg-hero-inner">
        <span className="pg-tag">Get In Touch</span>
        <h1>Drop Us a <span>Message</span></h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
    </div>

    {/* ── FORM + INFO ── */}
    <section className="pg-section">
      <div className="container">
        <div className="row g-5 align-items-start">

          {/* Form */}
          <motion.div className="col-lg-7"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="ct-form-card">
              <span className="pg-section-tag">Send Message</span>
              <h2 className="pg-title mb-4">Consumer <span>Feedback</span></h2>
              <form>
                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label className="pg-label">Name</label>
                    <input type="text" className="pg-input" placeholder="Your full name" />
                  </div>
                  <div className="col-sm-6">
                    <label className="pg-label">Phone</label>
                    <input type="text" className="pg-input" placeholder="+91 00000 00000" />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label className="pg-label">Email</label>
                    <input type="email" className="pg-input" placeholder="you@example.com" />
                  </div>
                  <div className="col-sm-6">
                    <label className="pg-label">Subject</label>
                    <input type="text" className="pg-input" placeholder="How can we help?" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="pg-label">Message</label>
                  <textarea className="pg-input" rows={5} placeholder="Write your message here..." />
                </div>
                <button type="submit" className="pg-btn w-100" style={{justifyContent:'center'}}>
                  Send Message →
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div className="col-lg-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="pg-section-tag">Contact Info</span>
            <h2 className="pg-title mb-4">We're <span>Here</span> for You</h2>
            <div className="d-flex flex-column gap-3">
              <div className="pg-info-row">
                <div className="pg-icon-box"><FaMapMarkerAlt /></div>
                <div>
                  <h5>Our Office</h5>
                  <p>Sharida Healthcare Pvt. Ltd<br />B-149, Sector-63, Noida, UP 201301, India</p>
                </div>
              </div>
              <div className="pg-info-row">
                <div className="pg-icon-box"><FaPhoneAlt /></div>
                <div>
                  <h5>Phone</h5>
                  <p><a href="tel:+919315522533" className="ct-link">+91 93155 22533</a></p>
                </div>
              </div>
              <div className="pg-info-row">
                <div className="pg-icon-box"><FaEnvelope /></div>
                <div>
                  <h5>Email Address</h5>
                  <p><a href="mailto:dryxo179@gmail.com" className="ct-link">dryxo179@gmail.com</a></p>
                </div>
              </div>
            </div>

            <div className="ct-gstin-box">
              <span>GSTIN / UIN</span>
              <strong>09ABGCS0982H1ZL</strong>
            </div>
          </motion.div>

        </div>
      </div>
    </section>

  </div>
);

export default Contact;
