import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import mission from "../../assets/product1.jpg";
import irfan   from "../../assets/irfan.jpg";
import samina  from "../../assets/samina.jpg";
import product from "../../assets/padsBlogs1.jpg";
import video   from "../../assets/about-video.mp4";
import "../../Pages/theme.css";
import "./About.css";

const fade = (dir = 0, delay = 0) => ({
  initial: { opacity: 0, x: dir },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.9, delay },
  viewport: { once: true },
});

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="pg-root">

      {/* ── HERO ── */}
      <div className="pg-hero">
        <div className="pg-hero-inner">
          <span className="pg-tag">Our Story</span>
          <h1>Who We <span>Are</span></h1>
          <p>Revolutionizing menstrual care in India — one woman at a time.</p>
        </div>
      </div>

      {/* ── WHO WE ARE ── */}
      <section className="pg-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div className="col-lg-5" {...fade(-60)}>
              <img src={mission} alt="Dryxo Mission" className="ab-img" />
            </motion.div>
            <motion.div className="col-lg-7" {...fade(60, 0.1)}>
              <span className="pg-section-tag">About Dryxo</span>
              <h2 className="pg-title">Empowering Women with <span>Better Care</span></h2>
              <p className="pg-text">
                At DRYXO, we are driven by a mission to revolutionize menstrual care in India.
                With over 35.5 crore menstruating women in the country, many still lack access
                to high-quality, comfortable sanitary products. We believe that safe, hygienic,
                and sustainable menstrual care is every woman's right.
              </p>
              <p className="pg-text">
                <strong style={{color:'#ff7755'}}>Feel Dry, Feel Free</strong> isn't just our motto — it's our commitment
                to making menstruation a natural, empowering part of every woman's life.
                Choose DRYXO, crafted with 100% natural cotton, gentle on your skin and kind to the planet.
              </p>
              <blockquote className="ab-quote">
                "If you check the health of a woman, you check the health of the society."
              </blockquote>
              <div className="d-flex gap-3 flex-wrap mt-4">
                <button className="pg-btn" onClick={() => navigate("/products")}>Shop Now →</button>
                <button className="pg-btn-ghost" onClick={() => navigate("/contact")}>Contact Us</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pg-divider" />

      {/* ── VISION & MISSION ── */}
      <section className="pg-section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <span className="pg-section-tag">Our Purpose</span>
            <h2 className="pg-title">Vision &amp; <span>Mission</span></h2>
          </div>
          <div className="row g-4">
            <motion.div className="col-md-6" {...fade(-40)}>
              <div className="pg-card ab-vm-card">
                <div className="ab-vm-icon">🎯</div>
                <h4>DRYXO's Vision</h4>
                <p className="pg-text">
                  To empower women everywhere by providing safe, eco-friendly, and accessible
                  menstrual care solutions that redefine hygiene standards across India.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-md-6" {...fade(40, 0.1)}>
              <div className="pg-card ab-vm-card">
                <div className="ab-vm-icon">🚀</div>
                <h4>DRYXO's Mission</h4>
                <p className="pg-text">
                  Our mission is to make personal hygiene and sanitation a priority across India,
                  ensuring every woman has access to affordable, high-quality menstrual care products.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pg-divider" />

      {/* ── DIRECTORS ── */}
      <section className="pg-section-dark">
        <div className="container">
          <div className="text-center mb-5">
            <span className="pg-section-tag">Leadership</span>
            <h2 className="pg-title">Director's <span>Message</span></h2>
          </div>
          <div className="row g-4">
            <motion.div className="col-md-6" {...fade(-50)}>
              <div className="pg-founder-card">
                <img src={irfan} alt="Mohammad Irfan Khan" className="pg-founder-img" />
                <p className="pg-founder-name">Mohammad Irfan Khan</p>
                <p className="pg-founder-quote">
                  At DRYXO, our goal has always been to remove any barriers to menstrual hygiene.
                  No woman should have to compromise her education, career, or self-esteem because
                  of a lack of access to quality period products. We're here to support every woman
                  on her journey — to make sure that periods are never a hindrance, only a phase of
                  growth and empowerment.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-md-6" {...fade(50, 0.1)}>
              <div className="pg-founder-card">
                <img src={samina} alt="Samina Afroz" className="pg-founder-img" />
                <p className="pg-founder-name">Samina Afroz</p>
                <p className="pg-founder-quote">
                  DRYXO was created to be more than just a product; it's a partner in every woman's
                  life, standing by her side during one of the most intimate and defining parts of
                  womanhood. Together, we have achieved remarkable milestones, from expanding our
                  reach to developing products that meet the unique needs of Indian women.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pg-divider" />

      {/* ── PRODUCTS ── */}
      <section className="pg-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div className="col-lg-7" {...fade(-60)}>
              <span className="pg-section-tag">Innovation</span>
              <h2 className="pg-title">Our Innovative <span>Products</span></h2>
              <p className="pg-text">
                At DRYXO, our goal is to redefine comfort and hygiene during menstruation.
                We're proud to be among the few sanitary pad brands that prioritize eco-friendly
                disposal, offering biodegradable bags within each pack.
              </p>
              <p className="pg-text">
                Our products are designed to meet diverse needs, ensuring that every woman can
                experience a comfortable, worry-free period — every single day.
              </p>
              <button className="pg-btn mt-4" onClick={() => navigate("/products")}>
                Explore Products →
              </button>
            </motion.div>
            <motion.div className="col-lg-5" {...fade(60, 0.1)}>
              <img src={product} alt="Dryxo Product" className="ab-img" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pg-divider" />

      {/* ── MANUFACTURING ── */}
      <section className="pg-section-alt">
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div className="col-lg-5" {...fade(-60)}>
              <video src={video} className="ab-video" controls muted />
            </motion.div>
            <motion.div className="col-lg-7" {...fade(60, 0.1)}>
              <span className="pg-section-tag">Manufacturing</span>
              <h2 className="pg-title">Built with <span>Precision</span></h2>
              <p className="pg-text">
                Supported by latest, state-of-art technology, DRYXO has set up its manufacturing
                unit in Uttar Pradesh. We make no compromises in either the quality of our products
                or in our R&amp;D investments.
              </p>
              <p className="pg-text">
                DRYXO Sanitary Napkins were designed after in-depth research spanning over two years,
                developed by US professionals with extensive experience in feminine hygiene.
              </p>
              <div className="ab-stats-row">
                {[["2+", "Years R&D"], ["100%", "Natural Cotton"], ["35.5Cr+", "Women Served"]].map(([n, l]) => (
                  <div className="ab-stat" key={l}>
                    <span className="ab-stat-num">{n}</span>
                    <span className="ab-stat-label">{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
