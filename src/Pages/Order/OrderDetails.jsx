import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import sanitaryProducts from "../Products/sanitaryProducts";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateQuantity, removeFromCart } from "../../Store/OrderSlice";
import "./Order.css";

export default function OrderDetails(){
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.orderSlice);
  const dispatch = useDispatch();

  const items = cart.map(c=>({ ...c, product: sanitaryProducts.find(s=>s.id===c.id)})).filter(i=>i.product);

  const subtotal = useMemo(()=> items.reduce((acc,it)=> acc + Number(it.product.price)*it.quantity,0), [items]);

  return (
    <div className="container my-5">
      <h3>Order Details</h3>

      <div className="row">
        <div className="col-md-8">
          {items.length===0 && <Card className="p-3 mb-3">Your cart is empty.</Card>}
          {items.map(it=> (
            <Card key={it.id} className="order-item-card mb-3">
              <div className="left">
                <img src={it.product.image || 'https://placehold.co/96x96'} alt={it.product.title} />
                <div className="meta">
                  <h6>{it.product.title}</h6>
                  <p>Size: {it.product.size}</p>
                  <p className="muted">Unit: ₹ {Number(it.product.price).toFixed(2)}</p>
                </div>
              </div>
              <div className="actions">
                <div className="d-flex align-items-center gap-2">
                  <Button size="sm" variant="outline-secondary" onClick={()=>{
                    const newQty = it.quantity - 1;
                    if(newQty<=0) dispatch(removeFromCart(it.id)); else dispatch(updateQuantity({ id: it.id, quantity: newQty }));
                  }}>-</Button>
                  <span>{it.quantity}</span>
                  <Button size="sm" variant="outline-secondary" onClick={()=>dispatch(updateQuantity({ id: it.id, quantity: it.quantity+1 }))}>+</Button>
                </div>

                <div className="item-total">
                  <div className="label">Item total</div>
                  <div className="price">₹ {(Number(it.product.price)*it.quantity).toFixed(2)}</div>
                  <div><Button variant="link" className="text-danger p-0 mt-1" onClick={()=>dispatch(removeFromCart(it.id))}>Remove</Button></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="col-md-4">
          <div className="cart-summary">
            <h5>Summary</h5>
            <div className="summary-row"><div className="muted">Subtotal</div><div>₹ {subtotal.toFixed(2)}</div></div>
            <div className="summary-row"><div className="muted">Discount (10%)</div><div className="text-success">- ₹ {(subtotal*0.1).toFixed(2)}</div></div>
            <hr />
            <div className="total">₹ {(subtotal*0.9).toFixed(2)}</div>
            <div className="actions"><Button className="w-100" onClick={()=> navigate('/order/address')} disabled={items.length===0}>Continue to Address</Button></div>
          </div>
        </div>
      </div>
    </div>
  )
}
