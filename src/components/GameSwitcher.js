import React, { useState } from 'react';

const GameSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("hehe")
    setIsOpen(!isOpen);
}

  return (
    <div className="flex">
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-gray-800 p-5 text-white`}>
        <div className="flex flex-col space-y-4">

          <a href="/" className="bg-gray-700 p-2 rounded">Main</a>
          <a href="/slots" className="bg-gray-700 p-2 rounded">Slots</a>
          {/* <a href='/nft' className="bg-gray-700 p-2 rounded">Tailspin NFT</a> */}
          <a href='/token' className="bg-gray-700 p-2 rounded">Tailspin Token</a>
          <a href='/roulette' className="bg-gray-700 p-2 rounded">Roulette</a>
        </div>
      </div>
      <div onClick={toggleMenu} className="lg:hidden flex-1 p-10 text-2xl font-bold absolute top-0 right-0 z-50 text-white">
        {"☰"}
      </div>
    </div>
  );
};

export default GameSwitcher;
