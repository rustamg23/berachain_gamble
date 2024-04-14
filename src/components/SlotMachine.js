  import React, { useRef, useEffect, useState } from 'react';
  import Reel  from './Reel';
  import GameSwitcherWithTopBar from './GameSwitcher';
  import { breel, breels, multiplierTable, calculateMultiplier } from './utils';
  import bondbera from "./beras/bondbera.webp"
  import CustomTable from './CustomTable';
  import {MultiplierTableModal} from './MultiplierTable'


  const SlotMachine = () => {
    const [wager, setWager] = useState('');
    const [bets, setBets] = useState(1);
    const [balance, setBalance] = useState(10000);
    const [pnl, setPnl] = useState(0);
    const [future, setFuture] = useState([bondbera, bondbera, bondbera])
    const [spinHistory, setSpinHistory] = useState([{ wager: null, multiplier: null, payout: null, combination: null, time: null, player:null }]);
    const [showTable, setShowTable] = useState(false);
    const [buttonRef, setButtonRef] = useState(null);
    const [modalPosition, setModalPosition] = useState({});
    var combination = [0, 0, 0]
    const columns = [
      { header: 'Player', accessor: 'player' },
      { header: 'Time (UTC)', accessor: 'time' },
      { header: 'Wager', accessor: 'wager' },
      { header: 'Multiplier', accessor: 'multiplier' },
      { header: 'Payout', accessor: 'payout' },
      { header: 'Combination', accessor: 'combination' }
    ];

    const handleToggleTable = (event) => {
      if (!showTable) {
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({
          top: rect.bottom,
          left: rect.left
        });
      }
      setShowTable(!showTable);
    };

    const reelRefs = useRef(breels.map(() => React.createRef()));

  const startAllSpins = () => {
    return new Promise((resolve) => {
      console.log("Initiating spin...");
      combination = [Math.floor(Math.random() * 7), Math.floor(Math.random() * 7), Math.floor(Math.random() * 7)];
      setFuture([breels[0][combination[0]], breels[1][combination[1]], breels[2][combination[2]]]);
      
      reelRefs.current.forEach((ref, index) => {
        setTimeout(() => {
          console.log("Spinning reel", index);
          ref.current.startSpin();
        }, index * 200);
      });

      setTimeout(() => {
        Promise.all(combination.map((stopIndex, i) => {
          return new Promise(innerResolve => {
            setTimeout(() => {
              console.log("Preparing to stop reel", i, "at index", stopIndex);
              reelRefs.current[i].current.stopAt(stopIndex, innerResolve);
            }, i * 500);
          });
        })).then(() => {
          console.log("All reels stopped.");
          const winMultiplier = calculateMultiplier(combination);
          const winAmount = winMultiplier * wager;
          const newBalance = balance + winAmount;
          setBalance(newBalance);
          setPnl(newBalance - 10000);
          const newSpinRecord = {
            player: 'You',
            time: new Date().toLocaleTimeString(),
            wager: wager,
            multiplier: winMultiplier,
            payout: winAmount,
            combination: combination.join(", ")
          };
          setSpinHistory([newSpinRecord, ...spinHistory]);
          console.log("Spin complete. Resolving promise.");

          resolve();
        }).catch(error => console.error("Error completing spin:", error));
      }, 2000);
    });
  };



  const gamble = async (numberOfSpins) => {
    for (let i = 0; i < numberOfSpins; i++) {
      await startAllSpins(); 
      setBets(numberOfSpins-1)
      console.log(i, "i")
    }
  };



    return (
      <div className="flex flex-col min-h-screen bg-black">
        <GameSwitcherWithTopBar />
        <div className="flex flex-row flex-1 content lg:ml-240 mobile-content"> 
          <div className="w-240 bg-gray-800 text-white p-4 rounded-lg wager-controls "> 
            <div className="bet-input space-y-8 text-left">
              <p className='text-lg'>Wager</p>
              <input
                type="number"
                value={wager}
                onChange={(e) => setWager(e.target.value)}
                placeholder="Enter wager"
                className="bg-gray-700 p-2 rounded"
              />
              <p className='text-lg'>Bets</p>
              <input
                type="number"
                value={bets}
                onChange={(e) => setBets(e.target.value)}
                placeholder="Enter bets count"
                className="bg-gray-700 p-2 rounded"
              />
              <p className='text-md'>Total wager: {wager * bets} $BERA</p>
              <p className='text-md'>Remaining bets: {bets}</p>
              <p className='text-md'>Total balance: {balance} $BERA</p>
              <p className='text-md'>Balance change: {pnl} $BERA</p>

              <button
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 font-bold rounded"
                onClick={() => gamble(bets)}
                disabled={!wager || balance - wager * bets < 0}
              >
                BET BET BET
              </button>
            </div>
          </div>
          <div className="flex flex-col flex-1 items-center space-y-8"> 
            <div className="flex space-x-2">
              {breels.map((images, index) => (
                <Reel key={index} images={images} ref={reelRefs.current[index]} />
              ))}
            </div>
            {showTable && (
              <MultiplierTableModal multipliers={multiplierTable} images={breel} onClose={handleToggleTable}/>
            )}
             <button onClick={handleToggleTable} ref={setButtonRef} className="bg-white text-black px-4 py-2">
              {showTable ? 'Hide Table' : 'Show Table'}
            </button>
            {/* <div className="flex space-x-2">
              <img className="w-slot-md h-slot-md" src={future[0]} />
              <img className="w-slot-md h-slot-md" src={future[1]} />
              <img className="w-slot-md h-slot-md" src={future[2]} />
            </div> */}
            <div className="p-4">
              <CustomTable columns={columns} data={spinHistory} amount={6}/>
            </div>
          </div>
        </div>
       
      </div>
    );
  };

  export default SlotMachine;
