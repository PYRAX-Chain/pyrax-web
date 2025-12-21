"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
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
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { useFoundryJob, useFoundryJobs, useFoundryJobWithPolling } from "@/hooks/useFoundry";

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
  const { isConnected, address } = useAccount();
  const { submitTrainingJob, loading: submitting, error: submitError, clearJob } = useFoundryJob();
  const { jobs, stats, loading: jobsLoading, refresh: refreshJobs } = useFoundryJobs({ pollInterval: 5000 });
  
  const [activeTab, setActiveTab] = useState<"new" | "jobs" | "models">("new");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [datasetUrl, setDatasetUrl] = useState("");
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  
  // Training config
  const [epochs, setEpochs] = useState(3);
  const [batchSize, setBatchSize] = useState(4);
  const [learningRate, setLearningRate] = useState("2e-5");
  const [maxBudget, setMaxBudget] = useState(500);
  const [outputName, setOutputName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle training job submission
  const handleSubmitTraining = async () => {
    if (!selectedType || !selectedModel || !datasetUrl) return;
    
    const typeMap: Record<string, "finetune" | "train" | "rlhf"> = {
      supervised: "train",
      finetune: "finetune",
      federated: "train",
      rlhf: "rlhf",
    };

    const jobId = await submitTrainingJob({
      type: typeMap[selectedType] || "finetune",
      baseModel: selectedModel,
      datasetUrl,
      config: {
        epochs,
        batchSize,
        learningRate,
        maxBudget,
        outputName: outputName || `${selectedModel}-finetuned-${Date.now()}`,
      },
    });

    if (jobId) {
      setActiveJobId(jobId);
      setActiveTab("jobs");
      refreshJobs();
    }
  };

  // Handle file selection (simulate upload)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, this would upload to S3/IPFS
      setDatasetUrl(`ipfs://simulated-${file.name}-${Date.now()}`);
    }
  };

  // Get estimated cost
  const estimatedCost = () => {
    if (!selectedModel) return 0;
    const model = baseModels.find(m => m.id === selectedModel);
    if (!model) return 0;
    return model.costPerHour * epochs * 0.5; // Rough estimate
  };

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
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".jsonl,.csv,.parquet"
                className="hidden"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
                  datasetUrl 
                    ? "border-green-500/50 bg-green-500/5" 
                    : "border-white/20 hover:border-orange-500/50"
                }`}
              >
                <div className="text-center">
                  {datasetUrl ? (
                    <>
                      <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                      <p className="text-white font-medium">Dataset Ready</p>
                      <p className="text-sm text-green-400 mt-1 font-mono truncate max-w-md mx-auto">
                        {datasetUrl}
                      </p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setDatasetUrl(""); }}
                        className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-white font-medium">Drop your dataset here</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Supports JSONL, CSV, Parquet, or IPFS hash
                      </p>
                      <button className="mt-4 px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors">
                        Browse Files
                      </button>
                    </>
                  )}
                </div>
              </div>
              {/* Or enter IPFS/URL */}
              <div className="mt-4">
                <label className="block text-sm text-gray-400 mb-2">Or enter dataset URL / IPFS hash</label>
                <input
                  type="text"
                  value={datasetUrl}
                  onChange={(e) => setDatasetUrl(e.target.value)}
                  placeholder="ipfs://... or https://..."
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          {/* Step 4: Configure & Submit */}
          {selectedModel && (
            <div className="p-6 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <h2 className="text-lg font-semibold text-white mb-4">4. Training Configuration</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Epochs</label>
                  <input
                    type="number"
                    value={epochs}
                    onChange={(e) => setEpochs(parseInt(e.target.value) || 1)}
                    min={1}
                    max={100}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Batch Size</label>
                  <input
                    type="number"
                    value={batchSize}
                    onChange={(e) => setBatchSize(parseInt(e.target.value) || 1)}
                    min={1}
                    max={64}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Learning Rate</label>
                  <input
                    type="text"
                    value={learningRate}
                    onChange={(e) => setLearningRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Max Budget (PYRAX)</label>
                  <input
                    type="number"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(parseInt(e.target.value) || 100)}
                    min={10}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Output Name</label>
                  <input
                    type="text"
                    value={outputName}
                    onChange={(e) => setOutputName(e.target.value)}
                    placeholder={`${selectedModel}-finetuned`}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              
              {/* Cost estimate and submit */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-sm text-gray-400">
                  Estimated cost: <span className="text-orange-400 font-medium">{estimatedCost().toFixed(2)} PYRAX</span>
                  <span className="text-gray-500 ml-2">(max: {maxBudget} PYRAX)</span>
                </div>
                <button 
                  onClick={handleSubmitTraining}
                  disabled={!datasetUrl || !isConnected || submitting}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Start Training Job
                    </>
                  )}
                </button>
              </div>

              {/* Error display */}
              {submitError && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  {submitError}
                </div>
              )}

              {/* Requirements notice */}
              {!datasetUrl && (
                <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  Please upload a dataset or enter a dataset URL to continue
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === "jobs" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-gray-400">Pending</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.pending}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
                <span className="text-sm text-gray-400">Training</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.training}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm text-gray-400">Completed</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.completed}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-sm text-gray-400">Failed</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.failed}</div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Training Jobs</h3>
              <button
                onClick={() => refreshJobs()}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${jobsLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {jobs.length > 0 ? (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          job.status === "completed" ? "bg-green-500/20" :
                          job.status === "failed" ? "bg-red-500/20" :
                          job.status === "processing" ? "bg-blue-500/20" :
                          "bg-yellow-500/20"
                        }`}>
                          {job.status === "completed" ? <CheckCircle className="h-5 w-5 text-green-400" /> :
                           job.status === "failed" ? <AlertCircle className="h-5 w-5 text-red-400" /> :
                           job.status === "processing" ? <Loader2 className="h-5 w-5 text-blue-400 animate-spin" /> :
                           <Clock className="h-5 w-5 text-yellow-400" />}
                        </div>
                        <div>
                          <div className="font-medium text-white">{job.config.outputName || `${job.baseModel}-finetuned`}</div>
                          <div className="text-xs text-gray-500">Base: {job.baseModel} • {job.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          job.status === "completed" ? "text-green-400" :
                          job.status === "failed" ? "text-red-400" :
                          job.status === "processing" ? "text-blue-400" :
                          "text-yellow-400"
                        }`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress/Details */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mt-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <span>Epochs: {job.config.epochs || 3}</span>
                        <span>Batch: {job.config.batchSize || 4}</span>
                        <span>LR: {job.config.learningRate || "2e-5"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.actualCost && (
                          <span className="text-orange-400">{job.actualCost.toFixed(2)} PYRAX</span>
                        )}
                        {job.status === "completed" && job.output?.modelUrl && (
                          <a
                            href={job.output.modelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Download
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Metrics for completed jobs */}
                    {job.status === "completed" && job.output?.metrics && (
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <span>Final Loss: {job.output.metrics.finalLoss?.toFixed(4)}</span>
                        <span>Steps: {job.output.metrics.steps}</span>
                      </div>
                    )}

                    {/* Error for failed jobs */}
                    {job.status === "failed" && job.error && (
                      <div className="mt-2 p-2 rounded bg-red-500/10 text-red-400 text-sm">
                        {job.error}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
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
            )}
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
                    <td className="py-3 px-4 text-right text-orange-400">${model.costPerHour} PYRAX</td>
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
