import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import productImg from "../../../assets/product-4.png";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Store/OrderSlice";
import { successNotify, errorNotify } from "../../../Utils/toastNotify";
import sanitaryProducts from "../sanitaryProducts";
import ViewAddedProductBtn from "../../Order/ViewAddedProductBtn";
import { FaCartPlus } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const product = sanitaryProducts.find((p) => p.id === Number(id));
  const [mainImg, setMainImg] = useState(productImg);

  const storageKey = `product_reviews_${id}`;

  const defaultReviews = [
    { name: "Rahul", rating: 5, text: "Amazing quality product" },
    { name: "Priya", rating: 4, text: "Very comfortable to use" },
    { name: "Aman", rating: 5, text: "Worth the money" },
    { name: "Sneha", rating: 4, text: "Nice packaging and delivery" },
  ];

  const [reviews, setReviews] = useState(defaultReviews);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [userName, setUserName] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [userReview, setUserReview] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  // LOAD STORAGE
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setReviews(JSON.parse(saved));
  }, [id]);

  // SAVE STORAGE
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(reviews));
  }, [reviews]);

  // AVG RATING
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  const addProduct = () => {
    if (!product) return errorNotify('Product not found');
    try {
      dispatch(addToCart({ id: product.id, quantity: 1 }));
      successNotify("Added to cart");
    } catch (e) {
      console.error("addToCart error", e);
      errorNotify("Failed to add to cart");
    }
  };

  const buyNow = () => {
    if (!product) return errorNotify('Product not found');
    try {
      dispatch(addToCart({ id: product.id, quantity: 1 }));
      successNotify("Proceeding to checkout");
      navigate("/order/details");
    } catch (e) {
      console.error("buyNow error", e);
      errorNotify("Failed to process buy now");
    }
  };

  // SUBMIT REVIEW
  const submitReview = () => {
    if (!userName.trim()) return alert("Enter name");
    if (!userReview.trim()) return alert("Write review");

    const newReview = {
      name: userName,
      rating: userRating,
      text: userReview,
    };

    if (editIndex !== null) {
      const updated = [...reviews];
      updated[editIndex] = newReview;
      setReviews(updated);
      setEditIndex(null);
    } else {
      setReviews([newReview, ...reviews]);
    }

    setUserName("");
    setUserReview("");
    setUserRating(5);
  };

  // DELETE REVIEW
  const deleteReview = (index) => {
    const updated = reviews.filter((_, i) => i !== index);
    setReviews(updated);
  };

  // EDIT REVIEW
  const editReview = (index) => {
    const r = reviews[index];
    setUserName(r.name);
    setUserRating(r.rating);
    setUserReview(r.text);
    setEditIndex(index);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  if (!product) return <h2>Product not found</h2>;

  return (
    <>
      <ViewAddedProductBtn />

      <div className="product_page">
        <div className="container">
          <div className="row">
            {/* LEFT IMAGE */}
            <div className="col-md-6">
              <div className="image_gallery">
                <div className="main_image">
                  <img src={mainImg} alt="product" />
                </div>
              </div>
            </div>

            {/* RIGHT INFO */}
            <div className="col-md-6">
              <div className="product_info">
                <h1>{product.title}</h1>
                <p className="desc">{product.description}</p>

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

                <div className="features">
                  <h5>Why you'll love it</h5>
                  {product.features.map((f, i) => (
                    <p key={i}>✔ {f}</p>
                  ))}
                </div>

                {/* PREMIUM INFO CARDS */}
                <div className="info_cards">
                  <div className="info_card">
                    🚚 Free Delivery <br />
                    🔁 7 Day Replacement <br />
                    🔒 Secure Payment
                  </div>

                  <div className="info_card">
                    <h4>{avgRating}</h4>
                    <ReactStars
                      count={5}
                      value={Number(avgRating)}
                      size={20}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffa500"
                    />
                    <p>{reviews.length} Reviews</p>
                  </div>
                </div>

                <div className="action_btns">
                  <Button className="cart_btn" onClick={addProduct}>
                    <FaCartPlus /> Cart
                  </Button>
                  <Button className="buy_btn" onClick={buyNow}>
                    Buy Now
                  </Button>
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
