import React from "react";
import './ProductCard.css';
import { Button } from "react-bootstrap";
import ViewAddedProductBtn from "../../Order/ViewAddedProductBtn";
import { useDispatch } from "react-redux";
import { setSelectedProductId } from "../../../Store/OrderSlice";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCard = ({ productList = [] }) => {
    const dispatch = useDispatch();

    const addProduct = (id) => {
        dispatch(setSelectedProductId(id));
    }

    return (
        <>
            <ViewAddedProductBtn />
            <div className="container">
                {productList.length === 0 ? (
                    <div className="text-center py-5">
                        <p style={{ fontSize: '1.2rem', color: '#718096' }}>No products available at the moment</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {productList.map((item, idx) => (
                            <div key={item?.id || idx} className="col-12 col-sm-6 col-lg-4 col-xl-4">
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
                                    </div>
                                    <div className="content_section px-3 py-2 d-flex flex-column justify-content-between">
                                        <div>
                                            <h1>{item?.title || 'Product Name'}</h1>
                                            {(item?.size || item?.category) && (
                                                <div className="feature_box d-flex align-items-center justify-content-start gap-2 flex-wrap mb-2">
                                                    {item?.size && <span>{item.size}</span>}
                                                    {item?.category && <span>{item.category}</span>}
                                                </div>
                                            )}
                                            {item?.description && (
                                                <p className="mb-2">{item.description}</p>
                                            )}

                                            {item?.features && item.features.length > 0 && (
                                                <ul className="feature_list mb-3">
                                                    {item.features.map((feat, i) => (
                                                        <li key={i}>{feat}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div className="footer_card_section d-flex align-items-center justify-content-between">
                                            <div className="price_sec">
                                                <p className="mb-0 text-start">Price</p>
                                                <p className="mb-0">₹{item?.price || '0'}</p>
                                            </div>
                                            <Button onClick={() => addProduct(item?.id)}>
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductCard;
