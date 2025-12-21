import Link from "next/link";
import { ChevronRight, Pickaxe, Cpu, Zap, Server, DollarSign } from "lucide-react";

export default function MiningOverviewPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/docs/mining" className="hover:text-white">Mining</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Overview</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm mb-4">
            <Pickaxe className="w-4 h-4" /> 8 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Mining Overview</h1>
          <p className="text-xl text-gray-400">Learn how to mine PYRAX tokens on the PYRAX network.</p>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Introduction to PYRAX Mining</h2>
          <p className="text-gray-300 leading-relaxed">
            PYRAX uses a dual-stream Proof-of-Work mining system that allows participation from both specialized hardware (ASICs) and consumer hardware (CPUs/GPUs). This unique approach ensures both strong security and true decentralization.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Mining Streams</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-blue-400 font-bold">Stream A</div>
                  <div className="text-white font-semibold">ASIC Mining</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• <strong className="text-white">Block time:</strong> 10 seconds</li>
                <li>• <strong className="text-white">Reward share:</strong> 60% of block rewards</li>
                <li>• <strong className="text-white">Algorithm:</strong> Memory-hard, ASIC-friendly</li>
                <li>• <strong className="text-white">Purpose:</strong> Economic security anchor</li>
              </ul>
              <Link href="/docs/mining/stream-a" className="inline-flex items-center gap-1 text-blue-400 text-sm mt-4 hover:underline">
                Stream A Guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-8 h-8 text-emerald-400" />
                <div>
                  <div className="text-emerald-400 font-bold">Stream B</div>
                  <div className="text-white font-semibold">CPU/GPU Mining</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• <strong className="text-white">Block time:</strong> 1 second</li>
                <li>• <strong className="text-white">Reward share:</strong> 40% of block rewards</li>
                <li>• <strong className="text-white">Algorithm:</strong> ASIC-resistant</li>
                <li>• <strong className="text-white">Purpose:</strong> Decentralization</li>
              </ul>
              <Link href="/docs/mining/stream-b" className="inline-flex items-center gap-1 text-emerald-400 text-sm mt-4 hover:underline">
                Stream B Guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Reward Distribution</h2>
          <p className="text-gray-300 leading-relaxed">
            Block rewards are distributed between the two mining streams to incentivize both security and decentralization:
          </p>
          
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Stream</th><th className="py-3 px-4 text-gray-400">Share</th><th className="py-3 px-4 text-gray-400">Block Time</th><th className="py-3 px-4 text-gray-400">Hardware</th></tr></thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-3 px-4 text-white">Stream A</td><td className="py-3 px-4 text-blue-400 font-bold">60%</td><td className="py-3 px-4 text-gray-400">10 seconds</td><td className="py-3 px-4 text-gray-400">ASICs</td></tr>
                <tr><td className="py-3 px-4 text-white">Stream B</td><td className="py-3 px-4 text-emerald-400 font-bold">40%</td><td className="py-3 px-4 text-gray-400">1 second</td><td className="py-3 px-4 text-gray-400">CPU/GPU</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Getting Started</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-6 not-prose">
            <h3 className="text-lg font-bold text-white mb-4">Quick Start (Stream B - CPU/GPU)</h3>
            <div className="bg-pyrax-dark rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
              <pre>{`# Clone the mining software
git clone https://github.com/PYRAX-Chain/pyrax-mining
cd pyrax-mining

# Build the miner
cargo build --release --bin miner_b

# Start mining (replace with your wallet address)
./target/release/miner_b \\
  --pool stratum+tcp://pool.pyrax.org:3333 \\
  --wallet 0xYOUR_WALLET_ADDRESS \\
  --threads 4`}</pre>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Mining Pools</h2>
          <p className="text-gray-300 leading-relaxed">
            Solo mining is possible but joining a mining pool provides more consistent rewards. Official and community pools are available:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li>• <strong className="text-white">Official Pool:</strong> pool.pyrax.org (0.5% fee)</li>
            <li>• <strong className="text-white">Community pools:</strong> Listed on our ecosystem page</li>
          </ul>
        </article>

        {/* Next Steps */}
        <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Continue Learning</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/docs/mining/stream-a" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <div className="text-white font-semibold group-hover:text-pyrax-orange">Stream A Mining</div>
              <div className="text-sm text-gray-500">ASIC mining guide</div>
            </Link>
            <Link href="/docs/mining/stream-b" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <div className="text-white font-semibold group-hover:text-pyrax-orange">Stream B Mining</div>
              <div className="text-sm text-gray-500">CPU/GPU mining guide</div>
            </Link>
            <Link href="/docs/mining/rewards" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <div className="text-white font-semibold group-hover:text-pyrax-orange">Rewards & Economics</div>
              <div className="text-sm text-gray-500">Understand earnings</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
