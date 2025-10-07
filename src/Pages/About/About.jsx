import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
// Assets
import mission from "../../assets/product1.jpg";
import irfan from "../../assets/irfan.jpg";
import samina from "../../assets/samina.jpg";
import product from "../../assets/padsBlogs1.jpg";
import video from "../../assets/about-video.mp4";
import { useLocation } from "react-router-dom";
import "./About.css";

const About = () => {
  const location = useLocation();
  console.log("location", location);
  return (
    <div id="about" className="about-page">
      <section className="who-we-are py-5">
        <div className="container text-center">
          <h2 className="section-title mb-4">WHO WE ARE</h2>
          <div className="para text-start">
            <p>
              At DRYXO, we are driven by a mission to revolutionize menstrual
              care in India. With over 35.5 crore menstruating women in the
              country, many still lack access to high-quality, comfortable
              sanitary products. We believe that safe, hygienic, and sustainable
              menstrual care is every woman’s right. That’s why DRYXO was
              founded in 2024, to provide products that offer unmatched comfort,
              health benefits, and eco-friendliness.
            </p>
            <p>
              <b>Feel Dry, Feel Free</b> isn’t just our motto—it’s our
              commitment to making menstruation a natural, empowering part of
              every woman’s life. With us, menstruation becomes a natural part
              of life to embrace with pride, comfort, and confidence. You can
              live the life you want, without any conditions. Choose{" "}
              <b> DRYXO,</b> the best organic sanitary pads brand crafted with
              100% natural cotton. Gentle on your skin and kind to the planet,
              DRYXO offers unmatched comfort, protection, and sustainability.
            </p>
            <p>Make the switch today for a healthier period experience!</p>
            <h5 className="text-center">
              If you check the health of a woman, you check the health of the
              society
            </h5>
            <p>
              The essence of womanhood should be nurtured by every woman who is
              a mother, daughter, wife, or sister. The essence of womanhood is
              about reawakening authentic feminine care during the menstruation
              phase at its best for every woman. Let us celebrate the essence of
              womanhood with dryxo for problem-free menstruation for all women.
            </p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="vision-mission py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.5 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-md-6 text-center mb-2"
            >
              <img
                src={mission}
                alt="Vision"
                className="img-fluid rounded shadow-lg"
              />
            </motion.div>
            <div className="col-md-6">
              <h4 className="fw-bold text-orange">DRYXO’S VISION</h4>
              <p>
                To empower women everywhere by providing safe, eco-friendly, and
                accessible menstrual care solutions that redefine hygiene
                standards.
              </p>

              <h4 className="fw-bold text-orange mt-4">DRYXO’S MISSION</h4>
              <p>
                Our mission is to make personal hygiene and sanitation a
                priority across India, ensuring every woman has access to
                affordable, high-quality menstrual care products.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="founders py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center mb-4  position-relative">
            <hr className="flex-grow-1 custom-line" />
            <span className="gradient-box mx-3 b">Directer Message</span>
            <hr className="flex-grow-1 custom-line" />
          </div>

          <div className="row text-center">
            <motion.div className="col-md-6 mb-4">
              <motion.img
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                src={irfan}
                alt="Founder"
                className="founder-img mb-3"
              />
              <h5 className="fw-bold text-orange">Mohammad Irfan Khan</h5>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                transition={{ duration: 2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-muted text-start"
              >
                As I look back on our journey at DRYXO, I am filled with pride
                and gratitude for the progress we’ve made. Our commitment to
                excellence, innovation, and teamwork has brought us to new
                heights. At DRYXO, our goal has always been to remove any
                barriers to menstrual hygiene. No woman should have to
                compromise her education, career, or self-esteem because of a
                lack of access to quality period products. We’re here to support
                every woman on her journey, to make sure that periods are never
                a hindrance, only a phase of growth and empowerment.
              </motion.p>
            </motion.div>
            <div className="col-md-6 mb-4">
              <motion.img
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                src={samina}
                alt="Founder"
                className="founder-img mb-3"
              />
              <h5 className="fw-bold text-orange">Samina Afroz</h5>
              <motion.p
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 2 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-muted text-start"
              >
                In the face of challenges, we’ve not only persevered but
                thrived, driven by our dedication to providing women with the
                best care and comfort. Our journey has taught us the power of
                unity, resilience, and innovation. Together, we have achieved
                remarkable milestones, from expanding our reach to developing
                products that meet the unique needs of Indian women. DRYXO was
                created to be more than just a product; it’s a partner in every
                woman’s life, standing by her side during one of the most
                intimate and defining parts of womanhood.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <hr />
      {/* PRODUCTS */}
      <section className="products py-5 bg-light">
        <div className="container">
          <h3 className="section-title text-orange text-center mb-4">
            Our Innovative Products
          </h3>
          <div className="row align-items-center mt-0 mb-0">
            <div className="col-md-7">
              <h5 className="fw-bold">Transforming Menstrual Care</h5>
              <p>
                At DRYXO, our goal is to redefine comfort and hygiene during
                menstruation. We’re proud to be among the few sanitary pad
                brands that prioritize eco-friendly disposal, offering
                biodegradable bags within each pack. Our products are designed
                to meet diverse needs, ensuring that every woman can experience
                a comfortable, worry-free period.
              </p>
            </div>
            <div className="col-md-5 text-center">
              <motion.img
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 1.5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                src={product}
                alt="Dryxo Product"
                className="img-fluid rounded "
              />
            </div>
          </div>
        </div>
      </section>
      <hr />

      {/* MANUFACTURING */}
      <section className="manufacturing py-5">
        <div className="container">
          <h3 className="section-title text-orange mb-4">
            Manufacturing at DRYXO
          </h3>
          <div className="row align-items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.5 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-md-6 text-center mb-3"
            >
              <video
                src={video}
                className="img-fluid rounded shadow-lg"
                controls
                muted
              >
                Your browser does not support the video .
              </video>
            </motion.div>
            <div className="col-md-6">
              <p>
                Supported by latest, state-of-art technology, DRYXO has set up
                the manufacturing unit Uttar Pradesh. Considering that we
                strongly believe in delivering the best, we make no compromises
                in either the quality of our products, or in our R&D
                investments.
              </p>
              <p>
                In order to match the global standards, DRYXO Sanitary Napkins
                were designed after in-depth research that had stretched over a
                span of more than two years. Developed and designed by US
                professionals with extensive experience in feminine hygiene,
                DRYXO Sanitary Napkins possess all premium features one would
                hope for.
              </p>
              <p>
                Similarly, our Hand Hygiene and Baby Care range has been
                manufactured in a way where quality comes first, and principles
                are respected.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
