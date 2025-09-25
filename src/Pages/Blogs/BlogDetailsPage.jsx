
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { blogContent } from "./BlogContent.js";
import "./BlogDetailsPage.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export const BlogDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const blog = blogContent.find((b) => String(b.id) === id);
      setBlogData(blog);
    }
  }, [location]);

  if (!blogData) {
    return <p className="text-center mt-4">Blog not found...</p>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="blog-fullscreen py-5 pt-5">
      
      {/* Back Button */}
      <div className="back-button" onClick={handleBack}>
        <FaArrowAltCircleLeft size={28} />
        <span>Back</span>
      </div>

      {/* Banner */}
      <div className="blog-banner">
        <img src={blogData.image} alt="blog" />
      </div>

      {/* Content */}
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
