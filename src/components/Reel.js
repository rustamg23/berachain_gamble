import React, { useState, useEffect } from 'react';
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

export const Reel = ({ images }) => {
  const controls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  // Добавляем состояние для хранения перемешанных умноженных изображений
  const [displayedImages, setDisplayedImages] = useState([]);

  useEffect(() => {
    // Инициализация перемешанных изображений до начала вращения
    setDisplayedImages(shuffleArray(multiplyImages(images, 5)));
  }, [images]); // Перемешиваем и устанавливаем новый массив картинок при каждом изменении images

  const startSpin = () => {
    setIsSpinning(true);
    // Перемешиваем изображения перед каждым началом вращения
    const shuffledImages = shuffleArray(multiplyImages(images, 5));
    setDisplayedImages(shuffledImages); // Обновляем состояние с новым набором изображений для визуализации

    controls.start({
      y: [-50 * shuffledImages.length, 0], // Адаптируем смещение под удлинённый массив
      transition: {
        duration: shuffledImages.length * 0.05, // Адаптируем длительность под новое количество картинок
        ease: 'linear',
      },
    }).then(() => setIsSpinning(false));
  };

  return (
    <>
      <div style={{ overflow: 'hidden', width: '300px', height: '300px', position: 'relative' }}>
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
              style={{ width: '100px', height: '100px' }}
            />
          ))}
        </motion.div>
      </div>
      <button onClick={startSpin} disabled={isSpinning}>Start</button>
    </>
  );
};
