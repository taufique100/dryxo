import React from "react";
import './ProductCard.css';
import productImg from '../../../assets/product-4.png';
import { Button } from "react-bootstrap";
import ViewAddedProductBtn from "../../Order/ViewAddedProductBtn";
import { useDispatch } from "react-redux";
import { setSelectedProductId } from "../../../Store/OrderSlice";

const ProductCard = ({ productList = [] }) => {
    const dispatch = useDispatch();

    const addProduct=(id)=>{
        dispatch(setSelectedProductId(id))
    }
    return (
        <>
            <ViewAddedProductBtn />
            <div className="container d-flex align-items-stretch justify-content-start gap-3 flex-wrap">
                {
                    productList?.map((item, idx) => (
                        <div key={idx} className="pro_card">
                            <div className="img_section">
                                <img src={productImg} alt={item?.title} />
                            </div>
                            <div className="content_section px-3 py-2 d-flex flex-column justify-content-between">
                                <div>
                                    <h1>{item?.title}</h1>
                                    <div className="feature_box d-flex align-items-center justify-content-start gap-2 flex-wrap mb-2">
                                        <span>{item?.size}</span>
                                        <span>{item?.type}</span>
                                    </div>
                                    <p className="mb-2">{item?.description}</p>

                                    {/* Features List */}
                                    <ul className="feature_list mb-3">
                                        {item?.features?.map((feat, i) => (
                                            <li key={i}>{feat}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="footer_card_section d-flex align-items-center justify-content-between">
                                    <div className="price_sec">
                                        <p className="mb-0 text-start">Price</p>
                                        <p className="mb-0">₹{item?.price}</p>
                                    </div>
                                    <Button onClick={()=>addProduct(idx+1)}>Add to Cart</Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ProductCard;
