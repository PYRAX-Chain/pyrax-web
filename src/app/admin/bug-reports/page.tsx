"use client";

import { useState, useEffect } from "react";
import {
  Bug,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronDown,
  Send,
  User,
  Shield,
} from "lucide-react";

interface BugReport {
  id: string;
  ticketNumber: string;
  source: string;
  sourceVersion: string | null;
  reporterEmail: string | null;
  reporterName: string | null;
  title: string;
  description: string;
  logs: string | null;
  status: string;
  priority: string;
  createdAt: string;
  messages: TicketMessage[];
}

interface TicketMessage {
  id: string;
  sender: string;
  senderName: string | null;
  message: string;
  createdAt: string;
}

const statusColors: Record<string, { bg: string; text: string; icon: any }> = {
  OPEN: { bg: "bg-blue-500/20", text: "text-blue-400", icon: AlertCircle },
  IN_PROGRESS: { bg: "bg-yellow-500/20", text: "text-yellow-400", icon: Clock },
  WAITING_FOR_USER: { bg: "bg-purple-500/20", text: "text-purple-400", icon: MessageSquare },
  RESOLVED: { bg: "bg-green-500/20", text: "text-green-400", icon: CheckCircle },
  CLOSED: { bg: "bg-gray-500/20", text: "text-gray-400", icon: XCircle },
};

const priorityColors: Record<string, string> = {
  LOW: "text-gray-400",
  MEDIUM: "text-yellow-400",
  HIGH: "text-orange-400",
  CRITICAL: "text-red-400",
};

export default function BugReportsPage() {
  const [reports, setReports] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<BugReport | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    fetchReports();
  }, [statusFilter]);

  const fetchReports = async () => {
    try {
      const url = statusFilter 
        ? `/api/admin/bug-reports?status=${statusFilter}` 
        : "/api/admin/bug-reports";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports);
      }
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (ticketId: string, status: string, priority?: string) => {
    try {
      const res = await fetch("/api/admin/bug-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId, action: "update-status", status, priority }),
      });
      if (res.ok) {
        fetchReports();
        if (selectedReport?.id === ticketId) {
          setSelectedReport({ ...selectedReport, status, priority: priority || selectedReport.priority });
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const sendMessage = async () => {
    if (!selectedReport || !newMessage.trim()) return;
    try {
      const res = await fetch("/api/admin/bug-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: selectedReport.id, action: "add-message", message: newMessage }),
      });
      if (res.ok) {
        setNewMessage("");
        fetchReports();
        // Refresh selected report
        const updated = await res.json();
        setSelectedReport({
          ...selectedReport,
          messages: [...selectedReport.messages, updated.message],
          status: "WAITING_FOR_USER",
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pyrax-orange"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bug Reports</h1>
          <p className="text-gray-400">Manage support tickets from Network Hub users</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
        >
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="WAITING_FOR_USER">Waiting for User</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Ticket List */}
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="p-12 rounded-xl bg-white/5 border border-white/10 text-center">
              <Bug className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No bug reports yet</p>
            </div>
          ) : (
            reports.map((report) => {
              const statusConfig = statusColors[report.status] || statusColors.OPEN;
              const StatusIcon = statusConfig.icon;
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`p-4 rounded-xl bg-white/5 border cursor-pointer transition-all ${
                    selectedReport?.id === report.id
                      ? "border-pyrax-orange"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-pyrax-orange">{report.ticketNumber}</span>
                      <span className={`text-xs ${priorityColors[report.priority]}`}>{report.priority}</span>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig.bg}`}>
                      <StatusIcon className={`h-3 w-3 ${statusConfig.text}`} />
                      <span className={`text-xs ${statusConfig.text}`}>{report.status.replace(/_/g, " ")}</span>
                    </div>
                  </div>
                  <h3 className="text-white font-medium mb-1">{report.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{report.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>{report.source} {report.sourceVersion}</span>
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                    {report.messages.length > 0 && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {report.messages.length}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Ticket Detail */}
        {selectedReport ? (
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-sm font-mono text-pyrax-orange">{selectedReport.ticketNumber}</span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedReport.title}</h2>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedReport.status}
                  onChange={(e) => updateStatus(selectedReport.id, e.target.value)}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
                >
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="WAITING_FOR_USER">Waiting for User</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <select
                  value={selectedReport.priority}
                  onChange={(e) => updateStatus(selectedReport.id, selectedReport.status, e.target.value)}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Source:</span>
                <span className="text-white ml-2">{selectedReport.source} {selectedReport.sourceVersion}</span>
              </div>
              <div>
                <span className="text-gray-500">Reporter:</span>
                <span className="text-white ml-2">
                  {selectedReport.reporterName || selectedReport.reporterEmail || "Anonymous"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
              <p className="text-white text-sm whitespace-pre-wrap">{selectedReport.description}</p>
            </div>

            {selectedReport.logs && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Logs</h3>
                <pre className="p-4 bg-black/50 rounded-lg text-xs text-gray-400 overflow-auto max-h-48 font-mono">
                  {selectedReport.logs}
                </pre>
              </div>
            )}

            {/* Messages */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Conversation</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {selectedReport.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg ${
                      msg.sender === "admin" ? "bg-pyrax-orange/10 ml-8" : "bg-white/5 mr-8"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.sender === "admin" ? (
                        <Shield className="h-4 w-4 text-pyrax-orange" />
                      ) : (
                        <User className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="text-xs text-gray-500">
                        {msg.senderName || msg.sender} • {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-white">{msg.message}</p>
                  </div>
                ))}
              </div>

              {/* Reply */}
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a reply..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-pyrax-orange hover:bg-pyrax-amber rounded-lg text-white"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 rounded-xl bg-white/5 border border-white/10 text-center">
            <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Select a ticket to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
