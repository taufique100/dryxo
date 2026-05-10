import React, { useState, useRef } from "react";
import { BsPerson, BsHouseDoor, BsBriefcaseFill, BsThreeDots, BsPencil, BsPlus, BsX, BsCheckCircleFill, BsGeoAlt } from "react-icons/bs";
import "./Profile.css";

const EMPTY_ADDRESS = {
  type: "home",
  fullName: "",
  phone: "",
  addressLine1: "",
  city: "",
  state: "",
  zipCode: "",
  country: "India",
  isDefault: false,
};

const TYPE_ICONS = {
  home: <BsHouseDoor />,
  work: <BsBriefcaseFill />,
  other: <BsThreeDots />,
};

export default function Profile() {
  // ── User Info ──────────────────────────────────────────────
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    mobile: "9876543210",
    gender: "male",
    profilePic: null,
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const fileRef = useRef();

  // ── Addresses ──────────────────────────────────────────────
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // ── Modal ──────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // null = add new
  const [form, setForm] = useState(EMPTY_ADDRESS);
  const [errors, setErrors] = useState({});

  // ── Profile handlers ───────────────────────────────────────
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfile((p) => ({ ...p, profilePic: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    // TODO: call API to save profile
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  // ── Modal handlers ─────────────────────────────────────────
  const openAdd = () => {
    setEditIndex(null);
    setForm(EMPTY_ADDRESS);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (idx) => {
    setEditIndex(idx);
    setForm({ ...addresses[idx] });
    setErrors({});
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const req = ["fullName", "phone", "addressLine1", "city", "state", "zipCode", "country"];
    const errs = {};
    req.forEach((k) => {
      if (!form[k]?.trim()) errs[k] = "Required";
    });
    if (form.phone && !/^\d{10}$/.test(form.phone)) errs.phone = "Enter valid 10-digit number";
    if (form.zipCode && !/^\d{6}$/.test(form.zipCode)) errs.zipCode = "Enter valid 6-digit zip";
    return errs;
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setAddresses((prev) => {
      let updated;
      if (editIndex !== null) {
        updated = prev.map((a, i) => (i === editIndex ? { ...form } : a));
      } else {
        updated = [...prev, { ...form }];
      }
      // if new address is default, unset others
      if (form.isDefault) {
        updated = updated.map((a, i) => ({
          ...a,
          isDefault: editIndex !== null ? i === editIndex : i === updated.length - 1,
        }));
      }
      return updated;
    });

    // auto-select first address
    if (addresses.length === 0) setSelectedAddressId(0);
    closeModal();
  };

  const handleDelete = (idx) => {
    setAddresses((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      return updated;
    });
    if (selectedAddressId === idx) setSelectedAddressId(null);
  };

  const handleSetDefault = (idx) => {
    setAddresses((prev) =>
      prev.map((a, i) => ({ ...a, isDefault: i === idx }))
    );
  };

  const badgeClass = (type) =>
    type === "home" ? "badge-home" : type === "work" ? "badge-work" : "badge-other";

  const typeActiveClass = (t) =>
    form.type === t ? `active-${t}` : "";

  return (
    <div className="profile-page">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 className="profile-page-title">
          <BsPerson /> My Profile
        </h1>

        {/* ── Profile Card ── */}
        <div className="profile-card mb-4">
          {/* Header */}
          <div className="profile-header">
            <div className="profile-avatar-wrap">
              {profile.profilePic ? (
                <img src={profile.profilePic} alt="avatar" className="profile-avatar-img" />
              ) : (
                <div className="profile-avatar-placeholder">
                  <BsPerson />
                </div>
              )}
              <button className="profile-avatar-edit" onClick={() => fileRef.current.click()} title="Change photo">
                <BsPencil />
              </button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={handlePicChange} />
            </div>
            <div className="profile-header-info">
              <h2>{profile.name || "Your Name"}</h2>
              <p>{profile.email}</p>
            </div>
          </div>

          {/* Form */}
          <p className="profile-section-title"><BsPerson /> Personal Information</p>
          <form className="profile-form" onSubmit={handleProfileSave}>
            <div className="row g-2">
              <div className="col-sm-6">
                <label className="form-label">Full Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="Enter full name"
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Gender</label>
                <select className="form-select" name="gender" value={profile.gender} onChange={handleProfileChange}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label">Email Address</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Mobile Number</label>
                <input
                  className="form-control"
                  name="mobile"
                  value={profile.mobile}
                  onChange={handleProfileChange}
                  placeholder="10-digit mobile"
                  maxLength={10}
                />
              </div>
              <div className="col-12 d-flex align-items-center gap-3 mt-1">
                <button type="submit" className="profile-save-btn mt-2">
                  Save Changes
                </button>
                {profileSaved && (
                  <span style={{ color: "#28a745", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                    <BsCheckCircleFill /> Saved!
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* ── Address Card ── */}
        <div className="profile-card">
          <p className="profile-section-title"><BsGeoAlt /> Saved Addresses</p>
          <div className="address-section">
            {addresses.length === 0 && (
              <p style={{ fontSize: 13, color: "#999", textAlign: "center", marginBottom: 14 }}>
                No addresses saved yet. Add one below.
              </p>
            )}

            <div className="d-flex flex-column gap-3 mb-3">
              {addresses.map((addr, idx) => (
                <div
                  key={idx}
                  className={`address-card ${selectedAddressId === idx ? "selected" : ""}`}
                  onClick={() => setSelectedAddressId(idx)}
                >
                  <div className="address-card-header">
                    <input
                      type="radio"
                      className="address-radio"
                      name="selectedAddress"
                      checked={selectedAddressId === idx}
                      onChange={() => setSelectedAddressId(idx)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className={`address-type-badge ${badgeClass(addr.type)}`}>
                      {TYPE_ICONS[addr.type]} {addr.type}
                    </span>
                    {addr.isDefault && (
                      <span className="address-default-badge">Default</span>
                    )}
                  </div>
                  <p className="address-card-name">{addr.fullName}</p>
                  <p className="address-card-text">
                    {addr.addressLine1}, {addr.city}, {addr.state} – {addr.zipCode}
                    <br />
                    {addr.country} &nbsp;|&nbsp; 📞 {addr.phone}
                  </p>
                  <div className="address-card-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="addr-action-btn addr-edit-btn" onClick={() => openEdit(idx)}>
                      Edit
                    </button>
                    <button className="addr-action-btn addr-delete-btn" onClick={() => handleDelete(idx)}>
                      Delete
                    </button>
                    {!addr.isDefault && (
                      <button className="addr-action-btn addr-default-btn" onClick={() => handleSetDefault(idx)}>
                        Set Default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="add-address-btn"
              onClick={openAdd}
              disabled={addresses.length >= 3}
            >
              <BsPlus size={18} />
              {addresses.length >= 3 ? "Maximum 3 addresses allowed" : "Add New Address"}
            </button>
            {addresses.length >= 3 && (
              <p style={{ fontSize: 12, color: "#999", textAlign: "center", marginTop: 6 }}>
                You can save up to 3 addresses. Delete one to add another.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Address Modal ── */}
      {modalOpen && (
        <div className="addr-modal-overlay" onClick={closeModal}>
          <div className="addr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="addr-modal-header">
              <h5>{editIndex !== null ? "Edit Address" : "Add New Address"}</h5>
              <button className="addr-modal-close" onClick={closeModal}><BsX /></button>
            </div>

            <form onSubmit={handleAddressSubmit}>
              <div className="addr-modal-body">
                {/* Type selector */}
                <div className="mb-3">
                  <label className="form-label">Address Type</label>
                  <div className="addr-type-selector">
                    {["home", "work", "other"].map((t) => (
                      <div
                        key={t}
                        className={`addr-type-option ${typeActiveClass(t)}`}
                        onClick={() => setForm((f) => ({ ...f, type: t }))}
                      >
                        {TYPE_ICONS[t]} {t.charAt(0).toUpperCase() + t.slice(1)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label">Full Name *</label>
                    <input
                      className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                      name="fullName"
                      value={form.fullName}
                      onChange={handleFormChange}
                      placeholder="Recipient's full name"
                    />
                    {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">Phone Number *</label>
                    <input
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      name="phone"
                      value={form.phone}
                      onChange={handleFormChange}
                      placeholder="10-digit number"
                      maxLength={10}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address Line *</label>
                    <input
                      className={`form-control ${errors.addressLine1 ? "is-invalid" : ""}`}
                      name="addressLine1"
                      value={form.addressLine1}
                      onChange={handleFormChange}
                      placeholder="House no., Street, Area"
                    />
                    {errors.addressLine1 && <div className="invalid-feedback">{errors.addressLine1}</div>}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">City *</label>
                    <input
                      className={`form-control ${errors.city ? "is-invalid" : ""}`}
                      name="city"
                      value={form.city}
                      onChange={handleFormChange}
                      placeholder="City"
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">State *</label>
                    <input
                      className={`form-control ${errors.state ? "is-invalid" : ""}`}
                      name="state"
                      value={form.state}
                      onChange={handleFormChange}
                      placeholder="State"
                    />
                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">ZIP Code *</label>
                    <input
                      className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleFormChange}
                      placeholder="6-digit ZIP"
                      maxLength={6}
                    />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">Country *</label>
                    <input
                      className={`form-control ${errors.country ? "is-invalid" : ""}`}
                      name="country"
                      value={form.country}
                      onChange={handleFormChange}
                      placeholder="Country"
                    />
                    {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        checked={form.isDefault}
                        onChange={handleFormChange}
                        style={{ accentColor: "#fd350d" }}
                      />
                      <label className="form-check-label" htmlFor="isDefault" style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>
                        Set as default delivery address
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="addr-modal-footer">
                <button type="button" className="addr-cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="addr-submit-btn">
                  {editIndex !== null ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
