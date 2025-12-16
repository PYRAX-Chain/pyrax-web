"use client";

import Link from "next/link";
import { Flame, ChevronRight, Server, Brain, Users, Shield, Coins, Zap } from "lucide-react";

const sections = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs/foundry/overview", label: "Overview", desc: "What is PYRAX Foundry?" },
      { href: "/docs/foundry/quickstart", label: "Quick Start", desc: "Submit your first training job" },
      { href: "/docs/foundry/architecture", label: "Architecture", desc: "How Foundry works" },
    ],
  },
  {
    title: "Training Jobs",
    links: [
      { href: "/docs/foundry/training", label: "Training Guide", desc: "Configure and run training jobs" },
      { href: "/docs/foundry/fine-tuning", label: "Fine-Tuning", desc: "LoRA and QLoRA fine-tuning" },
      { href: "/docs/foundry/federated", label: "Federated Learning", desc: "Privacy-preserving training" },
      { href: "/docs/foundry/rlhf", label: "RLHF", desc: "Reinforcement learning from human feedback" },
    ],
  },
  {
    title: "GPU Providers",
    links: [
      { href: "/docs/foundry/providers", label: "Become a Provider", desc: "Earn PYRX by providing GPU compute" },
      { href: "/docs/foundry/staking", label: "Staking Requirements", desc: "Stake PYRX to participate" },
      { href: "/docs/foundry/rewards", label: "Reward Structure", desc: "How earnings are calculated" },
    ],
  },
  {
    title: "Advanced",
    links: [
      { href: "/docs/foundry/api", label: "API Reference", desc: "Foundry SDK and CLI" },
      { href: "/docs/foundry/contracts", label: "Smart Contracts", desc: "On-chain training contracts" },
      { href: "/docs/foundry/security", label: "Security", desc: "Byzantine resistance and ZK proofs" },
    ],
  },
];

const features = [
  { icon: Brain, title: "Multiple Training Types", desc: "Supervised, fine-tuning, federated, RLHF" },
  { icon: Shield, title: "Byzantine-Resistant", desc: "Krum aggregation tolerates malicious nodes" },
  { icon: Coins, title: "Train-to-Earn", desc: "GPU providers earn PYRX for compute" },
  { icon: Zap, title: "70% Cheaper", desc: "Than AWS, GCP, Azure" },
];

export default function FoundryDocsPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/10 to-amber-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-sm text-orange-400 font-medium">PYRAX Foundry Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Foundry ML Training
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Train machine learning models on decentralized GPU infrastructure. From fine-tuning to federated learning, Foundry makes distributed training accessible and affordable.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="border-b border-white/10 bg-pyrax-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <f.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{f.title}</div>
                  <div className="text-xs text-gray-500">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-lg font-bold text-white mb-4">{section.title}</h2>
              <div className="space-y-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-orange-500/10 transition-colors group"
                  >
                    <div>
                      <div className="text-white font-medium group-hover:text-orange-400 transition-colors">{link.label}</div>
                      <div className="text-sm text-gray-500">{link.desc}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">For Developers</h3>
              <p className="text-gray-400 mb-4">Start training models on decentralized infrastructure</p>
              <Link href="/docs/foundry/quickstart" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors">
                <Brain className="w-4 h-4" />
                Start Training
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">For GPU Providers</h3>
              <p className="text-gray-400 mb-4">Earn PYRX by contributing your GPU compute</p>
              <Link href="/docs/foundry/providers" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/20">
                <Server className="w-4 h-4" />
                Become a Provider
              </Link>
            </div>
          </div>
        </div>

        {/* Ecosystem */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">PYRAX AI Ecosystem</h3>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/docs/foundry" className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 font-medium border border-orange-500/30">
              Foundry (Training)
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <div className="px-4 py-2 rounded-lg bg-white/5 text-gray-400">
              Model Registry
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <Link href="/docs/crucible" className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 font-medium border border-purple-500/30">
              Crucible (Inference)
            </Link>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Train models on Foundry, publish to the registry, deploy for inference on Crucible
          </p>
        </div>
      </div>
    </div>
  );
}
