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
      
      <div className="feature mb-5">
        <h2 className="title mb-3">PRODUCT FEATURES</h2>
        <p className='mb-5'>
          Double Perforated Top sheet quickly absorbs the flow and helps keep
          you dry.
          <br />
          Fresh Fragrance locks the bad odour to keep you feeling fresh all day
          long.
          <br />
          Soft-edge arms that prevent and control rashes
          <br />
          Superlative emboss design that ensures even flow throughout.
        </p>
      </div>
    </>
  );
}

export default Products