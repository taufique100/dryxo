
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import productImg from "../../../assets/product-4.png";
import { useDispatch } from "react-redux";
import { setSelectedProductId } from "../../../Store/OrderSlice";
import sanitaryProducts from "../sanitaryProducts";
import ViewAddedProductBtn from "../../Order/ViewAddedProductBtn";
import { FaCartPlus } from "react-icons/fa";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = sanitaryProducts[id];
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(productImg);

  const addProduct = () => {
    dispatch(setSelectedProductId(Number(id) + 1));
  };

  if (!product) return <h2>Product not found</h2>;

  return (
    <>
      <ViewAddedProductBtn />

      <div className="product_page">
        <div className="container">
          <div className="row">
            {/* LEFT IMAGE GALLERY */}
            <div className="col-md-6">
              <div className="image_gallery">
                <div className="main_image">
                  <img src={mainImg} alt="product" />
                </div>

                {/* <div className="thumbs">
                  {[1, 2, 3, 4].map((_, i) => (
                    <img
                      key={i}
                      src={productImg}
                      onClick={() => setMainImg(productImg)}
                    />
                  ))}
                </div> */}
              </div>
            </div>

            {/* RIGHT INFO */}
            <div className="col-md-6">
              <div className="product_info">
                <h1>{product.title}</h1>
                <p className="desc">{product.description}</p>

                {/* RATING */}
                <div className="rating">
                  ⭐⭐⭐⭐⭐ <span>(124 reviews)</span>
                </div>

                {/* PRICE */}
                <h2 className="price">₹{product.price}</h2>

                {/* META */}
                <div className="meta">
                  <span>
                    <b>Size:</b> {product.size}
                  </span>
                  <span>
                    <b>Type:</b> {product.type}
                  </span>
                </div>

                {/* STOCK */}
                <div className="stock">✔ In Stock</div>

                {/* QUANTITY */}
                {/* <div className="qty_box">
                  <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>
                    -
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div> */}

                {/* FEATURES */}
                <div className="features">
                  <h5>Why you'll love it</h5>
                  {product.features.map((f, i) => (
                    <p key={i}>✔ {f}</p>
                  ))}
                </div>

                {/* DELIVERY */}
                <div className="delivery">
                  🚚 Free Delivery in 3-5 days
                  <br />
                  🔁 7 Day Replacement
                  <br />
                  🔒 Secure Payment
                </div>

                {/* BUTTONS */}
                <div className="action_btns">
                  <Button className="cart_btn" onClick={addProduct}>
                      <FaCartPlus />  Cart
                  </Button>
                  <Button className="buy_btn">Buy Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

