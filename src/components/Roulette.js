import React, { useState, useMemo, useEffect  } from 'react';
import DynamicPieChart from './PieChart';
import GameSwitcherWithTopBar from './GameSwitcher';
import PlayerForm from './PlayerForm';
import PlayerTable from './PlayerTable';

function Game() {
    const [players, setPlayers] = useState([]);
    const [name, setName] = useState("");
    const [wager, setWager] = useState(100);
    const [totalPool, setTotalPool] = useState(0);
    const [balance, setBalance] = useState(0);
    const [bets, setBets] = useState(0);
    const [isCounting, setIsCounting] = useState(false);
    const [highlightedId, setHighlightedId] = useState(null);

    const handleMouseEnter = (id) => {
      setHighlightedId(id);
    };

    const handleMouseLeave = () => {
      setHighlightedId(null);
    };

    const chartData = useMemo(() => players.map(player => ({
      name: player.name,
      total: totalPool,
      color: player.color,
      wager: player.wager,
      id: player.id
    })), [players, totalPool]);

    
    const handleAddPlayer = (name, wager) => {
      console.log(name, wager)
      if (name && wager) {
      const newWager = parseFloat(wager);
      const newTotalPool = totalPool + newWager;
      const newPlayer = {
        id: players.length + 1,
        name: name,
        wager: newWager,
      };
  

      const updatedPlayers = players.map(player => ({
        ...player,
      }));
  
      setPlayers((updatedPlayers) =>[...updatedPlayers, newPlayer]);
      setTotalPool(newTotalPool);
    }
      else {
        console.log("rejected")
      }

    };
  
    return (
      <div className="flex flex-col min-h-screen bg-black">
        <GameSwitcherWithTopBar />
        <div className="flex flex-row flex-1 content lg:ml-240 mobile-content"> 
          <div className="w-240 bg-gray-800 text-white p-4 rounded-lg wager-controls "> 
            <PlayerForm onAddPlayer={handleAddPlayer} />
          </div>
              
            <div className="flex-1   justify-center items-center flex bg-black z-10"> 
              <DynamicPieChart initialData={chartData} highlightedId={highlightedId} setHighlightedId={setHighlightedId}/>
            </div>
            <div className="w-240 bg-gray-800 text-white p-4 rounded-lg" > 
                <PlayerTable players={players} totalPool={totalPool} highlightedId={highlightedId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}/>
              </div>
        </div>
        
      </div>
    );
  }

export default Game;