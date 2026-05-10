import React from "react";
import { motion } from "framer-motion";
import join from "../../assets/join.jpg";
import "../../Pages/theme.css";
import "./Chanel_Partner.css";

const benefits = [
  { icon: "📈", title: "Business Growth",    desc: "Tap into India's fast-growing menstrual hygiene market with a trusted brand." },
  { icon: "🤝", title: "Full Support",        desc: "Marketing materials, training, and dedicated partner support from day one." },
  { icon: "🌿", title: "Eco-Friendly Brand",  desc: "Partner with a brand that stands for sustainability and women's health." },
  { icon: "💰", title: "Attractive Margins",  desc: "Competitive pricing and healthy profit margins for all partner tiers." },
  { icon: "🏆", title: "Brand Recognition",   desc: "Leverage Dryxo's growing presence across 12+ states in India." },
  { icon: "🚀", title: "Fast Onboarding",     desc: "Simple process to get started — from application to first order in days." },
];

const Chanel_Partner = () => (
  <div className="pg-root">

    {/* ── HERO ── */}
    <div className="pg-hero">
      <div className="pg-hero-inner">
        <span className="pg-tag">Partner With Us</span>
        <h1>Join the Dryxo <span>Journey</span></h1>
        <p>Become a channel partner and help bring dignified menstrual care to every woman in India.</p>
      </div>
    </div>

    {/* ── INTRO ── */}
    <section className="pg-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <motion.div className="col-lg-5"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <div className="cp-img-wrap">
              <img src={join} alt="Join Dryxo" className="cp-img" />
              <div className="cp-img-badge">DRYXO</div>
            </div>
          </motion.div>
          <motion.div className="col-lg-7"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="pg-section-tag">Empowerment Journey</span>
            <h2 className="pg-title">Grow With <span>Purpose</span></h2>
            <p className="pg-text">
              At Dryxo, we're not just selling sanitary pads — we're empowering women to embrace
              their health with dignity. By partnering with us, you'll help bring eco-friendly,
              high-quality products to women everywhere.
            </p>
            <p className="pg-text">
              Whether you're a Retailer bringing our products to your community or a Franchise
              Partner expanding our mission, together we'll grow a business that makes a real
              difference. Join us in making menstrual care accessible, sustainable, and empowering.
            </p>
            <div className="d-flex gap-3 flex-wrap mt-4">
              <a href="#partner-form" className="pg-btn">Apply Now →</a>
              <a href="#benefits" className="pg-btn-ghost">See Benefits</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <div className="pg-divider" />

    {/* ── BENEFITS ── */}
    <section className="pg-section-alt" id="benefits">
      <div className="container">
        <div className="text-center mb-5">
          <span className="pg-section-tag">Why Partner</span>
          <h2 className="pg-title">Partner <span>Benefits</span></h2>
        </div>
        <div className="row g-4">
          {benefits.map((b, i) => (
            <motion.div className="col-md-6 col-lg-4" key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <div className="pg-benefit-card">
                <div className="cp-benefit-icon">{b.icon}</div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <div className="pg-divider" />

    {/* ── FORM ── */}
    <section className="pg-section" id="partner-form">
      <div className="container">
        <div className="cp-form-wrap">
          <div className="text-center mb-5">
            <span className="pg-section-tag">Get Started</span>
            <h2 className="pg-title">Join Our <span>Partner Program</span></h2>
            <p className="pg-text mx-auto" style={{maxWidth:500}}>
              Fill out the form below to become a part of our journey to healthier menstrual care for all.
            </p>
          </div>
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="pg-label">Your Name</label>
                <input type="text" className="pg-input" placeholder="Enter your full name" />
              </div>
              <div className="col-md-6">
                <label className="pg-label">Firm Name</label>
                <input type="text" className="pg-input" placeholder="Enter your firm name" />
              </div>
              <div className="col-md-6">
                <label className="pg-label">Mobile Number</label>
                <input type="text" className="pg-input" placeholder="+91 00000 00000" />
              </div>
              <div className="col-md-6">
                <label className="pg-label">Email</label>
                <input type="email" className="pg-input" placeholder="you@example.com" />
              </div>
              <div className="col-md-6">
                <label className="pg-label">State</label>
                <input type="text" className="pg-input" placeholder="Your state" />
              </div>
              <div className="col-md-6">
                <label className="pg-label">City</label>
                <input type="text" className="pg-input" placeholder="Your city" />
              </div>
              <div className="col-12">
                <label className="pg-label">Message</label>
                <textarea className="pg-input" rows={4} placeholder="Tell us about your business..." />
              </div>
              <div className="col-12 text-center mt-2">
                <button type="submit" className="pg-btn px-5" style={{justifyContent:'center'}}>
                  Submit Request →
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

  </div>
);

export default Chanel_Partner;
