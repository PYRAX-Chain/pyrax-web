import Link from "next/link";
import { ChevronRight, Server, Coins, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const tiers = [
  { name: "Bronze", stake: "1,000", jobs: "5", priority: "Low", color: "from-amber-700 to-amber-900" },
  { name: "Silver", stake: "10,000", jobs: "20", priority: "Medium", color: "from-gray-400 to-gray-600" },
  { name: "Gold", stake: "100,000", jobs: "100", priority: "High", color: "from-yellow-400 to-yellow-600" },
  { name: "Platinum", stake: "1,000,000", jobs: "Unlimited", priority: "Highest", color: "from-cyan-300 to-cyan-500" },
];

export default function CrucibleWorkersPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/docs/crucible" className="hover:text-white">Crucible</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Workers</span>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
            <Server className="w-4 h-4" /> 15 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Become a GPU Worker</h1>
          <p className="text-xl text-gray-400">Turn your GPU mining setup into an AI compute powerhouse and earn additional PYRX.</p>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed">
            As a Crucible GPU Worker, you can earn PYRX by processing AI inference jobs alongside your regular Stream B mining. Your GPUs run AI models like Llama 3, Stable Diffusion, and more—verified trustlessly and paid automatically.
          </p>

          <div className="p-5 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 my-8 not-prose">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">No Subscriptions or API Keys Required</h3>
            </div>
            <p className="text-gray-300 text-sm">
              All AI models are <strong className="text-green-400">100% free and open-source</strong>. You download model weights 
              from Hugging Face (free account) and run them locally. No OpenAI, Anthropic, or any paid API subscriptions needed.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Requirements</h2>
          <div className="space-y-3 my-6 not-prose">
            {[
              { label: "GPU", value: "NVIDIA RTX 3080 or better (8GB+ VRAM)" },
              { label: "RAM", value: "32GB+ system RAM recommended" },
              { label: "Storage", value: "100GB+ SSD for model weights" },
              { label: "Network", value: "Stable internet, 100Mbps+ recommended" },
              { label: "Stake", value: "Minimum 1,000 PYRX staked" },
              { label: "Models", value: "Free from Hugging Face (no API keys)" },
            ].map((req) => (
              <div key={req.label} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-gray-400">{req.label}</span>
                <span className="text-white font-mono">{req.value}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Staking Tiers</h2>
          <p className="text-gray-300 leading-relaxed">Higher stakes unlock more concurrent jobs and priority routing:</p>
          <div className="space-y-4 my-6 not-prose">
            {tiers.map((tier) => (
              <div key={tier.name} className={`p-4 rounded-xl bg-gradient-to-r ${tier.color} bg-opacity-20 border border-white/10`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-bold text-white">{tier.name}</div>
                    <div className="text-sm text-gray-300">{tier.stake} PYRX stake required</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">{tier.jobs}</div>
                    <div className="text-xs text-gray-400">concurrent jobs • {tier.priority} priority</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Quick Start</h2>
          <div className="bg-pyrax-dark/50 border border-white/10 rounded-xl p-6 my-6 font-mono text-sm overflow-x-auto not-prose">
            <div className="text-gray-500 mb-2"># 1. Clone the Crucible worker software</div>
            <pre className="text-green-400 mb-4">git clone https://github.com/PYRAX-Chain/crucible-worker
cd crucible-worker</pre>
            
            <div className="text-gray-500 mb-2"># 2. Install dependencies</div>
            <pre className="text-green-400 mb-4">cargo build --release</pre>
            
            <div className="text-gray-500 mb-2"># 3. Download AI models</div>
            <pre className="text-green-400 mb-4">./scripts/download-models.sh llama-3-8b stable-diffusion-xl</pre>
            
            <div className="text-gray-500 mb-2"># 4. Configure your worker</div>
            <pre className="text-green-400 mb-4">{`cat > config.toml << EOF
[worker]
wallet = "0xYOUR_WALLET_ADDRESS"
stake_amount = 1000
rpc_endpoint = "https://rpc.pyrax.io"

[models]
enabled = ["llama-3-8b", "sdxl"]

[hardware]
gpu_ids = [0]  # GPU indices to use
max_vram_usage = 0.9  # Use 90% of VRAM
EOF`}</pre>
            
            <div className="text-gray-500 mb-2"># 5. Start the worker</div>
            <pre className="text-green-400">./target/release/crucible-worker --config config.toml</pre>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Earnings Potential</h2>
          <p className="text-gray-300 leading-relaxed">Worker earnings depend on job volume, GPU performance, and tier priority. Example estimates:</p>
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-pyrax-orange">GPU</th><th className="py-3 px-4 text-gray-400">Jobs/Day</th><th className="py-3 px-4 text-gray-400">Est. Daily PYRX</th></tr></thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-3 px-4 text-white">RTX 3080</td><td className="py-3 px-4 text-gray-400">~500</td><td className="py-3 px-4 text-green-400">50-100 PYRX</td></tr>
                <tr><td className="py-3 px-4 text-white">RTX 4090</td><td className="py-3 px-4 text-gray-400">~1,500</td><td className="py-3 px-4 text-green-400">150-300 PYRX</td></tr>
                <tr><td className="py-3 px-4 text-white">A100 80GB</td><td className="py-3 px-4 text-gray-400">~5,000</td><td className="py-3 px-4 text-green-400">500-1,000 PYRX</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 italic">*Estimates based on projected mainnet demand. Actual earnings will vary.</p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Slashing Conditions</h2>
          <p className="text-gray-300 leading-relaxed">Workers can be slashed for misbehavior:</p>
          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-red-400">Violation</th><th className="py-3 px-4 text-gray-400">Penalty</th></tr></thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="py-3 px-4 text-white">Invalid result (fraud proven)</td><td className="py-3 px-4 text-red-400">50% of stake</td></tr>
                <tr><td className="py-3 px-4 text-white">Job timeout (no response)</td><td className="py-3 px-4 text-yellow-400">1% of stake</td></tr>
                <tr><td className="py-3 px-4 text-white">Repeated timeouts</td><td className="py-3 px-4 text-yellow-400">Tier downgrade</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex justify-between">
            <Link href="/docs/crucible/how-it-works" className="flex items-center gap-2 text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" /> How Crucible Works
            </Link>
            <Link href="/docs/crucible/models" className="flex items-center gap-2 text-pyrax-orange hover:underline">
              Supported Models <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
