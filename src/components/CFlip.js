import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contractABI from '../abi/cflip.json';
import entropyABI from '../abi/IEntropy.json';

const CFlip = () => {
  const [betAmount, setBetAmount] = useState(0.001);
  const [countAmount, setCountAmount] = useState(1);
  const [stopGain, setStopGain] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const contractAddress = '0x8ba325381f88bB13330288a0Bb9f1EB4b1b4f203';
  const entropyAddress = '0x549Ebba8036Ab746611B4fFA1423eb0A4Df61440';
  const entropyProvider = '0x6CC14824Ea2918f5De5C2f75A9Da968ad4BD6344';

  useEffect(() => {
    const initializeEthers = async () => {
      if (window.ethereum) {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const _wss = new ethers.providers.WebSocketProvider('wss://arb-sepolia.g.alchemy.com/v2/qAhnKdBWG7s4kjLfrPPzdp7qEdoQNVM3');
        setProvider(_provider);

        const _signer = _provider.getSigner();
        setSigner(_signer);

        try {
          const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (currentChainId !== "0x66eee") {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x66eee" }],
              });
            } catch (switchError) {
              if (switchError.code === 4902) {
                try {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainId: "0x66eee",
                        chainName: 'Arbitrum Sepolia',
                        nativeCurrency: {
                          name: 'Ethereum',
                          symbol: 'ETH',
                          decimals: 18,
                        },
                        rpcUrls: ['https://endpoints.omniatech.io/v1/arbitrum/sepolia/public'],
                        blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
                      },
                    ],
                  });
                } catch (addError) {
                  console.error(addError);
                  toast.error('Failed to add the network.');
                }
              } else {
                console.error(switchError);
                toast.error('Failed to switch the network.');
              }
            }
          }

          await window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
              setAccount(accounts[0]);

              const contract = new ethers.Contract(contractAddress, contractABI, _wss);
              contract.on('GameResult', handleGameResult);
            })
            .catch(error => {
              console.error(error);
              toast.error('Failed to connect to MetaMask.');
            });
        } catch (error) {
          console.error(error);
          toast.error('An error occurred during network switch or account request.');
        }
      } else {
        toast.error('Please install MetaMask!');
      }
    };

    initializeEthers();
  }, []);
  
  const handleGameResult = (player, won, payout) => {
    console.log("HENLO")
      console.log("GameResult event:", { player, won, payout });
      console.log((player.toString()).toLowerCase() === (account.toString()).toLowerCase())
      if (account && (player.toString()).toLowerCase() === (account.toString()).toLowerCase()) {
        if (won) {
          toast.success(`You won! Payout: ${ethers.utils.formatEther(payout)} ETH`);
        } else {
          toast.error('You lost the bet.');
        }
      }
    };

  const startGame = async () => {
    if (!window.ethereum || !account) {
      toast.error('Please install MetaMask!');
      return;
    }

    console.log(account)
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const entropyContract = new ethers.Contract(entropyAddress, entropyABI, signer);
      const _fee = await entropyContract.getFee(entropyProvider);

      const totalBetAmount = ethers.utils.parseEther(betAmount.toString());
      const betAmountWithFee = totalBetAmount.mul(countAmount).add(_fee);
      const userRandomNumber = ethers.utils.keccak256(ethers.utils.randomBytes(32));

      const gameData = ethers.utils.defaultAbiCoder.encode(
        ['uint256', 'uint256'],
        [ethers.utils.parseEther(stopGain.toString()), ethers.utils.parseEther(stopLoss.toString())]
      );

      const transaction = await contract.startGame(
        countAmount,
        gameData,
        totalBetAmount,
        ethers.constants.AddressZero,
        userRandomNumber,
        { value: betAmountWithFee }
      );

      await transaction.wait();
      toast.success('Bet placed successfully!');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Coin Flip</h2>
        <h2 className="text-2xl mb-4">на поле играет {account}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bet Amount (ETH)</label>
          <input
            type="text"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bet Count</label>
          <input
            type="text"
            value={countAmount}
            onChange={(e) => setCountAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Stop Gain (ETH)</label>
          <input
            type="text"
            value={stopGain}
            onChange={(e) => setStopGain(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Stop Loss (ETH)</label>
          <input
            type="text"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={startGame}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Place Bet
        </button>
      </div>
    </div>
  );
};

export default CFlip;
