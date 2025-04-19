
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import SpaceBackground from '@/components/SpaceBackground';
import BottomNavigation from '@/components/BottomNavigation';
import { planets } from '@/data/planets';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';

const Planets = () => {
  const { state, buyPlanet, upgradePlanet } = useAppContext();
  const { user } = state;
  
  const handleBuyPlanet = async (planetId: number, cost: number) => {
    if (user.balance < cost) {
      toast({
        title: "عملية غير ناجحة",
        description: "ليس لديك رصيد كافٍ لشراء هذا الكوكب",
        variant: "destructive",
      });
      return;
    }
    
    const success = await buyPlanet(planetId, cost);
    if (success) {
      toast({
        title: "تم الشراء بنجاح",
        description: "تم شراء الكوكب بنجاح",
      });
    }
  };
  
  const handleUpgradePlanet = async (planetId: number, cost: number) => {
    if (user.balance < cost) {
      toast({
        title: "عملية غير ناجحة",
        description: "ليس لديك رصيد كافٍ لترقية هذا الكوكب",
        variant: "destructive",
      });
      return;
    }
    
    const success = await upgradePlanet(planetId, cost);
    if (success) {
      toast({
        title: "تمت الترقية بنجاح",
        description: "تمت ترقية الكوكب بنجاح",
      });
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
            الكواكب
          </h1>
          <p className="text-gray-300">اشتر وقم بترقية الكواكب للحصول على معدل تعدين أعلى!</p>
        </motion.div>
        
        <div className="space-y-6 pb-6">
          {planets.map((planet) => {
            const isPlanetOwned = user.ownedPlanets.includes(planet.id);
            
            return (
              <motion.div 
                key={planet.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 overflow-hidden rounded-full flex-shrink-0">
                    <img 
                      src={planet.imageUrl} 
                      alt={planet.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold">{planet.name}</h3>
                    <p className="text-gray-400 text-sm">{planet.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <div className="bg-gray-800/50 px-3 py-1 rounded-full text-sm">
                        معدل التعدين: +{formatNumber(planet.baseMiningRate)}/دقيقة
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  {isPlanetOwned ? (
                    <Button 
                      onClick={() => handleUpgradePlanet(planet.id, planet.upgradeCost)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      ترقية ({formatNumber(planet.upgradeCost)})
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleBuyPlanet(planet.id, planet.upgradeCost)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      شراء ({formatNumber(planet.upgradeCost)})
                    </Button>
                  )}
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

export default Planets;
