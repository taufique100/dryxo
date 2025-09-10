import React from "react";
import "./Home.css";
import Sweeper from "./Sweeper/Sweeper";
import WhyUs from "./WhyUs";
import { PadProduct } from "../Products/PadProduct";



const Home = () => {
  return (
    <>
      <div>
        <Sweeper />
        <PadProduct />
        <WhyUs />
       
      </div>
    </>
  );
};

export default Home;
