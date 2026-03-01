
import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { successNotify } from "../../Utils/toastNotify";
import "./AddressSelection.css";

export default function AddressSelection() {
  const navigate = useNavigate();
  const storageKey = "dryxo_addresses";

  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    phone: "",
    pincode: "",
    city: "",
    address: "",
  };

  const [form, setForm] = useState(emptyForm);

 

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];

    // remove empty / invalid addresses 
    const valid = saved.filter((a) => a && a.name && a.phone && a.address);

    setAddresses(valid);
    localStorage.setItem(storageKey, JSON.stringify(valid));
  }, []);

 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 

  const saveAddress = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Fill required fields");
      return;
    }

    let updated;

    if (editingId) {
      updated = addresses.map((a) =>
        a.id === editingId ? { ...form, id: editingId } : a,
      );
      successNotify("Address updated");
    } else {
      updated = [{ ...form, id: Date.now() }, ...addresses];
      successNotify("Address saved");
    }

    setAddresses(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setForm(emptyForm);
    setEditingId(null);
  };

  

  const editAddress = (a) => {
    setForm(a);
    setEditingId(a.id);
  };



  const deleteAddress = (id) => {
    if (!window.confirm("Delete this address?")) return;

    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    if (selected?.id === id) setSelected(null);
    successNotify("Address deleted");
  };

 

  const continueToPayment = () => {
    if (!selected) return alert("Select address");

    localStorage.setItem("dryxo_selected_address", JSON.stringify(selected));

    navigate("/order/payment");
  };


  return (
    <div className="premium-container">
      <h2 className="page-title">Delivery Address</h2>
      <div className="premium-grid">
        {/* LEFT */}
        <div>
          {addresses.length === 0 && (
            <Card className="empty-card">No saved address</Card>
          )}

          {addresses.map((a) => (
            <Card
              key={a.id}
              className={`address-card ${
                selected?.id === a.id ? "active" : ""
              }`}
              onClick={() => setSelected(a)}
            >
              <div className="address-header">
                <strong>{a.name}</strong>
                <span>{a.phone}</span>
              </div>

              <div className="address-text">
                {a.address}, {a.city} - {a.pincode}
              </div>

              <div className="card-actions">
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    editAddress(a);
                  }}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAddress(a.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}

        
          <Card className="form-card">
            <h5>{editingId ? "Edit Address" : "Add Address"}</h5>

            <Form>
              <Form.Control
                className="premium-input"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
              <Form.Control
                className="premium-input"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />
              <Form.Control
                className="premium-input"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
              />
              <Form.Control
                className="premium-input"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />
              <Form.Control
                className="premium-input"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
              />

              <div className="form-actions">
                <Button onClick={saveAddress}>
                  {editingId ? "Update" : "Save"}
                </Button>

                {editingId && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Form>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="summary-card">
          <h5>Selected Address</h5>

          {selected ? (
            <>
              <strong>{selected.name}</strong>
              <p>{selected.address}</p>
              <Button onClick={continueToPayment}>Continue to Payment</Button>
            </>
          ) : (
            <p className="no-selection">No address selected</p>
          )}
        </div>
      </div>
    </div>
  );
}