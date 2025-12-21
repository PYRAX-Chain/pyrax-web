"use client";

import { useState, useEffect } from "react";
import {
  Flame,
  Calendar,
  Target,
  Users,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Gift,
} from "lucide-react";

interface TestnetPhase {
  id: string;
  phaseNumber: number;
  name: string;
  theme: string;
  description: string;
  objectives: string[];
  rewards: string;
  startTime: string | null;
  endTime: string | null;
  active: boolean;
  participantCount?: number;
}

const defaultTestnetPhases: TestnetPhase[] = [
  {
    id: "1",
    phaseNumber: 0,
    name: "Forge Phase",
    theme: "🔥 Node Setup & Mining",
    description: "Learn to run PYRAX nodes and test the mining infrastructure",
    objectives: [
      "Set up a Stream A or Stream B node",
      "Successfully mine 10 test blocks",
      "Join the node operator Discord channel",
      "Submit mining stats via the dashboard",
    ],
    rewards: "5,000 PYRAX bonus at mainnet",
    startTime: null,
    endTime: null,
    active: false,
    participantCount: 0,
  },
  {
    id: "2",
    phaseNumber: 1,
    name: "Blaze Phase",
    theme: "⚡ Transactions & Smart Contracts",
    description: "Test transaction processing and deploy smart contracts",
    objectives: [
      "Send 50+ test transactions",
      "Deploy a smart contract to testnet",
      "Interact with 5 different dApps",
      "Report any bugs found",
    ],
    rewards: "3,000 PYRAX bonus at mainnet",
    startTime: null,
    endTime: null,
    active: false,
    participantCount: 0,
  },
  {
    id: "3",
    phaseNumber: 2,
    name: "Inferno Phase",
    theme: "🌊 DEX & Liquidity Testing",
    description: "Test advanced transaction features and smart contracts",
    objectives: [
      "Complete 20+ complex transactions",
      "Deploy and interact with smart contracts",
      "Test advanced network features",
      "Participate in stress testing",
    ],
    rewards: "4,000 PYRAX bonus at mainnet",
    startTime: null,
    endTime: null,
    active: false,
    participantCount: 0,
  },
  {
    id: "4",
    phaseNumber: 3,
    name: "Phoenix Phase",
    theme: "🦅 Full Ecosystem Stress Test",
    description: "Final stress test of the entire PYRAX ecosystem",
    objectives: [
      "Participate in the TPS stress test event",
      "Complete all previous phase tasks",
      "Help onboard 3 new testers",
      "Submit final feedback report",
    ],
    rewards: "6,000 PYRAX + 3,000 XF bonus at mainnet",
    startTime: null,
    endTime: null,
    active: false,
    participantCount: 0,
  },
];

export default function TestnetPhasesPage() {
  const [phases, setPhases] = useState<TestnetPhase[]>(defaultTestnetPhases);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPhases();
  }, []);

  const fetchPhases = async () => {
    try {
      const res = await fetch("/api/admin/testnet/phases");
      if (res.ok) {
        const data = await res.json();
        if (data.phases?.length > 0) {
          setPhases(data.phases);
        }
      }
    } catch (error) {
      console.error("Failed to fetch testnet phases:", error);
    }
  };

  const handleActivate = async (phaseId: string, startTime: string, endTime: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/testnet/phases/${phaseId}/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startTime, endTime }),
      });
      if (res.ok) fetchPhases();
    } catch (error) {
      console.error("Failed to activate phase:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (phaseId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/testnet/phases/${phaseId}/deactivate`, {
        method: "POST",
      });
      if (res.ok) fetchPhases();
    } catch (error) {
      console.error("Failed to deactivate phase:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Testnet Phases</h1>
        <p className="text-gray-400">
          Manage the 4-phase testnet program (30 days each)
        </p>
      </div>

      {/* Timeline Overview */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-6">Phase Timeline</h2>
        <div className="flex items-center justify-between">
          {phases.map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    phase.active
                      ? "bg-pyrax-orange text-white"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  <Flame className="h-6 w-6" />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-white">{phase.name}</div>
                  <div className="text-xs text-gray-500">30 days</div>
                </div>
              </div>
              {index < phases.length - 1 && (
                <div className="flex-1 h-0.5 bg-white/10 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Phase Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {phases.map((phase) => (
          <TestnetPhaseCard
            key={phase.id}
            phase={phase}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
            loading={loading}
          />
        ))}
      </div>

      {/* Rewards Summary */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-pyrax-orange/10 to-pyrax-amber/10 border border-pyrax-orange/20">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="h-6 w-6 text-pyrax-orange" />
          <h2 className="text-lg font-semibold text-white">Total Testnet Rewards</h2>
        </div>
        <div className="p-4 rounded-lg bg-white/5">
          <div className="text-2xl font-bold text-pyrax-orange">18,000 PYRAX</div>
          <div className="text-sm text-gray-400">Maximum PYRAX rewards per tester</div>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Rewards are distributed at mainnet launch based on completed objectives.
          Partial completion earns proportional rewards.
        </p>
      </div>
    </div>
  );
}

function TestnetPhaseCard({
  phase,
  onActivate,
  onDeactivate,
  loading,
}: {
  phase: TestnetPhase;
  onActivate: (id: string, start: string, end: string) => void;
  onDeactivate: (id: string) => void;
  loading: boolean;
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              phase.active ? "bg-green-500/20" : "bg-pyrax-orange/20"
            }`}
          >
            <Flame
              className={`h-5 w-5 ${
                phase.active ? "text-green-400" : "text-pyrax-orange"
              }`}
            />
          </div>
          <div>
            <h3 className="font-semibold text-white">{phase.name}</h3>
            <p className="text-sm text-pyrax-orange">{phase.theme}</p>
          </div>
        </div>
        {phase.active ? (
          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
            Active
          </span>
        ) : (
          <span className="px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs">
            Inactive
          </span>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-4">{phase.description}</p>

      {/* Objectives */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Target className="h-4 w-4" />
          <span>Objectives</span>
        </div>
        <ul className="space-y-1">
          {phase.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Rewards */}
      <div className="p-3 rounded-lg bg-pyrax-orange/10 border border-pyrax-orange/20 mb-4">
        <div className="flex items-center gap-2 text-pyrax-orange text-sm">
          <Gift className="h-4 w-4" />
          <span className="font-medium">{phase.rewards}</span>
        </div>
      </div>

      {/* Stats */}
      {phase.participantCount !== undefined && (
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="h-4 w-4" />
            <span>{phase.participantCount} participants</span>
          </div>
          {phase.startTime && (
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(phase.startTime).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {phase.active ? (
          <button
            onClick={() => onDeactivate(phase.id)}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
          >
            <Pause className="h-4 w-4" /> Deactivate
          </button>
        ) : (
          <>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex-1 px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-white"
            />
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="flex-1 px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-white"
            />
            <button
              onClick={() => onActivate(phase.id, startDate, endDate)}
              disabled={loading || !startDate || !endDate}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50"
            >
              <Play className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
