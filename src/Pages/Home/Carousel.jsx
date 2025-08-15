import React from "react";
import Carousel  from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

export default function ImageCarousel() {
  return (
    <div>
      <ResponsiveCarousel>
        <div>
          <img src="https://placehold.co/600x400" alt="Slide 1" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src="https://placehold.co/600x400" alt="Slide 2" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src="https://placehold.co/600x400" alt="Slide 3" />
          <p className="legend">Legend 3</p>
        </div>
      </ResponsiveCarousel>
    </div>
  );
}
