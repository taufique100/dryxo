import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ParchaseContent from "../Purchase/ParchaseContent";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "./ParchaseDetails.css";

const ParchaseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const item = ParchaseContent.find((b) => String(b.id) === id);
      setItemData(item);
    }
  }, [location]);

  if (!itemData) {
    return <p className="text-center mt-4">Product not found...</p>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="product-details-page py-5 border mb-3">
      {/* Back Button */}
      <div className="back-button" onClick={handleBack}>
        <FaArrowAltCircleLeft size={28} />
        <span>Back</span>
      </div>

      {/* Main Content */}
      <div className="product-details-container">
        {/* Image */}
        <div className="product-image">
          <img src={itemData.image} alt={itemData.title} className="border" />
        </div>

        {/* Info */}
        <div className="product-info">
          <div className="product-meta">
            <span className="category">{itemData.category}</span>
            <span className="date">{itemData.date}</span>
          </div>
          <h1 className="product-title">{itemData.title}</h1>
          <p className="product-description">{itemData.description}</p>
          <div className="buttons mt-5 ">
            <button className="btn btn-primary btn-sm mt-auto custom-btn m-1">
              Buy Now
            </button>
            <button className="btn btn-primary btn-sm mt-auto custom-btn m-1">
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParchaseDetails;
