"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Globe, CheckCircle, AlertTriangle, Shield, ExternalLink, Unplug } from "lucide-react";

export default function DappsPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-pyrax-orange">Documentation</Link>
          <span>/</span>
          <Link href="/docs/firelink" className="hover:text-pyrax-orange">Firelink</Link>
          <span>/</span>
          <span className="text-white">Connecting to dApps</span>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-4">Connecting to dApps</h1>
        <p className="text-xl text-gray-400 mb-8">
          Learn how to connect Firelink to decentralized applications and approve transactions.
        </p>

        {/* What are dApps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">What are dApps?</h2>
          <p className="text-gray-400 mb-4">
            Decentralized applications (dApps) are websites and apps that interact with the blockchain. 
            They can do things like:
          </p>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              "Swap tokens on decentralized exchanges",
              "Stake tokens to earn rewards",
              "Mint and trade NFTs",
              "Participate in governance voting",
              "Provide liquidity to pools",
              "Interact with smart contracts",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-400">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* How Connection Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">How dApp Connection Works</h2>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">dApp Requests Connection</h3>
                <p className="text-gray-400">
                  When you visit a PYRAX dApp, it may request to connect to your wallet. This is done via 
                  the EIP-1193 provider that Firelink injects into web pages.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Firelink Shows Approval Popup</h3>
                <p className="text-gray-400">
                  A popup appears asking if you want to connect to the site. You&apos;ll see:
                </p>
                <ul className="mt-2 space-y-1 text-gray-400 text-sm">
                  <li>• The website&apos;s URL</li>
                  <li>• What permissions the site is requesting</li>
                  <li>• Which wallet address will be shared</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">You Approve or Reject</h3>
                <p className="text-gray-400">
                  Click &quot;Connect&quot; to allow the site access to your public address, or &quot;Reject&quot; to deny.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">✓</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Connected!</h3>
                <p className="text-gray-400">
                  The dApp can now see your wallet address and request transactions (which you&apos;ll approve separately).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Sites Can Access */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">What Connected Sites Can Access</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Can Access
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Your public wallet address</li>
                <li>• Your PYRAX balance</li>
                <li>• Current network/chain ID</li>
                <li>• Request transaction signatures</li>
                <li>• Request message signatures</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Cannot Access
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Your private key</li>
                <li>• Your recovery phrase</li>
                <li>• Your password</li>
                <li>• Other wallet addresses</li>
                <li>• Automatic fund transfers</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Transaction Approval */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Approving Transactions</h2>
          <p className="text-gray-400 mb-4">
            When a dApp wants to send a transaction, Firelink will show an approval popup:
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-white mb-3">Transaction Approval Shows:</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-pyrax-orange">•</span>
                <span><strong className="text-white">From:</strong> Your wallet address</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pyrax-orange">•</span>
                <span><strong className="text-white">To:</strong> Destination address (contract or wallet)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pyrax-orange">•</span>
                <span><strong className="text-white">Value:</strong> Amount of PYRAX being sent</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pyrax-orange">•</span>
                <span><strong className="text-white">Gas Fee:</strong> Estimated transaction cost in Cinders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pyrax-orange">•</span>
                <span><strong className="text-white">Data:</strong> Contract interaction data (if any)</span>
              </li>
            </ul>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-yellow-200 text-sm">
                <strong>Always review transactions carefully!</strong> Make sure the destination address and 
                amount are correct before approving. Malicious dApps may try to trick you into approving 
                harmful transactions.
              </p>
            </div>
          </div>
        </section>

        {/* Managing Connections */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Managing Connected Sites</h2>
          <p className="text-gray-400 mb-4">
            You can view and manage all connected sites in Firelink settings:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-400">
            <li>Open Firelink and go to Settings</li>
            <li>Click &quot;Connected Sites&quot;</li>
            <li>View all sites with access to your wallet</li>
            <li>Click the disconnect icon to revoke access</li>
          </ol>
          <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-200 text-sm">
              <strong>Tip:</strong> Regularly review connected sites and disconnect any you no longer use.
            </p>
          </div>
        </section>

        {/* Developer Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">For Developers</h2>
          <p className="text-gray-400 mb-4">
            Firelink provides an EIP-1193 compatible provider accessible via:
          </p>
          <div className="bg-black/30 border border-white/10 rounded-lg p-4 mb-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Check if Firelink is installed
if (window.pyrax) {
  // Request account access
  const accounts = await window.pyrax.request({
    method: 'eth_requestAccounts'
  });
  
  console.log('Connected:', accounts[0]);
}

// Also available as window.ethereum for compatibility
if (window.ethereum?.isPyrax) {
  // Use standard Web3 methods
}`}
            </pre>
          </div>
          <Link 
            href="/docs/developers/web3" 
            className="inline-flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Web3 Integration Guide
          </Link>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link href="/docs/firelink/transactions" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Sending & Receiving
          </Link>
          <Link href="/docs/firelink/networks" className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors">
            Network Switching
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
