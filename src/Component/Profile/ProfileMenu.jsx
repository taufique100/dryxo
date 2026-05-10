import React from "react";
import { Dropdown } from "react-bootstrap";
import { AiOutlineLogout, AiOutlineSetting, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import { NavLink, useNavigate } from "react-router-dom";

const ProfileMenu = ({closeMenu}) => {

    const navigation = useNavigate();
    const { getItem } = useLocalStorage();
    const { isLoggedIn, userInfo, logout } = useAuth();

    const isUserLogin = () => {
        const userData = JSON.parse(getItem('userInfo') || "{}");
        return userData?.role == 'user'
    }


    return (
        <>

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
                    <div onClick={()=>navigation('/profile')} className="profile-menu-header">
                        <AiOutlineUser className="profile-menu-avatar" />
                        <div>
                            <div className="profile-menu-name">{userInfo?.name || "My Account"}</div>
                            <div className="profile-menu-email">{userInfo?.email || "Account settings"}</div>
                        </div>
                    </div>
                    <Dropdown.Divider />
                    <Dropdown.Item as={NavLink} to="/profile" onClick={() => closeMenu()} className="profile-item">
                        <AiOutlineUser className="profile-item-icon" /> My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/orders" onClick={() => closeMenu()} className="profile-item">
                        <AiOutlineShoppingCart className="profile-item-icon" /> Orders
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/change-password" onClick={() => closeMenu()} className="profile-item">
                        <AiOutlineSetting className="profile-item-icon" /> Change Password
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout} className="profile-item logout-item">
                        <AiOutlineLogout className="profile-item-icon" /> Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </>
    )
}

export default ProfileMenu;