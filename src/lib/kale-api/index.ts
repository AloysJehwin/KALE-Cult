/**
 * KALE API Core Library
 * Main entry point for all contract and wallet interactions
 */

// Wallet exports
export {
  connectWallet,
  checkConnection,
  signTransaction,
  getCurrentNetwork,
  type WalletConnection,
  type SignResult
} from "./wallet";

// Stellar exports
export {
  StellarService,
  TESTNET_HORIZON,
  MAINNET_HORIZON,
  TESTNET_PASSPHRASE,
  MAINNET_PASSPHRASE,
  addressToScVal,
  i128ToScVal,
  u64ToScVal,
  u32ToScVal,
  bytesNToScVal,
  type NetworkConfig
} from "./stellar";

// Contract exports
export {
  KaleContract,
  type KaleContractConfig
} from "./kale-contract";

// Config exports
export {
  createTestnetConfig,
  createMainnetConfig,
  KALE_CONTRACT_TESTNET,
  KALE_CONTRACT_MAINNET,
  type KaleAPIConfig
} from "./config";