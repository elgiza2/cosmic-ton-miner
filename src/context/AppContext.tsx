
import React, { createContext, useContext, useState, useEffect } from "react";
import { TonConnectUI } from '@tonconnect/ui';
import WebApp from '@twa-dev/sdk';
import { AppState, TelegramUser, User } from "../types";
import { generateRandomString } from "../utils/helpers";

const generateReferralCode = () => {
  return generateRandomString(8);
};

const initialUser: User = {
  wallet: null,
  balance: 0,
  miningRate: 1,
  lastMiningTime: Date.now(),
  totalMined: 0,
  referralCode: generateReferralCode(),
  referredBy: null,
  referralRewards: 0,
  completedMissions: [],
  ownedPlanets: [1], // Start with Mercury
};

const initialState: AppState = {
  user: initialUser,
  tgUser: null,
  isWalletConnected: false,
  isInitialized: false,
};

export const tonConnectUI = new TonConnectUI({
  manifestUrl: 'https://' + window.location.host + '/tonconnect-manifest.json',
  buttonRootId: 'ton-connect-button',
});

const walletAddress = localStorage.getItem("wallet");

export const AppContext = createContext<{
  state: AppState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  upgradePlanet: (planetId: number, cost: number) => Promise<boolean>;
  collectMining: () => void;
  completeMission: (missionId: number) => void;
  buyPlanet: (planetId: number, cost: number) => Promise<boolean>;
  setReferredBy: (referralCode: string) => void;
}>({
  state: initialState,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  upgradePlanet: async () => false,
  collectMining: () => {},
  completeMission: () => {},
  buyPlanet: async () => false,
  setReferredBy: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  // Connect to Telegram WebApp
  useEffect(() => {
    try {
      if (WebApp.initDataUnsafe?.user) {
        const user = WebApp.initDataUnsafe.user;
        setState(prev => ({
          ...prev,
          tgUser: user as TelegramUser
        }));
      }
    } catch (error) {
      console.error("Error connecting to Telegram WebApp:", error);
    }
    
    // Initialize from localStorage if available
    try {
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        setState(prev => ({
          ...prev,
          user: userData,
          isInitialized: true
        }));
      }
    } catch (e) {
      console.error('Failed to parse saved user data:', e);
    }

    setState(prev => ({
      ...prev,
      isInitialized: true
    }));
    
    // TonConnect wallet listener
    try {
      tonConnectUI.onStatusChange(wallet => {
        if (wallet) {
          setState(prev => ({
            ...prev,
            isWalletConnected: true,
            user: {
              ...prev.user,
              wallet: wallet.account.address,
            }
          }));
        } else {
          setState(prev => ({
            ...prev,
            isWalletConnected: false,
            user: {
              ...prev.user,
              wallet: null,
            }
          }));
        }
      });
    } catch (error) {
      console.error("Error setting up TON Connect:", error);
    }
    
  }, []);

  // Save user data to localStorage when it changes
  useEffect(() => {
    if (state.isInitialized) {
      try {
        localStorage.setItem('userData', JSON.stringify(state.user));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [state.user, state.isInitialized]);
  
  // Calculate mining earnings every second instead of every 5 seconds for smoother experience
  useEffect(() => {
    const miningInterval = setInterval(() => {
      if (state.isInitialized) {
        const currentTime = Date.now();
        const timeDiff = (currentTime - state.user.lastMiningTime) / 1000; // time in seconds
        const earned = (timeDiff * state.user.miningRate) / 60; // earnings per minute
        
        setState(prev => ({
          ...prev,
          user: {
            ...prev.user,
            lastMiningTime: currentTime,
            totalMined: prev.user.totalMined + earned
          }
        }));
      }
    }, 1000);
    
    return () => clearInterval(miningInterval);
  }, [state.user.miningRate, state.user.lastMiningTime, state.isInitialized]);
  
  const connectWallet = async () => {
    tonConnectUI.openModal();
  };
  
  const disconnectWallet = () => {
    tonConnectUI.disconnect();
  };
  
  const upgradePlanet = async (planetId: number, cost: number): Promise<boolean> => {
    try {
      if (!state.isWalletConnected) {
        // Allow upgrading even if wallet is not connected, for better user experience
        if (state.user.balance < cost) {
          return false;
        }
        
        setState(prev => {
          const updatedUser = {
            ...prev.user,
            balance: prev.user.balance - cost,
            miningRate: prev.user.miningRate + 1, // Increase mining rate
          };
          
          return {
            ...prev,
            user: updatedUser
          };
        });
        
        return true;
      }
      
      // For wallet-connected users, implement TON transaction here
      // For now, simulate successful transaction
      
      if (state.user.balance < cost) {
        return false;
      }
      
      setState(prev => {
        const updatedUser = {
          ...prev.user,
          balance: prev.user.balance - cost,
          miningRate: prev.user.miningRate + 1, // Increase mining rate
        };
        
        return {
          ...prev,
          user: updatedUser
        };
      });
      
      return true;
    } catch (e) {
      console.error('Error upgrading planet:', e);
      return false;
    }
  };
  
  const collectMining = () => {
    if (state.user.totalMined <= 0) return;
    
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        balance: prev.user.balance + prev.user.totalMined,
        totalMined: 0,
        lastMiningTime: Date.now()
      }
    }));
  };
  
  const completeMission = (missionId: number) => {
    if (!state.user.completedMissions.includes(missionId)) {
      setState(prev => ({
        ...prev,
        user: {
          ...prev.user,
          completedMissions: [...prev.user.completedMissions, missionId],
        }
      }));
    }
  };
  
  const buyPlanet = async (planetId: number, cost: number): Promise<boolean> => {
    try {
      if (!state.isWalletConnected) {
        alert('Please connect your wallet first');
        return false;
      }
      
      if (state.user.ownedPlanets.includes(planetId)) {
        alert('You already own this planet');
        return false;
      }
      
      // Here you would implement the TON transaction logic
      
      // Simulate successful purchase
      setState(prev => ({
        ...prev,
        user: {
          ...prev.user,
          ownedPlanets: [...prev.user.ownedPlanets, planetId],
          miningRate: prev.user.miningRate + 2, // Increase mining rate
        }
      }));
      
      return true;
    } catch (e) {
      console.error('Error buying planet:', e);
      return false;
    }
  };
  
  const setReferredBy = (referralCode: string) => {
    if (!state.user.referredBy && referralCode !== state.user.referralCode) {
      setState(prev => ({
        ...prev,
        user: {
          ...prev.user,
          referredBy: referralCode,
        }
      }));
    }
  };
  
  return (
    <AppContext.Provider
      value={{
        state,
        connectWallet,
        disconnectWallet,
        upgradePlanet,
        collectMining,
        completeMission,
        buyPlanet,
        setReferredBy,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
