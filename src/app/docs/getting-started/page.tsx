import Link from "next/link";
import { ChevronRight, Zap, Cpu, Pickaxe, ArrowRight } from "lucide-react";

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Getting Started</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm mb-4">
            <Zap className="w-4 h-4" /> 5 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">What is PYRAX?</h1>
          <p className="text-xl text-gray-400">A beginner&apos;s guide to understanding the PYRAX blockchain.</p>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed">
            PYRAX is a next-generation Layer 1 blockchain that combines the security of Proof-of-Work with the speed of modern high-throughput networks. Using our innovative <strong className="text-white">TriStream ZK-DAG architecture</strong>, PYRAX achieves over 100,000 transactions per second while maintaining true decentralization.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The TriStream Architecture</h2>
          <p className="text-gray-300 leading-relaxed">
            Unlike traditional blockchains that use a single chain of blocks, PYRAX uses three complementary &quot;streams&quot; that work together:
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5">
              <div className="text-blue-400 font-bold mb-2">Stream A</div>
              <div className="text-white font-semibold mb-1">ASIC Mining</div>
              <p className="text-sm text-gray-400">10-second blocks providing the security anchor through specialized mining hardware.</p>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-5">
              <div className="text-emerald-400 font-bold mb-2">Stream B</div>
              <div className="text-white font-semibold mb-1">CPU/GPU Mining</div>
              <p className="text-sm text-gray-400">1-second blocks enabling anyone with a computer to participate in mining.</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-5">
              <div className="text-purple-400 font-bold mb-2">Stream C</div>
              <div className="text-white font-semibold mb-1">ZK Verification</div>
              <p className="text-sm text-gray-400">100ms blocks for instant transactions and cryptographic finality.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Key Features</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3"><span className="text-pyrax-orange">✓</span> <strong className="text-white">100,000+ TPS</strong> – Parallel execution engine processes transactions simultaneously</li>
            <li className="flex items-start gap-3"><span className="text-pyrax-orange">✓</span> <strong className="text-white">Sub-second finality</strong> – Transactions confirm in under 1 second</li>
            <li className="flex items-start gap-3"><span className="text-pyrax-orange">✓</span> <strong className="text-white">Full EVM compatibility</strong> – Deploy Ethereum smart contracts without changes</li>
            <li className="flex items-start gap-3"><span className="text-pyrax-orange">✓</span> <strong className="text-white">True decentralization</strong> – Anyone can mine with CPU, GPU, or ASIC</li>
            <li className="flex items-start gap-3"><span className="text-pyrax-orange">✓</span> <strong className="text-white">ZK finality</strong> – Cryptographic proofs make transactions irreversible</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The PYRX Token</h2>
          <p className="text-gray-300 leading-relaxed">PYRX is the native token of the PYRAX network. It&apos;s used for:</p>
          <ul className="space-y-2 text-gray-300">
            <li>• <strong className="text-white">Gas fees</strong> – Pay for transaction execution</li>
            <li>• <strong className="text-white">Mining rewards</strong> – Earned by miners securing the network</li>
            <li>• <strong className="text-white">Prover rewards</strong> – Earned by ZK proof generators</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why PYRAX?</h2>
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Feature</th><th className="py-3 px-4 text-gray-400">Bitcoin</th><th className="py-3 px-4 text-gray-400">Ethereum</th><th className="py-3 px-4 text-gray-400">Solana</th><th className="py-3 px-4 text-white font-bold">PYRAX</th></tr></thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-3 px-4 text-white">TPS</td><td className="py-3 px-4 text-gray-400">7</td><td className="py-3 px-4 text-gray-400">30</td><td className="py-3 px-4 text-gray-400">65,000</td><td className="py-3 px-4 text-pyrax-orange font-bold">100,000+</td></tr>
                <tr><td className="py-3 px-4 text-white">Finality</td><td className="py-3 px-4 text-gray-400">60 min</td><td className="py-3 px-4 text-gray-400">15 min</td><td className="py-3 px-4 text-gray-400">~1 sec</td><td className="py-3 px-4 text-pyrax-orange font-bold">100ms</td></tr>
                <tr><td className="py-3 px-4 text-white">Consensus</td><td className="py-3 px-4 text-gray-400">PoW</td><td className="py-3 px-4 text-gray-400">PoS</td><td className="py-3 px-4 text-gray-400">PoS</td><td className="py-3 px-4 text-pyrax-orange font-bold">PoW + ZK</td></tr>
                <tr><td className="py-3 px-4 text-white">EVM</td><td className="py-3 px-4 text-gray-400">No</td><td className="py-3 px-4 text-gray-400">Yes</td><td className="py-3 px-4 text-gray-400">No</td><td className="py-3 px-4 text-pyrax-orange font-bold">Yes</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* Next Steps */}
        <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/docs/architecture/tristream" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <Cpu className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-white font-semibold group-hover:text-pyrax-orange">TriStream Deep Dive</div>
                <div className="text-sm text-gray-500">Learn the architecture</div>
              </div>
            </Link>
            <Link href="/docs/mining/overview" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <Pickaxe className="w-8 h-8 text-orange-400" />
              <div>
                <div className="text-white font-semibold group-hover:text-pyrax-orange">Start Mining</div>
                <div className="text-sm text-gray-500">Earn PYRX tokens</div>
              </div>
            </Link>
            <Link href="/whitepaper" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <ArrowRight className="w-8 h-8 text-pyrax-orange" />
              <div>
                <div className="text-white font-semibold group-hover:text-pyrax-orange">Read Whitepaper</div>
                <div className="text-sm text-gray-500">Full technical spec</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
