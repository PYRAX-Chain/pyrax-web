"use client";

import { useState, useEffect } from "react";
import {
  Network,
  Rocket,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Mail,
  Calendar,
  Globe,
  Zap,
  Settings,
  RefreshCw,
} from "lucide-react";
import { 
  TestnetConfig, 
  TestnetNetwork, 
  getNetworkStatusColor, 
  getNetworkStatusBgColor,
  getDaysUntilLaunch,
} from "@/lib/testnet-config";

export default function TestnetNetworksPage() {
  const [config, setConfig] = useState<TestnetConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [graduateModal, setGraduateModal] = useState<{ current: TestnetNetwork; next: TestnetNetwork } | null>(null);
  const [launchDate, setLaunchDate] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/admin/testnet/config");
      const data = await res.json();
      setConfig(data);
    } catch (error) {
      console.error("Failed to fetch config:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGraduate = async () => {
    if (!graduateModal || !launchDate) return;
    
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/testnet/graduate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentNetworkId: graduateModal.current.id,
          nextNetworkId: graduateModal.next.id,
          launchDate: new Date(launchDate).toISOString(),
          sendNotification: sendEmail,
        }),
      });

      if (res.ok) {
        await fetchConfig();
        setGraduateModal(null);
        setLaunchDate("");
      }
    } catch (error) {
      console.error("Failed to graduate network:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleActivateNetwork = async (networkId: string) => {
    setActionLoading(true);
    try {
      // Update the upcoming network to active
      await fetch("/api/admin/testnet/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          networkId,
          updates: { status: "active" },
        }),
      });

      // Update current network reference
      await fetch("/api/admin/testnet/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentNetwork: networkId }),
      });

      await fetchConfig();
    } catch (error) {
      console.error("Failed to activate network:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 text-pyrax-orange animate-spin" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-center py-12 text-gray-400">
        Failed to load testnet configuration
      </div>
    );
  }

  const activeNetwork = config.networks.find((n) => n.status === "active");
  const upcomingNetwork = config.networks.find((n) => n.status === "upcoming");
  const nextPlannedIndex = config.networks.findIndex((n) => n.status === "planned");
  const nextPlanned = nextPlannedIndex >= 0 ? config.networks[nextPlannedIndex] : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Network Management</h1>
          <p className="text-gray-400">Manage testnet phases and network upgrades</p>
        </div>
        <button
          onClick={fetchConfig}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Current Status */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Active Network */}
        <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Zap className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <div className="text-sm text-green-400">Active Network</div>
              <div className="text-xl font-bold text-white">{activeNetwork?.name || "None"}</div>
            </div>
          </div>
          {activeNetwork && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">RPC</span>
                <code className="text-green-400">{activeNetwork.rpcUrl}</code>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Chain ID</span>
                <span className="text-white">{activeNetwork.chainId}</span>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Network */}
        <div className={`p-6 rounded-xl ${upcomingNetwork ? "bg-pyrax-orange/10 border border-pyrax-orange/20" : "bg-white/5 border border-white/10"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${upcomingNetwork ? "bg-pyrax-orange/20" : "bg-white/10"}`}>
              <Rocket className={`h-5 w-5 ${upcomingNetwork ? "text-pyrax-orange" : "text-gray-400"}`} />
            </div>
            <div>
              <div className={`text-sm ${upcomingNetwork ? "text-pyrax-orange" : "text-gray-400"}`}>
                {upcomingNetwork ? "Upcoming Upgrade" : "Next Planned"}
              </div>
              <div className="text-xl font-bold text-white">
                {upcomingNetwork?.name || nextPlanned?.name || "None"}
              </div>
            </div>
          </div>
          {upcomingNetwork && upcomingNetwork.launchDate && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Launch Date</span>
                <span className="text-pyrax-orange">
                  {new Date(upcomingNetwork.launchDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Days Until Launch</span>
                <span className="text-white font-bold">
                  {getDaysUntilLaunch(upcomingNetwork)} days
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Network Timeline with Toggle Switches */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-6">Network Phases</h2>
        
        <div className="space-y-4">
          {config.networks.map((network, index) => {
            const isActive = network.status === "active";
            const isUpcoming = network.status === "upcoming";
            const isGraduated = network.status === "graduated";
            const canGraduate = isActive && nextPlanned && nextPlanned.id === config.networks[index + 1]?.id;
            const canActivate = isUpcoming;
            const daysUntil = network.launchDate ? getDaysUntilLaunch(network) : null;

            return (
              <div
                key={network.id}
                className={`p-4 rounded-xl border ${
                  isActive ? "bg-green-500/10 border-green-500/30" :
                  isUpcoming ? "bg-pyrax-orange/10 border-pyrax-orange/30" :
                  isGraduated ? "bg-blue-500/10 border-blue-500/30" :
                  "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Phase Number */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      isActive ? "bg-green-500 text-white" :
                      isUpcoming ? "bg-pyrax-orange text-white" :
                      isGraduated ? "bg-blue-500 text-white" :
                      "bg-white/10 text-gray-400"
                    }`}>
                      {index + 1}
                    </div>

                    {/* Network Info */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{network.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getNetworkStatusBgColor(network.status)} ${getNetworkStatusColor(network.status)}`}>
                          {network.status}
                        </span>
                        {isUpcoming && daysUntil !== null && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-pyrax-orange/20 text-pyrax-orange">
                            {daysUntil} days
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{network.codename}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {/* Graduate Toggle */}
                    {canGraduate && (
                      <button
                        onClick={() => setGraduateModal({ current: network, next: config.networks[index + 1] })}
                        disabled={actionLoading}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white transition-colors disabled:opacity-50"
                      >
                        <ArrowRight className="h-4 w-4" />
                        Graduate to {config.networks[index + 1]?.name}
                      </button>
                    )}

                    {/* Activate Toggle */}
                    {canActivate && (
                      <button
                        onClick={() => handleActivateNetwork(network.id)}
                        disabled={actionLoading || (daysUntil !== null && daysUntil > 0)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors disabled:opacity-50"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Activate Now
                      </button>
                    )}

                    {/* RPC Info */}
                    {(isActive || isUpcoming) && (
                      <div className="text-right text-xs">
                        <div className="text-gray-500">RPC</div>
                        <code className="text-gray-400">{network.rpcUrl}</code>
                      </div>
                    )}
                  </div>
                </div>

                {/* Milestones Progress */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-400">Milestones:</span>
                    <div className="flex gap-1">
                      {network.milestones.map((m, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${m.done ? "bg-green-500" : "bg-gray-600"}`}
                          title={m.text}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500">
                      {network.milestones.filter((m) => m.done).length}/{network.milestones.length} complete
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Graduate Modal */}
      {graduateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-lg p-6 rounded-xl bg-pyrax-gray border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Schedule Network Upgrade</h2>
            
            <div className="p-4 rounded-lg bg-pyrax-orange/10 border border-pyrax-orange/20 mb-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Current</div>
                  <div className="font-bold text-white">{graduateModal.current.name}</div>
                </div>
                <ArrowRight className="h-6 w-6 text-pyrax-orange" />
                <div className="text-center">
                  <div className="text-sm text-gray-400">Next</div>
                  <div className="font-bold text-pyrax-orange">{graduateModal.next.name}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Launch Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={launchDate}
                  onChange={(e) => setLaunchDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Banner will appear 7 days before this date
                </p>
              </div>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="w-4 h-4 rounded accent-pyrax-orange"
                />
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-white">Send email notification to mailing list</span>
                </div>
              </label>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <strong className="text-yellow-400">This action will:</strong>
                  <ul className="mt-1 ml-4 list-disc">
                    <li>Mark {graduateModal.current.name} as "graduated"</li>
                    <li>Set {graduateModal.next.name} to "upcoming"</li>
                    <li>Show upgrade banner across the website</li>
                    {sendEmail && <li>Send email to all mailing list subscribers</li>}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setGraduateModal(null)}
                className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGraduate}
                disabled={actionLoading || !launchDate}
                className="flex-1 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white transition-colors disabled:opacity-50"
              >
                {actionLoading ? "Processing..." : "Schedule Upgrade"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
