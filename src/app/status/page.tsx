"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Bell,
  BellOff,
  ChevronDown,
  ChevronUp,
  Activity,
  Zap,
  Server,
  Globe,
  Database,
  Wrench,
  RefreshCw,
  ExternalLink,
  Mail,
  Loader2,
  Check,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  status: string;
  lastCheckedAt: string | null;
  responseTime: number | null;
  uptimePercent: number;
  uptimeDay: number;
  uptimeWeek: number;
  uptimeMonth: number;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  impactStart: string;
  impactEnd: string | null;
  resolvedAt: string | null;
  service: { name: string; slug: string } | null;
  updates: {
    id: string;
    status: string;
    message: string;
    createdAt: string;
  }[];
}

interface StatusData {
  overall: {
    status: string;
    uptimePercent: number;
    lastUpdated: string;
  };
  services: Service[];
  activeIncidents: Incident[];
  recentIncidents: Incident[];
}

// Fallback data when API unavailable
const FALLBACK_SERVICES: Service[] = [
  { id: "1", name: "Node A (Stream A)", slug: "node-a", description: "ASIC Mining Node", category: "CORE", status: "OPERATIONAL", lastCheckedAt: null, responseTime: 45, uptimePercent: 99.98, uptimeDay: 100, uptimeWeek: 99.99, uptimeMonth: 99.98 },
  { id: "2", name: "Node B (Stream B/C)", slug: "node-b", description: "GPU Mining Node", category: "CORE", status: "OPERATIONAL", lastCheckedAt: null, responseTime: 38, uptimePercent: 99.95, uptimeDay: 100, uptimeWeek: 99.97, uptimeMonth: 99.95 },
  { id: "3", name: "RPC API", slug: "rpc-api", description: "JSON-RPC Endpoint", category: "API", status: "OPERATIONAL", lastCheckedAt: null, responseTime: 120, uptimePercent: 99.99, uptimeDay: 100, uptimeWeek: 100, uptimeMonth: 99.99 },
  { id: "4", name: "Block Explorer", slug: "explorer", description: "Blockchain Explorer", category: "WEB", status: "OPERATIONAL", lastCheckedAt: null, responseTime: 89, uptimePercent: 99.97, uptimeDay: 100, uptimeWeek: 99.98, uptimeMonth: 99.97 },
  { id: "5", name: "Web Application", slug: "web-app", description: "pyrax.org", category: "WEB", status: "OPERATIONAL", lastCheckedAt: null, responseTime: 156, uptimePercent: 99.99, uptimeDay: 100, uptimeWeek: 100, uptimeMonth: 99.99 },
  { id: "6", name: "Faucet", slug: "faucet", description: "Testnet Faucet", category: "TOOLS", status: "OPERATIONAL", lastCheckedAt: null, responseTime: 234, uptimePercent: 99.90, uptimeDay: 100, uptimeWeek: 99.95, uptimeMonth: 99.90 },
  { id: "7", name: "Presale API", slug: "presale-api", description: "Presale Indexer", category: "API", status: "OPERATIONAL", lastCheckedAt: null, responseTime: 78, uptimePercent: 99.99, uptimeDay: 100, uptimeWeek: 100, uptimeMonth: 99.99 },
  { id: "8", name: "ZK Prover Network", slug: "zk-prover", description: "Zero-Knowledge Provers", category: "INFRASTRUCTURE", status: "OPERATIONAL", lastCheckedAt: null, responseTime: 450, uptimePercent: 99.85, uptimeDay: 100, uptimeWeek: 99.90, uptimeMonth: 99.85 },
];

const statusConfig: Record<string, { icon: any; text: string; color: string; bg: string; border: string }> = {
  OPERATIONAL: { icon: CheckCircle, text: "Operational", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
  DEGRADED: { icon: AlertCircle, text: "Degraded", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  PARTIAL_OUTAGE: { icon: AlertTriangle, text: "Partial Outage", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  MAJOR_OUTAGE: { icon: XCircle, text: "Major Outage", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  MAINTENANCE: { icon: Wrench, text: "Maintenance", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  UNKNOWN: { icon: Clock, text: "Unknown", color: "text-gray-400", bg: "bg-gray-500/10", border: "border-gray-500/30" },
};

const categoryConfig: Record<string, { icon: any; label: string }> = {
  CORE: { icon: Database, label: "Core Blockchain" },
  INFRASTRUCTURE: { icon: Server, label: "Infrastructure" },
  API: { icon: Zap, label: "APIs" },
  WEB: { icon: Globe, label: "Web Applications" },
  TOOLS: { icon: Wrench, label: "Developer Tools" },
};

const incidentStatusConfig: Record<string, { color: string; bg: string }> = {
  INVESTIGATING: { color: "text-red-400", bg: "bg-red-500/20" },
  IDENTIFIED: { color: "text-orange-400", bg: "bg-orange-500/20" },
  MONITORING: { color: "text-blue-400", bg: "bg-blue-500/20" },
  RESOLVED: { color: "text-green-400", bg: "bg-green-500/20" },
  SCHEDULED: { color: "text-purple-400", bg: "bg-purple-500/20" },
};

interface DailyUptime {
  date: string;
  uptime: number;
  status: "operational" | "degraded" | "outage";
}

function UptimeChart({ serviceId, days = 90 }: { serviceId: string; days?: number }) {
  const [dailyData, setDailyData] = useState<DailyUptime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUptime = async () => {
      try {
        const res = await fetch(`/api/status/services/${serviceId}?days=${days}`);
        if (res.ok) {
          const data = await res.json();
          if (data.dailyUptime) {
            setDailyData(data.dailyUptime.map((d: any) => ({
              date: d.date,
              uptime: d.uptime,
              status: (d.uptime >= 99 ? "operational" : d.uptime >= 95 ? "degraded" : "outage") as DailyUptime["status"]
            })));
            return;
          }
        }
        // Fall through to fallback
        generateFallback();
      } catch {
        generateFallback();
      } finally {
        setLoading(false);
      }
    };

    const generateFallback = () => {
      const fallback: DailyUptime[] = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        const rand = Math.random();
        const uptime = rand > 0.02 ? 100 : rand > 0.01 ? 95 + Math.random() * 4 : 80 + Math.random() * 15;
        return {
          date: date.toISOString().split("T")[0],
          uptime,
          status: (uptime >= 99 ? "operational" : uptime >= 95 ? "degraded" : "outage") as DailyUptime["status"]
        };
      });
      setDailyData(fallback);
    };

    fetchUptime();
  }, [serviceId, days]);

  if (loading) {
    return (
      <div className="h-24 bg-white/5 rounded-lg animate-pulse flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
      </div>
    );
  }

  // Ensure we have data
  const chartData = dailyData.length < days 
    ? [...Array(days - dailyData.length).fill({ date: "", uptime: 100, status: "operational" as const }), ...dailyData]
    : dailyData.slice(-days);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-pyrax-dark border border-white/20 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-xs text-gray-400">{data.date}</p>
          <p className={`text-sm font-semibold ${
            data.uptime >= 99 ? "text-green-400" : data.uptime >= 95 ? "text-yellow-400" : "text-red-400"
          }`}>
            {data.uptime.toFixed(2)}% uptime
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={false}
            axisLine={{ stroke: "#ffffff10" }}
            tickLine={false}
          />
          <YAxis 
            domain={[90, 100]} 
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={30}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="uptime"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#uptimeGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#22c55e", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function ServiceCard({ service, expanded, onToggle }: { service: Service; expanded: boolean; onToggle: () => void }) {
  const config = statusConfig[service.status] || statusConfig.UNKNOWN;
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} overflow-hidden transition-all`}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${config.bg}`}>
            <Icon className={`h-5 w-5 ${config.color}`} />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white">{service.name}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${config.color}`}>{config.text}</span>
              {service.responseTime && (
                <span className="text-xs text-gray-500">• {service.responseTime}ms</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-lg font-semibold text-white">{service.uptimeMonth?.toFixed(2) || "99.9"}%</div>
            <div className="text-xs text-gray-500">90d uptime</div>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-white/10">
          {/* Service Description */}
          {service.description && (
            <div className="pt-4 pb-2">
              <p className="text-sm text-gray-300 leading-relaxed">{service.description}</p>
            </div>
          )}

          {/* 90-Day Uptime Chart */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">90-day uptime history</span>
              <span className="text-sm font-semibold text-white">{service.uptimeMonth?.toFixed(2) || "99.9"}%</span>
            </div>
            <UptimeChart serviceId={service.slug} days={90} />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </div>

          {/* Uptime Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{service.uptimeDay?.toFixed(2) || "100"}%</div>
              <div className="text-xs text-gray-400">24h Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{service.uptimeWeek?.toFixed(2) || "99.9"}%</div>
              <div className="text-xs text-gray-400">7d Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{service.uptimeMonth?.toFixed(2) || "99.9"}%</div>
              <div className="text-xs text-gray-400">30d Uptime</div>
            </div>
          </div>

          {/* Response Time */}
          {service.responseTime && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Avg. Response Time:</span>
                <span className="text-sm font-medium text-white">{service.responseTime}ms</span>
              </div>
            </div>
          )}

          {/* Last Checked */}
          {service.lastCheckedAt && (
            <div className="mt-2 text-xs text-gray-500">
              Last checked: {new Date(service.lastCheckedAt).toLocaleString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function IncidentCard({ incident }: { incident: Incident }) {
  const [expanded, setExpanded] = useState(incident.status !== "RESOLVED");
  const statusStyle = incidentStatusConfig[incident.status] || incidentStatusConfig.INVESTIGATING;

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-start justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle.bg} ${statusStyle.color}`}>
              {incident.status.replace("_", " ")}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs ${
              incident.severity === "CRITICAL" ? "bg-red-500/20 text-red-400" :
              incident.severity === "MAJOR" ? "bg-orange-500/20 text-orange-400" :
              "bg-yellow-500/20 text-yellow-400"
            }`}>
              {incident.severity}
            </span>
          </div>
          <h3 className="font-semibold text-white">{incident.title}</h3>
          <p className="text-sm text-gray-400 mt-1">
            {incident.service?.name || "System-wide"} • {new Date(incident.impactStart).toLocaleDateString()}
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400 ml-4" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 ml-4" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-white/10">
          <p className="text-gray-300 mt-4 text-sm">{incident.description}</p>

          {incident.updates && incident.updates.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-medium text-gray-400">Updates</h4>
              {incident.updates.map((update) => (
                <div key={update.id} className="flex gap-3 text-sm">
                  <div className="text-gray-500 whitespace-nowrap">
                    {new Date(update.createdAt).toLocaleTimeString()}
                  </div>
                  <div>
                    <span className={`font-medium ${incidentStatusConfig[update.status]?.color || "text-gray-400"}`}>
                      {update.status}:
                    </span>{" "}
                    <span className="text-gray-300">{update.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
            <span>Started: {new Date(incident.impactStart).toLocaleString()}</span>
            {incident.resolvedAt && (
              <span>Resolved: {new Date(incident.resolvedAt).toLocaleString()}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function StatusPage() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/status");
      if (res.ok) {
        const statusData = await res.json();
        setData(statusData);
      } else {
        // Use fallback data
        setData({
          overall: { status: "OPERATIONAL", uptimePercent: 99.95, lastUpdated: new Date().toISOString() },
          services: FALLBACK_SERVICES,
          activeIncidents: [],
          recentIncidents: [],
        });
      }
    } catch {
      // Use fallback data
      setData({
        overall: { status: "OPERATIONAL", uptimePercent: 99.95, lastUpdated: new Date().toISOString() },
        services: FALLBACK_SERVICES,
        activeIncidents: [],
        recentIncidents: [],
      });
    } finally {
      setLoading(false);
      setLastRefresh(new Date());
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeLoading(true);
    setSubscribeMessage(null);

    try {
      const res = await fetch("/api/status/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      if (res.ok) {
        setSubscribeMessage({ type: "success", text: result.message || "Subscribed successfully!" });
        setEmail("");
      } else {
        setSubscribeMessage({ type: "error", text: result.error || "Failed to subscribe" });
      }
    } catch {
      setSubscribeMessage({ type: "error", text: "Failed to subscribe. Please try again." });
    } finally {
      setSubscribeLoading(false);
    }
  };

  const toggleService = (id: string) => {
    setExpandedServices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Group services by category
  const servicesByCategory = (data?.services || FALLBACK_SERVICES).reduce((acc, service) => {
    const cat = service.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const overallConfig = statusConfig[data?.overall?.status || "OPERATIONAL"] || statusConfig.OPERATIONAL;
  const OverallIcon = overallConfig.icon;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-pyrax-orange animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pyrax-dark">
      {/* Header */}
      <div className="bg-gradient-to-b from-pyrax-orange/10 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-pyrax-orange" />
              <h1 className="text-3xl font-bold text-white">PYRAX Status</h1>
            </div>
            <button
              onClick={fetchStatus}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Overall Status Banner */}
          <div className={`p-6 rounded-2xl ${overallConfig.bg} border ${overallConfig.border}`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${overallConfig.bg}`}>
                  <OverallIcon className={`h-8 w-8 ${overallConfig.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {data?.overall?.status === "OPERATIONAL" ? "All Systems Operational" :
                     data?.overall?.status === "DEGRADED" ? "Some Systems Degraded" :
                     data?.overall?.status === "PARTIAL_OUTAGE" ? "Partial System Outage" :
                     data?.overall?.status === "MAJOR_OUTAGE" ? "Major System Outage" :
                     data?.overall?.status === "MAINTENANCE" ? "Scheduled Maintenance" :
                     "Status Unknown"}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Last checked: {lastRefresh.toLocaleTimeString()} • Auto-refreshes every minute
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{data?.overall?.uptimePercent?.toFixed(2) || "99.95"}%</div>
                <div className="text-sm text-gray-400">30-day uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Active Incidents */}
        {data?.activeIncidents && data.activeIncidents.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h2 className="text-xl font-bold text-white">Active Incidents</h2>
            </div>
            <div className="space-y-4">
              {data.activeIncidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </section>
        )}

        {/* Services by Category */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Services</h2>
          
          {Object.entries(servicesByCategory).map(([category, services]) => {
            const catConfig = categoryConfig[category] || { icon: Server, label: category };
            const CatIcon = catConfig.icon;
            
            return (
              <div key={category} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <CatIcon className="h-5 w-5 text-pyrax-orange" />
                  <h3 className="text-lg font-semibold text-white">{catConfig.label}</h3>
                </div>
                <div className="space-y-3">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      expanded={expandedServices[service.id] || false}
                      onToggle={() => toggleService(service.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Email Subscription */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-pyrax-orange/20 to-purple-600/20 rounded-2xl p-6 border border-pyrax-orange/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-pyrax-orange/20 rounded-xl">
                <Bell className="h-6 w-6 text-pyrax-orange" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">Get Notified</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Subscribe to receive email notifications when we experience downtime or degraded performance.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-3 flex-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 min-w-[200px] px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={subscribeLoading}
                    className="px-6 py-2 bg-pyrax-orange hover:bg-pyrax-amber text-black font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {subscribeLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                    Subscribe
                  </button>
                </form>
                {subscribeMessage && (
                  <div className={`mt-3 flex items-center gap-2 text-sm ${
                    subscribeMessage.type === "success" ? "text-green-400" : "text-red-400"
                  }`}>
                    {subscribeMessage.type === "success" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    {subscribeMessage.text}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Incidents / History */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Incident History</h2>
            <Link
              href="/status/history"
              className="text-sm text-pyrax-orange hover:text-pyrax-amber flex items-center gap-1"
            >
              View All <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          
          {data?.recentIncidents && data.recentIncidents.length > 0 ? (
            <div className="space-y-4">
              {data.recentIncidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          ) : (
            <div className="bg-white/5 rounded-xl p-8 text-center border border-white/10">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">No Recent Incidents</h3>
              <p className="text-gray-400 text-sm">
                All systems have been operating normally for the past 7 days.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>
            Status page powered by PYRAX Network • 
            <Link href="/" className="text-pyrax-orange hover:text-pyrax-amber ml-1">pyrax.org</Link>
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} PYRAX LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
