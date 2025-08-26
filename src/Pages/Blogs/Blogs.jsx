import React from "react";
import "./Blogs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import blog1 from "../../assets/mission.jpg";
import { IoPersonSharp } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";

const Blogs = () => {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Blogs</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={blog1}
              className="card-img-top"
              alt="Blog 1"
              height={180}
            />
            <div className="card-body">
              <h5 className="card-title">Size Of Pad</h5>
              <p className="text-muted small mb-2">
                <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
                <RiMenu2Fill /> Blog · No Comments
              </p>
              <p className="card-text">
                It is a long established fact that a reader will be distracted
                by the content...
              </p>
              <a href="#" className="card-link">
                Read More
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={blog1}
              className="card-img-top"
              alt="Blog 2"
              height={180}
            />
            <div className="card-body">
              <h5 className="card-title">Types Of Pads</h5>
              <p className="text-muted small mb-2">
                <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
                <RiMenu2Fill /> Blog · No Comments
              </p>
              <p className="card-text">
                Types of Pads – It is a long established fact that a reader will
                be distracted...
              </p>
              <a href="#" className="card-link">
                Read More
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={blog1}
              className="card-img-top"
              alt="Blog 2"
              height={180}
            />
            <div className="card-body">
              <h5 className="card-title">Types Of Pads</h5>
              <p className="text-muted small mb-2">
                <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
                <RiMenu2Fill /> Blog · No Comments
              </p>
              <p className="card-text">
                Types of Pads – It is a long established fact that a reader will
                be distracted...
              </p>
              <a href="#" className="card-link">
                Read More
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={blog1}
              className="card-img-top"
              alt="Blog 2"
              height={180}
            />
            <div className="card-body">
              <h5 className="card-title">Types Of Pads</h5>
              <p className="text-muted small mb-2">
                <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
                <RiMenu2Fill /> Blog · No Comments
              </p>
              <p className="card-text">
                Types of Pads – It is a long established fact that a reader will
                be distracted...
              </p>
              <a href="#" className="card-link">
                Read More
              </a>
            </div>
          </div>
        </div>

      

        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={blog1}
              className="card-img-top"
              alt="Blog 2"
              height={180}
            />
            <div className="card-body">
              <h5 className="card-title">Types Of Pads</h5>
              <p className="text-muted small mb-2">
                <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
                <RiMenu2Fill /> Blog · No Comments
              </p>
              <p className="card-text">
                Types of Pads – It is a long established fact that a reader will
                be distracted...
              </p>
              <a href="#" className="card-link">
                Read More
              </a>
            </div>
          </div>
        </div>

      
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={blog1}
              className="card-img-top"
              alt="Blog 3"
              height={180}
            />
            <div className="card-body">
              <h5 className="card-title">Another Blog</h5>
              <p className="text-muted small mb-2">
                <IoPersonSharp /> netkoshweb · September 2, 2023 · <br />
                <RiMenu2Fill /> Blog · No Comments
              </p>
              <p className="card-text">
                Another sample text for the blog card content goes here...
              </p>
              <a href="#" className="card-link">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
