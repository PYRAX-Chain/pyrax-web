"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Download, 
  Monitor, 
  ExternalLink, 
  CheckCircle,
  Sparkles,
  Shield,
  Zap,
  Github,
  Pickaxe,
  Blocks
} from "lucide-react";

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
            <span className="text-sm text-pyrax-orange font-medium">v1.1.0 Now Available</span>
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
                    href={`${RELEASES_BASE}/desktop/windows/PYRAX%20Desktop_1.1.0_x64-setup.exe`}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
                  >
                    <Monitor className="w-5 h-5" />
                    Windows
                    <Download className="w-4 h-4 opacity-70" />
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-4">macOS and Linux versions coming soon.</p>
              </div>

              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-pyrax-dark via-transparent to-transparent z-10" />
                  <div className="rounded-2xl bg-pyrax-darker border border-white/10 p-4 shadow-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="ml-2 text-xs text-gray-500">PYRAX Desktop v1.0.8</span>
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
            <span>Current Version: <strong className="text-white">v1.0.8</strong></span>
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
