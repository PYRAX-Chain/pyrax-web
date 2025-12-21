"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Globe, CheckCircle, AlertTriangle, Info } from "lucide-react";

const networks = [
  {
    name: "DevNet (Local)",
    chainId: 789120,
    chainIdHex: "0xc0c20",
    rpcUrl: "http://127.0.0.1:8546",
    symbol: "PYRAX",
    explorer: "http://localhost:3001",
    status: "Development",
    statusColor: "blue",
    description: "Local development network for testing. Run your own node to use.",
  },
  {
    name: "Forge Testnet",
    chainId: 789121,
    chainIdHex: "0xc0c21",
    rpcUrl: "https://forge-rpc.pyrax.org",
    symbol: "PYRAX",
    explorer: "https://forge.pyrax.org",
    status: "Active",
    statusColor: "green",
    description: "Public testnet for testing dApps and transactions. Get free tokens from the faucet.",
  },
  {
    name: "Mainnet",
    chainId: 789100,
    chainIdHex: "0xc0afc",
    rpcUrl: "https://rpc.pyrax.org",
    symbol: "PYRAX",
    explorer: "https://explorer.pyrax.org",
    status: "Coming Soon",
    statusColor: "yellow",
    description: "Production network with real PYRAX tokens. Launch date TBA.",
  },
];

export default function NetworksPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-pyrax-orange">Documentation</Link>
          <span>/</span>
          <Link href="/docs/firelink" className="hover:text-pyrax-orange">Firelink</Link>
          <span>/</span>
          <span className="text-white">Network Switching</span>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-4">Network Switching</h1>
        <p className="text-xl text-gray-400 mb-8">
          Switch between PYRAX networks to use different environments for development, testing, and production.
        </p>

        {/* Available Networks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Available Networks</h2>
          <div className="space-y-6">
            {networks.map((network, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                      {network.name}
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        network.statusColor === 'green' ? 'bg-green-500/20 text-green-400' :
                        network.statusColor === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {network.status}
                      </span>
                    </h3>
                    <p className="text-gray-400 mt-1">{network.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Chain ID:</span>
                    <span className="text-white ml-2 font-mono">{network.chainId}</span>
                    <span className="text-gray-500 ml-2">({network.chainIdHex})</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Symbol:</span>
                    <span className="text-white ml-2">{network.symbol}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-500">RPC URL:</span>
                    <code className="text-pyrax-orange ml-2 text-xs">{network.rpcUrl}</code>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-500">Explorer:</span>
                    <a href={network.explorer} target="_blank" rel="noopener noreferrer" className="text-pyrax-orange ml-2 hover:underline text-xs">
                      {network.explorer}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Switch */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">How to Switch Networks</h2>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Open Firelink</h3>
                <p className="text-gray-400">Click the Firelink icon in your browser toolbar.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Click the Network Selector</h3>
                <p className="text-gray-400">
                  At the top of the wallet, you&apos;ll see the current network name. Click on it to open the network dropdown.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Select Your Network</h3>
                <p className="text-gray-400">
                  Choose the network you want to use from the list. Your balance will update to reflect your holdings on that network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Network Specific Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Important Notes</h2>
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Same Address, Different Balances</h4>
                  <p className="text-gray-400 text-sm">
                    Your wallet address is the same across all networks, but each network has separate balances. 
                    Tokens on Forge Testnet are not the same as tokens on Mainnet.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Testnet Tokens Have No Value</h4>
                  <p className="text-gray-400 text-sm">
                    Tokens on DevNet and Forge Testnet are for testing only and have no monetary value. 
                    Never pay real money for testnet tokens!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Get Free Testnet Tokens</h4>
                  <p className="text-gray-400 text-sm">
                    Visit the <Link href="https://faucet.pyrax.org" className="text-pyrax-orange hover:underline">PYRAX Faucet</Link> to 
                    get free tokens for testing on Forge Testnet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* dApp Network Switching */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">dApp Network Requests</h2>
          <p className="text-gray-400 mb-4">
            Some dApps may request you switch to a specific network. When this happens:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-400">
            <li>Firelink will show a popup asking to switch networks</li>
            <li>Review the requested network details</li>
            <li>Click &quot;Switch Network&quot; to approve or &quot;Cancel&quot; to stay on current network</li>
          </ol>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link href="/docs/firelink/dapps" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Connecting to dApps
          </Link>
          <Link href="/docs/firelink/security" className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors">
            Security Best Practices
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
