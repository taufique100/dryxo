import React, { useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { AiOutlineLogin, AiOutlineUser, AiOutlineShoppingCart, AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

const Navbars = () => {
  const [menu, setMenu] = useState(false);
  const {getItem} = useLocalStorage();
  const { isLoggedIn, userInfo, logout } = useAuth();

  const isUserLogin=()=>{
    const userData = JSON.parse(getItem('userInfo') || "{}");
    return userData?.role == 'user'
  }

 const PrifileAcc=()=>{
  return(
    <>
      {/* 🔥 LOGIN / PROFILE DROPDOWN */}
          <Nav className="login-wrapper">
            {!isUserLogin() ? (
              <Nav.Link
                as={NavLink}
                to="/login"
                className="login-link"
                onClick={() => setMenu(false)}
              >
                <AiOutlineLogin className="login-icon" />
                Login
              </Nav.Link>
            ) : (
              <Dropdown align="end" className="profile-dropdown">
                <Dropdown.Toggle
                  variant="link"
                  className="profile-toggle"
                  id="profile-dropdown"
                >
                  <div className="profile-label">
                    <AiOutlineUser className="profile-icon" />
                    {/* {userInfo?.name && <span>{userInfo.name.split(" ")[0]}</span>} */}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="profile-menu">
                  <div className="profile-menu-header">
                    <AiOutlineUser className="profile-menu-avatar" />
                    <div>
                      <div className="profile-menu-name">{userInfo?.name || "My Account"}</div>
                      <div className="profile-menu-email">{userInfo?.email || "Account settings"}</div>
                    </div>
                  </div>
                  <Dropdown.Divider />
                  <Dropdown.Item as={NavLink} to="/orders" onClick={() => setMenu(false)} className="profile-item">
                    <AiOutlineShoppingCart className="profile-item-icon" /> Orders
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/change-password" onClick={() => setMenu(false)} className="profile-item">
                    <AiOutlineSetting className="profile-item-icon" /> Change Password
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout} className="profile-item logout-item">
                    <AiOutlineLogout className="profile-item-icon" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
    </>
  )
 }

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
              as={NavLink}PrifileAcc
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
