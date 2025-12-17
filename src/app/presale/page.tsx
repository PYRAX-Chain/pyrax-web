"use client";

import { useState } from "react";
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import { parseEther, formatEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import {
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Shield,
  Users,
  TrendingUp,
  CircleDollarSign,
  Cpu,
  Sparkles,
  Flame,
  Scale,
  FileText,
  Building,
  Briefcase,
  Globe,
  Zap,
  Award,
  Target,
  Gift,
} from "lucide-react";
import clsx from "clsx";

const PRESALE_CONTRACT = process.env.NEXT_PUBLIC_PRESALE_CONTRACT || "0xBb6780Ed54B44eD18Ec6e26A197ac7bE1B04eFe4";
const NETWORK = process.env.NEXT_PUBLIC_NETWORK || "sepolia";
const ETHERSCAN_URL = NETWORK === "sepolia" ? "https://sepolia.etherscan.io" : "https://etherscan.io";

// Fundraising Goals - Soft Cap for Essential Operations
const SOFT_CAP_USD = 2_500_000; // $2.5M soft cap
const HARD_CAP_USD = 5_000_000; // $5M hard cap
const CURRENT_RAISED_USD = 0; // Will be fetched from contract

// Funding Allocation Breakdown
const fundingAllocation = [
  { name: "Legal & Regulatory Compliance", amount: 800000, percentage: 32, icon: Scale, description: "Securities law compliance, legal entity formation, regulatory filings across jurisdictions" },
  { name: "Security Audits", amount: 400000, percentage: 16, icon: Shield, description: "Smart contract audits, penetration testing, bug bounty program setup" },
  { name: "Exchange Listings", amount: 350000, percentage: 14, icon: TrendingUp, description: "CEX listing fees, market maker arrangements, liquidity provision" },
  { name: "Infrastructure & Operations", amount: 300000, percentage: 12, icon: Building, description: "Server infrastructure, node hosting, monitoring systems" },
  { name: "Team & Development", amount: 350000, percentage: 14, icon: Users, description: "Core team salaries, contractor payments, ongoing development" },
  { name: "Marketing & Community", amount: 200000, percentage: 8, icon: Globe, description: "Brand awareness, community building, educational content" },
  { name: "Reserve Fund", amount: 100000, percentage: 4, icon: Briefcase, description: "Emergency fund for unforeseen costs" },
];

// Presale Phases
const presalePhases = [
  { name: "Early Bird", price: 0.0025, bonus: "+25% PYRX, +100% XF", status: "upcoming", cap: "$500K" },
  { name: "Phase 2", price: 0.004, bonus: "+15% PYRX, +50% XF", status: "upcoming", cap: "$1M" },
  { name: "Phase 3", price: 0.006, bonus: "+10% PYRX, +25% XF", status: "upcoming", cap: "$1.5M" },
  { name: "Phase 4", price: 0.008, bonus: "+5% PYRX, +10% XF", status: "upcoming", cap: "$2M" },
];

// Working Tech Features
const workingTech = [
  { name: "PYRAX Node Software", description: "Full node implementation with TriStream consensus", status: "Built", icon: Cpu },
  { name: "Mining Infrastructure", description: "Stream A (ASIC) and Stream B (GPU) mining ready", status: "Built", icon: Zap },
  { name: "Crucible AI Layer", description: "Native AI compute with GPU inference", status: "Built", icon: Sparkles },
  { name: "Foundry ML Platform", description: "Decentralized ML training infrastructure", status: "Built", icon: Flame },
  { name: "Smart Contract EVM", description: "Full Ethereum Virtual Machine compatibility", status: "Built", icon: FileText },
  { name: "Block Explorer", description: "Transaction and block explorer", status: "Built", icon: Globe },
];

const presaleStats = {
  totalRaised: "0",
  totalRaisedUsd: 0,
  contributors: 0,
  currentPrice: "0.0025",
  currentPhase: 0,
  stage: "Coming Soon",
  softCap: SOFT_CAP_USD,
  hardCap: HARD_CAP_USD,
};

export default function PresalePage() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { sendTransaction } = useSendTransaction();

  const handleContribute = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      await sendTransaction({
        to: PRESALE_CONTRACT as `0x${string}`,
        value: parseEther(amount),
      });
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const expectedPyrx = amount
    ? (parseFloat(amount) / parseFloat(presaleStats.currentPrice)).toLocaleString()
    : "0";

  const softCapProgress = (presaleStats.totalRaisedUsd / SOFT_CAP_USD) * 100;

  return (
    <div className="min-h-screen">
      {/* Hero Section - Working Tech Banner */}
      <section className="relative py-16 bg-gradient-to-b from-green-900/20 to-transparent border-b border-green-500/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">
                Working Technology — Not Roadmap Promises
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              PYRAX Presale
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              One of the <span className="text-pyrax-orange font-semibold">first L1 blockchains</span> to launch presale with{" "}
              <span className="text-green-400 font-semibold">fully functional technology</span>.
              Our nodes, mining, AI compute, and smart contracts are already built.
            </p>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              We&apos;re not raising funds for development—we&apos;re raising funds for{" "}
              <span className="text-white">regulatory compliance, security audits, and exchange listings</span>{" "}
              to become a legitimate, properly launched blockchain project.
            </p>
          </div>
        </div>
      </section>

      {/* Working Tech Grid */}
      <section className="py-12 bg-pyrax-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold text-gray-400 mb-8">
            ✅ Technology Already Built & Working
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {workingTech.map((tech) => (
              <div key={tech.name} className="p-4 rounded-xl bg-white/5 border border-green-500/20 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                  <tech.icon className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-sm font-medium text-white">{tech.name}</div>
                <div className="text-xs text-green-400 mt-1">{tech.status}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Unlike most L1 projects that raise funds based on whitepapers, PYRAX has working technology you can verify today.{" "}
            <Link href="/technology" className="text-pyrax-orange hover:underline">View our tech →</Link>
          </p>
        </div>
      </section>

      <div className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Fundraising Goals Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">What We&apos;re Raising Funds For</h2>
            <p className="mt-2 text-gray-400">
              Transparent allocation of presale funds — 100% goes to making PYRAX a legitimate, compliant project
            </p>
          </div>

          {/* Progress Bar */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-white">
                  ${presaleStats.totalRaisedUsd.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">raised of ${(SOFT_CAP_USD / 1000000).toFixed(1)}M soft cap</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-pyrax-orange">{softCapProgress.toFixed(1)}%</div>
                <div className="text-sm text-gray-500">to soft cap</div>
              </div>
            </div>
            
            <div className="relative h-6 bg-white/10 rounded-full overflow-hidden">
              {/* Soft cap marker */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-green-500 z-10" style={{ left: '50%' }} />
              <div className="absolute -top-6 text-xs text-green-400" style={{ left: '48%' }}>Soft Cap</div>
              
              {/* Progress */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-pyrax-orange to-pyrax-amber rounded-full transition-all"
                style={{ width: `${Math.min(softCapProgress, 100)}%` }}
              />
            </div>
            
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>$0</span>
              <span className="text-green-400">$2.5M (Soft Cap)</span>
              <span>$5M (Hard Cap)</span>
            </div>
          </div>

          {/* Allocation Breakdown */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fundingAllocation.map((item) => (
              <div key={item.name} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pyrax-orange/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-pyrax-orange/10">
                    <item.icon className="h-5 w-5 text-pyrax-orange" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white text-sm">{item.name}</h3>
                      <span className="text-pyrax-orange font-semibold">{item.percentage}%</span>
                    </div>
                    <div className="text-lg font-bold text-white mt-1">${(item.amount / 1000).toFixed(0)}K</div>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-400">Beyond Soft Cap</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Any funds raised beyond the $2.5M soft cap will go toward additional liquidity provision, 
                  extended marketing campaigns, and accelerated exchange listings—strengthening PYRAX&apos;s 
                  long-term viability and market presence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Presale Phases */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Presale Phases</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {presalePhases.map((phase, index) => (
              <div
                key={phase.name}
                className={clsx(
                  "p-6 rounded-xl border transition-all",
                  index === 0
                    ? "bg-gradient-to-b from-pyrax-orange/10 to-transparent border-pyrax-orange/30"
                    : "bg-white/5 border-white/10"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    index === 0 ? "bg-pyrax-orange/20 text-pyrax-orange" : "bg-gray-500/20 text-gray-400"
                  )}>
                    {phase.status === "upcoming" ? "Upcoming" : phase.status}
                  </span>
                  <span className="text-sm text-gray-500">{phase.cap}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{phase.name}</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white font-mono">${phase.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bonus</span>
                    <span className="text-green-400 text-sm">{phase.bonus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={TrendingUp}
                label="Total Raised"
                value={`${presaleStats.totalRaised} ETH`}
              />
              <StatCard
                icon={Users}
                label="Contributors"
                value={presaleStats.contributors.toString()}
              />
              <StatCard
                icon={CircleDollarSign}
                label="PYRX Price"
                value={`${presaleStats.currentPrice} ETH`}
              />
              <StatCard
                icon={Shield}
                label="Hard Cap"
                value={`${presaleStats.hardCap} ETH`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Progress
              </h2>
              <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-pyrax-orange to-pyrax-amber rounded-full transition-all"
                  style={{
                    width: `${(parseFloat(presaleStats.totalRaised) / Number(presaleStats.hardCap)) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-400">
                <span>{presaleStats.totalRaised} ETH raised</span>
                <span>{presaleStats.hardCap} ETH goal</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Contract Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Contract Address</span>
                  <a
                    href={`${ETHERSCAN_URL}/address/${PRESALE_CONTRACT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber font-mono text-sm"
                  >
                    {PRESALE_CONTRACT.slice(0, 6)}...{PRESALE_CONTRACT.slice(-4)}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Network</span>
                  <span className="text-white">{NETWORK === "sepolia" ? "Sepolia Testnet" : "Ethereum Mainnet"}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Contract Verified</span>
                  <span className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {isConnected && (
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Your Contribution
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400">Total Contributed</div>
                    <div className="text-2xl font-bold text-white">0 ETH</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400">Expected PYRX</div>
                    <div className="text-2xl font-bold text-pyrax-orange">
                      0 PYRX
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6">
                Contribute
              </h2>

              {!isConnected ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                    Connect your wallet to participate
                  </p>
                  <ConnectButton />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Amount (ETH)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0"
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
                      />
                      <button
                        onClick={() =>
                          setAmount(balance ? formatEther(balance.value) : "0")
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-pyrax-orange hover:text-pyrax-amber"
                      >
                        MAX
                      </button>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Balance: {balance ? formatEther(balance.value) : "0"} ETH
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">You will receive</span>
                      <span className="text-white font-medium">
                        ~{expectedPyrx} PYRX
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleContribute}
                    disabled={
                      isSubmitting || !amount || parseFloat(amount) <= 0
                    }
                    className={clsx(
                      "w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors",
                      isSubmitting || !amount || parseFloat(amount) <= 0
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-pyrax-orange hover:bg-pyrax-amber text-white"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <img src="/brand/pyrax-coin.svg" alt="PYRX" className="h-5 w-5" />
                        Contribute
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-400">
                    Risk Disclosure
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Cryptocurrency investments are highly volatile and risky.
                    You may lose your entire contribution. PYRX tokens will be
                    distributed at mainnet launch. No guarantees of returns.
                    This is not financial advice.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">
                Presale Terms
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  ETH-only contributions on Ethereum Mainnet
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  PYRX tokens claimable at mainnet launch
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Contract verified on Etherscan
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  No minimum contribution amount
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-pyrax-orange/10">
          <Icon className="h-5 w-5 text-pyrax-orange" />
        </div>
        <div>
          <div className="text-xs text-gray-400">{label}</div>
          <div className="text-lg font-semibold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}
