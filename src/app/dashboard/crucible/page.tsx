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
  Database,
  Mic,
  Bot,
  Star,
} from "lucide-react";

// Models matching Desktop app + additional high-value options
const models = {
  text: [
    { id: "llama-3.1-405b", name: "Llama 3.1 405B", provider: "Meta", costPer1k: 1.5, vram: 800, badge: "Most Powerful" },
    { id: "llama-3.1-70b", name: "Llama 3.1 70B", provider: "Meta", costPer1k: 0.5, vram: 140, badge: "Popular" },
    { id: "llama-3.1-8b", name: "Llama 3.1 8B", provider: "Meta", costPer1k: 0.1, vram: 16, badge: null },
    { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta", costPer1k: 0.45, vram: 140, badge: null },
    { id: "llama-3-8b", name: "Llama 3 8B", provider: "Meta", costPer1k: 0.08, vram: 16, badge: "Fast" },
    { id: "mistral-7b", name: "Mistral 7B", provider: "Mistral AI", costPer1k: 0.06, vram: 14, badge: null },
    { id: "mixtral-8x7b", name: "Mixtral 8x7B MoE", provider: "Mistral AI", costPer1k: 0.25, vram: 95, badge: "Best Value" },
    { id: "mixtral-8x22b", name: "Mixtral 8x22B MoE", provider: "Mistral AI", costPer1k: 0.8, vram: 280, badge: "New" },
    { id: "phi-3-mini", name: "Phi-3 Mini 3.8B", provider: "Microsoft", costPer1k: 0.03, vram: 8, badge: "Compact" },
    { id: "phi-3-medium", name: "Phi-3 Medium 14B", provider: "Microsoft", costPer1k: 0.12, vram: 28, badge: null },
    { id: "qwen2-72b", name: "Qwen2 72B", provider: "Alibaba", costPer1k: 0.4, vram: 144, badge: "Multilingual" },
    { id: "gemma-2-27b", name: "Gemma 2 27B", provider: "Google", costPer1k: 0.2, vram: 54, badge: null },
  ],
  code: [
    { id: "codellama-70b", name: "CodeLlama 70B", provider: "Meta", costPer1k: 0.5, vram: 140, badge: "Best for Code" },
    { id: "codellama-34b", name: "CodeLlama 34B", provider: "Meta", costPer1k: 0.25, vram: 68, badge: null },
    { id: "codellama-13b", name: "CodeLlama 13B", provider: "Meta", costPer1k: 0.12, vram: 26, badge: null },
    { id: "deepseek-coder-33b", name: "DeepSeek Coder 33B", provider: "DeepSeek", costPer1k: 0.22, vram: 66, badge: "Popular" },
    { id: "deepseek-coder-6.7b", name: "DeepSeek Coder 6.7B", provider: "DeepSeek", costPer1k: 0.05, vram: 14, badge: "Fast" },
    { id: "starcoder2-15b", name: "StarCoder2 15B", provider: "BigCode", costPer1k: 0.15, vram: 30, badge: null },
    { id: "wizardcoder-34b", name: "WizardCoder 34B", provider: "WizardLM", costPer1k: 0.25, vram: 68, badge: null },
  ],
  image: [
    { id: "flux-1.1-pro", name: "Flux 1.1 Pro", provider: "Black Forest Labs", costPerImage: 0.08, vram: 32, badge: "Highest Quality" },
    { id: "flux-dev", name: "Flux Dev", provider: "Black Forest Labs", costPerImage: 0.04, vram: 24, badge: "Popular" },
    { id: "flux-schnell", name: "Flux Schnell", provider: "Black Forest Labs", costPerImage: 0.015, vram: 16, badge: "Fast" },
    { id: "sdxl", name: "Stable Diffusion XL", provider: "Stability AI", costPerImage: 0.025, vram: 12, badge: null },
    { id: "sd-turbo", name: "SD Turbo", provider: "Stability AI", costPerImage: 0.008, vram: 8, badge: "Fastest" },
    { id: "sd-3", name: "Stable Diffusion 3", provider: "Stability AI", costPerImage: 0.05, vram: 16, badge: "New" },
    { id: "sd-1.5", name: "Stable Diffusion 1.5", provider: "Runway", costPerImage: 0.005, vram: 4, badge: "Budget" },
    { id: "kandinsky-3", name: "Kandinsky 3", provider: "Sber AI", costPerImage: 0.02, vram: 12, badge: null },
    { id: "playground-v2.5", name: "Playground v2.5", provider: "Playground AI", costPerImage: 0.03, vram: 16, badge: null },
  ],
  embedding: [
    { id: "bge-large", name: "BGE Large", provider: "BAAI", costPer1k: 0.01, vram: 2, badge: "Best for RAG" },
    { id: "bge-m3", name: "BGE M3", provider: "BAAI", costPer1k: 0.015, vram: 4, badge: "Multilingual" },
    { id: "e5-large", name: "E5 Large v2", provider: "Microsoft", costPer1k: 0.01, vram: 2, badge: null },
    { id: "e5-mistral-7b", name: "E5 Mistral 7B", provider: "Microsoft", costPer1k: 0.05, vram: 14, badge: "Highest Quality" },
    { id: "gte-large", name: "GTE Large", provider: "Alibaba", costPer1k: 0.01, vram: 2, badge: null },
    { id: "nomic-embed", name: "Nomic Embed", provider: "Nomic AI", costPer1k: 0.008, vram: 1, badge: "Fast" },
    { id: "jina-v2", name: "Jina Embeddings v2", provider: "Jina AI", costPer1k: 0.012, vram: 2, badge: "8K Context" },
  ],
  audio: [
    { id: "whisper-large-v3", name: "Whisper Large v3", provider: "OpenAI", costPerMin: 0.02, vram: 10, badge: "Best Accuracy" },
    { id: "whisper-medium", name: "Whisper Medium", provider: "OpenAI", costPerMin: 0.01, vram: 5, badge: null },
    { id: "whisper-small", name: "Whisper Small", provider: "OpenAI", costPerMin: 0.005, vram: 2, badge: "Fast" },
    { id: "seamless-m4t", name: "SeamlessM4T", provider: "Meta", costPerMin: 0.025, vram: 12, badge: "Translation" },
  ],
  vision: [
    { id: "llava-1.6-34b", name: "LLaVA 1.6 34B", provider: "LLaVA Team", costPer1k: 0.3, vram: 68, badge: "Best Vision" },
    { id: "llava-1.6-13b", name: "LLaVA 1.6 13B", provider: "LLaVA Team", costPer1k: 0.15, vram: 26, badge: null },
    { id: "clip-vit-l", name: "CLIP ViT-L/14", provider: "OpenAI", costPer1k: 0.02, vram: 4, badge: "Classification" },
    { id: "blip-2", name: "BLIP-2", provider: "Salesforce", costPer1k: 0.05, vram: 8, badge: "Captioning" },
    { id: "cogvlm-17b", name: "CogVLM 17B", provider: "THUDM", costPer1k: 0.18, vram: 34, badge: null },
  ],
};

const jobTypes = [
  {
    id: "text",
    name: "Text Generation",
    description: "LLMs: Llama 3.1, Mistral, Mixtral, Phi-3, Qwen2",
    icon: MessageSquare,
    href: "/dashboard/crucible/text",
    color: "purple",
    count: models.text.length,
  },
  {
    id: "image",
    name: "Image Generation",
    description: "Flux, Stable Diffusion XL/3, Kandinsky, Playground",
    icon: ImageIcon,
    href: "/dashboard/crucible/image",
    color: "pink",
    count: models.image.length,
  },
  {
    id: "code",
    name: "Code Generation",
    description: "CodeLlama, DeepSeek Coder, StarCoder2, WizardCoder",
    icon: Code,
    href: "/dashboard/crucible/code",
    color: "cyan",
    count: models.code.length,
  },
  {
    id: "embedding",
    name: "Embeddings",
    description: "BGE, E5, GTE, Nomic, Jina for RAG & search",
    icon: Database,
    href: "/dashboard/crucible/embeddings",
    color: "green",
    count: models.embedding.length,
  },
  {
    id: "audio",
    name: "Audio & Speech",
    description: "Whisper transcription, SeamlessM4T translation",
    icon: Mic,
    href: "/dashboard/crucible/audio",
    color: "yellow",
    count: models.audio.length,
  },
  {
    id: "vision",
    name: "Vision & Multimodal",
    description: "LLaVA, CLIP, BLIP-2 for image understanding",
    icon: Bot,
    href: "/dashboard/crucible/vision",
    color: "orange",
    count: models.vision.length,
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
          {/* Total model count */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="text-white font-medium">
              {Object.values(models).flat().length} Models Available
            </span>
            <span>•</span>
            <span>100% Open Source</span>
            <span>•</span>
            <span>No API Keys Required</span>
          </div>

          {/* Text Models */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Text Generation</h3>
              <span className="text-xs text-gray-500">{models.text.length} models</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">VRAM</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Cost/1K tokens</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {models.text.map((model) => (
                    <tr key={model.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{model.name}</span>
                          {model.badge && <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">{model.badge}</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{model.provider}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{model.vram}GB</td>
                      <td className="py-3 px-4 text-right text-pyrax-orange font-medium">{model.costPer1k} PYRX</td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/dashboard/crucible/text?model=${model.id}`} className="text-purple-400 hover:underline">Try it</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Models */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Code className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Code Generation</h3>
              <span className="text-xs text-gray-500">{models.code.length} models</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">VRAM</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Cost/1K tokens</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {models.code.map((model) => (
                    <tr key={model.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{model.name}</span>
                          {model.badge && <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400">{model.badge}</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{model.provider}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{model.vram}GB</td>
                      <td className="py-3 px-4 text-right text-pyrax-orange font-medium">{model.costPer1k} PYRX</td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/dashboard/crucible/code?model=${model.id}`} className="text-cyan-400 hover:underline">Try it</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Image Models */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="h-5 w-5 text-pink-400" />
              <h3 className="text-lg font-semibold text-white">Image Generation</h3>
              <span className="text-xs text-gray-500">{models.image.length} models</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">VRAM</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Cost/Image</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {models.image.map((model) => (
                    <tr key={model.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{model.name}</span>
                          {model.badge && <span className="text-xs px-2 py-0.5 rounded bg-pink-500/20 text-pink-400">{model.badge}</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{model.provider}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{model.vram}GB</td>
                      <td className="py-3 px-4 text-right text-pyrax-orange font-medium">{model.costPerImage} PYRX</td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/dashboard/crucible/image?model=${model.id}`} className="text-pink-400 hover:underline">Try it</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Embedding Models */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Embeddings</h3>
              <span className="text-xs text-gray-500">{models.embedding.length} models</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">VRAM</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Cost/1K tokens</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {models.embedding.map((model) => (
                    <tr key={model.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{model.name}</span>
                          {model.badge && <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">{model.badge}</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{model.provider}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{model.vram}GB</td>
                      <td className="py-3 px-4 text-right text-pyrax-orange font-medium">{model.costPer1k} PYRX</td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/dashboard/crucible/embeddings?model=${model.id}`} className="text-green-400 hover:underline">Try it</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audio Models */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Mic className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Audio & Speech</h3>
              <span className="text-xs text-gray-500">{models.audio.length} models</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">VRAM</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Cost/Minute</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {models.audio.map((model) => (
                    <tr key={model.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{model.name}</span>
                          {model.badge && <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">{model.badge}</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{model.provider}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{model.vram}GB</td>
                      <td className="py-3 px-4 text-right text-pyrax-orange font-medium">{model.costPerMin} PYRX</td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/dashboard/crucible/audio?model=${model.id}`} className="text-yellow-400 hover:underline">Try it</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vision Models */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="h-5 w-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Vision & Multimodal</h3>
              <span className="text-xs text-gray-500">{models.vision.length} models</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">VRAM</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Cost/1K tokens</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {models.vision.map((model) => (
                    <tr key={model.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{model.name}</span>
                          {model.badge && <span className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">{model.badge}</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{model.provider}</td>
                      <td className="py-3 px-4 text-center text-gray-500">{model.vram}GB</td>
                      <td className="py-3 px-4 text-right text-pyrax-orange font-medium">{model.costPer1k} PYRX</td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/dashboard/crucible/vision?model=${model.id}`} className="text-orange-400 hover:underline">Try it</Link>
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
