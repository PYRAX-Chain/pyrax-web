"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, AlertTriangle, Key, FileText, CheckCircle } from "lucide-react";

export default function ImportWalletPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-pyrax-orange">Documentation</Link>
          <span>/</span>
          <Link href="/docs/firelink" className="hover:text-pyrax-orange">Firelink</Link>
          <span>/</span>
          <span className="text-white">Importing a Wallet</span>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-4">Importing a Wallet</h1>
        <p className="text-xl text-gray-400 mb-8">
          Import an existing wallet into Firelink using your recovery phrase or private key.
        </p>

        {/* Import Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Import Methods</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-pyrax-orange/10 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-pyrax-orange" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Recovery Phrase</h3>
              <p className="text-gray-400 text-sm mb-4">
                Import using your 12-word (or 24-word) BIP39 recovery phrase. This is the recommended method.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Full wallet recovery
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Cross-wallet compatible
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Most secure option
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-pyrax-orange/10 rounded-xl flex items-center justify-center mb-4">
                <Key className="w-6 h-6 text-pyrax-orange" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Private Key</h3>
              <p className="text-gray-400 text-sm mb-4">
                Import using a raw private key (64 hex characters). Use this if you only have the private key.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Direct key import
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Works with exported keys
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  Cannot derive other accounts
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Import from Seed Phrase */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Import from Recovery Phrase</h2>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Open Firelink & Click &quot;Import Existing Wallet&quot;</h3>
                <p className="text-gray-400">From the welcome screen, select the import option.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Select &quot;Seed Phrase&quot;</h3>
                <p className="text-gray-400">Choose the recovery phrase import method.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Enter Your Recovery Phrase</h3>
                <p className="text-gray-400 mb-4">
                  Type or paste your 12 (or 24) words separated by spaces. The words must be in the exact order.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-mono">
                    word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Set a New Password</h3>
                <p className="text-gray-400">Create a password to encrypt your wallet on this device. This can be different from your previous password.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">✓</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Wallet Imported!</h3>
                <p className="text-gray-400">Your wallet is now available in Firelink with the same address and balance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Import from Private Key */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Import from Private Key</h2>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Select &quot;Private Key&quot;</h3>
                <p className="text-gray-400">From the import screen, choose the private key option.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Enter Your Private Key</h3>
                <p className="text-gray-400 mb-4">
                  Paste your 64-character hexadecimal private key (with or without 0x prefix).
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm font-mono break-all">
                    0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Name & Password</h3>
                <p className="text-gray-400">Enter a name for the wallet and create a password.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Warnings */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Security Considerations</h2>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Never enter your recovery phrase on suspicious sites</h4>
                  <p className="text-gray-400 text-sm">Only enter your recovery phrase in the Firelink extension popup, never on websites.</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Clear your clipboard after pasting</h4>
                  <p className="text-gray-400 text-sm">Your clipboard may be accessible to other apps. Copy something else after importing.</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Verify your address after import</h4>
                  <p className="text-gray-400 text-sm">Make sure the wallet address matches what you expect before sending any funds.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compatible Wallets */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Compatible Wallets</h2>
          <p className="text-gray-400 mb-4">
            You can import wallets from any BIP39-compatible wallet:
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["MetaMask", "Trust Wallet", "Coinbase Wallet", "Ledger", "Trezor", "PYRAX Desktop"].map((wallet, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {wallet}
              </li>
            ))}
          </ul>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link href="/docs/firelink/create-wallet" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Creating a Wallet
          </Link>
          <Link href="/docs/firelink/transactions" className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors">
            Sending & Receiving
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
