'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  isConnected, 
  requestAccess, 
  getAddress,
  signTransaction as freighterSignTransaction,
  getNetwork 
} from "@stellar/freighter-api";

interface WalletContextType {
  isWalletConnected: boolean;
  publicKey: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signTransaction: (xdr: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const connected = await isConnected();
      console.log('Initial connection check:', connected);
      
      if (connected) {
        try {
          const addressResult = await getAddress();
          console.log('Address result on check:', addressResult);
          
          if (!addressResult.error && addressResult.address) {
            setPublicKey(addressResult.address);
            setIsWalletConnected(true);
          }
        } catch (err) {
          console.log('Could not get address on check:', err);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    try {
      // Check if Freighter is installed
      const connected = await isConnected();
      console.log('Freighter installed:', connected);
      
      if (!connected) {
        alert('Please install Freighter wallet extension from https://www.freighter.app/');
        window.open('https://www.freighter.app/', '_blank');
        return;
      }

      // Request access
      console.log('Requesting access...');
      const accessResult = await requestAccess();
      console.log('Access result:', accessResult);
      
      if (accessResult.error) {
        console.error('Access error:', accessResult.error);
        alert(`Access denied: ${accessResult.error}`);
        return;
      }

      // Get wallet address
      console.log('Getting address...');
      const addressResult = await getAddress();
      console.log('Address result:', addressResult);
      
      if (addressResult.error) {
        console.error('Failed to get address:', addressResult.error);
        alert(`Failed to get address: ${addressResult.error}`);
        return;
      }

      // Check network
      const networkResult = await getNetwork();
      console.log('Network:', networkResult);
      
      if (networkResult.network !== 'TESTNET') {
        alert(`Please switch to Testnet in Freighter. Current network: ${networkResult.network}`);
        return;
      }

      setPublicKey(addressResult.address);
      setIsWalletConnected(true);
      console.log('Wallet connected successfully with address:', addressResult.address);
      
    } catch (error: any) {
      console.error('Error in connectWallet:', error);
      alert(`Failed to connect: ${error.message || 'Unknown error'}`);
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setPublicKey(null);
  };

  const handleSignTransaction = async (xdr: string): Promise<string> => {
    try {
      const result = await freighterSignTransaction(xdr, {
        networkPassphrase: 'Test SDF Network ; September 2015'
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      return result.signedTxXdr;
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        publicKey,
        connectWallet,
        disconnectWallet,
        signTransaction: handleSignTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}