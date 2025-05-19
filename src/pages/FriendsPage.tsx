
import React, { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import SpaceBackground from "../components/SpaceBackground";
import { useAppContext } from "../context/AppContext";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const FriendsPage = () => {
  const { state, setReferredBy } = useAppContext();
  const [referralCode, setReferralCode] = useState("");
  
  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (referralCode.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a referral code",
        variant: "destructive",
      });
      return;
    }
    
    if (referralCode === state.user.referralCode) {
      toast({
        title: "Error",
        description: "You cannot use your own referral code",
        variant: "destructive",
      });
      return;
    }
    
    if (state.user.referredBy) {
      toast({
        title: "Error",
        description: "You have already used a referral code",
        variant: "destructive",
      });
      return;
    }
    
    setReferredBy(referralCode);
    
    toast({
      title: "Success",
      description: "Referral code applied successfully",
    });
  };
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SpaceBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Friends</h1>
        
        <div className="max-w-md mx-auto mb-20">
          {/* Your Referral Code */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Referral Code</h2>
            <p className="text-sm opacity-75 mb-4">
              Share this code with friends. You'll both receive rewards when they join!
            </p>
            
            <div className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
              <span className="font-mono">{state.user.referralCode}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(state.user.referralCode);
                  toast({ title: "Copied to clipboard" });
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
          
          {/* Enter Referral Code */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Enter a Referral Code</h2>
            
            {state.user.referredBy ? (
              <div className="bg-green-600/20 border border-green-600 rounded-lg p-4 text-center">
                <p className="mb-2">You've already used a referral code</p>
                <p className="font-mono text-sm">{state.user.referredBy}</p>
              </div>
            ) : (
              <form onSubmit={handleReferralSubmit}>
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder="Enter referral code"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md font-medium transition-colors"
                >
                  Apply Code
                </button>
              </form>
            )}
          </div>
          
          {/* Stats */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Referral Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm opacity-75 mb-1">Rewards Earned</h3>
                <p className="text-xl font-semibold">{state.user.referralRewards.toFixed(2)} SC</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm opacity-75 mb-1">Friends Invited</h3>
                <p className="text-xl font-semibold">0</p> {/* This would be dynamic in a real app */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default FriendsPage;
