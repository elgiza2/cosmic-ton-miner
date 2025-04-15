
export interface Planet {
  id: number;
  name: string;
  level: number;
  baseMiningRate: number;
  upgradeCost: number;
  imageUrl: string;
  description: string;
  upgradeMultiplier: number;
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  reward: number;
  isCompleted: boolean;
  type: 'daily' | 'deposit' | 'referral';
}

export interface User {
  wallet: string | null;
  balance: number;
  miningRate: number;
  lastMiningTime: number;
  totalMined: number;
  referralCode: string;
  referredBy: string | null;
  referralRewards: number;
  completedMissions: number[];
  ownedPlanets: number[];
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface AppState {
  user: User;
  tgUser: TelegramUser | null;
  isWalletConnected: boolean;
  isInitialized: boolean;
}
