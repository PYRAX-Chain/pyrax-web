// Job Service - Core business logic for Crucible and Foundry jobs
// Handles job creation, queue management, status updates, and results

import { prisma } from "@/lib/prisma";

// Type definitions (matching Prisma schema)
type JobType = 
  | "CRUCIBLE_TEXT" 
  | "CRUCIBLE_IMAGE" 
  | "CRUCIBLE_EMBEDDING" 
  | "CRUCIBLE_AUDIO" 
  | "CRUCIBLE_CODE" 
  | "CRUCIBLE_VISION" 
  | "FOUNDRY_FINETUNE" 
  | "FOUNDRY_TRAIN" 
  | "FOUNDRY_RLHF";

type JobStatus = 
  | "PENDING" 
  | "QUEUED" 
  | "ASSIGNED" 
  | "PROCESSING" 
  | "COMPLETED" 
  | "FAILED" 
  | "CANCELLED" 
  | "TIMEOUT";

// Pricing configuration (PYRX per unit)
export const PRICING = {
  text: {
    "llama-3.1-405b": { per1k: 1.5 },
    "llama-3.1-70b": { per1k: 0.5 },
    "llama-3.1-8b": { per1k: 0.1 },
    "llama-3-70b": { per1k: 0.45 },
    "llama-3-8b": { per1k: 0.08 },
    "mistral-7b": { per1k: 0.06 },
    "mixtral-8x7b": { per1k: 0.25 },
    "mixtral-8x22b": { per1k: 0.8 },
    "phi-3-mini": { per1k: 0.03 },
    "phi-3-medium": { per1k: 0.12 },
    "qwen2-72b": { per1k: 0.4 },
    "gemma-2-27b": { per1k: 0.2 },
  },
  code: {
    "codellama-70b": { per1k: 0.5 },
    "codellama-34b": { per1k: 0.25 },
    "codellama-13b": { per1k: 0.12 },
    "deepseek-coder-33b": { per1k: 0.22 },
    "deepseek-coder-6.7b": { per1k: 0.05 },
    "starcoder2-15b": { per1k: 0.15 },
  },
  image: {
    "flux-1.1-pro": { perImage: 0.08 },
    "flux-dev": { perImage: 0.04 },
    "flux-schnell": { perImage: 0.015 },
    "sdxl": { perImage: 0.025 },
    "sd-turbo": { perImage: 0.008 },
    "sd-3": { perImage: 0.05 },
    "sd-1.5": { perImage: 0.005 },
  },
  embedding: {
    "bge-large": { per1k: 0.01 },
    "bge-m3": { per1k: 0.015 },
    "e5-large": { per1k: 0.01 },
    "e5-mistral-7b": { per1k: 0.05 },
    "gte-large": { per1k: 0.01 },
    "nomic-embed": { per1k: 0.008 },
  },
  audio: {
    "whisper-large-v3": { perMinute: 0.02 },
    "whisper-medium": { perMinute: 0.01 },
    "whisper-small": { perMinute: 0.005 },
    "seamless-m4t": { perMinute: 0.025 },
  },
  training: {
    "llama-3-8b": { perHour: 0.15 },
    "llama-3-70b": { perHour: 0.95 },
    "mistral-7b": { perHour: 0.12 },
    "mixtral-8x7b": { perHour: 0.55 },
    "codellama-34b": { perHour: 0.45 },
    "phi-3-mini": { perHour: 0.08 },
  },
};

// Job creation input types
export interface CreateCrucibleJobInput {
  userId: string;
  walletAddress: string;
  type: "text" | "image" | "embedding" | "audio" | "code" | "vision";
  model: string;
  input: {
    prompt?: string;
    negativePrompt?: string;
    maxTokens?: number;
    temperature?: number;
    size?: string;
    numImages?: number;
    audioUrl?: string;
    imageUrl?: string;
  };
}

export interface CreateFoundryJobInput {
  userId: string;
  walletAddress: string;
  type: "finetune" | "train" | "rlhf";
  baseModel: string;
  datasetId?: string;
  datasetUrl?: string;
  config: {
    epochs?: number;
    batchSize?: number;
    learningRate?: string;
    maxBudget?: number;
    outputName?: string;
  };
}

// Estimate cost for a job
export function estimateCost(
  jobType: string,
  model: string,
  input: Record<string, unknown>
): number {
  const category = jobType.replace("CRUCIBLE_", "").replace("FOUNDRY_", "").toLowerCase();
  
  if (category === "text" || category === "code") {
    const pricing = PRICING.text[model as keyof typeof PRICING.text] || 
                    PRICING.code[model as keyof typeof PRICING.code];
    if (!pricing) return 0.1;
    const maxTokens = (input.maxTokens as number) || 100;
    const promptTokens = Math.ceil(((input.prompt as string)?.length || 0) / 4);
    return ((promptTokens + maxTokens) / 1000) * pricing.per1k;
  }
  
  if (category === "image") {
    const pricing = PRICING.image[model as keyof typeof PRICING.image];
    if (!pricing) return 0.02;
    const numImages = (input.numImages as number) || 1;
    return numImages * pricing.perImage;
  }
  
  if (category === "embedding") {
    const pricing = PRICING.embedding[model as keyof typeof PRICING.embedding];
    if (!pricing) return 0.01;
    const textLength = ((input.text as string)?.length || (input.prompt as string)?.length || 0);
    return (textLength / 4000) * pricing.per1k;
  }
  
  if (category === "audio") {
    const pricing = PRICING.audio[model as keyof typeof PRICING.audio];
    if (!pricing) return 0.02;
    const durationMinutes = (input.durationMinutes as number) || 1;
    return durationMinutes * pricing.perMinute;
  }
  
  if (category === "finetune" || category === "train" || category === "rlhf") {
    const pricing = PRICING.training[model as keyof typeof PRICING.training];
    if (!pricing) return 1;
    const estimatedHours = (input.epochs as number || 3) * 0.5; // Rough estimate
    return estimatedHours * pricing.perHour;
  }
  
  return 0.1; // Default
}

// Get or create user
export async function getOrCreateUser(walletAddress: string) {
  let user = await prisma.user.findUnique({
    where: { walletAddress: walletAddress.toLowerCase() },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        walletAddress: walletAddress.toLowerCase(),
        credits: 10, // Free starter credits
      },
    });
  }

  return user;
}

// Check if user has sufficient credits
export async function checkCredits(userId: string, requiredAmount: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  
  if (!user) return false;
  return Number(user.credits) >= requiredAmount;
}

// Deduct credits from user
export async function deductCredits(userId: string, amount: number): Promise<boolean> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: { decrement: amount },
      },
    });
    return true;
  } catch {
    return false;
  }
}

// Create a Crucible job
export async function createCrucibleJob(input: CreateCrucibleJobInput) {
  const jobTypeMap: Record<string, JobType> = {
    text: "CRUCIBLE_TEXT",
    image: "CRUCIBLE_IMAGE",
    embedding: "CRUCIBLE_EMBEDDING",
    audio: "CRUCIBLE_AUDIO",
    code: "CRUCIBLE_CODE",
    vision: "CRUCIBLE_VISION",
  };

  const jobType = jobTypeMap[input.type];
  if (!jobType) {
    throw new Error(`Invalid job type: ${input.type}`);
  }

  // Get or create user
  const user = await getOrCreateUser(input.walletAddress);

  // Estimate cost
  const estimatedCost = estimateCost(jobType, input.model, input.input);

  // Check credits
  const hasCredits = await checkCredits(user.id, estimatedCost);
  if (!hasCredits) {
    throw new Error(`Insufficient credits. Required: ${estimatedCost.toFixed(4)} PYRX`);
  }

  // Create job
  const job = await prisma.job.create({
    data: {
      userId: user.id,
      type: jobType,
      status: "PENDING",
      model: input.model,
      input: input.input as any,
      estimatedCost,
    },
  });

  // Deduct credits
  await deductCredits(user.id, estimatedCost);

  // Queue the job (simulate async processing)
  queueJob(job.id);

  return job;
}

// Create a Foundry training job
export async function createFoundryJob(input: CreateFoundryJobInput) {
  const jobTypeMap: Record<string, JobType> = {
    finetune: "FOUNDRY_FINETUNE",
    train: "FOUNDRY_TRAIN",
    rlhf: "FOUNDRY_RLHF",
  };

  const jobType = jobTypeMap[input.type];
  if (!jobType) {
    throw new Error(`Invalid training type: ${input.type}`);
  }

  // Get or create user
  const user = await getOrCreateUser(input.walletAddress);

  // Estimate cost
  const estimatedCost = estimateCost(jobType, input.baseModel, input.config);
  const maxBudget = input.config.maxBudget || estimatedCost * 2;

  // Check credits
  const hasCredits = await checkCredits(user.id, Math.min(estimatedCost, maxBudget));
  if (!hasCredits) {
    throw new Error(`Insufficient credits. Required: ${estimatedCost.toFixed(4)} PYRX`);
  }

  // Create job
  const job = await prisma.job.create({
    data: {
      userId: user.id,
      type: jobType,
      status: "PENDING",
      model: input.baseModel,
      input: {
        ...input.config,
        datasetUrl: input.datasetUrl,
      } as any,
      datasetId: input.datasetId,
      estimatedCost,
    },
  });

  // Deduct estimated cost (will be adjusted on completion)
  await deductCredits(user.id, estimatedCost);

  // Queue the job
  queueJob(job.id);

  return job;
}

// Get job by ID
export async function getJob(jobId: string) {
  return prisma.job.findUnique({
    where: { id: jobId },
    include: {
      user: { select: { walletAddress: true, credits: true } },
      worker: { select: { hostname: true, region: true } },
    },
  });
}

// Get jobs for a user
export async function getUserJobs(
  userId: string,
  options?: {
    type?: JobType;
    status?: JobStatus;
    limit?: number;
    offset?: number;
  }
) {
  const where: any = { userId };
  if (options?.type) where.type = options.type;
  if (options?.status) where.status = options.status;

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      include: {
        worker: { select: { hostname: true, region: true } },
      },
    }),
    prisma.job.count({ where }),
  ]);

  return { jobs, total };
}

// Update job status
export async function updateJobStatus(
  jobId: string,
  status: JobStatus,
  data?: {
    workerId?: string;
    workerAddress?: string;
    output?: Record<string, unknown>;
    error?: string;
    actualCost?: number;
  }
) {
  const updateData: any = { status };

  if (status === "QUEUED") updateData.queuedAt = new Date();
  if (status === "PROCESSING") updateData.startedAt = new Date();
  if (status === "COMPLETED" || status === "FAILED") updateData.completedAt = new Date();

  if (data?.workerId) updateData.workerId = data.workerId;
  if (data?.workerAddress) updateData.workerAddress = data.workerAddress;
  if (data?.output) updateData.output = data.output;
  if (data?.error) updateData.error = data.error;
  if (data?.actualCost !== undefined) updateData.actualCost = data.actualCost;

  return prisma.job.update({
    where: { id: jobId },
    data: updateData,
  });
}

// Simulate job queue processing
// In production, this would use Redis/Bull queue with actual GPU workers
async function queueJob(jobId: string) {
  // Mark as queued
  setTimeout(async () => {
    await updateJobStatus(jobId, "QUEUED");
  }, 500);

  // Simulate worker assignment
  setTimeout(async () => {
    await updateJobStatus(jobId, "ASSIGNED", {
      workerId: "worker_demo_001",
      workerAddress: "0x1234...5678",
    });
  }, 1500);

  // Simulate processing
  setTimeout(async () => {
    await updateJobStatus(jobId, "PROCESSING");
  }, 2500);

  // Simulate completion
  const completionTime = 5000 + Math.random() * 10000; // 5-15 seconds
  setTimeout(async () => {
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return;

    // Generate mock output based on job type
    let output: Record<string, unknown> = {};
    
    if (job.type === "CRUCIBLE_TEXT" || job.type === "CRUCIBLE_CODE") {
      output = {
        text: `Generated response from ${job.model}. This is a demonstration of the Crucible AI inference platform. In production, this response would be generated by actual GPU workers running the ${job.model} model on the PYRAX decentralized network.`,
        tokens: {
          prompt: Math.ceil(JSON.stringify(job.input).length / 4),
          completion: 50,
          total: Math.ceil(JSON.stringify(job.input).length / 4) + 50,
        },
        finishReason: "stop",
      };
    } else if (job.type === "CRUCIBLE_IMAGE") {
      output = {
        images: [
          {
            url: `https://api.pyrax.org/generated/${job.id}/image_0.png`,
            width: 1024,
            height: 1024,
          },
        ],
        seed: Math.floor(Math.random() * 1000000),
      };
    } else if (job.type === "CRUCIBLE_EMBEDDING") {
      output = {
        embedding: Array.from({ length: 768 }, () => Math.random() * 2 - 1),
        dimensions: 768,
      };
    } else if (job.type.startsWith("FOUNDRY_")) {
      output = {
        modelUrl: `https://models.pyrax.org/${job.id}/model.safetensors`,
        metrics: {
          finalLoss: 0.15 + Math.random() * 0.1,
          epochs: (job.input as any).epochs || 3,
          steps: 1000 + Math.floor(Math.random() * 500),
        },
      };
    }

    await updateJobStatus(jobId, "COMPLETED", {
      output,
      actualCost: Number(job.estimatedCost) * (0.9 + Math.random() * 0.2),
    });
  }, completionTime);
}

// Cancel a job
export async function cancelJob(jobId: string, userId: string) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  
  if (!job) throw new Error("Job not found");
  if (job.userId !== userId) throw new Error("Unauthorized");
  if (job.status === "COMPLETED" || job.status === "FAILED") {
    throw new Error("Cannot cancel completed or failed job");
  }

  // Refund credits if job was pending/queued
  if (job.status === "PENDING" || job.status === "QUEUED") {
    await prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: Number(job.estimatedCost) } },
    });
  }

  return updateJobStatus(jobId, "CANCELLED");
}

// Get job statistics for a user
export async function getUserJobStats(userId: string) {
  const [stats, recentJobs] = await Promise.all([
    prisma.job.groupBy({
      by: ["status"],
      where: { userId },
      _count: true,
    }),
    prisma.job.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        type: true,
        status: true,
        model: true,
        createdAt: true,
        completedAt: true,
        actualCost: true,
      },
    }),
  ]);

  const statusCounts = stats.reduce((acc: Record<string, number>, s: { status: string; _count: number }) => {
    acc[s.status.toLowerCase()] = s._count;
    return acc;
  }, {} as Record<string, number>);

  const totalCount = Object.values(statusCounts).reduce<number>((a, b) => a + (b as number), 0);

  return {
    total: totalCount,
    pending: statusCounts.pending || 0,
    queued: statusCounts.queued || 0,
    processing: statusCounts.processing || 0,
    completed: statusCounts.completed || 0,
    failed: statusCounts.failed || 0,
    cancelled: statusCounts.cancelled || 0,
    recentJobs,
  };
}
