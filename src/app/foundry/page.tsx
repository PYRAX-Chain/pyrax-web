"use client";

import Link from "next/link";
import {
  Flame,
  Cpu,
  Zap,
  Shield,
  Database,
  Brain,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Coins,
  Users,
  Lock,
  Server,
  GitBranch,
  Layers,
  TrendingUp,
} from "lucide-react";

const trainingTypes = [
  { icon: Brain, title: "Supervised Learning", desc: "Train models on labeled datasets with full control", vram: "8-80 GB", color: "blue" },
  { icon: GitBranch, title: "Fine-Tuning (LoRA)", desc: "Efficiently adapt pre-trained models to your data", vram: "8-24 GB", color: "purple" },
  { icon: Users, title: "Federated Learning", desc: "Train across distributed data without sharing it", vram: "4-16 GB", color: "green" },
  { icon: Layers, title: "RLHF Training", desc: "Align models with human preferences", vram: "24-80 GB", color: "orange" },
];

const benefits = [
  { icon: Coins, title: "Train-to-Earn", desc: "GPU providers earn PYRX for contributing compute cycles to model training jobs." },
  { icon: Shield, title: "Byzantine-Resistant", desc: "Krum aggregation and ZK proofs ensure training integrity even with malicious nodes." },
  { icon: Zap, title: "70% Cheaper Than Cloud", desc: "Decentralized compute dramatically undercuts AWS, GCP, and Azure pricing." },
  { icon: Lock, title: "Privacy-Preserving", desc: "Federated learning keeps your training data local - only gradients are shared." },
];

const pricingTiers = [
  { gpu: "RTX 3060", vram: "12GB", hourly: "$0.15", pyrx: "~15 PYRX", useCase: "Small models" },
  { gpu: "RTX 3090", vram: "24GB", hourly: "$0.55", pyrx: "~55 PYRX", useCase: "Large models" },
  { gpu: "RTX 4090", vram: "24GB", hourly: "$0.95", pyrx: "~95 PYRX", useCase: "Premium" },
  { gpu: "A100", vram: "80GB", hourly: "$3.50", pyrx: "~350 PYRX", useCase: "Enterprise LLMs" },
];

const competitors = [
  { name: "AWS SageMaker", price: "$3.50/hr", savings: "73%" },
  { name: "Google Vertex", price: "$3.67/hr", savings: "74%" },
  { name: "Lambda Labs", price: "$1.25/hr", savings: "24%" },
];

export default function FoundryPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-red-900/20 to-amber-900/30" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              <Flame className="w-4 h-4" />
              PYRAX ML Training Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400">
                Foundry
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-light mb-4">
              Where Raw Data is Forged into AI Models
            </p>
            
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
              The first decentralized machine learning training platform. Train models on community GPUs, 
              earn PYRX for compute contributions, and build the future of open AI.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs/foundry" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold transition-all">
                <Flame className="w-5 h-5" />
                Start Training
              </Link>
              <Link href="/whitepaper#sec-8" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">
                Read Whitepaper
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-y border-white/10 bg-pyrax-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">70%</div>
              <div className="text-sm text-gray-400 mt-1">Cheaper Than Cloud</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">85%</div>
              <div className="text-sm text-gray-400 mt-1">To GPU Providers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">15%</div>
              <div className="text-sm text-gray-400 mt-1">Platform Fee</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">∞</div>
              <div className="text-sm text-gray-400 mt-1">Scalable GPUs</div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Training Types */}
      <section className="py-24 bg-pyrax-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Supported Training Types</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From fine-tuning to federated learning, Foundry supports all modern ML training paradigms
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingTypes.map((t) => (
              <div key={t.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <t.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{t.desc}</p>
                <div className="text-xs text-gray-500">VRAM: {t.vram}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Foundry?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The benefits of decentralized ML training on PYRAX
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-gray-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gradient-to-b from-pyrax-dark/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent Pricing</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Pay only for what you use. No hidden fees, no long-term commitments.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* GPU Pricing Table */}
            <div className="p-6 rounded-2xl bg-pyrax-dark border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">GPU Compute Rates</h3>
              <div className="space-y-3">
                {pricingTiers.map((tier) => (
                  <div key={tier.gpu} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div>
                      <div className="font-semibold text-white">{tier.gpu}</div>
                      <div className="text-xs text-gray-500">{tier.vram} VRAM • {tier.useCase}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-400">{tier.hourly}</div>
                      <div className="text-xs text-gray-500">{tier.pyrx}/hr</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison */}
            <div className="p-6 rounded-2xl bg-pyrax-dark border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">vs. Cloud Providers (RTX 4090 equivalent)</h3>
              <div className="space-y-4">
                {competitors.map((comp) => (
                  <div key={comp.name} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <div>
                      <div className="font-semibold text-white">{comp.name}</div>
                      <div className="text-sm text-gray-500">{comp.price}</div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                      Save {comp.savings}
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                  <div>
                    <div className="font-semibold text-white">PYRAX Foundry</div>
                    <div className="text-sm text-orange-400">$0.95/hr</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-semibold">
                    Best Value
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Distribution */}
          <div className="mt-8 p-6 rounded-2xl bg-pyrax-dark border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Fee Distribution</h3>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-3xl font-bold text-green-400">85%</div>
                <div className="text-sm text-gray-400 mt-1">GPU Providers</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-3xl font-bold text-purple-400">10%</div>
                <div className="text-sm text-gray-400 mt-1">Protocol Treasury</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-3xl font-bold text-orange-400">5%</div>
                <div className="text-sm text-gray-400 mt-1">Burned 🔥</div>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-orange-900/50 via-red-900/30 to-amber-900/50 border border-white/10 text-center">
            <Flame className="w-12 h-12 text-orange-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Forge Your Models?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the Foundry network as a GPU provider or start training your own AI models today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs/foundry/providers" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pyrax-dark font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                <Server className="w-5 h-5" />
                Provide GPUs
              </Link>
              <Link href="/docs/foundry/training" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                <Brain className="w-5 h-5" />
                Start Training
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
