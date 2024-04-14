import React, { useRef, useEffect, useState } from 'react';
import Reel  from './Reel';
import GameSwitcher from './GameSwitcher';
import { reels, breels, multiplierTable, calculateMultiplier } from './utils';
import bondbera from "./beras/bondbera.webp"

const SlotMachine = () => {

  const [bet, setBet] = useState('');
  const [balance, setBalance] = useState(10000);
  const [pnl, setPnl] = useState(0);
  const [future, setFuture] = useState([bondbera, bondbera, bondbera])
  var combination = [0, 0, 0]

  // Создаём массив ref для каждого Reel
  const reelRefs = useRef(breels.map(() => React.createRef()));

// Все барабаны начинают вращаться одновременно
const startAllSpins = () => {
  combination = [Math.floor(Math.random() * 7), Math.floor(Math.random() * 7), Math.floor(Math.random() * 7)];
  setFuture([breels[0][combination[0]],breels[1][combination[1]],breels[2][combination[2]]]);
  reelRefs.current.forEach((ref, index) => {
    setTimeout(() => {
      ref.current.startSpin();
    }, index * 200);
  });

  // Остановка начинается через 5 секунд + время задержки каждого барабана
  setTimeout(() => {
    combination.forEach((stopIndex, i) => {
      setTimeout(() => {
        reelRefs.current[i].current.stopAt(stopIndex);
      }, i * 1000); // Учет начальной задержки вращения
    });
  }, 2000);
  const winMultiplier = calculateMultiplier(combination);
  const winAmount = winMultiplier * bet;
  const newBalance = balance + winAmount;
  console.log(winMultiplier, winAmount, newBalance)
  setBalance(newBalance);
  setPnl(newBalance - 10000);

};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black space-y-8">
      <GameSwitcher/>
      <div className="flex space-x-2">
        {breels.map((images, index) => (
          <Reel key={index} images={images} ref={reelRefs.current[index]} />
        ))}
      </div>
      <div className="bet-input ">
        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
          placeholder="Enter your bet"
          className="text-white bg-gray-700"
        />
        <p className='text-white text-md'>deposit: {balance} $BERA</p>
        <p className='text-white text-md'>PNL: {pnl} $BERA</p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={startAllSpins}
        disabled={!bet || balance - bet < 0}
      >
        BET BET BET
      </button>
        
      <div className="flex space-x-2 ">

        <img className="sm:w-slot-md w-slot-sm sm:h-slot-md h-slot-sm" src={future[0]}/>
        <img className="sm:w-slot-md w-slot-sm sm:h-slot-md h-slot-sm" src={future[1]}/>
        <img className="sm:w-slot-md w-slot-sm sm:h-slot-md h-slot-sm" src={future[2]}/>
      </div>
    </div>
  );
};

export default SlotMachine;
