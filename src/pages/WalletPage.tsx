
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import SpaceBackground from '@/components/SpaceBackground';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { formatLargeNumber, formatNumber } from '@/utils/helpers';
import { Wallet, ExternalLink, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const WalletPage = () => {
  const { state, connectWallet, disconnectWallet } = useAppContext();
  const { user, isWalletConnected } = state;
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  const handleConnectWallet = () => {
    connectWallet();
  };
  
  const handleDisconnectWallet = () => {
    disconnectWallet();
  };
  
  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (amount > user.balance) {
      toast.error("Insufficient balance");
      return;
    }
    
    // For now, just show a toast - in a real app, this would call a contract
    toast.success("Withdrawal requested", {
      description: `${formatNumber(amount)} coins will be sent to your wallet soon.`
    });
    setWithdrawAmount('');
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
            TON Wallet
          </h1>
          <p className="text-gray-300">Connect your wallet to withdraw rewards</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-900/50 flex items-center justify-center">
              <Wallet size={40} className="text-purple-400" />
            </div>
          </div>
          
          <div className="mb-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Available Balance</p>
              <p className="text-3xl font-bold mb-2">{formatNumber(user.balance)}</p>
              <p className="text-xs text-gray-500">{formatLargeNumber(user.balance)} space coins</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {!isWalletConnected ? (
              <Button 
                onClick={handleConnectWallet}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
              >
                Connect TON Wallet
              </Button>
            ) : (
              <div>
                <div className="p-4 bg-gray-800/50 rounded-lg mb-4">
                  <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
                  <div className="flex items-center">
                    <p className="text-sm font-mono truncate">{user.wallet || "Not connected"}</p>
                    <a 
                      href={`https://tonviewer.com/${user.wallet}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-2 text-purple-400 hover:text-purple-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
                    disabled
                  >
                    <ArrowDownToLine className="mr-2" size={18} /> Deposit
                  </Button>
                  
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
                    onClick={() => document.getElementById('withdraw-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <ArrowUpFromLine className="mr-2" size={18} /> Withdraw
                  </Button>
                </div>
                
                <Button 
                  onClick={handleDisconnectWallet}
                  variant="outline"
                  className="w-full border-gray-700 text-gray-400 hover:text-white"
                >
                  Disconnect Wallet
                </Button>
              </div>
            )}
          </div>
        </motion.div>
        
        {isWalletConnected && (
          <motion.div 
            id="withdraw-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
            <p className="text-sm text-gray-400 mb-4">
              Convert your space coins to TON and withdraw to your wallet
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Amount to withdraw</label>
                <div className="flex space-x-2">
                  <Input 
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                  <Button 
                    onClick={() => setWithdrawAmount(user.balance.toString())}
                    variant="outline" 
                    className="border-gray-700"
                  >
                    MAX
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={handleWithdraw}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > user.balance}
              >
                Withdraw to Wallet
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Minimum withdrawal: 100 space coins. Fee: 1%
              </p>
            </div>
          </motion.div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default WalletPage;
