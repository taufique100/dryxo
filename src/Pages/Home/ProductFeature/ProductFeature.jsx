import React from "react";
import blog3 from "../../../assets/homeproduct.png";
import icon1 from "../../../assets/icon1.png";
import icon2 from "../../../assets/icon2.png";
import icon3 from "../../../assets/icon3.png";
import icon4 from "../../../assets/icon4.png";
import video from "../../../assets/DRYXOVideo.mp4";
import { motion } from "framer-motion";
import "./ProductF.css";

const ProductFeature = () => {
  return (
    <div className="container my-0">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 1.7 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-center mb-4 product-img-wrapper"
      >
        <img src={blog3} alt="Product" className="img-fluid product-img" />
      </motion.div>

      {/* Icons Section */}
      <div className="row text-center mb-5 g-2 d-flex justify-content-center">
        {[
          { img: icon1, text: "Double Perforated Top Sheet" },
          { img: icon2, text: "Fresh Fragrance" },
          { img: icon3, text: "Soft Edge Arms" },
          { img: icon4, text: "Superlative Emboss Design" },
        ].map((item, idx) => (
          <div key={idx} className="col-6 col-md-2 ">
            <div className="feature-icon text-center ">
              <img src={item.img} alt={item.text} className="img-fluid mb-2" />
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Features List */}
      <div className="features-section text-center mb-5">
        <h3 className="mb-4 text-warning">PRODUCT FEATURES</h3>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <ul className="list-unstyled text-start ">
              <li className="lists">
                🌿 Eco-Friendly: 100% biodegradable and organic materials
              </li>
              <li className="lists">
                💧 Quick Absorption: Double perforated top sheet for dryness
              </li>
              <li className="lists">
                🌸 Fresh Fragrance: Keeps you feeling fresh all day
              </li>
            </ul>
          </div>
          <div className="col-md-5">
            <ul className="list-unstyled text-start">
              <li className="lists">
                🔋 Anion Technology: Neutralizes odors and prevents bacteria
              </li>
              <li className="lists">
                🪶 Soft Edge Arms: Prevents rashes and irritation
              </li>
              <li className="lists">
                🛡️ Leak-Proof Design: Even flow for complete protection
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mb-5 mt-4">
          <h3>Seminar videos</h3>
          <video src={video} className="video-box" controls muted />
        </div>
      </div>
    </div>
  );
};

export default ProductFeature;
