import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import sanitaryProducts from "../Products/sanitaryProducts";
import { Form, Row, Col, Card, Button } from "react-bootstrap";
import { clearCart } from "../../Store/OrderSlice";
import { successNotify } from "../../Utils/toastNotify";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.orderSlice);

  const items = cart
    .map((c) => ({ ...c, product: sanitaryProducts.find((s) => s.id === c.id) }))
    .filter((i) => i.product);

  const subtotal = useMemo(() => items.reduce((acc, it) => acc + Number(it.product.price) * it.quantity, 0), [items]);

  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const isFormValid = Object.values(form).every((v) => v && v.toString().trim() !== "");

  const handlePlaceOrder = () => {
    if (!isFormValid) return alert("Please fill all delivery details");
    // In real app: send order to backend
    dispatch(clearCart());
    successNotify("Order placed successfully");
    navigate('/my-order');
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3">Checkout</h3>
      <div className="row">
        <div className="col-md-7">
          <Card className="p-3 mb-3">
            <h5>Delivery Details</h5>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control name="name" value={form.name} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control name="phone" value={form.phone} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mt-2">
                <Form.Label>Address</Form.Label>
                <Form.Control name="address" value={form.address} onChange={handleChange} />
              </Form.Group>

              <Row className="mt-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control name="city" value={form.city} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control name="pincode" value={form.pincode} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="p-3">
            <h5>Products</h5>
            {items.length === 0 && <p>Your cart is empty.</p>}
            {items.map((it) => (
              <div key={it.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <div>
                  <strong>{it.product.title}</strong>
                  <div className="text-muted">Qty: {it.quantity}</div>
                </div>
                <div>₹ {(Number(it.product.price) * it.quantity).toFixed(2)}</div>
              </div>
            ))}
          </Card>
        </div>

        <div className="col-md-5">
          <Card className="p-3">
            <h5>Order Summary</h5>
            <div className="d-flex justify-content-between py-2">
              <span>Subtotal</span>
              <strong>₹ {subtotal.toFixed(2)}</strong>
            </div>
            <div className="d-flex justify-content-between py-2">
              <span>Discount (10%)</span>
              <strong className="text-success">- ₹ {(subtotal * 0.1).toFixed(2)}</strong>
            </div>
            <hr />
            <div className="d-flex justify-content-between py-2">
              <span>Total</span>
              <strong>₹ {(subtotal * 0.9).toFixed(2)}</strong>
            </div>

            <Button className="w-100 mt-3" onClick={handlePlaceOrder} disabled={items.length===0}>
              Place Order
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
