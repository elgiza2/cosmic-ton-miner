
import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import SpaceBackground from "../components/SpaceBackground";
import { useAppContext } from "../context/AppContext";
import { missions } from "../data/missions";

const MissionsPage = () => {
  const { state, completeMission } = useAppContext();
  
  // Check if a mission has been completed
  const isMissionCompleted = (missionId: number) => {
    return state.user.completedMissions.includes(missionId);
  };
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Missions</h1>
        
        <div className="max-w-md mx-auto mb-20">
          {/* Daily Missions */}
          <h2 className="text-xl font-semibold mb-4">Daily Missions</h2>
          {missions
            .filter((mission) => mission.type === "daily")
            .map((mission) => (
              <div 
                key={mission.id} 
                className={`mb-4 rounded-lg overflow-hidden border ${
                  isMissionCompleted(mission.id) 
                    ? "border-green-500" 
                    : "border-gray-700"
                }`}
              >
                <div className="p-4 bg-gray-800/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-1">{mission.title}</h3>
                  <p className="text-sm opacity-75 mb-3">{mission.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="text-yellow-400 mr-1">+{mission.reward}</span>
                      <span className="text-sm">SC</span>
                    </span>
                    
                    {isMissionCompleted(mission.id) ? (
                      <div className="px-3 py-1 bg-green-600 rounded text-sm">
                        Completed
                      </div>
                    ) : (
                      <button
                        onClick={() => completeMission(mission.id)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
          {/* Deposit Missions */}
          <h2 className="text-xl font-semibold mb-4 mt-8">Deposit Missions</h2>
          {missions
            .filter((mission) => mission.type === "deposit")
            .map((mission) => (
              <div 
                key={mission.id} 
                className={`mb-4 rounded-lg overflow-hidden border ${
                  isMissionCompleted(mission.id) 
                    ? "border-green-500" 
                    : "border-gray-700"
                }`}
              >
                <div className="p-4 bg-gray-800/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-1">{mission.title}</h3>
                  <p className="text-sm opacity-75 mb-3">{mission.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="text-yellow-400 mr-1">+{mission.reward}</span>
                      <span className="text-sm">SC</span>
                    </span>
                    
                    {isMissionCompleted(mission.id) ? (
                      <div className="px-3 py-1 bg-green-600 rounded text-sm">
                        Completed
                      </div>
                    ) : (
                      <button
                        onClick={() => {}} // This would connect to deposit functionality
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                        disabled={!state.isWalletConnected}
                      >
                        Deposit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
          {/* Referral Missions */}
          <h2 className="text-xl font-semibold mb-4 mt-8">Referral Missions</h2>
          {missions
            .filter((mission) => mission.type === "referral")
            .map((mission) => (
              <div 
                key={mission.id} 
                className={`mb-4 rounded-lg overflow-hidden border ${
                  isMissionCompleted(mission.id) 
                    ? "border-green-500" 
                    : "border-gray-700"
                }`}
              >
                <div className="p-4 bg-gray-800/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-1">{mission.title}</h3>
                  <p className="text-sm opacity-75 mb-3">{mission.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="text-yellow-400 mr-1">+{mission.reward}</span>
                      <span className="text-sm">SC</span>
                    </span>
                    
                    {isMissionCompleted(mission.id) ? (
                      <div className="px-3 py-1 bg-green-600 rounded text-sm">
                        Completed
                      </div>
                    ) : (
                      <div className="text-sm opacity-75">In Progress</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default MissionsPage;
