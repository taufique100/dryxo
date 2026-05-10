import React from "react";
import { motion } from "framer-motion";
import { IoPersonSharp } from "react-icons/io5";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { blogContent } from "./BlogContent.js";
import "../../Pages/theme.css";
import "./Blogs.css";

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <div className="pg-root">

      {/* ── HERO ── */}
      <div className="pg-hero">
        <div className="pg-hero-inner">
          <span className="pg-tag">Insights &amp; Stories</span>
          <h1>Latest <span>Blogs</span></h1>
          <p>Stay informed with the latest in menstrual health, wellness, and Dryxo's journey.</p>
        </div>
      </div>

      {/* ── BLOG GRID ── */}
      <section className="pg-section">
        <div className="container">
          <div className="row g-4">
            {blogContent.map((blog, i) => (
              <motion.div
                key={blog.id}
                className="col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="pg-blog-card">
                  <div className="pg-blog-img">
                    <img src={blog.image} alt={blog.title} />
                  </div>
                  <div className="pg-blog-body">
                    <div className="pg-blog-cat">
                      <IoPersonSharp style={{marginRight:4}}/>{blog.category} · {blog.date}
                    </div>
                    <h5 className="pg-blog-title">{blog.title}</h5>
                    <p className="pg-blog-desc">{blog.description}</p>
                    <div className="pg-blog-footer">
                      <div className="pg-blog-meta">
                        <span><FaRegHeart /> 25</span>
                        <span><FaRegCommentDots /> 8</span>
                      </div>
                      <button
                        className="pg-btn-ghost bl-read-btn"
                        onClick={() => navigate(`blog-details#${blog.id}`)}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blogs;
