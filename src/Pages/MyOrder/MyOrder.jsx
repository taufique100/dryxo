import React from "react";
import "./MyOrder.css";

const MyOrders = () => {
  const orders = [
    {
      id: "ORD12345",
      date: "12 Sep 2025",
      status: "Delivered",
      total: 198,
      items: [{ name: "Sanitary Pad Large", qty: 2, price: 100 }],
    },
    {
      id: "ORD12346",
      date: "05 Sep 2025",
      status: "Processing",
      total: 299,
      items: [{ name: "Sanitary Pad Medium", qty: 3, price: 100 }],
    },
  ];

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <div>
              <strong>Order ID:</strong> {order.id}
              <br />
              <small>{order.date}</small>
            </div>
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>

          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index} className="item-row">
                <span>{item.name}</span>
                <span>Qty: {item.qty}</span>
                <span>₹ {item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="order-footer">
            <strong>Total: ₹ {order.total}</strong>
            <button>View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
