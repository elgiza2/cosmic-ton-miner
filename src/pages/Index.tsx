
import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import SpaceBackground from "../components/SpaceBackground";
import { useAppContext } from "../context/AppContext";

const Index = () => {
  const { state, collectMining } = useAppContext();
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Cosmic TON Miner</h1>
        
        <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Mining Status</h2>
            <div className="text-sm opacity-75">
              Rate: {state.user.miningRate.toFixed(2)}/min
            </div>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span>Total Mined:</span>
              <span className="font-mono">{state.user.totalMined.toFixed(2)} SC</span>
            </div>
            <button
              onClick={collectMining}
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md font-medium transition-colors"
            >
              Collect Mining Rewards
            </button>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span>Balance:</span>
              <span className="font-mono">{state.user.balance.toFixed(2)} SC</span>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-20">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-sm opacity-75 mb-1">Owned Planets</h3>
            <p className="text-xl font-semibold">{state.user.ownedPlanets.length}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-sm opacity-75 mb-1">Completed Missions</h3>
            <p className="text-xl font-semibold">{state.user.completedMissions.length}</p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
