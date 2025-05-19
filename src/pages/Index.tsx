
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import SpaceBackground from '@/components/SpaceBackground';
import BottomNavigation from '@/components/BottomNavigation';
import { formatLargeNumber, formatNumber } from '@/utils/helpers';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { state, collectMining } = useAppContext();
  const { user } = state;
  
  return (
    <div className="min-h-screen text-white pb-20">
      <SpaceBackground />
      
      <div className="container mx-auto px-4 pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mb-2">
            Cosmic TON Miner
          </h1>
          <p className="text-gray-300">Mine space coins by upgrading planets!</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-400 text-sm">Mining Rate</p>
              <p className="text-2xl font-bold">{formatNumber(user.miningRate)}/min</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Balance</p>
              <p className="text-2xl font-bold">{formatNumber(user.balance)}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-400 text-sm">Current Mining</p>
              <p className="text-lg font-semibold">{formatNumber(user.totalMined)}</p>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" 
                style={{ width: `${Math.min(user.totalMined % 100, 100)}%` }}
              />
            </div>
            <Button 
              onClick={collectMining}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              disabled={user.totalMined <= 0}
            >
              Collect Mining Rewards
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4">Mining Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Mined</p>
              <p className="text-xl font-bold">{formatLargeNumber(user.balance + user.totalMined)}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Owned Planets</p>
              <p className="text-xl font-bold">{user.ownedPlanets.length}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Completed Missions</p>
              <p className="text-xl font-bold">{user.completedMissions.length}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Referral Rewards</p>
              <p className="text-xl font-bold">{formatNumber(user.referralRewards)}</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
