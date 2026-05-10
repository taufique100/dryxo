import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home2.css";

import heroImg from "../../assets/homeproduct.png";
import product1 from "../../assets/product-1.png";
import product2 from "../../assets/product-2.png";
import product3 from "../../assets/product-3.png";
import product4 from "../../assets/product-4.png";
import techImg from "../../assets/dryxo1product-1.png";

/* ── animated counter ── */
function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const step = target / (duration / 16);
        const tick = () => {
          start += step;
          if (start >= target) { setCount(target); return; }
          setCount(Math.floor(start));
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

/* ── stat item ── */
function Stat({ num, suffix, label }) {
  const [count, ref] = useCounter(num);
  return (
    <div className="h2-stat-item" ref={ref}>
      <div className="h2-stat-num">{count}{suffix}</div>
      <div className="h2-stat-label">{label}</div>
    </div>
  );
}

const features = [
  { icon: "🌿", title: "100% Biodegradable", desc: "Fully organic materials that break down naturally — zero guilt, zero waste." },
  { icon: "⚡", title: "Anion Technology", desc: "Negative ion chip neutralizes odor and provides antibacterial protection 24/7." },
  { icon: "💧", title: "Ultra Dry Core", desc: "Double perforated top sheet locks moisture away instantly for all-day dryness." },
  { icon: "🪶", title: "Feather-Soft Edges", desc: "Contoured soft arms prevent rashes and irritation even during heavy flow." },
  { icon: "🛡️", title: "Leak-Proof Shield", desc: "360° protection design ensures zero leaks regardless of activity or flow." },
  { icon: "🌸", title: "Fresh Fragrance", desc: "Subtle botanical fragrance keeps you feeling confident and fresh all day." },
];

const products = [
  { img: product1, tag: "Best Seller", name: "Dryxo Regular", desc: "Everyday comfort with anion protection" },
  { img: product2, tag: "Heavy Flow", name: "Dryxo XL Night", desc: "Extra-long for overnight confidence" },
  { img: product3, tag: "Ultra Thin", name: "Dryxo Slim", desc: "Barely-there feel, maximum protection" },
  { img: product4, tag: "New", name: "Dryxo Active", desc: "Designed for active lifestyles" },
];

const testimonials = [
  {
    text: "I found Dryxo Naturally Soft extra-long pads online. They leave no irritation and are super comfortable during heavy flow days. Genuinely the best I've tried.",
    name: "Mahima Singh",
    stars: "★★★★★",
  },
  {
    text: "Dryxo pads have a soft texture and long-lasting protection which prevents rashes and keeps me dry all day and night. They are a total saviour!",
    name: "Kajal Roy",
    stars: "★★★★★",
  },
  {
    text: "Finally a brand that actually cares. The resealable packaging, the anion chip, the biodegradable promise — Dryxo is probably the best sanitary pad in India.",
    name: "Neetu Sharma",
    stars: "★★★★★",
  },
];

const Home2 = () => {
  const navigate = useNavigate();

  return (
    <div className="h2-page">

      {/* ── HERO ── */}
      <section className="h2-hero">
        <div className="h2-hero-bg" />
        <div className="h2-hero-grid" />
        <div className="container">
          <div className="row align-items-center">

            {/* Left */}
            <div className="col-lg-6">
              <div className="h2-hero-badge">
                <span /> India's #1 Biodegradable Pad
              </div>
              <h1 className="h2-hero-title">
                Feel Dry.<br  className="d-sm-block d-md-none"/>
                Feel <span className="accent">Free.</span><br />
                Feel Dryxo.
              </h1>
              <p className="h2-hero-sub">
                Revolutionary anion-chip technology meets 100% biodegradable comfort.
                Designed for every woman who refuses to compromise.
              </p>
              <div className="h2-hero-actions">
                <button className="h2-btn-primary" onClick={() => navigate("/products")}>
                  Shop Now →
                </button>
                <button className="h2-btn-ghost" onClick={() => navigate("/about")}>
                  Our Story
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="col-lg-6">
              <div className="h2-hero-visual">
                <div className="h2-hero-img-wrap">
                  <div className="h2-hero-glow" />
                  <img src={heroImg} alt="Dryxo Product" />
                  <div className="h2-float-card top-left">
                    <div className="fc-label">Protection</div>
                    <div className="fc-value">24H+</div>
                  </div>
                  <div className="h2-float-card bottom-right">
                    <div className="fc-label">Biodegradable</div>
                    <div className="fc-value">100%</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="h2-stats">
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-3">
              <Stat num={500} suffix="K+" label="Happy Women" />
            </div>
            <div className="col-6 col-md-3">
              <Stat num={12} suffix="+" label="States Reached" />
            </div>
            <div className="col-6 col-md-3">
              <Stat num={100} suffix="%" label="Biodegradable" />
            </div>
            <div className="col-6 col-md-3">
              <Stat num={0} suffix=" Toxins" label="Chemical Free" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="h2-section h2-features">
        <div className="container">
          <div className="text-center">
            <span className="h2-section-tag">Why Dryxo</span>
            <h2 className="h2-section-title">Built Different.<br />For You.</h2>
            <p className="h2-section-sub mx-auto">
              Every layer of a Dryxo pad is engineered with one goal — your complete comfort and confidence.
            </p>
          </div>
          <div className="h2-feature-grid">
            {features.map((f, i) => (
              <div className="h2-feature-card" key={i}>
                <div className="h2-feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="h2-section h2-products">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-3">
            <div>
              <span className="h2-section-tag">Our Range</span>
              <h2 className="h2-section-title mb-0">Find Your<br />Perfect Fit</h2>
            </div>
            <button className="h2-btn-ghost" onClick={() => navigate("/products")}>
              View All Products →
            </button>
          </div>
          <div className="h2-product-scroll">
            {products.map((p, i) => (
              <div className="h2-product-card" key={i} onClick={() => navigate("/products")}>
                <img src={p.img} alt={p.name} className="h2-product-img" />
                <div className="h2-product-info">
                  <div className="h2-product-tag">{p.tag}</div>
                  <h4>{p.name}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION STRIP ── */}
      <section className="h2-mission">
        <div className="container">
          <div className="h2-mission-content">
            <span className="h2-section-tag" style={{ color: "rgba(255,255,255,0.6)" }}>Our Mission</span>
            <h2>A Simple Change for<br />a Better Tomorrow</h2>
            <p>
              India uses <strong>12.3 billion</strong> sanitary pads every year, creating
              <strong> 113,000 tonnes</strong> of waste. Dryxo's biodegradable pads break down
              naturally — because caring for yourself shouldn't cost the planet.
            </p>
            <button className="h2-btn-primary" onClick={() => navigate("/about")}>
              Learn About Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section className="h2-section h2-tech">
        <div className="container">
          <div className="h2-tech-row">
            <div>
              <span className="h2-section-tag">Innovation</span>
              <h2 className="h2-section-title">Science Behind<br />the Comfort</h2>
              <p className="h2-section-sub">
                Dryxo isn't just a pad — it's a precision-engineered health product.
              </p>
              <ul className="h2-tech-list">
                {[
                  ["Anion Chip", "Releases negative ions that neutralize odor-causing bacteria and balance pH."],
                  ["Moisture-Lock Core", "SAP gel absorbs 10x its weight, keeping the surface bone dry."],
                  ["Organic Top Sheet", "Soft, breathable, skin-tested material prevents rashes and irritation."],
                  ["Biodegradable Base", "Plant-based film decomposes within months, not centuries."],
                ].map(([title, desc], i) => (
                  <li key={i}>
                    <div className="h2-tech-dot" />
                    <div>
                      <strong>{title}</strong>
                      <span>{desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h2-tech-visual">
              <img src={techImg} alt="Dryxo Technology" />
              <div className="h2-tech-badge">✦ Clinically Tested &amp; Dermatologist Approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="h2-section h2-testimonials">
        <div className="container">
          <div className="text-center">
            <span className="h2-section-tag">Real Stories</span>
            <h2 className="h2-section-title">What Women Say<br />About Dryxo</h2>
          </div>
          <div className="h2-testi-grid">
            {testimonials.map((t, i) => (
              <div className="h2-testi-card" key={i}>
                <div className="h2-testi-quote">"</div>
                <p className="h2-testi-text">{t.text}</p>
                <div className="h2-testi-author">
                  <div className="h2-testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="h2-testi-name">{t.name}</div>
                    <div className="h2-testi-stars">{t.stars}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="h2-cta">
        <div className="container">
          <span className="h2-section-tag">Get Started</span>
          <h2>Ready to Feel the<br />Dryxo Difference?</h2>
          <p>
            Join over 500,000 women who've made the switch to smarter,
            cleaner, more comfortable menstrual care.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="h2-btn-primary" onClick={() => navigate("/products")}>
              Shop Now →
            </button>
            <button className="h2-btn-ghost" onClick={() => navigate("/contact")}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home2;
