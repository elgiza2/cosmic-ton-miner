
import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import SpaceBackground from '@/components/SpaceBackground';
import BottomNavigation from '@/components/BottomNavigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { planets } from '@/data/planets';
import { formatNumber } from '@/utils/helpers';
import { toast } from 'sonner';

const PlanetsPage = () => {
  const { state, buyPlanet, upgradePlanet } = useAppContext();
  const { user } = state;

  const handleBuyPlanet = async (planetId: number, cost: number) => {
    if (user.balance < cost) {
      toast.error("Insufficient funds", {
        description: "You don't have enough coins to buy this planet."
      });
      return;
    }
    
    const success = await buyPlanet(planetId, cost);
    if (success) {
      toast.success("Planet purchased", {
        description: `You now own a new planet that increases your mining rate!`
      });
    }
  };
  
  const handleUpgradePlanet = async (planetId: number, cost: number) => {
    if (user.balance < cost) {
      toast.error("Insufficient funds", {
        description: "You don't have enough coins to upgrade this planet."
      });
      return;
    }
    
    const success = await upgradePlanet(planetId, cost);
    if (success) {
      toast.success("Planet upgraded", {
        description: "Your planet has been upgraded and produces more coins!"
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
            Cosmic Planets
          </h1>
          <p className="text-gray-300">Upgrade planets to increase mining power</p>
        </motion.div>
        
        <div className="space-y-6">
          {planets.map((planet) => {
            const isOwned = user.ownedPlanets.includes(planet.id);
            const canAfford = user.balance >= planet.cost;
            
            return (
              <motion.div
                key={planet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: planet.id * 0.1 }}
                className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 p-4 relative overflow-hidden"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-purple-900/50 flex items-center justify-center">
                    <span className="text-3xl">{planet.emoji}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xl mb-1">{planet.name}</h3>
                        <p className="text-sm text-gray-400">{planet.description}</p>
                      </div>
                      
                      {isOwned && (
                        <Badge variant="secondary" className="bg-purple-600 text-white">Owned</Badge>
                      )}
                    </div>
                    
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="text-sm text-gray-400">Mining Power</p>
                        <p className="font-semibold">+{planet.miningPower}/min</p>
                      </div>
                      
                      {isOwned ? (
                        <Button
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          onClick={() => handleUpgradePlanet(planet.id, planet.upgradeCost)}
                          disabled={user.balance < planet.upgradeCost}
                        >
                          Upgrade ({formatNumber(planet.upgradeCost)})
                        </Button>
                      ) : (
                        <Button
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          onClick={() => handleBuyPlanet(planet.id, planet.cost)}
                          disabled={!canAfford}
                        >
                          Buy ({formatNumber(planet.cost)})
                        </Button>
                      )}
                    </div>
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

export default PlanetsPage;
