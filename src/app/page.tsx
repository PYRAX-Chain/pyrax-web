import Link from "next/link";
import {
  Cpu,
  Shield,
  Zap,
  GitBranch,
  Lock,
  ArrowRight,
  CheckCircle,
  FileCode,
  Sparkles,
  Bot,
  ImageIcon,
  MessageSquare,
  Flame,
  Brain,
  Users,
  Database,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "100,000+ TPS",
    description:
      "High throughput through parallel transaction execution and 100ms Stream C blocks.",
  },
  {
    icon: GitBranch,
    title: "TriStream Architecture",
    description:
      "Stream A (ASIC security), Stream B (GPU decentralization), Stream C (high-speed transactions). Three layers working as one.",
  },
  {
    icon: Shield,
    title: "ZK-Proven Finality",
    description:
      "Zero-knowledge proofs provide cryptographic finality. Sub-second confirmation with mathematical certainty.",
  },
  {
    icon: Cpu,
    title: "Parallel Execution",
    description:
      "SEALEVEL-inspired execution engine processes non-conflicting transactions simultaneously across 64 threads.",
  },
  {
    icon: Lock,
    title: "No Admin Keys",
    description:
      "Core protocol has no admin keys that can seize funds or change consensus rules. True decentralization by design.",
  },
  {
    icon: FileCode,
    title: "EVM Compatible",
    description:
      "Full Ethereum Virtual Machine compatibility. Deploy existing Solidity contracts with deterministic execution.",
  },
];

const stats = [
  { label: "Target TPS", value: "100K+" },
  { label: "Block Time", value: "100ms" },
  { label: "Confirmation", value: "<1 sec" },
  { label: "Streams", value: "3" },
];

export default function HomePage() {
  return (
    <div>
      {/* Testnet Status Banner */}
      <div className="bg-red-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <p className="font-medium">
            <span className="font-bold">Crownflame Testnet is offline</span> — We are actively working to bring it online. Stay tuned for updates!
          </p>
        </div>
      </div>

      <section className="relative overflow-hidden py-24 sm:py-32 min-h-[90vh] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/EmberBG.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay at 50% opacity */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pyrax-orange/10 border border-pyrax-orange/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pyrax-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pyrax-orange"></span>
              </span>
              <span className="text-sm text-pyrax-orange">
                Presale Now Live
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              <span className="block">TriStream</span>
              <span className="block bg-gradient-to-r from-pyrax-orange via-pyrax-amber to-pyrax-orange bg-clip-text text-transparent">
                ZK-DAG Blockchain
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              A next-generation Proof-of-Work blockchain. High throughput through parallel
              execution, 100ms blocks, and ZK-proven finality with true decentralization.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/presale"
                className="inline-flex items-center gap-2 px-8 py-4 bg-pyrax-orange hover:bg-pyrax-amber text-white font-semibold rounded-lg transition-colors"
              >
                Join Presale
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/technology"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-white/5 bg-pyrax-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why PYRAX?
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              A novel approach to blockchain architecture combining proven
              concepts with cutting-edge cryptography.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-pyrax-orange/30 transition-colors group"
              >
                <div className="inline-flex p-3 rounded-lg bg-pyrax-orange/10 text-pyrax-orange group-hover:bg-pyrax-orange group-hover:text-white transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-pyrax-dark/50 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                TriStream Architecture
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Three complementary streams working together to achieve
                security, decentralization, and finality.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <span className="text-blue-400 font-bold">A</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Stream A: ASIC Mining
                    </h3>
                    <p className="text-gray-400">
                      High-throughput security through specialized hardware.
                      Majority of block rewards for maximum economic security.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <span className="text-green-400 font-bold">B</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Stream B: CPU/GPU Mining
                    </h3>
                    <p className="text-gray-400">
                      Accessible mining for commodity hardware. Geographic and
                      demographic decentralization of consensus.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <span className="text-purple-400 font-bold">C</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Stream C: Transaction Sequencer
                    </h3>
                    <p className="text-gray-400">
                      100ms blocks with parallel execution. 100,000+ TPS capacity
                      with ZK-proven finality. The speed layer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pyrax-orange/20 to-purple-500/20 rounded-2xl blur-3xl" />
              <div className="relative p-8 rounded-2xl bg-pyrax-gray border border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <span className="text-gray-300">Target TPS</span>
                    <span className="text-white font-mono text-pyrax-orange">100,000+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <span className="text-gray-300">Stream C Block Time</span>
                    <span className="text-white font-mono">100ms</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <span className="text-gray-300">Parallel Threads</span>
                    <span className="text-white font-mono">64</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <span className="text-gray-300">Finality</span>
                    <span className="text-white font-mono">ZK-STARK Proofs</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <span className="text-gray-300">Confirmation</span>
                    <span className="text-white font-mono text-green-400">&lt;1 second</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crucible - AI Compute Layer */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pyrax-orange/10 to-blue-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400 font-medium">INTRODUCING: PYRAX Crucible</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pyrax-orange to-amber-400">Crucible</span>
              <br />
              <span className="text-2xl sm:text-3xl text-gray-300">Where GPU Compute Forges Intelligence</span>
            </h2>
            <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
              The first Layer 1 blockchain with native AI compute. GPU miners process AI inference jobs alongside mining, earning additional PYRX rewards while powering decentralized AI on the Crucible network.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Text Generation</h3>
              <p className="text-gray-400 text-sm">Run LLMs like Llama 3 and Mistral. Generate text, answer questions, and power AI agents—all on-chain.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pyrax-orange/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-pyrax-orange/10 flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-pyrax-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Image Generation</h3>
              <p className="text-gray-400 text-sm">Create images with Stable Diffusion and Flux. NFT generation, AI art, and visual content—trustlessly verified.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Contract AI</h3>
              <p className="text-gray-400 text-sm">Call AI directly from Solidity. Build intelligent dApps with native AI precompiles—no oracles needed.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="p-6 rounded-2xl bg-pyrax-dark/80 border border-white/10">
              <div className="text-xs text-gray-500 font-mono mb-2">// Solidity Example</div>
              <pre className="text-sm font-mono overflow-x-auto">
                <code className="text-gray-300">{`interface IPyraxAI {
    function generateText(
        string model,
        string prompt,
        uint256 maxTokens
    ) external returns (bytes32 jobId);
}

contract MyAIApp {
    IPyraxAI ai = IPyraxAI(0x0...0A1);
    
    function askAI(string memory q) external {
        ai.generateText("llama-3", q, 100);
    }
}`}</code>
              </pre>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Trustless Verification</h4>
                  <p className="text-sm text-gray-400">Results verified via ZK proofs or optimistic verification with slashing for invalid outputs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Dual-Purpose GPUs</h4>
                  <p className="text-sm text-gray-400">Stream B miners earn from both mining AND AI inference. Maximum hardware utilization.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Protocol Revenue</h4>
                  <p className="text-sm text-gray-400">5% of AI job fees burned, creating deflationary pressure and real protocol value.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
            <Link
              href="/crucible"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pyrax-orange hover:from-purple-600 hover:to-pyrax-amber text-white font-semibold rounded-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Explore Crucible
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/whitepaper#sec-7"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-colors"
            >
              Read Technical Spec
            </Link>
          </div>
        </div>
      </section>

      {/* Foundry - ML Training Platform */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-red-900/10 to-amber-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-400 font-medium">INTRODUCING: PYRAX Foundry</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400">Foundry</span>
              <br />
              <span className="text-2xl sm:text-3xl text-gray-300">Where Raw Data is Forged into AI Models</span>
            </h2>
            <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
              The first decentralized machine learning training platform. Train models on community GPUs, earn PYRX for compute contributions, and build the future of open AI—70% cheaper than cloud providers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Supervised Learning</h3>
              <p className="text-gray-400 text-sm">Train custom models on your labeled datasets using distributed GPU compute from the PYRAX network.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Federated Learning</h3>
              <p className="text-gray-400 text-sm">Privacy-preserving training across decentralized nodes. Your data never leaves your device.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fine-Tuning (LoRA)</h3>
              <p className="text-gray-400 text-sm">Efficiently adapt pre-trained models to your use case with parameter-efficient fine-tuning.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="p-6 rounded-2xl bg-pyrax-dark/80 border border-white/10">
              <div className="text-xs text-gray-500 font-mono mb-2"># training-job.yaml</div>
              <pre className="text-sm font-mono overflow-x-auto">
                <code className="text-gray-300">{`job_type: fine_tune
model:
  base_model: mistral-7b
  method: qlora
dataset:
  source: ipfs://QmYourData...
training:
  epochs: 3
  batch_size: 4
distributed:
  gpus_requested: 4
  min_vram: 24GB
budget:
  max_cost: 500 PYRX`}</code>
              </pre>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Train-to-Earn</h4>
                  <p className="text-sm text-gray-400">GPU providers earn PYRX for contributing compute cycles to training jobs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Byzantine-Resistant</h4>
                  <p className="text-sm text-gray-400">Krum aggregation and ZK proofs ensure training integrity even with malicious nodes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Crucible Integration</h4>
                  <p className="text-sm text-gray-400">Train on Foundry → Publish to Registry → Deploy on Crucible. Complete AI lifecycle.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
            <Link
              href="/foundry"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all"
            >
              <Flame className="w-4 h-4" />
              Explore Foundry
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/whitepaper#sec-8"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-colors"
            >
              Read Technical Spec
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Network Roadmap
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Progressive rollout from internal development through public
              testnets to mainnet launch.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                name: "Smelter",
                type: "Internal Devnet",
                status: "complete",
              },
              {
                name: "Kindling",
                type: "Public Testnet v0.1",
                status: "in_development",
              },
              {
                name: "Forgefire",
                type: "Public Testnet v0.2",
                status: "planned",
              },
              {
                name: "Crownflame",
                type: "Public Testnet v0.3",
                status: "planned",
              },
              { name: "Furnace", type: "Mainnet v1.0", status: "planned" },
            ].map((network, index) => (
              <div
                key={network.name}
                className="relative p-6 rounded-xl bg-white/5 border border-white/5 text-center"
              >
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-white/20" />
                )}
                <div className="text-2xl font-bold text-white">
                  {network.name}
                </div>
                <div className="mt-1 text-sm text-gray-400">{network.type}</div>
                <div className={`mt-4 inline-flex items-center gap-1 text-xs ${
                  network.status === "complete" ? "text-green-400" :
                  network.status === "in_development" ? "text-pyrax-amber" : "text-gray-500"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    network.status === "complete" ? "bg-green-400" :
                    network.status === "in_development" ? "bg-pyrax-amber animate-pulse" : "bg-gray-500"
                  }`} />
                  {network.status === "complete" ? "Complete" :
                   network.status === "in_development" ? "In Development" : "Planned"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-t from-pyrax-orange/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Join the PYRAX Presale
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Be part of the next generation of blockchain technology. ETH-only
              presale on Ethereum Mainnet.
            </p>

            <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/presale"
                className="inline-flex items-center gap-2 px-8 py-4 bg-pyrax-orange hover:bg-pyrax-amber text-white font-semibold rounded-lg transition-colors"
              >
                <img src="/brand/pyrax-coin.svg" alt="PYRX" className="h-5 w-5" />
                Participate Now
              </Link>
              <Link
                href="/tokenomics"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-colors"
              >
                View Tokenomics
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Verified Contract
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                No ROI Promises
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Risk Disclosures Included
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
            <h3 className="text-lg font-semibold text-yellow-400">
              Risk Disclosure
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Cryptocurrency investments carry significant risks including
              potential total loss of capital. PYRX tokens are not securities
              and provide no ownership, dividend, or governance rights. The
              PYRAX network is under active development and may not launch as
              planned. Past performance of cryptocurrencies does not guarantee
              future results. This website and its contents do not constitute
              financial, investment, legal, or tax advice. Always conduct your
              own research and consult professional advisors before
              participating in any cryptocurrency offering.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
