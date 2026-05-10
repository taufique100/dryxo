import React, { useState } from "react";
import { motion } from "framer-motion";
import st1 from "../../assets/st-1.jpg";
import galleryItems from "./galleryItems";
import "../../Pages/theme.css";
import "./Media.css";

const btnList = ["All", "Social Work", "School Students"];

const Media = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? galleryItems
    : galleryItems.filter((i) => i.category === active);

  return (
    <div className="pg-root">

      {/* ── HERO ── */}
      <div className="pg-hero">
        <div className="pg-hero-inner">
          <span className="pg-tag">Our Impact</span>
          <h1>Media <span>Highlights</span></h1>
          <p>Dryxo in action — reaching communities, empowering women, making a difference.</p>
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
              <img src={st1} alt="Dryxo Media" className="md-img" />
            </motion.div>
            <motion.div className="col-lg-7"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="pg-section-tag">Community Outreach</span>
              <h2 className="pg-title">Reaching Every <span>Woman</span></h2>
              <p className="pg-text">
                At Dryxo, we believe that every woman deserves access to safe and dignified
                menstrual care. In a heartfelt effort to support underserved communities, we have
                distributed Dryxo sanitary pads to schools, remote villages, and urban slums.
              </p>
              <p className="pg-text">
                To spread awareness and encourage healthier menstrual practices, we have also been
                providing free samples of Dryxo sanitary pads. Partnering with local community
                leaders, we are dedicated to empowering women to embrace safe, eco-friendly alternatives.
              </p>
              <div className="md-stats">
                {[["Schools", "50+"], ["Villages", "30+"], ["Women Reached", "10K+"]].map(([l, n]) => (
                  <div className="md-stat" key={l}>
                    <span className="md-stat-num">{n}</span>
                    <span className="md-stat-label">{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pg-divider" />

      {/* ── GALLERY ── */}
      <section className="pg-section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <span className="pg-section-tag">Gallery</span>
            <h2 className="pg-title">Media <span>Gallery</span></h2>
          </div>

          {/* Filter */}
          <div className="pg-filter-wrap">
            {btnList.map((b) => (
              <button
                key={b}
                className={`pg-filter-btn ${active === b ? "active" : ""}`}
                onClick={() => setActive(b)}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="row g-3">
            {filtered.map((item, idx) => (
              <motion.div
                key={idx}
                className="col-12 col-sm-6 col-md-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                viewport={{ once: true }}
              >
                <div className="pg-gallery-card">
                  <img src={item.src} alt={`Gallery ${item.id}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Media;
