"use client";

import Link from "next/link";
import { DocumentArrowDownIcon, BookOpenIcon, CpuChipIcon, ChevronRightIcon, CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";

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

const TokenCard = ({ name, symbol, supply, use, color }: { name: string; symbol: string; supply: string; use: string; color: string }) => (
  <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${color} p-6`}>
    <div className="absolute top-2 right-4 text-6xl font-black text-white/5">{symbol}</div>
    <div className="relative z-10">
      <div className="text-2xl font-bold text-white mb-1">{name}</div>
      <div className="text-pyrax-orange font-mono text-sm mb-3">{symbol}</div>
      <div className="text-sm text-gray-400 mb-2"><span className="text-gray-300">Supply:</span> {supply}</div>
      <div className="text-sm text-gray-400"><span className="text-gray-300">Use:</span> {use}</div>
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
            <BookOpenIcon className="w-4 h-4" />Technical Whitepaper v3.0
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            PYRAX: TriStream ZK-DAG<span className="block text-transparent bg-clip-text bg-gradient-to-r from-pyrax-orange to-amber-400">with Native AI Compute</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Next-generation L1 blockchain combining PoW BlockDAG, ZK finality, and native AI inference. 100,000+ TPS with working technology at presale.
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatBox label="Transactions Per Second" value="100,000+" />
            <StatBox label="Block Finality" value="100ms" />
            <StatBox label="Confirmation Time" value="<1 sec" />
            <StatBox label="ZK Finality" value="Cryptographic" />
            <StatBox label="AI Compute Cost" value="70% Less" />
          </div>
        </div>
      </div>

      {/* Working Tech Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircleIcon className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-bold text-white">Working Technology, Not Promises</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            {[
              { name: "Node Software", status: "✅ Built" },
              { name: "Mining Software", status: "✅ Built" },
              { name: "ZK Prover", status: "✅ Built" },
              { name: "Crucible AI", status: "✅ Built" },
              { name: "Foundry ML", status: "✅ Built" },
              { name: "Block Explorer", status: "✅ Built" },
              { name: "Desktop Wallet", status: "✅ Built" },
              { name: "Smart Contracts", status: "✅ EVM Compatible" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">{item.status.split(" ")[0]}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOC */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Table of Contents</h3>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            {[
              "Abstract",
              "1. Introduction",
              "2. TriStream Architecture",
              "3. Consensus Mechanism",
              "4. ZK-STARK Finality",
              "5. Crucible: AI Inference",
              "6. Foundry: ML Training",
              "7. XFERNO Launchpad",
              "8. Token Economics",
              "9. Presale Structure",
              "10. Governance",
              "11. Roadmap",
              "12. Security",
              "13. Conclusion"
            ].map((t, i) => (
              <a key={i} href={`#sec-${i}`} className="text-gray-400 hover:text-pyrax-orange transition-colors py-1">{t}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Section title="Abstract" id="sec-0">
          <p className="text-lg">PYRAX is a next-generation Layer 1 blockchain combining <strong className="text-white">Proof-of-Work BlockDAG consensus</strong> with <strong className="text-white">zero-knowledge proof-based finality</strong> and <strong className="text-white">native AI compute capabilities</strong>.</p>
          
          <div className="grid md:grid-cols-3 gap-4 my-8">
            <StreamCard stream="A" title="ASIC Mining" desc="Economic security anchor with specialized hardware." color="from-blue-900/50 to-blue-950/50" features={["10 second blocks", "60% mining rewards", "Highest hashrate security"]} />
            <StreamCard stream="B" title="GPU/CPU Mining" desc="Decentralization layer + AI compute infrastructure." color="from-emerald-900/50 to-emerald-950/50" features={["1 second blocks", "40% mining rewards", "Crucible AI integration"]} />
            <StreamCard stream="C" title="ZK Sequencer" desc="High-speed parallel execution with ZK finality." color="from-purple-900/50 to-purple-950/50" features={["100ms blocks", "10,000 tx/block", "100,000+ TPS"]} />
          </div>

          <SubSection title="Integrated AI Systems">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <SparklesIcon className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Crucible</span>
                </div>
                <p className="text-sm text-gray-400">Native AI inference layer using GPU miner infrastructure. LLM text generation, image generation, embeddings.</p>
              </div>
              <div className="bg-orange-900/20 border border-orange-500/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CpuChipIcon className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 font-semibold">Foundry</span>
                </div>
                <p className="text-sm text-gray-400">Decentralized ML training platform with federated learning and Byzantine-resistant aggregation.</p>
              </div>
            </div>
          </SubSection>

          <SubSection title="Three-Token Ecosystem">
            <div className="grid md:grid-cols-3 gap-4">
              <TokenCard name="PYRX" symbol="PYRX" supply="30B (mined)" use="Gas, mining, staking, AI payments" color="from-pyrax-orange/20 to-amber-900/20" />
              <TokenCard name="XFERNO" symbol="XF" supply="10B (fixed)" use="Launchpad, apps, governance" color="from-red-900/20 to-orange-900/20" />
              <TokenCard name="PYSWAP" symbol="PYSWAP" supply="Dynamic" use="DEX liquidity" color="from-blue-900/20 to-cyan-900/20" />
            </div>
          </SubSection>
        </Section>

        <Section title="1. Introduction" id="sec-1">
          <SubSection title="1.1 Design Philosophy">
            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard title="No Admin Keys">Core protocol has zero privileged access. True decentralization from day one.</InfoCard>
              <InfoCard title="No Governance Voting">Consensus rules are not changed by token holder votes. Social consensus only.</InfoCard>
              <InfoCard title="Hardware Diversity">Dual-algorithm mining prevents hardware monoculture.</InfoCard>
              <InfoCard title="AI-Native Design">AI compute as first-class citizen, not afterthought.</InfoCard>
            </div>
          </SubSection>
          <SubSection title="1.2 Key Innovations">
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Dual-Algorithm Mining:</strong> ASIC + GPU lanes for security and decentralization</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Deterministic DAG:</strong> GHOSTDAG ordering with hash-based tie-breaking</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">ZK Finality:</strong> ZK-STARK proofs for cryptographic irreversibility</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Native AI Compute:</strong> Crucible inference + Foundry training</li>
            </ul>
          </SubSection>
        </Section>

        <Section title="2. TriStream Architecture" id="sec-2">
          <CodeBlock>{`Stream Hierarchy:

Stream C (100ms)  ──► 100,000+ TPS, parallel execution
    │
    ▼ Aggregates
Stream B (1s)     ──► GPU/CPU mining, Crucible AI
    │
    ▼ Anchors
Stream A (10s)    ──► ASIC mining, economic security
    │
    ▼ Proves
ZK Checkpoints   ──► Cryptographic finality`}</CodeBlock>
          
          <SubSection title="2.1 Stream Specifications">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Stream</th><th className="py-3 px-4 text-gray-400">Block Time</th><th className="py-3 px-4 text-gray-400">Rewards</th><th className="py-3 px-4 text-gray-400">Algorithm</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-blue-400">Stream A (ASIC)</td><td className="py-3 px-4 text-gray-400">10 seconds</td><td className="py-3 px-4 text-gray-400">60% (50 PYRX)</td><td className="py-3 px-4 text-gray-400">PYRAX-A (memory-hard)</td></tr>
                  <tr><td className="py-3 px-4 text-emerald-400">Stream B (GPU)</td><td className="py-3 px-4 text-gray-400">1 second</td><td className="py-3 px-4 text-gray-400">40% (25 PYRX)</td><td className="py-3 px-4 text-gray-400">PYRAX-B (ASIC-resistant)</td></tr>
                  <tr><td className="py-3 px-4 text-purple-400">Stream C (Sequencer)</td><td className="py-3 px-4 text-gray-400">100ms</td><td className="py-3 px-4 text-gray-400">Fee-based</td><td className="py-3 px-4 text-gray-400">Parallel execution</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="2.2 Parallel Execution Engine">
            <p>SEALEVEL-inspired parallel execution analyzes transaction dependencies and executes non-conflicting transactions simultaneously.</p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Metric</th><th className="text-left py-3 px-4 text-gray-400">Value</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">Max Parallel Threads</td><td className="py-3 px-4 text-gray-400">64</td></tr>
                  <tr><td className="py-3 px-4 text-white">Transactions per Batch</td><td className="py-3 px-4 text-gray-400">Up to 1,000</td></tr>
                  <tr><td className="py-3 px-4 text-white">Batch Execution Time</td><td className="py-3 px-4 text-gray-400">~10ms</td></tr>
                  <tr><td className="py-3 px-4 text-white">Theoretical Max TPS</td><td className="py-3 px-4 text-gray-400">640,000</td></tr>
                  <tr><td className="py-3 px-4 text-white">Practical Target TPS</td><td className="py-3 px-4 text-gray-400">100,000+</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>
        </Section>

        <Section title="3. Consensus Mechanism" id="sec-3">
          <SubSection title="3.1 GHOSTDAG Ordering">
            <p>PYRAX uses GHOSTDAG for deterministic DAG ordering suitable for EVM execution:</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Blue/Red Classification:</strong> Blocks classified by connectivity to honest majority</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Selected Parent Chain:</strong> Backbone formed by highest blue-score parents</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Mergeset Ordering:</strong> Blue before red, topological order, hash tie-break</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Fully Deterministic:</strong> Depends only on DAG structure, never arrival time</li>
            </ul>
          </SubSection>
          <SubSection title="3.2 Difficulty Adjustment">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-5">
                <div className="text-blue-400 font-semibold mb-2">Stream A</div>
                <p className="text-sm text-gray-400">Target: 10s blocks<br/>Adjustment: Every 720 blocks (~2 hours)<br/>Algorithm: LWMA</p>
              </div>
              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-5">
                <div className="text-emerald-400 font-semibold mb-2">Stream B</div>
                <p className="text-sm text-gray-400">Target: 1s blocks<br/>Adjustment: Every 240 blocks (~4 min)<br/>Algorithm: LWMA</p>
              </div>
            </div>
          </SubSection>
        </Section>

        <Section title="4. ZK-STARK Finality" id="sec-4">
          <SubSection title="4.1 Epoch Structure">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-purple-400">600</div>
                <div className="text-sm text-gray-400 mt-1">C-blocks per epoch</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-purple-400">~1 min</div>
                <div className="text-sm text-gray-400 mt-1">Epoch duration</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-purple-400">30s</div>
                <div className="text-sm text-gray-400 mt-1">Proof window</div>
              </div>
            </div>
          </SubSection>
          <SubSection title="4.2 Finality Guarantees">
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Irreversibility:</strong> Checkpointed blocks cannot be reorganized</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Light Client Proof:</strong> Succinct verification without full history</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Bridge Anchor:</strong> External systems can trustlessly verify state</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">State Pruning:</strong> Nodes may prune pre-checkpoint data</li>
            </ul>
          </SubSection>
        </Section>

        <Section title="5. Crucible: AI Inference Layer" id="sec-5">
          <p><strong className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pyrax-orange">Crucible</strong> transforms GPU mining infrastructure into a decentralized AI inference network. GPUs mine when profitable, serve AI jobs otherwise.</p>
          
          <SubSection title="5.1 Supported Workloads">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Workload</th><th className="py-3 px-4 text-gray-400">Models</th><th className="py-3 px-4 text-gray-400">VRAM</th><th className="py-3 px-4 text-gray-400">Latency</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">Text Generation</td><td className="py-3 px-4 text-gray-400">Llama 3, Mistral, Mixtral</td><td className="py-3 px-4 text-gray-400">8-80 GB</td><td className="py-3 px-4 text-gray-400">0.5-5s</td></tr>
                  <tr><td className="py-3 px-4 text-white">Image Generation</td><td className="py-3 px-4 text-gray-400">SDXL, Flux, SD3</td><td className="py-3 px-4 text-gray-400">12-24 GB</td><td className="py-3 px-4 text-gray-400">5-30s</td></tr>
                  <tr><td className="py-3 px-4 text-white">Embeddings</td><td className="py-3 px-4 text-gray-400">BGE, E5, all-MiniLM</td><td className="py-3 px-4 text-gray-400">2-4 GB</td><td className="py-3 px-4 text-gray-400">50-200ms</td></tr>
                  <tr><td className="py-3 px-4 text-white">Speech-to-Text</td><td className="py-3 px-4 text-gray-400">Whisper</td><td className="py-3 px-4 text-gray-400">4-10 GB</td><td className="py-3 px-4 text-gray-400">1-10s</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="5.2 Economic Model">
            <CodeBlock>{`AI Job Payment Distribution:
├── GPU Worker:         85%  (executes inference)
├── Verifier:            5%  (validates result)
├── Protocol Treasury:   5%  (ecosystem fund)
└── Burned:              5%  (deflationary)`}</CodeBlock>
          </SubSection>

          <SubSection title="5.3 Smart Contract Integration">
            <CodeBlock>{`// Solidity Example
interface IPyraxAI {
    function generateText(
        string calldata model,
        string calldata prompt,
        uint256 maxTokens
    ) external returns (bytes32 jobId);
    
    function generateImage(
        string calldata model,
        string calldata prompt,
        uint256 width, uint256 height
    ) external returns (bytes32 jobId);
}`}</CodeBlock>
          </SubSection>
        </Section>

        <Section title="6. Foundry: ML Training Platform" id="sec-6">
          <p><strong className="text-orange-400">Foundry</strong> enables decentralized machine learning training using the same GPU network as Crucible. Train models at 70% lower cost than cloud providers.</p>
          
          <SubSection title="6.1 Supported Training Types">
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

          <SubSection title="6.2 Byzantine-Resistant Aggregation">
            <CodeBlock>{`Aggregation Strategies:
├── FedAvg:       Simple average (trusted nodes only)
├── Median:       Tolerates up to 50% Byzantine nodes
├── Krum:         Optimal Byzantine resistance
└── TrimmedMean:  Removes outlier gradients`}</CodeBlock>
          </SubSection>
        </Section>

        <Section title="7. XFERNO Launchpad" id="sec-7">
          <p><strong className="text-red-400">XFERNO Launchpad</strong> is PYRAX&apos;s professional token launch platform powered by the XF token.</p>
          
          <SubSection title="7.1 Launch Flow">
            <div className="space-y-3">
              {[
                { step: "1", title: "Create", desc: "Pay 100 XF, define token name/symbol/description" },
                { step: "2", title: "Bonding Curve", desc: "Linear pricing with XF-backed market cap" },
                { step: "3", title: "Graduate", desc: "Auto-migrate to PYSWAP DEX at $69K market cap" },
                { step: "4", title: "Trade", desc: "Standard DEX trading with full DeFi integration" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-pyrax-orange/20 flex items-center justify-center text-pyrax-orange font-bold text-sm">{item.step}</div>
                  <div><div className="text-white font-semibold">{item.title}</div><div className="text-sm text-gray-400">{item.desc}</div></div>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        <Section title="8. Token Economics" id="sec-8">
          <SubSection title="8.1 PYRX (Native Token)">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Property</th><th className="text-left py-3 px-4 text-gray-400">Value</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">Total Supply</td><td className="py-3 px-4 text-gray-400">30,000,000,000 PYRX</td></tr>
                  <tr><td className="py-3 px-4 text-white">Emission Period</td><td className="py-3 px-4 text-gray-400">~10-12 years</td></tr>
                  <tr><td className="py-3 px-4 text-white">Tail Emission</td><td className="py-3 px-4 text-gray-400">0.5% annual (perpetual)</td></tr>
                  <tr><td className="py-3 px-4 text-white">Gas Denomination</td><td className="py-3 px-4 text-gray-400">1 PYRX = 1B Cinders</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="8.2 Genesis Distribution (25% = 7.5B PYRX)">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Allocation</th><th className="py-3 px-4 text-gray-400">%</th><th className="py-3 px-4 text-gray-400">Amount</th><th className="py-3 px-4 text-gray-400">Vesting</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">Presale</td><td className="py-3 px-4 text-gray-400">6%</td><td className="py-3 px-4 text-gray-400">1.8B</td><td className="py-3 px-4 text-gray-400">At mainnet</td></tr>
                  <tr><td className="py-3 px-4 text-white">Ecosystem & Community</td><td className="py-3 px-4 text-gray-400">10%</td><td className="py-3 px-4 text-gray-400">3B</td><td className="py-3 px-4 text-gray-400">Various</td></tr>
                  <tr><td className="py-3 px-4 text-white">Core Contributors</td><td className="py-3 px-4 text-gray-400">3%</td><td className="py-3 px-4 text-gray-400">900M</td><td className="py-3 px-4 text-gray-400">4yr, 1yr cliff</td></tr>
                  <tr><td className="py-3 px-4 text-white">Security</td><td className="py-3 px-4 text-gray-400">2%</td><td className="py-3 px-4 text-gray-400">600M</td><td className="py-3 px-4 text-gray-400">As needed</td></tr>
                  <tr><td className="py-3 px-4 text-white">Liquidity</td><td className="py-3 px-4 text-gray-400">3%</td><td className="py-3 px-4 text-gray-400">900M</td><td className="py-3 px-4 text-gray-400">At launch</td></tr>
                  <tr><td className="py-3 px-4 text-white">Strategic</td><td className="py-3 px-4 text-gray-400">1%</td><td className="py-3 px-4 text-gray-400">300M</td><td className="py-3 px-4 text-gray-400">Milestones</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="8.3 Fee Distribution">
            <CodeBlock>{`Transaction Fee Flow:
├── 50% of base_fee  → BURNED (deflationary)
├── 40% of total_fee → Block Miner (Stream A or B)
└── 10% of total_fee → Prover Reward Pool (ZK)`}</CodeBlock>
          </SubSection>
        </Section>

        <Section title="9. Presale Structure" id="sec-9">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-pyrax-orange/20 to-amber-900/20 border border-pyrax-orange/30 rounded-xl p-6 text-center">
              <div className="text-sm text-gray-400 mb-1">Hard Cap</div>
              <div className="text-3xl font-bold text-pyrax-orange">$100,000,000</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6 text-center">
              <div className="text-sm text-gray-400 mb-1">Soft Cap</div>
              <div className="text-3xl font-bold text-green-400">$18,000,000</div>
            </div>
          </div>

          <SubSection title="9.1 Presale Phases">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Phase</th><th className="py-3 px-4 text-gray-400">Price</th><th className="py-3 px-4 text-gray-400">PYRX Bonus</th><th className="py-3 px-4 text-gray-400">XF Bonus</th><th className="py-3 px-4 text-gray-400">Cap</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="bg-pyrax-orange/5"><td className="py-3 px-4 text-white">Early Bird</td><td className="py-3 px-4 text-gray-400">$0.0025</td><td className="py-3 px-4 text-green-400">+25%</td><td className="py-3 px-4 text-green-400">+100%</td><td className="py-3 px-4 text-gray-400">$10M</td></tr>
                  <tr><td className="py-3 px-4 text-white">Phase 2</td><td className="py-3 px-4 text-gray-400">$0.004</td><td className="py-3 px-4 text-green-400">+15%</td><td className="py-3 px-4 text-green-400">+50%</td><td className="py-3 px-4 text-gray-400">$20M</td></tr>
                  <tr><td className="py-3 px-4 text-white">Phase 3</td><td className="py-3 px-4 text-gray-400">$0.006</td><td className="py-3 px-4 text-green-400">+10%</td><td className="py-3 px-4 text-green-400">+25%</td><td className="py-3 px-4 text-gray-400">$30M</td></tr>
                  <tr><td className="py-3 px-4 text-white">Phase 4</td><td className="py-3 px-4 text-gray-400">$0.008</td><td className="py-3 px-4 text-green-400">+5%</td><td className="py-3 px-4 text-green-400">+10%</td><td className="py-3 px-4 text-gray-400">$40M</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="9.2 Fund Allocation ($18M Soft Cap)">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Category</th><th className="py-3 px-4 text-gray-400">Amount</th><th className="py-3 px-4 text-gray-400">%</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 text-white">Legal & Regulatory</td><td className="py-3 px-4 text-gray-400">$4.5M</td><td className="py-3 px-4 text-gray-400">25%</td></tr>
                  <tr><td className="py-3 px-4 text-white">Security & Audits</td><td className="py-3 px-4 text-gray-400">$3.0M</td><td className="py-3 px-4 text-gray-400">17%</td></tr>
                  <tr><td className="py-3 px-4 text-white">Exchange Listings</td><td className="py-3 px-4 text-gray-400">$3.6M</td><td className="py-3 px-4 text-gray-400">20%</td></tr>
                  <tr><td className="py-3 px-4 text-white">Infrastructure</td><td className="py-3 px-4 text-gray-400">$2.5M</td><td className="py-3 px-4 text-gray-400">14%</td></tr>
                  <tr><td className="py-3 px-4 text-white">Team & Development</td><td className="py-3 px-4 text-gray-400">$2.7M</td><td className="py-3 px-4 text-gray-400">15%</td></tr>
                  <tr><td className="py-3 px-4 text-white">Marketing</td><td className="py-3 px-4 text-gray-400">$1.2M</td><td className="py-3 px-4 text-gray-400">7%</td></tr>
                  <tr><td className="py-3 px-4 text-white">Treasury Reserve</td><td className="py-3 px-4 text-gray-400">$0.5M</td><td className="py-3 px-4 text-gray-400">2%</td></tr>
                </tbody>
              </table>
            </div>
          </SubSection>
        </Section>

        <Section title="10. Governance" id="sec-10">
          <ul className="space-y-2">
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">No On-Chain Token Voting:</strong> Consensus rules not changed by token votes</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Social Consensus:</strong> Major changes require broad community agreement</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Client Diversity:</strong> Multiple independent implementations encouraged</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">PIP Process:</strong> Draft → Review → Accepted → Final → Active</li>
          </ul>
        </Section>

        <Section title="11. Network Roadmap" id="sec-11">
          <div className="space-y-4">
            {[
              { name: "Smelter", desc: "Internal Devnet - Core protocol development" },
              { name: "Kindling", desc: "Public Testnet v0.1 - Initial public testing" },
              { name: "Forgefire", desc: "Testnet v0.2 - Feature completeness + AI Compute beta" },
              { name: "Crownflame", desc: "Testnet v0.3 - Stream C + ZK + Full AI integration" },
              { name: "Furnace", desc: "Mainnet v1.0 - Production launch" },
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
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" />$1M+ bug bounty program</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" />Responsible disclosure process</li>
              <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" />No admin keys in core protocol</li>
            </ul>
          </SubSection>
        </Section>

        <Section title="13. Conclusion" id="sec-13">
          <p>PYRAX combines proven blockchain concepts (PoW, DAG, EVM) with modern techniques (ZK proofs, AI compute) to create a secure, scalable, AI-native platform. Key differentiators:</p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Working tech at presale</strong> - not roadmap promises</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">100,000+ TPS</strong> through parallel execution</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Native AI compute</strong> via Crucible and Foundry</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">No admin keys</strong> - true decentralization</li>
            <li className="flex items-start gap-2"><ChevronRightIcon className="w-4 h-4 text-pyrax-orange mt-1" /><strong className="text-white">Three-token ecosystem</strong> for specialized utilities</li>
          </ul>
          <div className="mt-8 p-6 bg-gradient-to-r from-pyrax-orange/10 to-amber-500/10 border border-pyrax-orange/20 rounded-2xl">
            <p className="text-white font-semibold mb-4">Ready to dive deeper?</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/technology" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pyrax-orange text-white text-sm font-medium"><CpuChipIcon className="w-4 h-4" />Explore Technology</Link>
              <Link href="/presale" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium">Join Presale</Link>
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-500 italic">This whitepaper describes PYRAX as currently designed. Implementation details may evolve. Not financial advice.</p>
        </Section>
      </div>
    </div>
  );
}
