import React, { useRef } from 'react';
import Reel  from './Reel';

// Импортируйте ваши изображения
import a from './assets/symbols/a.svg';
import b from './assets/symbols/b.svg';
import c from './assets/symbols/c.svg';
import d from './assets/symbols/d.svg';
import e from './assets/symbols/e.svg';
import f from './assets/symbols/f.svg';
import g from './assets/symbols/g.svg';
import h from './assets/symbols/h.svg';
import i from './assets/symbols/i.svg';
// Продолжайте импортировать остальные изображения...

const SlotMachine = () => {
  const reels = [
    [a, b, c, d, e, f, g, h, i],
    [a, b, c, d, e, f, g, h, i],
    [a, b, c, d, e, f, g, h, i],
    [a, b, c, d, e, f, g, h, i],
    [a, b, c, d, e, f, g, h, i]
  ];

  // Создаём массив ref для каждого Reel
  const reelRefs = useRef(reels.map(() => React.createRef()));

  const startAllSpins = () => {
    reelRefs.current.forEach((ref, index) => {
      // Добавляем небольшую задержку для каждого последующего барабана
      setTimeout(() => {
        ref.current.startSpin();
      }, index * 200); // 500ms задержка для последующих барабанов
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black ">
      <div className="flex space-x-2">
        {reels.map((images, index) => (
          <Reel key={index} images={images} ref={reelRefs.current[index]} />
        ))}
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startAllSpins}>Start All Reels</button>
    </div>
  );
};

export default SlotMachine;
