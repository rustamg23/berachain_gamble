import React, { useState, useMemo  } from 'react';
import CustomPieChart from './PieChart';
import GameSwitcherWithTopBar from './GameSwitcher';

function Game() {
    const [players, setPlayers] = useState([]);
    const [name, setName] = useState("");
    const [wager, setWager] = useState(100);
    const [totalPool, setTotalPool] = useState(0);
    const [balance, setBalance] = useState(0);
    const [bets, setBets] = useState(0);
    const colors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF"]; 

    const chartData = useMemo(() => players.map(player => ({
      name: player.name,
      share: Number(player.share),  // Убедитесь, что это число, а не строка
      color: player.color
    })), [players]);

    const handleAddPlayer = () => {
      const newWager = parseFloat(wager);
      const newTotalPool = totalPool + newWager;
      const newPlayer = {
        id: players.length + 1,
        name: name,
        wager: newWager,
        color: colors[players.length % colors.length],
        share: (newWager / newTotalPool * 100).toFixed(2)
      };
  

      const updatedPlayers = players.map(player => ({
        ...player,
        share: (player.wager / newTotalPool * 100).toFixed(2)
      }));
  
      setPlayers([...updatedPlayers, newPlayer]);
      setTotalPool(newTotalPool);
      setName("");
      setWager(100);

      

    };
  
    return (
      <div className="flex flex-col min-h-screen bg-black">
        <GameSwitcherWithTopBar />
        <div className="flex flex-row flex-1 content lg:ml-240 mobile-content"> 
          <div className="w-240 bg-gray-800 text-white p-4 rounded-lg wager-controls "> 
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
                  placeholder="Enter wager"
                  className="bg-gray-700 p-2 rounded"
                />
              </div>
              {/* <div>
                <p className='text-lg'>Bets</p>
                <input
                  type="number"
                  value={bets}
                  onChange={(e) => setBets(e.target.value)}
                  placeholder="Enter bets"
                  className="bg-gray-700 p-2 rounded"
                />
              </div> */}
              <button
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 font-bold rounded w-32"
                onClick = {handleAddPlayer}
                disabled={!wager || balance - wager * bets < 0}
              >
                BET BET BET
              </button>
              
            </div>
            </div>
              
            <div className="flex-1 w-full  justify-center items-center flex bg-black"> 
              <CustomPieChart data={chartData} />
            </div>
            <div className="w-240 bg-gray-800 text-white p-4 rounded-lg" > 
                <div className="mt-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    <ul>
                      {players.map(player => (
                        <li key={player.id} className="flex justify-center space-x-8 items-center p-2 border-b text-white">
                          <span className="font-bold text-white" style={{ color: player.color }}>{player.name} </span>
                          <span>{player.wager} (Shares: {player.share}%)</span>
                        </li>
                      ))}
                    </ul>
                </div>
              </div>
        </div>
        
      </div>
    );
  }

export default Game;