/**
 * Freighter Wallet Integration Module
 * Handles wallet connection, authentication, and transaction signing
 */

import { 
  isConnected, 
  requestAccess, 
  getAddress,
  signTransaction as freighterSignTransaction,
  getNetwork 
} from "@stellar/freighter-api";

export interface WalletConnection {
  isConnected: boolean;
  publicKey: string | null;
  network?: string;
}

export interface SignResult {
  signedXDR: string;
  signerAddress: string;
}

/**
 * Connect to Freighter wallet and request access
 */
export async function connectWallet(): Promise<WalletConnection> {
  try {
    const connected = await isConnected();
    
    if (!connected) {
      throw new Error("Freighter wallet is not installed or not connected");
    }

    // Request access
    const accessResult = await requestAccess();
    if (accessResult.error) {
      throw new Error(accessResult.error);
    }
    
    // Get wallet address
    const addressResult = await getAddress();
    if (addressResult.error) {
      throw new Error(addressResult.error);
    }
    
    // Check network
    const networkResult = await getNetwork();
    
    return {
      isConnected: true,
      publicKey: addressResult.address,
      network: networkResult.network
    };
  } catch (error: any) {
    throw new Error(`Wallet connection failed: ${error?.message || "Unknown error"}`);
  }
}

/**
 * Check if wallet is already connected
 */
export async function checkConnection(): Promise<WalletConnection> {
  try {
    const connected = await isConnected();
    if (connected) {
      const addressResult = await getAddress();
      if (!addressResult.error && addressResult.address) {
        const networkResult = await getNetwork();
        return {
          isConnected: true,
          publicKey: addressResult.address,
          network: networkResult.network
        };
      }
    }
  } catch (error) {
    console.error("Error checking wallet connection:", error);
  }
  
  return {
    isConnected: false,
    publicKey: null,
  };
}

/**
 * Sign a transaction with Freighter
 */
export async function signTransaction(
  xdr: string,
  networkPassphrase: string,
  address?: string
): Promise<SignResult> {
  const result = await freighterSignTransaction(xdr, {
    networkPassphrase,
    address
  });
  
  if (result.error) {
    throw new Error(`Transaction signing failed: ${result.error}`);
  }
  
  return {
    signedXDR: result.signedTxXdr,
    signerAddress: result.signerAddress
  };
}

/**
 * Get current network
 */
export async function getCurrentNetwork(): Promise<string> {
  const result = await getNetwork();
  if (result.error) {
    throw new Error(`Failed to get network: ${result.error}`);
  }
  return result.network;
}