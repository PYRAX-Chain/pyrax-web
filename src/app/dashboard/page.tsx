"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import {
  Sparkles,
  Flame,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Image as ImageIcon,
  MessageSquare,
  Brain,
  Factory,
  Server,
  Activity,
  Database,
  Play,
  BarChart3,
  Users,
  Globe,
  RefreshCw,
} from "lucide-react";

// Simulated real-time network stats
const useNetworkStats = () => {
  const [stats, setStats] = useState({
    activeWorkers: 247,
    totalGPUs: 1842,
    jobsProcessing: 156,
    networkTPS: 12847,
    avgLatency: 234,
    uptime: 99.97,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeWorkers: prev.activeWorkers + Math.floor(Math.random() * 5) - 2,
        totalGPUs: prev.totalGPUs + Math.floor(Math.random() * 10) - 5,
        jobsProcessing: prev.jobsProcessing + Math.floor(Math.random() * 20) - 10,
        networkTPS: prev.networkTPS + Math.floor(Math.random() * 1000) - 500,
        avgLatency: Math.max(100, prev.avgLatency + Math.floor(Math.random() * 50) - 25),
        uptime: 99.97,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return stats;
};

export default function DashboardPage() {
  const { address } = useAccount();
  const networkStats = useNetworkStats();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pyrax-orange to-red-500 flex items-center justify-center">
            <Factory className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">The Factory</h1>
            <p className="text-gray-400">PYRAX AI & ML Control Center</p>
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

      {/* Network Status Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-medium">PYRAX Network Online</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-gray-400" />
              <span className="text-white font-medium">{networkStats.activeWorkers}</span>
              <span className="text-gray-400">Workers</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-gray-400" />
              <span className="text-white font-medium">{networkStats.totalGPUs.toLocaleString()}</span>
              <span className="text-gray-400">GPUs</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-gray-400" />
              <span className="text-white font-medium">{networkStats.networkTPS.toLocaleString()}</span>
              <span className="text-gray-400">TPS</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-white font-medium">{networkStats.avgLatency}ms</span>
              <span className="text-gray-400">Latency</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-600/10 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Active</span>
          </div>
          <div className="text-3xl font-bold text-white">0</div>
          <div className="text-sm text-gray-400 mt-1">Crucible Jobs</div>
          <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-purple-400 rounded-full" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20">
          <div className="flex items-center justify-between mb-3">
            <Flame className="h-6 w-6 text-orange-400" />
            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Active</span>
          </div>
          <div className="text-3xl font-bold text-white">0</div>
          <div className="text-sm text-gray-400 mt-1">Foundry Jobs</div>
          <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-orange-400 rounded-full" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="h-6 w-6 text-green-400" />
            <span className="text-xs text-gray-400">This Month</span>
          </div>
          <div className="text-3xl font-bold text-white">0 PYRX</div>
          <div className="text-sm text-gray-400 mt-1">Total Spent</div>
          <div className="mt-3 text-xs text-gray-500">≈ $0.00 USD</div>
        </div>

        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <Cpu className="h-6 w-6 text-cyan-400" />
            <span className="text-xs text-gray-400">All Time</span>
          </div>
          <div className="text-3xl font-bold text-white">0h</div>
          <div className="text-sm text-gray-400 mt-1">GPU Hours Used</div>
          <div className="mt-3 text-xs text-gray-500">Across all jobs</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          <Link href="/docs" className="text-sm text-pyrax-orange hover:underline">
            View Documentation →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/crucible"
            className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
              Generate Text
            </h3>
            <p className="text-sm text-gray-400 mt-1">Run LLM inference with Llama, Mistral models</p>
          </Link>

          <Link
            href="/dashboard/crucible"
            className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4">
              <ImageIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors">
              Generate Image
            </h3>
            <p className="text-sm text-gray-400 mt-1">Create images with Stable Diffusion, Flux</p>
          </Link>

          <Link
            href="/dashboard/foundry"
            className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
              Train Model
            </h3>
            <p className="text-sm text-gray-400 mt-1">Fine-tune models on distributed GPUs</p>
          </Link>

          <Link
            href="/dashboard/api-keys"
            className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
              API Integration
            </h3>
            <p className="text-sm text-gray-400 mt-1">Get API keys for programmatic access</p>
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <Link href="/dashboard/activity" className="text-sm text-pyrax-orange hover:underline">
              View all
            </Link>
          </div>

          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-600 mt-1">
              Your AI and ML jobs will appear here
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <Link
                href="/dashboard/crucible"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
              >
                <Play className="h-4 w-4" />
                Run Crucible Job
              </Link>
              <Link
                href="/dashboard/foundry"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors"
              >
                <Play className="h-4 w-4" />
                Start Training
              </Link>
            </div>
          </div>
        </div>

        {/* Getting Started Checklist */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-pyrax-orange/10 to-purple-500/10 border border-pyrax-orange/20">
          <h2 className="text-lg font-semibold text-white mb-4">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Connect Wallet</h3>
                <p className="text-sm text-gray-400">Wallet connected successfully</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-yellow-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-white">Add PYRX Credits</h3>
                <p className="text-sm text-gray-400">Deposit PYRX to pay for jobs</p>
                <Link
                  href="/dashboard/billing"
                  className="inline-flex items-center gap-1 text-pyrax-orange text-sm mt-1 hover:underline"
                >
                  Add credits <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-gray-400">3</span>
              </div>
              <div>
                <h3 className="font-medium text-white">Run Your First Job</h3>
                <p className="text-sm text-gray-400">Try AI inference or ML training</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-gray-400">4</span>
              </div>
              <div>
                <h3 className="font-medium text-white">Integrate via API</h3>
                <p className="text-sm text-gray-400">Programmatic access for apps</p>
                <Link
                  href="/dashboard/api-keys"
                  className="inline-flex items-center gap-1 text-pyrax-orange text-sm mt-1 hover:underline"
                >
                  Get API key <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Link
          href="/dashboard/crucible"
          className="group p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-600/10 border border-purple-500/20 hover:border-purple-500/40 transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                Crucible AI
              </h2>
              <p className="text-sm text-gray-400">AI Inference Platform</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-xs">Live</span>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            Run LLMs, generate images, create embeddings, and call AI directly from smart contracts.
            Powered by {networkStats.activeWorkers} distributed GPU workers.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{networkStats.jobsProcessing} jobs processing</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <span className="text-sm font-medium">Launch Crucible</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/foundry"
          className="group p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 hover:border-orange-500/40 transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Flame className="h-7 w-7 text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                Foundry ML
              </h2>
              <p className="text-sm text-gray-400">ML Training Platform</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-orange-500/20 text-orange-400 text-xs">Live</span>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            Train and fine-tune ML models on community GPUs.
            70% cheaper than cloud providers with Byzantine-resistant verification.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{networkStats.totalGPUs.toLocaleString()} GPUs available</span>
            </div>
            <div className="flex items-center gap-2 text-orange-400">
              <span className="text-sm font-medium">Launch Foundry</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
