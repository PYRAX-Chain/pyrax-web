import {
  GitBranch,
  Cpu,
  Shield,
  Zap,
  Box,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function TechnologyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            TriStream ZK-DAG
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            A novel blockchain architecture combining Proof-of-Work BlockDAG
            consensus with zero-knowledge proof-based finality.
          </p>
        </div>

        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Three Streams, One Chain
              </h2>
              <p className="text-gray-400 mb-6">
                PYRAX implements a TriStream architecture where three
                complementary streams work together to achieve security,
                decentralization, and finality.
              </p>

              <div className="space-y-6">
                <StreamCard
                  letter="A"
                  color="blue"
                  title="ASIC Mining Stream"
                  description="10-second blocks with 60% of mining rewards. High-throughput security through specialized hardware and capital commitment."
                />
                <StreamCard
                  letter="B"
                  color="green"
                  title="GPU/CPU Mining Stream"
                  description="1-second blocks with 40% of mining rewards. Powers Crucible AI compute alongside decentralized consensus."
                />
                <StreamCard
                  letter="C"
                  color="purple"
                  title="ZK Sequencer Stream"
                  description="100ms blocks enabling 100,000+ TPS. Parallel execution with ZK-STARK finality checkpoints every ~1 minute."
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-green-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
              <div className="relative p-8 rounded-2xl bg-pyrax-gray border border-white/10">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    Stream Integration
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold">A</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-300">PoW-A Blocks</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-400 font-bold">B</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-300">PoW-B Blocks</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-white/20" />
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                    <span className="text-white font-semibold">
                      Unified BlockDAG
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-white/20" />
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-bold">C</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-300">ZK Checkpoints</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            BlockDAG Architecture
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-pyrax-orange/10">
                  <GitBranch className="h-6 w-6 text-pyrax-orange" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Directed Acyclic Graph
                </h3>
              </div>
              <p className="text-gray-400">
                Unlike traditional linear blockchains, PYRAX uses a BlockDAG
                where each block can reference multiple parent blocks. This
                allows concurrent block production without orphaning, increasing
                overall throughput.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-pyrax-orange/10">
                  <Layers className="h-6 w-6 text-pyrax-orange" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  GHOSTDAG Ordering
                </h3>
              </div>
              <p className="text-gray-400">
                PYRAX implements GHOSTDAG-style canonical ordering with blue/red
                block classification, selected-parent backbone, and
                deterministic mergeset ordering. Tie-breaking is always by block
                hash, never by arrival time.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-pyrax-orange/10">
                  <Box className="h-6 w-6 text-pyrax-orange" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Deterministic Execution
                </h3>
              </div>
              <p className="text-gray-400">
                The canonical ordering enables deterministic EVM execution
                suitable for smart contracts. All nodes agree on transaction
                order regardless of when they received blocks.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-pyrax-orange/10">
                  <Shield className="h-6 w-6 text-pyrax-orange" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Nonce Conflict Resolution
                </h3>
              </div>
              <p className="text-gray-400">
                When transactions with the same nonce appear in concurrent
                blocks, the first in canonical order executes while others are
                rejected. This ensures no double-spend is possible.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            ZK Finality
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20">
              <div className="text-center mb-8">
                <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white">
                  Zero-Knowledge Checkpoints
                </h3>
                <p className="mt-2 text-gray-400 max-w-2xl mx-auto">
                  Stream C provides cryptographic finality through periodic
                  zero-knowledge proofs of epoch state transitions.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    Epoch
                  </div>
                  <div className="text-sm text-gray-400">
                    Fixed block intervals for checkpoint boundaries
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    Proof
                  </div>
                  <div className="text-sm text-gray-400">
                    ZK proof of correct state transition
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    Final
                  </div>
                  <div className="text-sm text-gray-400">
                    Irreversible once checkpoint is accepted
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg bg-white/5">
                <h4 className="font-semibold text-white mb-4">
                  Checkpoint Contains:
                </h4>
                <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-400" />
                    Epoch boundary block hash
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-400" />
                    State commitment (post-epoch)
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-400" />
                    Transaction commitment
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-400" />
                    ZK validity proof
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            EVM Compatibility
          </h2>

          <div className="max-w-4xl mx-auto p-8 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-pyrax-orange/10">
                <Cpu className="h-8 w-8 text-pyrax-orange" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Full Ethereum Virtual Machine Support
                </h3>
                <p className="text-gray-400">
                  Deploy existing Solidity contracts with deterministic
                  execution semantics.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h4 className="font-semibold text-white mb-2">
                  RPC Semantics
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <code className="text-pyrax-orange">latest</code> — Current
                    DAG head
                  </li>
                  <li>
                    <code className="text-pyrax-orange">safe</code> —
                    Confirmation-based policy
                  </li>
                  <li>
                    <code className="text-pyrax-orange">finalized</code> —
                    ZK-checkpointed
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h4 className="font-semibold text-white mb-2">
                  Fee Model (EIP-1559)
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>50% base fee burned</li>
                  <li>40% to block miner</li>
                  <li>10% to Prover Pool</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center p-8 rounded-xl bg-gradient-to-r from-pyrax-orange/10 to-purple-500/10 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              Learn More
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Read the full technical whitepaper for detailed specifications of
              the TriStream ZK-DAG protocol.
            </p>
            <a
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pyrax-orange hover:bg-pyrax-amber text-white font-semibold rounded-lg transition-colors"
            >
              Read Whitepaper
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

function StreamCard({
  letter,
  color,
  title,
  description,
}: {
  letter: string;
  color: "blue" | "green" | "purple";
  title: string;
  description: string;
}) {
  const colors = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    green: "bg-green-500/10 border-green-500/20 text-green-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}
        >
          <span className="font-bold">{letter}</span>
        </div>
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
