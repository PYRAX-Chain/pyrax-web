import Link from "next/link";
import { ChevronRight, Sparkles, MessageSquare, ImageIcon, Bot, Database, ArrowRight, ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";

const models = [
  {
    category: "Text Generation",
    icon: MessageSquare,
    color: "purple",
    items: [
      { id: "llama-3-8b", name: "Llama 3 8B", vram: "8 GB", speed: "Fast", quality: "Good", cost: "~0.001 PYRAX/token", license: "Llama 3 License", source: "Meta" },
      { id: "llama-3-70b", name: "Llama 3 70B", vram: "48 GB", speed: "Slow", quality: "Excellent", cost: "~0.005 PYRAX/token", license: "Llama 3 License", source: "Meta" },
      { id: "mistral-7b", name: "Mistral 7B", vram: "6 GB", speed: "Fast", quality: "Good", cost: "~0.0008 PYRAX/token", license: "Apache 2.0", source: "Mistral AI" },
      { id: "mixtral-8x7b", name: "Mixtral 8x7B", vram: "32 GB", speed: "Medium", quality: "Very Good", cost: "~0.003 PYRAX/token", license: "Apache 2.0", source: "Mistral AI" },
    ],
  },
  {
    category: "Image Generation",
    icon: ImageIcon,
    color: "orange",
    items: [
      { id: "sdxl", name: "Stable Diffusion XL", vram: "12 GB", speed: "Medium", quality: "Excellent", cost: "~0.5 PYRAX/image", license: "Open RAIL-M", source: "Stability AI" },
      { id: "sd-turbo", name: "SD Turbo", vram: "8 GB", speed: "Fast", quality: "Good", cost: "~0.2 PYRAX/image", license: "Open RAIL-M", source: "Stability AI" },
      { id: "flux-schnell", name: "Flux Schnell", vram: "16 GB", speed: "Fast", quality: "Excellent", cost: "~0.4 PYRAX/image", license: "Apache 2.0", source: "Black Forest Labs" },
    ],
  },
  {
    category: "Embeddings",
    icon: Database,
    color: "blue",
    items: [
      { id: "bge-large", name: "BGE Large", vram: "2 GB", speed: "Very Fast", quality: "Excellent", cost: "~0.0001 PYRAX/embed", license: "MIT", source: "BAAI" },
      { id: "e5-large", name: "E5 Large", vram: "2 GB", speed: "Very Fast", quality: "Excellent", cost: "~0.0001 PYRAX/embed", license: "MIT", source: "Microsoft" },
    ],
  },
  {
    category: "Classification",
    icon: Bot,
    color: "green",
    items: [
      { id: "clip-vit-l", name: "CLIP ViT-L/14", vram: "4 GB", speed: "Fast", quality: "Excellent", cost: "~0.01 PYRAX/classify", license: "MIT", source: "OpenAI" },
      { id: "blip-2", name: "BLIP-2", vram: "8 GB", speed: "Medium", quality: "Excellent", cost: "~0.02 PYRAX/classify", license: "BSD-3", source: "Salesforce" },
    ],
  },
];

export default function CrucibleModelsPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/docs/crucible" className="hover:text-white">Crucible</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Models</span>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
            <Sparkles className="w-4 h-4" /> 8 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Supported AI Models</h1>
          <p className="text-xl text-gray-400">Browse the AI models available on Crucible and their specifications.</p>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          {/* Open Source Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 my-8 not-prose">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">100% Free & Open-Source Models</h3>
                <p className="text-gray-300 mb-4">
                  All models supported by Crucible are <strong className="text-green-400">completely free and open-source</strong>. 
                  No API keys, no subscriptions, no licensing fees. Workers download model weights directly from Hugging Face 
                  and run them locally on their own hardware.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">No API Keys</span>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">No Subscriptions</span>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">No Cloud Costs</span>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Run Locally</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Crucible supports a curated list of AI models that have been verified for quality and compatibility. Workers download these models to their local machines and serve inference requests.
          </p>

          {models.map((category) => (
            <div key={category.category} className="mt-12">
              <div className="flex items-center gap-3 mb-6 not-prose">
                <div className={`w-10 h-10 rounded-xl bg-${category.color}-500/10 flex items-center justify-center`}>
                  <category.icon className={`w-5 h-5 text-${category.color}-400`} />
                </div>
                <h2 className="text-2xl font-bold text-white">{category.category}</h2>
              </div>
              
              <div className="space-y-4 not-prose">
                {category.items.map((model) => (
                  <div key={model.id} className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-bold text-white">{model.name}</h3>
                          <code className="text-xs px-2 py-1 bg-white/10 rounded text-gray-400">{model.id}</code>
                          <span className="text-xs px-2 py-1 bg-green-500/10 rounded text-green-400 border border-green-500/20">{model.license}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                          <span>VRAM: <span className="text-white">{model.vram}</span></span>
                          <span>Speed: <span className="text-white">{model.speed}</span></span>
                          <span>Source: <span className="text-white">{model.source}</span></span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-pyrax-orange font-mono font-bold">{model.cost}</div>
                        <div className="text-xs text-gray-500">network fee</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Model Selection Tips</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• <strong className="text-white">For chatbots:</strong> Use <code className="text-pyrax-orange">llama-3-8b</code> for speed or <code className="text-pyrax-orange">llama-3-70b</code> for quality</li>
            <li>• <strong className="text-white">For image generation:</strong> Use <code className="text-pyrax-orange">sdxl</code> for best quality, <code className="text-pyrax-orange">sd-turbo</code> for speed</li>
            <li>• <strong className="text-white">For semantic search:</strong> Use <code className="text-pyrax-orange">bge-large</code> embeddings</li>
            <li>• <strong className="text-white">For image analysis:</strong> Use <code className="text-pyrax-orange">clip-vit-l</code> for classification</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Coming Soon</h2>
          <p className="text-gray-300 leading-relaxed">The following models are planned for future releases:</p>
          <ul className="space-y-2 text-gray-400">
            <li>• <strong className="text-white">Whisper Large:</strong> Speech-to-text transcription</li>
            <li>• <strong className="text-white">CodeLlama 34B:</strong> Code generation and completion</li>
            <li>• <strong className="text-white">Sora-style:</strong> Video generation (research phase)</li>
          </ul>
        </article>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex justify-between">
            <Link href="/docs/crucible/workers" className="flex items-center gap-2 text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" /> Become a Worker
            </Link>
            <Link href="/docs/crucible/smart-contracts" className="flex items-center gap-2 text-pyrax-orange hover:underline">
              Smart Contracts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
