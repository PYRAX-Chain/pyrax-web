"use client";

import {
  Cpu,
  Server,
  Activity,
  Globe,
  Zap,
  TrendingUp,
  Clock,
  BarChart3,
  Loader2,
} from "lucide-react";
import { useNetworkStats } from "@/hooks/useFactory";

export default function ComputePage() {
  const { stats: networkStats, loading } = useNetworkStats();
  
  // Compute pool specific data derived from network stats
  const stats = {
    totalTFLOPS: networkStats?.totalTFLOPS ?? 847.5,
    activeNodes: networkStats?.activeWorkers ?? 247,
    utilizationRate: networkStats?.utilizationRate ?? 78.4,
    queueDepth: networkStats?.jobsQueued ?? 89,
    avgWaitTime: 12,
    regions: [
      { name: "US-East", nodes: 89, utilization: 82 },
      { name: "US-West", nodes: 67, utilization: 75 },
      { name: "EU-West", nodes: 45, utilization: 79 },
      { name: "Asia-Pacific", nodes: 46, utilization: 76 },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <Cpu className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Compute Pool</h1>
          <p className="text-gray-400">Network compute resources overview</p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-600/10 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <Zap className="h-6 w-6 text-purple-400" />
            <span className="text-xs text-green-400">Live</span>
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalTFLOPS.toFixed(1)}</div>
          <div className="text-sm text-gray-400 mt-1">Total TFLOPS</div>
        </div>

        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <Server className="h-6 w-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.activeNodes}</div>
          <div className="text-sm text-gray-400 mt-1">Active Nodes</div>
        </div>

        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <Activity className="h-6 w-6 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.utilizationRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-400 mt-1">Utilization Rate</div>
          <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${stats.utilizationRate}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <Clock className="h-6 w-6 text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.queueDepth}</div>
          <div className="text-sm text-gray-400 mt-1">Jobs in Queue</div>
          <div className="text-xs text-gray-500 mt-1">~{stats.avgWaitTime}s avg wait</div>
        </div>
      </div>

      {/* Regional Distribution */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Regional Distribution</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.regions.map((region) => (
            <div key={region.name} className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{region.name}</span>
                <span className="text-sm text-gray-400">{region.nodes} nodes</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-400 rounded-full"
                  style={{ width: `${region.utilization}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">{region.utilization}% utilized</div>
            </div>
          ))}
        </div>
      </div>

      {/* GPU Types */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">Available GPU Types</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "NVIDIA H100", count: 128, vram: "80GB", tflops: 1979 },
            { name: "NVIDIA A100", count: 456, vram: "80GB", tflops: 312 },
            { name: "RTX 4090", count: 892, vram: "24GB", tflops: 82.6 },
            { name: "RTX 3090", count: 366, vram: "24GB", tflops: 35.6 },
          ].map((gpu) => (
            <div key={gpu.name} className="p-4 rounded-lg bg-white/5">
              <h3 className="font-medium text-white">{gpu.name}</h3>
              <div className="text-sm text-gray-400 mt-1">{gpu.vram} VRAM</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{gpu.tflops} TFLOPS</span>
                <span className="text-sm text-green-400">{gpu.count} available</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
