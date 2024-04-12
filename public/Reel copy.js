import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const preloadImages = (images) => {
  images.forEach((imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
  });
};

export const Reel = ({ images }) => {
  const [visibleImages, setVisibleImages] = useState(images.slice(0, 3));
  const intervalRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    preloadImages(images);
  }, [images]);

  const updateVisibleImages = () => {
    setVisibleImages((prevImages) => {
      const nextIndex = (images.indexOf(prevImages[prevImages.length - 1]) + 1) % images.length;
      const nextImage = images[nextIndex];
      return [...prevImages.slice(1), nextImage];
    });
  };

  const spin = () => {
    setIsSpinning(true);
    intervalRef.current = setInterval(updateVisibleImages, 20);
  };
  
  const stop = () => {
    if (!isSpinning) return;

    let decelerationTime = 5000;
    let currentInterval = 10;
    const decelerationStep = 20;
  
    const decelerate = () => {
      if (decelerationTime > 0) {
        decelerationTime -= currentInterval;
        currentInterval += decelerationStep;
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(updateVisibleImages, currentInterval);
        setTimeout(decelerate, currentInterval);
      } else {
        setIsSpinning(false);
        clearInterval(intervalRef.current);
      }
    };
  
    decelerate();
  };

  // Варианты анимации для Framer Motion
  const blurVariants = {
    spinning: { filter: 'blur(1px)' },
    stopped: { filter: 'blur(0px)' }
  };

  return (
    <div>
      <div style={{ overflow: 'hidden', width: '300px', height: '300px', position: 'relative' }}>
        {visibleImages.map((img, index) => (
          <motion.img 
            key={img} 
            src={img} 
            alt={`Slide ${index}`} 
            animate={isSpinning ? 'spinning' : 'stopped'}
            transition={{ duration: 0.2 }}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        ))}
      </div>
      <button onClick={spin} disabled={isSpinning}>Spin</button>
      <button onClick={stop} disabled={!isSpinning}>Stop</button>
    </div>
  );
};
