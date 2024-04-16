import React, { useState } from 'react';

const PlayerForm = ({ onAddPlayer }) => {
    const [name, setName] = useState("");
    const [wager, setWager] = useState(100);
    const [balance, setBalance] = useState(0);
    const [bets, setBets] = useState(0);

    const handleAddPlayer = () => {
        if (name && wager && !isNaN(parseFloat(wager))) {
            console.log(name)
            onAddPlayer(name, parseFloat(wager));
            setName(""); // Очистка поля ввода имени после добавления
            setWager(100); // Сброс ставки к начальному значению или другому желаемому значению
        }
    };

    return (
        <div className="bet-input space-y-8 text-left">
            <div>
                <p className='text-lg'>Wager</p>
                <input
                    type="number"
                    value={wager}
                    onChange={(e) => setWager(e.target.value)}
                    placeholder="Enter wager"
                    className="bg-gray-700 p-2 rounded"
                />
            </div>
            <div>
                <p className='text-lg'>Name</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="bg-gray-700 p-2 rounded"
                />
            </div>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 font-bold rounded w-32"
                onClick={handleAddPlayer}
                disabled={!wager || balance - wager * bets < 0}
            >
                BET BET BET
            </button>
        </div>
    );
};

export default PlayerForm;
