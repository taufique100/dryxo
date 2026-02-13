import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./OrderModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  errorNotify,
  successNotify,
  warningNotify,
} from "../../Utils/toastNotify";
import { setOpenModal, setSelectedProductId } from "../../Store/OrderSlice";
import OrderModal from "./OrderModal";

function ViewAddedProductBtn() {
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [animateWidth, setAnimateWidth] = useState(false);

  const { selectedProductId } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    if (!selectedProductId) return;

    if (!selectedProducts.includes(selectedProductId)) {
      setSelectedProducts((prev) => [...prev, selectedProductId]);
      successNotify("Product added successfully!");
      showTemporaryMessage();
    } else {
      warningNotify("Product already added!");
    }

   //for not add auto on add card
    dispatch(setSelectedProductId(null));
  }, [selectedProductId]);

  const showTemporaryMessage = () => {
    const count = selectedProducts.length + 1;
    setMessageText(`${count} item${count > 1 ? "s" : ""} added`);
    setShowMessage(true);
    setAnimateWidth(true);

    setTimeout(() => {
      setShowMessage(false);
      setAnimateWidth(false);
    }, 2000);
  };

  const handleModalOpen = () => {
    dispatch(setOpenModal(true));
  };

  return (
    <>
      <OrderModal />
      <div
        onClick={handleModalOpen}
        className={`add_card_btn ${animateWidth ? "expand" : ""}`}
      >
        <Button
          onClick={handleModalOpen}
          className="d-flex align-items-center gap-2 position-relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>

          {selectedProducts.length > 0 && (
            <span
              key={selectedProducts.length}
              className="badge_count animate-badge"
            >
              {selectedProducts.length}
            </span>
          )}
        </Button>

        {showMessage && (
          <span className="order_item animate-message">{messageText}</span>
        )}
      </div>
    </>
  );
}

export default ViewAddedProductBtn;
