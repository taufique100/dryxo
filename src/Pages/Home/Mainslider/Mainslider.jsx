
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mainslider.css";
import mainimg from "../../../assets/maneslider.jpg";

const Mainslider = () => {
  return (
    <div className="mainslider-container text-white ">
      {/* Background Image */}
      <img src={mainimg} alt="bgc img" className="slider-img" />

      {/* Orange Overlay */}
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className="text-center content-box px-3 px-md-5 py-3">
          <h3 className="fw-bold display-6 mt-3">
            Dryxo A Simple Change for a Better Tomorrow
          </h3>
          <p className="mb-2">------------------------------</p>
          <p className="lead mb-3">
            Every year, India uses <strong>12.3 billion sanitary pads</strong>,
            creating <strong>113,000 tonnes</strong> of waste. At Dryxo, we
            believe small choices can make a big difference. Our Biodegradable
            Sanitary Napkins break down naturally, reducing waste and protecting
            our planet. Choose Dryxo and join us in caring for the Earth, one
            step at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mainslider;

