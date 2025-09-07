export default function Footer() {
  const CONTRACT_ID = "CAAMNOJE35WNHCQ5ENHGFCT4ANIH6345IQJLARWNLB5OKRBF7ZGQJ7Q7";
  
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-lime-400 to-yellow-300 text-neutral-900 flex items-center justify-center font-bold">KC</div>
            <span className="text-lg font-semibold tracking-tight text-white">KALE-CULT</span>
          </div>
          <p className="mt-4 text-sm text-neutral-400 max-w-xs">
            Cultivating not just farms, but impact — stake, work, and harvest for a meaningful purpose.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <a className="hover:text-white" href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="hover:text-white" href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a className="hover:text-white" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-semibold text-white mb-4">KALE Smart Contract</h4>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
            <div className="space-y-3">
              <div>
                <div className="text-xs text-neutral-400 mb-1">Contract ID (Testnet)</div>
                <div className="font-mono text-xs break-all text-lime-400">
                  {CONTRACT_ID}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-neutral-400">Network</div>
                  <div className="text-white mt-1">Stellar Testnet</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Status</div>
                  <div className="text-lime-400 mt-1">Active</div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-neutral-800">
                <div className="text-xs text-neutral-400 mb-2">Contract Details</div>
                <ul className="text-xs space-y-1 text-neutral-300">
                  <li>• Block Interval: 5 minutes</li>
                  <li>• Block Reward: 2505 KALE</li>
                  <li>• Monthly Decay: 5%</li>
                  <li>• 1 KALE = 10,000,000 stroops</li>
                </ul>
              </div>
              
              <div className="flex gap-3 pt-3">
                <a 
                  href={`https://stellar.expert/explorer/testnet/contract/${CONTRACT_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1.5 rounded-full border border-lime-900/40 bg-lime-900/20 text-lime-400 hover:bg-lime-900/30"
                >
                  View on Explorer →
                </a>
                <a 
                  href="https://laboratory.stellar.org/#account-creator?network=test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1.5 rounded-full border border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                >
                  Get Test XLM →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-neutral-500 text-center">
          <p>Built on Stellar Network | Smart Contract Deployed on Soroban</p>
        </div>
      </div>
    </footer>
  );
}