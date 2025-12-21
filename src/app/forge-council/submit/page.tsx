"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Bug,
  AlertTriangle,
  Zap,
  Eye,
  Plus,
  Lock,
  FileText,
  Send,
  Flame,
  Upload,
  X,
  Image,
  Video,
  Loader2,
} from "lucide-react";

const categories = [
  { value: "BUG", label: "Bug", icon: Bug, desc: "Something isn't working correctly" },
  { value: "CRASH", label: "Crash", icon: AlertTriangle, desc: "Application crashes or freezes" },
  { value: "PERFORMANCE", label: "Performance", icon: Zap, desc: "Slow, laggy, or resource issues" },
  { value: "UI_UX", label: "UI/UX", icon: Eye, desc: "Visual or usability issues" },
  { value: "FEATURE_REQUEST", label: "Feature Request", icon: Plus, desc: "Suggest a new feature" },
  { value: "SECURITY", label: "Security", icon: Lock, desc: "Security vulnerability" },
  { value: "OTHER", label: "Other", icon: FileText, desc: "Other issue type" },
];

const severities = [
  { value: "BLOCKER", label: "Blocker", color: "bg-red-600", desc: "Cannot use the system at all" },
  { value: "CRITICAL", label: "Critical", color: "bg-red-500", desc: "Major feature completely broken" },
  { value: "MAJOR", label: "Major", color: "bg-orange-500", desc: "Significant impact on usage" },
  { value: "MODERATE", label: "Moderate", color: "bg-yellow-500", desc: "Some impact but workaround exists" },
  { value: "MINOR", label: "Minor", color: "bg-blue-500", desc: "Cosmetic or low impact" },
  { value: "TRIVIAL", label: "Trivial", color: "bg-gray-500", desc: "Very minor issue" },
];

const components = [
  "Node A (Stream A)",
  "Node B (Stream B/C)",
  "Desktop App",
  "Wallet",
  "Explorer",
  "Faucet",
  "Website",
  "API/RPC",
  "Mining",
  "Staking/Validators",
  "Other",
];

const environments = [
  "DevNet (Local)",
  "Forge Testnet",
  "Blaze Testnet",
  "Inferno Testnet",
  "Phoenix Testnet",
  "Mainnet",
];

interface UploadedFile {
  url: string;
  filename: string;
  size: number;
  type: string;
}

const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png", 
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
];

export default function SubmitIssuePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  
  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    stepsToReproduce: "",
    expectedBehavior: "",
    actualBehavior: "",
    category: "BUG",
    severity: "MODERATE",
    component: "",
    environment: "",
    version: "",
    reporterName: "",
    reporterEmail: "",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError("");
    setUploading(true);

    for (const file of Array.from(files)) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`${file.name} is too large. Maximum size is 150MB.`);
        continue;
      }

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        setUploadError(`${file.name} has an invalid type. Allowed: images and videos.`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setUploadedFiles((prev) => [...prev, {
            url: data.url,
            filename: data.filename,
            size: data.size,
            type: data.type,
          }]);
        } else {
          setUploadError(data.error || "Failed to upload file");
        }
      } catch (err) {
        setUploadError("Network error during upload");
      }
    }

    setUploading(false);
    // Reset input
    e.target.value = "";
  };

  const removeFile = (url: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.url !== url));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.summary.trim() || !form.description.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Include attachment URLs in the submission
      const submitData = {
        ...form,
        attachments: uploadedFiles.map(f => ({
          url: f.url,
          filename: f.filename,
          size: f.size,
          type: f.type,
        })),
      };

      const res = await fetch("/api/forge-council/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        router.push(`/forge-council/${data.issue.slug}`);
      } else {
        // Show more specific error if available
        const errorMsg = data.error || "Failed to submit issue";
        const errorDetails = data.code ? ` (Code: ${data.code})` : "";
        setError(`${errorMsg}${errorDetails}`);
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      setError("Network error - please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-pyrax-dark">
      {/* Header */}
      <div className="bg-gradient-to-r from-pyrax-orange/10 to-red-900/10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/forge-council" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Forge Council
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <Flame className="h-8 w-8 text-pyrax-orange" />
            <h1 className="text-3xl font-bold text-white">Report an Issue</h1>
          </div>
          <p className="text-gray-400">Help improve PYRAX by reporting bugs, crashes, or suggesting features.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category Selection */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Issue Type *</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat.value })}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      form.category === cat.value
                        ? "bg-pyrax-orange/20 border-pyrax-orange text-white"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                    }`}
                  >
                    <Icon className={`h-5 w-5 mb-2 ${form.category === cat.value ? "text-pyrax-orange" : ""}`} />
                    <div className="font-medium text-sm">{cat.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{cat.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Severity Selection */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Severity *</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {severities.map((sev) => (
                <button
                  key={sev.value}
                  type="button"
                  onClick={() => setForm({ ...form, severity: sev.value })}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    form.severity === sev.value
                      ? "bg-white/10 border-white/30"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3 h-3 rounded-full ${sev.color}`} />
                    <span className="font-medium text-white text-sm">{sev.label}</span>
                  </div>
                  <div className="text-xs text-gray-500">{sev.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title & Summary */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Brief, descriptive title for the issue"
                maxLength={100}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none"
              />
              <div className="text-xs text-gray-500 mt-1">{form.title.length}/100 characters</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Summary *</label>
              <textarea
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                placeholder="One paragraph summary of the issue"
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none resize-none"
              />
              <div className="text-xs text-gray-500 mt-1">{form.summary.length}/500 characters</div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Detailed Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Provide as much detail as possible about the issue..."
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Steps to Reproduce</label>
              <textarea
                value={form.stepsToReproduce}
                onChange={(e) => setForm({ ...form, stepsToReproduce: e.target.value })}
                placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Expected Behavior</label>
                <textarea
                  value={form.expectedBehavior}
                  onChange={(e) => setForm({ ...form, expectedBehavior: e.target.value })}
                  placeholder="What should happen?"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Actual Behavior</label>
                <textarea
                  value={form.actualBehavior}
                  onChange={(e) => setForm({ ...form, actualBehavior: e.target.value })}
                  placeholder="What actually happens?"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Environment Details */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Environment Details</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Component</label>
                <select
                  value={form.component}
                  onChange={(e) => setForm({ ...form, component: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-pyrax-orange focus:outline-none"
                >
                  <option value="">Select component...</option>
                  {components.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Environment</label>
                <select
                  value={form.environment}
                  onChange={(e) => setForm({ ...form, environment: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-pyrax-orange focus:outline-none"
                >
                  <option value="">Select environment...</option>
                  {environments.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Version</label>
                <input
                  type="text"
                  value={form.version}
                  onChange={(e) => setForm({ ...form, version: e.target.value })}
                  placeholder="e.g., 1.0.0"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-2">Attachments</h2>
            <p className="text-sm text-gray-400 mb-4">Optional - upload screenshots or screen recordings to help illustrate the issue (max 150MB per file).</p>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-pyrax-orange/50 transition-colors">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/quicktime,video/x-msvideo"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer flex flex-col items-center gap-3 ${uploading ? "opacity-50" : ""}`}
              >
                {uploading ? (
                  <Loader2 className="h-10 w-10 text-pyrax-orange animate-spin" />
                ) : (
                  <Upload className="h-10 w-10 text-gray-400" />
                )}
                <div>
                  <span className="text-pyrax-orange font-medium">Click to upload</span>
                  <span className="text-gray-400"> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">
                  Images (JPEG, PNG, GIF, WebP) or Videos (MP4, WebM, MOV, AVI) up to 150MB
                </p>
              </label>
            </div>

            {/* Upload Error */}
            {uploadError && (
              <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {uploadError}
              </div>
            )}

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-400">{uploadedFiles.length} file(s) attached:</p>
                {uploadedFiles.map((file) => (
                  <div
                    key={file.url}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      {file.type.startsWith("image/") ? (
                        <Image className="h-5 w-5 text-blue-400" />
                      ) : (
                        <Video className="h-5 w-5 text-purple-400" />
                      )}
                      <div>
                        <p className="text-sm text-white truncate max-w-[200px] sm:max-w-[300px]">
                          {file.filename}
                        </p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file.url)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reporter Info */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-2">Your Information</h2>
            <p className="text-sm text-gray-400 mb-4">Optional - provide if you'd like updates on this issue.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Name</label>
                <input
                  type="text"
                  value={form.reporterName}
                  onChange={(e) => setForm({ ...form, reporterName: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  value={form.reporterEmail}
                  onChange={(e) => setForm({ ...form, reporterEmail: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pyrax-orange focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-between">
            <Link href="/forge-council" className="text-gray-400 hover:text-white">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-pyrax-orange hover:bg-pyrax-amber text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              {submitting ? "Submitting..." : "Submit Issue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
