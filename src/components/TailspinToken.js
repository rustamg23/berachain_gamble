import React, { useState } from 'react';
import bera from '../img/bera.png';
import GameSwitcherWithTopBar from './GameSwitcher';
import HistoryToggle from './CustomTable';

export default function TailspinNFT() {
  const [sliderValue, setSliderValue] = useState(50);
  const [wager_, setBetAmount] = useState('50'); // Теперь это строка
  const [balance, setBalance] = useState(10000);
  const [pnl, setPnl] = useState(null);
  const [isWinner, setIsWinner] = useState(null);
  const [imageClass, setImageClass] = useState('');
  const [trys, setTrys] = useState(0);
  const [wins, setWins] = useState(0)
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [betHistory, setBetHistory] = useState([]);
  const [bets, setBets] = useState(1);
  const historyColumns = [
    { header: 'Time', accessor: 'time' },
    { header: 'Player', accessor: 'player' },
    { header: 'Wager', accessor: 'wager' },
    { header: 'Chance', accessor: 'chance' },
    { header: 'Payout', accessor: 'payout' },
    { header: 'Outcome', accessor: 'outcome' },
  ];

  const handleBet = async () => {
    // Преобразовываем введенную ставку в число
    const wager = parseFloat(wager_) || 0;
  
    // Проверяем ставку перед размещением
    if (wager <= 0 || wager > balance) {
      alert("Невозможная ставка");
      return;
    }
  
    const randomNumber = Math.ceil(Math.random() * 100);
    const didWin = randomNumber <= sliderValue;
    setIsWinner(didWin);
  
    // Анимация картинки
    setImageClass('scale-150'); // Увеличиваем
    setTimeout(() => setImageClass('scale-70'), 180); // Уменьшаем
    setTimeout(() => setImageClass(''), 300); // Возвращаем в исходное
  
    // Вычисляем и обновляем баланс
    if (didWin) {
      setBalance(balance => balance + wager * 99/ sliderValue - wager);
      setWins(wins => wins + 1);
    } else {
      setBalance(balance => balance - wager);
    }
    setTrys(trys => trys + 1);
    addToBetHistory(wager, didWin);
  };
  
  const gamble = async (numberOfSpins) => {
    for (let i = 0; i < numberOfSpins; i++) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Ожидание 1 секунды перед следующей ставкой
      handleBet(); // Вызов ставки
    }
  };
  
  const addToBetHistory = (bet, outcome) => {
    const newHistoryEntry = {
      time: new Date().toLocaleTimeString(),
      player: 'You',
      wager: bet,
      chance: sliderValue,
      payout: outcome ? 99/sliderValue * bet -bet : -bet,
      outcome: outcome ? 'Win' : 'Loss',
    };
    setBetHistory(prevHistory => [newHistoryEntry, ...prevHistory]);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleBetAmountChange = (e) => {
    // Устанавливаем ставку как строку для свободного ввода
    setBetAmount(e.target.value);
  };

  // Стили для казиношного фона
  const casinoBackground = "bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900";

  return (
    <div className={`min-h-screen flex flex-col  ${casinoBackground} text-white `}>
      <GameSwitcherWithTopBar/>
      <div className="flex flex-row flex-1 content lg:ml-240 mobile-content"> 
      <div className="w-240 bg-gray-800 text-white p-4 rounded-lg wager-controls">
        <div className="flex flex-col space-y-8">
          <p className='text-lg'>Wager</p>
          <input
            id="wager"
            type="number"
            min="0"
            max={balance}
            value={wager_}
            onChange={handleBetAmountChange}
            className="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter wager"
          />
          </div>
    
          <p className='text-lg'>Bets</p>
          <input
            id="bets"
            type="number"
            min="1"
            value={bets}
            onChange={(e) => setBets(e.target.value)}
            className="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter bets count"
          />
          <p className='text-lg'>Chance</p>
          <input
          id="range"
          type="range"
          min="1"
          max="75"
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer bg-black"
        />
          <p className='text-md'>Win Chance: {sliderValue}%</p>
          <p className='text-md'>Win Payout: {(wager_ * 100 / sliderValue).toFixed(2)} $BERA</p>
          <p className='text-md'>Total wager: {wager_ * bets} $BERA</p>
          <p className='text-md'>Remaining bets: {bets}</p>
          <p className='text-md'>Total balance: {balance} $BERA</p>
          <p className='text-md'>Balance change: {pnl} $BERA</p>
          <p className='text-md'>Attempts: {wins + '/' + trys}</p>     
    
          <button
            onClick={() => gamble(bets)}
            className="w-32 px-4 py-2 bg-blue-500 hover:bg-blue-700 font-bold rounded"
          >
            Bet
          </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src={bera} alt="Descriptive Alt Text" className={`mb-4 transition-transform duration-150 ${imageClass}`} style={{ width: '200px', height: '200px' }} />
        <HistoryToggle columns={historyColumns} data={betHistory} amount={6} />
      </div>
      </div>
      </div>
  );
}