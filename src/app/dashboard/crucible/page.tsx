"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  Code,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  Settings,
  ChevronRight,
} from "lucide-react";

const models = {
  text: [
    { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta", costPer1k: 0.5 },
    { id: "llama-3-8b", name: "Llama 3 8B", provider: "Meta", costPer1k: 0.1 },
    { id: "mistral-7b", name: "Mistral 7B", provider: "Mistral", costPer1k: 0.08 },
    { id: "mixtral-8x7b", name: "Mixtral 8x7B", provider: "Mistral", costPer1k: 0.3 },
    { id: "codellama-34b", name: "CodeLlama 34B", provider: "Meta", costPer1k: 0.25 },
  ],
  image: [
    { id: "sd-xl", name: "Stable Diffusion XL", provider: "Stability", costPerImage: 0.02 },
    { id: "sd-3", name: "Stable Diffusion 3", provider: "Stability", costPerImage: 0.05 },
    { id: "flux-schnell", name: "Flux Schnell", provider: "Black Forest", costPerImage: 0.01 },
    { id: "flux-dev", name: "Flux Dev", provider: "Black Forest", costPerImage: 0.03 },
  ],
};

const jobTypes = [
  {
    id: "text",
    name: "Text Generation",
    description: "Generate text with LLMs like Llama 3, Mistral, and more",
    icon: MessageSquare,
    href: "/dashboard/crucible/text",
    color: "purple",
  },
  {
    id: "image",
    name: "Image Generation",
    description: "Create images with Stable Diffusion, Flux, and DALL-E",
    icon: ImageIcon,
    href: "/dashboard/crucible/image",
    color: "pink",
  },
  {
    id: "code",
    name: "Code Generation",
    description: "Generate and analyze code with CodeLlama and StarCoder",
    icon: Code,
    href: "/dashboard/crucible/code",
    color: "cyan",
  },
  {
    id: "embedding",
    name: "Embeddings",
    description: "Generate vector embeddings for semantic search",
    icon: Zap,
    href: "/dashboard/crucible/embeddings",
    color: "green",
  },
];

export default function CruciblePage() {
  const [activeTab, setActiveTab] = useState<"playground" | "jobs" | "models">("playground");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Crucible AI</h1>
            <p className="text-gray-400">AI Inference Platform</p>
          </div>
        </div>
        <Link
          href="/docs/crucible"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          Documentation
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-white/5 w-fit">
        {["playground", "jobs", "models"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-pyrax-orange text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "playground" && (
        <>
          {/* Job Types Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobTypes.map((type) => (
              <Link
                key={type.id}
                href={type.href}
                className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-${type.color}-500/20 flex items-center justify-center mb-4`}
                >
                  <type.icon className={`h-6 w-6 text-${type.color}-400`} />
                </div>
                <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                  {type.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{type.description}</p>
              </Link>
            ))}
          </div>

          {/* Quick Start */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-violet-600/10 border border-purple-500/20">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Start</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Text Generation Example */}
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  <span className="font-medium text-white">Text Generation</span>
                </div>
                <pre className="text-xs font-mono text-gray-400 overflow-x-auto p-3 rounded bg-black/30">
{`curl -X POST https://api.pyrax.network/v1/crucible/text \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama-3-8b",
    "prompt": "Explain blockchain in simple terms",
    "max_tokens": 100
  }'`}
                </pre>
              </div>

              {/* Image Generation Example */}
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="h-5 w-5 text-pink-400" />
                  <span className="font-medium text-white">Image Generation</span>
                </div>
                <pre className="text-xs font-mono text-gray-400 overflow-x-auto p-3 rounded bg-black/30">
{`curl -X POST https://api.pyrax.network/v1/crucible/image \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "flux-schnell",
    "prompt": "A futuristic city at sunset",
    "size": "1024x1024"
  }'`}
                </pre>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "jobs" && (
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No Crucible jobs yet</p>
            <p className="text-sm text-gray-600 mt-1">
              Run a text or image generation job to see it here
            </p>
            <Link
              href="/dashboard/crucible/text"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
            >
              <Play className="h-4 w-4" />
              Start First Job
            </Link>
          </div>
        </div>
      )}

      {activeTab === "models" && (
        <div className="space-y-6">
          {/* Text Models */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Text Models</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Cost (per 1K tokens)</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {models.text.map((model) => (
                    <tr key={model.id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white font-medium">{model.name}</td>
                      <td className="py-3 px-4 text-gray-400">{model.provider}</td>
                      <td className="py-3 px-4 text-right text-pyrax-orange">{model.costPer1k} PYRX</td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/dashboard/crucible/text?model=${model.id}`}
                          className="text-purple-400 hover:underline"
                        >
                          Try it
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Image Models */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Image Models</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Cost (per image)</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {models.image.map((model) => (
                    <tr key={model.id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white font-medium">{model.name}</td>
                      <td className="py-3 px-4 text-gray-400">{model.provider}</td>
                      <td className="py-3 px-4 text-right text-pyrax-orange">{model.costPerImage} PYRX</td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/dashboard/crucible/image?model=${model.id}`}
                          className="text-purple-400 hover:underline"
                        >
                          Try it
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
