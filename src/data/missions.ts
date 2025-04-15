
import { Mission } from "../types";

export const missions: Mission[] = [
  {
    id: 1,
    title: "Daily Login",
    description: "Login to the app daily to earn Space coins",
    reward: 10,
    isCompleted: false,
    type: "daily"
  },
  {
    id: 2,
    title: "Connect Wallet",
    description: "Connect your TON wallet to the app",
    reward: 50,
    isCompleted: false,
    type: "daily"
  },
  {
    id: 3,
    title: "Deposit 1 TON",
    description: "Deposit 1 TON to receive an airdrop bonus",
    reward: 200,
    isCompleted: false,
    type: "deposit"
  },
  {
    id: 4,
    title: "Invite 3 Friends",
    description: "Invite 3 friends to join using your referral link",
    reward: 100,
    isCompleted: false,
    type: "referral"
  },
  {
    id: 5,
    title: "Upgrade a Planet",
    description: "Upgrade any planet to earn a bonus",
    reward: 75,
    isCompleted: false,
    type: "daily"
  }
];
