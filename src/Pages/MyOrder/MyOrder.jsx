import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiChevronRight, FiShoppingBag } from "react-icons/fi";
import "./MyOrder.css";
import axiosInstance from "../../api/axiosInstance";
import { apiUrls } from "../../Utils/apiUrls";

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
  delivered:  "status-delivered",
  shipped:    "status-shipped",
  processing: "status-processing",
  cancelled:  "status-cancelled",
  pending:    "status-pending",
};

export default function MyOrders() {
  const navigate = useNavigate();
  const [orderedProducts, setOrderedProducts] = useState([]);

  const getAllOrders = async () => {
    try {
      const res = await axiosInstance.get(apiUrls.getAllOrders);
      // API shape may be { status,message,data: [...] } or direct array
      const responseData = res?.data?.data ?? res?.data ?? [];
      console.log('responseData', responseData)
      setOrderedProducts(Array.isArray(responseData) ? responseData : []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setOrderedProducts([]);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  // prefer API-loaded orders, otherwise fall back to local mock data
  const orders = (orderedProducts && orderedProducts.length) ? orderedProducts : [];

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
          {(orderedProducts.length === 0 && orders.length === 0) ? (
            <div className="mo-empty">
              <FiShoppingBag size={48} />
              <p>No orders yet. Start shopping!</p>
              <button className="mo-shop-btn" onClick={() => navigate("/products")}>
                Browse Products
              </button>
            </div>
          ) : (
            // prefer API orders; fall back to local mock
            (orderedProducts.length ? orderedProducts : orders).map((order) => (
              <div className="mo-card" key={order.id || order.orderNumber}>

                {/* card top bar */}
                <div className="mo-card-top">
                  <div className="mo-card-meta">
                    <span className="mo-order-id">#{order.orderNumber || order.id}</span>
                    <span className="mo-dot" />
                    <span className="mo-date">{order.orderDate?.split(':')?.[0] || ""}</span>
                    <span className="mo-dot" />
                    <span className="mo-pay text-uppercase">{order.paymentMethod || order.paymentMethod} (Payment Mode)</span>
                  </div>
                  <span className={`mo-status ${STATUS_COLOR[String(order.status || "").toLowerCase()] || ""}`}>
                    {String(order.status || "").charAt(0).toUpperCase() + String(order.status || "").slice(1)}
                  </span>
                </div>

                {/* product rows */}
                <div className="mo-items">
                  {(order.products || order.items || []).map((item, idx) => {
                    const title = item.productTitle || item.name || "Item";
                    const qty = item.quantity ?? item.qty ?? 1;
                    const pricePer = item.salePriceAtOrder ?? item.priceAtOrder ?? item.price ?? item.mrpAtOrder ?? 0;
                    const img = item.productImage || item.img || null;
                    const totalPrice = pricePer * qty;
                    return (
                      <div className="mo-item" key={idx}>
                        <div className="mo-item-img">
                          {img ? <img src={img} alt={title} /> : <FiPackage size={22} />}
                        </div>
                        <div className="mo-item-info">
                          <p className="mo-item-name">{title}</p>
                          {item.size && <p className="mo-item-variant">{item.size}</p>}
                        </div>
                        <div className="mo-item-right">
                          <span className="mo-item-qty">Quantity: ×{qty}</span>
                          <span className="mo-item-price">₹{totalPrice}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* card footer */}
                <div className="mo-card-footer">
                  <div className="mo-total">
                    <span>Order Total</span>
                    <strong>₹{order.totalAmount ?? order.total ?? order.subtotal ?? 0}</strong>
                  </div>
                  <button
                    className="mo-detail-btn"
                    onClick={() => navigate(`/my-order/${order.id || order.orderNumber}`, { state: { order } })}
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
