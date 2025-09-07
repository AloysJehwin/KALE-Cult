export type FarmHealth = "Excellent" | "Good" | "Fair" | "Poor";

export interface FarmSummary {
  farmId: string;
  satDataId: string;
  maxYieldPct: number;
  health: FarmHealth;
  yieldScore: number;
  apy: number;
  history: number[]; // normalized 0..1
  status: "Available" | "Staking Full";
}

export const FARMS: FarmSummary[] = [
  {
    farmId: "#FARM-2024-01",
    satDataId: "#SC-7890",
    maxYieldPct: 24.5,
    health: "Excellent",
    yieldScore: 92,
    apy: 18.4,
    history: [0.2, 0.26, 0.22, 0.34, 0.4, 0.36, 0.48, 0.52, 0.6, 0.58, 0.66, 0.72],
    status: "Available",
  },
  {
    farmId: "#FARM-2024-02",
    satDataId: "#SC-6543",
    maxYieldPct: 19.2,
    health: "Good",
    yieldScore: 81,
    apy: 14.1,
    history: [0.15, 0.2, 0.22, 0.24, 0.28, 0.3, 0.32, 0.35, 0.4, 0.42, 0.45, 0.5],
    status: "Available",
  },
  {
    farmId: "#FARM-2024-03",
    satDataId: "#SC-9901",
    maxYieldPct: 15.0,
    health: "Fair",
    yieldScore: 68,
    apy: 10.2,
    history: [0.12, 0.11, 0.13, 0.16, 0.18, 0.2, 0.23, 0.25, 0.27, 0.29, 0.3, 0.32],
    status: "Staking Full",
  },
  {
    farmId: "#FARM-2024-04",
    satDataId: "#SC-1122",
    maxYieldPct: 21.7,
    health: "Good",
    yieldScore: 86,
    apy: 16.9,
    history: [0.18, 0.2, 0.25, 0.28, 0.32, 0.36, 0.4, 0.44, 0.48, 0.5, 0.55, 0.6],
    status: "Available",
  },
  {
    farmId: "#FARM-2024-05",
    satDataId: "#SC-3344",
    maxYieldPct: 13.8,
    health: "Fair",
    yieldScore: 62,
    apy: 9.5,
    history: [0.1, 0.12, 0.14, 0.13, 0.16, 0.18, 0.2, 0.22, 0.24, 0.23, 0.26, 0.28],
    status: "Available",
  },
  {
    farmId: "#FARM-2024-06",
    satDataId: "#SC-5566",
    maxYieldPct: 27.3,
    health: "Excellent",
    yieldScore: 95,
    apy: 20.2,
    history: [0.25, 0.28, 0.32, 0.36, 0.4, 0.45, 0.5, 0.55, 0.6, 0.66, 0.7, 0.75],
    status: "Available",
  },
];
