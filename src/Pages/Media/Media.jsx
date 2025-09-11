import React, { useState } from "react";
import "./Media.css";
import st1 from "../../assets/st-1.jpg";
import galleryItems from "./galleryItems";

const btnList = ["All", "School Students", "Social Work"];

const Media = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="container py-5">
      {/* Media Highlights Section */}
      <div className="text-center mb-4">
        <h1 className="title">MEDIA HIGHLIGHTS</h1>
        <div className="divider">
          -------------------------------------------
        </div>
      </div>

      <div className="content row align-items-start">
        <div className="col-md-6 mb-4 mb-md-0 text-center">
          <img
            src={st1}
            alt="Dryxo Media"
            className="img-fluid rounded shadow"
            height={300}
          />
        </div>

        <div className="col-md-6">
          <p className="mt-4">
            At Dryxo, we believe that every woman deserves access to safe and
            dignified menstrual care. In a heartfelt effort to support
            underserved communities, we have distributed Dryxo sanitary pads to
            schools, remote villages, and urban slums. Our mission is to reach
            women and girls who often face challenges in accessing quality
            menstrual products, ensuring they can manage their cycles with
            comfort and confidence.
          </p>
          <p>
            To spread awareness and encourage healthier menstrual practices, we
            have also been providing free samples of Dryxo sanitary pads. By
            allowing women to experience the comfort and reliability of our
            products, we aim to foster a positive change in menstrual health.
            Partnering with local community leaders, we are dedicated to
            empowering women to embrace safe, eco-friendly alternatives. Dryxo
            stands with every woman, striving to make a lasting impact by
            providing the care and support they truly deserve.
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center mb-4 mt-5 position-relative">
        <hr className="flex-grow-1 custom-line" />
        <span className="gradient-box mx-3 b">Media Gallery</span>
      </div>

      <div className="d-flex justify-content-center mb-4">
        {btnList.map((monu, idx) => (
          <button
            key={monu}
            className={`btn mx-2 ${idx === 0 && "px-4"} ${
              activeCategory === monu
                ? "btn-orangered"
                : "btn-outline-orangered"
            }`}
            onClick={() => setActiveCategory(monu)}
          >
            {monu}
          </button>
        ))}
      </div>

      <div className="row">
        {filteredItems.map((item, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card border-0 shadow-sm">
              <img
                src={item?.src}
                alt={`Gallery ${item?.id}`}
                className="card-img-top rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;
