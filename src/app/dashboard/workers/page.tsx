"use client";

import { useState } from "react";
import {
  Server,
  Cpu,
  Activity,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Zap,
  MapPin,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useWorkers } from "@/hooks/useFactory";

export default function WorkersPage() {
  const [filter, setFilter] = useState<"all" | "online" | "busy" | "offline">("all");
  const { workers, summary, loading, refresh } = useWorkers({ status: filter === "all" ? undefined : filter });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
            <Server className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">GPU Workers</h1>
            <p className="text-gray-400">Network compute providers</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Server className="h-5 w-5 text-green-400" />
            <span className="text-xs text-green-400">Active</span>
          </div>
          <div className="text-2xl font-bold text-white">{summary?.totalWorkers ?? workers.length}</div>
          <div className="text-sm text-gray-400">Total Workers</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Cpu className="h-5 w-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{summary?.totalGPUs ?? 0}</div>
          <div className="text-sm text-gray-400">Total GPUs</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Activity className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">{summary?.activeJobs ?? 0}</div>
          <div className="text-sm text-gray-400">Active Jobs</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white">{summary?.avgUptime ?? 0}%</div>
          <div className="text-sm text-gray-400">Avg Uptime</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["all", "online", "busy", "offline"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-pyrax-orange text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Workers Table */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Worker</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">GPUs</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Region</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Jobs</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Uptime</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{worker.hostname}</div>
                    <div className="text-xs text-gray-500">{worker.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{worker.gpus}x</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white">{worker.gpuModel}</div>
                    <div className="text-xs text-gray-500">{worker.vram}GB</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="h-4 w-4" />
                      {worker.region}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      worker.status === "online" ? "bg-green-500/20 text-green-400" :
                      worker.status === "busy" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {worker.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-white">{worker.activeJobs}</td>
                  <td className="py-3 px-4 text-right text-green-400">{worker.uptime}%</td>
                  <td className="py-3 px-4 text-right text-orange-400">{worker.earnings} PYRX</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Become a Worker CTA */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Become a GPU Worker</h3>
            <p className="text-gray-400 mt-1">
              Contribute your GPU compute and earn PYRX rewards. 85% of all fees go directly to workers.
            </p>
          </div>
          <a
            href="/docs/workers"
            className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
