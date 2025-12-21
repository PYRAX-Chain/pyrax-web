import { NextRequest, NextResponse } from "next/server";

// Crucible Image Generation API
// POST /api/v1/crucible/image

interface ImageGenerationRequest {
  model: string;
  prompt: string;
  negative_prompt?: string;
  size?: string;
  num_images?: number;
  guidance_scale?: number;
  num_inference_steps?: number;
  seed?: number;
}

interface ImageGenerationResponse {
  id: string;
  object: "image_generation";
  created: number;
  model: string;
  images: {
    url: string;
    b64_json?: string;
    revised_prompt?: string;
  }[];
  cost: {
    PYRAX_amount: number;
  };
}

const SUPPORTED_MODELS = [
  "sd-xl",
  "sd-3",
  "flux-schnell",
  "flux-dev",
];

const MODEL_COSTS: Record<string, number> = {
  "sd-xl": 0.02,
  "sd-3": 0.05,
  "flux-schnell": 0.01,
  "flux-dev": 0.03,
};

const SUPPORTED_SIZES = [
  "256x256",
  "512x512",
  "768x768",
  "1024x1024",
  "1024x768",
  "768x1024",
];

export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: { message: "Missing or invalid Authorization header", type: "invalid_request_error" } },
        { status: 401 }
      );
    }

    const apiKey = authHeader.slice(7);
    if (!apiKey.startsWith("pyrax_")) {
      return NextResponse.json(
        { error: { message: "Invalid API key format", type: "invalid_request_error" } },
        { status: 401 }
      );
    }

    // Parse request body
    const body: ImageGenerationRequest = await request.json();

    // Validate required fields
    if (!body.model) {
      return NextResponse.json(
        { error: { message: "model is required", type: "invalid_request_error" } },
        { status: 400 }
      );
    }

    if (!body.prompt) {
      return NextResponse.json(
        { error: { message: "prompt is required", type: "invalid_request_error" } },
        { status: 400 }
      );
    }

    // Validate model
    if (!SUPPORTED_MODELS.includes(body.model)) {
      return NextResponse.json(
        { 
          error: { 
            message: `Model '${body.model}' not supported. Available models: ${SUPPORTED_MODELS.join(", ")}`, 
            type: "invalid_request_error" 
          } 
        },
        { status: 400 }
      );
    }

    // Set defaults
    const size = body.size || "1024x1024";
    const numImages = body.num_images || 1;
    const guidanceScale = body.guidance_scale ?? 7.5;
    const steps = body.num_inference_steps || 30;

    // Validate size
    if (!SUPPORTED_SIZES.includes(size)) {
      return NextResponse.json(
        { 
          error: { 
            message: `Size '${size}' not supported. Available sizes: ${SUPPORTED_SIZES.join(", ")}`, 
            type: "invalid_request_error" 
          } 
        },
        { status: 400 }
      );
    }

    // Calculate cost
    const baseCost = MODEL_COSTS[body.model] || 0.02;
    const totalCost = baseCost * numImages;

    // In production, this would:
    // 1. Check user's PYRAX balance
    // 2. Submit job to Crucible network
    // 3. Wait for GPU worker to process
    // 4. Return generated images

    // For demo, return mock response
    const response: ImageGenerationResponse = {
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      object: "image_generation",
      created: Math.floor(Date.now() / 1000),
      model: body.model,
      images: Array.from({ length: numImages }, (_, i) => ({
        url: `https://placeholder.pyrax.network/generated/${body.model}/${Date.now()}-${i}.png`,
        revised_prompt: body.prompt,
      })),
      cost: {
        PYRAX_amount: totalCost,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Crucible image generation error:", error);
    return NextResponse.json(
      { error: { message: "Internal server error", type: "api_error" } },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/v1/crucible/image",
    method: "POST",
    description: "Generate images using diffusion models on the Crucible network",
    supported_models: SUPPORTED_MODELS,
    supported_sizes: SUPPORTED_SIZES,
    parameters: {
      model: { type: "string", required: true, description: "Model ID to use" },
      prompt: { type: "string", required: true, description: "Image description" },
      negative_prompt: { type: "string", required: false, description: "What to avoid in the image" },
      size: { type: "string", required: false, default: "1024x1024", description: "Image dimensions" },
      num_images: { type: "integer", required: false, default: 1, max: 4, description: "Number of images" },
      guidance_scale: { type: "number", required: false, default: 7.5, description: "Prompt adherence (1-20)" },
      num_inference_steps: { type: "integer", required: false, default: 30, description: "Quality steps (1-100)" },
      seed: { type: "integer", required: false, description: "Random seed for reproducibility" },
    },
    pricing: MODEL_COSTS,
  });
}
