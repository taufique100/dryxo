import React from "react";
import { Button } from "react-bootstrap";
import "./OrderModal.css";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../../Store/OrderSlice";

function ViewAddedProductBtn() {
  // Floating cart button removed — controlled cart actions exist on page elements now.
  return null;
}

export default ViewAddedProductBtn;
