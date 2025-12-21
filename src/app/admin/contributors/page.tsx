"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Wallet,
  TrendingUp,
  Search,
  Download,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

interface Contributor {
  id: string;
  address: string;
  email?: string;
  totalContributed: number;
  totalPYRAX: number;
  transactions: number;
  firstContribution: string;
  lastContribution: string;
  phase: string;
  status: "active" | "claimed" | "pending";
}

interface ContributorStats {
  totalContributors: number;
  totalRaised: number;
  totalPYRAXAllocated: number;
  averageContribution: number;
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [stats, setStats] = useState<ContributorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"amount" | "date" | "pyrax">("amount");
  const [filterPhase, setFilterPhase] = useState<string>("all");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  useEffect(() => {
    fetchContributors();
  }, []);

  const fetchContributors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contributors");
      if (res.ok) {
        const data = await res.json();
        setContributors(data.contributors || []);
        setStats(data.stats || null);
      }
    } catch (error) {
      console.error("Failed to fetch contributors:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const exportCSV = () => {
    const headers = ["Address", "Email", "Total USD", "Total PYRAX", "Transactions", "First Contribution", "Phase", "Status"];
    const rows = contributors.map(c => [
      c.address, c.email || "", c.totalContributed.toFixed(2), c.totalPYRAX.toFixed(0),
      c.transactions, c.firstContribution, c.phase, c.status
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pyrax-contributors-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const phases = [...new Set(contributors.map(c => c.phase))];
  const filteredContributors = contributors
    .filter(c => {
      if (filterPhase !== "all" && c.phase !== filterPhase) return false;
      if (searchTerm && !c.address.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !(c.email?.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "amount") return b.totalContributed - a.totalContributed;
      if (sortBy === "pyrax") return b.totalPYRAX - a.totalPYRAX;
      return new Date(b.lastContribution).getTime() - new Date(a.lastContribution).getTime();
    });

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
          <h1 className="text-2xl font-bold text-white">Contributors</h1>
          <p className="text-gray-400">Presale investors and token allocations</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button onClick={fetchContributors} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white transition-colors">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-pyrax-orange/20"><Users className="h-5 w-5 text-pyrax-orange" /></div>
              <span className="text-sm text-gray-400">Total Contributors</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalContributors.toLocaleString()}</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-500/20"><TrendingUp className="h-5 w-5 text-green-400" /></div>
              <span className="text-sm text-gray-400">Total Raised</span>
            </div>
            <div className="text-2xl font-bold text-white">${stats.totalRaised.toLocaleString()}</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/20"><Wallet className="h-5 w-5 text-blue-400" /></div>
              <span className="text-sm text-gray-400">PYRAX Allocated</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalPYRAXAllocated.toLocaleString()}</div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/20"><TrendingUp className="h-5 w-5 text-purple-400" /></div>
              <span className="text-sm text-gray-400">Avg. Contribution</span>
            </div>
            <div className="text-2xl font-bold text-white">${stats.averageContribution.toLocaleString()}</div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input type="text" placeholder="Search by address or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange" />
          </div>
        </div>
        <select value={filterPhase} onChange={(e) => setFilterPhase(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none">
          <option value="all">All Phases</option>
          {phases.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none">
          <option value="amount">Total USD</option>
          <option value="pyrax">Total PYRAX</option>
          <option value="date">Recent First</option>
        </select>
      </div>

      <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Address</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Email</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Total USD</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">PYRAX</th>
              <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Txns</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Phase</th>
              <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredContributors.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                {contributors.length === 0 ? "No contributors yet. Contributions from presale will appear here." : "No matching contributors"}
              </td></tr>
            ) : filteredContributors.map(c => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-white">{c.address.slice(0,8)}...{c.address.slice(-6)}</code>
                    <button onClick={() => copyAddress(c.address)} className="p-1 hover:bg-white/10 rounded">
                      {copiedAddress === c.address ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3 text-gray-500" />}
                    </button>
                    <a href={`https://etherscan.io/address/${c.address}`} target="_blank" rel="noopener" className="p-1 hover:bg-white/10 rounded">
                      <ExternalLink className="h-3 w-3 text-gray-500" />
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{c.email || "—"}</td>
                <td className="px-6 py-4 text-right text-sm font-medium text-white">${c.totalContributed.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-sm font-medium text-pyrax-orange">{c.totalPYRAX.toLocaleString()}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-400">{c.transactions}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{c.phase}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    c.status === "claimed" ? "bg-green-500/20 text-green-400" :
                    c.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
