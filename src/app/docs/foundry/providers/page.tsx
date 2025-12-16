"use client";

import Link from "next/link";
import { Flame, ChevronRight, Server, Coins, Shield, Zap, CheckCircle } from "lucide-react";

const requirements = [
  { gpu: "RTX 3060", vram: "12GB", hourly: "$0.15", pyrx: "~15 PYRX/hr" },
  { gpu: "RTX 3080", vram: "10GB", hourly: "$0.35", pyrx: "~35 PYRX/hr" },
  { gpu: "RTX 3090", vram: "24GB", hourly: "$0.55", pyrx: "~55 PYRX/hr" },
  { gpu: "RTX 4090", vram: "24GB", hourly: "$0.95", pyrx: "~95 PYRX/hr" },
  { gpu: "A100", vram: "80GB", hourly: "$3.50", pyrx: "~350 PYRX/hr" },
];

const stakingTiers = [
  { tier: "Bronze", stake: "1,000 PYRX", jobs: "2 concurrent", priority: "Standard" },
  { tier: "Silver", stake: "10,000 PYRX", jobs: "5 concurrent", priority: "Medium" },
  { tier: "Gold", stake: "100,000 PYRX", jobs: "20 concurrent", priority: "High" },
  { tier: "Platinum", stake: "1,000,000 PYRX", jobs: "Unlimited", priority: "Highest" },
];

export default function FoundryProvidersPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/docs/foundry" className="hover:text-white">Foundry</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Become a Provider</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Server className="w-6 h-6 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-white">Become a GPU Provider</h1>
        </div>

        <p className="text-lg text-gray-300 mb-8">
          Earn PYRX tokens by contributing your GPU compute to the Foundry network. 
          Help train the next generation of AI models while generating passive income from your hardware.
        </p>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <Coins className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="font-bold text-white mb-1">Earn 85% of Fees</h3>
            <p className="text-sm text-gray-400">Majority of training job fees go directly to you</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white mb-1">Passive Income</h3>
            <p className="text-sm text-gray-400">Your GPU works while you sleep</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <Shield className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="font-bold text-white mb-1">No Data Access</h3>
            <p className="text-sm text-gray-400">You only process gradients, not raw data</p>
          </div>
        </div>

        {/* GPU Requirements */}
        <h2 className="text-2xl font-bold text-white mb-4">Supported GPUs & Earnings</h2>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-orange-400">GPU</th>
                <th className="text-left py-3 px-4 text-gray-400">VRAM</th>
                <th className="text-left py-3 px-4 text-gray-400">Hourly Rate</th>
                <th className="text-left py-3 px-4 text-gray-400">Est. Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requirements.map((r) => (
                <tr key={r.gpu}>
                  <td className="py-3 px-4 text-white font-medium">{r.gpu}</td>
                  <td className="py-3 px-4 text-gray-400">{r.vram}</td>
                  <td className="py-3 px-4 text-green-400">{r.hourly}</td>
                  <td className="py-3 px-4 text-gray-400">{r.pyrx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Staking Tiers */}
        <h2 className="text-2xl font-bold text-white mb-4">Staking Tiers</h2>
        <p className="text-gray-400 mb-4">Stake PYRX to unlock more concurrent jobs and priority routing.</p>
        <div className="space-y-3 mb-12">
          {stakingTiers.map((t) => (
            <div key={t.tier} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <div className="font-bold text-white">{t.tier}</div>
                <div className="text-sm text-gray-500">{t.stake} minimum stake</div>
              </div>
              <div className="text-right">
                <div className="text-orange-400 font-medium">{t.jobs}</div>
                <div className="text-xs text-gray-500">{t.priority} priority</div>
              </div>
            </div>
          ))}
        </div>

        {/* Setup Steps */}
        <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
        <div className="space-y-4 mb-12">
          {[
            { step: 1, title: "Install PYRAX Desktop", desc: "Download and install the PYRAX Desktop application" },
            { step: 2, title: "Connect Wallet", desc: "Connect your wallet with PYRX tokens for staking" },
            { step: 3, title: "Stake PYRX", desc: "Stake minimum 1,000 PYRX to become a provider" },
            { step: 4, title: "Enable Foundry", desc: "Toggle Foundry provider mode in settings" },
            { step: 5, title: "Start Earning", desc: "Your GPU will automatically accept training jobs" },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold flex-shrink-0">
                {s.step}
              </div>
              <div>
                <div className="font-semibold text-white">{s.title}</div>
                <div className="text-sm text-gray-400">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* System Requirements */}
        <h2 className="text-2xl font-bold text-white mb-4">System Requirements</h2>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-12">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "GPU", value: "NVIDIA RTX 3060 or better" },
              { label: "VRAM", value: "12GB minimum (24GB+ recommended)" },
              { label: "RAM", value: "32GB recommended" },
              { label: "Storage", value: "100GB+ SSD for model cache" },
              { label: "Internet", value: "100Mbps+ upload/download" },
              { label: "OS", value: "Windows 10/11, Ubuntu 20.04+" },
            ].map((req) => (
              <div key={req.label} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">{req.label}:</span>
                <span className="text-white">{req.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Start Earning?</h3>
          <p className="text-gray-400 mb-6">Download PYRAX Desktop and become a Foundry GPU provider today.</p>
          <Link href="/downloads" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors">
            <Flame className="w-5 h-5" />
            Download PYRAX Desktop
          </Link>
        </div>
      </div>
    </div>
  );
}
