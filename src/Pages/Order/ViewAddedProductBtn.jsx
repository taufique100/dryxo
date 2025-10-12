// import React, { useEffect, useState } from 'react'
// import { Button } from 'react-bootstrap'
// import './OrderModal.css'
// import { useSelector } from 'react-redux'
// import { errorNotify, successNotify } from '../../Utils/toastNotify';

// function ViewAddedProductBtn() {
//     const [selectedProduct, setSelectProduct] = useState([]);

//     const {selectedProductId} = useSelector(state=>state.orderSlice);
//     console.log('selectedProductId::', selectedProductId);

//     const inserId = ()=>{
//         if(!selectedProduct?.includes(selectedProductId)){
//             setSelectProduct(prev=>([...prev, selectedProductId]));
//             successNotify('Product added successfully !');
//             return;
//         }
//         errorNotify('Product already added !')
//     }

//     useEffect(()=>{
//         inserId()
//     },[selectedProductId])

//     return (
//         <>
//             <div className="add_card_btn">
//                 <Button className='d-flex align-items-center gap-2 '>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
//                         <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
//                     </svg>
//                     <span class="position-absolute translate-middle badge rounded-pill">
//                         9
//                         <span class="visually-hidden">unread messages</span>
//                     </span>
//                 </Button>
//                 {/* <span className='order_item'>1 Item added</span> */}
//             </div>
//         </>
//     )
// }

// export default ViewAddedProductBtn


import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./OrderModal.css";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../../Utils/toastNotify";
import { setOpenModal } from "../../Store/OrderSlice";
import OrderModal from "./OrderModal";

function ViewAddedProductBtn() {
    const dispatch = useDispatch()
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [animateWidth, setAnimateWidth] = useState(false);

    const { selectedProductId } = useSelector((state) => state.orderSlice);

    useEffect(() => {
        if (!selectedProductId) return;

        if (!selectedProducts.includes(selectedProductId)) {
            setSelectedProducts((prev) => [...prev, selectedProductId]);
            successNotify("Product added successfully!");
            showTemporaryMessage();
        } else {
            errorNotify("Product already added!");
        }
    }, [selectedProductId]);

    const showTemporaryMessage = () => {
        const count = selectedProducts.length + 1;
        setMessageText(`${count} item${count > 1 ? "s" : ""} added`);
        setShowMessage(true);
        setAnimateWidth(true);

        setTimeout(() => {
            setShowMessage(false);
            setAnimateWidth(false);
        }, 2000);
    };

    const handleModalOpen = () => {
        dispatch(setOpenModal(true))
    }

    return (
        <>
            <OrderModal />
            <div onClick={handleModalOpen} className={`add_card_btn ${animateWidth ? "expand" : ""}`}>
                <Button onClick={handleModalOpen} className="d-flex align-items-center gap-2 position-relative">
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

                    {selectedProducts.length > 0 && (
                        <span key={selectedProducts.length} className="badge_count animate-badge">
                            {selectedProducts.length}
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
