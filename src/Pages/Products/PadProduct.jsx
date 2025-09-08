import React from 'react'
import "./PadProduct.css"
import PadProduct1 from "../../assets/productpadfile2.png"
import PadProduct2 from "../../assets/productpadfile1.jpeg";
export const PadProduct = () => {
  return (
    <>
     
      <div className="content row align-items-start">
        <div className="col-md-6 mb-4 mb-md-0 text-end">
          <img
            src={PadProduct1}
            alt="Dryxo Media"
            className="img-fluid rounded "
            height={300}
          />

        </div>
          <div className="col-md-6 mb-4 mb-md-0 text-start">
            <img
              src={PadProduct2}
              alt="Dryxo Media"
              className="img2 img-fluid rounded "
              height={300}
            />
          </div>
        
      </div>
    </>
  );
}
 