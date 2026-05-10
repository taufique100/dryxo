import React, { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import axios from "axios";
import { apiUrls } from "../../Utils/apiUrls";
import { errorNotify, successNotify } from "../../Utils/toastNotify";
import "../../Pages/theme.css";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [show, setShow] = useState({ old: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const toggle = (field) => setShow((s) => ({ ...s, [field]: !s[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      errorNotify("New passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(`${apiUrls.baseUrl}/auth/change-password`,
        { oldPassword: formData.oldPassword, newPassword: formData.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      successNotify("Password changed successfully.");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      errorNotify("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "oldPassword",     label: "Current Password",  showKey: "old",     placeholder: "Enter current password" },
    { key: "newPassword",     label: "New Password",       showKey: "new",     placeholder: "Enter new password" },
    { key: "confirmPassword", label: "Confirm Password",   showKey: "confirm", placeholder: "Re-enter new password" },
  ];

  return (
    <div className="cp-page">
      <div className="cp-card">
        {/* icon */}
        <div className="cp-icon-wrap">
          <FiLock size={28} />
        </div>

        <span className="pg-section-tag" style={{ display: "block", textAlign: "center", marginBottom: 8 }}>
          Account Security
        </span>
        <h2 className="cp-title">Change Password</h2>
        <p className="cp-sub">Keep your account secure with a strong, unique password.</p>

        <form onSubmit={handleSubmit}>
          {fields.map(({ key, label, showKey, placeholder }) => (
            <div className="cp-group" key={key}>
              <label className="pg-label">{label}</label>
              <div className="cp-input-wrap">
                <input
                  type={show[showKey] ? "text" : "password"}
                  name={key}
                  className="pg-input cp-input"
                  placeholder={placeholder}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="cp-eye" onClick={() => toggle(showKey)}>
                  {show[showKey] ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
            </div>
          ))}

          <button type="submit" className="pg-btn cp-submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
