/**
 * Configuration Module
 * Provides pre-configured setups for testnet and mainnet
 */

import { NetworkConfig, TESTNET_HORIZON, MAINNET_HORIZON, TESTNET_PASSPHRASE, MAINNET_PASSPHRASE } from "./stellar";

// Contract addresses
export const KALE_CONTRACT_TESTNET = "CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7";
export const KALE_CONTRACT_MAINNET = ""; // Add mainnet contract when deployed

export interface KaleAPIConfig {
  network: NetworkConfig;
  contractId: string;
}

/**
 * Create testnet configuration
 */
export function createTestnetConfig(): KaleAPIConfig {
  return {
    network: {
      horizonUrl: TESTNET_HORIZON,
      networkPassphrase: TESTNET_PASSPHRASE,
      isTestnet: true
    },
    contractId: KALE_CONTRACT_TESTNET
  };
}

/**
 * Create mainnet configuration
 */
export function createMainnetConfig(): KaleAPIConfig {
  if (!KALE_CONTRACT_MAINNET) {
    throw new Error("Mainnet contract not yet deployed");
  }
  
  return {
    network: {
      horizonUrl: MAINNET_HORIZON,
      networkPassphrase: MAINNET_PASSPHRASE,
      isTestnet: false
    },
    contractId: KALE_CONTRACT_MAINNET
  };
}

/**
 * Constants for KALE protocol
 */
export const KALE_CONSTANTS = {
  BLOCK_INTERVAL: 300, // 5 minutes in seconds
  BLOCK_REWARD: 2505_0000000, // 2505 KALE in stroops
  BLOCKS_PER_MONTH: 8640, // 24 * 60 / 5 * 30
  DECAY_RATE: 0.05, // 5% monthly decay
  STROOPS_PER_KALE: 10_000_000,
  
  // Helper functions
  kaleToStroops: (kale: number): string => {
    return (kale * KALE_CONSTANTS.STROOPS_PER_KALE).toString();
  },
  
  stroopsToKale: (stroops: string): number => {
    return parseInt(stroops) / KALE_CONSTANTS.STROOPS_PER_KALE;
  }
};