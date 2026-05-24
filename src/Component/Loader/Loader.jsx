import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="global-loader-overlay">
      <div className="global-loader-card">
        <div className="global-loader-spinner" />
        <div className="global-loader-text">Loading...</div>
      </div>
    </div>
  );
}
