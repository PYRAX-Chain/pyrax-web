"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Database,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  Clock,
  Cpu,
  Sparkles,
  Flame,
  ExternalLink,
} from "lucide-react";

const models = [
  { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta", type: "Text", params: "70B", downloads: "125K", rating: 4.9, crucible: true, foundry: true },
  { id: "llama-3-8b", name: "Llama 3 8B", provider: "Meta", type: "Text", params: "8B", downloads: "892K", rating: 4.8, crucible: true, foundry: true },
  { id: "mistral-7b", name: "Mistral 7B", provider: "Mistral AI", type: "Text", params: "7B", downloads: "567K", rating: 4.7, crucible: true, foundry: true },
  { id: "mixtral-8x7b", name: "Mixtral 8x7B", provider: "Mistral AI", type: "Text", params: "46.7B", downloads: "234K", rating: 4.8, crucible: true, foundry: true },
  { id: "sd-xl", name: "Stable Diffusion XL", provider: "Stability AI", type: "Image", params: "3.5B", downloads: "1.2M", rating: 4.9, crucible: true, foundry: false },
  { id: "flux-schnell", name: "Flux Schnell", provider: "Black Forest", type: "Image", params: "12B", downloads: "456K", rating: 4.7, crucible: true, foundry: false },
  { id: "codellama-34b", name: "CodeLlama 34B", provider: "Meta", type: "Code", params: "34B", downloads: "189K", rating: 4.6, crucible: true, foundry: true },
  { id: "phi-3-mini", name: "Phi-3 Mini", provider: "Microsoft", type: "Text", params: "3.8B", downloads: "345K", rating: 4.5, crucible: true, foundry: true },
  { id: "bge-large", name: "BGE Large", provider: "BAAI", type: "Embedding", params: "335M", downloads: "678K", rating: 4.8, crucible: true, foundry: false },
  { id: "whisper-large", name: "Whisper Large", provider: "OpenAI", type: "Audio", params: "1.5B", downloads: "234K", rating: 4.7, crucible: true, foundry: false },
];

const categories = ["All", "Text", "Image", "Code", "Embedding", "Audio"];

export default function ModelsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredModels = models.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                         m.provider.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || m.type === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Database className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Model Registry</h1>
            <p className="text-gray-400">Browse and deploy AI models</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white font-medium transition-colors">
          <Upload className="h-4 w-4" />
          Upload Model
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-pyrax-orange text-white"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-white">{model.name}</h3>
                <p className="text-sm text-gray-400">{model.provider}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                model.type === "Text" ? "bg-purple-500/20 text-purple-400" :
                model.type === "Image" ? "bg-pink-500/20 text-pink-400" :
                model.type === "Code" ? "bg-cyan-500/20 text-cyan-400" :
                model.type === "Embedding" ? "bg-green-500/20 text-green-400" :
                "bg-yellow-500/20 text-yellow-400"
              }`}>
                {model.type}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Cpu className="h-4 w-4" />
                {model.params}
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                {model.downloads}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                {model.rating}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {model.crucible && (
                <span className="flex items-center gap-1 px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs">
                  <Sparkles className="h-3 w-3" />
                  Crucible
                </span>
              )}
              {model.foundry && (
                <span className="flex items-center gap-1 px-2 py-1 rounded bg-orange-500/10 text-orange-400 text-xs">
                  <Flame className="h-3 w-3" />
                  Foundry
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Link
                href={`/dashboard/crucible?model=${model.id}`}
                className="flex-1 py-2 text-center rounded-lg bg-purple-500/20 text-purple-400 text-sm font-medium hover:bg-purple-500/30 transition-colors"
              >
                Run Inference
              </Link>
              {model.foundry && (
                <Link
                  href={`/dashboard/foundry?model=${model.id}`}
                  className="flex-1 py-2 text-center rounded-lg bg-orange-500/20 text-orange-400 text-sm font-medium hover:bg-orange-500/30 transition-colors"
                >
                  Fine-tune
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-12">
          <Database className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">No models found</p>
          <p className="text-sm text-gray-600 mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
