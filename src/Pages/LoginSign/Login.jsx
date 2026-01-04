import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DryxoLogo from "../../assets/logo.png";
 import { loginUser } from "../../API/authApi";
import './Login.css'
import { errorNotify, successNotify } from "../../Utils/toastNotify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const res = await loginUser(formData);

       localStorage.setItem("token", res.data.token);

       successNotify("Login Successful");
       navigate("/home");
     } catch (error) {
      console.log(error);
      errorNotify(error.response?.data?.message || "Login failed");
     }
   };



  return (
    <div className="login-container">
      <div className="login-card">
        <div className="d-flex align-items-center justify-content-center mb-3">
          <img src={DryxoLogo} alt="DryxoLogo" />
        </div>
        <Form className="login-form" onSubmit={handleSubmit}>
          <h2 className="text-center mb-3">User Login</h2>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your admin email"
              required
            />
          </Form.Group>

         
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required />
              <Button
                variant="outline-secondary"
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button type="submit" className="w-100 login-btn mb-3">
            Login
          </Button>


          <div className="auth-links">
            <Button
              className="auth-small-btn"
              onClick={() => navigate("/signup")}>
              Sign Up
            </Button>

            <Button
              className="auth-small-btn"
              onClick={() => navigate("/forget-password")}>
              Forgot Password?
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
