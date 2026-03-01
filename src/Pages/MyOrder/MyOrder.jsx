import React, { useEffect, useState } from "react";
import "./MyOrder.css";
import { successNotify, errorNotify, warningNotify } from "../../Utils/toastNotify";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("dryxo_orders");
      if (raw) setOrders(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load orders", e);
    }
  }, []);

  const toggle = (id) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  const saveOrders = (next) => {
    try {
      setOrders(next);
      window.localStorage.setItem("dryxo_orders", JSON.stringify(next));
    } catch (e) {
      console.error("Failed to save orders", e);
      errorNotify("Could not update orders");
    }
  };

  const deleteOrder = (id) => {
    if (!window.confirm("Delete this order permanently?")) return;
    const next = orders.filter((o) => o.id !== id);
    saveOrders(next);
    successNotify("Order deleted");
  };

  const cancelOrder = (id) => {
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return errorNotify("Order not found");

    const current = orders[idx];
    const status = (current.status || "processing").toLowerCase();
    if (status === "delivered") return warningNotify("Delivered orders cannot be cancelled");
    if (status === "cancelled") return warningNotify("Order is already cancelled");

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    const updated = [...orders];
    updated[idx] = { ...current, status: "Cancelled" };
    saveOrders(updated);
    successNotify("Order cancelled");
  };

  if (!orders || orders.length === 0)
    return (
      <div className="orders-container">
        <h2>My Orders</h2>
        <div className="order-card p-4">You have no orders yet.</div>
      </div>
    );

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <div>
              <strong>Order ID:</strong> {order.id}
              <br />
              <small>{new Date(order.date).toLocaleString()}</small>
            </div>
            <span className={`status ${order.status ? order.status.toLowerCase() : "processing"}`}>
              {order.status || "Processing"}
            </span>
          </div>

          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index} className="item-row">
                <span>{item.title || item.name}</span>
                <span>Qty: {item.qty}</span>
                <span>₹ {Number(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="order-footer">
            <div>
              <strong>Total: ₹ {Number(order.total).toFixed(2)}</strong>
            </div>
            <div className="footer-actions">
              <button onClick={() => toggle(order.id)}>{expanded[order.id] ? "Hide Details" : "View Details"}</button>
              <button
                onClick={() => cancelOrder(order.id)}
                disabled={order.status && (order.status.toLowerCase() === "cancelled" || order.status.toLowerCase() === "delivered")}
              >
                Cancel Order
              </button>
              <button className="delete-btn" onClick={() => deleteOrder(order.id)}>
                Delete Order
              </button>
            </div>
          </div>

          {expanded[order.id] && (
            <div className="order-details p-3">
              <h4>Order Details</h4>
              <div>
                <strong>Payment:</strong> {order.paymentMethod || "N/A"}
              </div>
              <div>
                <strong>Address:</strong>
                <div className="text-muted">
                  {order.address?.name}
                  <br />
                  {order.address?.address}, {order.address?.city} - {order.address?.pincode}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
