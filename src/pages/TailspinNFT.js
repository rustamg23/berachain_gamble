import React, { useState } from 'react';
import bera from '../img/bera.png';

export default function TailspinNFT() {
    const [sliderValue, setSliderValue] = useState(1);
    const [balance, setBalance] = useState(10000); // Начальный баланс пользователя
    const [isWinner, setIsWinner] = useState(null);
    const [rotateClass, setRotateClass] = useState('');
    const priceValue = 100; // Цена токена
    const [totalGames, setTotalGames] = useState(0); // Всего игр
    const [totalWins, setTotalWins] = useState(0); // Всего побед

    const handleBet = () => {
        setTotalGames(totalGames + 1); // Увеличиваем счетчик игр
        const randomNumber = Math.ceil(Math.random() * 100);
        const didWin = randomNumber <= sliderValue;
        setIsWinner(didWin);

        const betAmount = sliderValue / 100 * priceValue; // Ставка в монетах

        if (didWin) {
            setRotateClass('animate-spin');
            setTimeout(() => setRotateClass(''), 1000);
            setBalance(balance + 100); // Увеличиваем баланс при выигрыше
            setTotalWins(totalWins + 1); // Увеличиваем счетчик побед
        } else {
            setBalance(balance - betAmount); // Уменьшаем баланс при проигрыше
        }
    };

    return (
        <div className={`min-h-screen bg-orange-700 flex flex-col items-center justify-center text-white py-8`}>
            <div className="flex flex-col items-center justify-center space-y-5 w-full max-w-lg">
                <div className={`${rotateClass} w-full flex justify-center`}>
                    <img src={bera} alt="Descriptive Alt Text" className="mb-4 w-48 h-48 object-cover" />
                </div>
                <input
                    type="range"
                    min="1"
                    max="75"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(e.target.value)}
                    className="w-2/3 h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                />
                <div>Шанс выигрыша: {sliderValue}%</div>
                <div>Цена токена: {priceValue} BERA</div>
                
                <div>Текущий баланс: {balance} BERA</div>
                <div>Всего игр: {totalGames}, Побед: {totalWins}</div>
                <button
                    onClick={handleBet}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg w-2/3 "
                >
                    Bet
                </button>
                {isWinner !== null && (
                    <div className="mt-4 text-lg">
                        {isWinner ? 'Победа!' : 'Попробуйте снова!'}
                    </div>
                )}
            </div>
        </div>
    );
}
