"use client";

import { useState } from "react";
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
  RefreshCw,
  Clock,
  Bell,
} from "lucide-react";
import clsx from "clsx";

// PRESALE IS DISABLED - Set to false to enable presale
const PRESALE_ENABLED = false;

const PRESALE_CONTRACT = process.env.NEXT_PUBLIC_PRESALE_CONTRACT || "0xBb6780Ed54B44eD18Ec6e26A197ac7bE1B04eFe4";
const NETWORK = process.env.NEXT_PUBLIC_NETWORK || "sepolia";
const ETHERSCAN_URL = NETWORK === "sepolia" ? "https://sepolia.etherscan.io" : "https://etherscan.io";

// Fundraising Goals
const SOFT_CAP_USD = 18_000_000; // $18M soft cap (essential operations)
const HARD_CAP_USD = 100_000_000; // $100M hard cap
const CURRENT_RAISED_USD = 0; // Will be fetched from contract

// Funding Allocation Breakdown (Based on $18M Soft Cap - Essential Operations)
const fundingAllocation = [
  { name: "Legal & Regulatory Compliance", amount: 4_500_000, percentage: 25, icon: Scale, description: "Global securities compliance, legal entities in 12+ jurisdictions, regulatory licenses, ongoing legal counsel" },
  { name: "Security & Audits", amount: 3_000_000, percentage: 17, icon: Shield, description: "Multiple smart contract audits, formal verification, penetration testing, $1M bug bounty program, security monitoring" },
  { name: "Exchange Listings & Liquidity", amount: 3_600_000, percentage: 20, icon: TrendingUp, description: "Tier-1 CEX listings, market maker partnerships, initial DEX liquidity, trading infrastructure" },
  { name: "Infrastructure & Operations", amount: 2_500_000, percentage: 14, icon: Building, description: "Global node infrastructure, data centers, RPC endpoints, monitoring, 24/7 operations team" },
  { name: "Team & Development", amount: 2_700_000, percentage: 15, icon: Users, description: "Core team (25+ engineers), protocol development, AI/ML research, ongoing maintenance" },
  { name: "Marketing & Ecosystem", amount: 1_200_000, percentage: 7, icon: Globe, description: "Global marketing campaigns, developer grants, hackathons, conferences, community programs" },
  { name: "Treasury Reserve", amount: 500_000, percentage: 2, icon: Briefcase, description: "Strategic reserve for opportunities, emergencies, and long-term sustainability" },
];

// Presale Phases (Total: $100M across 4 phases)
const presalePhases = [
  { name: "Early Bird", price: 0.0025, bonus: "+25% PYRAX, +100% XF", status: "upcoming", cap: "$10M" },
  { name: "Phase 2", price: 0.004, bonus: "+15% PYRAX, +50% XF", status: "upcoming", cap: "$20M" },
  { name: "Phase 3", price: 0.006, bonus: "+10% PYRAX, +25% XF", status: "upcoming", cap: "$30M" },
  { name: "Phase 4", price: 0.008, bonus: "+5% PYRAX, +10% XF", status: "upcoming", cap: "$40M" },
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

// Social links for notifications
const SOCIAL_LINKS = {
  telegram: "https://t.me/+TmDvlOc8TxxmNzAx",
  discord: "https://discord.gg/2UQCA9J2x7",
  twitter: "https://x.com/PYRAX_Official",
};

// Social icons
const TelegramIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function PresalePage() {
  // If presale is not enabled, show the "not live" page
  if (!PRESALE_ENABLED) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Big Warning Icon */}
          <div className="w-24 h-24 mx-auto rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center mb-8">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          
          {/* Main Message */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Presale Is Not Live
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            The PYRAX presale has not started yet. Follow our social channels to be notified the moment it goes live.
          </p>
          
          {/* Social Links - Big Buttons */}
          <div className="space-y-4 mb-12">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
              Get Real-Time Notifications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#229ED9] hover:bg-[#1a8bc7] text-white font-semibold transition-all hover:scale-105"
              >
                <TelegramIcon />
                Join Telegram
              </a>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold transition-all hover:scale-105"
              >
                <DiscordIcon />
                Join Discord
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-black border border-white/20 hover:bg-white/10 text-white font-semibold transition-all hover:scale-105"
              >
                <TwitterIcon />
                Follow on X
              </a>
            </div>
          </div>
          
          {/* Info Box */}
          <div className="p-6 rounded-xl bg-pyrax-orange/10 border border-pyrax-orange/30">
            <div className="flex items-start gap-3 text-left">
              <Bell className="h-6 w-6 text-pyrax-orange flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-pyrax-orange mb-1">
                  Don&apos;t Miss the Launch
                </h3>
                <p className="text-sm text-gray-400">
                  Join our community channels to receive instant notifications when the presale launches. 
                  Early participants will receive bonus PYRAX tokens and exclusive rewards.
                </p>
              </div>
            </div>
          </div>
          
          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Presale is disabled - this code should never run
  // When PRESALE_ENABLED is set to true, re-enable the full presale page
  return null;
}
