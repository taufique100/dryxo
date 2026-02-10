import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import LoginLogo from "../../assets/NewLoginPage/logo.png";
import { Button } from "react-bootstrap";
import { apiUrls } from "../../Utils/apiUrls";
import { errorNotify, successNotify } from "../../Utils/toastNotify";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onCancel }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !credentials.name.trim() ||
      !credentials.email.trim() ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      setErrorMessage("Please fill all required fields.");
      errorNotify("Please fill all required fields.");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      errorNotify("Passwords do not match.");
      return;
    }

    if (credentials.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      errorNotify("Password must be at least 6 characters long.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setErrorMessage("Please enter a valid email address.");
      errorNotify("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      console.log("SignUp attempt with:", {
        name: credentials.name,
        email: credentials.email,
      });

     
      const response = await axios.post(apiUrls.register, {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });

      console.log("SignUp Response:", response?.data);

      if (response?.status === 201 || response?.data?.user) {
        setSuccessMessage("Account created successfully!");
        successNotify("Account created successfully! Redirecting to login...");

        setTimeout(() => {
          onCancel(); 
        }, 1500);
      } else {
        const msg = response?.data?.message || "Signup failed";
        setErrorMessage(msg);
        errorNotify(msg);
      }
    } catch (error) {
      console.error("SignUp Error:", error);
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
      setShowPassword((s) => !s);
    } else {
      setShowConfirmPassword((s) => !s);
    }
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
            <div
              style={{ color: "green", marginBottom: "15px", fontSize: "14px" }}
            >
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div
              style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form_group">
              <label htmlFor="name" className="form_label">
                Name <span className="text_danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form_control"
                placeholder="Enter your name"
                value={credentials.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div className="form_group">
              <label htmlFor="email" className="form_label">
                Email <span className="text_danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form_control"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="form_group">
              <label htmlFor="password" className="form_label">
                Password <span className="text_danger">*</span>
              </label>
              <div className="position_relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form_control"
                  placeholder="Create a password (min 6 characters)"
                  value={credentials.password}
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

            {/* Confirm Password */}
            <div className="form_group">
              <label htmlFor="confirmPassword" className="form_label">
                Confirm Password <span className="text_danger">*</span>
              </label>
              <div className="position_relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form_control"
                  placeholder="Confirm password"
                  value={credentials.confirmPassword}
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

            {/* Back to Login */}
            <div className="form_footer" style={{ justifyContent: "flex-end" }}>
              <a
                href="#"
                className="forgot_link"
                onClick={(e) => {
                  e.preventDefault();
                  onCancel();
                }}
              >
                Back to Login
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="btn_primary px-4 py-2 border-0 rounded w-100"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
