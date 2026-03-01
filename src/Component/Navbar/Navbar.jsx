import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { AiOutlineLogin } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa";


const Navbars = () => {
  const [menu, setMenu] = useState(false);
  const { cart } = useSelector((state) => state.orderSlice);


  return (
    <Navbar
      expand="lg"
      sticky="top"
      expanded={menu}
      onToggle={() => setMenu(!menu)}
      className={`main-navbar ${menu ? "menu-open" : ""}`}
    >
      <Container fluid>
        {/* LOGO */}
        <Navbar.Brand as={NavLink} to="/home">
          <img src={logo} alt="logo" className="nav-logo" />
        </Navbar.Brand>

        {/* TOGGLE */}
        <Navbar.Toggle />

        {/* MENU + LOGIN */}
        <Navbar.Collapse>
          {/* CENTER MENU */}
          <Nav className="mx-auto navbar-nav">
            <Nav.Link as={NavLink} to="/home" onClick={() => setMenu(false)}>
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/products"
              onClick={() => setMenu(false)}
            >
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/media" onClick={() => setMenu(false)}>
              Media
            </Nav.Link>
            <Nav.Link as={NavLink} to="/blog" onClick={() => setMenu(false)}>
              Blog
            </Nav.Link>
            <Nav.Link as={NavLink} to="/pad_atm" onClick={() => setMenu(false)}>
              Pad ATM
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={() => setMenu(false)}>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={() => setMenu(false)}>
              Contact
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/my-order"
              onClick={() => setMenu(false)}
            >
              My Order
            </Nav.Link>
          </Nav>

          <Nav className="login-wrapper">
            <Nav.Link as={NavLink} to="/cart" onClick={() => setMenu(false)}>
              <FaCartArrowDown />
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/login"
              className="login-link"
              onClick={() => setMenu(false)}
            >
              <AiOutlineLogin /> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
