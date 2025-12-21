"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Send, Download, QrCode, Copy, AlertTriangle, CheckCircle, Clock, ExternalLink } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-pyrax-orange">Documentation</Link>
          <span>/</span>
          <Link href="/docs/firelink" className="hover:text-pyrax-orange">Firelink</Link>
          <span>/</span>
          <span className="text-white">Sending & Receiving</span>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-4">Sending & Receiving PYRAX</h1>
        <p className="text-xl text-gray-400 mb-8">
          Learn how to send PYRAX to others and receive PYRAX to your wallet.
        </p>

        {/* Receiving PYRAX */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Receiving PYRAX</h2>
          </div>
          
          <p className="text-gray-400 mb-6">
            To receive PYRAX, you simply need to share your wallet address with the sender.
          </p>

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
                <h3 className="text-lg font-semibold text-white mb-2">Click &quot;Receive&quot;</h3>
                <p className="text-gray-400 mb-4">From the main wallet screen, click the Receive button.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Copy or Share Your Address</h3>
                <p className="text-gray-400 mb-4">
                  You&apos;ll see your wallet address and a QR code. You can:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3 text-gray-400">
                    <Copy className="w-5 h-5 text-pyrax-orange" />
                    Click to copy the address to clipboard
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <QrCode className="w-5 h-5 text-pyrax-orange" />
                    Let sender scan the QR code
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-200 text-sm">
              <strong>Tip:</strong> Your address starts with <code className="text-pyrax-orange">0x</code> and is 42 characters long. 
              Always verify the full address when receiving large amounts.
            </p>
          </div>
        </section>

        {/* Sending PYRAX */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-pyrax-orange/20 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-pyrax-orange" />
            </div>
            <h2 className="text-2xl font-bold text-white">Sending PYRAX</h2>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Open Firelink & Click &quot;Send&quot;</h3>
                <p className="text-gray-400">From the main wallet screen, click the Send button.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Enter Recipient Address</h3>
                <p className="text-gray-400 mb-4">
                  Paste or type the recipient&apos;s PYRAX address. Double-check it&apos;s correct!
                </p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-red-200 text-sm">
                      <strong>Warning:</strong> Transactions cannot be reversed. Always verify the recipient address before sending.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Enter Amount</h3>
                <p className="text-gray-400">
                  Enter the amount of PYRAX to send. Click &quot;Max&quot; to send your entire balance (minus gas fees).
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Review & Confirm</h3>
                <p className="text-gray-400 mb-4">
                  Review the transaction details including:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Recipient address
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Amount to send
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Gas fee (in Cinders)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Total cost
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-pyrax-orange rounded-full flex items-center justify-center text-black font-bold shrink-0">5</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Click &quot;Send&quot;</h3>
                <p className="text-gray-400">
                  Confirm the transaction. It will be broadcast to the PYRAX network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transaction Status */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Transaction Status</h2>
          <p className="text-gray-400 mb-4">
            After sending, your transaction will go through these stages:
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="font-semibold text-white">Pending</h4>
                <p className="text-sm text-gray-400">Transaction is being processed by the network</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <h4 className="font-semibold text-white">Confirmed</h4>
                <p className="text-sm text-gray-400">Transaction is included in a block</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              <div>
                <h4 className="font-semibold text-white">Finalized</h4>
                <p className="text-sm text-gray-400">Transaction has achieved ZK finality (irreversible)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gas Fees */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Understanding Gas Fees</h2>
          <p className="text-gray-400 mb-4">
            Gas fees pay network validators to process your transaction. On PYRAX:
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-pyrax-orange">•</span>
              Gas is measured in <strong className="text-white">Cinders</strong> (like Gwei on Ethereum)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pyrax-orange">•</span>
              1 PYRAX = 10^9 Cinders
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pyrax-orange">•</span>
              Simple transfers typically cost ~21,000 gas units
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pyrax-orange">•</span>
              PYRAX uses EIP-1559 style gas pricing with base fee + priority tip
            </li>
          </ul>
        </section>

        {/* View on Explorer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">View Transaction Details</h2>
          <p className="text-gray-400 mb-4">
            After sending a transaction, you can view full details on the PYRAX Explorer:
          </p>
          <a
            href="https://forge.pyrax.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open PYRAX Explorer
          </a>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <Link href="/docs/firelink/import-wallet" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Importing a Wallet
          </Link>
          <Link href="/docs/firelink/dapps" className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors">
            Connecting to dApps
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
