import Link from "next/link";
import {
  Monitor,
  Download,
  Server,
  Pickaxe,
  Coins,
  Activity,
  Gauge,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  Zap,
  Settings,
  MessageSquare,
  BarChart3,
  Layers,
  CheckCircle,
  ArrowRight,
  Apple,
  Terminal,
  Sparkles,
  Brain,
  Lock,
  RefreshCw,
  Bell,
  Palette,
} from "lucide-react";

// GitHub media URL for LFS files - enables direct downloads
const MEDIA_BASE = "https://media.githubusercontent.com/media/PYRAX-Chain/pyrax-releases/production-mainnet";

const APP_VERSION = "1.0.0";

// Download links - hosted on DigitalOcean Spaces CDN
const CDN_BASE = "https://pyrax-assets.nyc3.cdn.digitaloceanspaces.com";

const downloadLinks = {
  windows: {
    exe: `${CDN_BASE}/releases/network-hub/windows/PYRAX-Network-Hub-${APP_VERSION}-x64-setup.exe`,
  },
  macos: {
    dmg: `${CDN_BASE}/releases/network-hub/macos/PYRAX-Network-Hub-${APP_VERSION}-universal.dmg`,
  },
  linux: {
    deb: `${CDN_BASE}/releases/network-hub/linux/pyrax-network-hub-${APP_VERSION}-amd64.deb`,
    appimage: `${CDN_BASE}/releases/network-hub/linux/PYRAX-Network-Hub-${APP_VERSION}-x86_64.AppImage`,
  },
};

const features = [
  {
    icon: Server,
    title: "Multi-Node Management",
    description: "Run and manage both Stream A and Stream B nodes from one interface. Start, stop, restart with one click. Automatic port conflict resolution.",
    color: "cyan",
  },
  {
    icon: Pickaxe,
    title: "CPU & GPU Mining",
    description: "Mine PYRAX with your CPU or GPU. Solo mining or pool mining support. Real-time hashrate monitoring and profitability estimation.",
    color: "green",
  },
  {
    icon: Coins,
    title: "Staking & Validation",
    description: "Stake PYRAX tokens to become a validator on Stream C. Earn staking rewards, claim pending rewards, and track your validator status.",
    color: "amber",
  },
  {
    icon: Sparkles,
    title: "AI Worker (Crucible)",
    description: "Register as a Crucible AI worker. Process AI inference jobs and earn additional PYRAX rewards alongside your mining.",
    color: "purple",
  },
  {
    icon: Brain,
    title: "ML Training (Foundry)",
    description: "Contribute your GPU to Foundry ML training jobs. Participate in federated learning and earn rewards for compute contribution.",
    color: "orange",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Live network stats, block height, peer count, and transaction throughput. Beautiful charts and visualizations.",
    color: "blue",
  },
  {
    icon: BarChart3,
    title: "Hardware Benchmarking",
    description: "Benchmark your CPU and GPU to estimate mining profitability. Compare your hardware against network averages.",
    color: "pink",
  },
  {
    icon: MessageSquare,
    title: "Matrix Chat Integration",
    description: "Built-in decentralized chat powered by Matrix protocol. Communicate with other PYRAX users directly from the app.",
    color: "indigo",
  },
  {
    icon: RefreshCw,
    title: "Auto-Updates",
    description: "Automatic update notifications and one-click updates. Always stay on the latest version with security patches.",
    color: "teal",
  },
  {
    icon: Bell,
    title: "Desktop Notifications",
    description: "Get notified about block rewards, staking rewards, AI job completions, and important network events.",
    color: "red",
  },
  {
    icon: Palette,
    title: "Modern Dark UI",
    description: "Beautiful dark theme designed for 24/7 operation. Easy on the eyes with PYRAX brand colors throughout.",
    color: "slate",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your keys stay on your machine. No telemetry, no tracking. Open source and auditable codebase.",
    color: "emerald",
  },
];

const systemRequirements = {
  minimum: [
    { label: "OS", value: "Windows 10, macOS 10.15, Ubuntu 20.04" },
    { label: "CPU", value: "4 cores, 2.0 GHz" },
    { label: "RAM", value: "8 GB" },
    { label: "Storage", value: "50 GB SSD" },
    { label: "Network", value: "10 Mbps" },
  ],
  recommended: [
    { label: "OS", value: "Windows 11, macOS 14, Ubuntu 24.04" },
    { label: "CPU", value: "8+ cores, 3.0+ GHz" },
    { label: "RAM", value: "16 GB+" },
    { label: "Storage", value: "256 GB NVMe SSD" },
    { label: "GPU", value: "NVIDIA RTX 3060+ (for mining)" },
    { label: "Network", value: "100 Mbps+" },
  ],
};

export default function NetworkHubPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-pyrax-dark to-green-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">DESKTOP APPLICATION</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white">
              PYRAX
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400">
                Network Hub
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              The ultimate all-in-one desktop application for the PYRAX ecosystem. Manage nodes, mine cryptocurrency, stake tokens, run AI workers, and monitor everything from one beautiful interface.
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={downloadLinks.windows.exe}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-cyan-500/25"
              >
                <Download className="w-6 h-6" />
                Download for Windows
              </a>
              <Link
                href="#downloads"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-colors"
              >
                View All Platforms
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              Version 1.0.0 • Free & Open Source • No Account Required
            </p>
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-16 -mt-16 relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-pyrax-dark to-pyrax-darker shadow-2xl shadow-black/50">
            {/* Window Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-pyrax-darker border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-sm text-gray-400 font-medium">PYRAX Network Hub v1.0.0</div>
            </div>
            
            {/* App Content Mock - Dashboard */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pyrax-orange to-pyrax-amber flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Dashboard</div>
                    <div className="text-xs text-gray-500">Connected to Devnet</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400">Online</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Block Height", value: "1,234,567", icon: Layers, color: "cyan" },
                  { label: "Network Hashrate", value: "1.24 TH/s", icon: Gauge, color: "green" },
                  { label: "Active Peers", value: "2,847", icon: Wifi, color: "blue" },
                  { label: "TPS", value: "45,230", icon: Zap, color: "amber" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                      <span className="text-xs text-gray-500">{stat.label}</span>
                    </div>
                    <div className={`text-xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-3 gap-4">
                {/* Nodes Status */}
                <div className="col-span-2 p-4 rounded-xl bg-white/5 border border-white/5">
                  <h3 className="text-sm font-semibold text-white mb-4">Node Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">Node A</span>
                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-0.5 rounded">Running</span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex justify-between"><span>Stream</span><span className="text-blue-400">A (ASIC)</span></div>
                        <div className="flex justify-between"><span>RPC Port</span><span className="text-white font-mono">8545</span></div>
                        <div className="flex justify-between"><span>Blocks</span><span className="text-white">1,234,567</span></div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">Node B</span>
                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-0.5 rounded">Running</span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex justify-between"><span>Stream</span><span className="text-green-400">B (GPU)</span></div>
                        <div className="flex justify-between"><span>RPC Port</span><span className="text-white font-mono">8546</span></div>
                        <div className="flex justify-between"><span>Blocks</span><span className="text-white">12,345,678</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mining Stats */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h3 className="text-sm font-semibold text-white mb-4">Mining</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Status</span>
                      <span className="text-xs text-green-400">Mining (CPU)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Hashrate</span>
                      <span className="text-sm font-bold text-green-400">45.2 MH/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Shares</span>
                      <span className="text-xs text-white">1,234 / 2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Blocks Found</span>
                      <span className="text-xs text-pyrax-orange font-bold">3</span>
                    </div>
                    <div className="h-16 mt-2 rounded bg-white/5 flex items-end justify-around px-2 pb-2">
                      {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85].map((h, i) => (
                        <div key={i} className="w-2 bg-gradient-to-t from-green-500 to-green-400 rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow */}
          <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-green-500/10 blur-3xl -z-10" />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Everything You Need in <span className="text-cyan-400">One App</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Network Hub combines all PYRAX tools into a single, powerful desktop application
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className={`inline-flex p-2.5 rounded-lg bg-${feature.color}-500/10 mb-3`}>
                  <feature.icon className={`w-5 h-5 text-${feature.color}-400`} />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="py-24 bg-gradient-to-b from-pyrax-dark/50 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Download <span className="text-cyan-400">Network Hub</span>
            </h2>
            <p className="mt-4 text-gray-400">
              Available for Windows, macOS, and Linux. Free and open source.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Windows */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Windows</h3>
                  <p className="text-sm text-gray-400">Windows 10 or later</p>
                </div>
              </div>
              <a
                href={downloadLinks.windows.exe}
                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold"
              >
                <Download className="w-5 h-5" />
                Download EXE
              </a>
            </div>

            {/* macOS */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-gray-500/10">
                  <Apple className="w-8 h-8 text-gray-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">macOS</h3>
                  <p className="text-sm text-gray-400">macOS 10.15 or later</p>
                </div>
              </div>
              <a
                href={downloadLinks.macos.dmg}
                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors text-white font-semibold"
              >
                <Download className="w-5 h-5" />
                Download DMG
              </a>
            </div>

            {/* Linux */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-orange-500/10">
                  <Terminal className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Linux</h3>
                  <p className="text-sm text-gray-400">Ubuntu, Debian, Fedora</p>
                </div>
              </div>
              <a
                href={downloadLinks.linux.appimage}
                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-orange-600 hover:bg-orange-500 transition-colors text-white font-semibold"
              >
                <Download className="w-5 h-5" />
                Download AppImage
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="https://github.com/PYRAX-Chain/pyrax-network-hub"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View source on GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">System Requirements</h2>
            <p className="mt-4 text-gray-400">
              Make sure your system meets these requirements for the best experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Minimum */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-gray-400" />
                Minimum Requirements
              </h3>
              <div className="space-y-3">
                {systemRequirements.minimum.map((req) => (
                  <div key={req.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-gray-400">{req.label}</span>
                    <span className="text-sm text-white">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-green-500/10 border border-cyan-500/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                Recommended
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">Best</span>
              </h3>
              <div className="space-y-3">
                {systemRequirements.recommended.map((req) => (
                  <div key={req.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-gray-400">{req.label}</span>
                    <span className="text-sm text-white">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-t from-cyan-500/10 to-transparent">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Download PYRAX Network Hub and start mining, staking, and earning today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={downloadLinks.windows.exe}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all"
            >
              <Download className="w-5 h-5" />
              Download for Windows
            </a>
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/10 transition-colors"
            >
              Read Documentation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
