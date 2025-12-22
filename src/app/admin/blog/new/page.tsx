"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Quote,
} from "lucide-react";

const categories = [
  { id: "announcements", name: "Announcements" },
  { id: "technology", name: "Technology" },
  { id: "tutorials", name: "Tutorials" },
  { id: "ecosystem", name: "Ecosystem" },
  { id: "community", name: "Community" },
];

export default function NewBlogPostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "announcements",
    tags: "",
    featured: false,
    status: "draft",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("folder", "blog");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, coverImage: data.url }));
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const insertFormatting = (before: string, after: string = "") => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const newContent =
      formData.content.substring(0, start) +
      before +
      selectedText +
      after +
      formData.content.substring(end);

    setFormData(prev => ({ ...prev, content: newContent }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleSave = async (publishNow: boolean = false) => {
    if (!formData.title || !formData.content) {
      alert("Please fill in title and content");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || generateSlug(formData.title),
          tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
          status: publishNow ? "published" : formData.status,
        }),
      });

      if (res.ok) {
        router.push("/admin/blog");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save post");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">New Blog Post</h1>
            <p className="text-gray-400">Create a new article</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-pyrax-orange text-black font-medium rounded-lg hover:bg-pyrax-amber transition-colors disabled:opacity-50"
          >
            <Eye className="w-4 h-4" />
            Publish
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-lg placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
                placeholder="Enter post title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                URL Slug
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
                  placeholder="url-slug"
                />
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange resize-none"
              placeholder="Brief summary shown in previews..."
            />
          </div>

          {/* Content Editor */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Content * (HTML supported)
            </label>
            
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 mb-3 p-2 bg-white/5 rounded-lg">
              <button
                type="button"
                onClick={() => insertFormatting("<strong>", "</strong>")}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Bold"
              >
                <Bold className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("<em>", "</em>")}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Italic"
              >
                <Italic className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("<h2>", "</h2>")}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Heading 2"
              >
                <Heading1 className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("<h3>", "</h3>")}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Heading 3"
              >
                <Heading2 className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("<ul>\n  <li>", "</li>\n</ul>")}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Bullet List"
              >
                <List className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("<ol>\n  <li>", "</li>\n</ol>")}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<a href="">', "</a>")}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Link"
              >
                <LinkIcon className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<img src="" alt="', '" />')}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Image"
              >
                <ImageIcon className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("<code>", "</code>")}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Inline Code"
              >
                <Code className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("<blockquote>", "</blockquote>")}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="Quote"
              >
                <Quote className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={20}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange font-mono text-sm"
              placeholder="<p>Write your article content here...</p>"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Cover Image
            </label>
            {formData.coverImage ? (
              <div className="relative">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image
                    src={formData.coverImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-lg hover:border-pyrax-orange/50 transition-colors"
              >
                {uploading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pyrax-orange" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-500 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload</span>
                  </>
                )}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Category */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-pyrax-orange"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
              placeholder="blockchain, update, tech"
            />
          </div>

          {/* Options */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-pyrax-orange focus:ring-pyrax-orange"
              />
              <span className="text-white">Featured Post</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
