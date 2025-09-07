import React, { useState } from "react";
import "./Media.css";
import st1 from "../../assets/st-1.jpg";
import st2 from "../../assets/st-2.jpg";
import st3 from "../../assets/st-3.jpg";
import st4 from "../../assets/st-4.jpg";
import st5 from "../../assets/st-5.jpg";

import sw1 from "../../assets/ws-1.jpg";
import sw2 from "../../assets/ws-2.jpg";
import sw3 from "../../assets/ws-3.jpg";
import sw4 from "../../assets/ws-4.jpg";
import sw5 from "../../assets/ws-5.jpg";
import sw6 from "../../assets/ws-6.jpg";
import sw7 from "../../assets/ws-7.jpg";
import sw8 from "../../assets/ws-8.jpg";


const categories = ["All", "School Students", "Social Work"];

const galleryItems = [
  { id: 1, category: "School Students", src: st1 },
  { id: 2, category: "School Students", src: st2 },
  { id: 3, category: "School Students", src: st3 },
  { id: 4, category: "School Students", src: st4 },
  { id: 5, category: "School Students", src: st5 },
  { id: 6, category: "Social Work", src: sw1 },
  { id: 7, category: "Social Work", src: sw2 },
  { id: 8, category: "Social Work", src: sw3 },
  { id: 9, category: "Social Work", src: sw4 },
  { id: 10, category: "Social Work", src: sw5 },
  { id: 11, category: "Social Work", src: sw6 },
  { id: 12, category: "Social Work", src: sw7 },
  { id: 13, category: "Social Work", src: sw8 },
 
];

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

      <div className="d-flex align-items-center justify-content-center mb-4 position-relative">
        <hr className="flex-grow-1 custom-line" />
        <span className="gradient-box mx-3 b">Media Gallery</span>
        
      </div>

      <div className="d-flex justify-content-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn mx-2 ${
              activeCategory === cat ? "btn-orangered" : "btn-outline-orangered"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row">
        {filteredItems.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card border-0 shadow-sm">
              <img
                src={item.src}
                alt={`Gallery ${item.id}`}
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
