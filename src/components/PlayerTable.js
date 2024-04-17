import React, { useState } from 'react';

const PlayerTable = ({ players , totalPool, highlightedId, handleMouseEnter, handleMouseLeave }) => {

    return (
        <div className="mt-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <ul>
              {players.map(player => (
                <li 
                key={player.id} 
                onMouseEnter={() => handleMouseEnter(player.id)}
                onMouseLeave={handleMouseLeave}
                className={`flex justify-center space-x-8 items-center p-2 border-b text-white ${player.id === highlightedId ? 'bg-gray-500' : ''} `}
            >
                <span className="font-bold text-white">{player.name}</span>
                <span>{player.wager} (Shares: {(player.wager*100/totalPool).toFixed(2)}%)</span>
            </li>
              ))}
            </ul>
        </div>
    );
};

export default PlayerTable;
