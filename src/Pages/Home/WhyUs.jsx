import React from "react";
import "./WhyUs.css";
import pad1 from "../../assets/pad1.jpg";
import pad2 from "../../assets/padmul.jpg";
// import Button from "../../Component/Form/Button";
import { useNavigate } from "react-router-dom";
import Safety from "./Safety/Safety";

const WhyUs = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("clicked...!");
    navigate("/about", { state: { data: [1, 2, 34, 5] } });
  };
  return (
    <section className="container py-5 whyus-section w-100 mt-5 ">
      <div className="row align-items-center">
        {/* Left Side - Images */}
        <div className="col-md-6 text-center">
          <div className="row">
            <div className="col-6 mb-3">
              <img
                src={pad2}
                alt="Sanitary Pad"
                className="img-fluid shadow-sm rounded"
              />
              <div className="name mt-20">
                <h2 className="dryxo"> DRYXO</h2>
                <h3 className="dryxo">
                  <span>Sanitary Pad</span>
                </h3>
              </div>
            </div>

            <div className="col-6 mb-3">
              <img
                src={pad1}
                alt="Sanitary Pad"
                className="img-fluid shadow-sm rounded"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="col-md-6 position-relative">
          <h2 className="why-title">Why Us?</h2>
          <p>
            At Dryxo, we believe that every woman should face the day without
            worry or fear.
            <strong>
              Feel Dry, Feel Free is more than just a tagline—it's a promise.
            </strong>
            We’ve created sanitary pads that address the common discomforts of
            traditional pads, from irritation and odor to inadequate protection,
            so you can go through your cycle without worry.
          </p>
          <p>
            Our revolutionary Anion Chip technology neutralizes odor and applies
            antibacterial protection which makes sure you are not only fresh but
            also hygienic. Made for the skin, with moisture-wicking layers and
            soft skin friendly materials preventing rashes, Dryxo sanitary pads
            provide comfort all through the menstrual cycle, irrespective of the
            flow.
          </p>
          <p>
            Menstrual health is not only important for women but also essential
            in achieving Sustainable Development and Eco-friendly Goals for a
            healthy society.
          </p>
          <p>
            With Dryxo,
            <strong>
              you can truly feel dry—and more importantly, feel free to live
              your life
            </strong>{" "}
            without limits. Choose Dryxo for a healthier, more sustainable
            menstrual care experience.
          </p>
          <div className="learn-more">
            <a href="">
              <button onClick={handleClick} className="learnmore theme_bg">
                Learn more
              </button>
            </a>
          </div>
          {/* <Button text={"Learn More"} onClick={handleClick} /> */}
        </div>
      </div>
      <div className="safty mt-5">
        <Safety />
      </div>
    </section>
  );
};

export default WhyUs;
