import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Globe } from "@/components/magicui/globe";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pt-25 md:pt-20 pb-12 md:pb-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(163,230,53,0.08),transparent_60%)]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="relative lg:col-span-7">
            <div className="pointer-events-none absolute -inset-x-10 -top-10 h-40 rounded-full blur-3xl opacity-25 bg-gradient-to-r from-lime-400/60 to-yellow-300/60"></div>
            <TypingAnimation className="text-5xl md:text-7xl font-extrabold tracking-tight" duration={40}>
              KALE-Cult
            </TypingAnimation>
            <TypingAnimation className="mt-5 text-lg md:text-xl text-neutral-300 max-w-2xl" duration={20} delay={400}>
              Cultivating not just farms, but impact — stake, work, and harvest for a meaningful purpose.
            </TypingAnimation>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="/stake" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 px-6 py-3 font-medium hover:opacity-90">
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
                  <div className="text-neutral-400">SAT-data ID</div>
                  <div className="mt-1 text-xl font-semibold">#SC-7890</div>
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
                <a href="/stake" className="inline-flex items-center rounded-full bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 px-5 py-2 text-sm font-medium hover:opacity-90">
                  Stake
                </a>
              </div>
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-lime-400 to-yellow-300 opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mx-auto max-w-7xl px-6 py-5 md:py-16" id="features">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Key Features</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-950">
            <h3 className="text-lg font-semibold text-lime-300">Stake Your KALE</h3>
            <p className="mt-2 text-neutral-300 text-sm">
              Lock your KALE tokens to join the cultivation process and actively participate in our collaborative farming ecosystem.
            </p>
          </div>
          <div className="relative rounded-2xl border border-neutral-800 p-6 bg-neutral-950 overflow-hidden">
            <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-gradient-to-br from-yellow-300 to-lime-400 opacity-15 blur-xl"></div>
            <h3 className="text-lg font-semibold text-lime-300">Contribute & Work</h3>
            <p className="mt-2 text-neutral-300 text-sm">
              Complete tasks and proofs of work to grow your share of rewards, while supporting sustainable farming initiatives.
            </p>
          </div>
          <div className="relative rounded-2xl border border-neutral-800 p-6 bg-neutral-950 overflow-hidden">
            <div className="absolute top-1/2 right-6 -translate-y-1/2 h-20 w-20 rounded-full bg-gradient-to-br from-lime-300 to-yellow-200 opacity-15 blur-xl"></div>
            <h3 className="text-lg font-semibold text-lime-300">Harvest Real Impact</h3>
            <p className="mt-2 text-neutral-300 text-sm">
              Turn your staking and contributions into meaningful outcomes — promoting sustainable farming, community growth, and verifiable impact.
            </p>
          </div>
        </div>
      </section>

      {/* Globe Section */}
      <section className="relative mx-auto max-w-6xl px-6 py-8 md:py-12">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">Creating real impact all around the world</h3>
          <p className="mt-2 text-neutral-300">with one cultivation at a time as a cult</p>
        </div>
        <div className="relative mt-10 flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[560px]">
            <Globe />
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
          <a href="/stake" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-yellow-300 text-neutral-900 px-6 py-3 font-medium hover:opacity-90">
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
