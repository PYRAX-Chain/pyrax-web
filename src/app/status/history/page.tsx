"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Activity,
  Calendar,
  Filter,
  Loader2,
  AlertTriangle,
} from "lucide-react";

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

const incidentStatusConfig: Record<string, { color: string; bg: string; icon: any }> = {
  INVESTIGATING: { color: "text-red-400", bg: "bg-red-500/20", icon: AlertCircle },
  IDENTIFIED: { color: "text-orange-400", bg: "bg-orange-500/20", icon: AlertTriangle },
  MONITORING: { color: "text-blue-400", bg: "bg-blue-500/20", icon: Clock },
  RESOLVED: { color: "text-green-400", bg: "bg-green-500/20", icon: CheckCircle },
  SCHEDULED: { color: "text-purple-400", bg: "bg-purple-500/20", icon: Calendar },
};

function IncidentCard({ incident }: { incident: Incident }) {
  const [expanded, setExpanded] = useState(false);
  const statusStyle = incidentStatusConfig[incident.status] || incidentStatusConfig.INVESTIGATING;
  const StatusIcon = statusStyle.icon;

  const duration = incident.resolvedAt
    ? Math.round((new Date(incident.resolvedAt).getTime() - new Date(incident.impactStart).getTime()) / 60000)
    : null;

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-start justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-lg ${statusStyle.bg}`}>
            <StatusIcon className={`h-5 w-5 ${statusStyle.color}`} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
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
              {incident.service && (
                <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-gray-300">
                  {incident.service.name}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-white text-lg">{incident.title}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span>{new Date(incident.impactStart).toLocaleDateString()}</span>
              {duration !== null && (
                <span>Duration: {duration < 60 ? `${duration}m` : `${Math.round(duration / 60)}h ${duration % 60}m`}</span>
              )}
            </div>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400 ml-4 shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 ml-4 shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-white/10">
          <p className="text-gray-300 mt-4">{incident.description}</p>

          {incident.updates && incident.updates.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-4">Timeline</h4>
              <div className="space-y-4">
                {incident.updates.map((update, index) => {
                  const updateStyle = incidentStatusConfig[update.status] || incidentStatusConfig.INVESTIGATING;
                  return (
                    <div key={update.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${updateStyle.bg.replace("/20", "")}`} />
                        {index < incident.updates.length - 1 && (
                          <div className="w-0.5 h-full bg-white/10 my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-medium ${updateStyle.color}`}>
                            {update.status.replace("_", " ")}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(update.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{update.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Impact Started</span>
              <p className="text-white">{new Date(incident.impactStart).toLocaleString()}</p>
            </div>
            {incident.resolvedAt && (
              <div>
                <span className="text-gray-500">Resolved</span>
                <p className="text-white">{new Date(incident.resolvedAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function IncidentHistoryPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [total, setTotal] = useState(0);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/status/incidents?${params}`);
      if (res.ok) {
        const data = await res.json();
        setIncidents(data.incidents || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotal(data.pagination?.total || 0);
      }
    } catch (error) {
      console.error("Failed to fetch incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [page, statusFilter]);

  return (
    <div className="min-h-screen bg-pyrax-dark">
      {/* Header */}
      <div className="bg-gradient-to-b from-pyrax-orange/10 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/status" className="text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Link href="/status" className="text-gray-400 hover:text-white transition-colors text-sm">
              Back to Status
            </Link>
          </div>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-pyrax-orange" />
              <div>
                <h1 className="text-3xl font-bold text-white">Incident History</h1>
                <p className="text-gray-400 text-sm mt-1">
                  {total} total incidents recorded
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-pyrax-orange focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="RESOLVED">Resolved</option>
                <option value="INVESTIGATING">Investigating</option>
                <option value="IDENTIFIED">Identified</option>
                <option value="MONITORING">Monitoring</option>
                <option value="SCHEDULED">Scheduled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-pyrax-orange animate-spin" />
          </div>
        ) : incidents.length > 0 ? (
          <>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <span className="text-gray-400">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/5 rounded-xl p-12 text-center border border-white/10">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Incidents Found</h3>
            <p className="text-gray-400">
              {statusFilter
                ? `No incidents with status "${statusFilter}" found.`
                : "No incidents have been recorded yet. That's great news!"}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>
            Status page powered by PYRAX Network • 
            <Link href="/" className="text-pyrax-orange hover:text-pyrax-amber ml-1">pyrax.org</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
