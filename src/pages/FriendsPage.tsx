
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import SpaceBackground from '@/components/SpaceBackground';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Users } from 'lucide-react';
import { toast } from 'sonner';
import { formatNumber } from '@/utils/helpers';

const FriendsPage = () => {
  const { state, setReferredBy } = useAppContext();
  const { user } = state;
  const [referralCode, setReferralCode] = useState('');

  const copyReferralLink = () => {
    const referralUrl = `${window.location.origin}?ref=${user.referralCode}`;
    navigator.clipboard.writeText(referralUrl);
    toast.success('Referral link copied to clipboard!');
  };
  
  const shareReferralLink = () => {
    const referralUrl = `${window.location.origin}?ref=${user.referralCode}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join me on Cosmic TON Miner',
        text: 'Mine Space coins and earn rewards together!',
        url: referralUrl,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      copyReferralLink();
    }
  };
  
  const handleSetReferral = () => {
    if (!referralCode) {
      toast.error("Please enter a referral code");
      return;
    }
    
    if (referralCode === user.referralCode) {
      toast.error("You cannot use your own referral code");
      return;
    }
    
    if (user.referredBy) {
      toast.error("You have already used a referral code");
      return;
    }
    
    setReferredBy(referralCode);
    toast.success("Referral code applied!");
    setReferralCode('');
  };

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
            Invite Friends
          </h1>
          <p className="text-gray-300">Share and earn rewards together</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-purple-400" />
            </div>
            <h2 className="text-xl font-bold mb-1">Your Referral Program</h2>
            <p className="text-sm text-gray-400 mb-4">
              Share your referral code with friends and earn 10% of their mining rewards
            </p>
            
            <div className="p-3 bg-gray-800/50 rounded-lg mb-4">
              <p className="text-sm text-gray-400">Your Referral Code</p>
              <div className="flex items-center justify-center">
                <p className="text-xl font-mono font-bold tracking-wider">{user.referralCode}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2 text-gray-400 hover:text-white"
                  onClick={copyReferralLink}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Total Earnings</p>
                <p className="text-xl font-bold">{formatNumber(user.referralRewards)}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Referred By</p>
                <p className="text-xl font-bold">{user.referredBy || "None"}</p>
              </div>
            </div>
            
            <Button 
              onClick={shareReferralLink}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Share2 size={18} className="mr-2" /> Share Referral Link
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6"
        >
          <h2 className="text-xl font-bold mb-4">Enter a Referral Code</h2>
          
          {user.referredBy ? (
            <div className="text-center">
              <p className="mb-2">You were referred by:</p>
              <div className="p-3 bg-gray-800/50 rounded-lg mb-4">
                <p className="text-xl font-mono font-bold tracking-wider">{user.referredBy}</p>
              </div>
              <p className="text-sm text-gray-400">
                You're earning bonus rewards thanks to this referral!
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-400 mb-4">
                Enter a friend's referral code to get started with a bonus!
              </p>
              <div className="flex space-x-4">
                <Input
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter referral code"
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
                <Button 
                  onClick={handleSetReferral}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default FriendsPage;
