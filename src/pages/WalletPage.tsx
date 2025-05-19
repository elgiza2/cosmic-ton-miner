
import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import SpaceBackground from "../components/SpaceBackground";
import { useAppContext } from "../context/AppContext";

const WalletPage = () => {
  const { state, connectWallet, disconnectWallet } = useAppContext();
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Wallet</h1>
        
        <div className="max-w-md mx-auto mb-20">
          {/* Connect Wallet Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">TON Wallet</h2>
            
            {state.isWalletConnected ? (
              <>
                <p className="text-sm opacity-75 mb-4">
                  Your wallet is connected and ready to use for transactions.
                </p>
                
                <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                  <h3 className="text-sm opacity-75 mb-2">Wallet Address</h3>
                  <p className="font-mono text-xs break-all">
                    {state.user.wallet}
                  </p>
                </div>
                
                <button
                  onClick={disconnectWallet}
                  className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md font-medium transition-colors"
                >
                  Disconnect Wallet
                </button>
              </>
            ) : (
              <>
                <p className="text-sm opacity-75 mb-4">
                  Connect your TON wallet to start mining and earning rewards.
                </p>
                
                <button
                  onClick={connectWallet}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  Connect Wallet
                </button>
              </>
            )}
          </div>
          
          {/* Balance Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Balance</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm opacity-75 mb-1">Space Coins</h3>
                <p className="text-xl font-semibold">{state.user.balance.toFixed(2)} SC</p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm opacity-75 mb-1">Mining Rate</h3>
                <p className="text-xl font-semibold">{state.user.miningRate.toFixed(2)} SC/min</p>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm opacity-75 mb-1">Total Mined</h3>
                <p className="text-xl font-semibold">{state.user.totalMined.toFixed(2)} SC</p>
                <button
                  onClick={() => {}}
                  className="w-full mt-2 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md font-medium transition-colors text-sm"
                >
                  Collect Mining Rewards
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default WalletPage;
