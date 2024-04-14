import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TailspinNFT from './components/TailspinNFT';
import TailspinToken from './components/TailspinToken';
import SlotMachine from './components/SlotMachine';

import Main from './components/Main';
import Roulette from './components/Roulette';




function App() {

  return (
    <div className="App ">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/nft" element={<TailspinNFT />}/>
          <Route path="/token" element={<TailspinToken />}/>
          <Route path="/slots" element={<SlotMachine />}/>
          <Route path="/roulette" element={<Roulette />}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;