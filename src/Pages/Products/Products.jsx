import React, { useEffect, useState } from 'react'
import "./Products.css";
import ProductCard from './Purchase/ProductCard';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import { apiUrls } from '../../Utils/apiUrls';

const Products = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    setLoading(true);
    await axiosInstance.get(apiUrls.getAllUserProducts)
      .then((res) => setProduct(res?.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => { getAllProducts(); }, [])

  return (
    <div className="products-page">

      {/* ── HERO BANNER ── */}
      <div className="products-hero-banner">
        <div className="products-hero-inner">
          <span className="products-hero-tag">Premium Collection</span>
          <h1>Our <span>Products</span></h1>
          <p>Experience comfort, protection and confidence — engineered for every woman, every day.</p>
        </div>
      </div>

      {/* ── PRODUCTS GRID ── */}
      <div className="products-section">
        <div className="section-header">
          <h2>🛒 <span>Place Your Order</span></h2>
          <p>Choose from our range of premium biodegradable sanitary pads</p>
        </div>

        {loading ? (
          <div className="loading-state">Loading products...</div>
        ) : (
          <ProductCard productList={product} />
        )}
      </div>

      {/* ── FEATURES ── */}
      <motion.div
        className="features-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Why Choose Dryxo?</h2>
        <p className="features-section-sub">Every pad is built with science, care and your comfort in mind.</p>
        <div className="features-grid">
          {[
            { icon: "💧", title: "Superior Absorption", desc: "Double perforated top sheet for instant dryness and quick absorption." },
            { icon: "🌸", title: "Fresh Fragrance", desc: "Botanical fragrance locks odor and keeps you confident all day." },
            { icon: "🛡️", title: "Rash Protection", desc: "Feather-soft edge arms prevent irritation and rashes completely." },
            { icon: "✨", title: "Even Flow", desc: "Superlative emboss design ensures even distribution and leak-proof protection." },
          ].map((f, i) => (
            <div className="feature-item" key={i}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

export default Products;
