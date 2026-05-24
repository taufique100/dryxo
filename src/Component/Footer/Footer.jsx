import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp,
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";
import logo from "../../assets/logo.png";

const navLinks = [
  { label: "Home",            to: "/home" },
  { label: "Products",        to: "/products" },
  { label: "About Us",        to: "/about" },
  { label: "Media",           to: "/media" },
  { label: "Blog",            to: "/blog" },
  { label: "Pad ATM",         to: "/pad_atm" },
  { label: "Channel Partner", to: "/chanel_partner" },
  { label: "Contact Us",      to: "/contact" },
];

const Footer = () => {
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/919315522533?text=${encodeURIComponent("Hii, I am client.")}`,
      "_blank"
    );
  };

  return (
    <footer className="ft-root">
      {/* ── SVG line-art background ── */}
      <div className="ft-bg" aria-hidden="true">
        <svg className="ft-svg" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* grid lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 130} y1="0" x2={i * 130} y2="560" stroke="rgba(255,68,0,0.04)" strokeWidth="1"/>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 80} x2="1440" y2={i * 80} stroke="rgba(255,68,0,0.04)" strokeWidth="1"/>
          ))}
          {/* diagonal accent lines */}
          <line x1="0"    y1="560" x2="400"  y2="0"   stroke="rgba(255,68,0,0.06)"  strokeWidth="1"/>
          <line x1="200"  y1="560" x2="700"  y2="0"   stroke="rgba(255,68,0,0.05)"  strokeWidth="1"/>
          <line x1="500"  y1="560" x2="1000" y2="0"   stroke="rgba(210,134,17,0.05)" strokeWidth="1"/>
          <line x1="900"  y1="560" x2="1440" y2="100" stroke="rgba(255,68,0,0.05)"  strokeWidth="1"/>
          <line x1="1100" y1="560" x2="1440" y2="200" stroke="rgba(210,134,17,0.04)" strokeWidth="1"/>
          {/* large arc */}
          <path d="M -100 560 Q 720 -80 1540 560" fill="none" stroke="rgba(255,68,0,0.05)" strokeWidth="1.5"/>
          <path d="M -100 560 Q 720 60 1540 560"  fill="none" stroke="rgba(255,68,0,0.04)" strokeWidth="1"/>
          {/* glow circles */}
          <circle cx="200"  cy="480" r="180" fill="rgba(255,68,0,0.04)"/>
          <circle cx="1240" cy="100" r="220" fill="rgba(210,134,17,0.04)"/>
          <circle cx="720"  cy="300" r="300" fill="rgba(255,68,0,0.025)"/>
          {/* dot grid */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <circle key={`d${row}-${col}`}
                cx={col * 110 + 55} cy={row * 80 + 40}
                r="1.2" fill="rgba(255,255,255,0.04)"
              />
            ))
          )}
        </svg>
      </div>

      {/* ── top divider glow ── */}
      <div className="ft-top-glow" />

      <div className="ft-inner">

        {/* ── ROW 1: brand + links + contact + social ── */}
        <div className="ft-grid">

          {/* Brand */}
          <div className="ft-brand">
            <img src={logo} alt="Dryxo" className="ft-logo" />
            <p className="ft-tagline">
              At Dryxo, we believe in caring for you with products that empower
              and protect. Break the silence — embrace your period with confidence.
            </p>
            <p className="ft-slogan">
              <span>Feel Dry.</span> <span>Feel Free.</span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="ft-col">
            <h6 className="ft-heading">Quick Links</h6>
            <ul className="ft-links">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className="ft-link">
                    <span className="ft-link-dot" />
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="ft-col">
            <h6 className="ft-heading">Contact Info</h6>
            <ul className="ft-contact-list">
              <li>
                <FaPhoneAlt className="ft-ci" />
                <a href="tel:+919315522533">+91 93155 22533</a>
              </li>
              <li>
                <FaEnvelope className="ft-ci" />
                <a href="mailto:dryxo179@gmail.com">dryxo179@gmail.com</a>
              </li>
              <li>
                <FaMapMarkerAlt className="ft-ci ft-ci--top" />
                <span>B-149 Sector-63, Noida,<br />Gautam Buddh Nagar UP 201301, India</span>
              </li>
            </ul>
            <p className="ft-gstin">GSTIN: 09ABGCS0982H1ZL</p>
          </div>

          {/* Social */}
          <div className="ft-col">
            <h6 className="ft-heading">Follow Us</h6>
            <p className="ft-social-sub">Stay connected with Dryxo</p>
            <div className="ft-socials">
              <a href="https://www.instagram.com/dryxo.india?igsh=MXJpMXBhdDJlbjIycA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="ft-social-btn" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/share/1CZPmRk2nm/" target="_blank" rel="noreferrer" className="ft-social-btn" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.linkedin.com/in/dryxo-sharida-healthcare-pvt-ltd-9512a7291?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" className="ft-social-btn" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <button className="ft-social-btn" onClick={handleWhatsApp} aria-label="WhatsApp">
                <FaWhatsapp />
              </button>
            </div>

            <div className="ft-badge">
              <span className="ft-badge-dot" />
              Sharida Healthcare Pvt. Ltd.
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ft-bottom">
          <div className="ft-bottom-line" />
          <div className="ft-bottom-inner">
            <span className="ft-copy">© {new Date().getFullYear()} Dryxo — Sharida Healthcare Pvt. Ltd. All rights reserved.</span>
            <span className="ft-made">Made with ♥ in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
