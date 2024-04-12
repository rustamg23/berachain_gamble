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

  // Предзагрузка всех изображений при монтировании компонента
  useEffect(() => {
    preloadImages(images);
  }, [images]);

  const spin = () => {
    setIsSpinning(true);
    intervalRef.current = setInterval(() => {
      setVisibleImages((prevImages) => {
        const nextIndex = (images.indexOf(prevImages[prevImages.length - 1]) + 1) % images.length;
        const nextImage = images[nextIndex];
        return [...prevImages.slice(1), nextImage];
      });
    }, 50); // Быстрая скорость прокрутки для демонстрации
  };
  const updateVisibleImages = () => {
    setVisibleImages((prevImages) => {
      const nextIndex = (images.indexOf(prevImages[prevImages.length - 1]) + 1) % images.length;
      const nextImage = images[nextIndex];
      return [...prevImages.slice(1), nextImage];
    });
  };
  
  const stop = () => {
    if (!isSpinning) return; // Игнорировать, если барабан уже остановлен
  
    let decelerationTime = 3000; // Время замедления в мс
    let currentInterval = 100; // Текущий интервал обновления (скорость анимации)
    const decelerationStep = 20; // Шаг увеличения интервала (замедление)
  
    const decelerate = () => {
      if (decelerationTime > 0) {
        decelerationTime -= currentInterval;
        currentInterval += decelerationStep;
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(updateVisibleImages, currentInterval);
        setTimeout(decelerate, currentInterval);
      } else {
        // Полная остановка
        setIsSpinning(false);
        clearInterval(intervalRef.current);
        // Дополнительная логика для выравнивания картинок может быть добавлена здесь
      }
    };
  
    decelerate();
  };
  
  
  

  return (
    <div>
      <div style={{ overflow: 'hidden', width: '300px', height: '300px', position: 'relative' }}>
        {visibleImages.map((img, index) => (
          <img 
            key={img} 
            src={img} 
            alt={`Slide ${index}`} 
            style={{ 
              width: '100px', 
              height: '100px', 
              objectFit: 'cover',
              filter: isSpinning ? 'blur(2px)' : 'none',
              transition: 'filter 0.5s ease-out' // Применяем размытие, когда барабан крутится
            }}
          />
        ))}
      </div>
      <button onClick={spin} disabled={isSpinning}>Spin</button>
      <button onClick={stop} disabled={!isSpinning}>Stop</button>
    </div>
  );
};
