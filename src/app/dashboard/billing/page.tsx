"use client";

import { useState } from "react";
import {
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  Zap,
  TrendingUp,
  Wallet,
} from "lucide-react";

export default function BillingPage() {
  const [amount, setAmount] = useState("100");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <CreditCard className="h-6 w-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Billing & Credits</h1>
          <p className="text-gray-400">Manage your PYRAX credits and transactions</p>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-gradient-to-br from-pyrax-orange/20 to-red-500/20 border border-pyrax-orange/30">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="h-6 w-6 text-pyrax-orange" />
            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Active</span>
          </div>
          <div className="text-3xl font-bold text-white">0 PYRAX</div>
          <div className="text-sm text-gray-400 mt-1">Available Credits</div>
          <div className="text-xs text-gray-500 mt-2">≈ $0.00 USD</div>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-6 w-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">0 PYRAX</div>
          <div className="text-sm text-gray-400 mt-1">This Month Spent</div>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Zap className="h-6 w-6 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">0</div>
          <div className="text-sm text-gray-400 mt-1">Total Jobs Run</div>
        </div>
      </div>

      {/* Add Credits */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Add Credits</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Amount (PYRAX)</label>
            <div className="flex gap-2 mb-4">
              {["100", "500", "1000", "5000"].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    amount === preset
                      ? "bg-pyrax-orange text-white"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-lg font-medium focus:outline-none focus:border-pyrax-orange"
            />
            <div className="text-sm text-gray-500 mt-2">
              ≈ ${(parseFloat(amount || "0") * 0.01).toFixed(2)} USD
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="p-4 rounded-lg bg-white/5 mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Amount</span>
                <span className="text-white">{amount} PYRAX</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Network Fee</span>
                <span className="text-white">~0.001 ETH</span>
              </div>
              <div className="border-t border-white/10 mt-2 pt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Total</span>
                  <span className="text-white">{amount} PYRAX</span>
                </div>
              </div>
            </div>
            <button className="w-full py-3 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white font-semibold transition-colors flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              Add {amount} PYRAX
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Transaction History</h2>
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">No transactions yet</p>
          <p className="text-sm text-gray-600 mt-1">
            Your deposits and usage will appear here
          </p>
        </div>
      </div>

      {/* Pricing Info */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pyrax-orange/10 border border-purple-500/20">
        <h2 className="text-lg font-semibold text-white mb-4">Pricing Overview</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="font-medium text-white">Text Generation</h3>
            <div className="text-2xl font-bold text-pyrax-orange mt-2">0.08-0.5</div>
            <div className="text-xs text-gray-500">PYRAX per 1K tokens</div>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="font-medium text-white">Image Generation</h3>
            <div className="text-2xl font-bold text-pyrax-orange mt-2">0.01-0.05</div>
            <div className="text-xs text-gray-500">PYRAX per image</div>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="font-medium text-white">ML Training</h3>
            <div className="text-2xl font-bold text-pyrax-orange mt-2">0.15-3.50</div>
            <div className="text-xs text-gray-500">PYRAX per GPU hour</div>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <h3 className="font-medium text-white">Embeddings</h3>
            <div className="text-2xl font-bold text-pyrax-orange mt-2">0.01</div>
            <div className="text-xs text-gray-500">PYRAX per 1K tokens</div>
          </div>
        </div>
      </div>
    </div>
  );
}
