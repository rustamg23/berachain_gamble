import React, { useState } from 'react';
import {beargain, beraflip, slots } from './utils';
import icon from '../img/icon.png'
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'

function trimAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const GameSwitcherWithTopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { address, isConnected } = useAccount();

  return (
    <div>

      <div className={`fixed top-0 left-0 right-0 z-40 lg:h-topbar-desktop h-topbar-mobile bg-gray-900 flex justify-between items-center px-4`}>
        <div className="flex items-center">
          <img src={icon} className="h-10 w-10 mr-2" alt="Logo" />
          <span className="text-white text-xl font-bold">Junky Ursas</span>
        </div>
        <button className="text-white lg:hidden block" onClick={toggleMenu}>
          ☰
        </button>
        <button className="text-white hidden lg:block bg-red-600 px-4 py-2 rounded shadow hover:bg-red-800 transition duration-150 ease-in-out" onClick={isConnected ? openAccountModal : openConnectModal}>
          {isConnected ? trimAddress(address) : "Connect Wallet" }
        </button>
      </div>


      <div className={`sidebar fixed inset-y-0 left-0 z-30 lg:w-sidebar-desktop w-sidebar-mobile transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-gray-800 p-5 text-white`}>
        <div className="flex flex-col space-y-4">
          <a href="/" className="bg-gray-700 p-2 rounded ">Main</a>
          <a href="/slots" className="bg-gray-700 p-2 rounded text-sm items-center justify-center flex flex-col">
            <span>Junky Slots</span>
            <img src={beargain} className='w-10 '/> 
          </a>
          <a href='/token' className="bg-gray-700 p-2 rounded text-sm items-center justify-center flex flex-col">
            <span>Honey Flip</span>
            <img src={beraflip} className='w-10 '/>
          </a>
          <a href='/roulette' className="bg-gray-700 p-2 rounded text-sm items-center justify-center flex flex-col">
            <span>Beargain Raffle</span>
            <img src={slots} className='w-10 '/>
          </a>
          <button className="text-white sm:hidden block  bg-red-600 px-4 py-2 rounded shadow hover:bg-red-800 transition duration-150 ease-in-out" onClick={isConnected ? openAccountModal : openConnectModal}>
          {isConnected ? trimAddress(address) : "Connect Wallet" }
        </button>
        </div>
      </div>
    </div>
  );
};

export default GameSwitcherWithTopBar;
