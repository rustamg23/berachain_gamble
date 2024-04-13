import React, { useRef, useEffect } from 'react';
import Reel  from './Reel';
import GameSwitcher from './GameSwitcher';
import zero from '../img/0.png';
import one from '../img/1.png';
import two from '../img/2.png';
import three from '../img/3.png';
import four from '../img/4.png';
import five from '../img/5.png';
import six from '../img/6.png';



const SlotMachine = () => {



  const reels = [
    [zero, one, two, three, four, five, six],
    [zero, one, two, three, four, five, six],
    [zero, one, two, three, four, five, six],
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
    const combination = [1, 2 ,3];
    combination.forEach((stopIndex, i) => {
      setTimeout(() => {
        reelRefs.current[i].current.stopAt(stopIndex);
      }, i * 1000); // Учет начальной задержки вращения
    });
  }, 2000);
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
