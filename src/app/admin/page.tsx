"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Coins,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface DashboardStats {
  totalRaisedUsd: number;
  totalContributors: number;
  totalPYRAXSold: number;
  currentPhase: number;
  phaseProgress: number;
  recentContributions: Contribution[];
  dailyStats: DailyStat[];
}

interface Contribution {
  id: string;
  walletAddress: string;
  totalUsd: number;
  PYRAXAmount: number;
  xfAmount: number;
  status: string;
  createdAt: string;
}

interface DailyStat {
  date: string;
  totalRaisedUsd: number;
  contributionsCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/dashboard/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pyrax-orange"></div>
      </div>
    );
  }

  // Mock data for demo
  const mockStats: DashboardStats = {
    totalRaisedUsd: 0,
    totalContributors: 0,
    totalPYRAXSold: 0,
    currentPhase: 0,
    phaseProgress: 0,
    recentContributions: [],
    dailyStats: [],
  };

  const data = stats || mockStats;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Presale overview and analytics</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
          <span className="text-sm text-yellow-400">Presale Not Active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          label="Total Raised"
          value={`$${data.totalRaisedUsd.toLocaleString()}`}
          change="+0%"
          positive={true}
        />
        <StatCard
          icon={Users}
          label="Contributors"
          value={data.totalContributors.toLocaleString()}
          change="+0"
          positive={true}
        />
        <StatCard
          icon={Coins}
          label="PYRAX Sold"
          value={formatTokens(data.totalPYRAXSold)}
          change="+0%"
          positive={true}
        />
      </div>

      {/* Phase Progress */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Phase Progress</h2>
          <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-sm">
            Phase {data.currentPhase + 1} of 4
          </span>
        </div>
        <div className="space-y-4">
          {[0, 1, 2, 3].map((phase) => (
            <div key={phase} className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-400">
                Phase {phase + 1}
              </div>
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    phase < data.currentPhase
                      ? "bg-green-500"
                      : phase === data.currentPhase
                      ? "bg-pyrax-orange"
                      : "bg-gray-600"
                  }`}
                  style={{
                    width:
                      phase < data.currentPhase
                        ? "100%"
                        : phase === data.currentPhase
                        ? `${data.phaseProgress}%`
                        : "0%",
                  }}
                />
              </div>
              <div className="w-16 text-right text-sm text-gray-400">
                {phase < data.currentPhase
                  ? "100%"
                  : phase === data.currentPhase
                  ? `${data.phaseProgress}%`
                  : "0%"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Contributions */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Contributions
          </h2>
          {data.recentContributions.length > 0 ? (
            <div className="space-y-3">
              {data.recentContributions.map((contribution) => (
                <div
                  key={contribution.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pyrax-orange/20 flex items-center justify-center">
                      <Coins className="h-5 w-5 text-pyrax-orange" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-mono">
                        {contribution.walletAddress.slice(0, 6)}...
                        {contribution.walletAddress.slice(-4)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(contribution.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white">
                      ${contribution.totalUsd.toLocaleString()}
                    </div>
                    <div className="text-xs text-pyrax-orange">
                      {formatTokens(contribution.PYRAXAmount)} PYRAX
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No contributions yet</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ActionButton
              href="/admin/phases"
              icon={CheckCircle}
              label="Activate Phase"
              description="Start next presale phase"
            />
            <ActionButton
              href="/admin/treasury"
              icon={DollarSign}
              label="View Treasury"
              description="Check balances"
            />
            <ActionButton
              href="/admin/contributors"
              icon={Users}
              label="Export Data"
              description="Download contributor list"
            />
            <ActionButton
              href="/admin/analytics"
              icon={TrendingUp}
              label="Analytics"
              description="View detailed reports"
            />
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
  change,
  positive,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-pyrax-orange/10">
          <Icon className="h-5 w-5 text-pyrax-orange" />
        </div>
        <div
          className={`flex items-center gap-1 text-sm ${
            positive ? "text-green-400" : "text-red-400"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function ActionButton({
  href,
  icon: Icon,
  label,
  description,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
    >
      <Icon className="h-6 w-6 text-pyrax-orange mb-2" />
      <div className="text-sm font-semibold text-white">{label}</div>
      <div className="text-xs text-gray-400">{description}</div>
    </a>
  );
}

function formatTokens(amount: number): string {
  if (amount >= 1e9) return `${(amount / 1e9).toFixed(2)}B`;
  if (amount >= 1e6) return `${(amount / 1e6).toFixed(2)}M`;
  if (amount >= 1e3) return `${(amount / 1e3).toFixed(2)}K`;
  return amount.toLocaleString();
}
