import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import {
  AiOutlineLogin, AiOutlineUser,
  AiOutlineShoppingCart, AiOutlineSetting, AiOutlineLogout,
} from "react-icons/ai";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import ProfileMenu from "../Profile/ProfileMenu";
import useLocalStorage from "../hooks/useLocalStorage";

const NAV_LINKS = [
  { to: "/home", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/media", label: "Media" },
  { to: "/blog", label: "Blog" },
  { to: "/pad_atm", label: "Pad ATM" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbars() {
  const [open, setOpen] = useState(false);
  const { getItem } = useLocalStorage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const isUserLogin = () => {
    const u = JSON.parse(getItem("userInfo") || "{}");
    return !!u?.role;
  };

  const close = () => setOpen(false);

  const goTo = (path) => { close(); navigate(path); };

  /* ── user info for mobile drawer ── */
  const userInfo = JSON.parse(getItem("userInfo") || "{}");

  return (
    <>
      {/* ── MAIN NAVBAR ── */}
      <nav className="main-navbar">
        <div className="nav-inner">

          {/* Logo */}
          <NavLink to="/home" className="nav-brand" onClick={close}>
            <img src={logo} alt="Dryxo" className="nav-logo" />
          </NavLink>

          {/* Desktop links */}
          <ul className="nav-links-desktop">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}>
                  {label}
                </NavLink>
              </li>
            ))}
            {isUserLogin() && (
              <li>
                <NavLink to="/my-order" className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}>
                  My Order
                </NavLink>
              </li>
            )}
          </ul>

          {/* Desktop right — login or profile */}
          <div className="nav-right-desktop">
            {!isUserLogin() ? (
              <NavLink to="/login" className="login-btn">
                <AiOutlineLogin className="login-icon" />
                <span>Login</span>
              </NavLink>
            ) : (
              <ProfileMenu closeMenu={close} />
            )}
          </div>

          {/* Mobile right — hamburger only */}
          <button
            className={`nav-hamburger ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
          </button>

        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`nav-drawer ${open ? "drawer-open" : ""}`}>
        {/* graphic SVG bg */}
        <svg className="drawer-svg-bg" viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 52} y1="0" x2={i * 52} y2="700" stroke="rgba(255,68,0,0.05)" strokeWidth="1" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 52} x2="400" y2={i * 52} stroke="rgba(255,68,0,0.05)" strokeWidth="1" />
          ))}
          <line x1="0" y1="700" x2="280" y2="0" stroke="rgba(255,68,0,0.06)" strokeWidth="1" />
          <line x1="120" y1="700" x2="400" y2="0" stroke="rgba(210,134,17,0.04)" strokeWidth="1" />
          <path d="M -40 700 Q 200 200 440 700" fill="none" stroke="rgba(255,68,0,0.06)" strokeWidth="1.5" />
          <circle cx="60" cy="620" r="120" fill="rgba(255,68,0,0.04)" />
          <circle cx="340" cy="80" r="100" fill="rgba(210,134,17,0.04)" />
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <circle key={`d${r}-${c}`} cx={c * 52 + 26} cy={r * 100 + 50} r="1.2" fill="rgba(255,255,255,0.04)" />
            ))
          )}
        </svg>

        <div className="drawer-content">

          {/* ── Profile section at top of drawer ── */}
          {isUserLogin() ? (
            <div className="drawer-profile">
              <div className="drawer-avatar">
                <AiOutlineUser size={22} />
              </div>
              <div className="drawer-user-info">
                <p className="drawer-user-name">{userInfo?.name || "My Account"}</p>
                <p className="drawer-user-email">{userInfo?.email || ""}</p>
              </div>
            </div>
          ) : (
            <div className="drawer-login-prompt">
              <p>Welcome to Dryxo</p>
              <NavLink to="/login" className="drawer-login-btn" onClick={close}>
                <AiOutlineLogin size={15} /> Sign In
              </NavLink>
            </div>
          )}

          <div className="drawer-divider" />

          {/* ── Nav links ── */}
          <ul className="drawer-nav-list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => `drawer-link ${isActive ? "drawer-link-active" : ""}`}
                  onClick={close}
                >
                  <span className="drawer-link-dot" />
                  {label}
                </NavLink>
              </li>
            ))}
            {isUserLogin() && (
              <li>
                <NavLink
                  to="/my-order"
                  className={({ isActive }) => `drawer-link ${isActive ? "drawer-link-active" : ""}`}
                  onClick={close}
                >
                  <span className="drawer-link-dot" />
                  My Order
                </NavLink>
              </li>
            )}
          </ul>

          {/* ── Logged-in quick actions ── */}
          {isUserLogin() && (
            <>
              <div className="drawer-divider" />
              <ul className="drawer-action-list">
                <li>
                  <button className="drawer-action-btn" onClick={() => goTo("/profile")}>
                    <AiOutlineUser className="dab-icon" /> My Profile
                  </button>
                </li>
                <li>
                  <button className="drawer-action-btn" onClick={() => goTo("/orders")}>
                    <AiOutlineShoppingCart className="dab-icon" /> Orders
                  </button>
                </li>
                <li>
                  <button className="drawer-action-btn" onClick={() => goTo("/change-password")}>
                    <AiOutlineSetting className="dab-icon" /> Change Password
                  </button>
                </li>
                <li>
                  <button className="drawer-action-btn drawer-logout" onClick={() => { logout(); close(); }}>
                    <AiOutlineLogout className="dab-icon" /> Logout
                  </button>
                </li>
              </ul>
            </>
          )}

        </div>
      </div>

      {/* ── OVERLAY ── */}
      {open && <div className="nav-overlay" onClick={close} />}
    </>
  );
}
