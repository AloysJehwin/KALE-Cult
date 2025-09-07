'use client';

import { useState } from 'react';

export default function TestWalletPage() {
  const [status, setStatus] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');

  const testFreighter = async () => {
    setStatus('Testing Freighter...');
    
    try {
      // Test if window.freighter exists
      if (typeof window !== 'undefined' && (window as any).freighter) {
        setStatus('Freighter detected in window object');
        
        // Try using window.freighter directly
        const freighter = (window as any).freighter;
        
        // Check if connected
        const isConnectedResult = await freighter.isConnected();
        setStatus(`Is Connected: ${isConnectedResult}`);
        
        if (isConnectedResult) {
          // Request access first
          setStatus('Requesting access...');
          try {
            const accessResult = await freighter.requestAccess();
            setStatus(`Access granted: ${accessResult}`);
          } catch (err: any) {
            setStatus(`Access denied: ${err.message}`);
            return;
          }
          
          // Try to get public key
          const publicKeyResult = await freighter.getPublicKey();
          setStatus(`Got public key: ${publicKeyResult}`);
          setPublicKey(publicKeyResult);
          
          // Check network
          const network = await freighter.getNetwork();
          setStatus(`Network: ${network} (should be TESTNET)`);
        } else {
          setStatus('Freighter extension not connected/active. Please check extension is enabled.');
        }
        
      } else {
        setStatus('Freighter not found in window object. Please install the extension or try refreshing the page.');
      }
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
      console.error('Detailed error:', error);
    }
  };

  const testFreighterApi = async () => {
    setStatus('Testing @stellar/freighter-api...');
    
    try {
      const freighterApi = await import('@stellar/freighter-api');
      
      // Check if connected
      const isConnectedResult = await freighterApi.isConnected();
      setStatus(`Is Connected via API: ${isConnectedResult}`);
      
      if (isConnectedResult) {
        // Request access
        const accessResult = await freighterApi.requestAccess();
        setStatus(`Access result: ${JSON.stringify(accessResult)}`);
        
        // Get public key using getAddress
        const keyResult = await freighterApi.getAddress();
        const address = typeof keyResult === 'string' ? keyResult : keyResult.address;
        setStatus(`Address via API: ${address}`);
        if (address) {
          setPublicKey(address);
        }
      } else {
        setStatus('Freighter not installed or not connected');
      }
    } catch (error: any) {
      setStatus(`API Error: ${error.message}`);
      console.error('API error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-2xl font-bold mb-8">Freighter Wallet Test</h1>
      
      <div className="space-y-4">
        <button
          onClick={testFreighter}
          className="px-4 py-2 bg-lime-500 text-black rounded"
        >
          Test window.freighter
        </button>
        
        <button
          onClick={testFreighterApi}
          className="px-4 py-2 bg-yellow-500 text-black rounded ml-4"
        >
          Test @stellar/freighter-api
        </button>
      </div>
      
      <div className="mt-8 p-4 bg-neutral-900 rounded">
        <h2 className="text-lg font-semibold mb-2">Status:</h2>
        <p className="text-sm font-mono">{status}</p>
      </div>
      
      {publicKey && (
        <div className="mt-4 p-4 bg-neutral-900 rounded">
          <h2 className="text-lg font-semibold mb-2">Public Key:</h2>
          <p className="text-sm font-mono break-all">{publicKey}</p>
        </div>
      )}
    </div>
  );
}