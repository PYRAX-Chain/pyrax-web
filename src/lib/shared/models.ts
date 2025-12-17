// Shared model definitions for Crucible AI
// Used by both web dashboard and desktop app
// These models are available on the PYRAX decentralized network

export type ModelCategory = 'text' | 'image' | 'embedding' | 'classification' | 'audio' | 'vision' | 'code';

export interface AIModel {
  id: string;
  name: string;
  description: string;
  category: ModelCategory;
  provider: string;
  license: string;
  vramRequiredGb: number;
  sizeGb: number;
  hfModelId?: string;
  costPer1k?: number;      // For text/embedding models
  costPerImage?: number;   // For image models
  costPerMin?: number;     // For audio models
  badge?: string | null;
  available: boolean;
}

// Complete model catalog matching Desktop app
export const CRUCIBLE_MODELS: AIModel[] = [
  // ============ TEXT GENERATION ============
  {
    id: 'llama-3-8b',
    name: 'Llama 3 8B',
    description: 'Meta Llama 3 8B - Great balance of speed and quality',
    category: 'text',
    provider: 'Meta',
    license: 'Llama 3',
    vramRequiredGb: 8,
    sizeGb: 16,
    hfModelId: 'meta-llama/Meta-Llama-3-8B-Instruct',
    costPer1k: 0.08,
    badge: 'Fast',
    available: true,
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3 70B',
    description: 'Meta flagship model - Highest quality text generation',
    category: 'text',
    provider: 'Meta',
    license: 'Llama 3',
    vramRequiredGb: 48,
    sizeGb: 140,
    hfModelId: 'meta-llama/Meta-Llama-3-70B-Instruct',
    costPer1k: 0.45,
    badge: 'Flagship',
    available: true,
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    description: 'Efficient 7B model with sliding window attention',
    category: 'text',
    provider: 'Mistral AI',
    license: 'Apache 2.0',
    vramRequiredGb: 6,
    sizeGb: 14,
    hfModelId: 'mistralai/Mistral-7B-Instruct-v0.2',
    costPer1k: 0.06,
    badge: null,
    available: true,
  },
  {
    id: 'mixtral-8x7b',
    name: 'Mixtral 8x7B',
    description: 'Mixture of Experts - High quality with efficient inference',
    category: 'text',
    provider: 'Mistral AI',
    license: 'Apache 2.0',
    vramRequiredGb: 32,
    sizeGb: 95,
    hfModelId: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    costPer1k: 0.25,
    badge: 'Best Value',
    available: true,
  },
  {
    id: 'phi-3-mini',
    name: 'Phi-3 Mini',
    description: 'Microsoft compact 3.8B model - Great for limited VRAM',
    category: 'text',
    provider: 'Microsoft',
    license: 'MIT',
    vramRequiredGb: 4,
    sizeGb: 7.6,
    hfModelId: 'microsoft/Phi-3-mini-4k-instruct',
    costPer1k: 0.03,
    badge: 'Compact',
    available: true,
  },

  // ============ IMAGE GENERATION ============
  {
    id: 'sdxl',
    name: 'Stable Diffusion XL',
    description: 'High quality 1024x1024 image generation',
    category: 'image',
    provider: 'Stability AI',
    license: 'Open RAIL-M',
    vramRequiredGb: 12,
    sizeGb: 6.5,
    hfModelId: 'stabilityai/stable-diffusion-xl-base-1.0',
    costPerImage: 0.025,
    badge: null,
    available: true,
  },
  {
    id: 'sd-turbo',
    name: 'SD Turbo',
    description: 'Fast single-step image generation - 10x faster',
    category: 'image',
    provider: 'Stability AI',
    license: 'Open RAIL-M',
    vramRequiredGb: 8,
    sizeGb: 5,
    hfModelId: 'stabilityai/sd-turbo',
    costPerImage: 0.008,
    badge: 'Fastest',
    available: true,
  },
  {
    id: 'flux-schnell',
    name: 'Flux Schnell',
    description: 'Black Forest Labs fast, high-quality images',
    category: 'image',
    provider: 'Black Forest Labs',
    license: 'Apache 2.0',
    vramRequiredGb: 16,
    sizeGb: 23,
    hfModelId: 'black-forest-labs/FLUX.1-schnell',
    costPerImage: 0.015,
    badge: 'Fast',
    available: true,
  },
  {
    id: 'sd-1.5',
    name: 'Stable Diffusion 1.5',
    description: 'Classic SD model - Low VRAM, fast generation',
    category: 'image',
    provider: 'Runway',
    license: 'Open RAIL-M',
    vramRequiredGb: 4,
    sizeGb: 4.3,
    hfModelId: 'runwayml/stable-diffusion-v1-5',
    costPerImage: 0.005,
    badge: 'Budget',
    available: true,
  },

  // ============ EMBEDDINGS ============
  {
    id: 'bge-large',
    name: 'BGE Large',
    description: 'Excellent for semantic search and RAG',
    category: 'embedding',
    provider: 'BAAI',
    license: 'MIT',
    vramRequiredGb: 2,
    sizeGb: 1.3,
    hfModelId: 'BAAI/bge-large-en-v1.5',
    costPer1k: 0.01,
    badge: 'Best for RAG',
    available: true,
  },
  {
    id: 'e5-large',
    name: 'E5 Large',
    description: 'Strong multilingual embedding support',
    category: 'embedding',
    provider: 'Microsoft',
    license: 'MIT',
    vramRequiredGb: 2,
    sizeGb: 1.3,
    hfModelId: 'intfloat/e5-large-v2',
    costPer1k: 0.01,
    badge: null,
    available: true,
  },
  {
    id: 'gte-large',
    name: 'GTE Large',
    description: 'Alibaba general text embeddings - Excellent quality',
    category: 'embedding',
    provider: 'Alibaba',
    license: 'MIT',
    vramRequiredGb: 2,
    sizeGb: 1.3,
    hfModelId: 'thenlper/gte-large',
    costPer1k: 0.01,
    badge: null,
    available: true,
  },

  // ============ CLASSIFICATION / VISION ============
  {
    id: 'clip-vit-l',
    name: 'CLIP ViT-L/14',
    description: 'Image-text understanding and zero-shot classification',
    category: 'classification',
    provider: 'OpenAI',
    license: 'MIT',
    vramRequiredGb: 4,
    sizeGb: 1.7,
    hfModelId: 'openai/clip-vit-large-patch14',
    costPer1k: 0.02,
    badge: 'Classification',
    available: true,
  },
  {
    id: 'blip-2',
    name: 'BLIP-2',
    description: 'Image captioning and visual question answering',
    category: 'classification',
    provider: 'Salesforce',
    license: 'BSD-3',
    vramRequiredGb: 8,
    sizeGb: 4,
    hfModelId: 'Salesforce/blip2-opt-2.7b',
    costPer1k: 0.05,
    badge: 'Captioning',
    available: true,
  },
];

// Get models by category
export function getModelsByCategory(category: ModelCategory): AIModel[] {
  return CRUCIBLE_MODELS.filter(m => m.category === category);
}

// Get model by ID
export function getModelById(id: string): AIModel | undefined {
  return CRUCIBLE_MODELS.find(m => m.id === id);
}

// Category configuration for UI
export const CATEGORY_CONFIG: Record<ModelCategory, {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}> = {
  text: { label: 'Text Generation', icon: 'MessageSquare', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
  image: { label: 'Image Generation', icon: 'Image', color: 'text-pink-400', bgColor: 'bg-pink-500/20' },
  embedding: { label: 'Embeddings', icon: 'Database', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  classification: { label: 'Classification', icon: 'Bot', color: 'text-green-400', bgColor: 'bg-green-500/20' },
  audio: { label: 'Audio', icon: 'Mic', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
  vision: { label: 'Vision', icon: 'Eye', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' },
  code: { label: 'Code', icon: 'Code', color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
};
