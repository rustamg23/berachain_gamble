import React, { useState } from 'react';
import bera from '../img/bera.png';
import GameSwitcher from './GameSwitcher';

export default function TailspinNFT() {
  const [sliderValue, setSliderValue] = useState(50);
  const [betAmount, setBetAmount] = useState('50'); // Теперь это строка
  const [balance, setBalance] = useState(10000);
  const [isWinner, setIsWinner] = useState(null);
  const [imageClass, setImageClass] = useState('');
  const [trys, setTrys] = useState(0);
  const [wins, setWins] = useState(0)
  const handleBet = () => {
    // Преобразовываем введенную ставку в число
    const betAmountNumber = parseFloat(betAmount) || 0;

    // Проверяем ставку перед размещением
    if (betAmountNumber <= 0 || betAmountNumber > balance) {
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
      setBalance(balance + betAmountNumber);
      setWins(wins+1)
    } else {
      setBalance(balance - betAmountNumber);
    }
    setTrys(trys+1);
    
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
    <div className={`h-screen flex flex-col items-center justify-center ${casinoBackground} text-white`}>
      <GameSwitcher/>
      <div className="flex justify-center w-full">
        <img src={bera} alt="Descriptive Alt Text" className={`mb-4 transition-transform duration-150 ${imageClass}`} style={{ width: '200px', height: '200px' }} />
      </div>
      <div className="w-full max-w-md p-5">
        <label htmlFor="range" className="block text-white text-sm font-medium mb-2">
          Шанс выигрыша: {sliderValue}%
        </label>
        <input
          id="range"
          type="range"
          min="1"
          max="75"
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer bg-black"
        />
        <div className="text-center text-white my-4">Потенциальный выигрыш: {((parseFloat(betAmount) || 0) * (100 / sliderValue)).toFixed(2)} $BERA</div>
        <div className="flex flex-col">
          <label htmlFor="betAmount" className="block text-white text-sm font-medium mb-2">
            Ваша ставка в $BERA:
          </label>
          <input
            id="betAmount"
            type="number"
            min="0"
            max={balance}
            value={betAmount}
            onChange={handleBetAmountChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите ставку"
          />
          <div className="text-white my-4">Текущий баланс: {balance} $BERA</div>
          <div className="text-white ">Всего попыток: {wins +'/'+trys} </div>      
          <span className="text-white mb-4">PNL: {balance-10000}</span>
          <button
            onClick={handleBet}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Bet
          </button>
        </div>
        {isWinner !== null && (
          <div className="mt-4 text-lg">
            {isWinner ? `Победа! Ваш выигрыш: ${(parseFloat(betAmount) || 0).toFixed(2)} $BERA` : `Вы проиграли: ${parseFloat(betAmount).toFixed(2) || 0} $BERA. Попробуйте снова!`}
          </div>
        )}
      </div>
    </div>
  );
}