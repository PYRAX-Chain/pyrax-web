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
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Coins,
  Users,
  Lock,
  Server,
} from "lucide-react";

const workloads = [
  { icon: MessageSquare, title: "Text Generation", desc: "Llama 3, Mistral, GPT-style models", vram: "8-16 GB", color: "purple" },
  { icon: ImageIcon, title: "Image Generation", desc: "Stable Diffusion, Flux, DALL-E style", vram: "12-24 GB", color: "orange" },
  { icon: Bot, title: "Embeddings", desc: "BGE, E5, semantic search vectors", vram: "2-4 GB", color: "blue" },
  { icon: Cpu, title: "Classification", desc: "CLIP, ViT, image/text analysis", vram: "4-8 GB", color: "green" },
];

const benefits = [
  { icon: Coins, title: "Dual Revenue for Miners", desc: "GPU miners earn from both PoW mining AND AI inference jobs. Maximum hardware utilization." },
  { icon: Shield, title: "Trustless Verification", desc: "Results verified via ZK proofs or optimistic verification with slashing for invalid outputs." },
  { icon: Zap, title: "Native Smart Contract AI", desc: "Call AI directly from Solidity via precompiles. No oracles, no bridges, no trust assumptions." },
  { icon: Lock, title: "Deflationary Tokenomics", desc: "5% of all AI job fees are burned, creating sustainable deflationary pressure on PYRX." },
];

const tiers = [
  { name: "Bronze", stake: "1,000", jobs: "5", color: "from-amber-700 to-amber-900" },
  { name: "Silver", stake: "10,000", jobs: "20", color: "from-gray-400 to-gray-600" },
  { name: "Gold", stake: "100,000", jobs: "100", color: "from-yellow-400 to-yellow-600" },
  { name: "Platinum", stake: "1,000,000", jobs: "Unlimited", color: "from-cyan-300 to-cyan-500" },
];

export default function CruciblePage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pyrax-orange/20 to-blue-900/30" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              PYRAX AI Compute Layer
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pyrax-orange to-amber-400">
                Crucible
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-light mb-4">
              Where GPU Compute Forges Intelligence
            </p>
            
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
              The first Layer 1 blockchain with native AI compute capabilities. Transform your GPU mining operation into a decentralized AI powerhouse.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs/crucible" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pyrax-orange hover:from-purple-600 hover:to-pyrax-amber text-white font-semibold transition-all">
                <Sparkles className="w-5 h-5" />
                Get Started
              </Link>
              <Link href="/whitepaper#sec-7" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">
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
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pyrax-orange">100K+</div>
              <div className="text-sm text-gray-400 mt-1">Inference TPS</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">85%</div>
              <div className="text-sm text-gray-400 mt-1">Worker Rewards</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">5%</div>
              <div className="text-sm text-gray-400 mt-1">Fee Burn Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">&lt;1s</div>
              <div className="text-sm text-gray-400 mt-1">Response Time</div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Supported Workloads */}
      <section className="py-24 bg-pyrax-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Supported Workloads</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Run cutting-edge AI models on decentralized infrastructure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workloads.map((w) => (
              <div key={w.title} className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-${w.color}-500/30 transition-colors`}>
                <div className={`w-12 h-12 rounded-xl bg-${w.color}-500/10 flex items-center justify-center mb-4`}>
                  <w.icon className={`w-6 h-6 text-${w.color}-400`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{w.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{w.desc}</p>
                <div className="text-xs text-gray-500">VRAM: {w.vram}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Crucible?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The benefits of decentralized AI compute on PYRAX
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-pyrax-orange/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-6 h-6 text-pyrax-orange" />
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

      {/* Economics */}
      <section className="py-24 bg-gradient-to-b from-pyrax-dark/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Economic Model</h2>
              <p className="text-lg text-gray-400 mb-8">
                Crucible creates sustainable economics for GPU workers, verifiers, and the protocol.
              </p>
              
              <div className="p-6 rounded-2xl bg-pyrax-dark border border-white/10 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Fee Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">GPU Worker</span>
                    <span className="text-2xl font-bold text-green-400">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Verifier Network</span>
                    <span className="text-xl font-bold text-blue-400">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Protocol Treasury</span>
                    <span className="text-xl font-bold text-purple-400">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Burned 🔥</span>
                    <span className="text-xl font-bold text-pyrax-orange">5%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Worker Staking Tiers</h3>
              <div className="space-y-4">
                {tiers.map((tier) => (
                  <div key={tier.name} className={`p-4 rounded-xl bg-gradient-to-r ${tier.color} bg-opacity-20 border border-white/10`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-bold text-white">{tier.name}</div>
                        <div className="text-sm text-gray-300">{tier.stake} PYRX stake</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{tier.jobs}</div>
                        <div className="text-xs text-gray-400">concurrent jobs</div>
                      </div>
                    </div>
                  </div>
                ))}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-900/50 via-pyrax-orange/30 to-blue-900/50 border border-white/10 text-center">
            <Sparkles className="w-12 h-12 text-pyrax-orange mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Forge Intelligence?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the Crucible network as a GPU worker or start building AI-powered dApps on PYRAX.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs/crucible/workers" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pyrax-dark font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                <Server className="w-5 h-5" />
                Become a Worker
              </Link>
              <Link href="/docs/crucible/developers" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                <Bot className="w-5 h-5" />
                Build with Crucible
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
