"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FARMS, type FarmSummary } from "@/data/farms";
import { TextAnimate } from "@/components/magicui/text-animate";
import { TypingAnimation } from "@/components/magicui/typing-animation";

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

export default function StakeDonePage() {
  const search = useSearchParams();
  const router = useRouter();
  const farmId = search.get("farmId");
  const farm: FarmSummary | undefined = FARMS.find((f) => f.farmId === farmId) || FARMS[0];

  const [token, setToken] = useState("XLM");
  const [amount, setAmount] = useState<number>(1000);
  const [duration, setDuration] = useState<string>("6m");

  const months = duration === "3m" ? 3 : duration === "6m" ? 6 : duration === "1y" ? 12 : 6;
  const estimatedReturn = useMemo(() => {
    const annualRate = (farm?.apy ?? 0) / 100;
    const monthlyRate = annualRate / 12;
    const est = amount * monthlyRate * months;
    return est;
  }, [amount, months, farm]);

  const handleFinish = () => {
    if (!farm) return;
    try {
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
        timestamp: new Date().toISOString(),
      };
      arr.unshift(record);
      window.localStorage.setItem(key, JSON.stringify(arr));
      router.push("/profile");
    } catch (e) {
      router.push("/profile");
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
            <div className="mt-6 flex items-center justify-between">
              <button
                className="inline-flex items-center rounded-full border border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-900"
                onClick={() => router.push("/stake")}
              >
                Back to Farms
              </button>
              <button onClick={handleFinish} className="inline-flex items-center rounded-full bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 px-5 py-2 text-sm font-semibold hover:opacity-90">
                Finish Staking
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
