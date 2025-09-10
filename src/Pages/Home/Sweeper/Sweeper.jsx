import React from 'react'
import { Carousel } from "react-bootstrap";
import './Sweeper.css'
import Sweeper1 from '../../../assets/Sweeper1.jpg'
import Sweeper3 from "../../../assets/Sweeper3.jpg";
import Sweeper2 from "../../../assets/Sweeper2.jpg";

const Sweeper = () => {
  return (
    <>
      <Carousel fade interval={3000} indicators={true} controls={true} className='mb-5 '>
        {/* Slide 1 */}
        <Carousel.Item>
          <img
            className="d-block w-100 slider-img"
            src={Sweeper2}
            alt="First slide"
          />
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <img
            className="d-block w-100 slider-img"
            src={Sweeper1}
            alt="Second slide"
          />
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <img
            className="d-block w-100 slider-img"
            src={Sweeper3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Sweeper