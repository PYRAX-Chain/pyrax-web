"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bug,
  Flame,
  AlertTriangle,
  Zap,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plus,
  Eye,
  MessageSquare,
  Users,
  TrendingUp,
  FileText,
  Vote,
  Coins,
  Shield,
  BookOpen,
  Globe,
  Download,
  Monitor,
  Loader2,
  X,
} from "lucide-react";

interface Issue {
  id: string;
  issueNumber: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  severity: string;
  status: string;
  upvotes: number;
  downvotes: number;
  confirmations: number;
  viewCount: number;
  createdAt: string;
  reporterName: string | null;
  _count: {
    comments: number;
  };
}

interface Pip {
  id: string;
  pipNumber: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: string;
  forVotes: string;
  againstVotes: string;
  totalVoters: number;
  viewCount: number;
  votingEndsAt: string | null;
  createdAt: string;
  authorName: string | null;
  _count: {
    comments: number;
  };
}

// Categories for sidebar
const MAIN_CATEGORIES = [
  { id: "all", label: "All Items", icon: Flame, count: 0 },
  { id: "governance", label: "Governance (PIPs)", icon: Vote, count: 0, isGovernance: true },
  { id: "issues", label: "Bug Reports", icon: Bug, count: 0 },
];

const PIP_CATEGORIES = [
  { id: "PROTOCOL", label: "Protocol Upgrades", icon: Shield },
  { id: "TREASURY", label: "Treasury", icon: Coins },
  { id: "PARAMETER", label: "Parameter Changes", icon: Zap },
  { id: "ECOSYSTEM", label: "Ecosystem", icon: Globe },
  { id: "SECURITY", label: "Security", icon: AlertTriangle },
  { id: "DOCUMENTATION", label: "Documentation", icon: BookOpen },
];

const ISSUE_CATEGORIES = [
  { id: "BUG", label: "Bug", icon: Bug },
  { id: "CRASH", label: "Crash", icon: AlertTriangle },
  { id: "PERFORMANCE", label: "Performance", icon: Zap },
  { id: "UI_UX", label: "UI/UX", icon: Eye },
  { id: "FEATURE_REQUEST", label: "Feature Request", icon: Plus },
  { id: "SECURITY", label: "Security", icon: Shield },
];

const categoryIcons: Record<string, any> = {
  BUG: Bug,
  CRASH: AlertTriangle,
  PERFORMANCE: Zap,
  UI_UX: Eye,
  FEATURE_REQUEST: Plus,
  SECURITY: AlertTriangle,
  OTHER: Bug,
};

const severityColors: Record<string, string> = {
  BLOCKER: "bg-red-600 text-white",
  CRITICAL: "bg-red-500 text-white",
  MAJOR: "bg-orange-500 text-white",
  MODERATE: "bg-yellow-500 text-black",
  MINOR: "bg-blue-500 text-white",
  TRIVIAL: "bg-gray-500 text-white",
};

const statusColors: Record<string, { bg: string; text: string }> = {
  NEW: { bg: "bg-blue-500/20", text: "text-blue-400" },
  CONFIRMED: { bg: "bg-green-500/20", text: "text-green-400" },
  ACKNOWLEDGED: { bg: "bg-purple-500/20", text: "text-purple-400" },
  INVESTIGATING: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
  IN_PROGRESS: { bg: "bg-orange-500/20", text: "text-orange-400" },
  TESTING: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  FIXED: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  WONT_FIX: { bg: "bg-gray-500/20", text: "text-gray-400" },
  DUPLICATE: { bg: "bg-gray-500/20", text: "text-gray-400" },
  CANNOT_REPRODUCE: { bg: "bg-gray-500/20", text: "text-gray-400" },
  CLOSED: { bg: "bg-gray-500/20", text: "text-gray-400" },
};

export default function ForgeCouncilPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [pips, setPips] = useState<Pip[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mainCategory, setMainCategory] = useState("all"); // "all", "governance", "issues"
  const [subCategory, setSubCategory] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ governance: true, issues: true });
  const [stats, setStats] = useState({ 
    total: 0, open: 0, fixed: 0, confirmations: 0,
    totalPips: 0, activePips: 0, passedPips: 0 
  });
  const [categoryCounts, setCategoryCounts] = useState<{
    issues: Record<string, number>;
    pips: Record<string, number>;
  }>({ issues: {}, pips: {} });

  useEffect(() => {
    fetchData();
  }, [mainCategory, subCategory, statusFilter, sortBy]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch issues, PIPs, and stats in parallel
      const [issuesRes, pipsRes, statsRes] = await Promise.all([
        fetch(`/api/forge-council/issues?${buildIssueParams()}`),
        fetch(`/api/forge-council/pips?${buildPipParams()}`),
        fetch(`/api/forge-council/stats`)
      ]);
      
      if (issuesRes.ok) {
        const data = await issuesRes.json();
        setIssues(data.issues || []);
        setStats(prev => ({ ...prev, ...data.stats }));
      }
      
      if (pipsRes.ok) {
        const data = await pipsRes.json();
        setPips(data.pips || []);
        setStats(prev => ({ 
          ...prev, 
          totalPips: data.stats?.total || 0,
          activePips: data.stats?.active || 0,
          passedPips: data.stats?.passed || 0
        }));
      }
      
      // Fetch category counts for sidebar
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setCategoryCounts({
          issues: statsData.issues?.byCategory || {},
          pips: statsData.pips?.byCategory || {},
        });
        setStats(prev => ({
          ...prev,
          total: statsData.issues?.total || 0,
          open: statsData.issues?.open || 0,
          fixed: statsData.issues?.fixed || 0,
          confirmations: statsData.totalConfirmations || 0,
          totalPips: statsData.pips?.total || 0,
          activePips: statsData.pips?.active || 0,
          passedPips: statsData.pips?.passed || 0,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const buildIssueParams = () => {
    const params = new URLSearchParams();
    if (mainCategory === "issues" && subCategory) params.set("category", subCategory);
    if (statusFilter) params.set("status", statusFilter);
    params.set("sort", sortBy);
    return params.toString();
  };

  const buildPipParams = () => {
    const params = new URLSearchParams();
    if (mainCategory === "governance" && subCategory) params.set("category", subCategory);
    if (statusFilter) params.set("status", statusFilter);
    params.set("sort", sortBy);
    return params.toString();
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryClick = (main: string, sub?: string) => {
    setMainCategory(main);
    setSubCategory(sub || "");
  };

  // Filter based on search
  const filteredIssues = issues.filter(issue =>
    search === "" || 
    issue.title.toLowerCase().includes(search.toLowerCase()) ||
    issue.issueNumber.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPips = pips.filter(pip =>
    search === "" || 
    pip.title.toLowerCase().includes(search.toLowerCase()) ||
    pip.pipNumber.toLowerCase().includes(search.toLowerCase())
  );

  // Determine what to show based on main category
  const showIssues = mainCategory === "all" || mainCategory === "issues";
  const showPips = mainCategory === "all" || mainCategory === "governance";

  return (
    <div className="min-h-screen bg-pyrax-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pyrax-orange/20 via-transparent to-red-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/30 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Flame className="h-10 w-10 text-pyrax-orange" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Forge <span className="text-pyrax-orange">Council</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Community-driven issue tracking for the PYRAX ecosystem. Report bugs, vote on issues, and help shape the future of PYRAX.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="/forge-council/submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-pyrax-orange hover:bg-pyrax-amber text-black font-semibold rounded-lg transition-all"
              >
                <Plus className="h-5 w-5" />
                Report an Issue
              </Link>
              <Link
                href="/forge-council/submit-pip"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all"
              >
                <Vote className="h-5 w-5" />
                Submit PIP
              </Link>
              <Link
                href="#issues"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20"
              >
                <Search className="h-5 w-5" />
                Browse All
              </Link>
            </div>
            
            {/* Download App Banner */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-4 max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-blue-400" />
                  <span className="text-white text-sm">
                    <strong>Vote on PIPs</strong> requires the Desktop App + Staked PYRAX + Running Node
                  </span>
                </div>
                <Link
                  href="/downloads"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all"
                >
                  <Download className="h-4 w-4" />
                  Download App
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">{stats.total + stats.totalPips}</div>
                <div className="text-xs text-gray-400">Total Items</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-purple-400">{stats.totalPips}</div>
                <div className="text-xs text-gray-400">PIPs</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-green-400">{stats.activePips}</div>
                <div className="text-xs text-gray-400">Active Votes</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-blue-400">{stats.open}</div>
                <div className="text-xs text-gray-400">Open Issues</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-emerald-400">{stats.fixed}</div>
                <div className="text-xs text-gray-400">Fixed</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-orange-400">{stats.confirmations}</div>
                <div className="text-xs text-gray-400">Confirmations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div id="issues" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-6">
          {/* Collapsible Sidebar */}
          <div className={`${sidebarOpen ? 'w-64' : 'w-12'} shrink-0 transition-all duration-300`}>
            <div className="sticky top-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                {/* Sidebar Toggle */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  {sidebarOpen && <span className="text-sm font-semibold text-white">Categories</span>}
                  {sidebarOpen ? <ChevronLeft className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                </button>
                
                {sidebarOpen && (
                  <div className="p-2 border-t border-white/10">
                    {/* Main Categories */}
                    <div className="space-y-1">
                      <button
                        onClick={() => handleCategoryClick("all")}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          mainCategory === "all" ? "bg-pyrax-orange/20 text-pyrax-orange" : "text-gray-400 hover:bg-white/5"
                        }`}
                      >
                        <Flame className="h-4 w-4" />
                        All Items
                      </button>
                      
                      {/* Governance Section */}
                      <div>
                        <button
                          onClick={() => toggleSection("governance")}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg"
                        >
                          <span className="flex items-center gap-2">
                            <Vote className="h-4 w-4 text-purple-400" />
                            Governance
                          </span>
                          {expandedSections.governance ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        </button>
                        
                        {expandedSections.governance && (
                          <div className="ml-4 mt-1 space-y-1">
                            <button
                              onClick={() => handleCategoryClick("governance")}
                              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                mainCategory === "governance" && !subCategory ? "bg-purple-500/20 text-purple-400" : "text-gray-500 hover:bg-white/5"
                              }`}
                            >
                              <span>All PIPs</span>
                              <span className="bg-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded text-[10px] font-medium">
                                {stats.totalPips}
                              </span>
                            </button>
                            {PIP_CATEGORIES.map((cat) => {
                              const Icon = cat.icon;
                              const count = categoryCounts.pips[cat.id] || 0;
                              return (
                                <button
                                  key={cat.id}
                                  onClick={() => handleCategoryClick("governance", cat.id)}
                                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                    mainCategory === "governance" && subCategory === cat.id ? "bg-purple-500/20 text-purple-400" : "text-gray-500 hover:bg-white/5"
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <Icon className="h-3 w-3" />
                                    {cat.label}
                                  </span>
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                    count > 0 ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-gray-500"
                                  }`}>
                                    {count}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      
                      {/* Issues Section */}
                      <div>
                        <button
                          onClick={() => toggleSection("issues")}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg"
                        >
                          <span className="flex items-center gap-2">
                            <Bug className="h-4 w-4 text-orange-400" />
                            Bug Reports
                          </span>
                          {expandedSections.issues ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        </button>
                        
                        {expandedSections.issues && (
                          <div className="ml-4 mt-1 space-y-1">
                            <button
                              onClick={() => handleCategoryClick("issues")}
                              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                mainCategory === "issues" && !subCategory ? "bg-orange-500/20 text-orange-400" : "text-gray-500 hover:bg-white/5"
                              }`}
                            >
                              <span>All Issues</span>
                              <span className="bg-orange-500/30 text-orange-300 px-1.5 py-0.5 rounded text-[10px] font-medium">
                                {stats.total}
                              </span>
                            </button>
                            {ISSUE_CATEGORIES.map((cat) => {
                              const Icon = cat.icon;
                              const count = categoryCounts.issues[cat.id] || 0;
                              return (
                                <button
                                  key={cat.id}
                                  onClick={() => handleCategoryClick("issues", cat.id)}
                                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                    mainCategory === "issues" && subCategory === cat.id ? "bg-orange-500/20 text-orange-400" : "text-gray-500 hover:bg-white/5"
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <Icon className="h-3 w-3" />
                                    {cat.label}
                                  </span>
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                    count > 0 ? "bg-orange-500/20 text-orange-400" : "bg-white/5 text-gray-500"
                                  }`}>
                                    {count}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search & Filters */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/10">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search PIPs and issues..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none"
                    />
                  </div>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-pyrax-orange focus:outline-none"
                >
                  <option value="">All Status</option>
                  {mainCategory === "governance" ? (
                    <>
                      <option value="DRAFT">Draft</option>
                      <option value="ACTIVE">Active Voting</option>
                      <option value="PASSED">Passed</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="IMPLEMENTED">Implemented</option>
                    </>
                  ) : (
                    <>
                      <option value="NEW">New</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="FIXED">Fixed</option>
                      <option value="CLOSED">Closed</option>
                    </>
                  )}
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-pyrax-orange focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most-votes">Most Votes</option>
                  <option value="most-comments">Most Discussed</option>
                </select>
              </div>
            </div>

            {/* Content List */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-12 w-12 text-pyrax-orange animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* PIPs Section */}
                {showPips && filteredPips.length > 0 && (
                  <>
                    {mainCategory === "all" && (
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                        <Vote className="h-5 w-5 text-purple-400" />
                        Governance Proposals (PIPs)
                      </h3>
                    )}
                    {filteredPips.map((pip) => {
                      const catInfo = PIP_CATEGORIES.find(c => c.id === pip.category);
                      const CategoryIcon = catInfo?.icon || FileText;
                      const forVotes = parseFloat(pip.forVotes) || 0;
                      const againstVotes = parseFloat(pip.againstVotes) || 0;
                      const totalVotes = forVotes + againstVotes;
                      const forPercent = totalVotes > 0 ? (forVotes / totalVotes) * 100 : 0;
                      
                      return (
                        <Link
                          key={pip.id}
                          href={`/forge-council/pip/${pip.slug}`}
                          className="block bg-gradient-to-r from-purple-900/20 to-transparent backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
                        >
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center gap-2 min-w-[80px]">
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-400">{forVotes.toLocaleString()}</div>
                                <div className="text-xs text-gray-500">FOR</div>
                              </div>
                              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: `${forPercent}%` }} />
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-red-400">{againstVotes.toLocaleString()}</div>
                                <div className="text-xs text-gray-500">AGAINST</div>
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-mono text-purple-400">{pip.pipNumber}</span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                    pip.status === "ACTIVE" ? "bg-green-500/20 text-green-400" :
                                    pip.status === "PASSED" ? "bg-blue-500/20 text-blue-400" :
                                    pip.status === "REJECTED" ? "bg-red-500/20 text-red-400" :
                                    pip.status === "IMPLEMENTED" ? "bg-purple-500/20 text-purple-400" :
                                    "bg-gray-500/20 text-gray-400"
                                  }`}>
                                    {pip.status}
                                  </span>
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300">
                                    {catInfo?.label || pip.category}
                                  </span>
                                </div>
                                <CategoryIcon className="h-5 w-5 text-purple-400 shrink-0" />
                              </div>
                              
                              <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors mb-2">
                                {pip.title}
                              </h3>
                              
                              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                {pip.summary}
                              </p>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {pip.totalVoters} voters
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  {pip._count?.comments || 0} comments
                                </span>
                                {pip.votingEndsAt && pip.status === "ACTIVE" && (
                                  <span className="flex items-center gap-1 text-purple-400">
                                    <Clock className="h-3 w-3" />
                                    Ends {new Date(pip.votingEndsAt).toLocaleDateString()}
                                  </span>
                                )}
                                <span>{new Date(pip.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </>
                )}

                {/* Issues Section */}
                {showIssues && filteredIssues.length > 0 && (
                  <>
                    {mainCategory === "all" && (
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4 mt-8">
                        <Bug className="h-5 w-5 text-orange-400" />
                        Bug Reports & Issues
                      </h3>
                    )}
                    {filteredIssues.map((issue) => {
                      const CategoryIcon = categoryIcons[issue.category] || Bug;
                      const statusStyle = statusColors[issue.status] || statusColors.NEW;
                      
                      return (
                        <Link
                          key={issue.id}
                          href={`/forge-council/${issue.slug}`}
                          className="block bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-pyrax-orange/50 transition-all group"
                        >
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center gap-1 min-w-[60px]">
                              <div className="flex items-center gap-1 text-green-400">
                                <ThumbsUp className="h-4 w-4" />
                                <span className="font-semibold">{issue.upvotes}</span>
                              </div>
                              <div className="flex items-center gap-1 text-red-400 text-sm">
                                <ThumbsDown className="h-3 w-3" />
                                <span>{issue.downvotes}</span>
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-mono text-pyrax-orange">{issue.issueNumber}</span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${severityColors[issue.severity]}`}>
                                    {issue.severity}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                                    {issue.status.replace(/_/g, " ")}
                                  </span>
                                </div>
                                <CategoryIcon className="h-5 w-5 text-gray-400 shrink-0" />
                              </div>
                              
                              <h3 className="text-lg font-semibold text-white group-hover:text-pyrax-orange transition-colors mb-2">
                                {issue.title}
                              </h3>
                              
                              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                {issue.summary}
                              </p>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {issue.confirmations} confirmations
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  {issue._count.comments} comments
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {issue.viewCount} views
                                </span>
                                <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </>
                )}

                {/* Empty State */}
                {filteredPips.length === 0 && filteredIssues.length === 0 && (
                  <div className="text-center py-20">
                    <Flame className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Items Found</h3>
                    <p className="text-gray-400 mb-6">Be the first to contribute!</p>
                    <div className="flex justify-center gap-4">
                      <Link
                        href="/forge-council/submit"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-pyrax-orange hover:bg-pyrax-amber text-black font-semibold rounded-lg transition-all"
                      >
                        <Plus className="h-5 w-5" />
                        Report Issue
                      </Link>
                      <Link
                        href="/forge-council/submit-pip"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all"
                      >
                        <Vote className="h-5 w-5" />
                        Submit PIP
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
