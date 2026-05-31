import React from "react";
import { Dropdown } from "react-bootstrap";
import {
    AiOutlineLogout, AiOutlineSetting,
    AiOutlineShoppingCart, AiOutlineUser,
} from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import { NavLink, useNavigate } from "react-router-dom";

const ProfileMenu = ({ closeMenu }) => {
    const navigate = useNavigate();
    const { getItem } = useLocalStorage();
    const { userInfo, logout } = useAuth();

    const close = () => {
        if (typeof closeMenu === "function") closeMenu();
    };

    const goTo = (path) => { close(); navigate(path); };

    const info = userInfo || JSON.parse(getItem("userInfo") || "{}");

    return (
        <Dropdown align="end" className="profile-dropdown">
            <Dropdown.Toggle
                variant="link"
                className="profile-toggle"
                id="profile-dropdown-toggle"
            >
                <div className="profile-label">
                    <AiOutlineUser className="profile-icon" />
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="profile-dropdown-menu">
                {/* Header */}
                <div className="profile-menu-header" onClick={() => goTo("/profile")}>
                    <AiOutlineUser className="profile-menu-avatar" />
                    <div>
                        <div className="profile-menu-name">{info?.name || "My Account"}</div>
                        <div className="profile-menu-email">{info?.email || "Account settings"}</div>
                    </div>
                </div>

                <Dropdown.Divider />

                <Dropdown.Item
                    as={NavLink} to="/profile"
                    onClick={close}
                    className="profile-item"
                >
                    <AiOutlineUser className="profile-item-icon" /> My Profile
                </Dropdown.Item>

                <Dropdown.Item
                    as={NavLink} to="/my-order"
                    onClick={close}
                    className="profile-item"
                >
                    <AiOutlineShoppingCart className="profile-item-icon" /> Orders
                </Dropdown.Item>

                <Dropdown.Item
                    as={NavLink} to="/change-password"
                    onClick={close}
                    className="profile-item"
                >
                    <AiOutlineSetting className="profile-item-icon" /> Change Password
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item
                    onClick={() => { 
                        logout();
                        close();
                        navigate("/products");
                    }}
                    className="profile-item logout-item"
                >
                    <AiOutlineLogout className="profile-item-icon" /> Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileMenu;
