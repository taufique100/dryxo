import React, { useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { AiOutlineLogin, AiOutlineUser, AiOutlineShoppingCart, AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import ProfileMenu from "../Profile/ProfileMenu";

const Navbars = () => {
  const [menu, setMenu] = useState(false);
  const {getItem} = useLocalStorage();
  const { isLoggedIn, userInfo, logout } = useAuth();

  const isUserLogin=()=>{
    const userData = JSON.parse(getItem('userInfo') || "{}");
    return userData?.role == 'user'
  }

  const closeMenu=()=>{
    setMenu(prev=>!prev);
  }

 const PrifileAcc = () => {
  return (
    <Nav className="login-wrapper">
      {!isUserLogin() ? (
        <Nav.Link
          as={NavLink}
          to="/login"
          onClick={() => setMenu(false)}
          style={{ padding: 0 }}
        >
          <span className="login-btn">
            <AiOutlineLogin className="login-icon" />
            <span>Login</span>
          </span>
        </Nav.Link>
      ) : (
        <ProfileMenu closeMenu={closeMenu} />
      )}
    </Nav>
  );
 };

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
        <div className="d-flex align-items-center gap-3">

          
          <div className="d-lg-none">
            <PrifileAcc/>
          </div>
          <Navbar.Toggle />
        </div>

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
          <PrifileAcc/>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
};

export default Navbars;
