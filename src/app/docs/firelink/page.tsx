"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Chrome, Shield, Zap, Globe, Bell, Lock, Wallet, ExternalLink, CheckCircle } from "lucide-react";

export default function FirelinkDocsPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-pyrax-orange">Documentation</Link>
          <span>/</span>
          <span className="text-white">Firelink Extension</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pyrax-orange to-pyrax-amber flex items-center justify-center">
              <Chrome className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Firelink Extension</h1>
              <p className="text-gray-400">Official PYRAX Browser Wallet</p>
            </div>
          </div>
          <p className="text-xl text-gray-400 mt-6">
            Firelink is the official PYRAX wallet browser extension for Chrome and Chromium-based browsers. 
            It provides a secure, fast, and intuitive way to manage your PYRAX tokens and interact with 
            decentralized applications (dApps) on the PYRAX network.
          </p>
        </div>

        {/* Quick Download */}
        <div className="bg-gradient-to-r from-pyrax-orange/20 to-pyrax-amber/10 border border-pyrax-orange/30 rounded-2xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to get started?</h3>
              <p className="text-gray-400">Download Firelink and set up your wallet in under 2 minutes.</p>
            </div>
            <a
              href="/downloads/pyrax-firelink-v1.0.0.zip"
              className="flex items-center gap-2 px-6 py-3 bg-pyrax-orange text-black font-bold rounded-lg hover:bg-pyrax-amber transition-colors shrink-0"
            >
              <Download className="w-5 h-5" />
              Download v1.0.0
            </a>
          </div>
        </div>

        {/* Features Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Shield, title: "Secure Storage", desc: "AES-256 encryption for all private keys" },
              { icon: Zap, title: "Fast Transactions", desc: "One-click send with real-time confirmations" },
              { icon: Globe, title: "dApp Integration", desc: "EIP-1193 compatible provider for all dApps" },
              { icon: Bell, title: "Notifications", desc: "Badge alerts for pending transactions" },
              { icon: Lock, title: "Auto-Lock", desc: "Automatic 15-minute timeout for security" },
              { icon: Wallet, title: "Multi-Wallet", desc: "Manage multiple wallets from one extension" },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-10 h-10 bg-pyrax-orange/10 rounded-lg flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-pyrax-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Browser Support */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Browser Support</h2>
          <p className="text-gray-400 mb-4">
            Firelink works with all Chromium-based browsers:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Chrome", icon: "🌐" },
              { name: "Brave", icon: "🦁" },
              { name: "Edge", icon: "🔷" },
              { name: "Opera", icon: "🎭" },
            ].map((browser, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-2xl">{browser.icon}</span>
                <span className="text-white font-medium">{browser.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">How Firelink Works</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400">
              Firelink operates as a browser extension that creates a secure bridge between your browser 
              and the PYRAX blockchain. Here&apos;s what happens under the hood:
            </p>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Wallet Creation & Storage</h3>
            <p className="text-gray-400">
              When you create a new wallet, Firelink generates a cryptographically secure 12-word 
              recovery phrase (BIP39 standard). This phrase is used to derive your private key and 
              wallet address. Your private key is then encrypted using AES-256-GCM with a key derived 
              from your password (PBKDF2 with 100,000 iterations) and stored locally in Chrome&apos;s 
              secure storage.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Transaction Signing</h3>
            <p className="text-gray-400">
              When you or a dApp requests a transaction, Firelink prompts you for approval. Once 
              approved, the transaction is signed locally using your private key (which is decrypted 
              temporarily in memory) and then broadcast to the PYRAX network. Your private key is 
              never exposed to websites or external services.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">dApp Connection (EIP-1193)</h3>
            <p className="text-gray-400">
              Firelink injects a standard EIP-1193 provider into every webpage. This allows dApps to 
              request your wallet address, initiate transactions, and sign messages - all with your 
              explicit approval. The provider is accessible via <code className="text-pyrax-orange">window.pyrax</code> or 
              <code className="text-pyrax-orange"> window.ethereum</code>.
            </p>
          </div>
        </section>

        {/* Network Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Supported Networks</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 text-gray-400 font-medium">Network</th>
                  <th className="py-3 text-gray-400 font-medium">Chain ID</th>
                  <th className="py-3 text-gray-400 font-medium">RPC URL</th>
                  <th className="py-3 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-white">DevNet (Local)</td>
                  <td className="py-3 text-gray-400 font-mono">789536</td>
                  <td className="py-3 text-gray-400 font-mono text-sm">http://127.0.0.1:8546</td>
                  <td className="py-3"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Development</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-white">Forge Testnet</td>
                  <td className="py-3 text-gray-400 font-mono">789537</td>
                  <td className="py-3 text-gray-400 font-mono text-sm">https://forge-rpc.pyrax.org</td>
                  <td className="py-3"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 text-white">Mainnet</td>
                  <td className="py-3 text-gray-400 font-mono">7895</td>
                  <td className="py-3 text-gray-400 font-mono text-sm">https://rpc.pyrax.org</td>
                  <td className="py-3"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Coming Soon</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Documentation Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Documentation</h2>
          <div className="grid gap-3">
            {[
              { title: "Installation Guide", href: "/docs/firelink/installation", desc: "Step-by-step installation instructions" },
              { title: "Creating a Wallet", href: "/docs/firelink/create-wallet", desc: "Create your first PYRAX wallet" },
              { title: "Importing a Wallet", href: "/docs/firelink/import-wallet", desc: "Import from seed phrase or private key" },
              { title: "Sending & Receiving", href: "/docs/firelink/transactions", desc: "How to send and receive PYRAX" },
              { title: "Connecting to dApps", href: "/docs/firelink/dapps", desc: "Connect Firelink to decentralized apps" },
              { title: "Network Switching", href: "/docs/firelink/networks", desc: "Switch between networks" },
              { title: "Security Best Practices", href: "/docs/firelink/security", desc: "Keep your wallet secure" },
              { title: "Troubleshooting", href: "/docs/firelink/troubleshooting", desc: "Common issues and solutions" },
            ].map((doc, i) => (
              <Link
                key={i}
                href={doc.href}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-pyrax-orange/30 transition-colors group"
              >
                <div>
                  <h3 className="font-semibold text-white group-hover:text-pyrax-orange transition-colors">{doc.title}</h3>
                  <p className="text-sm text-gray-400">{doc.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-pyrax-orange transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link
            href="/docs"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Docs
          </Link>
          <Link
            href="/docs/firelink/installation"
            className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors"
          >
            Installation Guide
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
