"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Play,
  Pause,
  Trash2,
  RefreshCw,
  Filter,
  Sparkles,
  Flame,
} from "lucide-react";

// Demo jobs data
const demoJobs: any[] = [];

export default function JobsPage() {
  const [jobs] = useState(demoJobs);
  const [filter, setFilter] = useState<"all" | "running" | "completed" | "failed">("all");

  const filteredJobs = jobs.filter(j => filter === "all" || j.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Boxes className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Training Jobs</h1>
            <p className="text-gray-400">Monitor your Foundry ML training jobs</p>
          </div>
        </div>
        <Link
          href="/dashboard/foundry"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white font-medium transition-colors"
        >
          <Play className="h-4 w-4" />
          New Training Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
            <span className="text-sm text-gray-400">Running</span>
          </div>
          <div className="text-2xl font-bold text-white">0</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-gray-400">Queued</span>
          </div>
          <div className="text-2xl font-bold text-white">0</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-sm text-gray-400">Completed</span>
          </div>
          <div className="text-2xl font-bold text-white">0</div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <span className="text-sm text-gray-400">Failed</span>
          </div>
          <div className="text-2xl font-bold text-white">0</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["all", "running", "completed", "failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-pyrax-orange text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {/* Job items would render here */}
          </div>
        ) : (
          <div className="text-center py-12">
            <Boxes className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No training jobs yet</p>
            <p className="text-sm text-gray-600 mt-1">
              Create a new training job to see it here
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <Link
                href="/dashboard/foundry"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors"
              >
                <Flame className="h-4 w-4" />
                Start Training
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
