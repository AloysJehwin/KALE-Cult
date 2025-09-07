"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FARMS, type FarmSummary } from "@/data/farms";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useWallet } from "@/contexts/WalletContext";
import { StellarService } from "@/lib/stellar-service";

function LineChart({ series, className = "" }: { series: number[]; className?: string }) {
  const path = useMemo(() => {
    if (series.length === 0) return "";
    const width = 240;
    const height = 80;
    const stepX = width / (series.length - 1);
    const points = series.map((v, i) => {
      const x = i * stepX;
      const y = height - v * height;
      return `${x},${y}`;
    });
    return `M ${points[0]} L ${points.slice(1).join(" ")}`;
  }, [series]);

  return (
    <svg viewBox="0 0 240 80" className={className}>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#a3e635" }} />
          <stop offset="100%" style={{ stopColor: "#fde047" }} />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" from="0,500" to="500,0" dur="1.2s" fill="freeze" />
      </path>
    </svg>
  );
}

function StakeDoneContent() {
  const search = useSearchParams();
  const router = useRouter();
  const farmId = search.get("farmId");
  const farm: FarmSummary | undefined = FARMS.find((f) => f.farmId === farmId) || FARMS[0];
  const { isWalletConnected, publicKey, connectWallet, signTransaction } = useWallet();
  const [token, setToken] = useState("XLM");
  const [amount, setAmount] = useState<number>(10);
  const [duration, setDuration] = useState<string>("6m");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  
  const FARMER_ADDRESS = "GD664UTMLQ2BQCUWXILU4NJLHWSDYV6IUMJZZCD7F3H7VNHY3CO7KUT2";

  // Load recent transactions for this farm
  useState(() => {
    const key = "kalecult_stakes";
    const existing = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (existing) {
      const allStakes = JSON.parse(existing) as any[];
      const farmStakes = allStakes.filter(s => s.farmId === farmId).slice(0, 5);
      setRecentTransactions(farmStakes);
    }
  });

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const months = duration === "3m" ? 3 : duration === "6m" ? 6 : duration === "1y" ? 12 : 6;
  const estimatedReturn = useMemo(() => {
    const annualRate = (farm?.apy ?? 0) / 100;
    const monthlyRate = annualRate / 12;
    const est = amount * monthlyRate * months;
    return est;
  }, [amount, months, farm]);

  const handleFinish = async () => {
    if (!farm) return;
    
    // Check wallet connection
    if (!isWalletConnected) {
      await connectWallet();
      return;
    }
    
    if (!publicKey) {
      setError("Please connect your wallet first");
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Send XLM to farmer address
      const stellarService = new StellarService();
      const result = await stellarService.sendXLM(
        publicKey,
        FARMER_ADDRESS,
        amount.toString(),
        signTransaction
      );
      
      setTransactionHash(result.hash);
      
      // Save stake record
      const key = "kalecult_stakes";
      const existing = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      const arr = existing ? (JSON.parse(existing) as any[]) : [];
      const record = {
        id: `${farm.farmId}-${Date.now()}`,
        farmId: farm.farmId,
        satDataId: farm.satDataId,
        apy: farm.apy,
        maxYieldPct: farm.maxYieldPct,
        health: farm.health,
        token,
        amount,
        duration,
        estimatedReturn,
        transactionHash: result.hash,
        timestamp: new Date().toISOString(),
      };
      arr.unshift(record);
      window.localStorage.setItem(key, JSON.stringify(arr));
      
      // Wait a bit to show transaction details
      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } catch (e: any) {
      console.error('Staking error:', e);
      setError(e.message || "Transaction failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-8 mb-10 text-center">
        <TypingAnimation className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-lime-400 to-yellow-300 bg-clip-text text-transparent" duration={35}>
        Submit Your Stake       
         </TypingAnimation>
        <p className="mt-4 text-neutral-300 max-w-3xl mx-auto">
        Review your selected farm and enter the amount you wish to stake.        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        {/* Recent Transactions on This Field */}
        {recentTransactions.length > 0 && (
          <div className="mb-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-5">
            <h3 className="text-lg font-semibold mb-4">Recent Activity on {farm.farmId}</h3>
            <div className="space-y-2">
              {recentTransactions.map((tx, index) => (
                <div key={tx.id} className="flex items-center justify-between p-2 rounded-lg bg-neutral-950/50 border border-neutral-800/50">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-500">#{index + 1}</span>
                    <div>
                      <span className="text-sm font-medium">{tx.amount} XLM</span>
                      <span className="text-xs text-neutral-500 ml-2">staked</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500">
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </span>
                    {tx.transactionHash && (
                      <a 
                        href={`https://stellar.expert/explorer/testnet/tx/${tx.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-lime-400 hover:underline"
                      >
                        View →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-800">
              <div className="text-xs text-neutral-500">
                Total staked on this field: {recentTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()} XLM
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Farm details */}
          <div className="lg:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-neutral-400">Farm</div>
                <div className="text-lg font-semibold">{farm.farmId} · {farm.satDataId}</div>
              </div>
              <span className={`text-xs rounded-full px-2 py-1 border ${farm.status === "Available" ? "border-lime-400/40 text-lime-300" : "border-yellow-300/40 text-yellow-200"}`}>
                {farm.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-neutral-400">Yield Score</div>
                <div className="font-medium">{farm.yieldScore}</div>
              </div>
              <div>
                <div className="text-neutral-400">Farm APY</div>
                <div className="font-medium text-lime-300">{farm.apy}%</div>
              </div>
              <div>
                <div className="text-neutral-400">Max Yield</div>
                <div className="font-medium">{farm.maxYieldPct}%</div>
              </div>
              <div>
                <div className="text-neutral-400">Health</div>
                <div className="font-medium">{farm.health}</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-sm text-neutral-400">Growth / Yield Trend</div>
              <LineChart series={farm.history} className="mt-2 w-full" />
            </div>
            
            {/* Connected Wallet Info */}
            {isWalletConnected && publicKey && (
              <div className="mt-6 p-3 rounded-xl border border-neutral-800 bg-neutral-950">
                <div className="text-xs text-neutral-400">Your Wallet</div>
                <div className="mt-1 font-mono text-xs text-neutral-300 break-all">
                  {formatAddress(publicKey)}
                </div>
              </div>
            )}
          </div>

          {/* Right: Stake form */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-5">
            <div>
              <label className="text-sm text-neutral-400">Select Token</label>
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/40"
              >
                <option value="XLM">XLM</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="text-sm text-neutral-400">Amount</label>
              <input
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/40"
              />
            </div>
            <div className="mt-4">
              <label className="text-sm text-neutral-400">Duration</label>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {[
                  { id: "3m", label: "3 Months" },
                  { id: "6m", label: "6 Months" },
                  { id: "1y", label: "1 Year" },
                ].map((d) => (
                  <button
                    key={d.id}
                    className={`rounded-lg border px-3 py-2 text-sm ${duration === d.id ? "border-lime-400/60 text-lime-300" : "border-neutral-800 text-neutral-300 hover:bg-neutral-900"}`}
                    onClick={() => setDuration(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-neutral-800 p-3 bg-neutral-950">
              <div className="text-sm text-neutral-400">Estimated Return</div>
              <div className="mt-1 text-2xl font-semibold text-lime-300">{estimatedReturn.toLocaleString(undefined, { maximumFractionDigits: 2 })} XLM</div>
              <div className="text-xs text-neutral-500">Based on {farm.apy}% APY over {months} months. This is an estimate.</div>
            </div>
            
            {/* Farmer Address Info */}
            <div className="mt-4 rounded-xl border border-neutral-800 p-3 bg-neutral-950">
              <div className="text-sm text-neutral-400">Farmer Address</div>
              <div className="mt-1 text-xs font-mono text-neutral-300 break-all">{FARMER_ADDRESS}</div>
              <div className="text-xs text-neutral-500 mt-1">Your XLM will be sent to this farmer's address</div>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="mt-4 rounded-xl border border-red-900/40 p-3 bg-red-950/20">
                <div className="text-sm text-red-400">{error}</div>
              </div>
            )}
            
            {/* Transaction Success */}
            {transactionHash && (
              <div className="mt-4 rounded-xl border border-lime-900/40 p-3 bg-lime-950/20">
                <div className="text-sm text-lime-400">Transaction Successful!</div>
                <div className="mt-1 text-xs font-mono text-neutral-300 break-all">Hash: {transactionHash}</div>
                <a 
                  href={`https://stellar.expert/explorer/testnet/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-lime-400 hover:underline mt-1 inline-block"
                >
                  View on Stellar Explorer →
                </a>
              </div>
            )}
            <div className="mt-6 flex items-center justify-between">
              <button
                className="inline-flex items-center rounded-full border border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-900"
                onClick={() => router.push("/stake")}
                disabled={isProcessing}
              >
                Back to Farms
              </button>
              <button 
                onClick={handleFinish} 
                disabled={isProcessing || !!transactionHash}
                className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold ${
                  isProcessing || transactionHash 
                    ? "bg-neutral-800 text-neutral-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 hover:opacity-90"
                }`}
              >
                {isProcessing ? "Processing..." : transactionHash ? "Transaction Complete" : isWalletConnected ? "Finish Staking" : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function StakeDonePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">Loading...</div>}>
      <StakeDoneContent />
    </Suspense>
  );
}
