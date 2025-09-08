import React from 'react'
import "./Products.css";
import banner from "../../assets/productBanner.jpg"
import { PadProduct } from './PadProduct';

const Products = () => {
  return (
    <>
      <div className="banner">
        <img src={banner} alt="" className="img" />
      </div>
      <div className=" head text-center mt-4 mb-3">
        <h2 className="head mb-5">Dryxo Sanitary Pad</h2>
      </div>
      <PadProduct />
    </>
  );
}

export default Products