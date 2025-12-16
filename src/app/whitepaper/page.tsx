"use client";

import Link from "next/link";
import { DocumentArrowDownIcon, BookOpenIcon, CpuChipIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
    <div className="text-2xl md:text-3xl font-bold text-pyrax-orange">{value}</div>
    <div className="text-sm text-gray-400 mt-1">{label}</div>
  </div>
);

const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id: string }) => (
  <section id={id} className="scroll-mt-24 mb-16 pl-6 relative">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pyrax-orange to-pyrax-orange/0 rounded-full" />
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
    <div className="text-gray-300 leading-relaxed space-y-4">{children}</div>
  </section>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mt-8">
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const CodeBlock = ({ children }: { children: string }) => (
  <div className="bg-pyrax-dark/50 border border-white/10 rounded-xl p-6 my-6 font-mono text-sm overflow-x-auto">
    <pre className="text-gray-300 whitespace-pre">{children}</pre>
  </div>
);

const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
    <div className="text-pyrax-orange font-semibold mb-2">{title}</div>
    <p className="text-sm text-gray-400">{children}</p>
  </div>
);

const StreamCard = ({ stream, title, desc, color, features }: { stream: string; title: string; desc: string; color: string; features: string[] }) => (
  <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${color} p-6`}>
    <div className="absolute top-0 right-0 text-8xl font-black text-white/5">{stream}</div>
    <div className="relative z-10">
      <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Stream {stream}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm mb-4">{desc}</p>
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
            <ChevronRightIcon className="w-4 h-4 text-pyrax-orange" />{f}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pyrax-orange/20 via-transparent to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pyrax-orange/10 border border-pyrax-orange/20 text-pyrax-orange text-sm font-medium mb-6">
            <BookOpenIcon className="w-4 h-4" />Technical Whitepaper v2.0
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            PYRAX: A TriStream<span className="block text-transparent bg-clip-text bg-gradient-to-r from-pyrax-orange to-amber-400">ZK-DAG Blockchain</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Combining Proof-of-Work BlockDAG consensus with zero-knowledge proof-based finality to achieve industry-leading throughput exceeding 100,000 TPS.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/whitepaper/pyrax_whitepaper.pdf" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pyrax-orange hover:bg-pyrax-orange/90 text-white font-semibold transition-colors">
              <DocumentArrowDownIcon className="w-5 h-5" />Download PDF
            </a>
            <a href="#abstract" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">Read Online</a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-white/10 bg-pyrax-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label="Transactions Per Second" value="100,000+" />
            <StatBox label="Block Finality" value="100ms" />
            <StatBox label="Confirmation Time" value="<1 sec" />
            <StatBox label="ZK Finality" value="Cryptographic" />
          </div>
        </div>
      </div>

      {/* TOC */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Table of Contents</h3>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            {["Abstract", "1. Introduction", "2. Design Goals", "3. TriStream Architecture", "4. Consensus Mechanism", "5. EVM Execution", "6. Stream C: ZK Verification", "7. Crucible: AI Compute", "8. Foundry: ML Training", "9. Economic Model", "10. Governance", "11. Roadmap", "12. Security", "13. Conclusion"].map((t, i) => (
              <a key={i} href={`#sec-${i}`} className="text-gray-400 hover:text-pyrax-orange transition-colors py-1">{t}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Section title="Abstract" id="abstract">
          <p className="text-lg">PYRAX is a novel Layer 1 blockchain that combines Proof-of-Work block directed acyclic graph (BlockDAG) consensus with zero-knowledge proof-based finality. The protocol introduces a <strong className="text-white">TriStream architecture</strong> consisting of three complementary streams: <strong className="text-blue-400">Stream A</strong> for ASIC mining, <strong className="text-emerald-400">Stream B</strong> for CPU/GPU mining, and <strong className="text-purple-400">Stream C</strong> for high-speed transaction sequencing with ZK verification.</p>
          <p>This design achieves <strong className="text-pyrax-orange">industry-leading throughput exceeding 100,000 TPS</strong>, strong security guarantees, hardware decentralization, and deterministic finality while maintaining full EVM compatibility.</p>
          <div className="grid md:grid-cols-3 gap-4 my-8">
            <StreamCard stream="A" title="ASIC Mining" desc="High-throughput block production optimized for specialized hardware." color="from-blue-900/50 to-blue-950/50" features={["10 second blocks", "Economic security", "Higher rewards"]} />
            <StreamCard stream="B" title="CPU/GPU Mining" desc="Accessible mining for commodity hardware, promoting decentralization." color="from-emerald-900/50 to-emerald-950/50" features={["1 second blocks", "ASIC-resistant", "Geographic distribution"]} />
            <StreamCard stream="C" title="ZK Verification" desc="Ultra-fast transaction sequencing with ZK proofs for cryptographic finality." color="from-purple-900/50 to-purple-950/50" features={["100ms blocks", "10,000 tx/block", "Parallel execution"]} />
          </div>
        </Section>

        <Section title="1. Introduction" id="sec-1">
          <SubSection title="1.1 Background">
            <p>Traditional blockchain architectures face fundamental tradeoffs between throughput, decentralization, and security. Linear chain structures inherently limit transaction throughput due to sequential block production. BlockDAG protocols address this by allowing multiple concurrent blocks, but introduce challenges in deterministic transaction ordering for smart contracts.</p>
            <p>Zero-knowledge proofs enable succinct verification of complex computations, providing cryptographic finality guarantees. PYRAX integrates ZK proofs into a PoW consensus system while maintaining the permissionless nature of mining.</p>
          </SubSection>
          <SubSection title="1.2 Key Innovations">
            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard title="Dual-Algorithm Mining">Separate mining lanes for different hardware classes, balancing security and decentralization.</InfoCard>
              <InfoCard title="Deterministic DAG Ordering">GHOSTDAG-inspired canonical ordering with hash-based tie-breaking, never relying on arrival time.</InfoCard>
              <InfoCard title="ZK Finality Checkpoints">Periodic proofs of epoch state commitments, providing cryptographic finality guarantees.</InfoCard>
              <InfoCard title="Unified Token Economy">Single native token (PYRX) for gas, mining rewards, and prover incentives.</InfoCard>
            </div>
          </SubSection>
        </Section>

        <Section title="2. Design Goals" id="sec-2">
          <SubSection title="2.1 Primary Objectives">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Goal</th><th className="text-left py-3 px-4 text-gray-400">Description</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">Extreme Throughput</td><td className="py-3 px-4 text-gray-400">100,000+ TPS through parallel execution and fast block times</td></tr>
                  <tr><td className="py-3 px-4 text-white">Sub-Second Finality</td><td className="py-3 px-4 text-gray-400">100ms Stream C blocks with instant transaction confirmation</td></tr>
                  <tr><td className="py-3 px-4 text-white">Decentralization</td><td className="py-3 px-4 text-gray-400">Enable participation from diverse hardware and geographic regions</td></tr>
                  <tr><td className="py-3 px-4 text-white">Security</td><td className="py-3 px-4 text-gray-400">Strong economic security through dual-stream PoW</td></tr>
                  <tr><td className="py-3 px-4 text-white">ZK Finality</td><td className="py-3 px-4 text-gray-400">Cryptographic finality through zero-knowledge proofs</td></tr>
                  <tr><td className="py-3 px-4 text-white">EVM Compatibility</td><td className="py-3 px-4 text-gray-400">Full compatibility with Ethereum smart contracts and tooling</td></tr>
                  <tr><td className="py-3 px-4 text-white">Credibility</td><td className="py-3 px-4 text-gray-400">No admin keys, no governance token voting on consensus rules</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>
          <SubSection title="2.2 Non-Goals">
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-red-400">✗</span><strong className="text-white">Proof-of-Stake:</strong> PYRAX is fundamentally a Proof-of-Work system</li>
              <li className="flex items-start gap-2"><span className="text-red-400">✗</span><strong className="text-white">Cross-Chain Bridges:</strong> Native bridge functionality is out of initial scope</li>
              <li className="flex items-start gap-2"><span className="text-red-400">✗</span><strong className="text-white">Privacy Features:</strong> Transaction privacy is not a core protocol feature</li>
            </ul>
          </SubSection>
        </Section>

        <Section title="3. TriStream ZK-DAG Architecture" id="sec-3">
          <p>The TriStream architecture organizes block production and verification into three complementary streams:</p>
          <CodeBlock>{`                    ┌─────────────────────────────────────────────┐
                    │              TriStream ZK-DAG               │
                    └─────────────────────────────────────────────┘
                                         │
           ┌─────────────────────────────┼─────────────────────────────┐
           │                             │                             │
           ▼                             ▼                             ▼
    ┌─────────────┐               ┌─────────────┐               ┌─────────────┐
    │  Stream A   │               │  Stream B   │               │  Stream C   │
    │  ASIC PoW   │               │ CPU/GPU PoW │               │ ZK Proofs   │
    └─────────────┘               └─────────────┘               └─────────────┘`}</CodeBlock>
          
          <SubSection title="3.1 Stream Hierarchy">
            <CodeBlock>{`Stream C (100ms)  ──► Transaction Processing (100,000+ TPS)
    │                  - Parallel execution, instant confirmation
    ▼
Stream B (1s)     ──► Decentralization Layer
    │                  - CPU/GPU mining, geographic distribution
    ▼
Stream A (10s)    ──► Security Anchor
    │                  - ASIC mining, economic security
    ▼
ZK Checkpoints    ──► Cryptographic Finality
                       - Irreversible state, light client proofs`}</CodeBlock>
          </SubSection>

          <SubSection title="3.2 Parallel Execution Engine">
            <p>PYRAX implements a SEALEVEL-inspired parallel execution engine that analyzes transaction dependencies and executes non-conflicting transactions simultaneously.</p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Metric</th><th className="text-left py-3 px-4 text-gray-400">Value</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">Max parallel threads</td><td className="py-3 px-4 text-gray-400">64</td></tr>
                  <tr><td className="py-3 px-4 text-white">Transactions per batch</td><td className="py-3 px-4 text-gray-400">Up to 1,000</td></tr>
                  <tr><td className="py-3 px-4 text-white">Batch execution time</td><td className="py-3 px-4 text-gray-400">~10ms</td></tr>
                  <tr><td className="py-3 px-4 text-white">Theoretical max TPS</td><td className="py-3 px-4 text-gray-400">640,000</td></tr>
                  <tr><td className="py-3 px-4 text-white">Practical target TPS</td><td className="py-3 px-4 text-gray-400">100,000+</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>
        </Section>

        <Section title="4. Consensus Mechanism" id="sec-4">
          <SubSection title="4.1 BlockDAG Structure">
            <p>PYRAX uses a BlockDAG where each block may reference multiple parent blocks. This allows concurrent block production without orphaning, increasing overall throughput.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1 flex-shrink-0" />Each block references 1 to k parent blocks (k is the concurrency parameter)</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1 flex-shrink-0" />No cycles allowed (directed acyclic graph)</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1 flex-shrink-0" />Both PoW-A and PoW-B blocks exist in the same DAG</li>
            </ul>
          </SubSection>
          <SubSection title="4.2 GHOSTDAG Canonical Ordering">
            <p>PYRAX implements GHOSTDAG-style canonical ordering. Blocks are classified as "blue" (well-connected, honest) or "red" (potentially adversarial). This ordering is fully deterministic and depends only on DAG structure and block hashes, never on arrival times.</p>
          </SubSection>
          <SubSection title="4.3 Difficulty Adjustment">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-5">
                <div className="text-blue-400 font-semibold mb-2">Stream A</div>
                <p className="text-sm text-gray-400">Target: 10s blocks, Adjustment: 720 blocks (~2 hours)</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-5">
                <div className="text-emerald-400 font-semibold mb-2">Stream B</div>
                <p className="text-sm text-gray-400">Target: 30s blocks, Adjustment: 240 blocks (~2 hours)</p>
              </div>
            </div>
          </SubSection>
        </Section>

        <Section title="5. EVM Execution Model" id="sec-5">
          <p>PYRAX implements full EVM compatibility with deterministic execution. Transactions execute in canonical block order from GHOSTDAG.</p>
          <SubSection title="5.1 Gas and Fees (EIP-1559 Style)">
            <CodeBlock>{`Fee Distribution:
  50% of base_fee  → burned
  40% of total_fee → block miner (Stream A or B)
  10% of total_fee → Prover Reward Pool (Stream C)`}</CodeBlock>
          </SubSection>
          <SubSection title="5.2 RPC Semantics">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Tag</th><th className="text-left py-3 px-4 text-gray-400">Meaning</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">latest</td><td className="py-3 px-4 text-gray-400">Current DAG head (highest blue score tip)</td></tr>
                  <tr><td className="py-3 px-4 text-white">safe</td><td className="py-3 px-4 text-gray-400">Block with sufficient confirmations</td></tr>
                  <tr><td className="py-3 px-4 text-white">finalized</td><td className="py-3 px-4 text-gray-400">Block covered by ZK checkpoint</td></tr>
                  <tr><td className="py-3 px-4 text-white">pending</td><td className="py-3 px-4 text-gray-400">Mempool transactions (not yet in DAG)</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>
        </Section>

        <Section title="6. Stream C: ZK Verification" id="sec-6">
          <p>Stream C provides cryptographic finality through zero-knowledge proofs of epoch state transitions.</p>
          <SubSection title="6.1 Finalized Semantics">
            <p>Once a valid ZK checkpoint is accepted:</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Irreversibility:</strong> Blocks in the epoch cannot be reorged</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Light Client Proof:</strong> Checkpoint provides succinct verification</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Bridge Anchor:</strong> External systems can use checkpoint as trust anchor</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Pruning:</strong> Nodes may prune pre-checkpoint state</li>
            </ul>
          </SubSection>
          <SubSection title="6.2 Prover Economics">
            <p>Prover Reward Pool accumulates from 10% fee allocation. Provers compete to submit valid proofs; first valid submission receives epoch reward.</p>
          </SubSection>
        </Section>

        <Section title="7. Crucible: AI Compute Layer" id="sec-7">
          <p><strong className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pyrax-orange">Crucible</strong> is PYRAX&apos;s native AI compute layer that extends Stream B&apos;s GPU mining infrastructure to provide decentralized AI inference services. Just as a crucible transforms raw materials into refined metal, PYRAX Crucible transforms GPU compute into refined AI intelligence.</p>
          
          <SubSection title="7.1 Overview">
            <p>Stream B miners have powerful GPUs that are underutilized between mining operations. Crucible enables these GPUs to process AI inference jobs (LLM text generation, image generation, embeddings) when not actively mining, creating a decentralized AI compute network.</p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <InfoCard title="Trustless Verification">Results verified cryptographically via ZK proofs or optimistic verification with slashing.</InfoCard>
              <InfoCard title="Permissionless">Any GPU miner can become an AI worker by staking PYRX.</InfoCard>
              <InfoCard title="EVM-Integrated">Smart contracts can call AI inference via native precompiles.</InfoCard>
            </div>
          </SubSection>

          <SubSection title="7.2 Supported Workloads">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Workload</th><th className="py-3 px-4 text-gray-400">Examples</th><th className="py-3 px-4 text-gray-400">VRAM</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">Text Generation</td><td className="py-3 px-4 text-gray-400">Llama 3, Mistral</td><td className="py-3 px-4 text-gray-400">8-16 GB</td></tr>
                  <tr><td className="py-3 px-4 text-white">Image Generation</td><td className="py-3 px-4 text-gray-400">SDXL, Flux</td><td className="py-3 px-4 text-gray-400">12-24 GB</td></tr>
                  <tr><td className="py-3 px-4 text-white">Embeddings</td><td className="py-3 px-4 text-gray-400">BGE, E5</td><td className="py-3 px-4 text-gray-400">2-4 GB</td></tr>
                  <tr><td className="py-3 px-4 text-white">Classification</td><td className="py-3 px-4 text-gray-400">CLIP, ViT</td><td className="py-3 px-4 text-gray-400">4-8 GB</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="7.3 Economic Model">
            <CodeBlock>{`AI Job Payment Distribution:
  GPU Worker:        85%  (executes inference)
  Verifier:           5%  (validates result)
  Protocol Treasury:  5%  (ecosystem fund)
  Burned:             5%  (deflationary)`}</CodeBlock>
            <p className="mt-4">Workers must stake PYRX to participate, with higher stakes unlocking more concurrent jobs and priority routing.</p>
          </SubSection>

          <SubSection title="7.4 Smart Contract Integration">
            <p>AI inference is accessible from smart contracts via native precompiles:</p>
            <CodeBlock>{`// Solidity Example
interface IPyraxAI {
    function generateText(
        string calldata model,
        string calldata prompt,
        uint256 maxTokens
    ) external returns (bytes32 jobId);
}

// Usage in contract
bytes32 job = AI.generateText("llama-3-8b", "Hello", 100);`}</CodeBlock>
          </SubSection>
        </Section>

        <Section title="8. Foundry: ML Training Platform" id="sec-8">
          <p>While Crucible handles AI inference (running pre-trained models), <strong className="text-orange-400">PYRAX Foundry</strong> enables decentralized machine learning training. Together, they form the complete AI lifecycle on PYRAX.</p>
          
          <SubSection title="8.1 Architecture">
            <p>Foundry leverages the same GPU network as Crucible but for training workloads. GPU providers earn PYRX for contributing compute cycles to distributed training jobs.</p>
            <CodeBlock>{`PYRAX AI Ecosystem:

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    FOUNDRY      │────▶│  Model Registry │────▶│    CRUCIBLE     │
│   (Training)    │     │   (IPFS+Chain)  │     │   (Inference)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                                               │
        └───────────── GPU Provider Network ────────────┘`}</CodeBlock>
          </SubSection>

          <SubSection title="8.2 Supported Training Types">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Type</th><th className="py-3 px-4 text-gray-400">Description</th><th className="py-3 px-4 text-gray-400">VRAM</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">Supervised Learning</td><td className="py-3 px-4 text-gray-400">Train on labeled datasets</td><td className="py-3 px-4 text-gray-400">8-80 GB</td></tr>
                  <tr><td className="py-3 px-4 text-white">Fine-Tuning (LoRA)</td><td className="py-3 px-4 text-gray-400">Efficient model adaptation</td><td className="py-3 px-4 text-gray-400">8-24 GB</td></tr>
                  <tr><td className="py-3 px-4 text-white">Federated Learning</td><td className="py-3 px-4 text-gray-400">Privacy-preserving training</td><td className="py-3 px-4 text-gray-400">4-16 GB</td></tr>
                  <tr><td className="py-3 px-4 text-white">RLHF</td><td className="py-3 px-4 text-gray-400">Human feedback alignment</td><td className="py-3 px-4 text-gray-400">24-80 GB</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="8.3 Byzantine-Resistant Aggregation">
            <p>Foundry uses Krum aggregation to tolerate malicious nodes during gradient aggregation:</p>
            <CodeBlock>{`Aggregation Strategies:
  FedAvg:           Simple average (trusted nodes only)
  Median:           Tolerates up to 50% Byzantine nodes
  Krum:             Optimal Byzantine resistance
  TrimmedMean:      Removes outlier gradients
  
ZK Verification:    Proofs of correct training execution`}</CodeBlock>
          </SubSection>

          <SubSection title="8.4 Economic Model">
            <CodeBlock>{`Training Job Payment Distribution:
  GPU Provider:      85%  (executes training)
  Protocol Treasury: 10%  (ecosystem fund)
  Burned:             5%  (deflationary)`}</CodeBlock>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="bg-orange-900/20 border border-orange-500/20 rounded-xl p-5">
                <div className="text-orange-400 font-semibold mb-2">Train-to-Earn</div>
                <p className="text-sm text-gray-400">GPU providers earn PYRX for contributing compute to training jobs</p>
              </div>
              <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-5">
                <div className="text-green-400 font-semibold mb-2">70% Cheaper</div>
                <p className="text-sm text-gray-400">Than AWS, GCP, Azure for equivalent GPU compute</p>
              </div>
            </div>
          </SubSection>
        </Section>

        <Section title="9. Economic Model" id="sec-9">
          <SubSection title="8.1 Token Overview">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-pyrax-orange">PYRX</div>
                <div className="text-sm text-gray-400 mt-1">Token Name</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-pyrax-orange">Cinders</div>
                <div className="text-sm text-gray-400 mt-1">Gas Unit</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-pyrax-orange">1B</div>
                <div className="text-sm text-gray-400 mt-1">Cinders per PYRX</div>
              </div>
            </div>
          </SubSection>
          <SubSection title="7.2 Emission Schedule">
            <p><strong className="text-white">Total Primary Emission:</strong> 30,000,000,000 PYRX over ~10-12 years with smooth decay curve. After primary emission, 0.5% annual tail inflation provides perpetual security budget.</p>
          </SubSection>
          <SubSection title="7.3 Genesis Distribution (25% = 7.5B PYRX)">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Allocation</th><th className="py-3 px-4 text-gray-400">%</th><th className="py-3 px-4 text-gray-400">Amount</th><th className="py-3 px-4 text-gray-400">Vesting</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">Presale</td><td className="py-3 px-4 text-gray-400">6%</td><td className="py-3 px-4 text-gray-400">1.8B</td><td className="py-3 px-4 text-gray-400">Per terms</td></tr>
                  <tr><td className="py-3 px-4 text-white">Ecosystem & Community</td><td className="py-3 px-4 text-gray-400">10%</td><td className="py-3 px-4 text-gray-400">3B</td><td className="py-3 px-4 text-gray-400">Various</td></tr>
                  <tr><td className="py-3 px-4 text-white">Core Contributors</td><td className="py-3 px-4 text-gray-400">3%</td><td className="py-3 px-4 text-gray-400">900M</td><td className="py-3 px-4 text-gray-400">4yr, 1yr cliff</td></tr>
                  <tr><td className="py-3 px-4 text-white">Security</td><td className="py-3 px-4 text-gray-400">2%</td><td className="py-3 px-4 text-gray-400">600M</td><td className="py-3 px-4 text-gray-400">As needed</td></tr>
                  <tr><td className="py-3 px-4 text-white">Liquidity</td><td className="py-3 px-4 text-gray-400">3%</td><td className="py-3 px-4 text-gray-400">900M</td><td className="py-3 px-4 text-gray-400">At launch</td></tr>
                  <tr><td className="py-3 px-4 text-white">Strategic</td><td className="py-3 px-4 text-gray-400">1%</td><td className="py-3 px-4 text-gray-400">300M</td><td className="py-3 px-4 text-gray-400">Milestones</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>
          <SubSection title="7.4 Mining Rewards">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-blue-400">60%</div>
                <div className="text-sm text-gray-400 mt-1">Stream A (ASIC)</div>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-emerald-400">40%</div>
                <div className="text-sm text-gray-400 mt-1">Stream B (CPU/GPU)</div>
              </div>
            </div>
          </SubSection>
        </Section>

        <Section title="10. Governance" id="sec-10">
          <p>PYRAX follows Ethereum-style governance:</p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">No On-Chain Token Voting:</strong> Consensus rules not changed by token votes</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Social Consensus:</strong> Major changes require broad community agreement</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Client Diversity:</strong> Multiple independent implementations encouraged</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">PIP Process:</strong> PYRAX Improvement Proposals (Draft → Review → Accepted → Final → Active)</li>
          </ul>
        </Section>

        <Section title="11. Network Roadmap" id="sec-11">
          <div className="space-y-4">
            {[
              { name: "Smelter", desc: "Internal Devnet - Core protocol development" },
              { name: "Kindling", desc: "Public Testnet v0.1 - Initial public testing" },
              { name: "Forgefire", desc: "Public Testnet v0.2 - Feature completeness + AI Compute beta" },
              { name: "Crownflame", desc: "Public Testnet v0.3 - Stream C + ZK + Full PACL integration" },
              { name: "Furnace", desc: "Mainnet v1.0 - Production launch with AI Compute Layer" },
            ].map((phase, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pyrax-orange/20 flex items-center justify-center text-pyrax-orange font-bold">{i + 1}</div>
                <div><div className="text-white font-semibold">{phase.name}</div><div className="text-sm text-gray-400">{phase.desc}</div></div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="12. Security Considerations" id="sec-12">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Threat</th><th className="text-left py-3 px-4 text-gray-400">Mitigation</th></tr></thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-3 px-4 text-white">51% hashrate attack</td><td className="py-3 px-4 text-gray-400">Dual-stream mining, ZK finality</td></tr>
                <tr><td className="py-3 px-4 text-white">Long-range attack</td><td className="py-3 px-4 text-gray-400">Checkpoint anchoring</td></tr>
                <tr><td className="py-3 px-4 text-white">Eclipse attack</td><td className="py-3 px-4 text-gray-400">Diverse peer connections, checkpoint sync</td></tr>
                <tr><td className="py-3 px-4 text-white">Transaction censorship</td><td className="py-3 px-4 text-gray-400">DAG structure allows multiple inclusion paths</td></tr>
              </tbody>
            </table>
          </div>
          <SubSection title="Security Practices">
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" />Regular security audits</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" />Bug bounty program</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" />Responsible disclosure process</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" />No admin keys in core protocol</li>
            </ul>
          </SubSection>
        </Section>

        <Section title="13. Conclusion" id="sec-13">
          <p>PYRAX introduces a novel approach to blockchain design through its TriStream ZK-DAG architecture. By combining dual-algorithm Proof-of-Work mining with zero-knowledge proof-based finality, PYRAX achieves:</p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">High throughput</strong> through DAG-based concurrent block production</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Strong security</strong> through dual mining streams</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Decentralization</strong> through accessible CPU/GPU mining</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Deterministic finality</strong> through ZK checkpoint proofs</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">EVM compatibility</strong> through deterministic canonical ordering</li>
          </ul>
          <div className="mt-8 p-6 bg-gradient-to-r from-pyrax-orange/10 to-amber-500/10 border border-pyrax-orange/20 rounded-2xl">
            <p className="text-white font-semibold mb-4">Ready to dive deeper?</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/technology" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pyrax-orange text-white text-sm font-medium"><CpuChipIcon className="w-4 h-4" />Explore Technology</Link>
              <Link href="/roadmap" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium">View Roadmap</Link>
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-500 italic">This whitepaper describes the PYRAX protocol as currently designed. Implementation details may evolve based on research and testing. This document does not constitute financial advice.</p>
        </Section>
      </div>
    </div>
  );
}
