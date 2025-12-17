"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";

// Types
export interface NetworkStats {
  activeWorkers: number;
  totalGPUs: number;
  jobsProcessing: number;
  jobsQueued: number;
  jobsCompleted24h: number;
  networkTPS: number;
  avgLatency: number;
  totalTFLOPS: number;
  utilizationRate: number;
}

export interface Worker {
  id: string;
  address: string;
  hostname: string;
  gpus: number;
  gpuModel: string;
  vram: number;
  region: string;
  status: "online" | "busy" | "offline";
  activeJobs: number;
  totalJobs: number;
  uptime: number;
  earnings: number;
  lastSeen: Date;
}

export interface Job {
  id: string;
  userId: string;
  type: string;
  status: "pending" | "queued" | "processing" | "completed" | "failed" | "cancelled";
  model: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  cost: number;
  workerId?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
}

export interface UserStats {
  crucibleJobs: number;
  foundryJobs: number;
  totalSpent: number;
  gpuHoursUsed: number;
  credits: number;
}

// Hook for network statistics with real-time updates
export function useNetworkStats(refreshInterval = 5000) {
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/factory/stats");
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
        setError(null);
      } else {
        setError(data.error || "Failed to fetch stats");
      }
    } catch (err) {
      setError("Network error");
      console.error("Failed to fetch network stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchStats, refreshInterval]);

  return { stats, loading, error, refresh: fetchStats };
}

// Hook for workers list
export function useWorkers(filter?: { status?: string; region?: string }) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [summary, setSummary] = useState<{
    totalWorkers: number;
    totalGPUs: number;
    activeJobs: number;
    avgUptime: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkers = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter?.status) params.set("status", filter.status);
      if (filter?.region) params.set("region", filter.region);

      const response = await fetch(`/api/v1/factory/workers?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setWorkers(data.data.workers);
        setSummary(data.data.summary);
        setError(null);
      } else {
        setError(data.error || "Failed to fetch workers");
      }
    } catch (err) {
      setError("Network error");
      console.error("Failed to fetch workers:", err);
    } finally {
      setLoading(false);
    }
  }, [filter?.status, filter?.region]);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  return { workers, summary, loading, error, refresh: fetchWorkers };
}

// Hook for user's jobs
export function useJobs(options?: { status?: string; type?: string }) {
  const { address } = useAccount();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    running: number;
    queued: number;
    completed: number;
    failed: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    if (!address) {
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({ userId: address });
      if (options?.status) params.set("status", options.status);
      if (options?.type) params.set("type", options.type);

      const response = await fetch(`/api/v1/factory/jobs?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setJobs(data.data.jobs.map((j: any) => ({
          ...j,
          createdAt: new Date(j.createdAt),
          startedAt: j.startedAt ? new Date(j.startedAt) : undefined,
          completedAt: j.completedAt ? new Date(j.completedAt) : undefined,
        })));
        setStats(data.data.stats);
        setError(null);
      } else {
        setError(data.error || "Failed to fetch jobs");
      }
    } catch (err) {
      setError("Network error");
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [address, options?.status, options?.type]);

  useEffect(() => {
    fetchJobs();
    // Poll for updates every 3 seconds
    const interval = setInterval(fetchJobs, 3000);
    return () => clearInterval(interval);
  }, [fetchJobs]);

  // Submit a new job
  const submitJob = useCallback(async (jobData: {
    type: string;
    model: string;
    input: Record<string, unknown>;
    maxCost?: number;
  }) => {
    if (!address) throw new Error("Wallet not connected");

    const response = await fetch("/api/v1/factory/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: address,
        ...jobData,
      }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Failed to submit job");
    }

    // Refresh jobs list
    await fetchJobs();
    return data.data.job;
  }, [address, fetchJobs]);

  return { jobs, stats, loading, error, refresh: fetchJobs, submitJob };
}

// Hook for user statistics
export function useUserStats() {
  const { address } = useAccount();
  const [userStats, setUserStats] = useState<UserStats>({
    crucibleJobs: 0,
    foundryJobs: 0,
    totalSpent: 0,
    gpuHoursUsed: 0,
    credits: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    // In production, fetch from API
    // For now, calculate from jobs
    const fetchUserStats = async () => {
      try {
        const response = await fetch(`/api/v1/factory/jobs?userId=${address}`);
        const data = await response.json();
        
        if (data.success) {
          const jobs = data.data.jobs;
          setUserStats({
            crucibleJobs: jobs.filter((j: Job) => j.type.startsWith("crucible")).length,
            foundryJobs: jobs.filter((j: Job) => j.type.startsWith("foundry")).length,
            totalSpent: jobs.reduce((acc: number, j: Job) => acc + (j.cost || 0), 0),
            gpuHoursUsed: jobs.reduce((acc: number, j: Job) => {
              if (j.startedAt && j.completedAt) {
                return acc + (new Date(j.completedAt).getTime() - new Date(j.startedAt).getTime()) / 3600000;
              }
              return acc;
            }, 0),
            credits: 0, // Would come from balance check
          });
        }
      } catch (err) {
        console.error("Failed to fetch user stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [address]);

  return { userStats, loading };
}
