import Link from "next/link";
import {
  Cpu,
  Shield,
  Zap,
  GitBranch,
  Lock,
  ArrowRight,
  CheckCircle,
  FileCode,
  Sparkles,
  Bot,
  ImageIcon,
  MessageSquare,
  Flame,
  Brain,
  Users,
  Database,
  Layers,
  Coins,
  Globe,
  ShieldCheck,
  Rocket,
  Code,
  Network,
  CircuitBoard,
} from "lucide-react";
import { HeroCarousel } from "@/components/hero-carousel";

export default function HomePage() {
  return (
    <div>
      {/* Testnet Status Banner */}
      <div className="bg-green-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
          <CheckCircle className="h-4 w-4" />
          <p className="font-medium">
            <span className="font-bold">Working Technology</span> — PYRAX is one of the first L1s to launch presale with fully functional nodes, mining, and AI compute already built.
          </p>
          <Link href="/presale" className="underline hover:no-underline ml-2">Learn more →</Link>
        </div>
      </div>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Key Stats */}
      <section className="py-12 border-y border-white/5 bg-gradient-to-r from-pyrax-dark via-pyrax-gray to-pyrax-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { value: "100K+", label: "Target TPS", color: "text-pyrax-orange" },
              { value: "100ms", label: "Block Time", color: "text-blue-400" },
              { value: "<1s", label: "Confirmation", color: "text-green-400" },
              { value: "ZK-STARK", label: "Finality", color: "text-purple-400" },
              { value: "3", label: "Streams", color: "text-amber-400" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PYRAX */}
      <section id="why-pyrax" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              Why <span className="text-pyrax-orange">PYRAX</span>?
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
              The first Layer 1 to combine PoW security, ZK-STARK cryptographic finality, and native AI compute — with working tech at presale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "ZK-STARK Finality", desc: "Mathematical certainty, not probabilistic. Quantum-resistant proofs make checkpoints irreversible.", color: "purple" },
              { icon: Layers, title: "TriStream Architecture", desc: "ASIC security + GPU decentralization + high-speed sequencing — three streams, one unified DAG.", color: "blue" },
              { icon: Zap, title: "100,000+ TPS", desc: "SEALEVEL-inspired parallel execution with 64 threads. 100ms blocks on Stream C.", color: "amber" },
              { icon: Sparkles, title: "Native AI Compute", desc: "Crucible inference and Foundry training built in. GPU miners earn from AI jobs + block rewards.", color: "orange" },
              { icon: Lock, title: "No Admin Keys", desc: "Zero privileged access. No one can seize funds, censor transactions, or change consensus.", color: "green" },
              { icon: Code, title: "Full EVM Compatible", desc: "Deploy existing Solidity contracts unchanged. All your favorite tools work out of the box.", color: "cyan" },
            ].map((f) => (
              <div key={f.title} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className={`inline-flex p-3 rounded-xl bg-${f.color}-500/10 text-${f.color}-400`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TriStream Architecture */}
      <section id="tristream" className="py-24 bg-gradient-to-b from-pyrax-dark/50 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Network className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">CORE ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              TriStream <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">ZK-DAG</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
              Three mining streams converge into a unified BlockDAG with GHOSTDAG consensus and ZK-STARK finality.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-blue-950/30 border border-blue-500/20">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-xl font-black text-blue-400">A</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Stream A</h3>
              <p className="text-blue-300/80 text-sm mb-4">ASIC Mining • Blake3</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Block Time</span><span className="text-white font-mono">10s</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Rewards</span><span className="text-white font-mono">60%</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Purpose</span><span className="text-blue-400">Economic Security</span></div>
              </div>
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-green-900/30 to-green-950/30 border border-green-500/20">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-xl font-black text-green-400">B</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Stream B</h3>
              <p className="text-green-300/80 text-sm mb-4">GPU/CPU Mining • RandomX</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Block Time</span><span className="text-white font-mono">1s</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Rewards</span><span className="text-white font-mono">40%</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Purpose</span><span className="text-green-400">Decentralization + AI</span></div>
              </div>
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-purple-950/30 border border-purple-500/20">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-xl font-black text-purple-400">C</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Stream C</h3>
              <p className="text-purple-300/80 text-sm mb-4">ZK Sequencer • Parallel Exec</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Block Time</span><span className="text-white font-mono">100ms</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Capacity</span><span className="text-white font-mono">10K tx/block</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Purpose</span><span className="text-purple-400">100K+ TPS</span></div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/technology" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-colors">
              <CircuitBoard className="w-4 h-4" />
              Deep Dive into Technology
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Crucible AI */}
      <section id="crucible" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pyrax-orange/10 to-blue-900/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400 font-medium">NATIVE AI COMPUTE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pyrax-orange to-amber-400">Crucible</span>
            </h2>
            <p className="mt-2 text-xl text-gray-300">Where GPU Compute Forges Intelligence</p>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              The first L1 with native AI inference. GPU miners process AI jobs alongside mining, earning additional PYRX.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
              <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">LLM Inference</h3>
              <p className="text-gray-400 text-sm">Run Llama 3, Mistral, and more. Text generation, Q&A, AI agents — all on-chain.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pyrax-orange/30 transition-colors">
              <ImageIcon className="w-8 h-8 text-pyrax-orange mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Image Generation</h3>
              <p className="text-gray-400 text-sm">Stable Diffusion, Flux. NFT generation, AI art — trustlessly verified outputs.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
              <Bot className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Smart Contract AI</h3>
              <p className="text-gray-400 text-sm">Call AI from Solidity via precompiles. Intelligent dApps without oracles.</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/crucible" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pyrax-orange hover:from-purple-600 hover:to-pyrax-amber text-white font-semibold rounded-lg transition-all">
              <Sparkles className="w-4 h-4" />
              Explore Crucible
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Foundry ML */}
      <section id="foundry" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-red-900/10 to-amber-900/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-400 font-medium">DECENTRALIZED ML TRAINING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400">Foundry</span>
            </h2>
            <p className="mt-2 text-xl text-gray-300">Where Raw Data is Forged into AI Models</p>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Train models on community GPUs. Federated learning with Byzantine-resistant aggregation. 70% cheaper than cloud.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
              <Brain className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Distributed Training</h3>
              <p className="text-gray-400 text-sm">Train custom models on labeled datasets using community GPU compute.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors">
              <Users className="w-8 h-8 text-red-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Federated Learning</h3>
              <p className="text-gray-400 text-sm">Privacy-preserving training. Your data never leaves your device.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-colors">
              <Database className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Fine-Tuning (LoRA)</h3>
              <p className="text-gray-400 text-sm">Efficiently adapt pre-trained models with parameter-efficient tuning.</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/foundry" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all">
              <Flame className="w-4 h-4" />
              Explore Foundry
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Network Roadmap</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              From internal devnet to mainnet launch — progressive rollout with working technology at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { name: "Forge", type: "🔥 Mining & Nodes", status: "in_development" },
              { name: "Blaze", type: "⚡ Smart Contracts", status: "planned" },
              { name: "Inferno", type: "🌊 DEX & Liquidity", status: "planned" },
              { name: "Phoenix", type: "🦅 Stress Test", status: "planned" },
              { name: "Mainnet", type: "🚀 Production", status: "planned" },
            ].map((net, i) => (
              <div key={net.name} className="relative p-5 rounded-xl bg-white/5 border border-white/10 text-center">
                {i < 4 && <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-white/20" />}
                <div className="text-xl font-bold text-white">{net.name}</div>
                <div className="mt-1 text-xs text-gray-400">{net.type}</div>
                <div className={`mt-3 inline-flex items-center gap-1 text-xs ${net.status === "complete" ? "text-green-400" : net.status === "in_development" ? "text-pyrax-amber" : "text-gray-500"}`}>
                  <span className={`w-2 h-2 rounded-full ${net.status === "complete" ? "bg-green-400" : net.status === "in_development" ? "bg-pyrax-amber animate-pulse" : "bg-gray-500"}`} />
                  {net.status === "complete" ? "Complete" : net.status === "in_development" ? "In Progress" : "Planned"}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/roadmap" className="inline-flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors">
              View Full Roadmap <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Presale CTA */}
      <section id="presale" className="py-24 bg-gradient-to-t from-pyrax-orange/10 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Join the PYRAX Presale</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Be part of the next generation of blockchain technology. Working tech at presale — not promises.
            </p>

            <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-4">
              <Link href="/presale" className="inline-flex items-center gap-2 px-8 py-4 bg-pyrax-orange hover:bg-pyrax-amber text-white font-semibold rounded-lg transition-colors">
                <Rocket className="w-5 h-5" />
                Participate Now
              </Link>
              <Link href="/tokenomics" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-colors">
                <Coins className="w-5 h-5" />
                View Tokenomics
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" />Verified Contract</div>
              <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" />No ROI Promises</div>
              <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" />Risk Disclosures</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
            <h3 className="text-lg font-semibold text-yellow-400">
              Risk Disclosure
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Cryptocurrency investments carry significant risks including
              potential total loss of capital. PYRX tokens are not securities
              and provide no ownership, dividend, or governance rights. The
              PYRAX network is under active development and may not launch as
              planned. Past performance of cryptocurrencies does not guarantee
              future results. This website and its contents do not constitute
              financial, investment, legal, or tax advice. Always conduct your
              own research and consult professional advisors before
              participating in any cryptocurrency offering.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
