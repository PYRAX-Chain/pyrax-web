"use client";

import { useState, useEffect } from "react";
import {
  Check,
  X,
  ExternalLink,
  User,
  Calendar,
  Search,
  Filter,
} from "lucide-react";

interface CommunityLink {
  id: string;
  title: string;
  url: string;
  description: string;
  authorName: string;
  authorTwitter: string | null;
  category: string;
  status: string;
  submittedAt: string;
  approvedAt: string | null;
}

const categories = [
  { id: "all", name: "All" },
  { id: "tutorial", name: "Tutorials" },
  { id: "analysis", name: "Analysis" },
  { id: "news", name: "News" },
  { id: "video", name: "Videos" },
  { id: "other", name: "Other" },
];

export default function AdminCommunityLinksPage() {
  const [links, setLinks] = useState<CommunityLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");

  useEffect(() => {
    fetchLinks();
  }, [selectedCategory, statusFilter]);

  const fetchLinks = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      params.set("status", statusFilter);
      
      const res = await fetch(`/api/admin/blog/community?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLinks(data.links || []);
      }
    } catch (error) {
      console.error("Failed to fetch links:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blog/community/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      if (res.ok) {
        setLinks(links.map(l => l.id === id ? { ...l, status: "approved", approvedAt: new Date().toISOString() } : l));
      }
    } catch (error) {
      console.error("Failed to approve link:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blog/community/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      if (res.ok) {
        setLinks(links.map(l => l.id === id ? { ...l, status: "rejected" } : l));
      }
    } catch (error) {
      console.error("Failed to reject link:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    
    try {
      const res = await fetch(`/api/admin/blog/community/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLinks(links.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete link:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Community Submissions</h1>
        <p className="text-gray-400">Review and manage community blog submissions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-pyrax-orange"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-pyrax-orange"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <p className="text-yellow-400 text-2xl font-bold">
            {links.filter(l => l.status === "pending").length}
          </p>
          <p className="text-yellow-400/70 text-sm">Pending Review</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <p className="text-green-400 text-2xl font-bold">
            {links.filter(l => l.status === "approved").length}
          </p>
          <p className="text-green-400/70 text-sm">Approved</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400 text-2xl font-bold">
            {links.filter(l => l.status === "rejected").length}
          </p>
          <p className="text-red-400/70 text-sm">Rejected</p>
        </div>
      </div>

      {/* Links List */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pyrax-orange"></div>
          </div>
        ) : links.length > 0 ? (
          <div className="divide-y divide-white/5">
            {links.map((link) => (
              <div key={link.id} className="p-6 hover:bg-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        link.status === "approved" 
                          ? "bg-green-500/20 text-green-400" 
                          : link.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {link.status}
                      </span>
                      <span className="px-2 py-1 bg-pyrax-orange/10 text-pyrax-orange text-xs font-medium rounded capitalize">
                        {link.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {link.title}
                    </h3>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-pyrax-orange hover:underline flex items-center gap-1 mb-2"
                    >
                      {link.url}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {link.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {link.authorName}
                        {link.authorTwitter && (
                          <a
                            href={`https://twitter.com/${link.authorTwitter.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pyrax-orange hover:underline"
                          >
                            {link.authorTwitter}
                          </a>
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(link.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {link.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(link.id)}
                          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReject(link.id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          title="Reject"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="p-2 bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No submissions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
