import React, { useState, useMemo } from "react";
import { Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../../Store/OrderSlice";
import "./OrderModal.css";

export default function OrderModal() {
  const dispatch = useDispatch();
  const { openModal } = useSelector((state) => state.orderSlice);

  const [selectedProducts, setSelectedProducts] = useState([
    {
      name: "Sanitary Pad XL",
      price: 120,
      image: "https://placehold.co/80x80",
      quantity: 1,
    },
    {
      name: "Sanitary Pad Medium",
      price: 100,
      image: "https://placehold.co/80x80",
      quantity: 1,
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const handleClose = () => dispatch(setOpenModal(false));
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isFormValid = Object.values(form).every((f) => f.trim() !== "");

  // const updateQuantity = (index, action) => {
  //   setSelectedProducts((prev) =>
  //     prev.map((product, i) => {
  //       if (i === index) {
  //         let newQty =
  //           action === "increase"
  //             ? product.quantity + 1
  //             : Math.max(1, product.quantity - 1);
  //         return { ...product, quantity: newQty };
  //       }
  //       return product;
  //     })
  //   );
  // };

const updateQuantity = (index, action) => {
  setSelectedProducts((prev) => {
    return prev
      .map((product, i) => {
        if (i === index) {
          let newQty =
            action === "increase" ? product.quantity + 1 : product.quantity - 1;
          return { ...product, quantity: newQty };
        }
        return product;
      })
      .filter((p) => p.quantity > 0); 

  });
};

  const subtotal = useMemo(
    () => selectedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
    [selectedProducts]
  );
  const discount = useMemo(() => subtotal * 0.1, [subtotal]);
  const total = useMemo(() => subtotal - discount, [subtotal, discount]);

  const handleSubmit = () => {
    if (!isFormValid) {
      alert("Please fill all the details!");
      return;
    }
    alert("Order placed successfully!");
    handleClose();
  };

  return (
    <Modal
      centered
      show={openModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      className="order_modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="h6">🛒 Place Your Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <section className="product_summary">
          <h5 className="section_title">Selected Products</h5>
          {selectedProducts.map((product, index) => (
            <Card key={index} className="product_card_select mb-2 p-2">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={product.image}
                    alt="product"
                    className="product_img"
                  />
                  <div>
                    <h6 className="mb-1">{product.name}</h6>
                    <p className="mb-0 text-muted">₹ {product.price}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(index, "decrease")}
                  >
                    -
                  </Button>
                  <span className="fw-bold">{product.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(index, "increase")}
                  >
                    +
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section className="calculation_section mt-3">
          <h5 className="section_title">Order Summary</h5>
          <div className="calc_box">
            <div className="calc_row">
              <span>Subtotal:</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>
            <div className="calc_row">
              <span>Discount (10%):</span>
              <span className="text-success">- ₹ {discount.toFixed(2)}</span>
            </div>
            <div className="calc_row total_row">
              <span>Total:</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <section className="address_section mt-3">
          <h5 className="section_title">Delivery Details</h5>
          <Form>
            <Row className="gy-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House No, Street, Locality"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="New Delhi"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="number"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="110001"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>District</Form.Label>
                  <Form.Control
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="South Delhi"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="Delhi"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </section>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Submit Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
