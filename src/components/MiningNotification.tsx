
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '@/utils/helpers';

interface MiningNotificationProps {
  amount: number;
  onComplete?: () => void;
}

const MiningNotification: React.FC<MiningNotificationProps> = ({ amount, onComplete }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          <div className="flex items-center">
            <span className="text-yellow-300 mr-2">+</span>
            <span className="font-bold">{formatNumber(amount)}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiningNotification;
