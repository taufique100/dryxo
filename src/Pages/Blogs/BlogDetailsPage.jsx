import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { blogContent } from "./BlogContent.js";
import { FaArrowLeft } from "react-icons/fa";
import "./BlogDetailsPage.css";

export const BlogDetailsPage = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const id   = location.hash.replace("#", "");
      const blog = blogContent.find((b) => String(b.id) === id);
      setBlogData(blog);
    }
  }, [location]);

  if (!blogData) {
    return (
      <div className="blog-fullscreen" style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
        <p style={{ color:"#555", fontSize:"1rem" }}>Blog not found...</p>
      </div>
    );
  }

  return (
    <div className="blog-fullscreen">

      {/* Back */}
      <div className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft size={13} />
        <span>Back to Blogs</span>
      </div>

      {/* Banner */}
      <div className="blog-banner">
        <img src={blogData.image} alt={blogData.title} />
      </div>

      {/* Article */}
      <div className="blog-article">
        <div className="blog-meta">
          <span className="category">{blogData.category}</span>
          <span className="date">{blogData.date}</span>
        </div>

        <h1 className="blog-title">{blogData.title}</h1>
        <p className="blog-description">{blogData.description}</p>

        <div
          className="blog-body"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        />
      </div>

    </div>
  );
};
