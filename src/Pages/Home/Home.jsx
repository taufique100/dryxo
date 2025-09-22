import React from "react";
import "./Home.css";
import Sweeper from "./Sweeper/Sweeper";
import WhyUs from "./WhyUs";
import { PadProduct } from "../Products/PadProduct";
import Mainslider from "./Mainslider/Mainslider";
import ProductOverview from "./ProductOverview/ProductOverview";
import ProductFeature from "./ProductFeature/ProductFeature";
import PadHome from "./PadHome/PadHome";
import Sayri from "./Sayri/Sayri";



const Home = () => {
  return (
    <>
      <div>
        <Sweeper />
        <PadProduct />
        <WhyUs />
        <Mainslider/>
        <ProductOverview />
        <ProductFeature/>
        <PadHome />
        <Sayri />
      </div>
    </>
  );
};

export default Home;
