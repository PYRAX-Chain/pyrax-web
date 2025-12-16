import Link from "next/link";
import { ChevronRight, Cpu, Zap, Shield, ArrowDown } from "lucide-react";

export default function TriStreamPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/docs/architecture" className="hover:text-white">Architecture</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">TriStream</span>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-4">
            <Cpu className="w-4 h-4" /> 12 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">TriStream Architecture</h1>
          <p className="text-xl text-gray-400">Understanding how PYRAX&apos;s three streams work together.</p>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed">
            The TriStream architecture is the foundation of PYRAX&apos;s ability to achieve 100,000+ TPS while maintaining strong security and decentralization. Unlike single-chain architectures, PYRAX uses three complementary &quot;streams&quot; that operate at different speeds and serve different purposes.
          </p>

          <div className="bg-pyrax-dark/50 border border-white/10 rounded-xl p-6 my-8 font-mono text-sm overflow-x-auto not-prose">
            <pre className="text-gray-300">{`┌─────────────────────────────────────────────────────────────┐
│                    TriStream ZK-DAG                          │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
 ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
 │  Stream A   │       │  Stream B   │       │  Stream C   │
 │  ASIC PoW   │       │ CPU/GPU PoW │       │ ZK Proofs   │
 │  10 sec     │       │   1 sec     │       │  100 ms     │
 └─────────────┘       └─────────────┘       └─────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Canonical DAG  │
                    │ (GHOSTDAG Order)│
                    └─────────────────┘`}</pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Stream Hierarchy</h2>
          <p className="text-gray-300 leading-relaxed">
            The three streams form a hierarchical structure where each layer serves a specific purpose:
          </p>

          <div className="space-y-4 my-8 not-prose">
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-purple-400" />
                <div className="text-purple-400 font-bold">Stream C: Transaction Layer</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Block time:</span> <span className="text-white font-mono">100ms</span></div>
                <div><span className="text-gray-500">TPS:</span> <span className="text-white font-mono">100,000+</span></div>
                <div><span className="text-gray-500">Purpose:</span> <span className="text-white">Fast transaction processing</span></div>
                <div><span className="text-gray-500">Finality:</span> <span className="text-white">ZK cryptographic proofs</span></div>
              </div>
              <p className="text-gray-400 text-sm mt-3">Stream C is where users interact. It provides instant transaction confirmation and parallel execution for maximum throughput.</p>
            </div>

            <div className="flex justify-center"><ArrowDown className="w-6 h-6 text-gray-600" /></div>

            <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="w-6 h-6 text-emerald-400" />
                <div className="text-emerald-400 font-bold">Stream B: Decentralization Layer</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Block time:</span> <span className="text-white font-mono">1 second</span></div>
                <div><span className="text-gray-500">Hardware:</span> <span className="text-white font-mono">CPU/GPU</span></div>
                <div><span className="text-gray-500">Purpose:</span> <span className="text-white">Geographic distribution</span></div>
                <div><span className="text-gray-500">Rewards:</span> <span className="text-white">40% of block rewards</span></div>
              </div>
              <p className="text-gray-400 text-sm mt-3">Stream B aggregates Stream C blocks and provides decentralization through accessible CPU/GPU mining.</p>
            </div>

            <div className="flex justify-center"><ArrowDown className="w-6 h-6 text-gray-600" /></div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-blue-400" />
                <div className="text-blue-400 font-bold">Stream A: Security Anchor</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Block time:</span> <span className="text-white font-mono">10 seconds</span></div>
                <div><span className="text-gray-500">Hardware:</span> <span className="text-white font-mono">ASICs</span></div>
                <div><span className="text-gray-500">Purpose:</span> <span className="text-white">Economic security</span></div>
                <div><span className="text-gray-500">Rewards:</span> <span className="text-white">60% of block rewards</span></div>
              </div>
              <p className="text-gray-400 text-sm mt-3">Stream A provides the security anchor through capital-intensive ASIC mining, making attacks economically infeasible.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why Three Streams?</h2>
          <p className="text-gray-300 leading-relaxed">
            Traditional blockchains force a tradeoff: either be fast (but centralized) or be secure (but slow). PYRAX&apos;s TriStream architecture breaks this tradeoff by separating concerns:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li>• <strong className="text-white">Stream A</strong> maximizes security through economic cost</li>
            <li>• <strong className="text-white">Stream B</strong> maximizes decentralization through accessibility</li>
            <li>• <strong className="text-white">Stream C</strong> maximizes speed through parallel execution</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">BlockDAG Structure</h2>
          <p className="text-gray-300 leading-relaxed">
            All three streams contribute blocks to a single BlockDAG (Directed Acyclic Graph). Unlike linear chains where each block has one parent, PYRAX blocks can reference multiple parents, enabling concurrent block production without orphaning.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The GHOSTDAG protocol provides deterministic ordering of all blocks, ensuring that all nodes agree on transaction execution order despite the parallel nature of block production.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">ZK Finality</h2>
          <p className="text-gray-300 leading-relaxed">
            Stream C generates zero-knowledge proofs that cryptographically attest to the correctness of state transitions. Once a ZK checkpoint is produced:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li>• Transactions become <strong className="text-white">irreversible</strong></li>
            <li>• Light clients can verify state with <strong className="text-white">minimal data</strong></li>
            <li>• Bridges can trust the checkpoint as a <strong className="text-white">security anchor</strong></li>
          </ul>
        </article>

        <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Deep Dive</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/docs/architecture/stream-a" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <div className="text-white font-semibold group-hover:text-pyrax-orange">Stream A Details</div>
              <div className="text-sm text-gray-500">ASIC mining internals</div>
            </Link>
            <Link href="/docs/architecture/stream-c" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <div className="text-white font-semibold group-hover:text-pyrax-orange">Stream C Details</div>
              <div className="text-sm text-gray-500">ZK verification system</div>
            </Link>
            <Link href="/docs/architecture/ghostdag" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <div className="text-white font-semibold group-hover:text-pyrax-orange">GHOSTDAG Consensus</div>
              <div className="text-sm text-gray-500">Ordering algorithm</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
