import React, { useState, useMemo  } from 'react';
import PieChart from './PieChart';

function Game() {
    const [players, setPlayers] = useState([]);
    const [name, setName] = useState("");
    const [bet, setBet] = useState("");
    const [totalPool, setTotalPool] = useState(0);
    const colors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF"]; 

    const chartData = useMemo(() => players.map(player => ({
        value: player.share, // Преобразуем долю в проценты
        color: player.color,
        name: player.name
    })), [players]);

    const handleAddPlayer = () => {
      const newBet = parseFloat(bet);
      const newTotalPool = totalPool + newBet;
      const newPlayer = {
        id: players.length + 1,
        name: name,
        bet: newBet,
        color: colors[players.length % colors.length],
        share: (newBet / newTotalPool * 100).toFixed(2)
      };
  
      // Обновление долей существующих игроков
      const updatedPlayers = players.map(player => ({
        ...player,
        share: (player.bet / newTotalPool * 100).toFixed(2)
      }));
  
      setPlayers([...updatedPlayers, newPlayer]);
      setTotalPool(newTotalPool);
      setName("");
      setBet("");

      

    };
  
    return (
      <div className="flex h-screen">
        <div className="flex-1 bg-gray-100  m-auto"> {/* Левая часть для игры */}
            <PieChart data={chartData} className="w-64 h-64 justify-center items-center" />;
        </div>
        <div className="flex-1 p-4"> {/* Правая часть для формы и списка */}
          <div className="flex flex-col items-center">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="input input-bordered w-full max-w-xs" />
            <input type="number" value={bet} onChange={e => setBet(e.target.value)} placeholder="Bet amount" className="input input-bordered w-full max-w-xs mt-2" />
            <button onClick={handleAddPlayer} className="btn btn-primary mt-2">Add Player</button>
          </div>
          <div className="mt-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <ul>
              {players.map(player => (
                <li key={player.id} className="flex justify-center space-x-8 items-center p-2 border-b">
                  <span className="font-bold" style={{ color: player.color }}>{player.name} </span>
                  <span>{player.bet} (Shares: {player.share}%)</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

export default Game;