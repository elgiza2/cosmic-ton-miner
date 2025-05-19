
import { Planet } from "../types";

export const planets: Planet[] = [
  {
    id: 1,
    name: "Mercury",
    level: 1,
    baseMiningRate: 1,
    upgradeCost: 0.1,
    imageUrl: "/planets/mercury.png",
    description: "The smallest and innermost planet in the Solar System.",
    upgradeMultiplier: 1.5,
    cost: 0,
    emoji: "🪐",
    miningPower: 1
  },
  {
    id: 2,
    name: "Venus",
    level: 1,
    baseMiningRate: 2,
    upgradeCost: 0.25,
    imageUrl: "/planets/venus.png",
    description: "The second planet from the Sun, known for its thick atmosphere.",
    upgradeMultiplier: 1.7,
    cost: 50,
    emoji: "🪐",
    miningPower: 2
  },
  {
    id: 3,
    name: "Earth",
    level: 1,
    baseMiningRate: 3,
    upgradeCost: 0.5,
    imageUrl: "/planets/earth.png",
    description: "Our home planet, the only known planet to support life.",
    upgradeMultiplier: 2,
    cost: 100,
    emoji: "🌎",
    miningPower: 3
  },
  {
    id: 4,
    name: "Mars",
    level: 1,
    baseMiningRate: 4,
    upgradeCost: 1,
    imageUrl: "/planets/mars.png",
    description: "The Red Planet, known for its rusty appearance.",
    upgradeMultiplier: 2.2,
    cost: 250,
    emoji: "🔴",
    miningPower: 4
  },
  {
    id: 5,
    name: "Jupiter",
    level: 1,
    baseMiningRate: 8,
    upgradeCost: 2.5,
    imageUrl: "/planets/jupiter.png",
    description: "The largest planet in our Solar System, a gas giant.",
    upgradeMultiplier: 2.5,
    cost: 500,
    emoji: "⚪",
    miningPower: 8
  },
  {
    id: 6,
    name: "Saturn",
    level: 1,
    baseMiningRate: 10,
    upgradeCost: 5,
    imageUrl: "/planets/saturn.png",
    description: "Known for its beautiful and prominent ring system.",
    upgradeMultiplier: 2.7,
    cost: 1000,
    emoji: "🪐",
    miningPower: 10
  },
  {
    id: 7,
    name: "Uranus",
    level: 1,
    baseMiningRate: 15,
    upgradeCost: 10,
    imageUrl: "/planets/uranus.png",
    description: "An ice giant with a tilted axis of rotation.",
    upgradeMultiplier: 3,
    cost: 2500,
    emoji: "🌌",
    miningPower: 15
  },
  {
    id: 8,
    name: "Neptune",
    level: 1,
    baseMiningRate: 20,
    upgradeCost: 20,
    imageUrl: "/planets/neptune.png",
    description: "The windiest planet in our Solar System.",
    upgradeMultiplier: 3.5,
    cost: 5000,
    emoji: "🌀",
    miningPower: 20
  },
];
