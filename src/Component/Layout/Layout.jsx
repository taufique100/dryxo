import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbars from "../Navbar/Navbar";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <div className="layou_main container-fluid">
        
        <div>
          <Navbars />
        </div>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
