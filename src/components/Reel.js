// Reel.js
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { multiplyImages, shuffleArray, } from './utils';


export const Reel = forwardRef(({ images, onStop }, ref) => {
  const [width, setWidth] = useState((window.innerWidth >= 640) ? 150 : 80);
  const controls = useAnimation();
  const [displayedImages, setDisplayedImages] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  useEffect(() => {

    setDisplayedImages(shuffleArray(multiplyImages(images, 45)));
  }, [images]); 

  useImperativeHandle(ref, () => ({
    startSpin() {
      console.log("Starting spin...");
      setIsSpinning(true);
      setDisplayedImages(shuffleArray(multiplyImages(images, 45)));
      controls.start({
        y: [0, -width * 315],
        transition: {
          duration: 31.5, 
          ease: 'linear',
          loop: Infinity
        },
      });
    },
    stopAt(index, callback) {
      console.log("Stopping at index:", index);
      var finalImages = shuffleArray(images);
      finalImages[5] = images[index];
      setDisplayedImages(finalImages);
      
      const finalPosition = -width * 4;
      controls.stop();
      controls.start({
        y: [0, finalPosition],
        transition: {
          duration: 0.75,
          ease: "easeOut"
        }
      }).then(() => {
        console.log("Animation complete, stopping spin...");
        setIsSpinning(false);
        if (callback) callback();
      }).catch(error => console.error("Error during stop animation:", error));
    }
}));


  

  return (
    <div className=" relative overflow-hidden w-slot-md sm:w-slot-lg h-reel-md sm:h-reel-lg rounded-lg ">
      <motion.div animate={controls} initial={{ y: 0 }} className="flex flex-col">
        {displayedImages.map((img, index) => (
          <img key={index} src={img} alt={`Symbol ${index}`} className="sm:w-slot-lg w-slot-md sm:h-slot-lg h-slot-md" />
        ))}
      </motion.div>
    </div>
  );



});

export default Reel;




