import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "./ImageSlider.css";
import img1 from "../../assets/st-1.jpg";
import img2 from "../../assets/st-2.jpg";
import img3 from "../../assets/st-3.jpg";
import img4 from "../../assets/st-4.jpg";
import img5 from "../../assets/st-5.jpg";
import img6 from "../../assets/ws-1.jpg";
import img7 from "../../assets/ws-2.jpg";
import img8 from "../../assets/ws-3.jpg";
import img9 from "../../assets/ws-4.jpg";
import img10 from "../../assets/ws-5.jpg";
import img11 from "../../assets/ws-6.jpg";
import img12 from "../../assets/ws-7.jpg";
import img13 from "../../assets/ws-8.jpg";

const images = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,];

const ImageSlider = () => {
 const [itemsPerSlide, setItemsPerSlide] = useState(3);

  
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 576) {
        setItemsPerSlide(1); 
      } else if (window.innerWidth < 992) {
        setItemsPerSlide(2); 
      } else {
        setItemsPerSlide(3); 
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);

    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  
  const groupedImages = [];
  for (let i = 0; i < images.length; i += itemsPerSlide) {
    groupedImages.push(images.slice(i, i + itemsPerSlide));
  }

  return (
    <div className="container py-2 ">
      <Carousel indicators={true} controls={true} interval={3000} className="mt-1" >
        {groupedImages.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center">
              {group.map((img, i) => (
                <div key={i} className="mx-2 slider-img">
                  <img
                    src={img}
                    alt={`Slide ${i}`}
                    className="d-block w-100 rounded shadow"
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
