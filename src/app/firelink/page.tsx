"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Chrome,
  Download,
  Shield,
  Zap,
  Globe,
  Lock,
  Bell,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Copy,
  Check,
  Smartphone,
  Monitor,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const EXTENSION_VERSION = "1.0.0";
const EXTENSION_SIZE = "1.2 MB";

const features = [
  {
    icon: Shield,
    title: "Secure by Design",
    description: "AES-256 encryption protects your keys. Your private key never leaves your device.",
  },
  {
    icon: Zap,
    title: "Instant Transactions",
    description: "Send and receive PYRAX with one-click confirmations and real-time balance updates.",
  },
  {
    icon: Globe,
    title: "dApp Ready",
    description: "Connect to any PYRAX dApp with standard EIP-1193 provider. Works like MetaMask.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Badge alerts for pending transactions and balance changes across all tabs.",
  },
  {
    icon: Lock,
    title: "Auto-Lock",
    description: "Automatic 15-minute timeout keeps your wallet secure when you step away.",
  },
  {
    icon: Monitor,
    title: "Multi-Network",
    description: "Switch between DevNet, Forge Testnet, and Mainnet with a single click.",
  },
];

const installSteps = [
  {
    step: 1,
    title: "Download Extension",
    description: "Click the download button to get the PYRAX Firelink extension ZIP file.",
  },
  {
    step: 2,
    title: "Extract Files",
    description: "Unzip the downloaded file to a folder on your computer.",
  },
  {
    step: 3,
    title: "Open Extensions",
    description: "Go to chrome://extensions in your browser and enable Developer Mode.",
  },
  {
    step: 4,
    title: "Load Extension",
    description: 'Click "Load unpacked" and select the extracted folder.',
  },
];

const faqs = [
  {
    q: "Is Firelink safe to use?",
    a: "Yes! Firelink uses industry-standard AES-256 encryption. Your private keys are encrypted and stored locally - they never leave your device or get sent to any server.",
  },
  {
    q: "Can I use the same wallet in Firelink and the Desktop App?",
    a: "Yes! Simply import your wallet using the same 12-word recovery phrase in both applications. Both will have access to the same funds.",
  },
  {
    q: "Why isn't Firelink on the Chrome Web Store?",
    a: "We're in the process of submitting to the Chrome Web Store. In the meantime, you can install directly using Developer Mode - it's completely safe and gives you early access!",
  },
  {
    q: "Which browsers are supported?",
    a: "Firelink works on Chrome, Brave, Edge, Opera, and any Chromium-based browser.",
  },
  {
    q: "How do I backup my wallet?",
    a: "Your 12-word recovery phrase IS your backup. Write it down and store it securely offline. With this phrase, you can recover your wallet on any device.",
  },
];

export default function FirelinkPage() {
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pyrax-orange/20 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-pyrax-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pyrax-amber/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pyrax-orange/10 border border-pyrax-orange/30 rounded-full text-pyrax-orange text-sm mb-8">
              <Zap className="w-4 h-4" />
              <span>Browser Extension v{EXTENSION_VERSION}</span>
            </div>

            {/* Logo & Title */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pyrax-orange to-pyrax-amber flex items-center justify-center shadow-2xl shadow-pyrax-orange/30">
                <span className="text-4xl">🔥</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              PYRAX <span className="text-pyrax-orange">Firelink</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Your gateway to the PYRAX ecosystem. A secure, fast, and powerful browser wallet
              for managing your PYRAX tokens and connecting to dApps.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="https://pyrax-assets.nyc3.cdn.digitaloceanspaces.com/releases/firelink/pyrax-firelink-v1.0.0.zip"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pyrax-orange to-pyrax-amber text-black font-bold rounded-xl hover:shadow-lg hover:shadow-pyrax-orange/30 transition-all"
              >
                <Download className="w-5 h-5" />
                Download for Chrome
              </a>
              <a
                href="https://github.com/PYRAX-Chain/pyrax-chrome-extension"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                View on GitHub
              </a>
            </div>

            {/* Browser Icons */}
            <div className="flex items-center justify-center gap-6 text-gray-500">
              <span className="text-sm">Works with:</span>
              <div className="flex items-center gap-4">
                <Chrome className="w-6 h-6" />
                <span className="text-2xl">🦁</span>
                <span className="text-xl">🌐</span>
                <span className="text-xl">🎭</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-gray-400">Powerful features for managing your PYRAX tokens</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-pyrax-orange/30 transition-colors"
              >
                <div className="w-12 h-12 bg-pyrax-orange/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-pyrax-orange" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-20 bg-gradient-to-b from-transparent via-pyrax-orange/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Quick Installation</h2>
            <p className="text-gray-400">Get started in under 2 minutes</p>
          </div>

          <div className="space-y-6">
            {installSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl"
              >
                <div className="w-12 h-12 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold text-xl shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chrome Extensions URL */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-gray-400 mb-2">Chrome Extensions URL:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-2 bg-black/30 rounded-lg text-pyrax-orange font-mono text-sm">
                chrome://extensions
              </code>
              <button
                onClick={() => handleCopy("chrome://extensions")}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison with Desktop */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Firelink vs Desktop App</h2>
            <p className="text-gray-400">Choose the right tool for your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Firelink */}
            <div className="p-8 bg-gradient-to-br from-pyrax-orange/10 to-transparent border border-pyrax-orange/30 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Chrome className="w-8 h-8 text-pyrax-orange" />
                <h3 className="text-2xl font-bold text-white">Firelink Extension</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Create & manage wallets",
                  "Send & receive PYRAX",
                  "Connect to dApps",
                  "Multi-network support",
                  "Transaction history",
                  "QR code for receiving",
                  "Auto-lock security",
                  "Cross-tab sync",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-pyrax-orange">
                Best for: Daily transactions & dApp usage
              </p>
            </div>

            {/* Desktop */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Monitor className="w-8 h-8 text-gray-400" />
                <h3 className="text-2xl font-bold text-white">Desktop App</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Run PYRAX nodes",
                  "Mine PYRAX (GPU/CPU)",
                  "Bug reporting",
                  "Node status monitoring",
                  "Wallet features (use Firelink instead)",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-gray-400">
                Best for: Running nodes & mining
              </p>
              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 mt-4 text-pyrax-orange hover:underline"
              >
                Download Desktop App <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-white">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5 text-gray-400">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">
            Download Firelink and start managing your PYRAX tokens in seconds.
          </p>
          <a
            href="/downloads/pyrax-firelink-v1.0.0.zip"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pyrax-orange to-pyrax-amber text-black font-bold rounded-xl hover:shadow-lg hover:shadow-pyrax-orange/30 transition-all"
          >
            <Download className="w-5 h-5" />
            Download Firelink v{EXTENSION_VERSION}
            <span className="text-sm opacity-70">({EXTENSION_SIZE})</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PYRAX LLC. All rights reserved.</p>
          <p className="mt-2">PYRAX™ is a pending trademark of PYRAX LLC.</p>
        </div>
      </footer>
    </div>
  );
}
