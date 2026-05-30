import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiPackage, FiMapPin, FiCreditCard, FiCheckCircle, FiShoppingCart, FiSettings, FiTruck, FiCheck, FiX } from "react-icons/fi";
import "./OrderDetail.css";
import axiosInstance from "../../api/axiosInstance";
import { apiUrls } from "../../Utils/apiUrls";
import { errorNotify, successNotify } from "../../Utils/toastNotify";
import CancelOrderModal from "../../Component/models/CancelOrderModal";

const STEPS = ["Order Placed", "Processing", "Shipped", "Delivered"];

const STATUS_STEP = {
  "Order Placed": 0,
  "Processing":   1,
  "Shipped":      2,
  "Delivered":    3,
  "Cancelled":    -1,
};

const STEP_ICONS = [
  <FiShoppingCart size={18} />,
  <FiSettings size={18} />,
  <FiTruck size={18} />,
  <FiCheck size={18} />,
];

const STATUS_COLOR = {
  Delivered:  "od-badge-delivered",
  Shipped:    "od-badge-shipped",
  Processing: "od-badge-processing",
  Cancelled:  "od-badge-cancelled",
};

export default function OrderDetail() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { id }    = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelledByUser, setCancelledByUser] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${apiUrls.getOrderById}/${id}`);
      // API returns the order object in res.data
      const payload = res?.data ?? null;
      setOrderData(payload);
    } catch (err) {
      console.error(err);
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelConfirm = async () => {
    if (!order?.orderNumber) return;
    setCancelLoading(true);
    try {
      await axiosInstance.patch(`${apiUrls.cancelOrder}`, {
        reason:"",
        orderId: order?.orderNumber
      });
      setOrderData((prev) => (prev ? { ...prev, status: "Cancelled" } : prev));
      setCancelledByUser(true);
      successNotify("Order cancelled successfully.");
      setShowCancelModal(false);
    } catch (err) {
      const message = err?.response?.data?.message || "Unable to cancel order.";
      errorNotify(message);
    } finally {
      setCancelLoading(false);
    }
  };

  useEffect(()=>{
    if(id){
      getProduct()  
    }
  },[id])
  /* prefer fetched order data, fall back to navigation state */
  const baseOrder = orderData ?? location.state?.order ?? null;
  const order = baseOrder
    ? { ...baseOrder, status: cancelledByUser ? "Cancelled" : baseOrder.status }
    : null;

  if (loading) {
    return (
      <div className="od-page od-loading">
        <p>Loading order…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="od-page od-not-found">
        <p>Order not found.</p>
        <button className="od-back-btn" onClick={() => navigate("/my-order") }>
          <FiArrowLeft /> Back to Orders
        </button>
      </div>
    );
  }

  // normalize status to step label
  const normalizeStatusLabel = (s) => {
    if (!s) return "Order Placed";
    const st = String(s).toLowerCase();
    if (st === "pending" || st === "placed" || st === "order placed") return "Order Placed";
    if (st.includes("process")) return "Processing";
    if (st.includes('confirme')) return "Shipped";
    if (st.includes("deliver") || st.includes('shippe')) return "Delivered";
    if (st.includes("cancel")) return "Cancelled";
    return "Order Placed";
  };

  const orderDate = order?.orderDate || order?.date || order?.createdAt || "";
  const statusLabel = normalizeStatusLabel(order.status);
  console.log('statusLabel', statusLabel)
  const currentStep = STATUS_STEP[statusLabel] ?? 0;
  const isCancelled = statusLabel === "Cancelled";

  return (
    <div className="od-page">

      {/* ── HERO ── */}
      <div className="od-hero">
        <div className="od-hero-inner">
          <button className="od-back-btn" onClick={() => navigate("/my-order")}>
            <FiArrowLeft size={14} /> Back to Orders
          </button>
          <div className="od-hero-row">
            <div>
              <span className="od-tag">Order Details</span>
              <h1 className="od-title">#{order.orderNumber || order.id}</h1>
              <p className="od-meta text-uppercase">{orderDate} &nbsp;·&nbsp; <span className="text-capitalize">Payment Mode:</span> {order.paymentMethod}</p>
            </div>
            <div className="od-hero-actions">
              {!isCancelled && (
                <button
                  type="button"
                  className="od-cancel-order-btn"
                  onClick={() => setShowCancelModal(true)}
                >
                  Cancel Order
                </button>
              )}
              <span className={`od-status-badge ${STATUS_COLOR[statusLabel] || ""}`}>
                {statusLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <CancelOrderModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        onConfirm={handleCancelConfirm}
        order={order}
        processing={cancelLoading}
      />

      <div className="od-body">

        {/* ── STEPPER ── */}
        <div className="od-section">
          <h3 className="od-section-title"><FiPackage /> Order Tracking</h3>

          {isCancelled ? (
            <div className="od-cancelled-banner">
              <span className="od-cancelled-icon"><FiX size={14} /></span> This order has been cancelled.
            </div>
          ) : (
            <div className="od-stepper">
              {STEPS.map((step, i) => {
                const done    = i < currentStep;
                const active  = i === currentStep;
                const pending = i > currentStep;
                return (
                  <React.Fragment key={step}>
                    <div className={`od-step ${done ? "done" : ""} ${active ? "active" : ""} ${pending ? "pending" : ""}`}>
                      <div className="od-step-circle">
                        {done
                          ? <FiCheckCircle size={18} />
                          : <span>{STEP_ICONS[i]}</span>
                        }
                      </div>
                      <div className="od-step-info">
                        <p className="od-step-label">{step}</p>
                        {active && <p className="od-step-sub">In progress</p>}
                        {done   && <p className="od-step-sub">Completed</p>}
                      </div>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`od-connector ${i < currentStep ? "filled" : ""}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        {/* ── PRODUCTS ── */}
        <div className="od-section">
          <h3 className="od-section-title"><FiPackage /> Items Ordered</h3>
          <div className="od-items">
            {(order.products || order.items || []).map((item, idx) => {
              const title = item.productTitle || item.name || "Item";
              const qty = item.quantity ?? item.qty ?? 1;
              const pricePer = item.salePriceAtOrder ?? item.priceAtOrder ?? item.price ?? item.mrpAtOrder ?? 0;
              const img = item.productImage || item.img || null;
              const key = item._id || item.id || idx;
              return (
                <div className="od-item" key={key}>
                  <div className="od-item-img">
                    {img ? <img src={img} alt={title} /> : <FiPackage size={24} />}
                  </div>
                  <div className="od-item-info">
                    <p className="od-item-name">{title}</p>
                    {item.size && <p className="od-item-variant">{item?.size || item.variant}</p>}
                    <p className="od-item-qty">Quantity: {qty}</p>
                  </div>
                  <div className="od-item-price">₹{pricePer * qty}</div>
                </div>
              );
            })}
          </div>

          {/* price summary */}
          <div className="od-summary">
            <div className="od-summary-row">
              <span>Subtotal</span>
              <span>₹{order.subtotal ?? 0}</span>
            </div>
            <div className="od-summary-row">
              <span>Delivery</span>
              <span>₹{order.deliveryCharges ?? 0}</span>
            </div>
            <div className="od-summary-divider" />
            <div className="od-summary-row od-summary-total">
              <span>Total Paid</span>
              <strong>₹{order.totalAmount ?? order.total ?? 0}</strong>
            </div>
          </div>
        </div>

        {/* ── DELIVERY + PAYMENT ── */}
        <div className="od-grid-2">
          <div className="od-section">
            <h3 className="od-section-title"><FiMapPin /> Delivery Address</h3>
            <div className="od-info-box">
              <p className="od-info-name">{order.shippingAddress?.fullName || "Customer"}</p>
              <p className="od-info-text">
                {order.shippingAddress?.addressLine1}
                {order.shippingAddress?.city ? ", " + order.shippingAddress.city : ""}
                {order.shippingAddress?.state ? ", " + order.shippingAddress.state : ""}
                {order.shippingAddress?.zipCode ? " - " + order.shippingAddress.zipCode : ""}
              </p>
              <p className="od-info-text">{order.shippingAddress?.phone}</p>
            </div>
          </div>

          <div className="od-section">
            <h3 className="od-section-title"><FiCreditCard /> Payment Info</h3>
            <div className="od-info-box">
              <div className="od-pay-row">
                <span>Method</span>
                <strong>{order.paymentMethod}</strong>
              </div>
              <div className="od-pay-row">
                <span>Status</span>
                <strong className="od-paid">{order.paymentStatus || "Pending"}</strong>
              </div>
              <div className="od-pay-row">
                <span>Amount</span>
                <strong>₹{order.totalAmount ?? order.total ?? 0}</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
