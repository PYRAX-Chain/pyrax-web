"use client";

import Link from "next/link";
import {
  Flame,
  Cpu,
  Zap,
  Shield,
  Database,
  Brain,
  ArrowRight,
  CheckCircle,
  Coins,
  Users,
  Lock,
  Server,
  GitBranch,
  Layers,
  TrendingUp,
  Globe,
  DollarSign,
  BarChart3,
  Award,
  Activity,
} from "lucide-react";

export default function FoundryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-red-900/20 to-amber-900/40" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[128px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-sm font-medium mb-8">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300">Decentralized ML Training</span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold ml-2">LIVE</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400">
                Foundry
              </span>
            </h1>

            <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-light mb-6">
              Train AI at <span className="text-orange-400 font-semibold">70% Less</span> Than Cloud
            </p>

            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              The first decentralized ML training platform. Train models on community GPUs, 
              earn PYRX for compute contributions. 70% cheaper than AWS, GCP, and Azure.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link href="/presale" className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg transition-all shadow-lg shadow-orange-500/25">
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
                <div className="text-2xl font-bold text-white">$50B+</div>
                <div className="text-xs text-gray-500">ML Training Market 2025</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Activity className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">70%</div>
                <div className="text-xs text-gray-500">Cheaper Than Cloud</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">85%</div>
                <div className="text-xs text-gray-500">To GPU Providers</div>
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

      {/* What is Foundry */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                What is Foundry?
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                Foundry is PYRAX&apos;s decentralized machine learning training platform. Just as a foundry 
                transforms raw metal into refined products, PYRAX Foundry transforms raw data into 
                trained AI models using community-contributed GPU compute.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                GPU providers earn PYRX tokens for contributing training compute, while developers 
                get access to affordable, censorship-resistant ML infrastructure. It&apos;s the missing 
                piece that completes the PYRAX AI ecosystem alongside Crucible inference.
              </p>
              
              <div className="space-y-4">
                {[
                  "Train any PyTorch/JAX model",
                  "Federated learning for privacy",
                  "Byzantine-fault tolerant aggregation",
                  "ZK proofs verify training contributions",
                  "Seamless Crucible integration",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-3xl" />
              <div className="relative p-8 rounded-3xl bg-pyrax-dark border border-white/10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-4">
                    <Flame className="w-10 h-10 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Foundry + Crucible Ecosystem</h3>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                    <span className="text-gray-400">Raw Data</span>
                    <span className="text-orange-400">→ Foundry</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                    <span className="text-gray-400">Foundry</span>
                    <span className="text-red-400">→ Training</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                    <span className="text-gray-400">Trained Model</span>
                    <span className="text-purple-400">→ Model Registry</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                    <span className="text-gray-400">Model Registry</span>
                    <span className="text-blue-400">→ Crucible</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                    <span className="text-gray-400">Crucible</span>
                    <span className="text-green-400">→ Live Inference ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-24 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-4">
              <TrendingUp className="h-4 w-4" />
              Investment Opportunity
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Invest in Foundry?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Capture a share of the booming ML training market with decentralized compute at 70% lower costs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20">
              <Globe className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Massive Market</h3>
              <p className="text-gray-400 text-sm mb-4">ML training compute market projected to reach $50B+ by 2025. Foundry enables decentralized access.</p>
              <div className="text-3xl font-bold text-green-400">$50B+</div>
              <div className="text-xs text-gray-500">Total Addressable Market</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20">
              <BarChart3 className="w-10 h-10 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Cost Disruption</h3>
              <p className="text-gray-400 text-sm mb-4">70% cheaper than AWS, GCP, and Azure. Every training job burns 5% of fees permanently.</p>
              <div className="text-3xl font-bold text-orange-400">70%</div>
              <div className="text-xs text-gray-500">Cheaper Than Cloud</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20">
              <Award className="w-10 h-10 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Complete Ecosystem</h3>
              <p className="text-gray-400 text-sm mb-4">Foundry + Crucible = complete AI lifecycle. Train → Deploy → Earn. All on PYRAX.</p>
              <div className="text-3xl font-bold text-red-400">2-in-1</div>
              <div className="text-xs text-gray-500">Train + Inference Platform</div>
            </div>
          </div>

          {/* Comparison with Cloud Providers */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Foundry vs Cloud Providers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">RTX 4090 Equivalent</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">A100 80GB</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Privacy</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Token Burn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 px-4 text-gray-300 font-medium">AWS SageMaker</td>
                    <td className="text-center py-3 px-4 text-gray-400">$3.50/hr</td>
                    <td className="text-center py-3 px-4 text-gray-400">$32.77/hr</td>
                    <td className="text-center py-3 px-4 text-red-400">AWS Access</td>
                    <td className="text-center py-3 px-4 text-gray-500">N/A</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300 font-medium">Google Vertex AI</td>
                    <td className="text-center py-3 px-4 text-gray-400">$3.67/hr</td>
                    <td className="text-center py-3 px-4 text-gray-400">$37.20/hr</td>
                    <td className="text-center py-3 px-4 text-red-400">Google Access</td>
                    <td className="text-center py-3 px-4 text-gray-500">N/A</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300 font-medium">Azure ML</td>
                    <td className="text-center py-3 px-4 text-gray-400">$3.40/hr</td>
                    <td className="text-center py-3 px-4 text-gray-400">$36.67/hr</td>
                    <td className="text-center py-3 px-4 text-red-400">Microsoft Access</td>
                    <td className="text-center py-3 px-4 text-gray-500">N/A</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300 font-medium">Lambda Labs</td>
                    <td className="text-center py-3 px-4 text-gray-400">$1.25/hr</td>
                    <td className="text-center py-3 px-4 text-gray-400">$2.49/hr</td>
                    <td className="text-center py-3 px-4 text-yellow-400">Centralized</td>
                    <td className="text-center py-3 px-4 text-gray-500">N/A</td>
                  </tr>
                  <tr className="bg-orange-500/10">
                    <td className="py-3 px-4 text-orange-400 font-bold">PYRAX Foundry</td>
                    <td className="text-center py-3 px-4 text-orange-400 font-bold">$0.95/hr</td>
                    <td className="text-center py-3 px-4 text-orange-400 font-bold">$3.50/hr</td>
                    <td className="text-center py-3 px-4 text-green-400 font-bold">Federated</td>
                    <td className="text-center py-3 px-4 text-green-400 font-bold">5% Burn</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Training Types */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Training Types</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From fine-tuning to federated learning, Foundry supports all modern ML training paradigms
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Supervised Learning</h3>
              <p className="text-gray-400 text-sm mb-4">Train models on labeled datasets with full control</p>
              <div className="text-xs text-gray-500">VRAM: 8-80 GB</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fine-Tuning (LoRA)</h3>
              <p className="text-gray-400 text-sm mb-4">Efficiently adapt pre-trained models to your data</p>
              <div className="text-xs text-gray-500">VRAM: 8-24 GB</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Federated Learning</h3>
              <p className="text-gray-400 text-sm mb-4">Train across distributed data without sharing it</p>
              <div className="text-xs text-gray-500">VRAM: 4-16 GB</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">RLHF Training</h3>
              <p className="text-gray-400 text-sm mb-4">Align models with human preferences</p>
              <div className="text-xs text-gray-500">VRAM: 24-80 GB</div>
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
              Foundry creates value for GPU providers, ML researchers, and token holders
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold text-white">GPU Providers</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Train-to-Earn:</strong> Get paid PYRX for GPU compute cycles</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">85% of Fees:</strong> Industry-leading provider payout</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Flexible Work:</strong> Accept jobs that match your hardware</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">ML Researchers</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">70% Savings:</strong> Dramatically lower training costs</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Privacy First:</strong> Federated learning keeps data local</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Censorship Free:</strong> Train any model, any data</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Coins className="w-8 h-8 text-orange-400" />
                <h3 className="text-2xl font-bold text-white">Token Holders</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Deflationary:</strong> 5% of all training fees burned</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Utility Demand:</strong> PYRX required for all jobs</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Ecosystem Growth:</strong> More users = more burn</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Enterprise</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Byzantine Tolerant:</strong> Krum aggregation ensures integrity</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">ZK Verified:</strong> Cryptographic proof of compute</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Scalable:</strong> Access unlimited GPU capacity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section className="py-24 bg-gradient-to-b from-pyrax-dark/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tokenomics</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Sustainable economics that benefit providers and PYRX holders
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
                    <span className="text-gray-300">GPU Provider</span>
                  </div>
                  <span className="text-3xl font-bold text-green-400">85%</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <Coins className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Protocol Treasury</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-400">10%</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-3">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <span className="text-gray-300">Burned Forever</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-400">5%</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-orange-400" />
                GPU Pricing (per hour)
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <div className="font-semibold text-white">RTX 3060 12GB</div>
                    <div className="text-xs text-gray-500">Small models</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-orange-400">$0.15</div>
                    <div className="text-xs text-gray-500">~15 PYRX</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <div className="font-semibold text-white">RTX 4090 24GB</div>
                    <div className="text-xs text-gray-500">Premium training</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-orange-400">$0.95</div>
                    <div className="text-xs text-gray-500">~95 PYRX</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                  <div>
                    <div className="font-semibold text-white">A100 80GB</div>
                    <div className="text-xs text-gray-500">Enterprise LLMs</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-orange-400">$3.50</div>
                    <div className="text-xs text-gray-500">~350 PYRX</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple Training API</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Submit training jobs with a familiar YAML configuration
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-pyrax-dark border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-sm text-gray-500">training-job.yaml</span>
              </div>
              <pre className="text-sm font-mono overflow-x-auto">
                <code className="text-gray-300">{`# PYRAX Foundry Training Job
job_type: fine_tune
model:
  base_model: mistral-7b
  method: qlora
  lora_config:
    r: 64
    alpha: 16
    dropout: 0.1
    target_modules: [q_proj, v_proj, k_proj, o_proj]

dataset:
  source: ipfs://QmYourDatasetHash
  format: instruction
  
training:
  epochs: 3
  batch_size: 4
  learning_rate: 2e-5
  gradient_accumulation: 8
  
distributed:
  gpus_requested: 4
  min_vram: 24GB
  aggregation: fedavg
  
budget:
  max_cost: 500 PYRX
  priority: standard`}</code>
              </pre>
            </div>
            
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Submit with:</span>
                <code className="px-2 py-1 rounded bg-pyrax-darker text-orange-400">pyrax foundry submit training-job.yaml</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-24 bg-pyrax-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete AI Ecosystem</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Foundry and Crucible form the complete AI lifecycle on PYRAX
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/20">
              <Flame className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">PYRAX Foundry</h3>
              <p className="text-gray-400 mb-4">Train and fine-tune models on decentralized GPUs</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Supervised learning</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Fine-tuning (LoRA/QLoRA)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Federated learning</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> RLHF training</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20">
              <Database className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">PYRAX Crucible</h3>
              <p className="text-gray-400 mb-4">Deploy and run trained models for inference</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Text generation</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Image generation</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Embeddings</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Smart contract AI</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-lg text-gray-300">
              <span className="text-orange-400 font-semibold">Train</span> on Foundry → 
              <span className="text-purple-400 font-semibold"> Publish</span> to Registry → 
              <span className="text-blue-400 font-semibold"> Deploy</span> on Crucible → 
              <span className="text-green-400 font-semibold"> Earn</span> PYRX
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-orange-900/50 via-red-900/30 to-amber-900/50 border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-3xl" />
            
            <div className="relative">
              <Flame className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Be Part of the ML Revolution
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the presale and invest in the future of decentralized AI training. 70% cheaper than AWS, GCP, and Azure.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link href="/presale" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-orange-500/25">
                  <Coins className="w-5 h-5" />
                  Join Presale Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/docs/foundry" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                  <Brain className="w-5 h-5" />
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
                  70% Cheaper
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  5% Fee Burn
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  $50B Market
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
