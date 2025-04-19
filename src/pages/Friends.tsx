
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import SpaceBackground from '@/components/SpaceBackground';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';
import { Copy, Share, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Friends = () => {
  const { state, setReferredBy } = useAppContext();
  const { user } = state;
  const [referralInput, setReferralInput] = useState('');

  const copyReferralLink = () => {
    const referralLink = `https://t.me/RedXiobot?start=${user.referralCode}`;
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        toast({
          title: "تم النسخ",
          description: "تم نسخ رابط الإحالة إلى الحافظة",
        });
      })
      .catch(err => {
        toast({
          title: "خطأ",
          description: "فشل نسخ الرابط",
          variant: "destructive",
        });
      });
  };
  
  const shareReferralLink = () => {
    const referralLink = `https://t.me/RedXiobot?start=${user.referralCode}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Cosmic TON Miner',
        text: 'انضم إلي في تعدين عملة Space! استخدم رمز الإحالة الخاص بي للحصول على مكافأة:',
        url: referralLink,
      })
      .catch(err => {
        toast({
          title: "خطأ",
          description: "فشل مشاركة الرابط",
          variant: "destructive",
        });
      });
    } else {
      copyReferralLink();
    }
  };
  
  const submitReferralCode = () => {
    if (!referralInput || referralInput === user.referralCode) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رمز إحالة صالح ومختلف عن رمز الإحالة الخاص بك",
        variant: "destructive",
      });
      return;
    }
    
    if (user.referredBy) {
      toast({
        title: "خطأ",
        description: "لقد قمت بإدخال رمز إحالة بالفعل",
        variant: "destructive",
      });
      return;
    }
    
    setReferredBy(referralInput);
    toast({
      title: "تمت الإحالة",
      description: "تم إدخال رمز الإحالة بنجاح",
    });
    setReferralInput('');
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
            دعوة الأصدقاء
          </h1>
          <p className="text-gray-300">ادعُ الأصدقاء واحصل على مكافآت!</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <Users size={48} className="text-purple-500" />
          </div>
          
          <h2 className="text-xl font-bold text-center mb-2">رمز الإحالة الخاص بك</h2>
          <div className="flex items-center bg-gray-800/50 rounded-lg p-2 mb-4">
            <div className="flex-grow text-center font-mono text-lg">
              {user.referralCode}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyReferralLink}
              className="hover:bg-gray-700"
            >
              <Copy size={20} />
            </Button>
          </div>
          
          <Button 
            onClick={shareReferralLink}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mb-4"
          >
            <Share size={18} className="mr-2" /> مشاركة الرابط مع الأصدقاء
          </Button>
          
          <div className="text-center text-sm text-gray-400 mb-2">
            ستحصل على {formatNumber(10)} عند انضمام كل صديق بواسطة الرابط الخاص بك
          </div>
          
          <div className="text-center mb-2">
            <div className="text-sm text-gray-400">عدد المدعوين: {formatNumber(user.referralRewards / 10)}</div>
            <div className="text-sm text-gray-400">إجمالي المكافآت: {formatNumber(user.referralRewards)}</div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6"
        >
          <h2 className="text-xl font-bold text-center mb-4">إدخال رمز الإحالة</h2>
          
          {user.referredBy ? (
            <div className="text-center">
              <p className="text-green-500 mb-2">تم إدخال رمز الإحالة بالفعل</p>
              <div className="bg-gray-800/50 rounded-lg p-2 mb-2">
                <span className="font-mono">{user.referredBy}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="أدخل رمز الإحالة هنا"
                  value={referralInput}
                  onChange={(e) => setReferralInput(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
                <Button 
                  onClick={submitReferralCode}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  إرسال
                </Button>
              </div>
              <p className="text-sm text-gray-400 text-center">
                أدخل رمز إحالة لكسب {formatNumber(5)} فوراً!
              </p>
            </>
          )}
        </motion.div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Friends;
