import React, { useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { apiUrls } from "../Utils/apiUrls.js";
import { errorNotify, successNotify } from "../Utils/toastNotify.js";
import loginImage from "../assets/NewLoginPage/image.jpg";
import LoginLogo from "../assets/NewLoginPage/logo.png";
import "./LoginModal.css";

const LoginModal = ({ show, onHide, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [panel, setPanel] = useState("login");
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleGoogleCredentialResponse = async (response) => {
    setLoading(true);

    const token = response?.credential;
    if (!token) {
      setLoading(false);
      errorNotify("Google login failed. Please try again.");
      return;
    }

    try {
      const res = await axios.post(apiUrls.googleLogin, { token });
      localStorage.setItem("userToken", res?.data?.tokens?.access?.token);
      localStorage.setItem("userInfo", JSON.stringify(res?.data?.user));
      successNotify("Login successful!");
      onLoginSuccess && onLoginSuccess();
      onHide();
    } catch (error) {
      console.error("Google login error:", error);
      errorNotify(
        error?.response?.data?.message || "Google login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleCredentialResponse,
    onError: () => {
      setLoading(false);
      errorNotify("Google login failed. Please try again.");
    },
    flow: "implicit",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (panel === "login") {
      setCredentials((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginPayload = {
      email: credentials.username,
      password: credentials.password,
    };

    try {
      const res = await axios.post(apiUrls.login, loginPayload);
      localStorage.setItem("userToken", res?.data?.tokens?.access?.token);
      localStorage.setItem("userInfo", JSON.stringify(res?.data?.user));
      successNotify("Login successful!");
      onLoginSuccess && onLoginSuccess();
      onHide();
    } catch (error) {
      console.error("Login error:", error);
      errorNotify("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      errorNotify("Passwords do not match!");
      return;
    }

    setLoading(true);

    const signupPayload = {
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      phone: signupData.phone,
    };

    try {
      await axios.post(apiUrls.register, signupPayload);
      successNotify("Account created successfully! Please login.");
      setPanel("login");
      setSignupData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
    } catch (error) {
      console.error("Signup error:", error);
      errorNotify("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const switchToSignup = () => {
    setPanel("signup");
    setCredentials({ username: "", password: "" });
  };

  const switchToLogin = () => {
    setPanel("login");
    setSignupData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      size="xl"
      className="login-modal"
      dialogClassName="login-modal-dialog"
    >
      <Modal.Header className="login-modal-header">
        <button
          type="button"
          className="close-button"
          onClick={onHide}
          aria-label="Close"
        >
          <span>&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="login-modal-container">
          {/* Form Section */}
          <div className="login-form-section">
            <div className="login-form-wrapper">
              <div className="login-form">
                <div className="form-container">
                  <a href="#" className="login-logo-link">
                    <img
                      src={LoginLogo}
                      alt="Logo"
                      className="login-logo"
                    />
                  </a>

                  <h3 className="login-heading">
                    {panel === "login" ? "Welcome back!" : "Create Account"}
                  </h3>

                  {panel === "login" && (
                    <div className="social_login_wrap">
                      <button
                        type="button"
                        className="btn_social btn_google mb-1"
                        onClick={() => loginWithGoogle()}
                        disabled={loading}
                      >
                        <FcGoogle className="btn_social_icon" />
                        Continue with Google
                      </button>
                      <div className="social_separator">
                        <span>or login with email</span>
                      </div>
                    </div>
                  )}

                  {panel === "login" ? (
                    <Form onSubmit={handleLogin}>
                      <div className="form_group">
                        <label htmlFor="username" className="form_label">
                          Email <span className="text_danger">*</span>
                        </label>
                        <input
                          type="email"
                          id="username"
                          name="username"
                          className="form_control"
                          placeholder="Enter your email"
                          value={credentials.username}
                          onChange={handleChange}
                          required
                        />
                      </div>

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
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                          />
                          <button
                            type="button"
                            className="toggle_password"
                            onClick={togglePassword}
                          >
                            {showPassword ? (
                              <FiEyeOff className="password_icon" />
                            ) : (
                              <FiEye className="password_icon" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="form_footer">
                        <div className="remember_me">
                          <input
                            type="checkbox"
                            id="rememberMe"
                            className="form_check_input"
                          />
                          <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a
                          href="#"
                          className="forgot_link"
                          onClick={() => setPanel("forgot")}
                        >
                          Forgot password?
                        </a>
                      </div>

                      <button
                        type="submit"
                        className="btn_primary"
                        disabled={loading}
                      >
                        {loading ? "Signing in..." : "Login"}
                      </button>

                      <p className="signup_text">
                        Don't have an account?{" "}
                        <a
                          href="#"
                          className="signup_link"
                          onClick={switchToSignup}
                        >
                          Sign up here
                        </a>
                      </p>
                    </Form>
                  ) : (
                    <Form onSubmit={handleSignup}>
                      <Row>
                        <Col md={6}>
                          <div className="form_group">
                            <label className="form_label">
                              Full Name <span className="text_danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              className="form_control"
                              placeholder="Enter your name"
                              value={signupData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="form_group">
                            <label className="form_label">
                              Phone <span className="text_danger">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              className="form_control"
                              placeholder="Enter phone number"
                              value={signupData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </Col>
                      </Row>

                      <div className="form_group">
                        <label className="form_label">
                          Email <span className="text_danger">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form_control"
                          placeholder="Enter your email"
                          value={signupData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form_group">
                        <label className="form_label">
                          Password <span className="text_danger">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form_control"
                          placeholder="Create password"
                          value={signupData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form_group">
                        <label className="form_label">
                          Confirm Password <span className="text_danger">*</span>
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form_control"
                          placeholder="Confirm password"
                          value={signupData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn_primary"
                        disabled={loading}
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                      </button>

                      <p className="signup_text">
                        Already have an account?{" "}
                        <a
                          href="#"
                          className="signup_link"
                          onClick={switchToLogin}
                        >
                          Login
                        </a>
                      </p>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="login-image-section d-none d-md-block">
            <img src={loginImage} alt="loginImage" className="login-banner-image" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;