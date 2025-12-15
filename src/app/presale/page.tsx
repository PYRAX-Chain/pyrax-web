"use client";

import { useState } from "react";
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import { parseEther, formatEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Shield,
  Users,
  TrendingUp,
  CircleDollarSign,
} from "lucide-react";
import clsx from "clsx";

const PRESALE_CONTRACT = process.env.NEXT_PUBLIC_PRESALE_CONTRACT || "0xBb6780Ed54B44eD18Ec6e26A197ac7bE1B04eFe4";
const NETWORK = process.env.NEXT_PUBLIC_NETWORK || "sepolia";
const ETHERSCAN_URL = NETWORK === "sepolia" ? "https://sepolia.etherscan.io" : "https://etherscan.io";

const presaleStats = {
  totalRaised: "0",
  contributors: 0,
  currentPrice: "0.00001",
  stage: "Live on Sepolia Testnet",
  hardCap: "10000",
};

export default function PresalePage() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { sendTransaction } = useSendTransaction();

  const handleContribute = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      await sendTransaction({
        to: PRESALE_CONTRACT as `0x${string}`,
        value: parseEther(amount),
      });
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const expectedPyrx = amount
    ? (parseFloat(amount) / parseFloat(presaleStats.currentPrice)).toLocaleString()
    : "0";

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pyrax-orange/10 border border-pyrax-orange/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pyrax-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pyrax-orange"></span>
            </span>
            <span className="text-sm text-pyrax-orange">
              {presaleStats.stage}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            PYRAX Presale
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Participate in the PYRAX presale. Currently live on Sepolia Testnet.
            Contribute ETH to receive PYRX tokens at mainnet launch.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={TrendingUp}
                label="Total Raised"
                value={`${presaleStats.totalRaised} ETH`}
              />
              <StatCard
                icon={Users}
                label="Contributors"
                value={presaleStats.contributors.toString()}
              />
              <StatCard
                icon={CircleDollarSign}
                label="PYRX Price"
                value={`${presaleStats.currentPrice} ETH`}
              />
              <StatCard
                icon={Shield}
                label="Hard Cap"
                value={`${presaleStats.hardCap} ETH`}
              />
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Progress
              </h2>
              <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-pyrax-orange to-pyrax-amber rounded-full transition-all"
                  style={{
                    width: `${(parseFloat(presaleStats.totalRaised) / parseFloat(presaleStats.hardCap)) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-400">
                <span>{presaleStats.totalRaised} ETH raised</span>
                <span>{presaleStats.hardCap} ETH goal</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                Contract Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Contract Address</span>
                  <a
                    href={`${ETHERSCAN_URL}/address/${PRESALE_CONTRACT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber font-mono text-sm"
                  >
                    {PRESALE_CONTRACT.slice(0, 6)}...{PRESALE_CONTRACT.slice(-4)}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Network</span>
                  <span className="text-white">{NETWORK === "sepolia" ? "Sepolia Testnet" : "Ethereum Mainnet"}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-400">Contract Verified</span>
                  <span className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {isConnected && (
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Your Contribution
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400">Total Contributed</div>
                    <div className="text-2xl font-bold text-white">0 ETH</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400">Expected PYRX</div>
                    <div className="text-2xl font-bold text-pyrax-orange">
                      0 PYRX
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6">
                Contribute
              </h2>

              {!isConnected ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                    Connect your wallet to participate
                  </p>
                  <ConnectButton />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Amount (ETH)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0"
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
                      />
                      <button
                        onClick={() =>
                          setAmount(balance ? formatEther(balance.value) : "0")
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-pyrax-orange hover:text-pyrax-amber"
                      >
                        MAX
                      </button>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Balance: {balance ? formatEther(balance.value) : "0"} ETH
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">You will receive</span>
                      <span className="text-white font-medium">
                        ~{expectedPyrx} PYRX
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleContribute}
                    disabled={
                      isSubmitting || !amount || parseFloat(amount) <= 0
                    }
                    className={clsx(
                      "w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors",
                      isSubmitting || !amount || parseFloat(amount) <= 0
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-pyrax-orange hover:bg-pyrax-amber text-white"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <img src="/brand/pyrax-coin.svg" alt="PYRX" className="h-5 w-5" />
                        Contribute
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-400">
                    Risk Disclosure
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Cryptocurrency investments are highly volatile and risky.
                    You may lose your entire contribution. PYRX tokens will be
                    distributed at mainnet launch. No guarantees of returns.
                    This is not financial advice.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">
                Presale Terms
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  ETH-only contributions on Ethereum Mainnet
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  PYRX tokens claimable at mainnet launch
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Contract verified on Etherscan
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  No minimum contribution amount
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-pyrax-orange/10">
          <Icon className="h-5 w-5 text-pyrax-orange" />
        </div>
        <div>
          <div className="text-xs text-gray-400">{label}</div>
          <div className="text-lg font-semibold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}
