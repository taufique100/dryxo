import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DryxoLogo from "../../assets/logo.png";
import './ForgetPassword.css'

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
   
  // };

  return (
    <div className="forget-container">
      <Form className="forget-form" >
        <div className="d-flex align-items-center justify-content-center mb-3">
          <img src={DryxoLogo} alt="DryxoLogo" />
        </div>
        <h2 className="text-center mb-3">Forgot Password</h2>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100 forget-btn">
          Send Reset Link
        </Button>

        <div className="text-center mt-3">
          <Button
            variant="link"
            className="back-login-btn"
            onClick={() => navigate("/login")}
          >
            ← Back to Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgetPassword;
