import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./ProductOverview.css";

import product1 from "../../../assets/product-1.png";
import product2 from "../../../assets/product-2.png";
import product3 from "../../../assets/product-3.png";
import product4 from "../../../assets/product-4.png";
import product5 from "../../../assets/product-1.png";
import product6 from "../../../assets/product-2.png";

const ProductOverview = () => {
  const products = [product1, product2, product3, product4, product5, product6];

  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // 🔹 Check screen width on load and resize
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1); // Mobile
      } else {
        setItemsPerSlide(3); // Desktop
      }
    };

    updateItemsPerSlide(); // run at first load
    window.addEventListener("resize", updateItemsPerSlide);

    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  // 🔹 Chunk products according to itemsPerSlide
  const chunkedProducts = [];
  for (let i = 0; i < products.length; i += itemsPerSlide) {
    chunkedProducts.push(products.slice(i, i + itemsPerSlide));
  }

  return (
    <div className="products-section text-center py-5">
      {/* Background Title */}
      <h1 className="section-bg-title">Our Products</h1>

      {/* Main Title */}
      <h3 className="fw-bold text-danger section-title">Product Overview</h3>
      <hr className="title-underline" />

      <div className="container mt-5">
        <Carousel interval={3000} indicators={true} controls={true}>
          {chunkedProducts.map((group, index) => (
            <Carousel.Item key={index}>
              <div className="row justify-content-center">
                {group.map((img, idx) => (
                  <div
                    className={`${
                      itemsPerSlide === 1
                        ? "col-10"
                        : "col-10 col-sm-6 col-md-4"
                    }`}
                    key={idx}
                  >
                    <img
                      className="d-block w-100 product-slide-img"
                      src={img}
                      alt={`Dryxo product ${idx}`}
                    />
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductOverview;
