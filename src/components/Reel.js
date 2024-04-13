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

export const Reel = forwardRef(({ images, onStop }, ref) => {
  const controls = useAnimation();
  const [displayedImages, setDisplayedImages] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  useEffect(() => {
    // Инициализация перемешанных изображений до начала вращения
    setDisplayedImages(multiplyImages(images, 45));
  }, [images]); // Перемешиваем и устанавливаем новый массив картинок при каждом изменении images

  useImperativeHandle(ref, () => ({
    startSpin() {
      setIsSpinning(true);
      // Перемешиваем изображения перед каждым началом вращения
      setDisplayedImages(multiplyImages(images, 45)); // Обновляем состояние с новым набором изображений для визуализации

      controls.start({
        y: [0, -50 * 315 ], // Двигаемся на общую высоту всех изображений
        transition: {
          duration: 315  * 0.1, // Продолжительность анимации зависит от количества изображений
          ease: 'linear',
          // duration: 25,
          loop: Infinity
        },
      });
    },
    stopAt(index) {
      
      // Подготовка массива изображений, включая только последние 5 для плавной остановки
      const finalImages = [
        images[3],  
        images[3],  
        images[index], 

        images[3],  

        images[3],  
        images[3], 
        images[3], 
        images[3], 
        images[3], 
        images[3], 
        images[3], 
        images[3], 
        images[3], 
        images[3], 
      ];
      setDisplayedImages(finalImages);  // Обновляем изображения для показа
      
      // Рассчитываем конечную позицию y, чтобы целевое изображение оказалось в центре
      const imageHeight = 50; // Высота картинки
      const finalPosition = -imageHeight * 1; // Целевая картинка будет второй снизу в массиве из 5 картинок
      controls.stop(); // Остановить текущую анимацию
      controls.start({
        y: [0, finalPosition],
        transition: {
          duration: 0.75, // Плавное замедление
          ease: "easeOut"
        }
      }).then(() => {
        setIsSpinning(false);
        if (onStop) onStop();
      });
    }
  }));

  

  return (
    <div className="relative overflow-hidden w-slot h-reel border-4 border-blue-500 rounded-lg shadow-neon">
      <motion.div animate={controls} initial={{ y: 0 }} className="flex flex-col">
        {displayedImages.map((img, index) => (
          <img key={index} src={img} alt={`Symbol ${index}`} className="w-slot h-slot" />
        ))}
      </motion.div>
    </div>
  );



});

export default Reel;




