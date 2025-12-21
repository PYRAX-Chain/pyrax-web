"use client";

import Link from "next/link";
import { Flame, ChevronRight, ArrowRight, CheckCircle } from "lucide-react";

export default function FoundryOverviewPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/docs/foundry" className="hover:text-white">Foundry</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Overview</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-white">What is PYRAX Foundry?</h1>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-orange-400">PYRAX Foundry</strong> is a decentralized machine learning training platform 
            built on the PYRAX blockchain. It enables developers to train AI models using distributed GPU compute from 
            the community, while GPU providers earn PYRAX tokens for contributing their hardware.
          </p>

          <div className="my-8 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">The PYRAX AI Ecosystem</h3>
            <div className="font-mono text-sm bg-pyrax-dark p-4 rounded-lg overflow-x-auto">
              <pre className="text-gray-300">{`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    FOUNDRY      │────▶│  Model Registry │────▶│    CRUCIBLE     │
│   (Training)    │     │   (IPFS+Chain)  │     │   (Inference)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                                               │
        └───────────── GPU Provider Network ────────────┘`}</pre>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              <strong className="text-white">Foundry</strong> handles training, <strong className="text-white">Crucible</strong> handles inference. 
              Together they form the complete AI lifecycle on PYRAX.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Decentralized Training", desc: "Train models on community-contributed GPUs worldwide" },
              { title: "70% Cheaper", desc: "Dramatically lower costs compared to AWS, GCP, Azure" },
              { title: "Train-to-Earn", desc: "GPU providers earn PYRAX for contributing compute" },
              { title: "Privacy-Preserving", desc: "Federated learning keeps your data local" },
              { title: "Byzantine-Resistant", desc: "Krum aggregation tolerates malicious nodes" },
              { title: "ZK Verification", desc: "Cryptographic proofs verify training contributions" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white">{item.title}</div>
                  <div className="text-sm text-gray-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Supported Training Types</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-orange-400">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400">Description</th>
                  <th className="text-left py-3 px-4 text-gray-400">VRAM Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 px-4 text-white">Supervised Learning</td>
                  <td className="py-3 px-4 text-gray-400">Train on labeled datasets</td>
                  <td className="py-3 px-4 text-gray-400">8-80 GB</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Fine-Tuning (LoRA/QLoRA)</td>
                  <td className="py-3 px-4 text-gray-400">Efficient model adaptation</td>
                  <td className="py-3 px-4 text-gray-400">8-24 GB</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Federated Learning</td>
                  <td className="py-3 px-4 text-gray-400">Privacy-preserving distributed training</td>
                  <td className="py-3 px-4 text-gray-400">4-16 GB</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">RLHF</td>
                  <td className="py-3 px-4 text-gray-400">Reinforcement learning from human feedback</td>
                  <td className="py-3 px-4 text-gray-400">24-80 GB</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Economic Model</h2>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Fee Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-gray-300">GPU Provider</span>
                <span className="text-2xl font-bold text-green-400">85%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-gray-300">Protocol Treasury</span>
                <span className="text-xl font-bold text-purple-400">10%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-gray-300">Burned 🔥</span>
                <span className="text-xl font-bold text-orange-400">5%</span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <Link href="/docs/foundry/quickstart" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors">
              Quick Start Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/docs/foundry/providers" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20">
              Become a Provider
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
