// React hooks for Foundry ML training
// Provides training job submission, status polling, and model management

import { useState, useCallback, useEffect } from "react";
import { useAccount } from "wagmi";

export interface FoundryJob {
  id: string;
  type: string;
  status: string;
  baseModel: string;
  config: {
    epochs?: number;
    batchSize?: number;
    learningRate?: string;
    maxBudget?: number;
    outputName?: string;
    datasetUrl?: string;
  };
  output?: {
    modelUrl?: string;
    metrics?: {
      finalLoss?: number;
      epochs?: number;
      steps?: number;
    };
  };
  estimatedCost: number;
  actualCost: number | null;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export interface FoundryJobStats {
  pending: number;
  training: number;
  completed: number;
  failed: number;
}

interface SubmitTrainingJobInput {
  type: "finetune" | "train" | "rlhf";
  baseModel: string;
  datasetUrl?: string;
  datasetId?: string;
  config: {
    epochs?: number;
    batchSize?: number;
    learningRate?: string;
    maxBudget?: number;
    outputName?: string;
  };
}

// Hook for submitting and tracking a single Foundry training job
export function useFoundryJob() {
  const { address } = useAccount();
  const [job, setJob] = useState<FoundryJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Submit a training job
  const submitTrainingJob = useCallback(async (input: SubmitTrainingJobInput) => {
    if (!address) {
      setError("Please connect your wallet");
      return null;
    }

    if (!input.datasetUrl && !input.datasetId) {
      setError("Dataset URL or ID is required");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/foundry/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-wallet-address": address,
        },
        body: JSON.stringify({
          walletAddress: address,
          type: input.type,
          baseModel: input.baseModel,
          datasetUrl: input.datasetUrl,
          datasetId: input.datasetId,
          config: input.config,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to submit training job");
      }

      setJob({
        id: data.data.jobId,
        type: input.type,
        status: data.data.status,
        baseModel: data.data.baseModel,
        config: data.data.config,
        estimatedCost: data.data.estimatedCost,
        actualCost: null,
        createdAt: data.data.createdAt,
      });

      return data.data.jobId;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit training job";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Poll for job status
  const pollJobStatus = useCallback(async (jobId: string) => {
    if (!address) return null;

    try {
      const response = await fetch(`/api/v1/foundry/jobs?wallet=${address}`, {
        headers: { "x-wallet-address": address },
      });

      const data = await response.json();

      if (data.success) {
        const foundJob = data.data.jobs.find((j: FoundryJob) => j.id === jobId);
        if (foundJob) {
          setJob(foundJob);
          return foundJob;
        }
      }
      return null;
    } catch {
      return null;
    }
  }, [address]);

  // Clear current job
  const clearJob = useCallback(() => {
    setJob(null);
    setError(null);
  }, []);

  return {
    job,
    loading,
    error,
    submitTrainingJob,
    pollJobStatus,
    clearJob,
  };
}

// Hook for fetching user's Foundry job history
export function useFoundryJobs(options?: { pollInterval?: number }) {
  const { address } = useAccount();
  const [jobs, setJobs] = useState<FoundryJob[]>([]);
  const [stats, setStats] = useState<FoundryJobStats>({ pending: 0, training: 0, completed: 0, failed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    if (!address) {
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/v1/foundry/jobs?wallet=${address}`, {
        headers: { "x-wallet-address": address },
      });

      const data = await response.json();

      if (data.success) {
        setJobs(data.data.jobs);
        setStats(data.data.stats);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch training jobs");
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Initial fetch
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Polling
  useEffect(() => {
    if (!options?.pollInterval || !address) return;

    const interval = setInterval(fetchJobs, options.pollInterval);
    return () => clearInterval(interval);
  }, [fetchJobs, options?.pollInterval, address]);

  return {
    jobs,
    stats,
    loading,
    error,
    refresh: fetchJobs,
  };
}

// Hook for a single training job with auto-polling until completion
export function useFoundryJobWithPolling(jobId: string | null, pollInterval = 5000) {
  const { address } = useAccount();
  const [job, setJob] = useState<FoundryJob | null>(null);
  const [loading, setLoading] = useState(!!jobId);

  useEffect(() => {
    if (!jobId || !address) {
      setJob(null);
      setLoading(false);
      return;
    }

    let intervalId: NodeJS.Timeout | null = null;

    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/v1/foundry/jobs?wallet=${address}`, {
          headers: { "x-wallet-address": address },
        });

        const data = await response.json();

        if (data.success) {
          const foundJob = data.data.jobs.find((j: FoundryJob) => j.id === jobId);
          if (foundJob) {
            setJob(foundJob);
            
            // Stop polling if job is complete
            if (["completed", "failed", "cancelled"].includes(foundJob.status)) {
              if (intervalId) clearInterval(intervalId);
            }
          }
        }
      } catch {
        // Silent fail for polling
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchJob();

    // Start polling (less frequent for training jobs)
    intervalId = setInterval(fetchJob, pollInterval);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [jobId, address, pollInterval]);

  return { job, loading };
}

// Hook for user's trained models
export function useTrainedModels() {
  const { address } = useAccount();
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchModels = useCallback(async () => {
    if (!address) {
      setModels([]);
      setLoading(false);
      return;
    }

    // For now, extract completed training jobs as models
    try {
      const response = await fetch(`/api/v1/foundry/jobs?wallet=${address}&status=completed`, {
        headers: { "x-wallet-address": address },
      });

      const data = await response.json();

      if (data.success) {
        const trainedModels = data.data.jobs.map((job: FoundryJob) => ({
          id: job.id,
          name: job.config.outputName || `${job.baseModel}-finetuned`,
          baseModel: job.baseModel,
          type: job.type,
          createdAt: job.completedAt || job.createdAt,
          metrics: job.output?.metrics,
          modelUrl: job.output?.modelUrl,
        }));
        setModels(trainedModels);
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return { models, loading, refresh: fetchModels };
}
