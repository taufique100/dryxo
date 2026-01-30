import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation} from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { AiOutlineLogin } from "react-icons/ai";

const Navbars = () => {
  const [menue, setMenue] = useState(false);
  const location = useLocation();
  

  const handleToggle = () => setMenue(!menue);
  // const handleClose = () => setMenue(false);

  const toggleMenu = () => {
    // setMenue((prev) => !prev);
    setMenue(false)
  };

  // useEffect(() => {
  //   setMenue(false);
  // }, [location.pathname]);

  return (
    <>
      <Navbar
        expand="lg"
        bg="white"
        variant="white"
        sticky="top"
        expanded={menue}
        onToggle={setMenue}
        className="bg-white shadow-sm text-dark fw-bold"
      >
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand
            as={NavLink}
            to="/home"
            className="logo py-0 fw-bold fs-4"
          >
            <img className="nav-logo" src={logo} alt="logo" />
          </Navbar.Brand>

          {/* Toggle Button */}
          <Navbar.Toggle
            // aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />

          {/* Nav Links */}
          <Navbar.Collapse id="basic-navbar-nav" className="navbars flex gap-5">
            <Nav className="bg-white mx-auto d-flex align-items-center gap-3 navbar-nav">
              <Nav.Link onClick={toggleMenu} as={NavLink} to="/home">
                Home
              </Nav.Link>
              <Nav.Link onClick={toggleMenu} as={NavLink} to="/products">
                Products
              </Nav.Link>
              <Nav.Link onClick={toggleMenu} as={NavLink} to="/media">
                Media
              </Nav.Link>
              <Nav.Link onClick={toggleMenu} as={NavLink} to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link onClick={toggleMenu} as={NavLink} to="/pad_atm">
                Pad ATM
              </Nav.Link>
              <Nav.Link onClick={toggleMenu} as={NavLink} to="/about">
                About
              </Nav.Link>
              <Nav.Link onClick={toggleMenu} as={NavLink} to="/chanel_partner">
                Channel Partner
              </Nav.Link>
              <Nav.Link onClick={toggleMenu} as={NavLink} to="/contact">
                Contact Us
              </Nav.Link>
              <Nav.Link onClick={toggleMenu} as={NavLink} to="/my-order">
                My Order
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {/* Login link */}
          <Nav className="d-flex align-items-center">
            <Nav.Link onClick={toggleMenu} as={NavLink} to="/login" className="nav-login d-flex align-items-center gap-2">
              <AiOutlineLogin className="login-icon" />
              <span className="login-text">Login</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;

