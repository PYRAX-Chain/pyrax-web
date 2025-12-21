"use client";

import { useState, useEffect } from "react";
import {
  Bug,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Send,
  User,
  Shield,
  ThumbsUp,
  ThumbsDown,
  Users,
  Eye,
  ExternalLink,
  ChevronDown,
  Flame,
} from "lucide-react";

interface Issue {
  id: string;
  issueNumber: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  logs: string | null;
  category: string;
  severity: string;
  status: string;
  priority: string;
  component: string | null;
  environment: string | null;
  upvotes: number;
  downvotes: number;
  confirmations: number;
  viewCount: number;
  createdAt: string;
  reporterName: string | null;
  reporterEmail: string | null;
  comments: Comment[];
  _count: { comments: number };
}

interface Comment {
  id: string;
  authorType: string;
  authorName: string | null;
  isOfficial: boolean;
  content: string;
  createdAt: string;
}

const severityColors: Record<string, string> = {
  BLOCKER: "bg-red-600",
  CRITICAL: "bg-red-500",
  MAJOR: "bg-orange-500",
  MODERATE: "bg-yellow-500",
  MINOR: "bg-blue-500",
  TRIVIAL: "bg-gray-500",
};

const statusOptions = [
  "NEW", "CONFIRMED", "ACKNOWLEDGED", "INVESTIGATING", 
  "IN_PROGRESS", "TESTING", "FIXED", "WONT_FIX", 
  "DUPLICATE", "CANNOT_REPRODUCE", "CLOSED"
];

const priorityOptions = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];

export default function AdminForgeCouncilPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIssues();
  }, [statusFilter]);

  const fetchIssues = async () => {
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      
      const res = await fetch(`/api/admin/forge-council?${params}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setIssues(data.issues || []);
      } else if (res.status === 401) {
        // Not logged in - redirect to login
        window.location.href = "/admin/login";
        return;
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || `Failed to load issues (${res.status})`);
      }
    } catch (error) {
      console.error("Failed to fetch issues:", error);
      setError("Network error - please try again");
    } finally {
      setLoading(false);
    }
  };

  const updateIssue = async (issueId: string, updates: { status?: string; priority?: string }) => {
    try {
      const res = await fetch("/api/admin/forge-council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueId, action: "update", ...updates }),
      });
      if (res.ok) {
        fetchIssues();
        if (selectedIssue?.id === issueId) {
          setSelectedIssue({ ...selectedIssue, ...updates });
        }
      }
    } catch (error) {
      console.error("Failed to update issue:", error);
    }
  };

  const sendOfficialReply = async () => {
    if (!selectedIssue || !newMessage.trim()) return;
    try {
      const res = await fetch(`/api/forge-council/issues/${selectedIssue.slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage }),
      });
      if (res.ok) {
        setNewMessage("");
        // Refresh the selected issue with updated comments
        const issueRes = await fetch(`/api/forge-council/issues/${selectedIssue.slug}`);
        if (issueRes.ok) {
          const data = await issueRes.json();
          setSelectedIssue(data.issue);
        }
        fetchIssues();
      } else {
        console.error("Failed to send reply:", await res.text());
      }
    } catch (error) {
      console.error("Failed to send reply:", error);
    }
  };

  const selectIssue = async (issue: Issue) => {
    setSelectedIssue(issue);
    // Fetch full issue details including all comments
    try {
      const res = await fetch(`/api/forge-council/issues/${issue.slug}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedIssue(data.issue);
      }
    } catch (error) {
      console.error("Failed to fetch issue details:", error);
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
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchIssues} className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-sm">
            Retry
          </button>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Flame className="h-8 w-8 text-pyrax-orange" />
          <div>
            <h1 className="text-2xl font-bold text-white">Forge Council</h1>
            <p className="text-gray-400">Manage public issue reports</p>
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
        >
          <option value="">All Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Issue List */}
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {issues.length === 0 ? (
            <div className="p-12 rounded-xl bg-white/5 border border-white/10 text-center">
              <Bug className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No issues found</p>
            </div>
          ) : (
            issues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => selectIssue(issue)}
                className={`p-4 rounded-xl bg-white/5 border cursor-pointer transition-all ${
                  selectedIssue?.id === issue.id
                    ? "border-pyrax-orange"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-mono text-pyrax-orange">{issue.issueNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-xs text-white ${severityColors[issue.severity]}`}>
                      {issue.severity}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-gray-300">
                      {issue.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ThumbsUp className="h-3 w-3" />
                    {issue.upvotes}
                    <Users className="h-3 w-3 ml-2" />
                    {issue.confirmations}
                  </div>
                </div>
                <h3 className="text-white font-medium mb-1">{issue.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{issue.summary}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span>{issue.category}</span>
                  <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                  {issue._count.comments > 0 && (
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {issue._count.comments}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Issue Detail */}
        {selectedIssue ? (
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono text-pyrax-orange">{selectedIssue.issueNumber}</span>
                  <a
                    href={`/forge-council/${selectedIssue.slug}`}
                    target="_blank"
                    className="text-gray-400 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedIssue.title}</h2>
              </div>
            </div>

            {/* Status & Priority Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Status</label>
                <select
                  value={selectedIssue.status}
                  onChange={(e) => updateIssue(selectedIssue.id, { status: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Priority</label>
                <select
                  value={selectedIssue.priority}
                  onChange={(e) => updateIssue(selectedIssue.id, { priority: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
                >
                  {priorityOptions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-white/5 rounded">
                <div className="text-lg font-bold text-green-400">{selectedIssue.upvotes}</div>
                <div className="text-xs text-gray-500">Upvotes</div>
              </div>
              <div className="p-2 bg-white/5 rounded">
                <div className="text-lg font-bold text-red-400">{selectedIssue.downvotes}</div>
                <div className="text-xs text-gray-500">Downvotes</div>
              </div>
              <div className="p-2 bg-white/5 rounded">
                <div className="text-lg font-bold text-purple-400">{selectedIssue.confirmations}</div>
                <div className="text-xs text-gray-500">Confirms</div>
              </div>
              <div className="p-2 bg-white/5 rounded">
                <div className="text-lg font-bold text-blue-400">{selectedIssue.viewCount}</div>
                <div className="text-xs text-gray-500">Views</div>
              </div>
            </div>

            {/* Details */}
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Category:</span>
                <span className="text-white">{selectedIssue.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Component:</span>
                <span className="text-white">{selectedIssue.component || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Reporter:</span>
                <span className="text-white">{selectedIssue.reporterName || selectedIssue.reporterEmail || "Anonymous"}</span>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Summary</h3>
              <p className="text-white text-sm">{selectedIssue.summary}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
              <p className="text-white text-sm whitespace-pre-wrap">{selectedIssue.description}</p>
            </div>

            {/* Logs */}
            {selectedIssue.logs && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Logs</h3>
                <pre className="p-3 bg-black/50 rounded-lg text-xs text-gray-400 overflow-auto max-h-32 font-mono">
                  {selectedIssue.logs}
                </pre>
              </div>
            )}

            {/* Comments Thread */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Discussion ({selectedIssue.comments?.length || 0})
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                {selectedIssue.comments?.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-3 rounded-lg ${
                      comment.isOfficial ? "bg-pyrax-orange/10 border border-pyrax-orange/30" : "bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {comment.isOfficial ? (
                        <Shield className="h-4 w-4 text-pyrax-orange" />
                      ) : (
                        <User className="h-4 w-4 text-gray-500" />
                      )}
                      <span className={`text-xs ${comment.isOfficial ? "text-pyrax-orange" : "text-gray-400"}`}>
                        {comment.authorName || "Anonymous"}
                        {comment.isOfficial && " (Official)"}
                      </span>
                      <span className="text-xs text-gray-600">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-white">{comment.content}</p>
                  </div>
                ))}
              </div>

              {/* Official Reply */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Send official reply..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500"
                  onKeyDown={(e) => e.key === "Enter" && sendOfficialReply()}
                />
                <button
                  onClick={sendOfficialReply}
                  className="px-4 py-2 bg-pyrax-orange hover:bg-pyrax-amber rounded-lg text-black"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 rounded-xl bg-white/5 border border-white/10 text-center">
            <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Select an issue to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
