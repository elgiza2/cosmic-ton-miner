
import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import SpaceBackground from "../components/SpaceBackground";
import { useAppContext } from "../context/AppContext";
import { planets } from "../data/planets";

const PlanetsPage = () => {
  const { state, upgradePlanet, buyPlanet } = useAppContext();
  
  // Function to check if a planet is owned
  const isPlanetOwned = (planetId: number) => {
    return state.user.ownedPlanets.includes(planetId);
  };
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Planets</h1>
        
        <div className="max-w-md mx-auto mb-20">
          {planets.map((planet) => (
            <div 
              key={planet.id} 
              className={`mb-4 rounded-lg overflow-hidden border ${
                isPlanetOwned(planet.id) 
                  ? "border-purple-500" 
                  : "border-gray-700"
              }`}
            >
              <div className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm">
                <div className="mr-4 text-2xl">{planet.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{planet.name}</h3>
                  <p className="text-sm opacity-75">{planet.description}</p>
                </div>
                {isPlanetOwned(planet.id) && (
                  <div className="px-2 py-1 bg-purple-600 rounded text-xs">
                    Owned
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gray-900/50">
                {isPlanetOwned(planet.id) ? (
                  <>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Current Level:</span>
                      <span>{planet.level}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Mining Power:</span>
                      <span>{planet.miningPower} SC/min</span>
                    </div>
                    <div className="flex justify-between mb-4 text-sm">
                      <span>Next Level Cost:</span>
                      <span>{planet.upgradeCost.toFixed(2)} TON</span>
                    </div>
                    
                    <button
                      onClick={() => upgradePlanet(planet.id, planet.upgradeCost)}
                      className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md font-medium transition-colors"
                      disabled={!state.isWalletConnected}
                    >
                      Upgrade Planet
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Mining Power:</span>
                      <span>{planet.miningPower} SC/min</span>
                    </div>
                    <div className="flex justify-between mb-4 text-sm">
                      <span>Purchase Cost:</span>
                      <span>{planet.cost.toFixed(2)} SC</span>
                    </div>
                    
                    <button
                      onClick={() => buyPlanet(planet.id, planet.cost)}
                      className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md font-medium transition-colors"
                      disabled={!state.isWalletConnected || state.user.balance < planet.cost}
                    >
                      {state.user.balance < planet.cost ? "Insufficient Funds" : "Buy Planet"}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PlanetsPage;
