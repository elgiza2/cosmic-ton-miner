
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import SpaceBackground from '@/components/SpaceBackground';
import BottomNavigation from '@/components/BottomNavigation';
import { formatLargeNumber, formatNumber } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const { state, collectMining } = useAppContext();
  const { user } = state;
  
  // Check if mining is ready to collect (more than 10 units)
  const isMiningReady = user.totalMined >= 10;
  
  const handleCollectMining = () => {
    if (user.totalMined <= 0) {
      toast({
        title: "لا توجد موارد كافية",
        description: "انتظر حتى يتم تعدين المزيد من العملات",
        variant: "destructive",
      });
      return;
    }
    
    collectMining();
    toast({
      title: "تم التجميع بنجاح",
      description: `تم إضافة ${formatNumber(user.totalMined)} إلى رصيدك`,
    });
  };

  // Animation variants for UI elements
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
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
            Cosmic TON Miner
          </h1>
          <p className="text-gray-300">تعدين عملات الفضاء بترقية الكواكب!</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-400 text-sm">معدل التعدين</p>
              <p className="text-2xl font-bold">{formatNumber(user.miningRate)}/دقيقة</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">الرصيد</p>
              <p className="text-2xl font-bold">{formatNumber(user.balance)}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-400 text-sm">التعدين الحالي</p>
              <p className="text-lg font-semibold">{formatNumber(user.totalMined)}</p>
            </div>
            <div className="relative w-full bg-gray-800 rounded-full h-3 mb-4 overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" 
                style={{ width: `${Math.min(user.totalMined % 100, 100)}%` }}
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(user.totalMined % 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <Button 
              onClick={handleCollectMining}
              className={`w-full transition-all duration-300 ${
                isMiningReady 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 animate-pulse' 
                  : 'bg-gradient-to-r from-purple-600/60 to-pink-600/60'
              } text-white`}
              disabled={user.totalMined <= 0}
            >
              تجميع مكافآت التعدين
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4">إحصائيات التعدين</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={itemVariant} className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">إجمالي التعدين</p>
              <p className="text-xl font-bold">{formatLargeNumber(user.balance + user.totalMined)}</p>
            </motion.div>
            <motion.div variants={itemVariant} className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">الكواكب المملوكة</p>
              <p className="text-xl font-bold">{user.ownedPlanets.length}</p>
            </motion.div>
            <motion.div variants={itemVariant} className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">المهام المكتملة</p>
              <p className="text-xl font-bold">{user.completedMissions.length}</p>
            </motion.div>
            <motion.div variants={itemVariant} className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">مكافآت الإحالة</p>
              <p className="text-xl font-bold">{formatNumber(user.referralRewards)}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
