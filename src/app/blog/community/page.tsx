"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ExternalLink, User, Send, CheckCircle, Clock, ArrowLeft, Link as LinkIcon } from "lucide-react";

interface CommunityLink {
  id: string;
  title: string;
  url: string;
  description: string;
  authorName: string;
  authorTwitter: string | null;
  thumbnailUrl: string | null;
  category: string;
  status: "pending" | "approved" | "rejected";
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

export default function CommunityPostsPage() {
  const [links, setLinks] = useState<CommunityLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    authorName: "",
    authorTwitter: "",
    category: "tutorial",
  });

  useEffect(() => {
    fetchLinks();
  }, [selectedCategory]);

  const fetchLinks = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      params.set("status", "approved");
      
      const res = await fetch(`/api/blog/community?${params.toString()}`);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/blog/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({
          title: "",
          url: "",
          description: "",
          authorName: "",
          authorTwitter: "",
          category: "tutorial",
        });
        setTimeout(() => {
          setShowSubmitForm(false);
          setSubmitSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-pyrax-darker">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pyrax-orange/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pyrax-orange/10 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Community <span className="text-pyrax-orange">Posts</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Discover articles, tutorials, and content created by the PYRAX community. 
              Have you written about PYRAX? Submit your link below!
            </p>
            <button
              onClick={() => setShowSubmitForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-pyrax-orange text-black font-bold rounded-xl hover:bg-pyrax-amber transition-colors"
            >
              <Send className="w-5 h-5" />
              Submit Your Content
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-pyrax-orange text-black"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Form Modal */}
      {showSubmitForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-lg bg-pyrax-dark border border-white/10 rounded-2xl p-6">
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Submitted Successfully!</h3>
                <p className="text-gray-400">
                  Your link has been submitted for review. It will appear here once approved.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Submit Your Content</h3>
                  <button
                    onClick={() => setShowSubmitForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
                      placeholder="My Amazing PYRAX Tutorial"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
                      placeholder="https://your-blog.com/pyrax-article"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange resize-none"
                      placeholder="A brief description of your content..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.authorName}
                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Twitter Handle
                      </label>
                      <input
                        type="text"
                        value={formData.authorTwitter}
                        onChange={(e) => setFormData({ ...formData, authorTwitter: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
                        placeholder="@yourhandle"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pyrax-orange"
                    >
                      <option value="tutorial">Tutorial</option>
                      <option value="analysis">Analysis</option>
                      <option value="news">News</option>
                      <option value="video">Video</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-pyrax-orange text-black font-bold rounded-xl hover:bg-pyrax-amber transition-colors disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit for Review"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Links Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pyrax-orange"></div>
          </div>
        ) : links.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-pyrax-orange/30 transition-all"
              >
                {link.thumbnailUrl && (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={link.thumbnailUrl}
                      alt={link.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-pyrax-orange/10 text-pyrax-orange text-xs font-medium rounded capitalize">
                      {link.category}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-500 ml-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-pyrax-orange transition-colors line-clamp-2">
                    {link.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {link.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {link.authorName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(link.approvedAt || link.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <LinkIcon className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No community posts yet</h3>
            <p className="text-gray-400 mb-6">
              Be the first to share your PYRAX content with the community!
            </p>
            <button
              onClick={() => setShowSubmitForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-pyrax-orange text-black font-bold rounded-xl hover:bg-pyrax-amber transition-colors"
            >
              <Send className="w-5 h-5" />
              Submit Your Content
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
