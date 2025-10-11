import React from 'react'
import "./Pad_ATM.css"
import ImageSlider from './ImageSlider';
import { motion } from 'framer-motion';


const Pad_ATM = () => {
  return (
    <>
      <div className="main py-0">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="padatm-header d-flex justify-content-center align-items-center"
        >
          <h1 className="PAD  fw-bold">Pad ATM</h1>
        </motion.div>
        <div className="heading">
          <div className="d-flex align-items-center justify-content-center text-center">
            {/* Left Line */}
            <div className="flex-grow-1 d-none d-sm-block">
              <hr className="support-line" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-3 py-2 support-box"
            >
              Supporting PAD-ATM: A Step Towards Menstrual Dignity
            </motion.div>

            <div className="flex-grow-1 d-none d-sm-block">
              <hr className="support-line" />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1.8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="writing"
          >
            <p>
              At Dryxo, we’re honored to support the PAD-ATM initiative by Glad
              Bharat Foundation, which brings affordable, accessible sanitary
              pads to women in remote, underserved areas. This initiative is
              about more than just providing products—it’s about empowering
              women to manage their health with dignity and care. With PAD-ATMs
              placed in key locations like schools and community centers, women
              and girls can access sanitary pads with ease, helping them feel
              supported and secure throughout their menstrual cycle.
            </p>
            <p>
              Through PAD-ATM, the Glad Bharat Foundation, along with local
              NGOs, is fostering a healthier future by encouraging the use of
              safe, hygienic menstrual products over traditional, often unsafe
              alternatives. Dryxo is proud to stand behind this impactful cause,
              as we believe that every woman deserves access to products that
              allow her to live her life fully and confidently, no matter where
              she is. Together, let’s support a future where menstrual health is
              a priority for all.
            </p>
          </motion.div>
        </div>
        <div className="slider">
          <ImageSlider />
        </div>
      </div>
    </>
  );
}

export default Pad_ATM