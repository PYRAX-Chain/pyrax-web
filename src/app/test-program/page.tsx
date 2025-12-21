"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import {
  Flame,
  Target,
  Gift,
  CheckCircle,
  Circle,
  Trophy,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  Medal,
  Zap,
  Wallet,
  LogOut,
} from "lucide-react";

interface TestPhase {
  id: string;
  name: string;
  theme: string;
  description: string;
  objectives: { text: string; completed: boolean }[];
  rewards: number;
  status: "locked" | "active" | "completed";
  participantCount: number;
}

const testPhases: TestPhase[] = [
  {
    id: "forge",
    name: "Forge Phase",
    theme: "🔥 Node Setup & Mining",
    description: "Learn to run PYRAX nodes and test the mining infrastructure",
    objectives: [
      { text: "Set up a Stream A or Stream B node", completed: false },
      { text: "Successfully mine 10 test blocks", completed: false },
      { text: "Join the node operator Discord channel", completed: false },
      { text: "Submit mining stats via the dashboard", completed: false },
    ],
    rewards: 5000,
    status: "active",
    participantCount: 0,
  },
  {
    id: "blaze",
    name: "Blaze Phase",
    theme: "⚡ Transactions & Smart Contracts",
    description: "Test transaction processing and deploy smart contracts",
    objectives: [
      { text: "Send 50+ test transactions", completed: false },
      { text: "Deploy a smart contract to testnet", completed: false },
      { text: "Interact with 5 different dApps", completed: false },
      { text: "Report any bugs found", completed: false },
    ],
    rewards: 3000,
    status: "locked",
    participantCount: 0,
  },
  {
    id: "inferno",
    name: "Inferno Phase",
    theme: "🔴 Advanced Testing",
    description: "Test advanced transaction features and smart contracts",
    objectives: [
      { text: "Complete 20+ complex transactions", completed: false },
      { text: "Deploy and interact with smart contracts", completed: false },
      { text: "Test advanced network features", completed: false },
      { text: "Participate in stress testing", completed: false },
    ],
    rewards: 4000,
    status: "locked",
    participantCount: 0,
  },
  {
    id: "phoenix",
    name: "Phoenix Phase",
    theme: "🟣 Full Ecosystem Stress Test",
    description: "Final stress test of the entire PYRAX ecosystem",
    objectives: [
      { text: "Participate in the TPS stress test event", completed: false },
      { text: "Complete all previous phase tasks", completed: false },
      { text: "Help onboard 3 new testers", completed: false },
      { text: "Submit final feedback report", completed: false },
    ],
    rewards: 6000,
    status: "locked",
    participantCount: 0,
  },
];

export default function TestProgramPage() {
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const [totalEarned, setTotalEarned] = useState(0);
  const [completedObjectives, setCompletedObjectives] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [testerData, setTesterData] = useState<any>(null);
  const [totalTesters, setTotalTesters] = useState(0);
  const totalObjectives = testPhases.reduce((acc, p) => acc + p.objectives.length, 0);
  const maxRewards = testPhases.reduce((acc, p) => acc + p.rewards, 0);

  // Check registration status when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      checkRegistration(address);
    } else {
      setIsRegistered(false);
      setTesterData(null);
    }
  }, [isConnected, address]);

  const checkRegistration = async (wallet: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/test-program/register?wallet=${wallet}`);
      const data = await res.json();
      
      if (data.registered) {
        setIsRegistered(true);
        setTesterData(data.tester);
        setTotalEarned(Number(data.rewards?.total || 0));
        setCompletedObjectives(data.tester?.completedPhases || 0);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error("Error checking registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!isConnected || !address) return;
    
    try {
      setIsLoading(true);
      const res = await fetch("/api/test-program/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: address }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsRegistered(true);
        setTesterData(data.tester);
        setTotalEarned(Number(data.tester?.totalRewards || 0));
        
        // Show bonus notification if applicable
        if (data.bonuses?.earlyTester) {
          alert("🎉 Congratulations! You received an Early Tester Bonus!");
        }
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 text-sm mb-4">
            <Sparkles className="h-4 w-4" />
            Earn up to {maxRewards.toLocaleString()} PYRAX
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            PYRAX Test Program
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Help test the PYRAX network and earn rewards. Complete objectives across
            4 testing phases to earn PYRAX tokens at mainnet launch.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-pyrax-orange/20">
                <Trophy className="h-5 w-5 text-pyrax-orange" />
              </div>
              <span className="text-gray-400 text-sm">Your Rewards</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalEarned.toLocaleString()} PYRAX</div>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Target className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-gray-400 text-sm">Objectives</span>
            </div>
            <div className="text-2xl font-bold text-white">{completedObjectives} / {totalObjectives}</div>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-gray-400 text-sm">Total Testers</span>
            </div>
            <div className="text-2xl font-bold text-white">Coming Soon</div>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Gift className="h-5 w-5 text-purple-400" />
              </div>
              <span className="text-gray-400 text-sm">Pool Allocation</span>
            </div>
            <div className="text-2xl font-bold text-white">600M PYRAX</div>
          </div>
        </div>

        {/* Wallet Connection & Registration CTA */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                {isConnected ? <Wallet className="h-8 w-8 text-cyan-400" /> : <Zap className="h-8 w-8 text-cyan-400" />}
              </div>
              <div>
                {!isConnected ? (
                  <>
                    <h3 className="text-xl font-bold text-white">Connect Your Wallet</h3>
                    <p className="text-gray-400">Connect with Firelink or MetaMask to join the Test Program</p>
                  </>
                ) : !isRegistered ? (
                  <>
                    <h3 className="text-xl font-bold text-white">Register for Test Program</h3>
                    <p className="text-gray-400">
                      Connected: <span className="text-cyan-400 font-mono">{formatAddress(address!)}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white">You&apos;re Registered! 🎉</h3>
                    <p className="text-gray-400">
                      Wallet: <span className="text-cyan-400 font-mono">{formatAddress(address!)}</span>
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isConnected ? (
                <button
                  onClick={() => connect({ connector: injected() })}
                  disabled={isConnecting}
                  className="px-6 py-3 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isConnecting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4" />
                      Connect Wallet
                    </>
                  )}
                </button>
              ) : !isRegistered ? (
                <button
                  onClick={handleRegister}
                  className="px-6 py-3 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2"
                >
                  Register Wallet
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium">
                    ✓ Registered
                  </span>
                  <button
                    onClick={() => disconnect()}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Disconnect wallet"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Phase Timeline */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Testing Phases</h2>
          <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
            {testPhases.map((phase, index) => (
              <div key={phase.id} className="flex items-center">
                <div className="flex flex-col items-center min-w-[100px]">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      phase.status === "completed"
                        ? "bg-green-500 text-white"
                        : phase.status === "active"
                        ? "bg-pyrax-orange text-white animate-pulse"
                        : "bg-white/10 text-gray-500"
                    }`}
                  >
                    {phase.status === "completed" ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Flame className="h-6 w-6" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      phase.status === "active" ? "text-pyrax-orange" : "text-white"
                    }`}>
                      {phase.name.split(" ")[0]}
                    </div>
                    <div className="text-xs text-gray-500">
                      {phase.rewards.toLocaleString()} PYRAX
                    </div>
                  </div>
                </div>
                {index < testPhases.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 min-w-[40px] ${
                    phase.status === "completed" ? "bg-green-500" : "bg-white/10"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Phase Cards */}
        <div className="space-y-6">
          {testPhases.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>

        {/* Rewards Info */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-pyrax-orange/10 to-amber-500/10 border border-pyrax-orange/20">
          <div className="flex items-center gap-3 mb-4">
            <Medal className="h-6 w-6 text-pyrax-orange" />
            <h2 className="text-xl font-bold text-white">How Rewards Work</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Objective-Based</h3>
              <p className="text-sm text-gray-400">
                Complete specific objectives in each phase to earn PYRAX rewards.
                Partial completion earns proportional rewards.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">On-Chain Verification</h3>
              <p className="text-sm text-gray-400">
                All activities are tracked on-chain. Your progress is automatically
                verified through network activity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Mainnet Distribution</h3>
              <p className="text-sm text-gray-400">
                Rewards are distributed at mainnet launch. Early testers get
                priority access to claim their tokens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseCard({ phase }: { phase: TestPhase }) {
  const completedCount = phase.objectives.filter(o => o.completed).length;
  const progress = (completedCount / phase.objectives.length) * 100;

  return (
    <div className={`p-6 rounded-xl border ${
      phase.status === "active"
        ? "bg-white/5 border-pyrax-orange/50"
        : phase.status === "completed"
        ? "bg-green-500/5 border-green-500/30"
        : "bg-white/5 border-white/10 opacity-60"
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Phase Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${
              phase.status === "active"
                ? "bg-pyrax-orange/20"
                : phase.status === "completed"
                ? "bg-green-500/20"
                : "bg-white/10"
            }`}>
              <Flame className={`h-5 w-5 ${
                phase.status === "active"
                  ? "text-pyrax-orange"
                  : phase.status === "completed"
                  ? "text-green-400"
                  : "text-gray-500"
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-white">{phase.name}</h3>
              <p className="text-sm text-gray-400">{phase.theme}</p>
            </div>
            {phase.status === "active" && (
              <span className="ml-auto px-3 py-1 rounded-full bg-pyrax-orange/20 text-pyrax-orange text-xs font-medium">
                Active Now
              </span>
            )}
            {phase.status === "completed" && (
              <span className="ml-auto px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                Completed
              </span>
            )}
            {phase.status === "locked" && (
              <span className="ml-auto px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs font-medium">
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm mb-4">{phase.description}</p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-white">{completedCount} / {phase.objectives.length} objectives</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  phase.status === "completed" ? "bg-green-500" : "bg-pyrax-orange"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Objectives */}
          <div className="space-y-2">
            {phase.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3">
                {obj.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                )}
                <span className={`text-sm ${obj.completed ? "text-green-400" : "text-gray-400"}`}>
                  {obj.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div className="lg:w-48 p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Phase Rewards</div>
            <div className="text-2xl font-bold text-pyrax-orange">
              {phase.rewards.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">PYRAX</div>
            {phase.status === "active" && (
              <Link
                href={`/test-program/${phase.id}`}
                className="mt-4 block w-full py-2 rounded-lg bg-pyrax-orange text-white text-sm font-medium hover:bg-pyrax-amber transition-colors"
              >
                Start Testing
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
