"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Plus,
  RefreshCw,
  Send,
  Server,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  slug: string;
  status: string;
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
  postmortem: string | null;
  service: { name: string; slug: string } | null;
  updates: {
    id: string;
    status: string;
    message: string;
    authorName: string | null;
    createdAt: string;
  }[];
}

const severityOptions = [
  { value: "MINOR", label: "Minor", color: "bg-yellow-500" },
  { value: "MAJOR", label: "Major", color: "bg-orange-500" },
  { value: "CRITICAL", label: "Critical", color: "bg-red-500" },
];

const statusOptions = [
  { value: "INVESTIGATING", label: "Investigating", color: "text-red-400" },
  { value: "IDENTIFIED", label: "Identified", color: "text-orange-400" },
  { value: "MONITORING", label: "Monitoring", color: "text-blue-400" },
  { value: "RESOLVED", label: "Resolved", color: "text-green-400" },
];

export default function AdminStatusPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  // Create incident form
  const [newIncident, setNewIncident] = useState({
    serviceId: "",
    title: "",
    description: "",
    severity: "MINOR",
    updateServiceStatus: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/status/incidents");
      if (res.ok) {
        const data = await res.json();
        setIncidents(data.incidents || []);
        setServices(data.services || []);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/status/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIncident),
      });

      if (res.ok) {
        setShowCreateForm(false);
        setNewIncident({ serviceId: "", title: "", description: "", severity: "MINOR", updateServiceStatus: true });
        fetchData();
      } else {
        const data = await res.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to create incident");
    }
  };

  const handleUpdateIncident = async (incidentId: string, status?: string) => {
    if (!updateMessage && !status) return;

    try {
      const res = await fetch("/api/admin/status/incidents", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incidentId,
          status: status || updateStatus || undefined,
          updateMessage: updateMessage || undefined,
        }),
      });

      if (res.ok) {
        setUpdateMessage("");
        setUpdateStatus("");
        fetchData();
      } else {
        const data = await res.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to update incident");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pyrax-dark">
        <Loader2 className="h-12 w-12 text-pyrax-orange animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pyrax-dark p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-pyrax-orange" />
            <div>
              <h1 className="text-2xl font-bold text-white">Status Management</h1>
              <p className="text-gray-400 text-sm">Manage services, incidents, and notifications</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/status"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 text-sm"
            >
              View Public Status
            </Link>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Services Overview */}
        {services.length > 0 && (
          <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <Server className="h-6 w-6 text-blue-400" />
              <div>
                <h2 className="font-semibold text-white">Monitored Services</h2>
                <p className="text-sm text-gray-400">{services.length} services being monitored</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {services.map((svc) => (
                <span
                  key={svc.slug}
                  className={`text-xs px-2 py-1 rounded ${
                    svc.status === "OPERATIONAL" ? "bg-green-500/20 text-green-400" :
                    svc.status === "DEGRADED" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}
                >
                  {svc.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Create Incident Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Incidents</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-pyrax-orange hover:bg-pyrax-amber text-black font-semibold rounded-lg flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Incident
          </button>
        </div>

        {/* Create Incident Form */}
        {showCreateForm && (
          <form onSubmit={handleCreateIncident} className="bg-white/5 rounded-xl p-6 mb-6 border border-pyrax-orange/30">
            <h3 className="text-lg font-semibold text-white mb-4">Create New Incident</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Affected Service</label>
                <select
                  value={newIncident.serviceId}
                  onChange={(e) => setNewIncident({ ...newIncident, serviceId: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                >
                  <option value="">System-wide</option>
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.id}>{svc.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Severity</label>
                <select
                  value={newIncident.severity}
                  onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                >
                  {severityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input
                type="text"
                value={newIncident.title}
                onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                placeholder="Brief description of the issue"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                value={newIncident.description}
                onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                placeholder="Detailed description of what's happening..."
                rows={3}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input
                  type="checkbox"
                  checked={newIncident.updateServiceStatus}
                  onChange={(e) => setNewIncident({ ...newIncident, updateServiceStatus: e.target.checked })}
                  className="rounded"
                />
                Update service status automatically
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Create Incident
              </button>
            </div>
          </form>
        )}

        {/* Incidents List */}
        <div className="space-y-4">
          {incidents.length === 0 ? (
            <div className="bg-white/5 rounded-xl p-8 text-center border border-white/10">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white">No Active Incidents</h3>
              <p className="text-gray-400 text-sm">All systems are operating normally</p>
            </div>
          ) : (
            incidents.map((incident) => (
              <div
                key={incident.id}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                  className="w-full p-4 flex items-start justify-between hover:bg-white/5"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      incident.status === "RESOLVED" ? "bg-green-500/20" :
                      incident.status === "MONITORING" ? "bg-blue-500/20" :
                      incident.status === "IDENTIFIED" ? "bg-orange-500/20" :
                      "bg-red-500/20"
                    }`}>
                      {incident.status === "RESOLVED" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertTriangle className={`h-5 w-5 ${
                          incident.status === "MONITORING" ? "text-blue-400" :
                          incident.status === "IDENTIFIED" ? "text-orange-400" :
                          "text-red-400"
                        }`} />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          incident.severity === "CRITICAL" ? "bg-red-500/20 text-red-400" :
                          incident.severity === "MAJOR" ? "bg-orange-500/20 text-orange-400" :
                          "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {incident.severity}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          incident.status === "RESOLVED" ? "bg-green-500/20 text-green-400" :
                          incident.status === "MONITORING" ? "bg-blue-500/20 text-blue-400" :
                          incident.status === "IDENTIFIED" ? "bg-orange-500/20 text-orange-400" :
                          "bg-red-500/20 text-red-400"
                        }`}>
                          {incident.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white">{incident.title}</h3>
                      <p className="text-sm text-gray-400">
                        {incident.service?.name || "System-wide"} • {new Date(incident.impactStart).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {expandedIncident === incident.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {expandedIncident === incident.id && (
                  <div className="p-4 border-t border-white/10">
                    <p className="text-gray-300 mb-4">{incident.description}</p>

                    {/* Updates Timeline */}
                    {incident.updates.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-3">Updates</h4>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {incident.updates.map((update) => (
                            <div key={update.id} className="flex gap-3 text-sm">
                              <div className="text-gray-500 whitespace-nowrap text-xs">
                                {new Date(update.createdAt).toLocaleString()}
                              </div>
                              <div>
                                <span className={`font-medium ${
                                  update.status === "RESOLVED" ? "text-green-400" :
                                  update.status === "MONITORING" ? "text-blue-400" :
                                  update.status === "IDENTIFIED" ? "text-orange-400" :
                                  "text-red-400"
                                }`}>
                                  {update.status}
                                </span>
                                <span className="text-gray-500"> by {update.authorName}</span>
                                <p className="text-gray-300 mt-1">{update.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add Update Form */}
                    {incident.status !== "RESOLVED" && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-white mb-3">Post Update</h4>
                        <div className="flex gap-3 mb-3">
                          <select
                            value={updateStatus}
                            onChange={(e) => setUpdateStatus(e.target.value)}
                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                          >
                            <option value="">Keep Status</option>
                            {statusOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <textarea
                          value={updateMessage}
                          onChange={(e) => setUpdateMessage(e.target.value)}
                          placeholder="Update message..."
                          rows={2}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm mb-3"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateIncident(incident.id)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-2"
                          >
                            <Send className="h-4 w-4" />
                            Post Update
                          </button>
                          <button
                            onClick={() => handleUpdateIncident(incident.id, "RESOLVED")}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Resolve
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
