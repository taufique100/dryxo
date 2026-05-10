import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiChevronRight, FiShoppingBag } from "react-icons/fi";
import "./MyOrder.css";

/* ── mock data — replace with API call ── */
const MOCK_ORDERS = [
  {
    id: "ORD-2025-001",
    date: "12 Sep 2025",
    status: "Delivered",
    paymentMethod: "UPI",
    address: "B-149, Sector-63, Noida, UP 201301",
    total: 398,
    items: [
      { id: 1, name: "Dryxo Regular Pack", variant: "Pack of 10", qty: 2, price: 149, img: null },
      { id: 2, name: "Dryxo XL Night",     variant: "Pack of 8",  qty: 1, price: 100, img: null },
    ],
  },
  {
    id: "ORD-2025-002",
    date: "05 Sep 2025",
    status: "Shipped",
    paymentMethod: "COD",
    address: "B-149, Sector-63, Noida, UP 201301",
    total: 299,
    items: [
      { id: 3, name: "Dryxo Slim Ultra",   variant: "Pack of 12", qty: 3, price: 100, img: null },
    ],
  },
  {
    id: "ORD-2025-003",
    date: "28 Aug 2025",
    status: "Processing",
    paymentMethod: "Card",
    address: "B-149, Sector-63, Noida, UP 201301",
    total: 149,
    items: [
      { id: 4, name: "Dryxo Regular Pack", variant: "Pack of 10", qty: 1, price: 149, img: null },
    ],
  },
];

const STATUS_COLOR = {
  Delivered:  "status-delivered",
  Shipped:    "status-shipped",
  Processing: "status-processing",
  Cancelled:  "status-cancelled",
};

export default function MyOrders() {
  const navigate = useNavigate();
  const orders = MOCK_ORDERS;

  return (
    <div className="mo-page">
      {/* ── Header ── */}
      <div className="mo-header">
        <div className="mo-header-inner">
          <span className="mo-tag">Account</span>
          <h1 className="mo-title">My Orders</h1>
          <p className="mo-sub">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
        </div>
      </div>

      {/* ── List ── */}
      <div className="mo-body">
        <div className="mo-list">
          {orders.length === 0 ? (
            <div className="mo-empty">
              <FiShoppingBag size={48} />
              <p>No orders yet. Start shopping!</p>
              <button className="mo-shop-btn" onClick={() => navigate("/products")}>
                Browse Products
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div className="mo-card" key={order.id}>

                {/* card top bar */}
                <div className="mo-card-top">
                  <div className="mo-card-meta">
                    <span className="mo-order-id">#{order.id}</span>
                    <span className="mo-dot" />
                    <span className="mo-date">{order.date}</span>
                    <span className="mo-dot" />
                    <span className="mo-pay">{order.paymentMethod}</span>
                  </div>
                  <span className={`mo-status ${STATUS_COLOR[order.status] || ""}`}>
                    {order.status}
                  </span>
                </div>

                {/* product rows */}
                <div className="mo-items">
                  {order.items.map((item) => (
                    <div className="mo-item" key={item.id}>
                      {/* product image / placeholder */}
                      <div className="mo-item-img">
                        {item.img
                          ? <img src={item.img} alt={item.name} />
                          : <FiPackage size={22} />
                        }
                      </div>
                      <div className="mo-item-info">
                        <p className="mo-item-name">{item.name}</p>
                        <p className="mo-item-variant">{item.variant}</p>
                      </div>
                      <div className="mo-item-right">
                        <span className="mo-item-qty">×{item.qty}</span>
                        <span className="mo-item-price">₹{item.price * item.qty}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* card footer */}
                <div className="mo-card-footer">
                  <div className="mo-total">
                    <span>Order Total</span>
                    <strong>₹{order.total}</strong>
                  </div>
                  <button
                    className="mo-detail-btn"
                    onClick={() => navigate(`/my-order/${order.id}`, { state: { order } })}
                  >
                    View Details <FiChevronRight size={14} />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
