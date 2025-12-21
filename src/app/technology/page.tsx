import {
  GitBranch,
  Cpu,
  Shield,
  Zap,
  Box,
  Layers,
  ArrowRight,
  Clock,
  Activity,
  Lock,
  Server,
  CheckCircle,
  ChevronRight,
  Database,
  Gauge,
  Binary,
} from "lucide-react";
import Link from "next/link";

export default function TechnologyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pyrax-orange/5 via-purple-500/5 to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-6">
              <Shield className="h-4 w-4 text-purple-400" />
              Quantum-Resistant Cryptographic Finality
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              TriStream <span className="text-transparent bg-clip-text bg-gradient-to-r from-pyrax-orange to-purple-400">ZK-DAG</span>
            </h1>
            <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
              A novel Layer 1 blockchain combining Proof-of-Work BlockDAG consensus with 
              ZK-STARK cryptographic finality. Three streams working as one.
            </p>
            
            {/* Key Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { value: "100K+", label: "TPS", icon: Activity },
                { value: "100ms", label: "Block Time", icon: Clock },
                { value: "<1s", label: "Confirmation", icon: Zap },
                { value: "~1min", label: "ZK Finality", icon: Lock },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <stat.icon className="h-5 w-5 text-pyrax-orange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TriStream Architecture */}
      <section id="tristream" className="py-24 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">TriStream Architecture</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Three complementary streams working in harmony to achieve security, decentralization, and throughput.
            </p>
          </div>

          {/* Stream Flow Diagram */}
          <div className="mb-16 p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="grid lg:grid-cols-4 gap-6 items-center">
              <StreamBlock
                letter="C"
                color="purple"
                title="Stream C"
                subtitle="High-Speed Sequencer"
                specs={["100ms blocks", "100K+ TPS", "Parallel execution"]}
                arrow
              />
              <StreamBlock
                letter="B"
                color="green"
                title="Stream B"
                subtitle="GPU/CPU Mining"
                specs={["1s blocks", "40% rewards", "Decentralization"]}
                arrow
              />
              <StreamBlock
                letter="A"
                color="blue"
                title="Stream A"
                subtitle="ASIC Mining"
                specs={["10s blocks", "60% rewards", "Economic security"]}
                arrow
              />
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pyrax-orange/20 border border-purple-500/30 text-center">
                <Shield className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                <div className="text-lg font-bold text-white">ZK Checkpoint</div>
                <div className="text-sm text-gray-400 mt-1">Cryptographic Finality</div>
                <div className="text-xs text-purple-400 mt-2">~1 minute epochs</div>
              </div>
            </div>
          </div>

          {/* Stream Details */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stream A */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-400">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Stream A</h3>
                  <div className="text-sm text-blue-400">ASIC Mining</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                High-throughput security through specialized hardware mining. Provides the economic backbone of the network.
              </p>
              <div className="space-y-3">
                <SpecRow label="Block Time" value="10 seconds" />
                <SpecRow label="Reward Share" value="60%" />
                <SpecRow label="Algorithm" value="PYRAX-A (memory-hard)" />
                <SpecRow label="Difficulty Adj." value="Every 720 blocks (~2h)" />
                <SpecRow label="Block Reward" value="50 PYRAX" />
              </div>
            </div>

            {/* Stream B */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-400">B</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Stream B</h3>
                  <div className="text-sm text-green-400">GPU/CPU Mining</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Decentralized consensus through consumer hardware. ASIC-resistant algorithm ensures broad participation.
              </p>
              <div className="space-y-3">
                <SpecRow label="Block Time" value="1 second" />
                <SpecRow label="Reward Share" value="40%" />
                <SpecRow label="Algorithm" value="PYRAX-B (ASIC-resistant)" />
                <SpecRow label="Hardware" value="GPU/CPU optimized" />
                <SpecRow label="Block Reward" value="25 PYRAX" />
              </div>
            </div>

            {/* Stream C */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-400">C</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Stream C</h3>
                  <div className="text-sm text-purple-400">High-Speed Sequencer</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Ultra-fast block production with parallel transaction execution. Enables massive throughput while anchoring to PoW security.
              </p>
              <div className="space-y-3">
                <SpecRow label="Block Time" value="100ms" />
                <SpecRow label="TX/Block" value="Up to 10,000" />
                <SpecRow label="Parallel Threads" value="64 max" />
                <SpecRow label="Target TPS" value="100,000+" />
                <SpecRow label="Theoretical TPS" value="640,000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GHOSTDAG Consensus */}
      <section id="ghostdag" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">BlockDAG & GHOSTDAG</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Unlike linear blockchains, PYRAX uses a Directed Acyclic Graph structure with GHOSTDAG ordering for deterministic consensus.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: DAG Visualization */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-pyrax-orange" />
                BlockDAG Structure
              </h3>
              
              {/* Visual DAG representation */}
              <div className="relative h-64 mb-6">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Connection lines */}
                  <line x1="60" y1="40" x2="140" y2="80" stroke="#ffffff20" strokeWidth="2" />
                  <line x1="60" y1="40" x2="140" y2="120" stroke="#ffffff20" strokeWidth="2" />
                  <line x1="140" y1="80" x2="220" y2="100" stroke="#ffffff20" strokeWidth="2" />
                  <line x1="140" y1="120" x2="220" y2="100" stroke="#ffffff20" strokeWidth="2" />
                  <line x1="220" y1="100" x2="300" y2="60" stroke="#ffffff20" strokeWidth="2" />
                  <line x1="220" y1="100" x2="300" y2="140" stroke="#ffffff20" strokeWidth="2" />
                  <line x1="300" y1="60" x2="360" y2="100" stroke="#F68724" strokeWidth="2" />
                  <line x1="300" y1="140" x2="360" y2="100" stroke="#F68724" strokeWidth="2" />
                  
                  {/* Genesis */}
                  <circle cx="60" cy="40" r="20" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                  <text x="60" y="45" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">G</text>
                  
                  {/* Blue blocks */}
                  <circle cx="140" cy="80" r="16" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="140" cy="120" r="16" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="220" cy="100" r="16" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="300" cy="60" r="16" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                  
                  {/* Red block (concurrent) */}
                  <circle cx="300" cy="140" r="16" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" />
                  
                  {/* Selected tip */}
                  <circle cx="360" cy="100" r="20" fill="#F68724" fillOpacity="0.3" stroke="#F68724" strokeWidth="2" />
                  <text x="360" y="105" textAnchor="middle" fill="#F68724" fontSize="12" fontWeight="bold">TIP</text>
                </svg>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500/30 border border-blue-500" />
                  <span className="text-gray-400">Blue (honest)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500/30 border border-red-500" />
                  <span className="text-gray-400">Red (concurrent)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-pyrax-orange/30 border border-pyrax-orange" />
                  <span className="text-gray-400">Selected tip</span>
                </div>
              </div>
            </div>

            {/* Right: GHOSTDAG Details */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="h-6 w-6 text-pyrax-orange" />
                  <h3 className="text-lg font-bold text-white">GHOSTDAG Ordering</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Blue/Red Classification:</strong> Blocks classified by connectivity to honest majority</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Selected Parent Chain:</strong> Backbone for canonical ordering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Mergeset Ordering:</strong> Blue before red, topological order</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Hash Tie-Breaking:</strong> Never by arrival time, always deterministic</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Box className="h-6 w-6 text-pyrax-orange" />
                  <h3 className="text-lg font-bold text-white">Key Properties</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-gray-500">Concurrent Blocks</div>
                    <div className="text-white font-semibold">No Orphaning</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-gray-500">Execution</div>
                    <div className="text-white font-semibold">Deterministic</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-gray-500">Nonce Conflicts</div>
                    <div className="text-white font-semibold">First Wins</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-xs text-gray-500">Double Spend</div>
                    <div className="text-white font-semibold">Impossible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZK-STARK Finality */}
      <section id="zk" className="py-24 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
              <Lock className="h-4 w-4" />
              Post-Quantum Security
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">ZK-STARK Cryptographic Finality</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Mathematical certainty, not probability. Once checkpointed, blocks cannot be reorged — not even with 100% hashrate.
            </p>
          </div>

          {/* Why ZK-STARKs */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { title: "Quantum Safe", desc: "Hash-based cryptography, no elliptic curves vulnerable to quantum attacks", icon: Shield },
              { title: "No Trusted Setup", desc: "Transparent setup eliminates backdoor risks entirely", icon: Lock },
              { title: "Scalable Proofs", desc: "Proof size scales logarithmically with computation", icon: Gauge },
              { title: "Fast Verification", desc: "Sub-second verification even for complex proofs", icon: Zap },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                <item.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Finality Flow */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-6 text-center">ZK-STARK Finality Flow</h3>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: "1", title: "Epoch Execution", desc: "Stream C executes 600 blocks (~1 min)" },
                { step: "2", title: "State Commitment", desc: "Final state root computed" },
                { step: "3", title: "Proof Generation", desc: "ZK-STARK proof generated" },
                { step: "4", title: "Verification", desc: "Network verifies in <1s" },
                { step: "5", title: "Finality", desc: "Mathematically irreversible" },
              ].map((item, i) => (
                <div key={item.step} className="relative text-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-400 font-bold">{item.step}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                  {i < 4 && (
                    <ChevronRight className="hidden md:block absolute top-4 -right-2 h-5 w-5 text-purple-500/50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Finality Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Chain</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Consensus</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Finality Type</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Time to Final</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Reorg Risk</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Quantum Safe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Bitcoin</td>
                    <td className="text-center py-3 px-4 text-gray-400">Nakamoto PoW</td>
                    <td className="text-center py-3 px-4 text-gray-400">Probabilistic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~60 min</td>
                    <td className="text-center py-3 px-4 text-red-400">Yes</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Ethereum</td>
                    <td className="text-center py-3 px-4 text-gray-400">Casper FFG PoS</td>
                    <td className="text-center py-3 px-4 text-gray-400">Economic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~15 min</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Slashing</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Solana</td>
                    <td className="text-center py-3 px-4 text-gray-400">Tower BFT</td>
                    <td className="text-center py-3 px-4 text-gray-400">Optimistic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~13 sec</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Validator</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Cardano</td>
                    <td className="text-center py-3 px-4 text-gray-400">Ouroboros PoS</td>
                    <td className="text-center py-3 px-4 text-gray-400">Probabilistic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~20 min</td>
                    <td className="text-center py-3 px-4 text-red-400">Yes</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Avalanche</td>
                    <td className="text-center py-3 px-4 text-gray-400">Snowman</td>
                    <td className="text-center py-3 px-4 text-gray-400">Probabilistic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~2 sec</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Validator</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Polkadot</td>
                    <td className="text-center py-3 px-4 text-gray-400">GRANDPA/BABE</td>
                    <td className="text-center py-3 px-4 text-gray-400">Deterministic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~60 sec</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Slashing</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Cosmos</td>
                    <td className="text-center py-3 px-4 text-gray-400">Tendermint BFT</td>
                    <td className="text-center py-3 px-4 text-gray-400">Instant</td>
                    <td className="text-center py-3 px-4 text-gray-400">~6 sec</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Validator</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">BNB Chain</td>
                    <td className="text-center py-3 px-4 text-gray-400">PoSA</td>
                    <td className="text-center py-3 px-4 text-gray-400">Probabilistic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~45 sec</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Validator</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Polygon PoS</td>
                    <td className="text-center py-3 px-4 text-gray-400">Heimdall/Bor</td>
                    <td className="text-center py-3 px-4 text-gray-400">Checkpoint</td>
                    <td className="text-center py-3 px-4 text-gray-400">~30 min</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Checkpoint</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Arbitrum</td>
                    <td className="text-center py-3 px-4 text-gray-400">Optimistic Rollup</td>
                    <td className="text-center py-3 px-4 text-gray-400">Fraud Proof</td>
                    <td className="text-center py-3 px-4 text-gray-400">~7 days</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Challenge</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Near</td>
                    <td className="text-center py-3 px-4 text-gray-400">Doomslug + Nightshade</td>
                    <td className="text-center py-3 px-4 text-gray-400">Deterministic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~2 sec</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Slashing</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Aptos</td>
                    <td className="text-center py-3 px-4 text-gray-400">AptosBFT</td>
                    <td className="text-center py-3 px-4 text-gray-400">Deterministic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~1 sec</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Validator</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Sui</td>
                    <td className="text-center py-3 px-4 text-gray-400">Narwhal/Bullshark</td>
                    <td className="text-center py-3 px-4 text-gray-400">Deterministic</td>
                    <td className="text-center py-3 px-4 text-gray-400">&lt;1 sec</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Validator</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">TON</td>
                    <td className="text-center py-3 px-4 text-gray-400">Catchain BFT</td>
                    <td className="text-center py-3 px-4 text-gray-400">Deterministic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~5 sec</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Validator</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr>
                    <td className="text-left py-3 px-4 text-gray-300 font-medium">Kaspa</td>
                    <td className="text-center py-3 px-4 text-gray-400">GHOSTDAG PoW</td>
                    <td className="text-center py-3 px-4 text-gray-400">Probabilistic</td>
                    <td className="text-center py-3 px-4 text-gray-400">~10 sec</td>
                    <td className="text-center py-3 px-4 text-red-400">Yes</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                  </tr>
                  <tr className="bg-purple-500/10">
                    <td className="text-left py-3 px-4 text-purple-400 font-bold">PYRAX</td>
                    <td className="text-center py-3 px-4 text-purple-400 font-bold">GHOSTDAG + ZK-STARK</td>
                    <td className="text-center py-3 px-4 text-purple-400 font-bold">Cryptographic</td>
                    <td className="text-center py-3 px-4 text-purple-400 font-bold">~1 min</td>
                    <td className="text-center py-3 px-4 text-green-400 font-bold">No</td>
                    <td className="text-center py-3 px-4 text-green-400 font-bold">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              * Finality times are approximate and based on official documentation. PYRAX achieves true cryptographic finality via ZK-STARKs — the only chain with quantum-resistant, mathematically irreversible finality.
            </p>
          </div>
        </div>
      </section>

      {/* EVM Compatibility */}
      <section id="evm" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Full EVM Compatibility</h2>
              <p className="text-gray-400 mb-8">
                Deploy existing Solidity contracts with zero modifications. PYRAX implements the complete Ethereum Virtual Machine with deterministic execution semantics.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">RPC Semantics</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                      <code className="px-2 py-0.5 rounded bg-pyrax-orange/20 text-pyrax-orange">latest</code>
                      <span>— Current DAG head</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <code className="px-2 py-0.5 rounded bg-pyrax-orange/20 text-pyrax-orange">safe</code>
                      <span>— Confirmation-based policy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <code className="px-2 py-0.5 rounded bg-pyrax-orange/20 text-pyrax-orange">finalized</code>
                      <span>— ZK-checkpointed (irreversible)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Fee Model (EIP-1559)</h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2 rounded bg-white/5">
                      <div className="text-lg font-bold text-red-400">50%</div>
                      <div className="text-xs text-gray-500">Base fee burned</div>
                    </div>
                    <div className="p-2 rounded bg-white/5">
                      <div className="text-lg font-bold text-green-400">40%</div>
                      <div className="text-xs text-gray-500">To block miner</div>
                    </div>
                    <div className="p-2 rounded bg-white/5">
                      <div className="text-lg font-bold text-purple-400">10%</div>
                      <div className="text-xs text-gray-500">To prover pool</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-pyrax-darker border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-gray-500 ml-2">Deploy.sol</span>
              </div>
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-300">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyContract {
    string public message;
    
    constructor(string memory _msg) {
        message = _msg;
    }
    
    function update(string memory _msg) public {
        message = _msg;
    }
}

// Deploy with standard tools:
// forge create --rpc-url https://rpc.pyrax.org
// hardhat deploy --network pyrax`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Summary */}
      <section className="py-24 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Technical Specifications</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: "Consensus", specs: [["Model", "GHOSTDAG + ZK-STARK"], ["Block Structure", "DAG (multi-parent)"], ["Finality", "Cryptographic (~1 min)"]] },
              { category: "Performance", specs: [["Target TPS", "100,000+"], ["Block Time", "100ms (Stream C)"], ["Confirmation", "<1 second"]] },
              { category: "Mining", specs: [["Streams", "Dual (ASIC + GPU)"], ["Algorithm A", "Memory-hard (ASIC)"], ["Algorithm B", "ASIC-resistant (GPU)"]] },
              { category: "Economics", specs: [["Primary Emission", "30B PYRAX"], ["Tail Emission", "0.5% annual"], ["Fee Burn", "50% base fee"]] },
              { category: "Smart Contracts", specs: [["VM", "EVM Compatible"], ["Language", "Solidity, Vyper"], ["Standards", "ERC-20, ERC-721, etc."]] },
              { category: "Security", specs: [["ZK System", "STARK (quantum-safe)"], ["Trusted Setup", "None required"], ["Proof Size", "~100KB"]] },
            ].map((section) => (
              <div key={section.category} className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold text-pyrax-orange mb-4">{section.category}</h3>
                <div className="space-y-2">
                  {section.specs.map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-pyrax-orange/20 via-purple-500/20 to-pyrax-orange/20 border border-white/10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Dive Deeper</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Read the full technical whitepaper for complete specifications, security proofs, and implementation details.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/whitepaper"
                className="inline-flex items-center gap-2 px-6 py-3 bg-pyrax-orange hover:bg-pyrax-amber text-white font-semibold rounded-lg transition-colors"
              >
                Read Whitepaper
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
              >
                Developer Docs
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StreamBlock({
  letter,
  color,
  title,
  subtitle,
  specs,
  arrow,
}: {
  letter: string;
  color: "blue" | "green" | "purple";
  title: string;
  subtitle: string;
  specs: string[];
  arrow?: boolean;
}) {
  const colors = {
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
    green: "from-green-500/20 to-green-500/5 border-green-500/30 text-green-400",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
  };

  return (
    <div className="relative">
      <div className={`p-5 rounded-xl bg-gradient-to-b ${colors[color]} border text-center`}>
        <div className={`w-10 h-10 rounded-lg bg-${color}-500/20 flex items-center justify-center mx-auto mb-3`}>
          <span className={`text-xl font-bold ${colors[color].split(" ").pop()}`}>{letter}</span>
        </div>
        <div className="text-white font-bold">{title}</div>
        <div className="text-xs text-gray-400 mb-3">{subtitle}</div>
        <div className="space-y-1">
          {specs.map((spec) => (
            <div key={spec} className="text-xs text-gray-500">{spec}</div>
          ))}
        </div>
      </div>
      {arrow && (
        <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2">
          <ChevronRight className="h-6 w-6 text-white/20" />
        </div>
      )}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
