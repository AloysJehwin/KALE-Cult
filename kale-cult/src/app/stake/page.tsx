"use client";

import { useMemo, useState } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Link from "next/link";
import { FARMS, type FarmSummary } from "@/data/farms";

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

export default function StakePage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("apy-desc");
  const [status, setStatus] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const farms = useMemo(() => {
    let list = [...FARMS];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((f) => f.farmId.toLowerCase().includes(q) || f.satDataId.toLowerCase().includes(q));
    }
    if (status !== "all") {
      list = list.filter((f) => (status === "available" ? f.status === "Available" : f.status === "Staking Full"));
    }
    list.sort((a, b) => {
      switch (sort) {
        case "apy-desc":
          return b.apy - a.apy;
        case "apy-asc":
          return a.apy - b.apy;
        case "health-desc":
          const order = { Excellent: 3, Good: 2, Fair: 1, Poor: 0 } as const;
          return order[b.health] - order[a.health];
        default:
          return 0;
      }
    });
    return list;
  }, [query, sort, status]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-8 mb-12 text-center">
        <TypingAnimation className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-lime-400 to-yellow-300 bg-clip-text text-transparent" duration={35}>
          Real Farms. Real Data. Real Returns.
        </TypingAnimation>
        <p className="mt-4 text-neutral-300 max-w-3xl mx-auto">
          Turning real-time farm data into smart investments - where crops grow, profits flow, and Web3 complexity stays out of sight!
        </p>
      </section>

      {/* Sort/Filter Panel */}
      <section className="mx-auto max-w-7xl px-6 mb-15 mpb-6">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm text-neutral-400">Search by Farm or SAT-data ID</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="#FARM-2024 | #SC-XXXX"
                className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-lime-400/40"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-400">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/40"
              >
                <option value="apy-desc">Highest APY</option>
                <option value="apy-asc">Lowest APY</option>
                <option value="health-desc">Healthiest Farms</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-neutral-400">Availability</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/40"
              >
                <option value="all">All</option>
                <option value="available">Available to Stake</option>
                <option value="full">Staking Full</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Farms Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <div key={farm.farmId} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-neutral-400">Farm ID</div>
                  <div className="font-semibold">{farm.farmId}</div>
                </div>
                <span className={`text-xs rounded-full px-2 py-1 border ${farm.status === "Available" ? "border-lime-400/40 text-lime-300" : "border-yellow-300/40 text-yellow-200"}`}>
                  {farm.status}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-neutral-400">SAT-data ID</div>
                  <div className="font-medium">{farm.satDataId}</div>
                </div>
                <div>
                  <div className="text-neutral-400">Max Yield</div>
                  <div className="font-medium text-lime-300">{farm.maxYieldPct}%</div>
                </div>
                <div>
                  <div className="text-neutral-400">Farm Health</div>
                  <div className="font-medium">{farm.health}</div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <button
                  className="inline-flex items-center rounded-full border border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-900"
                  onClick={() => setExpandedId(expandedId === farm.farmId ? null : farm.farmId)}
                >
                  More Details
                </button>
                <Link
                  href={`/stake-done?farmId=${encodeURIComponent(farm.farmId)}`}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${farm.status === "Available" ? "bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 hover:opacity-90" : "bg-neutral-800 text-neutral-400 cursor-not-allowed"}`}
                  aria-disabled={farm.status !== "Available"}
                  onClick={(e) => {
                    if (farm.status !== "Available") e.preventDefault();
                  }}
                >
                  Stake
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Expansion Panel: separate below grid to avoid shifting cards */}
        <div className="mt-8">
          {expandedId && (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur p-5 animate-in fade-in zoom-in-95 duration-200">
              {(() => {
                const farm = farms.find((f) => f.farmId === expandedId)!;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
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
                    <div className="flex flex-col justify-between rounded-xl border border-neutral-800 p-4">
                      <div>
                        <div className="text-sm text-neutral-400">Ready to stake?</div>
                        <div className="mt-1 text-2xl font-semibold">{farm.apy}% APY</div>
                        <p className="mt-2 text-sm text-neutral-400">Stake KALE to earn yields aligned with real farm performance.</p>
                      </div>
                      <Link
                        href={`/stake-done?farmId=${encodeURIComponent(farm.farmId)}`}
                        className={`mt-4 inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold ${farm.status === "Available" ? "bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 hover:opacity-90" : "bg-neutral-800 text-neutral-400 cursor-not-allowed"}`}
                        aria-disabled={farm.status !== "Available"}
                        onClick={(e) => {
                          if (farm.status !== "Available") e.preventDefault();
                        }}
                      >
                        Stake
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
