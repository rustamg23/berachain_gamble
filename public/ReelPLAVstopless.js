import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const Reel = ({ images }) => {
  const controls = useAnimation();

  useEffect(() => {
    const cycle = async () => {
      await controls.start({ y: -100 * images.length });
      controls.set({ y: 0 }); // Мгновенно возвращаем в исходное положение
      cycle(); // Зацикливаем анимацию
    };

    cycle();
  }, [controls, images.length]);

  return (
    <div style={{ overflow: 'hidden', width: '300px', height: '300px', position: 'relative' }}>
      <motion.div
        animate={controls}
        initial={{ y: 0 }}
        transition={{
          duration: 1, // Длительность зависит от количества изображений
          ease: 'linear',
          repeat: Infinity
        }}
        style={{ position: 'absolute', top: 0 }}
      >
        {images.concat(images).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            style={{ width: '100px', height: '100px', display: 'block' }}
          />
        ))}
      </motion.div>
    </div>
  );
};
