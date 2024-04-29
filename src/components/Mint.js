import bear from '../img/bear.png'; 
import '@rainbow-me/rainbowkit/styles.css';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import GameSwitcherWithTopBar from './GameSwitcher';
import nft from "../img/nft.png";
import { useAccount } from 'wagmi'

function Main() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const [count, setCount] = useState(1);
  const [connected, setConnected] = useState(false);
  const { address, isConnected } = useAccount();
  const increment = () => {
    if (count < 5) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  function MintSHIT()  {
    if (isConnected) {
      console.log(`${count} bears minted!`);
    } else {
      console.log("Please connect your wallet");
    }
  }

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen">
    <GameSwitcherWithTopBar />
    <div className="flex flex-col items-center space-y-6 sm:ml-240 w-sidebar-desktop">
      <div className="flex space-x-2 w-full" >
        <button onClick={decrement} className="bg-red-500 text-white px-4 py-2 rounded sha dow hover:bg-red-700 transition duration-150 ease-in-out text-xl font-bold w-1/3">-</button>
        <div className="bg-red-300 px-4 py-2 flex items-center justify-center text-xl w-1/3">{count}</div >
        <button onClick={increment} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition duration-150 ease-in-out text-xl font-bold w-1/3">+</button>
      </div>
      <button onClick={MintSHIT} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition duration-150 ease-in-out text-xl font-bold w-full">Mint</button>
      <button onClick={MintSHIT} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition duration-150 ease-in-out text-xl font-bold w-full">Mint WL</button>
    </div>
  </div>

  );
}

export default Main;




