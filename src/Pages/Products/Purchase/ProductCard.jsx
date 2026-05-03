import React from "react";
import './ProductCard.css';
import { Button } from "react-bootstrap";
import ViewAddedProductBtn from "../../Order/ViewAddedProductBtn";
import { useDispatch } from "react-redux";
import { setSelectedProductId } from "../../../Store/OrderSlice";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductCard = ({ productList = [] }) => {
    const dispatch = useDispatch();

    const addProduct = (id) => {
        dispatch(setSelectedProductId(id));
    }

    // Function to render star ratings
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="star filled" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="star filled" />);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
        }

        return stars;
    };

    return (
        <>
            <ViewAddedProductBtn />
            <div className="container">
                {productList.length === 0 ? (
                    <div className="text-center py-5">
                        <p style={{ fontSize: '1.2rem', color: '#718096' }}>No products available at the moment</p>
                    </div>
                ) : (
                    <div className="row g-3">
                        {productList.map((item, idx) => {
                            const discountPercentage = item?.discountPercentage || 0;
                            const originalPrice = item?.originalPrice || item?.mrp || item?.price;
                            const salePrice = item?.price || 0;
                            // Handle rating that might be an object {rate, count} or a direct number
                            const rating = typeof item?.rating === 'object' ? item.rating?.rate : (item?.rating || item?.averageRating || 4.5);

                            return (
                                <div key={item?.id || idx} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                    <div className="pro_card">
                                        <div className="img_section">
                                            {item?.images && item.images.length > 0 ? (
                                                <Carousel
                                                    showThumbs={false}
                                                    showStatus={false}
                                                    showArrows={false}
                                                    infiniteLoop
                                                    autoPlay
                                                    interval={3000}
                                                    stopOnHover
                                                    swipeable
                                                    className="product-carousel"
                                                >
                                                    {item.images.map((img, index) => (
                                                        <div key={index} className="carousel-image-container">
                                                            <img
                                                                src={img}
                                                                alt={`${item?.title || 'Product'} - ${index + 1}`}
                                                                className="carousel-image"
                                                            />
                                                        </div>
                                                    ))}
                                                </Carousel>
                                            ) : (
                                                <div className="carousel-image-container">
                                                    <div style={{ color: 'white', fontSize: '1rem' }}>No Image</div>
                                                </div>
                                            )}

                                            {/* Discount Badge */}
                                            {discountPercentage > 0 && (
                                                <div className="discount-badge">
                                                    {discountPercentage}% OFF
                                                </div>
                                            )}
                                        </div>

                                        <div className="content_section px-3 py-3 d-flex flex-column justify-content-between">
                                            <div>
                                                <h1>{item?.title || 'Product Name'}</h1>

                                                {/* Rating Section */}
                                                <div className="rating_section d-flex align-items-center gap-2 mb-2">
                                                    <div className="stars">
                                                        {renderStars(rating)}
                                                    </div>
                                                    <span className="rating_text">({rating})</span>
                                                </div>

                                                {(item?.size || item?.category) && (
                                                    <div className="feature_box d-flex align-items-center justify-content-start gap-2 flex-wrap mb-2">
                                                        {item?.size && <span>{item.size}</span>}
                                                        {item?.category && <span>{item.category}</span>}
                                                    </div>
                                                )}

                                                {/* Price Section */}
                                                <div className="price_section">
                                                    <div className="price_container d-flex align-items-center gap-2">
                                                        <span className="sale_price">₹{salePrice}</span>
                                                        {originalPrice && originalPrice !== salePrice || true && (
                                                            <span className="original_price">₹{originalPrice}</span>
                                                        )}
                                                    </div>
                                                    {!discountPercentage > 0 && (
                                                        <div className="savings_text">
                                                            You save ₹{(originalPrice - salePrice).toFixed(2)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="footer_card_section">
                                                <Button onClick={() => addProduct(item?.id)} className="w-100">
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductCard;
