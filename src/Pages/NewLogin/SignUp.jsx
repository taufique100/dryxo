import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import LoginLogo from "../../assets/NewLoginPage/logo.png";
import { Button } from "react-bootstrap";

import { errorNotify, successNotify } from "../../Utils/toastNotify";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onCancel }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    UserName: "",
    Email: "",
    Mobile: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (
      !credentials.UserName.trim() ||
      !credentials.Email.trim() ||
      !credentials.Password ||
      !credentials.ConfirmPassword
    ) {
      setSuccessMessage("Please fill all required fields.");
      return;
    }
    if (credentials.Password !== credentials.ConfirmPassword) {
      setSuccessMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    // Simulate signup (UI-only) instead of real API call
    setTimeout(() => {
      setLoading(false);
      successNotify("Signup successful (UI-only). Redirecting to login...");
      navigate('/login');
    }, 800);
  };

  const togglePassword = (field) => {
    if (field === "password") setShowPassword((s) => !s);
    else setShowConfirmPassword((s) => !s);
  };

  return (
    <div className="login_form_section">
      <div className="login_form">
        <div className="form_container">
          <a href="#" className="login_logo_link">
            <img src={LoginLogo} alt="Logo" className="login_logo" />
          </a>

          <h3 className="login_heading">Create an account</h3>
          {successMessage && (
            <p className="success_message">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <label htmlFor="UserName" className="form_label">
                Username <span className="text_danger">*</span>
              </label>
              <input
                type="text"
                id="UserName"
                name="UserName"
                className="form_control"
                placeholder="Choose a username"
                value={credentials.UserName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form_group">
              <label htmlFor="Email" className="form_label">
                Email <span className="text_danger">*</span>
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                className="form_control"
                placeholder="Enter your email"
                value={credentials.Email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form_group">
              <label htmlFor="Password" className="form_label">
                Password <span className="text_danger">*</span>
              </label>
              <div className="position_relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  name="Password"
                  className="form_control"
                  placeholder="Create a password"
                  value={credentials.Password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle_password"
                  onClick={() => togglePassword("password")}
                >
                  {showPassword ? (
                    <FiEye className="password_icon" />
                  ) : (
                    <FiEyeOff className="password_icon" />
                  )}
                </button>
              </div>
            </div>

            <div className="form_group">
              <label htmlFor="ConfirmPassword" className="form_label">
                Confirm Password <span className="text_danger">*</span>
              </label>
              <div className="position_relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                  className="form_control"
                  placeholder="Confirm password"
                  value={credentials.ConfirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle_password"
                  onClick={() => togglePassword("confirm")}
                >
                  {showConfirmPassword ? (
                    <FiEye className="password_icon" />
                  ) : (
                    <FiEyeOff className="password_icon" />
                  )}
                </button>
              </div>
            </div>

            <div className="form_footer" style={{ justifyContent: "flex-end" }}>
              <a href="#" className="forgot_link" onClick={onCancel}>
                Back to Login
              </a>
            </div>

            <Button
              type="submit"
              className="btn_primary px-4 py-2 border-0 rounded"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
