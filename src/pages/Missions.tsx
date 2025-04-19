
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import SpaceBackground from '@/components/SpaceBackground';
import BottomNavigation from '@/components/BottomNavigation';
import { missions } from '@/data/missions';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';
import { Target, Trophy, Wallet } from 'lucide-react';

const Missions = () => {
  const { state, completeMission } = useAppContext();
  const { user } = state;
  
  const handleCompleteMission = (missionId: number) => {
    if (user.completedMissions.includes(missionId)) {
      toast({
        title: "مهمة مكتملة بالفعل",
        description: "لقد أكملت هذه المهمة بالفعل",
      });
      return;
    }
    
    completeMission(missionId);
    toast({
      title: "تم إكمال المهمة",
      description: "تم إكمال المهمة بنجاح وإضافة المكافأة",
    });
  };
  
  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Target className="w-8 h-8 text-green-500" />;
      case 'deposit':
        return <Wallet className="w-8 h-8 text-blue-500" />;
      case 'referral':
        return <Trophy className="w-8 h-8 text-yellow-500" />;
      default:
        return <Target className="w-8 h-8 text-purple-500" />;
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
            المهام
          </h1>
          <p className="text-gray-300">أكمل المهام للحصول على مكافآت!</p>
        </motion.div>
        
        <div className="space-y-4 pb-6">
          {missions.map((mission) => {
            const isCompleted = user.completedMissions.includes(mission.id);
            
            return (
              <motion.div 
                key={mission.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: mission.id * 0.1 }}
                className={`bg-black/70 backdrop-blur-md rounded-xl border ${
                  isCompleted ? 'border-green-500/30' : 'border-white/10'
                } p-6`}
              >
                <div className="flex items-center gap-4">
                  {getMissionIcon(mission.type)}
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold">{mission.title}</h3>
                    <p className="text-gray-400 text-sm">{mission.description}</p>
                    <div className="mt-2">
                      <div className="bg-gray-800/50 px-3 py-1 rounded-full text-sm inline-block">
                        مكافأة: {formatNumber(mission.reward)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button 
                    onClick={() => handleCompleteMission(mission.id)}
                    className={`w-full ${
                      isCompleted 
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    }`}
                    disabled={isCompleted}
                  >
                    {isCompleted ? 'مكتمل' : 'إكمال المهمة'}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Missions;
