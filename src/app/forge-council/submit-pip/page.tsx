"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect, useBalance, useSendTransaction } from "wagmi";
import { injected } from "wagmi/connectors";
import { parseEther, formatEther } from "viem";
import {
  ArrowLeft,
  Vote,
  Shield,
  Coins,
  Zap,
  Globe,
  AlertTriangle,
  BookOpen,
  Send,
  Wallet,
  Lock,
  CheckCircle,
  Loader2,
  Info,
  Clock,
  Users,
} from "lucide-react";

// PIP Categories - matches governance sidenav exactly
const PIP_CATEGORIES = [
  { id: "PROTOCOL", label: "Protocol Upgrades", icon: Shield, desc: "Changes to consensus, validation, or core protocol rules" },
  { id: "TREASURY", label: "Treasury", icon: Coins, desc: "Allocation or management of treasury funds" },
  { id: "PARAMETER", label: "Parameter Changes", icon: Zap, desc: "Adjust network parameters (gas limits, fees, block times)" },
  { id: "ECOSYSTEM", label: "Ecosystem", icon: Globe, desc: "Partnerships, integrations, grants, ecosystem growth" },
  { id: "SECURITY", label: "Security", icon: AlertTriangle, desc: "Security improvements, patches, or vulnerability fixes" },
  { id: "DOCUMENTATION", label: "Documentation", icon: BookOpen, desc: "Documentation standards, updates, or specifications" },
];

// Minimum stake required to submit a PIP
const MIN_STAKE_AMOUNT = 100;

// PIP Staking contract address (treasury/governance contract)
const STAKING_CONTRACT = "0x00000000000000000000000000000000005A1E01";

export default function SubmitPipPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const { sendTransaction, isPending: isSending } = useSendTransaction();
  
  const [stakeConfirmed, setStakeConfirmed] = useState(false);
  const [stakeTxHash, setStakeTxHash] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const [form, setForm] = useState({
    title: "",
    summary: "",
    motivation: "",
    specification: "",
    rationale: "",
    implementation: "",
    discussionLink: "",
    category: "PROTOCOL",
    votingDurationDays: 7,
    quorumPercent: 20,
    authorName: "",
    authorEmail: "",
  });

  // Check if user has enough balance
  const userBalance = balance ? parseFloat(formatEther(balance.value)) : 0;
  const hasEnoughBalance = userBalance >= MIN_STAKE_AMOUNT;

  const handleStake = async () => {
    if (!isConnected || !address) {
      setError("Please connect your wallet first");
      return;
    }

    if (!hasEnoughBalance) {
      setError(`Insufficient balance. You need at least ${MIN_STAKE_AMOUNT} PYRAX to submit a PIP.`);
      return;
    }

    setError("");
    
    try {
      sendTransaction({
        to: STAKING_CONTRACT as `0x${string}`,
        value: parseEther(MIN_STAKE_AMOUNT.toString()),
      }, {
        onSuccess: (hash) => {
          setStakeTxHash(hash);
          setStakeConfirmed(true);
        },
        onError: (err) => {
          setError(err.message || "Failed to stake PYRAX");
        }
      });
    } catch (err: any) {
      setError(err.message || "Failed to stake PYRAX");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stakeConfirmed) {
      setError("Please complete the stake requirement first");
      return;
    }
    
    if (!form.title.trim() || !form.summary.trim() || !form.motivation.trim() || !form.specification.trim()) {
      setError("Please fill in all required fields (Title, Summary, Motivation, Specification)");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/forge-council/pips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          authorWallet: address,
          stakeTxHash,
          stakeAmount: MIN_STAKE_AMOUNT.toString(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/forge-council/${data.pip.slug}`);
      } else {
        const err = await res.json();
        setError(err.error || "Failed to submit PIP");
      }
    } catch (err) {
      setError("Failed to submit PIP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="min-h-screen bg-pyrax-dark">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/forge-council" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Forge Council
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <Vote className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Submit a PIP</h1>
          </div>
          <p className="text-gray-400">Propose a PYRAX Improvement Proposal for community review and voting.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            isConnected ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-gray-500"
          }`}>
            <Wallet className="h-4 w-4" />
            <span className="text-sm font-medium">1. Connect</span>
            {isConnected && <CheckCircle className="h-4 w-4 text-green-400" />}
          </div>
          <div className="w-8 h-px bg-white/20" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            stakeConfirmed ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-gray-500"
          }`}>
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">2. Stake</span>
            {stakeConfirmed && <CheckCircle className="h-4 w-4 text-green-400" />}
          </div>
          <div className="w-8 h-px bg-white/20" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            stakeConfirmed ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-gray-500"
          }`}>
            <Send className="h-4 w-4" />
            <span className="text-sm font-medium">3. Submit</span>
          </div>
        </div>

        {/* Step 1: Connect Wallet */}
        {!isConnected && (
          <div className="bg-white/5 rounded-xl p-8 border border-white/10 text-center">
            <Wallet className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              To submit a PIP, you must connect your wallet and stake {MIN_STAKE_AMOUNT} PYRAX.
              This stake is returned after the voting period ends.
            </p>
            <button
              onClick={() => connect({ connector: injected() })}
              disabled={isConnecting}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-5 w-5" />
                  Connect Wallet
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Stake PYRAX */}
        {isConnected && !stakeConfirmed && (
          <div className="bg-white/5 rounded-xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <Lock className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Stake {MIN_STAKE_AMOUNT} PYRAX</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                To prevent spam, PIP authors must stake {MIN_STAKE_AMOUNT} PYRAX. 
                Your stake will be returned after the voting period ends.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Connected Wallet</span>
                <span className="text-white font-mono">{formatAddress(address!)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Your Balance</span>
                <span className={`font-semibold ${hasEnoughBalance ? "text-green-400" : "text-red-400"}`}>
                  {userBalance.toFixed(2)} PYRAX
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Required Stake</span>
                <span className="text-purple-400 font-semibold">{MIN_STAKE_AMOUNT} PYRAX</span>
              </div>
            </div>

            {!hasEnoughBalance && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400 text-sm">
                  Insufficient balance. You need at least {MIN_STAKE_AMOUNT} PYRAX to submit a PIP.
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button onClick={() => disconnect()} className="text-gray-400 hover:text-white">
                Disconnect
              </button>
              <button
                onClick={handleStake}
                disabled={!hasEnoughBalance || isSending}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Staking...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Stake {MIN_STAKE_AMOUNT} PYRAX
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: PIP Form */}
        {isConnected && stakeConfirmed && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Stake Confirmed */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Stake Confirmed</p>
                  <p className="text-sm text-gray-400">
                    {MIN_STAKE_AMOUNT} PYRAX staked from {formatAddress(address!)}
                  </p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p className="font-medium text-purple-400 mb-1">What is a PIP?</p>
                  <p>A PYRAX Improvement Proposal (PIP) is a formal document proposing changes to the PYRAX protocol, ecosystem, or governance.</p>
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-4">PIP Category *</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PIP_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setForm({ ...form, category: cat.id })}
                      className={`p-4 rounded-lg border transition-all text-left ${
                        form.category === cat.id
                          ? "bg-purple-500/20 border-purple-500 text-white"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-2 ${form.category === cat.id ? "text-purple-400" : ""}`} />
                      <div className="font-medium text-sm">{cat.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{cat.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title & Summary */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Increase Block Gas Limit to 30M"
                  maxLength={100}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Summary *</label>
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="A concise summary of what this PIP proposes and why"
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Motivation */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-2">Motivation *</h2>
              <p className="text-sm text-gray-400 mb-4">Why is this change needed? What problem does it solve?</p>
              <textarea
                value={form.motivation}
                onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                placeholder="Explain the motivation behind this proposal..."
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Specification */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-2">Specification *</h2>
              <p className="text-sm text-gray-400 mb-4">Technical specification of the proposed change.</p>
              <textarea
                value={form.specification}
                onChange={(e) => setForm({ ...form, specification: e.target.value })}
                placeholder="Describe the technical specification in detail..."
                rows={10}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none font-mono text-sm"
              />
            </div>

            {/* Rationale */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-2">Rationale</h2>
              <textarea
                value={form.rationale}
                onChange={(e) => setForm({ ...form, rationale: e.target.value })}
                placeholder="Why were these design decisions made?"
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Implementation */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-2">Implementation</h2>
              <textarea
                value={form.implementation}
                onChange={(e) => setForm({ ...form, implementation: e.target.value })}
                placeholder="Reference implementation, PR links, or implementation roadmap..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Voting Settings */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-4">Voting Settings</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-400" />
                    Voting Duration
                  </label>
                  <select
                    value={form.votingDurationDays}
                    onChange={(e) => setForm({ ...form, votingDurationDays: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value={3}>3 days</option>
                    <option value={7}>7 days (recommended)</option>
                    <option value={14}>14 days</option>
                    <option value={30}>30 days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    Quorum
                  </label>
                  <select
                    value={form.quorumPercent}
                    onChange={(e) => setForm({ ...form, quorumPercent: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value={10}>10%</option>
                    <option value={20}>20% (recommended)</option>
                    <option value={33}>33%</option>
                    <option value={50}>50%</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Discussion Link */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-2">Discussion Link</h2>
              <input
                type="url"
                value={form.discussionLink}
                onChange={(e) => setForm({ ...form, discussionLink: e.target.value })}
                placeholder="https://discord.gg/pyrax/..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Author Info */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-2">Author Information (Optional)</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                    type="text"
                    value={form.authorName}
                    onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                    placeholder="Your name or pseudonym"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    value={form.authorEmail}
                    onChange={(e) => setForm({ ...form, authorEmail: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex items-center justify-between">
              <Link href="/forge-council" className="text-gray-400 hover:text-white">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit PIP
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
