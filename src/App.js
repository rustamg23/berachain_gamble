import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import TailspinNFT from './pages/TailspinNFT';
import TailspinToken from './pages/TailspinToken';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/nft" element={<TailspinNFT />}/>
          <Route path="/token" element={<TailspinToken />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
