import React from "react";
import "./Parchase.css"; // custom styling
import { useNavigate } from "react-router-dom";
import ParchaseContent from "../Purchase/ParchaseContent"; 
import { CiStar } from "react-icons/ci";

const Parchase = () => {
  
   const navigate = useNavigate();

   const redirectParchaseDetailsPage = (id) => {
     navigate(`Parchase-Details#${id}`);
   };

  return (
    <div className="container mt-4 mb-5">
      <h1 className="text-center mb-4">OUR PRODUCTS</h1>
      <div className="row g-4">
        {ParchaseContent.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3">
            <div className="card custom-card h-100 ">
              <img
                className="card-img-top"
                src={item.image} // fixed key
                alt={item.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text fw-bold text-success">
                  {item.text}
                 <CiStar />
                </p>
                <button
                  onClick={() => redirectParchaseDetailsPage(item.id)}
                  className="btn btn-primary btn-sm mt-auto custom-btn"
                >
                  See Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parchase;
