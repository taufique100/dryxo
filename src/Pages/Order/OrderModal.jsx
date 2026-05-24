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
import "../Profile/Profile.css"; // reuse profile address styles
import { BsPlus, BsX, BsHouseDoor, BsBriefcaseFill, BsThreeDots } from "react-icons/bs";
import { errorNotify, successNotify } from "../../Utils/toastNotify";
import OrderResultModal from "../../Component/OrderResultModal/OrderResultModal";
import { setLoader } from "../../Store/LoaderSlice";
import { useNavigate } from "react-router-dom";

export default function OrderModal() {
  const dispatch = useDispatch();
  const navigation = useNavigate()
  const { openModal, cartItems } = useSelector((state) => state.orderSlice);
  const [deliveryCharges, setDeliveryCharges] = useState(60); // Fixed delivery charge for demonstration
  
  const [products, setProducts] = useState([]);
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
  const [orderResult, setOrderResult] = useState({ show: false, success: false, message: "" });

  // address modal + default address state
  const EMPTY_ADDR = {
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

  const [defaultAddress, setDefaultAddress] = useState(null);
  const [addrModalOpen, setAddrModalOpen] = useState(false);
  const [addrForm, setAddrForm] = useState(EMPTY_ADDR);
  const [addrErrors, setAddrErrors] = useState({});

  const handleClose = () => dispatch(setOpenModal(false));
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const isFormValid = defaultAddress && form.phone && form.name && form.address && form.city && form.state && form.pincode;

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
    const totalWithDelivery = total + money(deliveryCharges);

    return { items, subtotal, discount, total, totalWithDelivery };
  }, [selectedProducts, deliveryCharges]);

  const getDeliveryAddress = async() =>{
    try{
      const res = await axiosInstance.get(apiUrls.getAddress);
      const data = res?.data?.data || res?.data;
      const list = Array.isArray(data) ? data : data?.address || [];
      const getDefaultAddress = list?.find?.((addr) => addr.isDefault) || list?.[0] || null;
      console.log("Address data:", list);
      if (getDefaultAddress) {
        // populate order form fields (handle different field names)
        setForm((f) => ({
          ...f,
          address: getDefaultAddress.addressLine1 || getDefaultAddress.address || "",
          city: getDefaultAddress.city || "",
          district: getDefaultAddress.district || "",
          state: getDefaultAddress.state || "",
          pincode: getDefaultAddress.zipCode || getDefaultAddress.pincode || "",
          phone: getDefaultAddress.phone || f.phone,
          name: getDefaultAddress.fullName || f.name,
        }));
        setDefaultAddress(getDefaultAddress);
      } else {
        setDefaultAddress(null);
      }
    }catch(err){
      console.log("Error fetching address:", err);
      setDefaultAddress(null);
    }
  }

  useEffect(() => {
    if(openModal){
      getDeliveryAddress();
    }
  }, [openModal])

  // ---- Address API helpers (mirror Profile.jsx pattern) ----
  const validateAddr = (address) => {
    const req = ["fullName", "phone", "addressLine1", "city", "state", "zipCode", "country"];
    const errs = {};
    req.forEach((k) => { if (!address[k]?.toString()?.trim()) errs[k] = "Required"; });
    if (address.phone && !/^\d{10}$/.test(address.phone)) errs.phone = "Enter valid 10-digit number";
    if (address.zipCode && !/^\d{6}$/.test(address.zipCode)) errs.zipCode = "Enter valid 6-digit zip";
    return errs;
  };

  const createAddress = async (address) => {
    dispatch(setLoader(true));
    try {
      const shallow = { ...address };
      delete shallow._id;
      await axiosInstance.post(apiUrls.createAddress, shallow);
      successNotify("Address saved.");
      await getDeliveryAddress();
    } catch (er) {
      console.error("createAddress error", er);
      errorNotify("Error saving address.");
    } finally {
      dispatch(setLoader(false));
    }
  };

  const updateAddress = async (address) => {
    dispatch(setLoader(true));
    try {
      const shallow = { ...address };
      const id = shallow._id;
      delete shallow._id;
      await axiosInstance.put(`${apiUrls.updateAddress}/${id}`, shallow);
      successNotify("Address updated.");
      await getDeliveryAddress();
    } catch (er) {
      console.error("updateAddress error", er);
      errorNotify("Error updating address.");
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const errs = validateAddr(addrForm);
    setAddrErrors(errs);
    if (Object.keys(errs).length) return;

    if (addrForm._id) {
      await updateAddress(addrForm);
    } else {
      await createAddress(addrForm);
    }

    setAddrModalOpen(false);
  };


  const placeOrder = async ()=>{
    const productForOrders = selectedProducts?.map((item)=>({
      productId: item?.id,
      quantity: item?.quantity
    }))
    const payload = {
      "products": productForOrders,
      "addressId": defaultAddress?._id,
      "deliveryCharges": deliveryCharges,
      "paymentMethod": "cod"
    }
    try {
      const res = await axiosInstance.post(apiUrls.createOrder, payload);
      console.log("Response Add: ", res);
      // clear cart and close order modal, then show success popup
      dispatch(clearCart());
      handleClose();
      setOrderResult({ show: true, success: true, message: "Order placed successfully!" });
    } catch (err) {
      console.error("placeOrder error:", err);
      const msg = err?.response?.data?.message || "Order could not be placed. Please try again.";
      setOrderResult({ show: true, success: false, message: msg });
    }
  }

   // ---- Submit ----
  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("Please fill all the details!");
      return;
    }

    // TODO: You can send order payload to backend here
    // const payload = { form, items: summary.items, total: summary.total };
    await placeOrder()
  };

  return (
    <>
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

              {summary?.items?.map((product) => (
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

                      <span className="fw-bold text-white">{product.quantity}</span>

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
              <div className="grand_total_box border-top pt-2 mt-3">
                <div className="calc_row px-1">
                  <span>Cart Subtotal</span>
                  <span>₹ {summary.subtotal.toFixed(2)}</span>
                </div>

                <div className="calc_row px-1">
                  <span>Total Discount</span>
                  <span className="text-success">- ₹ {summary.discount.toFixed(2)}</span>
                </div>

                <div className="calc_row px-1">
                  <span>Delivery Charges</span>
                  <span>₹ {money(deliveryCharges).toFixed(2)}</span>
                </div>

                <div className="calc_row grand_total_row">
                  <span>Amount Payable</span>
                  <span>₹ {summary.totalWithDelivery.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* Delivery Details (profile-style) */}
            <section className="address_section mt-3">
              <h5 className="section_title">Delivery Details</h5>

              {defaultAddress ? (
                <div className={`address-card`}>
                  <div className="address-card-header">
                    <input type="radio" className="address-radio" checked readOnly />
                    <span className={`address-type-badge`}>{TYPE_ICONS[defaultAddress.type || 'home']} {defaultAddress.type || 'Home'}</span>
                    {defaultAddress.isDefault && <span className="address-default-badge">Default</span>}
                  </div>

                  <p className="address-card-name">{defaultAddress.fullName || defaultAddress.name || 'Customer'}</p>
                  <p className="address-card-text">
                    {defaultAddress.addressLine1 || defaultAddress.address}, {defaultAddress.city} {defaultAddress.state} – {defaultAddress.zipCode || defaultAddress.pincode}
                    <br />
                    {defaultAddress.country || "India"} &nbsp;|&nbsp; 📞 {defaultAddress.phone}
                  </p>

                  <div className="address-card-actions">
                    <button className="addr-action-btn addr-edit-btn" onClick={() => {
                      // open modal with existing values for quick edit
                      setAddrForm({
                        type: defaultAddress.type || 'home',
                        _id: defaultAddress._id,
                        fullName: defaultAddress.fullName || defaultAddress.name || '',
                        phone: defaultAddress.phone || '',
                        addressLine1: defaultAddress.addressLine1 || defaultAddress.address || '',
                        city: defaultAddress.city || '',
                        state: defaultAddress.state || '',
                        zipCode: defaultAddress.zipCode || defaultAddress.pincode || '',
                        country: defaultAddress.country || 'India',
                        isDefault: Boolean(defaultAddress.isDefault),
                      });
                      setAddrErrors({});
                      setAddrModalOpen(true);
                    }}>Edit</button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: 12 }}>
                  <p style={{ color: '#666', marginBottom: 8 }}>No saved delivery address found.</p>
                  <button
                    className="add-address-btn"
                    style={{ borderStyle: 'dashed', background: 'transparent' }}
                    onClick={() => { setAddrForm(EMPTY_ADDR); setAddrErrors({}); setAddrModalOpen(true); }}
                  >
                    <BsPlus size={16} style={{ marginRight: 8 }} /> Add Address
                  </button>
                </div>
              )}

              {/* Address modal (add / edit) */}
              {addrModalOpen && (
                <div className="addr-modal-overlay" onClick={() => setAddrModalOpen(false)}>
                  <div className="addr-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="addr-modal-header">
                      <h5>{addrForm && addrForm.fullName ? "Edit Address" : "Add New Address"}</h5>
                      <button className="addr-modal-close" onClick={() => setAddrModalOpen(false)}><BsX /></button>
                    </div>

                    <form onSubmit={handleAddressSubmit}>
                      <div className="addr-modal-body">
                        <div className="mb-3">
                          <label className="form-label">Address Type</label>
                          <div className="addr-type-selector">
                            {['home','work','other'].map((t) => (
                              <div key={t} className={`addr-type-option ${addrForm.type === t ? 'active' : ''}`} onClick={() => setAddrForm((f) => ({ ...f, type: t }))}>
                                {TYPE_ICONS[t]} {t.charAt(0).toUpperCase() + t.slice(1)}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="row g-3">
                          <div className="col-sm-6">
                            <label className="form-label">Full Name *</label>
                            <input className={`form-control ${addrErrors.fullName ? 'is-invalid' : ''}`} name="fullName" value={addrForm.fullName} onChange={(e) => setAddrForm((f)=>({...f, fullName: e.target.value}))} placeholder="Recipient's full name" />
                            {addrErrors.fullName && <div className="invalid-feedback">{addrErrors.fullName}</div>}
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label">Phone Number *</label>
                            <input className={`form-control ${addrErrors.phone ? 'is-invalid' : ''}`} name="phone" value={addrForm.phone} onChange={(e) => setAddrForm((f)=>({...f, phone: e.target.value}))} placeholder="10-digit number" maxLength={10} />
                            {addrErrors.phone && <div className="invalid-feedback">{addrErrors.phone}</div>}
                          </div>
                          <div className="col-12">
                            <label className="form-label">Address Line *</label>
                            <input className={`form-control ${addrErrors.addressLine1 ? 'is-invalid' : ''}`} name="addressLine1" value={addrForm.addressLine1} onChange={(e) => setAddrForm((f)=>({...f, addressLine1: e.target.value}))} placeholder="House no., Street, Area" />
                            {addrErrors.addressLine1 && <div className="invalid-feedback">{addrErrors.addressLine1}</div>}
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label">City *</label>
                            <input className={`form-control ${addrErrors.city ? 'is-invalid' : ''}`} name="city" value={addrForm.city} onChange={(e) => setAddrForm((f)=>({...f, city: e.target.value}))} placeholder="City" />
                            {addrErrors.city && <div className="invalid-feedback">{addrErrors.city}</div>}
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label">State *</label>
                            <input className={`form-control ${addrErrors.state ? 'is-invalid' : ''}`} name="state" value={addrForm.state} onChange={(e) => setAddrForm((f)=>({...f, state: e.target.value}))} placeholder="State" />
                            {addrErrors.state && <div className="invalid-feedback">{addrErrors.state}</div>}
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label">ZIP Code *</label>
                            <input className={`form-control ${addrErrors.zipCode ? 'is-invalid' : ''}`} name="zipCode" value={addrForm.zipCode} onChange={(e) => setAddrForm((f)=>({...f, zipCode: e.target.value}))} placeholder="6-digit ZIP" maxLength={6} />
                            {addrErrors.zipCode && <div className="invalid-feedback">{addrErrors.zipCode}</div>}
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label">Country *</label>
                            <input className={`form-control ${addrErrors.country ? 'is-invalid' : ''}`} name="country" value={addrForm.country} onChange={(e) => setAddrForm((f)=>({...f, country: e.target.value}))} placeholder="Country" />
                            {addrErrors.country && <div className="invalid-feedback">{addrErrors.country}</div>}
                          </div>
                          <div className="col-12">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="isDefault" name="isDefault" checked={addrForm.isDefault} onChange={(e) => setAddrForm((f)=>({...f, isDefault: e.target.checked}))} style={{ accentColor: "#fd350d" }} />
                              <label className="form-check-label" htmlFor="isDefault" style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>
                                Set as default delivery address
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="addr-modal-footer">
                        <button type="button" className="addr-cancel-btn" onClick={() => setAddrModalOpen(false)}>Cancel</button>
                        <button type="submit" className="addr-submit-btn">Save Address</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

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
          Submit Order • Pay ₹{summary.totalWithDelivery.toFixed(0)}
        </Button>
      </Modal.Footer>
    </Modal>
    <OrderResultModal
      show={orderResult.show}
      onClose={() => {
        setOrderResult({ show: false, success: false, message: "" })
        navigation('/my-order')
      }}
      success={orderResult.success}
      message={orderResult.message}
    />
    </>
  );
}
