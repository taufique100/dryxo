import React, { useMemo } from "react";
import "./Order.css";
import { useSelector, useDispatch } from "react-redux";
import sanitaryProducts from "../Products/sanitaryProducts";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {updateQuantity, removeFromCart,} from "../../Store/OrderSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.orderSlice);
  const navigate = useNavigate();

  const items = cart
    .map((c) => ({ ...c, product: sanitaryProducts.find((s) => s.id === c.id) }))
    .filter((i) => i.product);

  const subtotal = useMemo(() => {
    return items.reduce((acc, it) => acc + Number(it.product.price) * it.quantity, 0);
  }, [items]);



  const handleIncrease = (id) => dispatch(updateQuantity({ id, quantity: cart.find(c=>c.id===id).quantity + 1 }));
  const handleDecrease = (id) => {
    const current = cart.find(c=>c.id===id);
    if (!current) return;
    const newQty = current.quantity - 1;
    if (newQty <= 0) dispatch(removeFromCart(id));
    else dispatch(updateQuantity({ id, quantity: newQty }));
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3">Your Cart</h3>

      {items.length === 0 && (
        <Card className="p-4">
          <p className="mb-0">Your cart is empty. Browse products to add items.</p>
        </Card>
      )}

      {items.map((it) => (
        <Card key={it.id} className="order-item-card p-3 mb-3">
          <div className="left">
            <img src={it.product.image || "https://placehold.co/96x96"} alt={it.product.title} />
            <div className="meta">
              <h6>{it.product.title}</h6>
              <p>Size: {it.product.size}</p>
              <p>Unit: ₹ {Number(it.product.price).toFixed(2)}</p>
            </div>
          </div>

          <div className="actions">
            <div className="d-flex align-items-center gap-2">
              <Button variant="outline-secondary" size="sm" onClick={() => handleDecrease(it.id)}>-</Button>
              <span className="fw-bold">{it.quantity}</span>
              <Button variant="outline-secondary" size="sm" onClick={() => handleIncrease(it.id)}>+</Button>
            </div>

            <div className="item-total">
              <div className="label">Item total</div>
              <div className="price">₹ {(Number(it.product.price) * it.quantity).toFixed(2)}</div>
              <div>
                <Button variant="link" className="text-danger p-0 mt-1" onClick={() => dispatch(removeFromCart(it.id))}>Remove</Button>
              </div>
            </div>
          </div>
        </Card>
      ))}


      <div className="d-flex justify-content-end mt-4">
        <div>
          <div className="cart-summary">
            <div className="d-flex justify-content-between align-items-end">
              <div>
                <div style={{fontSize:16, color:'#666'}}>Subtotal</div>
                <div style={{fontSize:12, color:'#28a745'}}>Discount (10%)</div>
                <hr style={{margin:'8px 0'}}/>
                <div style={{fontSize:18}}>Total</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:18, fontWeight:700}}>₹ {subtotal.toFixed(2)}</div>
                <div style={{fontSize:14, color:'#28a745'}}>- ₹ {(subtotal * 0.1).toFixed(2)}</div>
                <hr style={{margin:'8px 0'}}/>
                <div style={{fontSize:20, fontWeight:800}}>₹ {(subtotal * 0.9).toFixed(2)}</div>
              </div>
            </div>
            <div className="actions">
              <Button className="flex-grow-1" onClick={() => navigate('/order/details')} disabled={items.length===0}>
                Proceed to Checkout
              </Button>
              <Button variant="warning" onClick={() => navigate('/order/details')} disabled={items.length===0}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;