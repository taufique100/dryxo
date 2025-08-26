import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbars from "../Navbar/Navbar";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <div className="layou_main container-fluid px-0">
        <div>
          <Navbars />
        </div>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
