import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbars from "../Navbar/Navbar";
import "./Layout.css";
import ContactBar from "../ContactBar/ContactBar";

const Layout = () => {
  return (
    <>
      <div className="layou_main container-fluid px-0">
        <div className="contactbaer">
          <ContactBar />
        </div>
        <div className="header_position">
          <Navbars />
        </div>
        <div className="outlet_wrapper">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
