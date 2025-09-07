"use client";

import Link from "next/link";
import { useWallet } from "@/contexts/WalletContext";

export default function Navbar() {
  const { isWalletConnected, publicKey, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div className="backdrop-blur supports-[backdrop-filter]:bg-neutral-900/40 bg-neutral-900/90 dark:bg-neutral-900/90 text-white border border-neutral-800 shadow-lg rounded-full px-4 py-2 w-full max-w-3xl flex items-center justify-between gap-2">
        <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-lime-400 to-yellow-300 text-neutral-900 flex items-center justify-center font-extrabold tracking-tight">KC</div>
          <span className="hidden sm:inline text-sm font-semibold">KALE-C</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-200">
          <Link className="hover:text-white" href="/stake">Stake</Link>
          <Link className="hover:text-white" href="/profile">Profile</Link>
          <Link className="hover:text-white" href="#about">About</Link>
        </nav>
        <div className="flex items-center gap-2">
          {isWalletConnected ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 hidden sm:inline">
                {publicKey && formatAddress(publicKey)}
              </span>
              <button 
                onClick={disconnectWallet}
                className="inline-flex items-center rounded-full bg-neutral-800 border border-neutral-700 text-neutral-200 px-4 py-1.5 text-sm font-semibold hover:bg-neutral-700"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 px-4 py-1.5 text-sm font-semibold hover:opacity-90"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
