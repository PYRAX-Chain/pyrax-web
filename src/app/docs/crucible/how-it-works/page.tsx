import Link from "next/link";
import { ChevronRight, Sparkles, Cpu, ArrowRight, ArrowLeft, Zap, Shield, Server } from "lucide-react";

export default function CrucibleHowItWorksPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/docs/crucible" className="hover:text-white">Crucible</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">How It Works</span>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
            <Cpu className="w-4 h-4" /> 10 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">How Crucible Works</h1>
          <p className="text-xl text-gray-400">A deep dive into the architecture of PYRAX&apos;s AI compute layer.</p>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">System Architecture</h2>
          <p className="text-gray-300 leading-relaxed">
            Crucible operates as a decentralized network of GPU workers coordinated by the PYRAX blockchain. Here&apos;s how a typical AI job flows through the system:
          </p>

          <div className="bg-pyrax-dark/50 border border-white/10 rounded-xl p-6 my-8 font-mono text-sm overflow-x-auto not-prose">
            <pre className="text-gray-300">{`┌─────────────────────────────────────────────────────────────────┐
│                     CRUCIBLE ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────┐         ┌──────────────┐         ┌──────────┐   │
│   │  User /  │────────▶│  Job Router  │────────▶│   GPU    │   │
│   │ Contract │         │  (On-Chain)  │         │  Worker  │   │
│   └──────────┘         └──────────────┘         └────┬─────┘   │
│        │                      │                      │          │
│        │                      │                      ▼          │
│        │                      │               ┌──────────┐      │
│        │                      │               │   AI     │      │
│        │                      │               │ Inference│      │
│        │                      │               └────┬─────┘      │
│        │                      │                    │            │
│        │                      ▼                    ▼            │
│        │               ┌──────────────┐    ┌──────────┐        │
│        │               │   Verifier   │◀───│  Result  │        │
│        │               │   Network    │    │  + Proof │        │
│        │               └──────┬───────┘    └──────────┘        │
│        │                      │                                 │
│        │                      ▼                                 │
│        │               ┌──────────────┐                        │
│        └───────────────│   Payment    │                        │
│          Result        │ Distribution │                        │
│                        └──────────────┘                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘`}</pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Step-by-Step Flow</h2>
          
          <div className="space-y-6 my-8 not-prose">
            <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Job Submission</h3>
                <p className="text-gray-400 text-sm">User or smart contract submits an AI job (text generation, image creation, etc.) with payment in PYRX. The job is recorded on-chain.</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Worker Selection</h3>
                <p className="text-gray-400 text-sm">The Job Router matches the job to an eligible GPU worker based on model capability, stake tier, reputation, and latency preferences.</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">AI Inference</h3>
                <p className="text-gray-400 text-sm">The selected GPU worker executes the AI model locally, generating the requested output (text, image, embeddings, etc.).</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold">4</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Verification</h3>
                <p className="text-gray-400 text-sm">Result is verified using one of three methods: optimistic verification (with fraud proofs), ZK proof of correct execution, or redundant execution.</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold">5</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Payment & Delivery</h3>
                <p className="text-gray-400 text-sm">Once verified, the result is delivered to the requester and payment is distributed: 85% worker, 5% verifier, 5% treasury, 5% burned.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Verification Methods</h2>
          <p className="text-gray-300 leading-relaxed">Crucible supports three verification methods to balance speed, cost, and security:</p>

          <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
              <Zap className="w-6 h-6 text-yellow-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Optimistic</h3>
              <p className="text-sm text-gray-400 mb-2">Default mode. Results assumed correct with a challenge period.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• 10 block challenge window</li>
                <li>• Fastest & cheapest</li>
                <li>• Fraud proofs for disputes</li>
              </ul>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
              <Shield className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">ZK Proof</h3>
              <p className="text-sm text-gray-400 mb-2">Cryptographic proof of correct inference execution.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Instant finality</li>
                <li>• Higher compute cost</li>
                <li>• Maximum security</li>
              </ul>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
              <Server className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Redundant</h3>
              <p className="text-sm text-gray-400 mb-2">Multiple workers execute, majority result wins.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• N workers (default 3)</li>
                <li>• Higher cost (N× payment)</li>
                <li>• For high-value jobs</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Integration with Stream B</h2>
          <p className="text-gray-300 leading-relaxed">
            Crucible is tightly integrated with PYRAX&apos;s Stream B mining layer. GPU miners can seamlessly switch between mining and AI inference based on profitability and demand:
          </p>
          <ul className="space-y-2 text-gray-300 mt-4">
            <li>• <strong className="text-white">Shared Hardware:</strong> Same GPUs used for both PoW mining and AI inference</li>
            <li>• <strong className="text-white">Dynamic Allocation:</strong> Workers can set preferences for mining vs. AI ratio</li>
            <li>• <strong className="text-white">Unified Rewards:</strong> Both activities earn PYRX to the same wallet</li>
            <li>• <strong className="text-white">Staking Synergy:</strong> Mining reputation influences AI job priority</li>
          </ul>
        </article>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex justify-between">
            <Link href="/docs/crucible" className="flex items-center gap-2 text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" /> What is Crucible?
            </Link>
            <Link href="/docs/crucible/workers" className="flex items-center gap-2 text-pyrax-orange hover:underline">
              Become a Worker <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
