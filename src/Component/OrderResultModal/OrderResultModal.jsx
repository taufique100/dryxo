import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./OrderResultModal.css";

function SuccessIcon() {
  return (
    <svg className="order-icon" viewBox="0 0 52 52" aria-hidden>
      <circle className="icon-circle" cx="26" cy="26" r="24" fill="none" stroke="#4BB543" strokeWidth="2" />
      <path className="icon-check" fill="none" stroke="#4BB543" strokeWidth="3" d="M14 27 l7 7 l16 -16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg className="order-icon" viewBox="0 0 52 52" aria-hidden>
      <circle className="icon-circle" cx="26" cy="26" r="24" fill="none" stroke="#FF4C4C" strokeWidth="2" />
      <path className="icon-x" fill="none" stroke="#FF4C4C" strokeWidth="3" d="M16 16 l20 20 M36 16 l-20 20" strokeLinecap="round" />
    </svg>
  );
}

export default function OrderResultModal({ show, onClose, success = true, message = "" }) {
  return (
    <Modal
      centered
      show={show}
      onHide={onClose}
      backdrop="static"
      backdropClassName="order-result-backdrop"
      keyboard={false}
      className={`order-result-modal ${success ? "order-result-modal--success" : "order-result-modal--error"}`}
    >
      <Modal.Body className="order-result-modal__body text-center py-4">
        {success ? <SuccessIcon /> : <ErrorIcon />}
        <h5 className="mt-3">{message || (success ? "Order placed successfully!" : "Order could not be placed")}</h5>
        <Button variant="primary" className="mt-3" onClick={onClose}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}
