"use client";

import { useState } from "react";
import {
  Activity,
  Sparkles,
  Flame,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Filter,
} from "lucide-react";

// Demo activity data
const demoActivities: any[] = [];

export default function ActivityPage() {
  const [activities] = useState(demoActivities);
  const [filter, setFilter] = useState<"all" | "crucible" | "foundry">("all");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
            <Activity className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Activity Feed</h1>
            <p className="text-gray-400">Your recent AI and ML activity</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-pyrax-orange text-white"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          All Activity
        </button>
        <button
          onClick={() => setFilter("crucible")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "crucible"
              ? "bg-purple-500 text-white"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          Crucible
        </button>
        <button
          onClick={() => setFilter("foundry")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "foundry"
              ? "bg-orange-500 text-white"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          <Flame className="h-4 w-4" />
          Foundry
        </button>
      </div>

      {/* Activity List */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        {activities.length > 0 ? (
          <div className="space-y-4">
            {/* Activity items would render here */}
          </div>
        ) : (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No activity yet</p>
            <p className="text-sm text-gray-600 mt-1">
              Your AI inference and ML training activity will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
