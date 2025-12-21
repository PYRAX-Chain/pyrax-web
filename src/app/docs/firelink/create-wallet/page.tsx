"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Info, Shield, Eye, EyeOff } from "lucide-react";

export default function CreateWalletPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-pyrax-orange">Documentation</Link>
          <span>/</span>
          <Link href="/docs/firelink" className="hover:text-pyrax-orange">Firelink</Link>
          <span>/</span>
          <span className="text-white">Creating a Wallet</span>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-4">Creating a Wallet</h1>
        <p className="text-xl text-gray-400 mb-8">
          Learn how to create your first PYRAX wallet in Firelink with industry-standard security.
        </p>

        {/* Security Warning */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-red-400 shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Critical Security Information</h3>
              <p className="text-gray-400 mb-3">
                Your 12-word recovery phrase is the ONLY way to recover your wallet. If you lose it:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Your funds will be PERMANENTLY LOST
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  No one, including PYRAX, can recover your wallet
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  Anyone with your recovery phrase can steal your funds
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Step-by-Step Guide</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Open Firelink</h3>
                <p className="text-gray-400">
                  Click the Firelink icon in your browser toolbar. If this is your first time, you&apos;ll see 
                  the welcome screen with options to create or import a wallet.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Click &quot;Create New Wallet&quot;</h3>
                <p className="text-gray-400">
                  Select the option to create a new wallet. This will start the secure wallet creation process.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Set Wallet Name & Password</h3>
                <p className="text-gray-400 mb-4">
                  Enter a name for your wallet (e.g., &quot;Main Wallet&quot;) and create a strong password.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Password Requirements:</h4>
                  <ul className="space-y-1 text-gray-400 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Mix of letters, numbers, and symbols recommended
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Don&apos;t reuse passwords from other sites
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Write Down Your Recovery Phrase</h3>
                <p className="text-gray-400 mb-4">
                  Firelink will display 12 random words. This is your recovery phrase. Write these words down 
                  in order on paper and store them securely.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div className="text-yellow-200 text-sm">
                      <strong>DO NOT:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• Take a screenshot</li>
                        <li>• Save in a text file or cloud storage</li>
                        <li>• Email it to yourself</li>
                        <li>• Share with anyone</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <div className="text-green-200 text-sm">
                      <strong>DO:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• Write on paper with pen</li>
                        <li>• Store in a safe or lockbox</li>
                        <li>• Consider multiple copies in different locations</li>
                        <li>• Use a steel backup for fire/water protection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Complete Security Quiz</h3>
                <p className="text-gray-400">
                  Answer a few questions about seed phrase security. This ensures you understand the importance 
                  of protecting your recovery phrase.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">
                6
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Verify Your Recovery Phrase</h3>
                <p className="text-gray-400">
                  Enter specific words from your recovery phrase when prompted to verify you&apos;ve written them down correctly.
                </p>
              </div>
            </div>

            {/* Done */}
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                ✓
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Your Wallet is Ready!</h3>
                <p className="text-gray-400">
                  Congratulations! Your wallet has been created. You can now receive PYRAX at your new address 
                  and start using dApps on the PYRAX network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Your Wallet */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Understanding Your Wallet</h2>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">Wallet Address</h4>
              <p className="text-gray-400 text-sm">
                Your public address (starts with <code className="text-pyrax-orange">0x</code>) is like an account number. 
                Share it freely to receive PYRAX. Example: <code className="text-pyrax-orange text-xs">0x742d35Cc6634C0532925a3b844Bc9e7595f...</code>
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">Private Key</h4>
              <p className="text-gray-400 text-sm">
                Your private key is derived from your recovery phrase. It proves ownership of your wallet. 
                <strong className="text-red-400"> NEVER share your private key!</strong>
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold text-white mb-2">Recovery Phrase</h4>
              <p className="text-gray-400 text-sm">
                The 12-word phrase can regenerate your private key. It&apos;s the master key to your wallet 
                and works across any compatible wallet app.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Next Steps</h2>
          <div className="grid gap-4">
            <Link href="/docs/firelink/transactions" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-pyrax-orange/30 transition-colors group">
              <div>
                <h4 className="font-semibold text-white group-hover:text-pyrax-orange">Get PYRAX Tokens</h4>
                <p className="text-sm text-gray-400">Learn how to receive your first PYRAX</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-pyrax-orange" />
            </Link>
            <Link href="/docs/firelink/dapps" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-pyrax-orange/30 transition-colors group">
              <div>
                <h4 className="font-semibold text-white group-hover:text-pyrax-orange">Connect to dApps</h4>
                <p className="text-sm text-gray-400">Start using decentralized applications</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-pyrax-orange" />
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link href="/docs/firelink/installation" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Installation Guide
          </Link>
          <Link href="/docs/firelink/import-wallet" className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors">
            Importing a Wallet
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
