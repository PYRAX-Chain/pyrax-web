// React hooks for Crucible AI inference
// Provides job submission, status polling, and history

import { useState, useCallback, useEffect } from "react";
import { useAccount } from "wagmi";

export interface CrucibleJob {
  id: string;
  type: string;
  status: string;
  model: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  estimatedCost: number;
  actualCost: number | null;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export interface CrucibleJobStats {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
}

interface SubmitTextJobInput {
  model: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

interface SubmitImageJobInput {
  model: string;
  prompt: string;
  negativePrompt?: string;
  size?: string;
  numImages?: number;
  guidanceScale?: number;
}

interface SubmitEmbeddingJobInput {
  model: string;
  text: string;
}

// Hook for submitting and tracking a single Crucible job
export function useCrucibleJob() {
  const { address } = useAccount();
  const [job, setJob] = useState<CrucibleJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Submit a text generation job
  const submitTextJob = useCallback(async (input: SubmitTextJobInput) => {
    if (!address) {
      setError("Please connect your wallet");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/crucible/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-wallet-address": address,
        },
        body: JSON.stringify({
          walletAddress: address,
          type: "text",
          model: input.model,
          prompt: input.prompt,
          maxTokens: input.maxTokens || 100,
          temperature: input.temperature || 0.7,
          topP: input.topP || 1.0,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to submit job");
      }

      setJob({
        id: data.data.jobId,
        type: "text",
        status: data.data.status,
        model: data.data.model,
        input: { prompt: input.prompt },
        estimatedCost: data.data.estimatedCost,
        actualCost: null,
        createdAt: data.data.createdAt,
      });

      return data.data.jobId;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit job";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Submit an image generation job
  const submitImageJob = useCallback(async (input: SubmitImageJobInput) => {
    if (!address) {
      setError("Please connect your wallet");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/crucible/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-wallet-address": address,
        },
        body: JSON.stringify({
          walletAddress: address,
          type: "image",
          model: input.model,
          prompt: input.prompt,
          negativePrompt: input.negativePrompt,
          size: input.size || "1024x1024",
          numImages: input.numImages || 1,
          guidanceScale: input.guidanceScale || 7.5,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to submit job");
      }

      setJob({
        id: data.data.jobId,
        type: "image",
        status: data.data.status,
        model: data.data.model,
        input: { prompt: input.prompt },
        estimatedCost: data.data.estimatedCost,
        actualCost: null,
        createdAt: data.data.createdAt,
      });

      return data.data.jobId;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit job";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Submit an embedding job
  const submitEmbeddingJob = useCallback(async (input: SubmitEmbeddingJobInput) => {
    if (!address) {
      setError("Please connect your wallet");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/crucible/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-wallet-address": address,
        },
        body: JSON.stringify({
          walletAddress: address,
          type: "embedding",
          model: input.model,
          prompt: input.text,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to submit job");
      }

      setJob({
        id: data.data.jobId,
        type: "embedding",
        status: data.data.status,
        model: data.data.model,
        input: { text: input.text },
        estimatedCost: data.data.estimatedCost,
        actualCost: null,
        createdAt: data.data.createdAt,
      });

      return data.data.jobId;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit job";
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
      const response = await fetch(`/api/v1/crucible/jobs?wallet=${address}`, {
        headers: { "x-wallet-address": address },
      });

      const data = await response.json();

      if (data.success) {
        const foundJob = data.data.jobs.find((j: CrucibleJob) => j.id === jobId);
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
    submitTextJob,
    submitImageJob,
    submitEmbeddingJob,
    pollJobStatus,
    clearJob,
  };
}

// Hook for fetching user's Crucible job history
export function useCrucibleJobs(options?: { pollInterval?: number }) {
  const { address } = useAccount();
  const [jobs, setJobs] = useState<CrucibleJob[]>([]);
  const [stats, setStats] = useState<CrucibleJobStats>({ pending: 0, processing: 0, completed: 0, failed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    if (!address) {
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/v1/crucible/jobs?wallet=${address}`, {
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
      setError("Failed to fetch jobs");
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

// Hook for a single job with auto-polling until completion
export function useCrucibleJobWithPolling(jobId: string | null, pollInterval = 2000) {
  const { address } = useAccount();
  const [job, setJob] = useState<CrucibleJob | null>(null);
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
        const response = await fetch(`/api/v1/crucible/jobs?wallet=${address}`, {
          headers: { "x-wallet-address": address },
        });

        const data = await response.json();

        if (data.success) {
          const foundJob = data.data.jobs.find((j: CrucibleJob) => j.id === jobId);
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

    // Start polling
    intervalId = setInterval(fetchJob, pollInterval);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [jobId, address, pollInterval]);

  return { job, loading };
}
