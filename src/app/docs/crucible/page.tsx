import Link from "next/link";
import { ChevronRight, Sparkles, Cpu, Zap, Shield, Server, Bot, Coins, ArrowRight, CheckCircle } from "lucide-react";

export default function CrucibleDocsPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Crucible</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
            <Sparkles className="w-4 h-4" /> 5 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pyrax-orange">Crucible</span>?
          </h1>
          <p className="text-xl text-gray-400">PYRAX&apos;s native AI compute layer - where GPU compute forges intelligence.</p>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Crucible</strong> is PYRAX&apos;s groundbreaking AI compute layer that transforms idle GPU mining capacity into productive AI inference infrastructure. Just as a crucible transforms raw materials into refined metal, PYRAX Crucible transforms raw GPU compute into refined AI intelligence.
          </p>
          <p className="text-gray-300 leading-relaxed">
            This makes PYRAX the <strong className="text-pyrax-orange">first Layer 1 blockchain with native AI compute capabilities</strong>, positioning it at the intersection of two transformative technologies.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">How It Works</h2>
          <div className="bg-pyrax-dark/50 border border-white/10 rounded-xl p-6 my-6 font-mono text-sm overflow-x-auto not-prose">
            <pre className="text-gray-300">{`User/Contract Request
       │
       ▼
┌─────────────────┐
│   Job Router    │ ── Matches jobs to capable workers
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GPU Worker     │ ── Stream B miner executes AI inference
│  (Stream B)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Verification   │ ── ZK proof or optimistic verification
└────────┬────────┘
         │
         ▼
    Result Delivered + Worker Paid`}</pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Zap className="w-6 h-6 text-purple-400 mb-3" />
              <div className="text-white font-semibold mb-1">Native Integration</div>
              <p className="text-sm text-gray-400">AI compute is built into the protocol, not bolted on. Smart contracts call AI via native precompiles.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Shield className="w-6 h-6 text-green-400 mb-3" />
              <div className="text-white font-semibold mb-1">Trustless Verification</div>
              <p className="text-sm text-gray-400">Results verified via ZK proofs or optimistic verification with slashing for invalid outputs.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Server className="w-6 h-6 text-blue-400 mb-3" />
              <div className="text-white font-semibold mb-1">Dual-Purpose GPUs</div>
              <p className="text-sm text-gray-400">Stream B miners earn from both PoW mining AND AI inference jobs simultaneously.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Coins className="w-6 h-6 text-pyrax-orange mb-3" />
              <div className="text-white font-semibold mb-1">Deflationary Economics</div>
              <p className="text-sm text-gray-400">5% of all AI job fees are burned, creating sustainable deflationary pressure on PYRX.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 my-8 not-prose">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">100% Open-Source Models</h3>
            </div>
            <p className="text-gray-300 text-sm">
              All AI models on Crucible are <strong className="text-green-400">free and open-source</strong>. No API keys, no subscriptions, no licensing fees. 
              Workers download models from Hugging Face and run them locally.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Supported Workloads</h2>
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">Workload</th><th className="py-3 px-4 text-gray-400">Models (Open-Source)</th><th className="py-3 px-4 text-gray-400">VRAM Required</th></tr></thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-3 px-4 text-white">Text Generation</td><td className="py-3 px-4 text-gray-400">Llama 3, Mistral, Mixtral</td><td className="py-3 px-4 text-gray-400">8-16 GB</td></tr>
                <tr><td className="py-3 px-4 text-white">Image Generation</td><td className="py-3 px-4 text-gray-400">Stable Diffusion XL, Flux</td><td className="py-3 px-4 text-gray-400">12-24 GB</td></tr>
                <tr><td className="py-3 px-4 text-white">Embeddings</td><td className="py-3 px-4 text-gray-400">BGE, E5</td><td className="py-3 px-4 text-gray-400">2-4 GB</td></tr>
                <tr><td className="py-3 px-4 text-white">Classification</td><td className="py-3 px-4 text-gray-400">CLIP, BLIP-2</td><td className="py-3 px-4 text-gray-400">4-8 GB</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Fee Distribution</h2>
          <p className="text-gray-300 leading-relaxed">When a user pays for an AI job on Crucible, the fees are distributed as follows:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 not-prose">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">85%</div>
              <div className="text-xs text-gray-400">GPU Worker</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">5%</div>
              <div className="text-xs text-gray-400">Verifier</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">5%</div>
              <div className="text-xs text-gray-400">Treasury</div>
            </div>
            <div className="bg-pyrax-orange/10 border border-pyrax-orange/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-pyrax-orange">5%</div>
              <div className="text-xs text-gray-400">Burned 🔥</div>
            </div>
          </div>
        </article>

        {/* Next Steps */}
        <div className="mt-16 p-6 bg-gradient-to-r from-purple-500/10 to-pyrax-orange/10 border border-purple-500/20 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Get Started with Crucible</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/crucible/workers" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <Server className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-white font-semibold group-hover:text-pyrax-orange">Become a GPU Worker</div>
                <div className="text-sm text-gray-500">Earn PYRX running AI jobs</div>
              </div>
            </Link>
            <Link href="/docs/crucible/smart-contracts" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
              <Bot className="w-8 h-8 text-pyrax-orange" />
              <div>
                <div className="text-white font-semibold group-hover:text-pyrax-orange">Build with Crucible</div>
                <div className="text-sm text-gray-500">Integrate AI into your dApps</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex justify-between">
            <div></div>
            <Link href="/docs/crucible/how-it-works" className="flex items-center gap-2 text-pyrax-orange hover:underline">
              Next: How Crucible Works <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
