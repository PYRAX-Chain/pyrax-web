"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  Clock,
  Shield,
  Send,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Lock,
  Unlock,
} from "lucide-react";

interface TreasuryWallet {
  address: string;
  label: string;
  role: "signer" | "admin";
  hasApproved: boolean;
}

interface WithdrawalRequest {
  id: string;
  amount: number;
  recipient: string;
  reason: string;
  requestedBy: string;
  requestedAt: string;
  timelockEnds: string;
  status: "pending" | "approved" | "executed" | "cancelled";
  approvals: string[];
  requiredApprovals: number;
}

interface TreasuryStats {
  totalBalance: number;
  pendingWithdrawals: number;
  lockedBalance: number;
  availableBalance: number;
}

const TIMELOCK_DURATION = 48 * 60 * 60 * 1000; // 48 hours

export default function TreasuryPage() {
  const [stats, setStats] = useState<TreasuryStats | null>(null);
  const [wallets, setWallets] = useState<TreasuryWallet[]>([]);
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({ amount: "", recipient: "", reason: "" });
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchTreasuryData();
  }, []);

  const fetchTreasuryData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/treasury");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats || null);
        setWallets(data.wallets || []);
        setRequests(data.requests || []);
      }
    } catch (error) {
      console.error("Failed to fetch treasury data:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const submitWithdrawalRequest = async () => {
    if (!newRequest.amount || !newRequest.recipient || !newRequest.reason) return;
    setActionLoading("submit");
    try {
      const res = await fetch("/api/admin/treasury/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(newRequest.amount),
          recipient: newRequest.recipient,
          reason: newRequest.reason,
        }),
      });
      if (res.ok) {
        setShowNewRequest(false);
        setNewRequest({ amount: "", recipient: "", reason: "" });
        await fetchTreasuryData();
      }
    } catch (error) {
      console.error("Failed to submit request:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const approveRequest = async (requestId: string) => {
    setActionLoading(requestId);
    try {
      await fetch("/api/admin/treasury/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });
      await fetchTreasuryData();
    } catch (error) {
      console.error("Failed to approve:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const executeRequest = async (requestId: string) => {
    setActionLoading(requestId);
    try {
      await fetch("/api/admin/treasury/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });
      await fetchTreasuryData();
    } catch (error) {
      console.error("Failed to execute:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const getTimeRemaining = (timelockEnds: string) => {
    const diff = new Date(timelockEnds).getTime() - Date.now();
    if (diff <= 0) return "Ready";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m`;
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
          <h1 className="text-2xl font-bold text-white">Treasury Management</h1>
          <p className="text-gray-400">Multi-sig controlled treasury with time-locked withdrawals</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowNewRequest(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white transition-colors">
            <Send className="h-4 w-4" /> New Withdrawal Request
          </button>
          <button onClick={fetchTreasuryData} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-500/20"><Wallet className="h-5 w-5 text-green-400" /></div>
              <span className="text-sm text-gray-400">Total Balance</span>
            </div>
            <div className="text-2xl font-bold text-white">${stats.totalBalance.toLocaleString()}</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/20"><Unlock className="h-5 w-5 text-blue-400" /></div>
              <span className="text-sm text-gray-400">Available</span>
            </div>
            <div className="text-2xl font-bold text-white">${stats.availableBalance.toLocaleString()}</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-yellow-500/20"><Lock className="h-5 w-5 text-yellow-400" /></div>
              <span className="text-sm text-gray-400">Locked</span>
            </div>
            <div className="text-2xl font-bold text-white">${stats.lockedBalance.toLocaleString()}</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-pyrax-orange/20"><Clock className="h-5 w-5 text-pyrax-orange" /></div>
              <span className="text-sm text-gray-400">Pending</span>
            </div>
            <div className="text-2xl font-bold text-white">${stats.pendingWithdrawals.toLocaleString()}</div>
          </div>
        </div>
      )}

      {/* Multi-sig Wallets */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-pyrax-orange" /> Authorized Signers (2 of 3 required)
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {wallets.map((w, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{w.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${w.role === "admin" ? "bg-pyrax-orange/20 text-pyrax-orange" : "bg-blue-500/20 text-blue-400"}`}>
                  {w.role}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-xs text-gray-400">{w.address.slice(0,10)}...{w.address.slice(-8)}</code>
                <button onClick={() => copyAddress(w.address)} className="p-1 hover:bg-white/10 rounded">
                  {copiedAddress === w.address ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3 text-gray-500" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdrawal Requests */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Withdrawal Requests</h2>
        {requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No withdrawal requests yet</div>
        ) : (
          <div className="space-y-4">
            {requests.map(req => (
              <div key={req.id} className={`p-4 rounded-lg border ${
                req.status === "executed" ? "bg-green-500/10 border-green-500/20" :
                req.status === "cancelled" ? "bg-red-500/10 border-red-500/20" :
                "bg-white/5 border-white/10"
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-lg font-bold text-white">${req.amount.toLocaleString()}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        req.status === "executed" ? "bg-green-500/20 text-green-400" :
                        req.status === "cancelled" ? "bg-red-500/20 text-red-400" :
                        req.status === "approved" ? "bg-blue-500/20 text-blue-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>{req.status}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{req.reason}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>To: {req.recipient.slice(0,10)}...</span>
                      <span>By: {req.requestedBy}</span>
                      <span>Approvals: {req.approvals.length}/{req.requiredApprovals}</span>
                      {req.status === "pending" && <span className="text-pyrax-orange">Timelock: {getTimeRemaining(req.timelockEnds)}</span>}
                    </div>
                  </div>
                  {req.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => approveRequest(req.id)} disabled={actionLoading === req.id}
                        className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-sm disabled:opacity-50">
                        Approve
                      </button>
                      {req.approvals.length >= req.requiredApprovals && getTimeRemaining(req.timelockEnds) === "Ready" && (
                        <button onClick={() => executeRequest(req.id)} disabled={actionLoading === req.id}
                          className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 text-sm disabled:opacity-50">
                          Execute
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Request Modal */}
      {showNewRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-lg p-6 rounded-xl bg-pyrax-gray border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">New Withdrawal Request</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Amount (USD)</label>
                <input type="number" value={newRequest.amount} onChange={(e) => setNewRequest({...newRequest, amount: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" placeholder="10000" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Recipient Address</label>
                <input type="text" value={newRequest.recipient} onChange={(e) => setNewRequest({...newRequest, recipient: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono" placeholder="0x..." />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Reason</label>
                <textarea value={newRequest.reason} onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white h-24" placeholder="Development costs, marketing, etc." />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <strong className="text-yellow-400">48-hour timelock:</strong> After 2 of 3 signers approve, funds will be locked for 48 hours before execution.
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowNewRequest(false)} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">Cancel</button>
              <button onClick={submitWithdrawalRequest} disabled={actionLoading === "submit" || !newRequest.amount || !newRequest.recipient || !newRequest.reason}
                className="flex-1 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white transition-colors disabled:opacity-50">
                {actionLoading === "submit" ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
