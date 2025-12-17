"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  Calendar,
  DollarSign,
  Percent,
  Play,
  Pause,
  Edit,
  Save,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Phase {
  id: string;
  phaseNumber: number;
  name: string;
  description: string;
  priceUsd: number;
  pyrxBonusBps: number;
  xfBonusBps: number;
  capUsd: number;
  raisedUsd: number;
  startTime: string | null;
  endTime: string | null;
  active: boolean;
}

const defaultPhases: Phase[] = [
  {
    id: "1",
    phaseNumber: 0,
    name: "Early Bird",
    description: "First phase with maximum bonuses",
    priceUsd: 0.0025,
    pyrxBonusBps: 2500,
    xfBonusBps: 10000,
    capUsd: 500000,
    raisedUsd: 0,
    startTime: null,
    endTime: null,
    active: false,
  },
  {
    id: "2",
    phaseNumber: 1,
    name: "Phase 2",
    description: "Second phase with reduced bonuses",
    priceUsd: 0.004,
    pyrxBonusBps: 1500,
    xfBonusBps: 5000,
    capUsd: 1000000,
    raisedUsd: 0,
    startTime: null,
    endTime: null,
    active: false,
  },
  {
    id: "3",
    phaseNumber: 2,
    name: "Phase 3",
    description: "Third phase",
    priceUsd: 0.006,
    pyrxBonusBps: 1000,
    xfBonusBps: 2500,
    capUsd: 1500000,
    raisedUsd: 0,
    startTime: null,
    endTime: null,
    active: false,
  },
  {
    id: "4",
    phaseNumber: 3,
    name: "Phase 4",
    description: "Final presale phase",
    priceUsd: 0.008,
    pyrxBonusBps: 500,
    xfBonusBps: 1000,
    capUsd: 2000000,
    raisedUsd: 0,
    startTime: null,
    endTime: null,
    active: false,
  },
];

export default function PhasesPage() {
  const [phases, setPhases] = useState<Phase[]>(defaultPhases);
  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPhases();
  }, []);

  const fetchPhases = async () => {
    try {
      const res = await fetch("/api/admin/phases");
      if (res.ok) {
        const data = await res.json();
        if (data.phases?.length > 0) {
          setPhases(data.phases);
        }
      }
    } catch (error) {
      console.error("Failed to fetch phases:", error);
    }
  };

  const handleActivate = async (phaseId: string, startTime: string, endTime: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/phases/${phaseId}/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startTime, endTime }),
      });

      if (res.ok) {
        fetchPhases();
      }
    } catch (error) {
      console.error("Failed to activate phase:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (phaseId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/phases/${phaseId}/deactivate`, {
        method: "POST",
      });

      if (res.ok) {
        fetchPhases();
      }
    } catch (error) {
      console.error("Failed to deactivate phase:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePhase = async (phase: Phase) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/phases/${phase.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(phase),
      });

      if (res.ok) {
        setEditingPhase(null);
        fetchPhases();
      }
    } catch (error) {
      console.error("Failed to save phase:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Presale Phases</h1>
        <p className="text-gray-400">Configure and manage presale phases</p>
      </div>

      {/* Phases Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {phases.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            isEditing={editingPhase?.id === phase.id}
            editingPhase={editingPhase}
            setEditingPhase={setEditingPhase}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
            onSave={handleSavePhase}
            loading={loading}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Phase Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Phase</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Price</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">PYRX Bonus</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">XF Bonus</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Cap</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Raised</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {phases.map((phase) => (
                <tr key={phase.id} className="border-b border-white/5">
                  <td className="py-3 px-4 text-white">{phase.name}</td>
                  <td className="py-3 px-4 text-right text-white">${phase.priceUsd}</td>
                  <td className="py-3 px-4 text-right text-green-400">+{phase.pyrxBonusBps / 100}%</td>
                  <td className="py-3 px-4 text-right text-blue-400">+{phase.xfBonusBps / 100}%</td>
                  <td className="py-3 px-4 text-right text-white">${phase.capUsd.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-pyrax-orange">${phase.raisedUsd.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    {phase.active ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                        <CheckCircle className="h-3 w-3" /> Active
                      </span>
                    ) : phase.raisedUsd >= phase.capUsd ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                        <CheckCircle className="h-3 w-3" /> Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs">
                        <Clock className="h-3 w-3" /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PhaseCard({
  phase,
  isEditing,
  editingPhase,
  setEditingPhase,
  onActivate,
  onDeactivate,
  onSave,
  loading,
}: {
  phase: Phase;
  isEditing: boolean;
  editingPhase: Phase | null;
  setEditingPhase: (phase: Phase | null) => void;
  onActivate: (id: string, start: string, end: string) => void;
  onDeactivate: (id: string) => void;
  onSave: (phase: Phase) => void;
  loading: boolean;
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const progress = phase.capUsd > 0 ? (phase.raisedUsd / phase.capUsd) * 100 : 0;

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${phase.active ? "bg-green-500/20" : "bg-pyrax-orange/20"}`}>
            <Layers className={`h-5 w-5 ${phase.active ? "text-green-400" : "text-pyrax-orange"}`} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{phase.name}</h3>
            <p className="text-sm text-gray-400">{phase.description}</p>
          </div>
        </div>
        {phase.active ? (
          <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Active</span>
        ) : (
          <span className="px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs">Inactive</span>
        )}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Progress</span>
          <span className="text-white">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-pyrax-orange rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-500">${phase.raisedUsd.toLocaleString()}</span>
          <span className="text-gray-500">${phase.capUsd.toLocaleString()}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-white/5">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <DollarSign className="h-3 w-3" /> Price
          </div>
          <div className="text-lg font-semibold text-white">${phase.priceUsd}</div>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Percent className="h-3 w-3" /> Bonuses
          </div>
          <div className="text-sm">
            <span className="text-green-400">+{phase.pyrxBonusBps / 100}% PYRX</span>
            <span className="text-gray-500 mx-1">|</span>
            <span className="text-blue-400">+{phase.xfBonusBps / 100}% XF</span>
          </div>
        </div>
      </div>

      {/* Schedule */}
      {phase.startTime && phase.endTime && (
        <div className="p-3 rounded-lg bg-white/5 mb-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Calendar className="h-3 w-3" /> Schedule
          </div>
          <div className="text-sm text-white">
            {new Date(phase.startTime).toLocaleDateString()} -{" "}
            {new Date(phase.endTime).toLocaleDateString()}
          </div>
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
              className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-white"
              placeholder="Start"
            />
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-white"
              placeholder="End"
            />
            <button
              onClick={() => onActivate(phase.id, startDate, endDate)}
              disabled={loading || !startDate || !endDate}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50"
            >
              <Play className="h-4 w-4" /> Activate
            </button>
          </>
        )}
        <button
          onClick={() => setEditingPhase(phase)}
          className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <Edit className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
