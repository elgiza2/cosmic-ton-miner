
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { tonConnectUI } from '@/context/AppContext';
import SpaceBackground from '@/components/SpaceBackground';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/helpers';
import { Wallet as WalletIcon, ExternalLink } from 'lucide-react';

const Wallet = () => {
  const { state, connectWallet, disconnectWallet } = useAppContext();
  const { user, isWalletConnected } = state;
  
  const openTonViewer = () => {
    if (user.wallet) {
      window.open(`https://tonviewer.com/${user.wallet}`, '_blank');
    }
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
            المحفظة
          </h1>
          <p className="text-gray-300">إدارة محفظتك وإيداع TON</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <WalletIcon size={48} className="text-blue-500" />
          </div>
          
          <h2 className="text-xl font-bold text-center mb-6">محفظة TON</h2>
          
          {isWalletConnected ? (
            <>
              <div className="mb-6">
                <div className="text-center text-sm text-gray-400 mb-2">عنوان المحفظة</div>
                <div className="bg-gray-800/50 rounded-lg p-3 flex items-center justify-between">
                  <div className="font-mono text-sm truncate">
                    {user.wallet}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={openTonViewer}
                    className="hover:bg-gray-700"
                  >
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">رصيد المحفظة</p>
                  <p className="text-xl font-bold">؟؟ TON</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">رصيد اللعبة</p>
                  <p className="text-xl font-bold">{formatNumber(user.balance)}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-center">إيداع TON</h3>
                <div className="text-center text-sm text-gray-400 mb-3">
                  للحصول على مكافأة الإيداع، يرجى إيداع TON على العنوان التالي:
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 mb-3 text-center">
                  <div className="font-mono text-sm break-all">
                    UQCiVNm22dMF9S3YsHPcgrmqXEQHt4MIdk_N7VJu88NrLr4R
                  </div>
                </div>
                <div className="text-center text-xs text-gray-400">
                  بعد الإيداع، اذهب إلى صفحة المهام وأكمل مهمة الإيداع للحصول على المكافأة
                </div>
              </div>
              
              <Button 
                onClick={disconnectWallet}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                فصل المحفظة
              </Button>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-400 mb-4">قم بربط محفظة TON للوصول إلى جميع الميزات</p>
              </div>
              
              <Button 
                onClick={connectWallet}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                ربط المحفظة
              </Button>
            </>
          )}
        </motion.div>
        
        <div id="ton-connect-button" className="hidden"></div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Wallet;
