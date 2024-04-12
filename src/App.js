import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TailspinNFT from './components/TailspinNFT';
import TailspinToken from './components/TailspinToken';
import SlotMachine from './components/SlotMachine';
import at_at from './components/assets/symbols/a.svg';
import c3po from './components/assets/symbols/b.svg';
import darth_vader from './components/assets/symbols/c.svg';
import death_star from './components/assets/symbols/d.svg';
import falcon from './components/assets/symbols/e.svg';
import r2d2 from './components/assets/symbols/f.svg';
import stormtrooper from './components/assets/symbols/g.svg';
import tie_ln from './components/assets/symbols/h.svg';
import yoda from './components/assets/symbols/i.svg';
import Main from './components/Main';




function App() {
  //feel reels Array with random symbols from import
  const reels = [ death_star, falcon, r2d2,at_at, c3po, darth_vader, stormtrooper, tie_ln, yoda];

  return (
    <div className="App ">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/nft" element={<TailspinNFT />}/>
          <Route path="/token" element={<TailspinToken />}/>
          <Route path="/slots" element={<SlotMachine />}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;