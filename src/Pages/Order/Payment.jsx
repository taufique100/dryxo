import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import sanitaryProducts from "../Products/sanitaryProducts";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../Store/OrderSlice";
import { successNotify } from "../../Utils/toastNotify";
import "./Order.css";

export default function Payment(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.orderSlice);

  const items = cart.map(c=>({ ...c, product: sanitaryProducts.find(s=>s.id===c.id)})).filter(i=>i.product);
  const subtotal = useMemo(()=> items.reduce((acc,it)=> acc + Number(it.product.price)*it.quantity,0), [items]);

  const [method, setMethod] = useState('cod');
  const [card, setCard] = useState({ number:'', name:'', expiry:'', cvv:'' });

  const selectedAddress = (()=>{ try{ return JSON.parse(window.localStorage.getItem('dryxo_selected_address')); }catch(e){return null;} })();

  const placeOrder = ()=>{
    if(!selectedAddress){ alert('Please select address'); navigate('/checkout/address'); return; }
   
    const order = {
      id: 'ORD'+Date.now(),
      date: new Date().toISOString(),
      address: selectedAddress,
      items: items.map(it=>({ id: it.id, title: it.product.title, qty: it.quantity, price: Number(it.product.price) })),
      subtotal,
      discount: subtotal*0.1,
      total: subtotal*0.9,
      status: 'Processing',
      paymentMethod: method,
    };

   
    try{
      const key = 'dryxo_orders';
      const existing = JSON.parse(window.localStorage.getItem(key) || '[]');
      existing.unshift(order);
      window.localStorage.setItem(key, JSON.stringify(existing));
    }catch(e){console.error(e)}

    dispatch(clearCart());
    successNotify('Order placed successfully');
    navigate('/my-order');
  };

  return (
    <div className="container my-4">
      <h3>Payment</h3>
      <div className="row">
        <div className="col-md-7">
          <Card className="p-3 mb-3">
            <h5>Choose Payment Method</h5>
            <Form>
              <Form.Check type="radio" label="Cash on Delivery" name="pm" id="pm_cod" checked={method==='cod'} onChange={()=>setMethod('cod')} />
              <Form.Check type="radio" label="UPI" name="pm" id="pm_upi" checked={method==='upi'} onChange={()=>setMethod('upi')} />
              <Form.Check type="radio" label="Card (Debit/Credit)" name="pm" id="pm_card" checked={method==='card'} onChange={()=>setMethod('card')} />

              {method==='card' && (
                <div className="mt-3">
                  <Form.Group className="mb-2"><Form.Label>Card Number</Form.Label><Form.Control value={card.number} onChange={(e)=>setCard({...card, number:e.target.value})} /></Form.Group>
                  <Form.Group className="mb-2"><Form.Label>Name on Card</Form.Label><Form.Control value={card.name} onChange={(e)=>setCard({...card, name:e.target.value})} /></Form.Group>
                  <div className="d-flex gap-2">
                    <Form.Group className="mb-2 flex-grow-1"><Form.Label>Expiry</Form.Label><Form.Control value={card.expiry} onChange={(e)=>setCard({...card, expiry:e.target.value})} /></Form.Group>
                    <Form.Group className="mb-2" style={{width:120}}><Form.Label>CVV</Form.Label><Form.Control value={card.cvv} onChange={(e)=>setCard({...card, cvv:e.target.value})} /></Form.Group>
                  </div>
                </div>
              )}
            </Form>
          </Card>
        </div>

        <div className="col-md-5">
          <div className="cart-summary">
            <h5>Order Summary</h5>
            <div className="summary-row"><div className="muted">Price ({items.length} items)</div><div>₹ {subtotal.toFixed(2)}</div></div>
            <div className="summary-row"><div className="muted">Discount (10%)</div><div className="text-success">- ₹ {(subtotal*0.1).toFixed(2)}</div></div>
            <hr />
            <div className="total">₹ {(subtotal*0.9).toFixed(2)}</div>
            <div className="actions"><Button className="w-100 mt-2" onClick={placeOrder} disabled={items.length===0}>Place Order</Button></div>
          </div>
        </div>
      </div>
    </div>
  )
}
