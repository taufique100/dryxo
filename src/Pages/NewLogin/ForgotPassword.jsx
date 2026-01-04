import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import LoginLogo from "../../assets/NewLoginPage/logo.png";
import { Button } from "react-bootstrap";


const ForgotPassword = ({ onCancel }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Local UI-only state and handlers (no API calls)
  const [credentials, setCredentials] = useState({
    UserName: "",
    Mobile: "",
    OTP: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [isForgot, setIsForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleForget = (e) => {
    e.preventDefault();
    // simple validation
    if (!credentials.UserName.trim() || !credentials.Mobile.trim()) {
      setSuccessMessage("Please enter username and mobile number.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsForgot(true);
      setSuccessMessage("OTP sent (UI-only). Proceed with reset.");
    }, 700);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (
      !credentials.OTP ||
      !credentials.Password ||
      !credentials.ConfirmPassword
    ) {
      setSuccessMessage("Please fill all fields.");
      return;
    }
    if (credentials.Password !== credentials.ConfirmPassword) {
      setSuccessMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Password reset successful (UI-only).");
      setTimeout(() => onCancel(), 800);
    }, 700);
  };

  const togglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="login_form_section">
      <div className="login_form">
        <div className="form_container">
          <a href="#" className="login_logo_link">
            <img src={LoginLogo} alt="Logo" className="login_logo" />
          </a>
          <h3 className="login_heading">
            {isForgot ? "Reset Password" : "Forgot Password"}
          </h3>
          {successMessage && (
            <p className="success_message">{successMessage}</p>
          )}
          <form onSubmit={isForgot ? handleReset : handleForget}>
            {!isForgot ? (
              <>
                <div className="form_group">
                  <label htmlFor="UserName" className="form_label">
                    Username <span className="text_danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="UserName"
                    name="UserName"
                    className="form_control"
                    placeholder="Enter your username"
                    value={credentials.UserName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form_group">
                  <label htmlFor="Mobile" className="form_label">
                    Mobile Number <span className="text_danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="Mobile"
                    name="Mobile"
                    maxLength={10}
                    className="form_control"
                    placeholder="Enter registered mobile number"
                    value={credentials.Mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form_group">
                  <label htmlFor="OTP" className="form_label">
                    OTP <span className="text_danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="OTP"
                    name="OTP"
                    className="form_control"
                    placeholder="Enter OTP"
                    value={credentials.OTP}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form_group">
                  <label htmlFor="Password" className="form_label">
                    New Password <span className="text_danger">*</span>
                  </label>
                  <div className="position_relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="Password"
                      name="Password"
                      className="form_control"
                      placeholder="Enter new password"
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
                      placeholder="Confirm new password"
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
              </>
            )}

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
              {loading
                ? "Processing..."
                : isForgot
                ? "Reset Password"
                : "Send OTP"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
