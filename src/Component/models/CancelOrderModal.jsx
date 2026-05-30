import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CancelOrderModal.css";

export default function CancelOrderModal({ show, onHide, onConfirm, order, processing = false }) {
  const orderDate = order?.orderDate || order?.date || order?.createdAt || "N/A";
  const amount = order?.totalAmount ?? order?.total ?? 0;
  const itemCount = (order?.products?.length || order?.items?.length || 0) || "1";
  const firstItem = order?.products?.[0] || order?.items?.[0] || {};
  const productName = firstItem.productTitle || firstItem.name || "your item";

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdropClassName="cancel-order-backdrop"
      className="cancel-order-modal"
    >
      <Modal.Header closeButton data-bs-theme="light">
        <Modal.Title>Cancel Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-3">
          Are you sure you want to cancel <strong>{productName}</strong>?
          This action will stop processing for this order.
        </p>

        <div className="cancel-summary">
          <div className="cancel-summary-row">
            <span>Order No.</span>
            <strong>{order?.orderNumber || order?.id || "-"}</strong>
          </div>
          <div className="cancel-summary-row">
            <span>Order Date</span>
            <strong>{orderDate}</strong>
          </div>
          <div className="cancel-summary-row">
            <span>Status</span>
            <strong>{order?.status || "Pending"}</strong>
          </div>
          <div className="cancel-summary-row">
            <span>Total</span>
            <strong>₹{amount}</strong>
          </div>
          <div className="cancel-summary-row">
            <span>Items</span>
            <strong>{itemCount}</strong>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-cancel-keep" onClick={onHide} disabled={processing}>
          No, keep order
        </Button>
        <Button className="btn-cancel-confirm" onClick={onConfirm} disabled={processing}>
          {processing ? "Cancelling..." : "Yes, cancel order"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
