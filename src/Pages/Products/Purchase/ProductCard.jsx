import React from "react";
import "./ProductCard.css";
import productImg from "../../../assets/product-4.png";
import { Button } from "react-bootstrap";
import ViewAddedProductBtn from "../../Order/ViewAddedProductBtn";
import { useDispatch } from "react-redux";
import { setSelectedProductId } from "../../../Store/OrderSlice";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaStar } from "react-icons/fa";

const ProductCard = ({ productList = [] }) => {
  const dispatch = useDispatch();

  const addProduct = (id) => {
    dispatch(setSelectedProductId(id));
  };

  const navigate = useNavigate();

  return (
    <>
      <ViewAddedProductBtn />

      <div className="container">
        <div className="row g-4">
          {productList?.map((item, idx) => (
            <div key={idx} className="col-lg-3 col-md-4 col-sm-6">
              <div className="pro_card_new">
                {/* BEST SELLER */}
                {/* <div className="best_badge">BEST SELLER</div> */}

                {/* IMAGE */}
                <div className="img_section">
                  <img src={productImg} alt={item?.title} />
                </div>

                <div className="content_section">
                  <h3 className="title">{item?.title}</h3>

                  <div className="feature_box">
                    <span>{item?.size}</span>
                    <span>{item?.type}</span>
                  </div>

                  {/* RATING */}
                  <div className="rating">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <span>4.8 (1296)</span>
                  </div>

                  {/* PRICE */}
                  <div className="price_row">
                    <span className="price">₹{item?.price}</span>
                    <span className="old_price">₹.499</span>
                    <span className="off">40% OFF</span>
                  </div>

                  {/* STOCK */}
                  <div className="stock">🔥 Only few left in stock</div>

                  {/* OLD COMMENTED CODE SAFE */}
                  {/* <p className="mb-2">{item?.description}</p> */}

                  {/* Features List */}
                  {/* 
                  <ul className="feature_list mb-3">
                      {item?.features?.map((feat, i) => (
                          <li key={i}>{feat}</li>
                      ))}
                  </ul> 
                  */}

                  {/* BUTTONS */}
                  <div className="btn_row">
                    <Button
                      onClick={() => addProduct(idx + 1)}
                      className="cart_btn"
                    >
                      <FaCartPlus />  Cart
                    </Button>

                    <Button
                      onClick={() => navigate(`/product/${idx}`)}
                      className="view_btn"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
