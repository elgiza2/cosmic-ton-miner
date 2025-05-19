
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import SpaceBackground from '@/components/SpaceBackground';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { missions } from '@/data/missions';
import { formatNumber } from '@/utils/helpers';
import { Check, Clock, Target } from 'lucide-react';
import { toast } from 'sonner';

const MissionsPage = () => {
  const { state, completeMission } = useAppContext();
  const { user } = state;
  
  const handleCompleteMission = (missionId: number, reward: number) => {
    completeMission(missionId);
    toast.success("Mission Completed!", { 
      description: `You earned ${formatNumber(reward)} coins!` 
    });
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
            Space Missions
          </h1>
          <p className="text-gray-300">Complete missions to earn rewards</p>
        </motion.div>
        
        <div className="space-y-6">
          {missions.map((mission) => {
            const isCompleted = user.completedMissions.includes(mission.id);
            
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: mission.id * 0.1 }}
                className={`bg-black/70 backdrop-blur-md rounded-xl border ${
                  isCompleted ? 'border-green-500/30' : 'border-white/10'
                } p-5 relative overflow-hidden`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full ${
                      isCompleted ? 'bg-green-500/20' : 'bg-purple-900/50'
                    } flex items-center justify-center`}>
                      {isCompleted ? (
                        <Check className="text-green-500" size={24} />
                      ) : (
                        <Target className="text-purple-400" size={24} />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-bold text-xl">{mission.title}</h3>
                        <Badge 
                          variant="secondary" 
                          className={`ml-2 ${
                            mission.type === 'daily' ? 'bg-blue-600' : 
                            mission.type === 'deposit' ? 'bg-amber-600' : 'bg-purple-600'
                          } text-white`}
                        >
                          {mission.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{mission.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Reward</p>
                    <p className="font-bold text-amber-400">{formatNumber(mission.reward)}</p>
                    
                    {isCompleted ? (
                      <Badge className="mt-2 bg-green-600 text-white">Completed</Badge>
                    ) : (
                      <Button
                        className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        onClick={() => handleCompleteMission(mission.id, mission.reward)}
                      >
                        {mission.type === 'daily' ? (
                          <><Clock size={16} className="mr-1" /> Complete</>
                        ) : (
                          'Complete'
                        )}
                      </Button>
                    )}
                  </div>
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

export default MissionsPage;
