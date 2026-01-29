import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import LoginLogo from "../../assets/NewLoginPage/logo.png";
import { Button } from "react-bootstrap";
import { apiUrls } from "../../Utils/apiUrls";
import { errorNotify, successNotify } from "../../Utils/toastNotify";


const ForgotPassword = ({ onCancel }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    Email: "",
    OTP: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [step, setStep] = useState("email"); // email, otp, reset
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    
    if (!credentials.Email.trim()) {
      setErrorMessage("Please enter email address.");
      errorNotify("Please enter email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.Email)) {
      setErrorMessage("Please enter a valid email address.");
      errorNotify("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending OTP request with email:", credentials.Email);
      const response = await axios.post(apiUrls.forgotPassword, {
        email: credentials.Email,
      });

      console.log("OTP Response:", response?.data);

      if (response?.data?.success || response?.data?.message) {
        setSuccessMessage(response?.data?.message || "OTP sent successfully. Please check your email.");
        successNotify("OTP sent successfully!");
        setStep("otp");
      } else {
        setErrorMessage("Failed to send OTP. Please try again.");
        errorNotify("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";
      setErrorMessage(errorMsg);
      errorNotify(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!credentials.OTP.trim()) {
      setErrorMessage("Please enter OTP.");
      errorNotify("Please enter OTP.");
      return;
    }

    // OTP verified, move to password reset
    setSuccessMessage("OTP verified! Now set your new password.");
    setStep("reset");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!credentials.Password || !credentials.ConfirmPassword) {
      setErrorMessage("Please fill all password fields.");
      errorNotify("Please fill all password fields.");
      return;
    }

    if (credentials.Password !== credentials.ConfirmPassword) {
      setErrorMessage("Passwords do not match.");
      errorNotify("Passwords do not match.");
      return;
    }

    if (credentials.Password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      errorNotify("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      console.log("Resetting password with:", {
        email: credentials.Email,
        otp: credentials.OTP,
        newPassword: credentials.Password,
      });

      const response = await axios.post(apiUrls.resetPassword, {
        email: credentials.Email,
        otp: credentials.OTP,
        newPassword: credentials.Password,
      });

      console.log("Reset Password Response:", response?.data);

      if (response?.data?.success || response?.data?.message) {
        setSuccessMessage("Password reset successfully! Redirecting to login...");
        successNotify("Password reset successfully!");
        setTimeout(() => {
          onCancel();
        }, 1500);
      } else {
        setErrorMessage(response?.data?.message || "Failed to reset password");
        errorNotify(response?.data?.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";
      setErrorMessage(errorMsg);
      errorNotify(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const goBackToEmail = () => {
    setStep("email");
    setCredentials({ ...credentials, OTP: "", Password: "", ConfirmPassword: "" });
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="login_form_section">
      <div className="login_form">
        <div className="form_container">
          <a href="#" className="login_logo_link">
            <img src={LoginLogo} alt="Logo" className="login_logo" />
          </a>
          <h3 className="login_heading">
            {step === "email" ? "Forgot Password" : step === "otp" ? "Verify OTP" : "Reset Password"}
          </h3>
          
          {successMessage && (
            <div style={{ color: "green", marginBottom: "15px", fontSize: "14px" }}>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={step === "email" ? handleSendOTP : step === "otp" ? handleVerifyOTP : handleResetPassword}>
            {step === "email" && (
              <>
                <div className="form_group">
                  <label htmlFor="Email" className="form_label">
                    Email Address <span className="text_danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    className="form_control"
                    placeholder="Enter registered email address"
                    value={credentials.Email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="form_group">
                  <label className="form_label">
                    Email: <strong>{credentials.Email}</strong>
                  </label>
                </div>
                <div className="form_group">
                  <label htmlFor="OTP" className="form_label">
                    OTP <span className="text_danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="OTP"
                    name="OTP"
                    className="form_control"
                    placeholder="Enter OTP sent to your email"
                    value={credentials.OTP}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </>
            )}

            {step === "reset" && (
              <>
                <div className="form_group">
                  <label className="form_label">
                    Email: <strong>{credentials.Email}</strong>
                  </label>
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
                      placeholder="Enter new password (min 6 characters)"
                      value={credentials.Password}
                      onChange={handleChange}
                      required
                      disabled={loading}
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
                      disabled={loading}
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

            <div className="form_footer" style={{ justifyContent: "space-between", alignItems: "center" }}>
              {step !== "email" && (
                <button
                  type="button"
                  className="forgot_link"
                  onClick={goBackToEmail}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#0066cc" }}
                >
                  ← Change Email
                </button>
              )}
              <a href="#" className="forgot_link" onClick={(e) => { e.preventDefault(); onCancel(); }}>
                Back to Login
              </a>
            </div>

            <Button
              type="submit"
              className="btn_primary px-4 py-2 border-0 rounded w-100"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : step === "email"
                ? "Send OTP"
                : step === "otp"
                ? "Verify OTP"
                : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
