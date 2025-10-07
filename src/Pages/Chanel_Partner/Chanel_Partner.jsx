import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Chanel_Partner.css";
import join from "../../assets/join.jpg";
import { motion } from "framer-motion";

const Chanel_Partner = () => {
  return (
    <div className="partner-page mt-5">
      <div className="container my-5 mt-5">
        <div className="row align-items-start">
          {/* Image */}
          <div className="col-md-5 text-center mt-5">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.5 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="image-box"
            >
              <img src={join} alt="Dryxo" className="img-fluid shadow-lg" />
              <motion.h4
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="logo-text"
              >
                DRYXO
              </motion.h4>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="col-md-7">
            <h2 className="section-title mt-5">
              Join the Dryxo Empowerment Journey
            </h2>
            <p className="section-text ">
              At Dryxo, we’re not just selling sanitary pads—we’re empowering
              women to embrace their health with dignity. By partnering with us,
              you’ll help bring eco-friendly, high-quality products to women
              everywhere, giving them the comfort and care they deserve. Whether
              you’re a Retailer bringing our products to your community or a
              Franchise Partner expanding our mission, together we’ll grow a
              business that makes a real difference.
              <br />
              <br />
              Join us in our journey to make menstrual care accessible,
              sustainable, and empowering. Let’s build a legacy that impacts
              lives and communities. Together, we can take Dryxo to new heights
              while providing better care to those who need it most.
            </p>
          </div>
        </div>

        {/* Partner Form */}
        <div className="form-section mt-5">
          <h3 className="form-title">Join Our Partner Program</h3>
          <p className="form-subtitle">
            Fill out the form below to become a part of our journey to healthier
            menstrual care for all.
          </p>

          <form className="mt-4">
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Firm Name"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Mobile No"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your State"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your City"
                />
              </div>
              <div className="col-12">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Message"
                ></textarea>
              </div>
            </div>
            <button type="submit" className="btn  mt-4 px-5 py-2">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chanel_Partner;
