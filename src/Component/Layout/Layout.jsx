import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbars from "../Navbar/Navbar";
import "./Layout.css";
import ContactBar from "../ContactBar/ContactBar";
import { useSelector } from "react-redux";

const Layout = () => {
  const contactBarHide = useSelector((state) => state.loader.contactBarHide)
  const [open, setOpen] = useState(contactBarHide)
  console.log(contactBarHide);
  useEffect(()=>{
    setOpen(contactBarHide)
  },[contactBarHide])
  return (
    <>
      <div className="layou_main container-fluid px-0">
        <div className={`contactbaer ${open ? 'd-none' : '' }`}>
          <ContactBar />
        </div>
        <div className="header_position">
          <Navbars />
        </div>
        <div className="outlet_wrapper mt-0">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
