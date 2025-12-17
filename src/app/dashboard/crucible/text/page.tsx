"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import {
  MessageSquare,
  ArrowLeft,
  Send,
  Loader2,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useCrucibleJob, useCrucibleJobWithPolling } from "@/hooks/useCrucible";

const TEXT_MODELS = [
  { id: "llama-3.1-70b", name: "Llama 3.1 70B", provider: "Meta", costPer1k: 0.5, badge: "Popular" },
  { id: "llama-3.1-8b", name: "Llama 3.1 8B", provider: "Meta", costPer1k: 0.1, badge: "Fast" },
  { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta", costPer1k: 0.45, badge: null },
  { id: "llama-3-8b", name: "Llama 3 8B", provider: "Meta", costPer1k: 0.08, badge: null },
  { id: "mistral-7b", name: "Mistral 7B", provider: "Mistral AI", costPer1k: 0.06, badge: null },
  { id: "mixtral-8x7b", name: "Mixtral 8x7B MoE", provider: "Mistral AI", costPer1k: 0.25, badge: "Best Value" },
  { id: "phi-3-mini", name: "Phi-3 Mini 3.8B", provider: "Microsoft", costPer1k: 0.03, badge: "Compact" },
];

export default function CrucibleTextPage() {
  const { isConnected, address } = useAccount();
  const { submitTextJob, loading: submitting, error: submitError, clearJob } = useCrucibleJob();
  
  const [selectedModel, setSelectedModel] = useState(TEXT_MODELS[0].id);
  const [prompt, setPrompt] = useState("");
  const [maxTokens, setMaxTokens] = useState(256);
  const [temperature, setTemperature] = useState(0.7);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Poll for job status
  const { job: activeJob, loading: jobLoading } = useCrucibleJobWithPolling(activeJobId);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    const jobId = await submitTextJob({
      model: selectedModel,
      prompt: prompt.trim(),
      maxTokens,
      temperature,
    });

    if (jobId) {
      setActiveJobId(jobId);
    }
  };

  // Copy output to clipboard
  const handleCopy = () => {
    if (activeJob?.output) {
      const text = (activeJob.output as any).text || JSON.stringify(activeJob.output);
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Reset for new generation
  const handleNewGeneration = () => {
    setActiveJobId(null);
    setPrompt("");
    clearJob();
  };

  // Get estimated cost
  const estimatedCost = () => {
    const model = TEXT_MODELS.find(m => m.id === selectedModel);
    if (!model || !prompt) return 0;
    const promptTokens = Math.ceil(prompt.length / 4);
    return ((promptTokens + maxTokens) / 1000) * model.costPer1k;
  };

  // Status display
  const getStatusDisplay = () => {
    if (!activeJob) return null;
    
    switch (activeJob.status) {
      case "pending":
      case "queued":
        return { icon: Clock, text: "Queued...", color: "text-yellow-400" };
      case "assigned":
      case "processing":
        return { icon: Loader2, text: "Generating...", color: "text-blue-400", spin: true };
      case "completed":
        return { icon: CheckCircle, text: "Complete", color: "text-green-400" };
      case "failed":
        return { icon: AlertCircle, text: "Failed", color: "text-red-400" };
      default:
        return { icon: Clock, text: activeJob.status, color: "text-gray-400" };
    }
  };

  const status = getStatusDisplay();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/crucible"
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-400" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Text Generation</h1>
            <p className="text-sm text-gray-400">Generate text with LLMs</p>
          </div>
        </div>
      </div>

      {!isConnected ? (
        <div className="p-8 rounded-xl bg-white/5 border border-white/10 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Connect Wallet</h3>
          <p className="text-gray-400">Please connect your wallet to use Crucible AI</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Model Selection */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <label className="block text-sm font-medium text-gray-300 mb-3">Model</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {TEXT_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setSelectedModel(model.id)}
                      className={`p-3 rounded-lg text-left transition-all ${
                        selectedModel === model.id
                          ? "bg-purple-500/20 border-2 border-purple-500"
                          : "bg-white/5 border border-white/10 hover:border-purple-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white text-sm">{model.name}</span>
                        {model.badge && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400">
                            {model.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{model.costPer1k} PYRX/1K</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <label className="block text-sm font-medium text-gray-300 mb-3">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here..."
                  className="w-full h-40 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500"
                  disabled={!!activeJobId && activeJob?.status !== "completed" && activeJob?.status !== "failed"}
                />
              </div>

              {/* Parameters */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Parameters</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Max Tokens: {maxTokens}</label>
                    <input
                      type="range"
                      min="32"
                      max="2048"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Temperature: {temperature}</label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Estimated cost: <span className="text-purple-400 font-medium">{estimatedCost().toFixed(4)} PYRX</span>
                </div>
                {activeJobId && (activeJob?.status === "completed" || activeJob?.status === "failed") ? (
                  <button
                    type="button"
                    onClick={handleNewGeneration}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    New Generation
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!prompt.trim() || submitting || (activeJobId && activeJob?.status !== "completed" && activeJob?.status !== "failed")}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white font-medium hover:from-purple-600 hover:to-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Generate
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Error Display */}
            {submitError && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                <AlertCircle className="h-4 w-4 inline mr-2" />
                {submitError}
              </div>
            )}

            {/* Output Display */}
            {activeJob && (
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {status && (
                      <>
                        <status.icon className={`h-4 w-4 ${status.color} ${status.spin ? "animate-spin" : ""}`} />
                        <span className={`text-sm font-medium ${status.color}`}>{status.text}</span>
                      </>
                    )}
                  </div>
                  {activeJob.status === "completed" && activeJob.output && (
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>

                {activeJob.status === "completed" && activeJob.output ? (
                  <div className="p-4 rounded-lg bg-black/30 text-white whitespace-pre-wrap font-mono text-sm">
                    {(activeJob.output as any).text || JSON.stringify(activeJob.output, null, 2)}
                  </div>
                ) : activeJob.status === "failed" ? (
                  <div className="p-4 rounded-lg bg-red-500/10 text-red-400">
                    {activeJob.error || "Generation failed. Please try again."}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-black/30 text-gray-500 flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing your request...
                  </div>
                )}

                {activeJob.actualCost && (
                  <div className="mt-3 text-xs text-gray-500">
                    Cost: {activeJob.actualCost.toFixed(4)} PYRX
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Credits */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span className="font-medium text-white">Your Credits</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">10.00</div>
              <div className="text-sm text-gray-400">PYRX available</div>
              <Link
                href="/dashboard/billing"
                className="block mt-4 text-center py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors text-sm"
              >
                Add Credits
              </Link>
            </div>

            {/* Tips */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-medium text-white mb-3">Tips</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Be specific in your prompts for better results</li>
                <li>• Lower temperature = more deterministic output</li>
                <li>• Higher max tokens = longer responses (more cost)</li>
                <li>• Llama 3.1 70B offers best quality</li>
                <li>• Phi-3 Mini is fastest for simple tasks</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
