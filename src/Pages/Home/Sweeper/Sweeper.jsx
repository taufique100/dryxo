import React from 'react'
import { Carousel } from "react-bootstrap";
import './Sweeper.css'
import Sweeper1 from '../../../assets/sweeper1.jpg'

const Sweeper = () => {
  const img = "https://dryxo.in/wp-content/uploads/2023/10/orange_banner-1.webp";

  const img3 ="https://dryxo.in/wp-content/uploads/2023/10/watch_banner_dryxo.gif";
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