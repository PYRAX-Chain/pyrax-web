"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Brain,
  GitBranch,
  Users,
  Layers,
  Clock,
  Play,
  Settings,
  ChevronRight,
  Upload,
  Database,
  Cpu,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const trainingTypes = [
  {
    id: "supervised",
    name: "Supervised Learning",
    description: "Train models on labeled datasets with full control",
    icon: Brain,
    vram: "8-80 GB",
    color: "blue",
  },
  {
    id: "finetune",
    name: "Fine-Tuning (LoRA)",
    description: "Efficiently adapt pre-trained models to your data",
    icon: GitBranch,
    vram: "8-24 GB",
    color: "purple",
  },
  {
    id: "federated",
    name: "Federated Learning",
    description: "Train across distributed data without sharing it",
    icon: Users,
    vram: "4-16 GB",
    color: "green",
  },
  {
    id: "rlhf",
    name: "RLHF Training",
    description: "Align models with human preferences",
    icon: Layers,
    vram: "24-80 GB",
    color: "orange",
  },
];

const baseModels = [
  { id: "llama-3-8b", name: "Llama 3 8B", provider: "Meta", params: "8B", costPerHour: 0.15 },
  { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta", params: "70B", costPerHour: 0.95 },
  { id: "mistral-7b", name: "Mistral 7B", provider: "Mistral", params: "7B", costPerHour: 0.12 },
  { id: "mixtral-8x7b", name: "Mixtral 8x7B", provider: "Mistral", params: "46.7B", costPerHour: 0.55 },
  { id: "codellama-34b", name: "CodeLlama 34B", provider: "Meta", params: "34B", costPerHour: 0.45 },
  { id: "phi-3-mini", name: "Phi-3 Mini", provider: "Microsoft", params: "3.8B", costPerHour: 0.08 },
];

export default function FoundryPage() {
  const [activeTab, setActiveTab] = useState<"new" | "jobs" | "models">("new");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Flame className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Foundry ML</h1>
            <p className="text-gray-400">Decentralized Machine Learning Training</p>
          </div>
        </div>
        <Link
          href="/docs/foundry"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          Documentation
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-white/5 w-fit">
        {[
          { id: "new", label: "New Job" },
          { id: "jobs", label: "My Jobs" },
          { id: "models", label: "Base Models" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-pyrax-orange text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "new" && (
        <div className="space-y-8">
          {/* Step 1: Select Training Type */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">1. Select Training Type</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trainingTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-5 rounded-xl text-left transition-all ${
                    selectedType === type.id
                      ? "bg-orange-500/20 border-2 border-orange-500"
                      : "bg-white/5 border border-white/10 hover:border-orange-500/30"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-${type.color}-500/20 flex items-center justify-center mb-4`}>
                    <type.icon className={`h-6 w-6 text-${type.color}-400`} />
                  </div>
                  <h3 className="font-semibold text-white">{type.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{type.description}</p>
                  <div className="text-xs text-gray-500 mt-2">VRAM: {type.vram}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Base Model */}
          {selectedType && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">2. Select Base Model</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {baseModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedModel === model.id
                        ? "bg-orange-500/20 border-2 border-orange-500"
                        : "bg-white/5 border border-white/10 hover:border-orange-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{model.name}</h3>
                      <span className="text-xs text-gray-500">{model.params}</span>
                    </div>
                    <div className="text-sm text-gray-400">{model.provider}</div>
                    <div className="text-sm text-orange-400 mt-2">${model.costPerHour}/hr</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Upload Dataset */}
          {selectedModel && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">3. Upload Training Data</h2>
              <div className="p-8 rounded-xl border-2 border-dashed border-white/20 hover:border-orange-500/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-white font-medium">Drop your dataset here</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Supports JSONL, CSV, Parquet, or IPFS hash
                  </p>
                  <button className="mt-4 px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Configure & Submit */}
          {selectedModel && (
            <div className="p-6 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <h2 className="text-lg font-semibold text-white mb-4">4. Training Configuration</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Epochs</label>
                  <input
                    type="number"
                    defaultValue={3}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Batch Size</label>
                  <input
                    type="number"
                    defaultValue={4}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Learning Rate</label>
                  <input
                    type="text"
                    defaultValue="2e-5"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Max Budget (PYRX)</label>
                  <input
                    type="number"
                    defaultValue={500}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-colors flex items-center justify-center gap-2">
                <Play className="h-5 w-5" />
                Start Training Job
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "jobs" && (
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No training jobs yet</p>
            <p className="text-sm text-gray-600 mt-1">
              Create a new training job to see it here
            </p>
            <button
              onClick={() => setActiveTab("new")}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors"
            >
              <Play className="h-4 w-4" />
              Create Training Job
            </button>
          </div>
        </div>
      )}

      {activeTab === "models" && (
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Available Base Models</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Model</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Provider</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Parameters</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Cost/Hour</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {baseModels.map((model) => (
                  <tr key={model.id} className="border-b border-white/5">
                    <td className="py-3 px-4 text-white font-medium">{model.name}</td>
                    <td className="py-3 px-4 text-gray-400">{model.provider}</td>
                    <td className="py-3 px-4 text-gray-400">{model.params}</td>
                    <td className="py-3 px-4 text-right text-orange-400">${model.costPerHour} PYRX</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedModel(model.id);
                          setActiveTab("new");
                        }}
                        className="text-orange-400 hover:underline"
                      >
                        Train
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <Cpu className="h-8 w-8 text-orange-400" />
            <div>
              <div className="text-2xl font-bold text-white">1,842</div>
              <div className="text-sm text-gray-400">GPUs Available</div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">156</div>
              <div className="text-sm text-gray-400">Jobs in Queue</div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-cyan-400" />
            <div>
              <div className="text-2xl font-bold text-white">~2.5h</div>
              <div className="text-sm text-gray-400">Avg. Job Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
