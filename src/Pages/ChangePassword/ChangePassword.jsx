import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { apiUrls } from "../../Utils/apiUrls";
import { errorNotify, successNotify } from "../../Utils/toastNotify";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      errorNotify("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(`${apiUrls.baseUrl}/auth/change-password`, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      successNotify("Password changed successfully.");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      errorNotify("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '500px', width: '100%', background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(253, 53, 13, 0.2)' }}>
        <h2 className="text-center mb-4" style={{ color: '#fd350d', fontWeight: '700' }}>Change Password</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#333', fontWeight: '600' }}>Old Password</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              style={{ borderRadius: '10px', border: '1px solid #ddd', padding: '12px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#333', fontWeight: '600' }}>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              style={{ borderRadius: '10px', border: '1px solid #ddd', padding: '12px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#333', fontWeight: '600' }}>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ borderRadius: '10px', border: '1px solid #ddd', padding: '12px' }}
            />
          </Form.Group>
          <Button type="submit" disabled={loading} style={{
            width: '100%',
            background: 'linear-gradient(45deg, #fd350d, #ff6b4a)',
            border: 'none',
            borderRadius: '25px',
            padding: '12px',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.3s ease'
          }} onMouseOver={(e) => e.target.style.background = 'linear-gradient(45deg, #e62e0a, #ff5722)'} onMouseOut={(e) => e.target.style.background = 'linear-gradient(45deg, #fd350d, #ff6b4a)'}>
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ChangePassword;