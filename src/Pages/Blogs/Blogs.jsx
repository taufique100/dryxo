
import React from "react";
import "./Blogs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoPersonSharp } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { blogContent } from "./BlogContent.js";

const Blogs = () => {
  const navigate = useNavigate();

  const redirectBlogDetailsPage = (id) => {
    navigate(`blog-details#${id}`);
  };

  return (
    <div className="container my-1">
      <h1 className="text-center mb-4">Latest Blogs</h1>
      <div className="row">
        {blogContent.map((blog) => (
          <div key={blog.id} className="col-md-4 mb-4">
            <div className="card blog-card h-100">
              {/* Blog Image */}
              <div className="blog-img-wrapper">
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt={blog.title}
                />
              </div>

              {/* Card Content */}
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{blog.title}</h5>
                  {/* Meta Info */}
                  <p className="text-muted small mb-2">
                    <IoPersonSharp /> {blog.category} · {blog.date} <br />
                    <RiMenu2Fill /> Blog
                  </p>

                  <p className="card-text">{blog.description}</p>
                </div>

                {/* Like & Comment */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex gap-3 blog-actions">
                    <span className="like-btn">
                      <FaRegHeart /> 25
                    </span>
                    <span className="comment-btn">
                      <FaRegCommentDots /> 8
                    </span>
                  </div>
                 <button
                    onClick={() => redirectBlogDetailsPage(blog.id)}
                    className="btn btn-sm read-more-btn" >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
