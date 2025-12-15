"use client";

import { Download, Monitor, Cpu, CircuitBoard, Blocks, Server, ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";

// Custom Apple icon since lucide doesn't have one
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
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489.117.779.567 1.563 1.182 2.114.267.243.559.447.879.612-.186.467-.31.997-.31 1.559 0 1.619.923 2.916 2.06 2.916.857 0 1.595-.59 1.934-1.43.339.84 1.077 1.43 1.934 1.43 1.137 0 2.06-1.297 2.06-2.916 0-.562-.124-1.092-.31-1.559.32-.165.612-.369.879-.612.615-.551 1.065-1.335 1.182-2.114.123-.805-.009-1.657-.287-2.489-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298-.165-.013-.325-.021-.48-.021z"/>
    </svg>
  );
}

interface DownloadCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  downloads: {
    os: string;
    icon: React.ReactNode;
    url: string;
    color: string;
  }[];
  features?: string[];
}

function DownloadCard({ title, description, icon, badge, badgeColor, downloads, features }: DownloadCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-pyrax-orange/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-pyrax-orange/10 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-400 mb-4">{description}</p>
      
      {features && (
        <ul className="mb-6 space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      <div className="grid grid-cols-3 gap-3">
        {downloads.map((dl) => {
          const isComingSoon = dl.url.includes('Coming soon');
          return isComingSoon ? (
            <div
              key={dl.os}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-500/10 border border-gray-500/20 text-gray-500 cursor-not-allowed opacity-60`}
            >
              {dl.icon}
              <span className="text-sm font-medium">{dl.os}</span>
              <span className="text-xs">Coming Soon</span>
            </div>
          ) : (
            <a
              key={dl.os}
              href={dl.url}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl ${dl.color} transition-all duration-200 hover:scale-105`}
            >
              {dl.icon}
              <span className="text-sm font-medium">{dl.os}</span>
              <Download className="w-4 h-4 opacity-60" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pyrax-orange/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pyrax-orange/10 rounded-full blur-[120px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pyrax-orange/10 border border-pyrax-orange/20 mb-6">
            <Download className="w-5 h-5 text-pyrax-orange" />
            <span className="text-pyrax-orange font-medium">PYRAX Downloads</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Start Mining <span className="text-pyrax-orange">Today</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Download PYRAX mining software for your platform. Whether you&apos;re running ASICs or using your CPU/GPU, we&apos;ve got you covered.
          </p>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Desktop App */}
            <DownloadCard
              title="PYRAX Desktop"
              description="The all-in-one solution for PYRAX mining. Includes full node and miner with an easy-to-use interface."
              icon={<Cpu className="w-6 h-6 text-green-400" />}
              badge="Recommended"
              badgeColor="bg-green-500/20 text-green-400"
              features={[
                "Built-in CPU/GPU miner",
                "Full node included",
                "Real-time hashrate monitor",
                "One-click mining",
              ]}
              downloads={[
                {
                  os: "Windows",
                  icon: <Monitor className="w-8 h-8 text-blue-400" />,
                  url: "https://github.com/PYRAX-Chain/pyrax-desktop/releases/latest/download/pyrax-desktop.exe",
                  color: "bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30",
                },
                {
                  os: "macOS",
                  icon: <AppleIcon className="w-8 h-8 text-gray-300" />,
                  url: "#Coming soon",
                  color: "bg-gray-500/20 border border-gray-500/30 text-gray-300 hover:bg-gray-500/30",
                },
                {
                  os: "Linux",
                  icon: <LinuxIcon className="w-8 h-8 text-orange-400" />,
                  url: "#Coming soon",
                  color: "bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500/30",
                },
              ]}
            />

          </div>

          {/* Node Downloads */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Blocks className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">PYRAX Nodes</h3>
                <p className="text-gray-400">Run the network and support decentralization</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Stream A Node */}
              <div className="p-5 rounded-xl bg-[#12121a] border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="font-bold text-blue-400">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Stream A Node</h4>
                    <p className="text-xs text-gray-500">ASIC Mining Network</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <a href="https://github.com/PYRAX-Chain/pyrax-node-a/releases/latest/download/pyrax-node-a.exe"
                     className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors">
                    <Monitor className="w-4 h-4" />
                    <span className="text-sm">Win</span>
                  </a>
                  <a href="#Coming soon"
                     className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-500/10 border border-gray-500/20 text-gray-400 hover:bg-gray-500/20 transition-colors">
                    <AppleIcon className="w-4 h-4" />
                    <span className="text-sm">Mac</span>
                  </a>
                  <a href="#Coming soon"
                     className="flex items-center justify-center gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20 transition-colors">
                    <LinuxIcon className="w-4 h-4" />
                    <span className="text-sm">Linux</span>
                  </a>
                </div>
              </div>

              {/* Stream B Node */}
              <div className="p-5 rounded-xl bg-[#12121a] border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="font-bold text-green-400">B</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Stream B Node</h4>
                    <p className="text-xs text-gray-500">CPU/GPU Mining Network</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <a href="https://github.com/PYRAX-Chain/pyrax-node-b/releases/latest/download/pyrax-node-b.exe"
                     className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors">
                    <Monitor className="w-4 h-4" />
                    <span className="text-sm">Win</span>
                  </a>
                  <a href="#Coming soon"
                     className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-500/10 border border-gray-500/20 text-gray-400 hover:bg-gray-500/20 transition-colors">
                    <AppleIcon className="w-4 h-4" />
                    <span className="text-sm">Mac</span>
                  </a>
                  <a href="#Coming soon"
                     className="flex items-center justify-center gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20 transition-colors">
                    <LinuxIcon className="w-4 h-4" />
                    <span className="text-sm">Linux</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Need help getting started?</p>
            <div className="flex justify-center gap-4">
              <Link href="/docs/getting-started" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-pyrax-orange/10 border border-pyrax-orange/30 text-pyrax-orange hover:bg-pyrax-orange/20 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Getting Started Guide
              </Link>
              <a href="https://github.com/PYRAX-Chain" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors">
                <ExternalLink className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
