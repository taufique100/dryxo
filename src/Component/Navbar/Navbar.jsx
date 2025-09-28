import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import ContactBar from "../ContactBar/ContactBar";

const Navbars = () => {
  return (
    <>
    <div className="contactbaer">
      <ContactBar />
    </div>
      <Navbar
        expand="lg"
        bg="white"
        variant="white"
        sticky="top"
        className="bg-white shadow-sm text-dark  fw-bold"
      >
        <Container fluid>
          {/*  Logo */}
          <Navbar.Brand
            as={NavLink}
            to="/home"
            className=" logo py-0 fw-bold fs-4"
          >
            <img className="nav-logo" src={logo} alt="logo" />
          </Navbar.Brand>

          {/* Toggle Button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Nav Links */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className=" navbars flex gap-5 "
          >
            <Nav className=" bg-white mx-auto d-flex align-items-center gap-3 navbar-nav">
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
                Channel Partner
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
