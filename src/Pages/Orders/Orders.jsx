import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Badge } from "react-bootstrap";
import axios from "axios";
import { apiUrls } from "../../Utils/apiUrls";
import { errorNotify } from "../../Utils/toastNotify";
import { BsBoxSeam } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(apiUrls.getAllUserProducts, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Orders response:", response);
      // Assuming the API returns orders; adjust based on actual response
      setOrders(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      errorNotify("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const getStatusSteps = (status) => {
    const statusMap = {
      "Order Placed": 0,
      "Processing": 1,
      "Shipped": 2,
      "Delivered": 3,
    };
    const statusCode = statusMap[status] || 0;
    const steps = [
      { label: "Order Placed", active: statusCode >= 0 },
      { label: "Processing", active: statusCode >= 1 },
      { label: "Shipped", active: statusCode >= 2 },
      { label: "Delivered", active: statusCode >= 3 },
    ];
    return steps;
  };

  if (loading) {
    return <div className="text-center mt-5">Loading orders...</div>;
  }

  return (
    <Container className="orders-page py-5">
      <h2 className="text-center mb-4">My Orders</h2>
      {orders?.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-empty-icon">
            <BsBoxSeam />
          </div>
          <h3 className="orders-empty-title">No orders yet!</h3>
          <p className="orders-empty-sub">
            Looks like you haven't placed any orders yet.<br />
            Explore our products and grab something amazing today.
          </p>
          <a href="/products" className="orders-empty-btn">
            Shop Now <HiArrowRight />
          </a>
        </div>
      ) : (
        <Row>
          {orders?.map((order) => (
            <Col md={6} lg={4} key={order.id} className="mb-4">
              <Card className="order-card" onClick={() => handleOrderClick(order)}>
                <Card.Body>
                  <Card.Title>Order #{order.id}</Card.Title>
                  <Card.Text>
                    <strong>Status:</strong>{" "}
                    <Badge variant={order.status === "Delivered" ? "success" : "warning"}>
                      {order.status}
                    </Badge>
                  </Card.Text>
                  <Card.Text>
                    <strong>Total:</strong> ${order.total}
                  </Card.Text>
                  <Button variant="primary" size="sm">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ background: 'linear-gradient(45deg, #fd350d, #ff6b4a)', color: 'white' }}>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#f8f9fa' }}>
          {selectedOrder && (
            <>
              <Row>
                <Col md={6}>
                  <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                    <h5 style={{ color: '#fd350d' }}>Order #{selectedOrder.id}</h5>
                    <p><strong>Date:</strong> {selectedOrder?.date}</p>
                    <p><strong>Total:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>${selectedOrder.total}</span></p>
                    <p><strong>Payment:</strong> {selectedOrder?.paymentMethod}</p>
                    <p><strong>Status:</strong> <Badge variant={selectedOrder?.status === "Delivered" ? "success" : "warning"}>{selectedOrder.status}</Badge></p>
                  </div>
                </Col>
                <Col md={6}>
                  <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                    <h5 style={{ color: '#fd350d' }}>Products</h5>
                    {selectedOrder.products.map((product, index) => (
                      <div key={index} className="product-summary">
                        <p><strong>{product.name}</strong></p>
                        <p>Qty: {product.quantity} | Price: <span style={{ color: '#28a745' }}>${product.price}</span></p>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              <div className="tracking-stepper">
                <h5>Order Tracking</h5>
                <div className="stepper">
                  {getStatusSteps(selectedOrder?.status)?.map((step, index) => (
                    <div key={index} className={`step ${step.active ? "active" : ""}`}>
                      <div className="step-circle">{index + 1}</div>
                      <div className="step-label">{step.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Orders;