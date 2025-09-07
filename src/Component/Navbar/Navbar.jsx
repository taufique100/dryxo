import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbars = () => {
  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
        className="bg-dark shadow-sm"
      >
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={NavLink} to="/home" className="fw-bold fs-4">
            <img className="nav-logo" src={logo} alt="logo" height={80} />
          </Navbar.Brand>

          {/* Toggle Button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Nav Links */}
          <Navbar.Collapse id="basic-navbar-nav" className="flex gap-5">
            <Nav className=" bg-dark ms-auto">
              <Nav.Link as={NavLink} to="/home" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={NavLink} to="/media">
                Media
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link as={NavLink} to="/pad_atm">
                Pad ATM
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/chanel_partner">
                Chanel Partner
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact">
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;






