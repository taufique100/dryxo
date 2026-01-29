import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DryxoLogo from "../../assets/logo.png";
// import { signupUser } from "../../API/authApi";

import "./Signup.css";
import { warningNotify } from "../../Utils/toastNotify";
import axios from "axios";
import { apiUrls } from "../../Utils/apiUrls";

const Sign = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      warningNotify("Password match nahi ho raha");
      return;
    }

    const registerPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    setLoading(true);
    await axios
      .post(apiUrls.register, registerPayload)
      .then((res) => {
        // fullfill
        console.log("res::", res);
        setLoading(false);
      })
      .catch((err) => {
        // reject
        console.log(err);
      })
      .finally(() => {
        // always run (in both case)
        setLoading(false);
      });
  };

  return (
    <>
      {/* {loading && <Loader/>} */}
      <div className="signup-container">
        <div className="signup-card">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <img src={DryxoLogo} alt="DryxoLogo" />
          </div>

          <Form className="signup-form" onSubmit={handleSubmit}>
            <h2 className="text-center mb-3">Create Account</h2>

            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                />
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button type="submit" className="w-100 signup-btn mb-3">
              Sign Up
            </Button>

            <div className="text-center">
              <Button
                className="w-100 signup-btn-mb-3"
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Sign;
