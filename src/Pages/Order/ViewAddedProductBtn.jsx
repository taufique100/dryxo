import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./OrderModal.css";
import { useDispatch, useSelector } from "react-redux";
import { successNotify } from "../../Utils/toastNotify";
import { setOpenModal } from "../../Store/OrderSlice";
import OrderModal from "./OrderModal";
import LoginModal from "../../Component/LoginModal";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../Component/hooks/useLocalStorage";

function ViewAddedProductBtn() {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [animateWidth, setAnimateWidth] = useState(false);
  const [prevCartLength, setPrevCartLength] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { cartItems } = useSelector((state) => state.orderSlice);
  const {isLoggedIn, loading: authLoading } = useAuth();
  const {getItem} = useLocalStorage();

  useEffect(() => {
    if (cartItems.length > prevCartLength) {
      successNotify("Product added successfully!");
      showTemporaryMessage();
    }
    setPrevCartLength(cartItems.length);
  }, [cartItems.length]);

  const showTemporaryMessage = () => {
    const count = cartItems.length;
    setMessageText(`${count} item${count > 1 ? "s" : ""} in cart`);
    setShowMessage(true);
    setAnimateWidth(true);

    setTimeout(() => {
      setShowMessage(false);
      setAnimateWidth(false);
    }, 2000);
  };

  const handleModalOpen = () => {
    if (authLoading) return; // Wait for auth check
    const userToken = getItem("userToken");
    const userInfo = getItem("userInfo");

    if (!userToken && !userInfo?.role) {
      setShowLoginModal(true);
    } else {
      dispatch(setOpenModal(true));
    }
  };

  const handleLoginSuccess = () => {
    // After successful login, open the order modal
    dispatch(setOpenModal(true));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <OrderModal />
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <div
        onClick={handleModalOpen}
        className={`add_card_btn ${animateWidth ? "expand" : ""}`}
      >
        <Button
          onClick={handleModalOpen}
          className="d-flex align-items-center gap-2 position-relative"
          disabled={authLoading}
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

          {totalItems > 0 && (
            <span
              key={totalItems}
              className="badge_count animate-badge"
            >
              {totalItems}
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
