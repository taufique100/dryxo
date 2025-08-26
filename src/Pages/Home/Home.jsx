import React from "react";
import "./Home.css";
import Sweeper from "./Sweeper/Sweeper";
import WhyUs from "./WhyUs";
// import Safty from "./Safty/Saft";

const Home = () => {
  return (
    <>
      <div>
        <Sweeper />
        <WhyUs />
        {/* <Safty /> */}
      </div>
    </>
  );
};

export default Home;
