import React from "react";
import "./Home.css";
import Sweeper from "./Sweeper/Sweeper";
import WhyUs from "./WhyUs";
import { PadProduct } from "../Products/PadProduct";
// import Safty from "./Safty/Saft";

const Home = () => {
  return (
    <>
      <div>
        <Sweeper />
        <PadProduct />
        <WhyUs />
        {/* <Safty /> */}
      </div>
    </>
  );
};

export default Home;
