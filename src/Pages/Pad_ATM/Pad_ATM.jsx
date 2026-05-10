import React from 'react';
import "./Pad_ATM.css";
import ImageSlider from './ImageSlider';
import { motion } from 'framer-motion';

const Pad_ATM = () => {
  return (
    <div className="main">

      {/* ── HERO ── */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="padatm-header"
      >
        <h1 className="PAD">Pad ATM</h1>
      </motion.div>

      {/* ── SUPPORT STRIP ── */}
      <div className="heading">
        <div className="d-flex align-items-center justify-content-center text-center">
          <div className="flex-grow-1 d-none d-sm-block">
            <hr className="support-line" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="px-3 py-2 support-box"
          >
            Supporting PAD-ATM: A Step Towards Menstrual Dignity
          </motion.div>
          <div className="flex-grow-1 d-none d-sm-block">
            <hr className="support-line" />
          </div>
        </div>

        {/* ── BODY TEXT ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="writing"
        >
          <p className="para">
            At Dryxo, we're honored to support the PAD-ATM initiative by Glad Bharat Foundation,
            which brings affordable, accessible sanitary pads to women in remote, underserved areas.
            This initiative is about more than just providing products — it's about empowering women
            to manage their health with <strong>dignity and care</strong>. With PAD-ATMs placed in
            key locations like schools and community centers, women and girls can access sanitary
            pads with ease, helping them feel supported and secure throughout their menstrual cycle.
          </p>
          <p className="para">
            Through PAD-ATM, the Glad Bharat Foundation, along with local NGOs, is fostering a
            healthier future by encouraging the use of safe, hygienic menstrual products over
            traditional, often unsafe alternatives. Dryxo is proud to stand behind this impactful
            cause, as we believe that <strong>every woman deserves access</strong> to products that
            allow her to live her life fully and confidently, no matter where she is.
          </p>
        </motion.div>
      </div>

      {/* ── IMAGE SLIDER ── */}
      <div className="slider">
        <div className="slider-label">
          <span>Our Initiatives</span>
          <h2>PAD-ATM in Action</h2>
        </div>
        <ImageSlider />
      </div>

    </div>
  );
};

export default Pad_ATM;
