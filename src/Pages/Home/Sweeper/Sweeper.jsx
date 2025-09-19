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
        {
          [Sweeper2, Sweeper1, Sweeper3]?.map((imgItems, idx) => (

            <Carousel.Item key={idx}>
              <img
                className="d-block w-100 slider-img"
                src={imgItems}
                alt="First slide"
              />
            </Carousel.Item>
          ))
        }

      </Carousel>
    </>
  );
}

export default Sweeper