import React from "react";
import { Carousel } from "react-bootstrap";
import "./Slider.css";



const Slider = () => {
  return (
    <div className="slider-container">
      <Carousel interval={3000} indicators={true} controls={true}>
        {/* Slide 1 */}
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <img className="slider-img" src="" alt="Slide 1" />
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <img className="slider-img" src="" alt="Slide 2" />
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <img className="slider-img" src="" alt="Slide 3" />
          </div>
        </Carousel.Item>

        {/* Slide 4 */}
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <img className="slider-img" src="" alt="Slide 4" />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
