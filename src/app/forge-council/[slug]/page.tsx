"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Clock,
  MessageSquare,
  Eye,
  Users,
  Send,
  Shield,
  User,
  AlertTriangle,
  Bug,
  Zap,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Flame,
} from "lucide-react";

interface Issue {
  id: string;
  issueNumber: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  stepsToReproduce: string | null;
  expectedBehavior: string | null;
  actualBehavior: string | null;
  logs: string | null;
  category: string;
  severity: string;
  status: string;
  component: string | null;
  environment: string | null;
  version: string | null;
  upvotes: number;
  downvotes: number;
  confirmations: number;
  viewCount: number;
  createdAt: string;
  reporterName: string | null;
  reporterWallet: string | null;
  confirmers: Confirmation[];
  comments: Comment[];
}

interface Confirmation {
  id: string;
  displayName: string | null;
  walletAddress: string | null;
  environment: string | null;
  version: string | null;
  details: string | null;
  createdAt: string;
}

interface Comment {
  id: string;
  authorType: string;
  authorName: string | null;
  authorWallet: string | null;
  isOfficial: boolean;
  content: string;
  createdAt: string;
  replies: Comment[];
}

const severityColors: Record<string, string> = {
  BLOCKER: "bg-red-600 text-white",
  CRITICAL: "bg-red-500 text-white",
  MAJOR: "bg-orange-500 text-white",
  MODERATE: "bg-yellow-500 text-black",
  MINOR: "bg-blue-500 text-white",
  TRIVIAL: "bg-gray-500 text-white",
};

const statusColors: Record<string, { bg: string; text: string; desc: string }> = {
  NEW: { bg: "bg-blue-500", text: "text-blue-400", desc: "Awaiting review" },
  CONFIRMED: { bg: "bg-green-500", text: "text-green-400", desc: "Verified by community" },
  ACKNOWLEDGED: { bg: "bg-purple-500", text: "text-purple-400", desc: "Seen by team" },
  INVESTIGATING: { bg: "bg-yellow-500", text: "text-yellow-400", desc: "Under investigation" },
  IN_PROGRESS: { bg: "bg-orange-500", text: "text-orange-400", desc: "Being fixed" },
  TESTING: { bg: "bg-cyan-500", text: "text-cyan-400", desc: "Fix in testing" },
  FIXED: { bg: "bg-emerald-500", text: "text-emerald-400", desc: "Resolved" },
  WONT_FIX: { bg: "bg-gray-500", text: "text-gray-400", desc: "Will not be fixed" },
  DUPLICATE: { bg: "bg-gray-500", text: "text-gray-400", desc: "Duplicate issue" },
  CANNOT_REPRODUCE: { bg: "bg-gray-500", text: "text-gray-400", desc: "Cannot reproduce" },
  CLOSED: { bg: "bg-gray-500", text: "text-gray-400", desc: "Closed" },
};

export default function IssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLogsExpanded, setShowLogsExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchIssue();
  }, [slug]);

  const fetchIssue = async () => {
    try {
      const res = await fetch(`/api/forge-council/issues/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setIssue(data.issue);
      } else {
        router.push("/forge-council");
      }
    } catch (error) {
      console.error("Failed to fetch issue:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (voteType: "UP" | "DOWN") => {
    if (!issue) return;
    
    try {
      const res = await fetch(`/api/forge-council/issues/${slug}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteType }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setUserVote(data.voteType);
        fetchIssue(); // Refresh to get updated counts
      }
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const handleConfirm = async (details: { environment: string; version: string; details: string }) => {
    if (!issue) return;
    
    try {
      const res = await fetch(`/api/forge-council/issues/${slug}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: "anonymous", // In production, use actual wallet
          displayName: commentName || "Anonymous",
          ...details,
        }),
      });
      
      if (res.ok) {
        setHasConfirmed(true);
        setShowConfirmModal(false);
        fetchIssue();
      }
    } catch (error) {
      console.error("Failed to confirm:", error);
    }
  };

  const handleComment = async () => {
    if (!issue || !newComment.trim()) return;
    
    setSubmittingComment(true);
    try {
      const res = await fetch(`/api/forge-council/issues/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          authorName: commentName || "Anonymous",
        }),
      });
      
      if (res.ok) {
        setNewComment("");
        fetchIssue();
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pyrax-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pyrax-orange"></div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-pyrax-dark flex items-center justify-center">
        <div className="text-center">
          <Bug className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Issue Not Found</h2>
          <Link href="/forge-council" className="text-pyrax-orange hover:underline">
            Back to Forge Council
          </Link>
        </div>
      </div>
    );
  }

  const statusStyle = statusColors[issue.status] || statusColors.NEW;

  return (
    <div className="min-h-screen bg-pyrax-dark">
      {/* Header */}
      <div className="bg-gradient-to-r from-pyrax-orange/10 to-red-900/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/forge-council" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Forge Council
          </Link>
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="font-mono text-pyrax-orange">{issue.issueNumber}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${severityColors[issue.severity]}`}>
                  {issue.severity}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} text-white`}>
                  {issue.status.replace(/_/g, " ")}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{issue.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Reported {new Date(issue.createdAt).toLocaleDateString()}</span>
                {issue.reporterName && <span>by {issue.reporterName}</span>}
                <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {issue.viewCount} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-4">Summary</h2>
              <p className="text-gray-300 whitespace-pre-wrap">{issue.summary}</p>
            </div>

            {/* Description */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
              <div className="text-gray-300 whitespace-pre-wrap">{issue.description}</div>
            </div>

            {/* Steps to Reproduce */}
            {issue.stepsToReproduce && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4">Steps to Reproduce</h2>
                <div className="text-gray-300 whitespace-pre-wrap">{issue.stepsToReproduce}</div>
              </div>
            )}

            {/* Expected vs Actual */}
            {(issue.expectedBehavior || issue.actualBehavior) && (
              <div className="grid md:grid-cols-2 gap-4">
                {issue.expectedBehavior && (
                  <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                    <h2 className="text-lg font-semibold text-green-400 mb-4">Expected Behavior</h2>
                    <p className="text-gray-300 whitespace-pre-wrap">{issue.expectedBehavior}</p>
                  </div>
                )}
                {issue.actualBehavior && (
                  <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20">
                    <h2 className="text-lg font-semibold text-red-400 mb-4">Actual Behavior</h2>
                    <p className="text-gray-300 whitespace-pre-wrap">{issue.actualBehavior}</p>
                  </div>
                )}
              </div>
            )}

            {/* Logs */}
            {issue.logs && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <button
                  onClick={() => setShowLogsExpanded(!showLogsExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h2 className="text-lg font-semibold text-white">Logs / Debug Info</h2>
                  {showLogsExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                {showLogsExpanded && (
                  <pre className="mt-4 p-4 bg-black/50 rounded-lg text-xs text-gray-400 overflow-auto max-h-96 font-mono">
                    {issue.logs}
                  </pre>
                )}
              </div>
            )}

            {/* Confirmations */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  Confirmations ({issue.confirmations})
                </h2>
                {!hasConfirmed && (
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    I Can Reproduce This
                  </button>
                )}
              </div>
              
              {issue.confirmers.length === 0 ? (
                <p className="text-gray-500">No confirmations yet. Be the first to confirm this issue!</p>
              ) : (
                <div className="space-y-3">
                  {issue.confirmers.slice(0, 5).map((c) => (
                    <div key={c.id} className="flex items-start gap-3 p-3 bg-purple-500/10 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-white">{c.displayName || "Anonymous"}</span>
                          <span className="text-gray-500">confirmed</span>
                          {c.environment && <span className="text-gray-400">on {c.environment}</span>}
                        </div>
                        {c.details && <p className="text-sm text-gray-400 mt-1">{c.details}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comments / Discussion */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                Discussion ({issue.comments.length})
              </h2>

              {issue.comments.length === 0 ? (
                <p className="text-gray-500 mb-6">No comments yet. Start the discussion!</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {issue.comments.map((comment) => (
                    <div key={comment.id} className={`p-4 rounded-lg ${comment.isOfficial ? 'bg-pyrax-orange/10 border border-pyrax-orange/30' : 'bg-white/5'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {comment.isOfficial ? (
                          <Shield className="h-4 w-4 text-pyrax-orange" />
                        ) : comment.authorType === "reporter" ? (
                          <Flame className="h-4 w-4 text-purple-400" />
                        ) : (
                          <User className="h-4 w-4 text-gray-500" />
                        )}
                        <span className={`text-sm font-medium ${comment.isOfficial ? 'text-pyrax-orange' : 'text-white'}`}>
                          {comment.authorName || "Anonymous"}
                        </span>
                        {comment.isOfficial && <span className="px-2 py-0.5 bg-pyrax-orange/20 text-pyrax-orange text-xs rounded">Official</span>}
                        {comment.authorType === "reporter" && <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">Reporter</span>}
                        <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment */}
              <div className="border-t border-white/10 pt-4">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full mb-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none"
                />
                <textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none resize-none"
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleComment}
                    disabled={submittingComment || !newComment.trim()}
                    className="px-4 py-2 bg-pyrax-orange hover:bg-pyrax-amber text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {submittingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">VOTE ON THIS ISSUE</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleVote("UP")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                    userVote === "UP" ? 'bg-green-500 text-white' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>{issue.upvotes}</span>
                </button>
                <button
                  onClick={() => handleVote("DOWN")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                    userVote === "DOWN" ? 'bg-red-500 text-white' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  }`}
                >
                  <ThumbsDown className="h-5 w-5" />
                  <span>{issue.downvotes}</span>
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">STATUS</h3>
              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${statusStyle.bg} text-white`}>
                <Clock className="h-4 w-4" />
                <span className="font-medium">{issue.status.replace(/_/g, " ")}</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">{statusStyle.desc}</p>
            </div>

            {/* Details */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">DETAILS</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white">{issue.category.replace(/_/g, " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Severity</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${severityColors[issue.severity]}`}>{issue.severity}</span>
                </div>
                {issue.component && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Component</span>
                    <span className="text-white">{issue.component}</span>
                  </div>
                )}
                {issue.environment && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Environment</span>
                    <span className="text-white">{issue.environment}</span>
                  </div>
                )}
                {issue.version && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version</span>
                    <span className="text-white font-mono">{issue.version}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Share */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">SHARE</h3>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
              >
                <Copy className="h-4 w-4" />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-pyrax-dark border border-white/20 rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-white mb-4">Confirm This Issue</h2>
            <p className="text-gray-400 mb-6">Help verify this issue by providing your reproduction details.</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              handleConfirm({
                environment: (form.elements.namedItem("env") as HTMLInputElement).value,
                version: (form.elements.namedItem("version") as HTMLInputElement).value,
                details: (form.elements.namedItem("details") as HTMLTextAreaElement).value,
              });
            }}>
              <input
                name="env"
                placeholder="Environment (e.g., DevNet, Forge Testnet)"
                className="w-full mb-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500"
              />
              <input
                name="version"
                placeholder="Version (e.g., 1.0.0)"
                className="w-full mb-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500"
              />
              <textarea
                name="details"
                placeholder="Additional details about your reproduction..."
                rows={3}
                className="w-full mb-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 resize-none"
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowConfirmModal(false)} className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium">
                  Confirm Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
