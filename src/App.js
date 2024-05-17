import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TailspinNFT from './components/TailspinNFT';
import TailspinToken from './components/TailspinToken';
import SlotMachine from './components/SlotMachine';
import { Analytics } from "@vercel/analytics/react"
import Main from './components/Main';
import Roulette from './components/Roulette';
import Mint from './components/Mint';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets 
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, useConfig } from 'wagmi';
import {
  berachainTestnet
} from 'viem/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  rabbyWallet,

} from '@rainbow-me/rainbowkit/wallets';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CFlip from './components/CFlip';


function App() {

  const connectors = connectorsForWallets(
    [
      {
        groupName: 'Recommended',
        wallets: [metaMaskWallet, rabbyWallet, rainbowWallet, walletConnectWallet],
      },
    ],
    {
      appName: 'JunkyUrsas:MINT_PAGE',
      projectId: 'fd551ef50da8814fb148b90c72200e26',
    }
  );
  const config = getDefaultConfig({
    connectors,
    appName: 'JunkyUrsas:MINT_PAGE',
    projectId: 'fd551ef50da8814fb148b90c72200e26',
    chains: [berachainTestnet],
  });
  const queryClient = new QueryClient();

  return (
    <div className="App ">
      <ToastContainer />
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider  modalSize="compact" coolMode  locale= "en-US" theme={darkTheme({accentColor: 'red',overlayBlur: 'small', accentColorForeground: 'white',})} initialChain={berachainTestnet}>
      <BrowserRouter>
        <Routes>
          <Route path="/cflip" element={<CFlip />} />
          <Route path="/" element={<Main />} />
          <Route path="/nft" element={<TailspinNFT />}/>
          <Route path="/token" element={<TailspinToken />}/>
          <Route path="/slots" element={<SlotMachine />}/>
          <Route path="/roulette" element={<Roulette />}/>
          <Route path="/mint" element={<Mint />}/>
        </Routes>
      </BrowserRouter>
      </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
      <Analytics/>
    </div>
  );
}

export default App;