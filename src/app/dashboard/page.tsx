"use client";

import Link from "next/link";
import {
  Sparkles,
  Flame,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Image as ImageIcon,
  MessageSquare,
  Brain,
} from "lucide-react";

const quickActions = [
  {
    title: "Generate Text",
    description: "Run LLM inference with Llama, Mistral, or GPT models",
    href: "/dashboard/crucible/text",
    icon: MessageSquare,
    color: "from-purple-500 to-violet-600",
  },
  {
    title: "Generate Image",
    description: "Create images with Stable Diffusion or Flux",
    href: "/dashboard/crucible/image",
    icon: ImageIcon,
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Train Model",
    description: "Fine-tune or train models on distributed GPUs",
    href: "/dashboard/foundry/train",
    icon: Brain,
    color: "from-orange-500 to-red-600",
  },
  {
    title: "API Integration",
    description: "Get API keys for programmatic access",
    href: "/dashboard/api-keys",
    icon: Zap,
    color: "from-cyan-500 to-blue-600",
  },
];

const recentJobs = [
  // Demo data - will be fetched from API
];

const stats = [
  { label: "Crucible Jobs", value: "0", icon: Sparkles, change: "+0%" },
  { label: "Foundry Jobs", value: "0", icon: Flame, change: "+0%" },
  { label: "PYRX Spent", value: "0", icon: TrendingUp, change: "+0%" },
  { label: "GPU Hours", value: "0", icon: Cpu, change: "+0%" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">
          Manage your Crucible AI and Foundry ML jobs
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-5 w-5 text-pyrax-orange" />
              <span className="text-xs text-green-400">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}
              >
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white group-hover:text-pyrax-orange transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Jobs</h2>
            <Link
              href="/dashboard/history"
              className="text-sm text-pyrax-orange hover:underline"
            >
              View all
            </Link>
          </div>

          {recentJobs.length > 0 ? (
            <div className="space-y-3">
              {/* Job items would go here */}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500">No jobs yet</p>
              <p className="text-sm text-gray-600 mt-1">
                Start by creating a Crucible or Foundry job
              </p>
            </div>
          )}
        </div>

        {/* Getting Started */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-pyrax-orange/10 to-purple-500/10 border border-pyrax-orange/20">
          <h2 className="text-lg font-semibold text-white mb-4">
            Getting Started
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Connect Wallet</h3>
                <p className="text-sm text-gray-400">
                  Your wallet is connected and ready to use
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-gray-400">2</span>
              </div>
              <div>
                <h3 className="font-medium text-white">Add PYRX Credits</h3>
                <p className="text-sm text-gray-400">
                  Deposit PYRX to pay for AI and ML jobs
                </p>
                <Link
                  href="/dashboard/billing"
                  className="inline-flex items-center gap-1 text-pyrax-orange text-sm mt-1 hover:underline"
                >
                  Add credits <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-gray-400">3</span>
              </div>
              <div>
                <h3 className="font-medium text-white">Run Your First Job</h3>
                <p className="text-sm text-gray-400">
                  Try text generation, image creation, or model training
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-gray-400">4</span>
              </div>
              <div>
                <h3 className="font-medium text-white">Integrate via API</h3>
                <p className="text-sm text-gray-400">
                  Use our REST API or CLI for programmatic access
                </p>
                <Link
                  href="/dashboard/api-keys"
                  className="inline-flex items-center gap-1 text-pyrax-orange text-sm mt-1 hover:underline"
                >
                  Get API key <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crucible & Foundry Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Link
          href="/dashboard/crucible"
          className="group p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-600/10 border border-purple-500/20 hover:border-purple-500/40 transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                Crucible AI
              </h2>
              <p className="text-sm text-gray-400">AI Inference Platform</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            Run LLMs, generate images, and call AI from smart contracts. 
            Powered by distributed GPU workers on the PYRAX network.
          </p>
          <div className="flex items-center gap-2 text-purple-400">
            <span className="text-sm font-medium">Launch Crucible</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>

        <Link
          href="/dashboard/foundry"
          className="group p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 hover:border-orange-500/40 transition-all"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Flame className="h-7 w-7 text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                Foundry ML
              </h2>
              <p className="text-sm text-gray-400">ML Training Platform</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            Train and fine-tune machine learning models on community GPUs.
            70% cheaper than cloud providers with Byzantine-resistant verification.
          </p>
          <div className="flex items-center gap-2 text-orange-400">
            <span className="text-sm font-medium">Launch Foundry</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </div>
  );
}
