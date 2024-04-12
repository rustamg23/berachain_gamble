import React, { useRef, useEffect } from 'react';
import Reel  from './Reel';
import GameSwitcher from './GameSwitcher';
// Импортируйте ваши изображения
import a from './assets/symbols/a.svg';
import b from './assets/symbols/b.svg';
import c from './assets/symbols/c.svg';
import d from './assets/symbols/d.svg';
import e from './assets/symbols/e.svg';
import f from './assets/symbols/f.svg';
import g from './assets/symbols/g.svg';
// Продолжайте импортировать остальные изображения...

const SlotMachine = () => {



  const reels = [
    [a, b, c, d, e, f, g],
    [a, b, c, d, e, f, g],
    [a, b, c, d, e, f, g],
  ];

  // Создаём массив ref для каждого Reel
  const reelRefs = useRef(reels.map(() => React.createRef()));

// Все барабаны начинают вращаться одновременно
const startAllSpins = () => {
  reelRefs.current.forEach((ref, index) => {
    setTimeout(() => {
      ref.current.startSpin();
    }, index * 200);
  });

  // Остановка начинается через 5 секунд + время задержки каждого барабана
  setTimeout(() => {
    const combination = [1, 1, 1];
    combination.forEach((stopIndex, i) => {
      setTimeout(() => {
        reelRefs.current[i].current.stopAt(stopIndex);
      }, i * 1000 + 200 * i); // Учет начальной задержки вращения
    });
  }, 5000);
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black ">
      <GameSwitcher/>
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
