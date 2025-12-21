"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  RefreshCw,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  totalRaised: number;
  conversionRate: number;
  avgSessionDuration: string;
  topPages: { path: string; views: number }[];
  dailyStats: { date: string; visits: number; conversions: number }[];
  trafficSources: { source: string; visits: number; percentage: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?range=${timeRange}`);
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 text-pyrax-orange animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Website traffic and presale performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button onClick={fetchAnalytics} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white transition-colors">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-blue-500/20"><Users className="h-5 w-5 text-blue-400" /></div>
            <span className="flex items-center text-xs text-green-400"><ArrowUp className="h-3 w-3" /> 12%</span>
          </div>
          <div className="text-2xl font-bold text-white">{data?.totalVisits?.toLocaleString() || 0}</div>
          <div className="text-sm text-gray-400">Total Visits</div>
        </div>
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-purple-500/20"><Users className="h-5 w-5 text-purple-400" /></div>
            <span className="flex items-center text-xs text-green-400"><ArrowUp className="h-3 w-3" /> 8%</span>
          </div>
          <div className="text-2xl font-bold text-white">{data?.uniqueVisitors?.toLocaleString() || 0}</div>
          <div className="text-sm text-gray-400">Unique Visitors</div>
        </div>
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-green-500/20"><DollarSign className="h-5 w-5 text-green-400" /></div>
            <span className="flex items-center text-xs text-green-400"><ArrowUp className="h-3 w-3" /> 24%</span>
          </div>
          <div className="text-2xl font-bold text-white">${data?.totalRaised?.toLocaleString() || 0}</div>
          <div className="text-sm text-gray-400">Total Raised</div>
        </div>
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-pyrax-orange/20"><TrendingUp className="h-5 w-5 text-pyrax-orange" /></div>
            <span className="flex items-center text-xs text-red-400"><ArrowDown className="h-3 w-3" /> 2%</span>
          </div>
          <div className="text-2xl font-bold text-white">{data?.conversionRate?.toFixed(1) || 0}%</div>
          <div className="text-sm text-gray-400">Conversion Rate</div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Daily Traffic</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <BarChart3 className="h-12 w-12 opacity-50" />
            <span className="ml-3">Chart visualization coming soon</span>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            {(data?.trafficSources || [
              { source: "Direct", visits: 1250, percentage: 45 },
              { source: "Twitter/X", visits: 820, percentage: 30 },
              { source: "Discord", visits: 410, percentage: 15 },
              { source: "Other", visits: 270, percentage: 10 },
            ]).map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-24 text-sm text-gray-400">{s.source}</div>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-pyrax-orange rounded-full" style={{ width: `${s.percentage}%` }} />
                </div>
                <div className="w-16 text-right text-sm text-white">{s.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
        <div className="space-y-2">
          {(data?.topPages || [
            { path: "/", views: 5420 },
            { path: "/presale", views: 3180 },
            { path: "/roadmap", views: 1540 },
            { path: "/downloads", views: 980 },
            { path: "/docs", views: 720 },
          ]).map((p, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <code className="text-sm text-gray-400">{p.path}</code>
              <span className="text-sm font-medium text-white">{p.views.toLocaleString()} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
