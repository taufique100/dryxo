import React from "react";
import "./PadProduct.css";
import PadProduct1 from "../../assets/productpadfile2.png";
import PadProduct2 from "../../assets/productpadfile1.jpeg"; 

export const PadProduct = () => {
  return (
    <div className="container">
      <div className="row g-3 align-items-center">
        {/* First Image */}
        <div className="col-12 col-md-6 text-center">
          <img
            src="https://dryxo.in/wp-content/uploads/2023/08/Bio-icon-2000x2000_624x.webp"
            alt="Dryxo Media"
            className="img-fluid rounded"
          />
        </div>

        <div className="col-12 col-md-6 text-center">
          <img
            src={PadProduct2}
            alt="Dryxo Media"
            className="img-fluid rounded img2"
          />
        </div>
      </div>
    </div>
  );
};
