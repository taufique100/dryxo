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
      .then((res) => {
        setProduct(res?.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <div className="products-page">
      {/* Hero Section */}
      {/* <motion.div 
        className="products-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Premium Sanitary Pads
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience comfort and protection with Dryxo
          </motion.p>
        </div>
      </motion.div> */}

      {/* Products Section */}
      <div className="products-section pt-5">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>🛒 Place Your Order</h2>
          <p>Choose from our range of premium products</p>
        </motion.div>

        {loading ? (
          <div className="loading-state">Loading products...</div>
        ) : (
          <ProductCard productList={product} />
        )}
      </div>

      {/* Features Section */}
      <motion.div 
        className="features-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Why Choose Dryxo?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">💧</div>
            <h3>Superior Absorption</h3>
            <p>Double perforated top sheet for quick absorption</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🌸</div>
            <h3>Fresh Fragrance</h3>
            <p>Locks bad odour to keep you fresh all day</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <h3>Rash Protection</h3>
            <p>Soft-edge arms prevent and control rashes</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✨</div>
            <h3>Even Flow</h3>
            <p>Superlative emboss design ensures even distribution</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Products