"use client";

import Link from "next/link";
import { ArrowLeft, HelpCircle, AlertTriangle, CheckCircle, RefreshCw, Trash2, ExternalLink } from "lucide-react";

const issues = [
  {
    title: "Extension icon not showing in toolbar",
    problem: "After installing, I can't find the Firelink icon.",
    solutions: [
      "Click the puzzle piece icon (Extensions) in Chrome toolbar",
      "Find PYRAX Firelink and click the pin icon to pin it",
      "If not listed, go to chrome://extensions and verify it's enabled",
    ],
  },
  {
    title: "\"Manifest file is missing\" error",
    problem: "I get an error when trying to load the extension.",
    solutions: [
      "Make sure you've extracted the ZIP file first",
      "Select the extracted folder, not the ZIP file itself",
      "Ensure the folder contains manifest.json file",
    ],
  },
  {
    title: "Wallet not connecting to dApps",
    problem: "dApps don't detect Firelink or connection fails.",
    solutions: [
      "Refresh the dApp page after installing Firelink",
      "Make sure you're on the correct network for the dApp",
      "Check if Firelink is unlocked (not showing lock screen)",
      "Try disconnecting and reconnecting in Firelink settings",
    ],
  },
  {
    title: "Transaction stuck as pending",
    problem: "My transaction has been pending for a long time.",
    solutions: [
      "Check the PYRAX network status at status.pyrax.org",
      "Transactions may take longer during high network activity",
      "Try increasing the gas price for faster confirmation",
      "View transaction status on the block explorer",
    ],
  },
  {
    title: "Balance not updating",
    problem: "My balance doesn't reflect recent transactions.",
    solutions: [
      "Click the refresh button to manually update balance",
      "Check you're on the correct network",
      "Wait a few seconds - balance updates after block confirmation",
      "Clear browser cache and reload the extension",
    ],
  },
  {
    title: "Forgot password",
    problem: "I forgot my Firelink password.",
    solutions: [
      "Your password cannot be recovered",
      "If you have your recovery phrase, you can restore your wallet",
      "Go to welcome screen → Import Existing Wallet → Enter recovery phrase",
      "If you don't have your recovery phrase, funds cannot be recovered",
    ],
  },
  {
    title: "Extension crashes or freezes",
    problem: "Firelink becomes unresponsive or crashes frequently.",
    solutions: [
      "Try reloading the extension from chrome://extensions",
      "Clear browser cache and cookies",
      "Update your browser to the latest version",
      "Disable other extensions that might conflict",
      "Reinstall Firelink (your wallet data will be preserved)",
    ],
  },
  {
    title: "Wrong balance showing",
    problem: "My balance is incorrect or showing different than expected.",
    solutions: [
      "Verify you're on the correct network (DevNet vs Forge vs Mainnet)",
      "Each network has separate balances for the same address",
      "Testnet tokens are different from mainnet tokens",
      "Check the block explorer to verify actual balance",
    ],
  },
  {
    title: "Can't send transactions",
    problem: "Send button is disabled or transaction fails.",
    solutions: [
      "Ensure you have enough PYRAX for both the amount and gas fees",
      "Check that the recipient address is valid (starts with 0x, 42 chars)",
      "Verify you're connected to a working RPC endpoint",
      "For DevNet, make sure your local node is running",
    ],
  },
  {
    title: "Recovery phrase not working",
    problem: "When I import my recovery phrase, I get a different address.",
    solutions: [
      "Verify you're entering words in the exact correct order",
      "Check for typos - all words must be spelled correctly",
      "Words should be lowercase with single spaces between them",
      "The phrase should be exactly 12 or 24 words (BIP39 standard)",
    ],
  },
];

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-pyrax-orange">Documentation</Link>
          <span>/</span>
          <Link href="/docs/firelink" className="hover:text-pyrax-orange">Firelink</Link>
          <span>/</span>
          <span className="text-white">Troubleshooting</span>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-4">Troubleshooting</h1>
        <p className="text-xl text-gray-400 mb-8">
          Solutions to common issues with the Firelink browser extension.
        </p>

        {/* Quick Fixes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Fixes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <RefreshCw className="w-8 h-8 text-pyrax-orange mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Reload Extension</h4>
              <p className="text-gray-400 text-sm">
                Go to chrome://extensions and click the reload icon on Firelink
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <Trash2 className="w-8 h-8 text-pyrax-orange mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Clear Cache</h4>
              <p className="text-gray-400 text-sm">
                Clear browser cache and cookies, then restart browser
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <RefreshCw className="w-8 h-8 text-pyrax-orange mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Refresh Page</h4>
              <p className="text-gray-400 text-sm">
                Hard refresh dApp pages with Ctrl+Shift+R (Cmd+Shift+R on Mac)
              </p>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Common Issues</h2>
          <div className="space-y-6">
            {issues.map((issue, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-white/5">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-pyrax-orange" />
                    {issue.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{issue.problem}</p>
                </div>
                <div className="p-5 bg-white/[0.02]">
                  <p className="text-sm text-gray-500 mb-2">Solutions:</p>
                  <ul className="space-y-2">
                    {issue.solutions.map((solution, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reset Extension */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Reset Firelink</h2>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-2">Last Resort: Full Reset</h4>
                <p className="text-gray-400 mb-4">
                  If nothing else works, you can completely reset Firelink. This will delete all wallet data.
                  <strong className="text-yellow-200"> Make sure you have your recovery phrase before proceeding!</strong>
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
                  <li>Go to chrome://extensions</li>
                  <li>Find PYRAX Firelink and click Remove</li>
                  <li>Delete the extracted extension folder</li>
                  <li>Download a fresh copy from pyrax.org/firelink</li>
                  <li>Reinstall following the installation guide</li>
                  <li>Import your wallet using your recovery phrase</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://discord.gg/2UQCA9J2x7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-xl hover:border-pyrax-orange/30 transition-colors"
            >
              <div className="w-12 h-12 bg-[#5865F2]/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">Discord Community</h4>
                <p className="text-sm text-gray-400">Get help from the community</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-500 ml-auto" />
            </a>
            <a
              href="https://github.com/PYRAX-Chain/pyrax-chrome-extension/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-xl hover:border-pyrax-orange/30 transition-colors"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🐛</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">Report a Bug</h4>
                <p className="text-sm text-gray-400">Open a GitHub issue</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-500 ml-auto" />
            </a>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link href="/docs/firelink/security" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Security Best Practices
          </Link>
          <Link href="/docs/firelink" className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors">
            Back to Firelink Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
