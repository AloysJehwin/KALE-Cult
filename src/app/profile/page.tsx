"use client";

import { useEffect, useMemo, useState } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useWallet } from "@/contexts/WalletContext";

type StoredStake = {
  id: string;
  farmId: string;
  satDataId: string;
  apy: number;
  maxYieldPct: number;
  health: string;
  token: string;
  amount: number;
  duration: string; // 3m | 6m | 1y
  estimatedReturn: number;
  timestamp: string; // ISO
  transactionHash?: string; // Transaction hash from blockchain
};

const STORAGE_KEY = "kalecult_stakes";

export default function ProfilePage() {
  const [stakes, setStakes] = useState<StoredStake[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { isWalletConnected, publicKey, connectWallet } = useWallet();

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        setStakes(JSON.parse(raw) as StoredStake[]);
      }
    } catch (e) {
      setStakes([]);
    }
  }, []);

  const totals = useMemo(() => {
    const totalStaked = stakes.reduce((sum, s) => sum + (s.amount || 0), 0);
    const totalEst = stakes.reduce((sum, s) => sum + (s.estimatedReturn || 0), 0);
    return { totalStaked, totalEst, count: stakes.length };
  }, [stakes]);

  const formatAddress = (address: string) => {
    if (!address) return "Not connected";
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Address copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-10 pb-8 text-center">
        <TypingAnimation className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-lime-400 to-yellow-300 bg-clip-text text-transparent" duration={35}>
          Your Profile
        </TypingAnimation>
        <p className="mt-4 text-neutral-300 max-w-3xl mx-auto">
          Manage your KALE-Cult account, view your wallet and track staking performance.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-8 pb-16">
        {/* Wallet + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-5">
            <div className="text-sm text-neutral-400">Wallet Address</div>
            {isWalletConnected && publicKey ? (
              <>
                <div className="mt-1 font-mono text-sm break-all" title={publicKey}>
                  {formatAddress(publicKey)}
                </div>
                <div className="mt-2 flex gap-2">
                  <button 
                    onClick={() => copyToClipboard(publicKey)}
                    className="inline-flex items-center rounded-full border border-neutral-800 px-3 py-1.5 text-xs hover:bg-neutral-900"
                  >
                    Copy Full Address
                  </button>
                  <a 
                    href={`https://stellar.expert/explorer/testnet/account/${publicKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-neutral-800 px-3 py-1.5 text-xs hover:bg-neutral-900"
                  >
                    View on Explorer ↗
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="mt-1 text-sm text-neutral-500">Not connected</div>
                <button 
                  onClick={connectWallet}
                  className="mt-3 inline-flex items-center rounded-full bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 px-3 py-1.5 text-xs font-semibold hover:opacity-90"
                >
                  Connect Wallet
                </button>
              </>
            )}
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <div className="text-sm text-neutral-400">Total Staked</div>
            <div className="mt-1 text-2xl font-semibold text-lime-300">{totals.totalStaked.toLocaleString()} XLM</div>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <div className="text-sm text-neutral-400">Estimated Returns</div>
            <div className="mt-1 text-2xl font-semibold text-lime-300">{totals.totalEst.toLocaleString(undefined, { maximumFractionDigits: 2 })} XLM</div>
          </div>
        </div>

        {/* Transaction Summary */}
        {stakes.length > 0 && stakes.some(s => s.transactionHash) && (
          <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-5">
            <h3 className="text-lg font-semibold mb-4">Transaction Summary</h3>
            <div className="space-y-3">
              {stakes.filter(s => s.transactionHash).map((s) => (
                <div key={s.transactionHash} className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-lime-900/20 text-lime-400 border border-lime-900/40">
                        Staked
                      </span>
                      <span className="text-sm font-medium">{s.amount} XLM</span>
                      <span className="text-xs text-neutral-500">to</span>
                      <span className="text-xs font-mono text-neutral-400">{s.farmId}</span>
                    </div>
                    <div className="mt-1 text-xs text-neutral-500">
                      {new Date(s.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <a 
                    href={`https://stellar.expert/explorer/testnet/tx/${s.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-lime-400 hover:underline"
                  >
                    View →
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-neutral-500">
              Farmer Address: GD664UTMLQ2BQCUWXILU4NJLHWSDYV6IUMJZZCD7F3H7VNHY3CO7KUT2
            </div>
          </div>
        )}

        {/* Stakes Dashboard */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Your Stakes</h2>
          {stakes.length === 0 ? (
            <p className="mt-2 text-neutral-400 text-sm">No stakes yet. Head to the Stake page to get started.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {stakes.map((s) => (
                <div key={s.id} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm text-neutral-400">Farm</div>
                      <div className="font-semibold">{s.farmId} · {s.satDataId}</div>
                    </div>
                    <div className="text-xs text-neutral-400">
                      {new Date(s.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-neutral-400">Token</div>
                      <div className="font-medium">{s.token}</div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Amount</div>
                      <div className="font-medium">{s.amount.toLocaleString()} {s.token}</div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Duration</div>
                      <div className="font-medium">{s.duration.toUpperCase()}</div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Est. Return</div>
                      <div className="font-medium text-lime-300">{s.estimatedReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })} {s.token}</div>
                    </div>
                  </div>
                  <button
                    className="mt-5 inline-flex items-center rounded-full border border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-900"
                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                  >
                    {expandedId === s.id ? "Hide Details" : "View Details"}
                  </button>

                  {expandedId === s.id && (
                    <div className="mt-5 rounded-xl border border-neutral-800 p-4 bg-neutral-900/50">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-neutral-400">Yield Score</div>
                          <div className="font-medium">—</div>
                        </div>
                        <div>
                          <div className="text-neutral-400">Farm APY</div>
                          <div className="font-medium text-lime-300">{s.apy}%</div>
                        </div>
                        <div>
                          <div className="text-neutral-400">Max Yield</div>
                          <div className="font-medium">{s.maxYieldPct}%</div>
                        </div>
                        <div>
                          <div className="text-neutral-400">Health</div>
                          <div className="font-medium">{s.health}</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-xs text-neutral-500">
                          Staked on {new Date(s.timestamp).toLocaleString()} · Record ID: {s.id}
                        </div>
                        {s.transactionHash && (
                          <div className="mt-2 p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                            <div className="text-xs text-neutral-400">Transaction Hash</div>
                            <div className="mt-1 font-mono text-xs break-all text-lime-400">
                              {s.transactionHash}
                            </div>
                            <a 
                              href={`https://stellar.expert/explorer/testnet/tx/${s.transactionHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center text-xs text-lime-400 hover:underline"
                            >
                              View Transaction on Stellar Explorer ↗
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
