import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './OrderLayout.css';

function Step({ to, label }){
  const loc = useLocation();
  const active = loc.pathname.includes(to);
  return (
    <div className={`order-step ${active ? 'active' : ''}`}>
      <NavLink to={to} className="step-link">{label}</NavLink>
    </div>
  );
}

export default function OrderLayout(){
  return (
    <div className="order-layout container my-4">
      <div className="order-steps d-flex gap-3 mb-4">
        <Step to="/order/details" label="Review" />
        <Step to="/order/address" label="Address" />
        <Step to="/order/payment" label="Payment" />
      </div>

      <Outlet />
    </div>
  )
}
