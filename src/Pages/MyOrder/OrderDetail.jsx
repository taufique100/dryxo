import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiPackage, FiMapPin, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import "./OrderDetail.css";

const STEPS = ["Order Placed", "Processing", "Shipped", "Delivered"];

const STATUS_STEP = {
  "Order Placed": 0,
  "Processing":   1,
  "Shipped":      2,
  "Delivered":    3,
  "Cancelled":    -1,
};

const STEP_ICONS = ["🛒", "⚙️", "🚚", "✅"];

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

  /* get order from navigation state or fallback */
  const order = location.state?.order || null;

  if (!order) {
    return (
      <div className="od-page od-not-found">
        <p>Order not found.</p>
        <button className="od-back-btn" onClick={() => navigate("/my-order")}>
          <FiArrowLeft /> Back to Orders
        </button>
      </div>
    );
  }

  const currentStep = STATUS_STEP[order.status] ?? 0;
  const isCancelled = order.status === "Cancelled";

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
              <h1 className="od-title">#{order.id}</h1>
              <p className="od-meta">{order.date} &nbsp;·&nbsp; {order.paymentMethod}</p>
            </div>
            <span className={`od-status-badge ${STATUS_COLOR[order.status] || ""}`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="od-body">

        {/* ── STEPPER ── */}
        <div className="od-section">
          <h3 className="od-section-title"><FiPackage /> Order Tracking</h3>

          {isCancelled ? (
            <div className="od-cancelled-banner">
              <span>✕</span> This order has been cancelled.
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
            {order.items.map((item) => (
              <div className="od-item" key={item.id}>
                <div className="od-item-img">
                  {item.img
                    ? <img src={item.img} alt={item.name} />
                    : <FiPackage size={24} />
                  }
                </div>
                <div className="od-item-info">
                  <p className="od-item-name">{item.name}</p>
                  <p className="od-item-variant">{item.variant}</p>
                  <p className="od-item-qty">Quantity: {item.qty}</p>
                </div>
                <div className="od-item-price">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}
          </div>

          {/* price summary */}
          <div className="od-summary">
            <div className="od-summary-row">
              <span>Subtotal</span>
              <span>₹{order.total}</span>
            </div>
            <div className="od-summary-row">
              <span>Delivery</span>
              <span className="od-free">Free</span>
            </div>
            <div className="od-summary-divider" />
            <div className="od-summary-row od-summary-total">
              <span>Total Paid</span>
              <strong>₹{order.total}</strong>
            </div>
          </div>
        </div>

        {/* ── DELIVERY + PAYMENT ── */}
        <div className="od-grid-2">
          <div className="od-section">
            <h3 className="od-section-title"><FiMapPin /> Delivery Address</h3>
            <div className="od-info-box">
              <p className="od-info-name">{order.address?.split(",")[0] || "Customer"}</p>
              <p className="od-info-text">{order.address}</p>
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
                <strong className="od-paid">Paid</strong>
              </div>
              <div className="od-pay-row">
                <span>Amount</span>
                <strong>₹{order.total}</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
