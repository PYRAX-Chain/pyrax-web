"use client";

import Link from "next/link";
import {
  Sparkles,
  Cpu,
  Zap,
  Shield,
  MessageSquare,
  ImageIcon,
  Bot,
  ArrowRight,
  CheckCircle,
  Coins,
  Lock,
  Server,
  TrendingUp,
  Globe,
  DollarSign,
  Flame,
  BarChart3,
  Award,
  Clock,
  Activity,
} from "lucide-react";

export default function CruciblePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pyrax-orange/20 to-blue-900/40" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pyrax-orange/20 rounded-full blur-[128px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pyrax-orange/20 border border-purple-500/30 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300">Native AI Compute Layer</span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold ml-2">LIVE</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pyrax-orange to-amber-400">
                Crucible
              </span>
            </h1>

            <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-light mb-6">
              Decentralized AI for the <span className="text-pyrax-orange font-semibold">$200B</span> Market
            </p>

            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              The first Layer 1 with native AI compute. GPU miners earn from mining AND AI inference. 
              Smart contracts call AI directly — no oracles, no APIs, no trust assumptions.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link href="/presale" className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pyrax-orange hover:from-purple-600 hover:to-pyrax-amber text-white font-bold text-lg transition-all shadow-lg shadow-purple-500/25">
                <Coins className="w-5 h-5" />
                Join Presale
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/whitepaper" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/10 transition-colors">
                Read Whitepaper
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">$200B+</div>
                <div className="text-xs text-gray-500">AI Inference Market 2025</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Activity className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">100K+</div>
                <div className="text-xs text-gray-500">Inference TPS</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <DollarSign className="h-6 w-6 text-pyrax-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">85%</div>
                <div className="text-xs text-gray-500">Worker Rewards</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Flame className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">5%</div>
                <div className="text-xs text-gray-500">Fee Burn Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Crucible */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                What is Crucible?
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                Crucible is PYRAX&apos;s native AI compute layer that transforms idle GPU mining capacity into productive AI inference infrastructure. Just as a crucible transforms raw materials into refined metal, PYRAX Crucible transforms raw GPU compute into refined AI intelligence.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Stream B GPU miners can opt-in to process AI workloads—running LLMs, generating images, creating embeddings—and earn additional PYRX rewards on top of their mining income.
              </p>
              
              <div className="space-y-4">
                {[
                  "First L1 with native AI compute",
                  "No centralized APIs or oracles",
                  "Trustless verification via ZK proofs",
                  "Smart contract integration via precompiles",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pyrax-orange/20 rounded-3xl blur-3xl" />
              <div className="relative p-8 rounded-3xl bg-pyrax-dark border border-white/10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pyrax-orange/20 mb-4">
                    <Sparkles className="w-10 h-10 text-pyrax-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Crucible Architecture</h3>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                    <span className="text-gray-400">User Request</span>
                    <span className="text-purple-400">→ Job Router</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                    <span className="text-gray-400">Job Router</span>
                    <span className="text-pyrax-orange">→ GPU Worker</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                    <span className="text-gray-400">GPU Worker</span>
                    <span className="text-blue-400">→ AI Inference</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                    <span className="text-gray-400">Result</span>
                    <span className="text-green-400">→ ZK Verified ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-24 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-4">
              <TrendingUp className="h-4 w-4" />
              Investment Opportunity
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Invest in Crucible?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Capture a share of the exploding AI inference market with the first native blockchain AI layer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20">
              <Globe className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Massive Market</h3>
              <p className="text-gray-400 text-sm mb-4">AI inference market projected to reach $200B+ by 2025. Crucible positions PYRAX to capture decentralized market share.</p>
              <div className="text-3xl font-bold text-green-400">$200B+</div>
              <div className="text-xs text-gray-500">Total Addressable Market</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20">
              <BarChart3 className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Revenue Generation</h3>
              <p className="text-gray-400 text-sm mb-4">Every AI job on Crucible generates fees. 5% burned permanently, creating deflationary pressure on PYRX.</p>
              <div className="text-3xl font-bold text-purple-400">5%</div>
              <div className="text-xs text-gray-500">Burned Per Transaction</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-b from-pyrax-orange/10 to-transparent border border-pyrax-orange/20">
              <Award className="w-10 h-10 text-pyrax-orange mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">First Mover</h3>
              <p className="text-gray-400 text-sm mb-4">First L1 blockchain with native AI compute. No oracles, no bridges — AI calls directly from smart contracts.</p>
              <div className="text-3xl font-bold text-pyrax-orange">#1</div>
              <div className="text-xs text-gray-500">Native L1 AI Chain</div>
            </div>
          </div>

          {/* Comparison with Centralized AI */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Crucible vs Centralized AI</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Feature</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">OpenAI / Anthropic</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">AWS Bedrock</th>
                    <th className="text-center py-3 px-4 text-purple-400 font-medium">Crucible</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Censorship Resistant</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                    <td className="text-center py-3 px-4 text-green-400 font-bold">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Smart Contract Native</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                    <td className="text-center py-3 px-4 text-red-400">No</td>
                    <td className="text-center py-3 px-4 text-green-400 font-bold">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Verifiable Results</td>
                    <td className="text-center py-3 px-4 text-red-400">Trust Required</td>
                    <td className="text-center py-3 px-4 text-red-400">Trust Required</td>
                    <td className="text-center py-3 px-4 text-green-400 font-bold">ZK Proofs</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Single Point of Failure</td>
                    <td className="text-center py-3 px-4 text-red-400">Yes</td>
                    <td className="text-center py-3 px-4 text-red-400">Yes</td>
                    <td className="text-center py-3 px-4 text-green-400 font-bold">No</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Token Value Accrual</td>
                    <td className="text-center py-3 px-4 text-gray-500">N/A</td>
                    <td className="text-center py-3 px-4 text-gray-500">N/A</td>
                    <td className="text-center py-3 px-4 text-green-400 font-bold">5% Burn</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Workloads */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Workloads</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Run cutting-edge AI models on trustless, decentralized infrastructure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Text Generation</h3>
              <p className="text-gray-400 text-sm mb-4">Llama 3, Mistral, GPT-style models</p>
              <div className="text-xs text-gray-500">VRAM: 8-16 GB</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pyrax-orange/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-pyrax-orange/10 flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-pyrax-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Image Generation</h3>
              <p className="text-gray-400 text-sm mb-4">Stable Diffusion, Flux, DALL-E style</p>
              <div className="text-xs text-gray-500">VRAM: 12-24 GB</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Embeddings</h3>
              <p className="text-gray-400 text-sm mb-4">BGE, E5, semantic search vectors</p>
              <div className="text-xs text-gray-500">VRAM: 2-4 GB</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Classification</h3>
              <p className="text-gray-400 text-sm mb-4">CLIP, ViT, image/text analysis</p>
              <div className="text-xs text-gray-500">VRAM: 4-8 GB</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Different Users */}
      <section className="py-24 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everyone Benefits</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Crucible creates value for miners, developers, users, and token holders
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold text-white">GPU Miners</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Dual Revenue:</strong> Earn from PoW mining AND AI inference</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">85% of Fees:</strong> Highest worker payout in the industry</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Maximize Hardware:</strong> Use idle GPU cycles productively</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Developers</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Native Integration:</strong> Call AI from Solidity via precompiles</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">No Oracles:</strong> Trustless, verifiable AI responses</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Censorship Free:</strong> No API keys, no rate limits, no bans</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-pyrax-orange/10 to-transparent border border-pyrax-orange/20">
              <div className="flex items-center gap-3 mb-4">
                <Coins className="w-8 h-8 text-pyrax-orange" />
                <h3 className="text-2xl font-bold text-white">Token Holders</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-pyrax-orange mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Deflationary:</strong> 5% of all AI fees burned permanently</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-pyrax-orange mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Utility Demand:</strong> PYRX required for all AI jobs</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-pyrax-orange mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Staking Rewards:</strong> Stake to run worker nodes</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">AI Users</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Uncensorable:</strong> No content restrictions or bans</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Private:</strong> No data collection or logging</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Verifiable:</strong> ZK proofs ensure correct outputs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Economics */}
      <section className="py-24 bg-gradient-to-b from-pyrax-dark/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tokenomics</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Sustainable economics that benefit workers, verifiers, and PYRX holders
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-400" />
                Fee Distribution
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">GPU Worker</span>
                  </div>
                  <span className="text-3xl font-bold text-green-400">85%</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Verifier Network</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">5%</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <Coins className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Protocol Treasury</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-400">5%</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-pyrax-orange/10 border border-pyrax-orange/20">
                  <div className="flex items-center gap-3">
                    <Flame className="w-5 h-5 text-pyrax-orange" />
                    <span className="text-gray-300">Burned Forever</span>
                  </div>
                  <span className="text-2xl font-bold text-pyrax-orange">5%</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-pyrax-orange" />
                Worker Staking Tiers
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-700/20 to-amber-900/20 border border-amber-700/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-amber-400">Bronze</div>
                      <div className="text-sm text-gray-400">1,000 PYRX stake</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">5</div>
                      <div className="text-xs text-gray-500">concurrent jobs</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-gray-400/20 to-gray-600/20 border border-gray-400/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-gray-300">Silver</div>
                      <div className="text-sm text-gray-400">10,000 PYRX stake</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">20</div>
                      <div className="text-xs text-gray-500">concurrent jobs</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-yellow-400">Gold</div>
                      <div className="text-sm text-gray-400">100,000 PYRX stake</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">100</div>
                      <div className="text-xs text-gray-500">concurrent jobs</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-300/20 to-cyan-500/20 border border-cyan-300/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-cyan-300">Platinum</div>
                      <div className="text-sm text-gray-400">1,000,000 PYRX stake</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">Unlimited</div>
                      <div className="text-xs text-gray-500">concurrent jobs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Smart Contract Integration</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Call AI directly from your Solidity smart contracts
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-pyrax-dark border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-sm text-gray-500">CrucibleExample.sol</span>
              </div>
              <pre className="text-sm font-mono overflow-x-auto">
                <code className="text-gray-300">{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ICrucible} from "@pyrax/crucible/ICrucible.sol";

contract AIOracle {
    ICrucible public crucible = ICrucible(0x0...CRUCIBLE);
    
    mapping(bytes32 => address) public jobRequester;
    mapping(bytes32 => string) public jobResults;
    
    event AIJobRequested(bytes32 indexed jobId, string prompt);
    event AIJobCompleted(bytes32 indexed jobId, string result);
    
    function askAI(string calldata prompt) external payable returns (bytes32) {
        bytes32 jobId = crucible.generateText{value: msg.value}(
            "llama-3-8b",   // model
            prompt,          // user prompt
            256              // max tokens
        );
        
        jobRequester[jobId] = msg.sender;
        emit AIJobRequested(jobId, prompt);
        return jobId;
    }
    
    // Called by Crucible when result is ready
    function onCrucibleResult(bytes32 jobId, string calldata result) external {
        require(msg.sender == address(crucible), "Only Crucible");
        jobResults[jobId] = result;
        emit AIJobCompleted(jobId, result);
    }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-900/50 via-pyrax-orange/30 to-blue-900/50 border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pyrax-orange/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <Sparkles className="w-16 h-16 text-pyrax-orange mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Be Part of the AI Revolution
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the presale and secure your position in the first Layer 1 blockchain with native AI compute.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link href="/presale" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pyrax-orange hover:from-purple-600 hover:to-pyrax-amber text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-purple-500/25">
                  <Coins className="w-5 h-5" />
                  Join Presale Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/docs/crucible" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                  <Bot className="w-5 h-5" />
                  Documentation
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Working Technology
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  First Native L1 AI
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  5% Fee Burn
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  $200B Market
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
