import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-12 md:pt-20 pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <TypingAnimation className="text-4xl md:text-6xl font-extrabold tracking-tight" duration={40}>
              KALE-Cult
            </TypingAnimation>
            <p className="mt-5 text-lg md:text-xl text-neutral-300 max-w-2xl">
              Cultivating not just farms, but impact — stake, work, and harvest for a meaningful purpose.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#get-started" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 px-6 py-3 font-medium hover:opacity-90">
                Get Started
              </a>
              <a href="#learn-more" className="inline-flex items-center justify-center rounded-full border border-neutral-800 px-6 py-3 font-medium hover:bg-neutral-900">
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-800 p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-neutral-900/80 p-4 border border-neutral-800">
                  <div className="text-neutral-400">Max Yield</div>
                  <div className="mt-1 text-2xl font-semibold text-lime-300">24.5%</div>
                </div>
                <div className="rounded-xl bg-neutral-900/80 p-4 border border-neutral-800">
                  <div className="text-neutral-400">Farmer ID</div>
                  <div className="mt-1 text-xl font-semibold">#FARM-2024</div>
                </div>
                <div className="rounded-xl bg-neutral-900/80 p-4 border border-neutral-800">
                  <div className="text-neutral-400">PiCore ID</div>
                  <div className="mt-1 text-xl font-semibold">#PC-7890</div>
                </div>
                <div className="rounded-xl bg-neutral-900/80 p-4 border border-neutral-800">
                  <div className="text-neutral-400">Farm Health</div>
                  <div className="mt-1 text-xl font-semibold text-lime-300">Excellent</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-neutral-400 text-sm">Growth Trend</div>
                  <div className="mt-1 h-2 w-40 rounded-full bg-neutral-800">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-lime-400 to-yellow-300"></div>
                  </div>
                </div>
                <button className="inline-flex items-center rounded-full bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 px-5 py-2 text-sm font-medium hover:opacity-90">
                  Stake
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16" id="features">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Key Features</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-950">
            <h3 className="text-lg font-semibold text-lime-300">Stake Your KALE</h3>
            <p className="mt-2 text-neutral-300 text-sm">
              Lock your KALE tokens to join the cultivation process and actively participate in our collaborative farming ecosystem.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-950">
            <h3 className="text-lg font-semibold text-lime-300">Contribute & Work</h3>
            <p className="mt-2 text-neutral-300 text-sm">
              Complete tasks and proofs of work to grow your share of rewards, while supporting sustainable farming initiatives.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-950">
            <h3 className="text-lg font-semibold text-lime-300">Harvest Real Impact</h3>
            <p className="mt-2 text-neutral-300 text-sm">
              Turn your staking and contributions into meaningful outcomes — promoting sustainable farming, community growth, and verifiable impact.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-6 pb-12 md:pb-16">
        <div className="rounded-2xl border border-neutral-800 p-8 bg-neutral-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Does this look like an opportunity?</h3>
            <p className="mt-2 text-neutral-300">Get real-time insights and analytics to make informed staking decisions.</p>
          </div>
          <a href="#get-started" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 px-6 py-3 font-medium hover:opacity-90">
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
