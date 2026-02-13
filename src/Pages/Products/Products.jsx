import React from 'react'
import "./Products.css";
import banner from "../../assets/product1.jpg"
import { PadProduct } from './PadProduct';
import ProductCard from './Purchase/ProductCard';
import { motion } from 'framer-motion';
import sanitaryProducts  from "./sanitaryProducts";


const Products = () => {
  return (
    <>
      <div style={{ marginTop: "0rem" }} className="">
        {/* <div className="banner">
        <img src={banner} alt="" className="img" />
      </div> */}
        <div className=" head text-center mt-4 mb-3">
          <motion.h2
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="head mb-5"
          >
            Dryxo Sanitary Pad
          </motion.h2>
        </div>
        {/* <PadProduct /> */}
        <div className="purchase mb-3">
          {/* <Parchase /> */}
          <ProductCard productList={sanitaryProducts} />
        </div>

        <div className="feature mb-5">
          <h2 className="title mb-3">PRODUCT FEATURES</h2>
          <p className=" mb-5">
            Double Perforated Top sheet quickly absorbs the flow and helps keep
            you dry.
            <br />
            Fresh Fragrance locks the bad odour to keep you feeling fresh all
            day long.
            <br />
            Soft-edge arms that prevent and control rashes
            <br />
            Superlative emboss design that ensures even flow throughout.
          </p>
        </div>
      </div>
    </>
  );
}

export default Products