import React from 'react'
import { Carousel } from "react-bootstrap";
import './Sweeper.css'
import Sweeper1 from '../../../assets/sweeper1.jpg'
import Sweeper2 from "../../../assets/sweeper2.jpg";
import Sweeper3 from "../../../assets/sweeper3.jpg";


const Sweeper = () => {
  const img = Sweeper2;

  const img3 =Sweeper3;
  return (
    <>
      <Carousel
        fade
        interval={3000}
        indicators={true}
        controls={true}
        className="sweeper mb-5 py-0 mt-0"
      >
        {[img, Sweeper1, img3]?.map((imgItems, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100 slider-img"
              src={imgItems}
              alt="First slide"
              style={{ height: "50vh" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default Sweeper