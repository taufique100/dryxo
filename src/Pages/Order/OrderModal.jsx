// import React, { useState, useMemo, useEffect } from "react";
// import { Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { setOpenModal, updateCartQuantity, removeFromCart, clearCart } from "../../Store/OrderSlice";
// import axiosInstance from "../../api/axiosInstance";
// import { apiUrls } from "../../Utils/apiUrls";
// import "./OrderModal.css";

// export default function OrderModal() {
//   const dispatch = useDispatch();
//   const { openModal, cartItems } = useSelector((state) => state.orderSlice);
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     city: "",
//     pincode: "",
//     phone: "",
//     district: "",
//     state: ""
//   });

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axiosInstance.get(apiUrls.getAllUserProducts);
//         setProducts(res?.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const selectedProducts = useMemo(() => {
//     return cartItems.map(cartItem => {
//       const product = products.find(p => p.id === cartItem.id);
//       return product ? { ...product, quantity: cartItem.quantity } : null;
//     }).filter(Boolean);
//   }, [cartItems, products]);

//   const handleClose = () => dispatch(setOpenModal(false));
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const isFormValid = form.name && form.address && form.city && form.pincode && form.phone && form.district && form.state;

//   const updateQuantity = (id, action) => {
//     const item = cartItems.find(item => item.id === id);
//     if (item) {
//       const newQty = action === "increase" ? item.quantity + 1 : item.quantity - 1;
//       if (newQty > 0) {
//         dispatch(updateCartQuantity({ id, quantity: newQty }));
//       } else {
//         dispatch(removeFromCart(id));
//       }
//     }
//   };

//   const subtotal = useMemo(
//     () => selectedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
//     [selectedProducts]
//   );
//   const discount = useMemo(() => subtotal * 0.1, [subtotal]);
//   const total = useMemo(() => subtotal - discount, [subtotal, discount]);

//   const handleSubmit = () => {
//     if (!isFormValid) {
//       alert("Please fill all the details!");
//       return;
//     }
//     alert("Order placed successfully!");
//     dispatch(clearCart());
//     handleClose();
//   };

//   console.log('selectedProducts::', selectedProducts)

//   return (
//     <Modal
//       centered
//       show={openModal}
//       onHide={handleClose}
//       backdrop="static"
//       keyboard={false}
//       size="lg"
//       className="order_modal y-2"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title className="h6">🛒 Place Your Order</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         {selectedProducts.length === 0 ? (
//           <div className="text-center py-4">
//             <p>Your cart is empty. Add products to place an order.</p>
//           </div>
//         ) : (
//           <>
//             <section className="product_summary">
//               <h5 className="section_title">Selected Products</h5>
//               {selectedProducts.map((product) => (
//                 <Card key={product.id} className="product_card_select mb-2 p-2">
//                   <div className="d-flex align-items-center justify-content-between">
//                     <div className="d-flex align-items-center gap-3">
//                       <img
//                         src={product.images?.[0] || "https://placehold.co/80x80"}
//                         alt={product.title}
//                         className="product_img"
//                       />
//                       <div>
//                         <h6 className="mb-1">{product.title} - {product.size}</h6>
//                         <p className="mb-0 text-muted">₹ {product.price}</p>
//                       </div>
//                     </div>
//                     <div className="d-flex align-items-center gap-2">
//                       <Button
//                         variant="outline-secondary"
//                         size="sm"
//                         onClick={() => updateQuantity(product.id, "decrease")}
//                       >
//                         -
//                       </Button>
//                       <span className="fw-bold">{product.quantity}</span>
//                       <Button
//                         variant="outline-secondary"
//                         size="sm"
//                         onClick={() => updateQuantity(product.id, "increase")}
//                       >
//                         +
//                       </Button>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </section>

//             <section className="calculation_section mt-3">
//               <h5 className="section_title">Order Summary</h5>
//               {
//                 selectedProducts?.map((item, index) => (
//                   <div className="calc_box">
//                     <div className="calc_row">
//                       <span>Subtotal:</span>
//                       <span>₹ {item?.price * item.quantity} </span>
//                     </div>
//                     <div className="calc_row">
//                       <span>Discount ({item?.discountPercentage}%):</span>
//                       <span className="text-success">- ₹ {
//                         (
//                           item?.discountPercentage > 0 ?
//                             (item?.discountPercentage / 100) * (item?.price * item.quantity) :
//                             0
//                         )
//                       } </span>
//                     </div>
//                     <div className="calc_row total_row">
//                       <span></span>
//                       <span>₹ {(item?.price * item.quantity) - (
//                         item?.discountPercentage > 0 ?
//                           (item?.discountPercentage / 100) * (item?.price * item.quantity) :
//                           0
//                       )}</span>
//                     </div>
//                   </div>
//                 ))
//               }
//             </section>

//             <section className="address_section mt-3">
//               <h5 className="section_title">Delivery Details</h5>
//               <Form>
//                 <Row className="gy-2">
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Full Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         placeholder="Enter your name"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Phone</Form.Label>
//                       <Form.Control
//                         type="tel"
//                         name="phone"
//                         value={form.phone}
//                         onChange={handleChange}
//                         placeholder="Enter Your Number"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={12}>
//                     <Form.Group>
//                       <Form.Label>Address</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="address"
//                         value={form.address}
//                         onChange={handleChange}
//                         placeholder="House No, Street, Locality"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>City</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="city"
//                         value={form.city}
//                         onChange={handleChange}
//                         placeholder="Enter your city"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>District</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="district"
//                         value={form.district}
//                         onChange={handleChange}
//                         placeholder="Enter your district"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>State</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="state"
//                         value={form.state}
//                         onChange={handleChange}
//                         placeholder="Enter your State"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Pincode</Form.Label>
//                       <Form.Control
//                         type="number"
//                         name="pincode"
//                         value={form.pincode}
//                         onChange={handleChange}
//                         placeholder="110001"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Form>
//             </section>
//           </>
//         )}
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Cancel
//         </Button>
//         <Button
//           variant="primary"
//           onClick={handleSubmit}
//           disabled={!isFormValid || selectedProducts.length === 0}
//         >
//           Submit Order
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

import React, { useState, useMemo, useEffect } from "react";
import { Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenModal,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../../Store/OrderSlice";
import axiosInstance from "../../api/axiosInstance";
import { apiUrls } from "../../Utils/apiUrls";
import "./OrderModal.css";

export default function OrderModal() {
  const dispatch = useDispatch();
  const { openModal, cartItems } = useSelector((state) => state.orderSlice);
  
  const [products, setProducts] = useState([]);
  console.log('cartItems::', cartItems, products)
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    district: "",
    state: "",
  });

  const handleClose = () => dispatch(setOpenModal(false));
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const isFormValid =
    form.name &&
    form.address &&
    form.city &&
    form.pincode &&
    form.phone &&
    form.district &&
    form.state;

  // ---- Fetch products once ----
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        const res = await axiosInstance.get(apiUrls.getAllUserProducts);

        // IMPORTANT:
        // If your axios interceptor returns response.data, then `res` is already the payload.
        // If not, then res.data exists.
        const payload = Array.isArray(res) ? res?.data?.data : res?.data;

        setProducts(Array.isArray(payload) ? payload : []);
      } catch (err) {
        console.error("fetchProducts error:", err);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [openModal]);

  // ---- Map cart items with product details ----
  const selectedProducts = useMemo(() => {
    return cartItems
      .map((cartItem) => {
        const product = products.find((p) => String(p.id) === String(cartItem.id));
        return product ? { ...product, quantity: cartItem.quantity } : null;
      })
      .filter(Boolean);
  }, [cartItems, products]);

  // ---- Quantity update ----
  const updateQuantity = (id, action) => {
    const item = cartItems.find((x) => String(x.id) === String(id));
    if (!item) return;

    const newQty = action === "increase" ? item.quantity + 1 : item.quantity - 1;

    if (newQty > 0) {
      dispatch(updateCartQuantity({ id, quantity: newQty }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  // ---- Money helpers & summary ----
  const money = (n) => Number(n || 0);

  const summary = useMemo(() => {
    const items = selectedProducts.map((p) => {
      const qty = money(p.quantity);
      const price = money(p.price);

      const lineSubtotal = price * qty;

      // discountPercentage expected from API (0 if not present)
      const discPct = money(p.discountPercentage);
      const lineDiscount = discPct > 0 ? (discPct / 100) * lineSubtotal : 0;

      const lineTotal = lineSubtotal - lineDiscount;

      return {
        ...p,
        lineSubtotal,
        lineDiscount,
        lineTotal,
      };
    });

    const subtotal = items.reduce((acc, it) => acc + it.lineSubtotal, 0);
    const discount = items.reduce((acc, it) => acc + it.lineDiscount, 0);
    const total = items.reduce((acc, it) => acc + it.lineTotal, 0);

    return { items, subtotal, discount, total };
  }, [selectedProducts]);

  // ---- Submit ----
  const handleSubmit = () => {
    if (!isFormValid) {
      alert("Please fill all the details!");
      return;
    }

    // TODO: You can send order payload to backend here
    // const payload = { form, items: summary.items, total: summary.total };

    alert("Order placed successfully!");
    dispatch(clearCart());
    handleClose();
  };

  console.log('selectedProducts1::', selectedProducts)

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
        {
        loadingProducts ? (
          <div className="text-center py-4">
            <p className="mb-0">Loading products...</p>
          </div>
        ) : selectedProducts.length === 0 ? (
          <div className="text-center py-4">
            <p className="mb-0">Your cart is empty. Add products to place an order.</p>
          </div>
        ) : 
        (
          <>
            {/* Selected Products */}
            <section className="product_summary">
              <h5 className="section_title">Selected Products</h5>

              {summary.items.map((product) => (
                <Card key={product.id} className="product_card_select mb-2 p-2">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={product.images?.[0] || "https://placehold.co/80x80"}
                        alt={product.title}
                        className="product_img"
                      />
                      <div>
                        <h6 className="mb-1">
                          {product.title}{" "}
                          <span className="text-muted">({product.size})</span>
                        </h6>
                        <p className="mb-0 text-muted">
                          ₹ {Number(product.price || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(product.id, "decrease")}
                      >
                        -
                      </Button>

                      <span className="fw-bold">{product.quantity}</span>

                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(product.id, "increase")}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </section>

            {/* Bill Summary */}
            <section className="calculation_section mt-3">
              <h5 className="section_title">Bill Summary</h5>

              {summary.items.map((item) => (
                <div className="calc_box mb-2" key={item.id}>
                  <div className="calc_title">
                    <span className="fw-semibold">{item.title}{' '}{item.size}</span>
                    <span className="text-muted">x{item.quantity}</span>
                  </div>

                  <div className="calc_row">
                    <span>Subtotal</span>
                    <span>₹ {item.lineSubtotal.toFixed(2)}</span>
                  </div>

                  <div className="calc_row">
                    <span>
                      Discount{" "}
                      {item.discountPercentage ? `(${item.discountPercentage}%)` : ""}
                    </span>
                    <span className="text-success">
                      - ₹ {item.lineDiscount.toFixed(2)}
                    </span>
                  </div>

                  <div className="calc_row total_row">
                    <span>Item Total</span>
                    <span>₹ {item.lineTotal.toFixed(2)}</span>
                  </div>
                </div>
              ))}

              {/* Grand totals */}
              {/* <div className="grand_total_box mt-3">
                <div className="calc_row">
                  <span>Cart Subtotal</span>
                  <span>₹ {summary.subtotal.toFixed(2)}</span>
                </div>

                <div className="calc_row">
                  <span>Total Discount</span>
                  <span className="text-success">- ₹ {summary.discount.toFixed(2)}</span>
                </div>

              </div> */}
                <div className="calc_row grand_total_row">
                  <span>Amount Payable</span>
                  <span>₹ {summary.total.toFixed(2)}</span>
                </div>
            </section>

            {/* Delivery Details */}
            <section className="address_section mt-3">
              <h5 className="section_title">Delivery Details</h5>

              <Form>
                <Row className="gy-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
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
                        placeholder="Enter your number"
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
                        placeholder="Enter your city"
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
                        placeholder="Enter your district"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="Enter your state"
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
                </Row>
              </Form>
            </section>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid || summary.items.length === 0}
        >
          Submit Order • Pay ₹{summary.total.toFixed(0)}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
