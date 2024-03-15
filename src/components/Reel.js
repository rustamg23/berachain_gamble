// Reel.js
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, useAnimation } from 'framer-motion';

const multiplyImages = (images, times) => {
  let result = [];
  for (let i = 0; i < times; i++) {
    result = result.concat(images);
  }
  return result;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const Reel = forwardRef(({ images }, ref) => {
  const controls = useAnimation();
  const [displayedImages, setDisplayedImages] = useState([]);

  useEffect(() => {
    // Инициализация перемешанных изображений до начала вращения
    setDisplayedImages(shuffleArray(multiplyImages(images, 5)));
  }, [images]); // Перемешиваем и устанавливаем новый массив картинок при каждом изменении images

  useImperativeHandle(ref, () => ({
    startSpin() {
      // Перемешиваем изображения перед каждым началом вращения
      const shuffledImages = shuffleArray(multiplyImages(images, 5));
      setDisplayedImages(shuffledImages); // Обновляем состояние с новым набором изображений для визуализации

      controls.start({
        y: [-50 * shuffledImages.length, 0], // Двигаемся на общую высоту всех изображений
        transition: {
          duration: shuffledImages.length * 0.05, // Продолжительность анимации зависит от количества изображений
          ease: 'linear',
        },
      });
    },
  }));

  return (
    <div style={{ overflow: 'hidden', width: '100px', height: '300px', position: 'relative' }}>
      <motion.div
        animate={controls}
        initial={{ y: 0 }}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {displayedImages.map((img, index) => (
          <img
            key={`${img}-${index}`} // Обеспечиваем уникальность ключа
            src={img}
            alt={`Image ${index}`}
            style={{ width: '100%', height: 'auto' }}
          />
        ))}
      </motion.div>
    </div>
  );
});

export default Reel;
