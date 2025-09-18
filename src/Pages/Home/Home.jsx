import React from "react";
import "./Home.css";
import Sweeper from "./Sweeper/Sweeper";
import WhyUs from "./WhyUs";
import { PadProduct } from "../Products/PadProduct";
import Mainslider from "./Mainslider/Mainslider";
import ProductOverview from "./ProductOverview/ProductOverview";



const Home = () => {
  return (
    <>
      <div>
        <Sweeper />
        <PadProduct />
        <WhyUs />
        <Mainslider/>
        <ProductOverview />
      </div>
    </>
  );
};

export default Home;
