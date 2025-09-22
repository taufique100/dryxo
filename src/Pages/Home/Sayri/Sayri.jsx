import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Sayri.css";

const Sayri = () => {
  const slides = [
    {
      text: "I found Dryxo Naturally Soft extra-long sanitary pads online. They leave no irritation and are super comfortable to use during my heavy flow days.",
      author: "— Mahima Singh",
    },
    {
      text: "Dryxo sanitary Pad have a soft texture and long-lasting protection which prevents rashes and keeps me dry all day/night. They are a saviour!",
      author: "— Kajal Roy",
    },
    {
      text: "Bought Dryxo Dry-Comfort pad. Finally, a sanitary pad brand that has made opening and storing pads convenient with their resealable packaging. Probably the best sanitary Pad in India!",
      author: "— Neetu",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="py-5">
      <Container className="text-center">
        {/* Heading */}
        <div className="heading">
          <h1 className="sub-title">What Women Say About DRYXO</h1>
          <p className="contents">Real Stories, Real Confidence</p>
        </div>

        {/* Slider */}
        <div className="sayri-slider-container">
          <div
            className="sayri-slider-wrapper"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="sayri-slide col-md-6">
                <p className="sayri-text">{slide.text}</p>
                <span className="sayri-author">{slide.author}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="dots mt-3">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentIndex ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Sayri;
