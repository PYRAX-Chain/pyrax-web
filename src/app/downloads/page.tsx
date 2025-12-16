"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Download, 
  Monitor, 
  Terminal, 
  Cpu, 
  Pickaxe,
  Blocks,
  ExternalLink, 
  CheckCircle,
  Sparkles,
  Shield,
  Zap,
  Github
} from "lucide-react";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a3.3 3.3 0 0 0 1.182 2.114c.267.243.559.447.879.612-.186.467-.31.997-.31 1.559 0 1.619.923 2.916 2.06 2.916.857 0 1.595-.59 1.934-1.43.339.84 1.077 1.43 1.934 1.43 1.137 0 2.06-1.297 2.06-2.916 0-.562-.124-1.092-.31-1.559.32-.165.612-.369.879-.612a3.3 3.3 0 0 0 1.182-2.114c.123-.805-.009-1.657-.287-2.489-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298A5 5 0 0 0 12.504 0"/>
    </svg>
  );
}

const RELEASES_BASE = "https://github.com/PYRAX-Chain/pyrax-releases/raw/production-mainnet";

export default function DownloadsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pyrax-orange/10 via-pyrax-orange/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pyrax-orange/10 rounded-full blur-[150px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pyrax-orange/10 border border-pyrax-orange/20 mb-8">
            <Sparkles className="w-4 h-4 text-pyrax-orange" />
            <span className="text-sm text-pyrax-orange font-medium">v1.0.0 Now Available</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Download <span className="bg-gradient-to-r from-pyrax-orange to-pyrax-amber bg-clip-text text-transparent">PYRAX</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to mine, run nodes, and participate in the PYRAX network. 
            Choose between our intuitive desktop app or powerful command-line tools.
          </p>
        </div>
      </section>

      {/* GUI Applications Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
              <Monitor className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Desktop Applications</h2>
              <p className="text-gray-400">Graphical interface • Easy to use • Recommended for beginners</p>
            </div>
          </div>

          {/* PYRAX Desktop - Featured */}
          <div className="relative mb-8 p-8 rounded-3xl bg-gradient-to-br from-pyrax-orange/10 via-pyrax-dark to-pyrax-dark border border-pyrax-orange/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pyrax-orange/10 rounded-full blur-[100px]" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Image src="/brand/pyrax-coin.svg" alt="PYRAX" width={48} height={48} className="rounded-xl" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">PYRAX Desktop</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      ✨ Recommended
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">
                  The all-in-one PYRAX experience. Mine with CPU/GPU, manage your node, track validators, 
                  and monitor your earnings — all from a beautiful, intuitive interface.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: Pickaxe, text: "One-click mining" },
                    { icon: Blocks, text: "Built-in full node" },
                    { icon: Zap, text: "Real-time stats" },
                    { icon: Shield, text: "Validator management" },
                  ].map((feature) => (
                    <div key={feature.text} className="flex items-center gap-2 text-sm text-gray-300">
                      <feature.icon className="w-4 h-4 text-pyrax-orange" />
                      {feature.text}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a 
                    href={`${RELEASES_BASE}/desktop/windows/PYRAX%20Desktop_1.0.0_x64-setup.exe`}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
                  >
                    <Monitor className="w-5 h-5" />
                    Windows (EXE)
                    <Download className="w-4 h-4 opacity-70" />
                  </a>
                  <a 
                    href={`${RELEASES_BASE}/desktop/windows/PYRAX%20Desktop_1.0.0_x64_en-US.msi`}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:scale-105"
                  >
                    <Monitor className="w-5 h-5" />
                    Windows (MSI)
                    <Download className="w-4 h-4 opacity-70" />
                  </a>
                  <a 
                    href={`${RELEASES_BASE}/desktop/macos/PYRAX%20Desktop_1.0.0_x64.dmg`}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-all hover:scale-105"
                  >
                    <AppleIcon className="w-5 h-5" />
                    macOS Intel
                    <Download className="w-4 h-4 opacity-70" />
                  </a>
                  <a 
                    href={`${RELEASES_BASE}/desktop/macos/PYRAX%20Desktop_1.0.0_aarch64.dmg`}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-all hover:scale-105"
                  >
                    <AppleIcon className="w-5 h-5" />
                    macOS ARM
                    <Download className="w-4 h-4 opacity-70" />
                  </a>
                  <a 
                    href={`${RELEASES_BASE}/desktop/linux/pyrax-desktop_1.0.0_amd64.deb`}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold transition-all hover:scale-105"
                  >
                    <LinuxIcon className="w-5 h-5" />
                    Linux (DEB)
                    <Download className="w-4 h-4 opacity-70" />
                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-pyrax-dark via-transparent to-transparent z-10" />
                  <div className="rounded-2xl bg-pyrax-darker border border-white/10 p-4 shadow-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="ml-2 text-xs text-gray-500">PYRAX Desktop v1.0.0</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-8 bg-gradient-to-r from-pyrax-orange/20 to-transparent rounded-lg" />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-20 bg-white/5 rounded-lg" />
                        <div className="h-20 bg-white/5 rounded-lg" />
                        <div className="h-20 bg-white/5 rounded-lg" />
                      </div>
                      <div className="h-32 bg-white/5 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal/CLI Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Terminal className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Command Line Tools</h2>
              <p className="text-gray-400">Terminal-based • For advanced users • Server deployments</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Stream A Node */}
            <div className="p-6 rounded-2xl bg-pyrax-dark/50 border border-white/10 hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <span className="text-xl font-black text-blue-400">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Stream A Node</h3>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-purple-400">CLI Application</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                ASIC-optimized mining node. High-throughput SHA3-based proof-of-work for maximum security.
              </p>

              <div className="p-3 rounded-lg bg-black/30 font-mono text-xs text-gray-400 mb-4">
                <span className="text-green-400">$</span> ./pyrax-node-a --rpc-port 8545
              </div>

              <div className="flex flex-wrap gap-2">
                <a href={`${RELEASES_BASE}/pyrax-node-a/pyrax-node-a.exe/pyrax-node-a.exe`}
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm">
                  <Monitor className="w-4 h-4" /> Windows
                </a>
                <a href={`${RELEASES_BASE}/pyrax-node-a/pyrax-node-a-macos/pyrax-node-a-macos`}
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500/10 border border-gray-500/30 text-gray-400 hover:bg-gray-500/20 transition-colors text-sm">
                  <AppleIcon className="w-4 h-4" /> macOS
                </a>
                <a href={`${RELEASES_BASE}/pyrax-node-a/pyrax-node-a-macos-arm64/pyrax-node-a-macos-arm64`}
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500/10 border border-gray-500/30 text-gray-400 hover:bg-gray-500/20 transition-colors text-sm">
                  <AppleIcon className="w-4 h-4" /> macOS ARM
                </a>
                <a href={`${RELEASES_BASE}/pyrax-node-a/pyrax-node-a-linux/pyrax-node-a-linux`}
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-colors text-sm">
                  <LinuxIcon className="w-4 h-4" /> Linux
                </a>
              </div>
            </div>

            {/* Stream B Node */}
            <div className="p-6 rounded-2xl bg-pyrax-dark/50 border border-white/10 hover:border-green-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <span className="text-xl font-black text-green-400">B</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Stream B Node</h3>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-purple-400">CLI Application</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                CPU/GPU-friendly mining node. Memory-hard RandomX variant for decentralized mining.
              </p>

              <div className="p-3 rounded-lg bg-black/30 font-mono text-xs text-gray-400 mb-4">
                <span className="text-green-400">$</span> ./pyrax-node-b --mine --threads 8
              </div>

              <div className="flex flex-wrap gap-2">
                <a href={`${RELEASES_BASE}/pyrax-node-b/pyrax-node-b.exe/pyrax-node-b.exe`}
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm">
                  <Monitor className="w-4 h-4" /> Windows
                </a>
                <a href={`${RELEASES_BASE}/pyrax-node-b/pyrax-node-b-macos/pyrax-node-b-macos`}
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500/10 border border-gray-500/30 text-gray-400 hover:bg-gray-500/20 transition-colors text-sm">
                  <AppleIcon className="w-4 h-4" /> macOS
                </a>
                <a href={`${RELEASES_BASE}/pyrax-node-b/pyrax-node-b-macos-arm64/pyrax-node-b-macos-arm64`}
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500/10 border border-gray-500/30 text-gray-400 hover:bg-gray-500/20 transition-colors text-sm">
                  <AppleIcon className="w-4 h-4" /> macOS ARM
                </a>
                <a href={`${RELEASES_BASE}/pyrax-node-b/pyrax-node-b-linux/pyrax-node-b-linux`}
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-colors text-sm">
                  <LinuxIcon className="w-4 h-4" /> Linux
                </a>
              </div>
            </div>
          </div>

          {/* Linux Instructions */}
          <div className="mt-8 p-6 rounded-2xl bg-black/30 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <LinuxIcon className="w-5 h-5 text-orange-400" />
              Linux Installation
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 mb-2">AppImage (Universal):</p>
                <code className="block p-3 rounded-lg bg-black/50 text-green-400 font-mono text-xs">
                  chmod +x pyrax-*.AppImage && ./pyrax-*.AppImage
                </code>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Make CLI executable:</p>
                <code className="block p-3 rounded-lg bg-black/50 text-green-400 font-mono text-xs">
                  chmod +x pyrax-node-* && ./pyrax-node-*
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Help Getting Started?</h2>
          <p className="text-gray-400 mb-8">
            Check out our documentation or explore the source code on GitHub.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/docs" 
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-pyrax-orange hover:bg-pyrax-amber text-white font-semibold transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Documentation
            </Link>
            <a 
              href="https://github.com/PYRAX-Chain" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-colors"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Version Info */}
      <section className="py-8 px-4 border-t border-white/5">
        <div className="mx-auto max-w-7xl flex flex-wrap justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>Current Version: <strong className="text-white">v1.0.0</strong></span>
            <span>•</span>
            <a href="https://github.com/PYRAX-Chain/pyrax-desktop/releases" className="text-pyrax-orange hover:underline">
              Release Notes
            </a>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>All downloads are verified and signed</span>
          </div>
        </div>
      </section>
    </div>
  );
}
