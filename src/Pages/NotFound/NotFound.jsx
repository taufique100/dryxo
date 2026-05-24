import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1>404</h1>
        <p>Page not found.</p>
        <span>The page you're looking for does not exist.</span>
        <Link to="/home" className="notfound-button">
          Go back home
        </Link>
      </div>
    </div>
  );
}
