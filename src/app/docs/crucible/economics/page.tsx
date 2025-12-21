"use client";

import Link from "next/link";
import { ChevronRight, Sparkles, Coins, TrendingUp, Users, Flame, Calculator, ArrowRight, ArrowLeft, CheckCircle, DollarSign } from "lucide-react";
import { useState } from "react";

const pricingTiers = [
  {
    model: "llama-3-8b",
    type: "Text Generation",
    PYRAXPerToken: 0.001,
    usdEquiv: 0.00001,
    comparison: "GPT-3.5: $0.002/1K tokens",
    savings: "50x cheaper",
  },
  {
    model: "llama-3-70b",
    type: "Text Generation",
    PYRAXPerToken: 0.005,
    usdEquiv: 0.00005,
    comparison: "GPT-4: $0.03/1K tokens",
    savings: "600x cheaper",
  },
  {
    model: "mistral-7b",
    type: "Text Generation",
    PYRAXPerToken: 0.0008,
    usdEquiv: 0.000008,
    comparison: "Claude Haiku: $0.00025/1K",
    savings: "31x cheaper",
  },
  {
    model: "sdxl",
    type: "Image (1024x1024)",
    PYRAXPerToken: 0.5,
    usdEquiv: 0.005,
    comparison: "DALL-E 3: $0.04/image",
    savings: "8x cheaper",
  },
  {
    model: "flux-schnell",
    type: "Image (1024x1024)",
    PYRAXPerToken: 0.4,
    usdEquiv: 0.004,
    comparison: "Midjourney: $0.02/image",
    savings: "5x cheaper",
  },
  {
    model: "bge-large",
    type: "Embedding (per 1K)",
    PYRAXPerToken: 0.1,
    usdEquiv: 0.001,
    comparison: "OpenAI Ada: $0.0001/1K",
    savings: "Comparable",
  },
];

const feeDistribution = [
  { recipient: "GPU Worker", percentage: 85, color: "bg-green-500", description: "The miner who runs the AI inference" },
  { recipient: "Verifier Network", percentage: 5, color: "bg-blue-500", description: "Nodes that verify results via ZK/optimistic proofs" },
  { recipient: "Protocol Treasury", percentage: 5, color: "bg-purple-500", description: "Funds development and ecosystem grants" },
  { recipient: "Burned 🔥", percentage: 5, color: "bg-pyrax-orange", description: "Permanently removed from supply (deflationary)" },
];

export default function CrucibleEconomicsPage() {
  const [jobsPerDay, setJobsPerDay] = useState(1000);
  const [avgFee, setAvgFee] = useState(0.1);
  const [PYRAXPrice, setPYRAXPrice] = useState(0.01);

  const dailyRevenue = jobsPerDay * avgFee;
  const workerEarnings = dailyRevenue * 0.85;
  const monthlyWorker = workerEarnings * 30;
  const dailyBurned = dailyRevenue * 0.05;
  const yearlyBurned = dailyBurned * 365;

  return (
    <div className="min-h-screen bg-pyrax-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/docs/crucible" className="hover:text-white">Crucible</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Economics</span>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm mb-4">
            <Coins className="w-4 h-4" /> 10 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Pricing & Economics</h1>
          <p className="text-xl text-gray-400">How Crucible pricing works and what everyone earns.</p>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          
          {/* Payment Method */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-pyrax-orange/10 to-amber-500/10 border border-pyrax-orange/20 my-8 not-prose">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-pyrax-orange/20 flex items-center justify-center flex-shrink-0">
                <Coins className="w-6 h-6 text-pyrax-orange" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">All Fees Paid in PYRAX</h3>
                <p className="text-gray-300 mb-3">
                  Crucible fees are paid <strong className="text-pyrax-orange">exclusively in PYRAX tokens</strong>. 
                  This creates real utility and demand for the token. Users need PYRAX to access AI compute, 
                  and workers earn PYRAX for providing compute.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-pyrax-orange/20 text-pyrax-orange text-sm">No Fiat Payments</span>
                  <span className="px-3 py-1 rounded-full bg-pyrax-orange/20 text-pyrax-orange text-sm">Token Utility</span>
                  <span className="px-3 py-1 rounded-full bg-pyrax-orange/20 text-pyrax-orange text-sm">5% Fee Burn</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Pricing Table</h2>
          <p className="text-gray-300 leading-relaxed">
            Crucible pricing is significantly cheaper than centralized alternatives because there&apos;s no middleman markup—workers set competitive prices and users pay directly.
          </p>
          
          <div className="overflow-x-auto my-8 not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-pyrax-orange">Model</th>
                  <th className="py-3 px-4 text-gray-400">Type</th>
                  <th className="py-3 px-4 text-gray-400">PYRAX Fee</th>
                  <th className="py-3 px-4 text-gray-400">USD Equiv*</th>
                  <th className="py-3 px-4 text-gray-400">vs Centralized</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pricingTiers.map((tier) => (
                  <tr key={tier.model}>
                    <td className="py-3 px-4 text-white font-mono">{tier.model}</td>
                    <td className="py-3 px-4 text-gray-400">{tier.type}</td>
                    <td className="py-3 px-4 text-pyrax-orange font-bold">{tier.PYRAXPerToken} PYRAX</td>
                    <td className="py-3 px-4 text-gray-500">${tier.usdEquiv}</td>
                    <td className="py-3 px-4">
                      <span className="text-green-400 font-semibold">{tier.savings}</span>
                      <div className="text-xs text-gray-500">{tier.comparison}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">*USD equivalent assumes PYRAX = $0.01. Actual value varies with market.</p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Fee Distribution</h2>
          <p className="text-gray-300 leading-relaxed">
            Every PYRAX spent on Crucible is distributed transparently:
          </p>

          <div className="my-8 not-prose">
            {/* Visual bar */}
            <div className="h-8 rounded-full overflow-hidden flex mb-6">
              {feeDistribution.map((item) => (
                <div 
                  key={item.recipient} 
                  className={`${item.color} flex items-center justify-center text-xs font-bold text-white`}
                  style={{ width: `${item.percentage}%` }}
                >
                  {item.percentage}%
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {feeDistribution.map((item) => (
                <div key={item.recipient} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className={`w-4 h-4 rounded ${item.color}`} />
                  <div>
                    <div className="text-white font-semibold">{item.recipient} — {item.percentage}%</div>
                    <div className="text-sm text-gray-400">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Earnings Calculator</h2>
          <p className="text-gray-300 leading-relaxed">
            Estimate potential earnings for GPU workers based on network activity:
          </p>

          <div className="p-6 rounded-2xl bg-pyrax-dark border border-white/10 my-8 not-prose">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Jobs per Day (Network)</label>
                <input 
                  type="range" 
                  min="100" 
                  max="100000" 
                  step="100"
                  value={jobsPerDay}
                  onChange={(e) => setJobsPerDay(Number(e.target.value))}
                  className="w-full accent-pyrax-orange"
                />
                <div className="text-white font-mono mt-1">{jobsPerDay.toLocaleString()} jobs</div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Avg Fee per Job (PYRAX)</label>
                <input 
                  type="range" 
                  min="0.01" 
                  max="1" 
                  step="0.01"
                  value={avgFee}
                  onChange={(e) => setAvgFee(Number(e.target.value))}
                  className="w-full accent-pyrax-orange"
                />
                <div className="text-white font-mono mt-1">{avgFee} PYRAX</div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">PYRAX Price (USD)</label>
                <input 
                  type="range" 
                  min="0.001" 
                  max="1" 
                  step="0.001"
                  value={PYRAXPrice}
                  onChange={(e) => setPYRAXPrice(Number(e.target.value))}
                  className="w-full accent-pyrax-orange"
                />
                <div className="text-white font-mono mt-1">${PYRAXPrice}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                <div className="text-3xl font-bold text-green-400">{workerEarnings.toLocaleString()}</div>
                <div className="text-xs text-gray-400">PYRAX/day (all workers)</div>
                <div className="text-sm text-green-400 mt-1">${(workerEarnings * PYRAXPrice).toFixed(2)} USD</div>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-400">{monthlyWorker.toLocaleString()}</div>
                <div className="text-xs text-gray-400">PYRAX/month (all workers)</div>
                <div className="text-sm text-blue-400 mt-1">${(monthlyWorker * PYRAXPrice).toFixed(2)} USD</div>
              </div>
              <div className="p-4 bg-pyrax-orange/10 border border-pyrax-orange/20 rounded-xl text-center">
                <div className="text-3xl font-bold text-pyrax-orange">{dailyBurned.toLocaleString()}</div>
                <div className="text-xs text-gray-400">PYRAX burned/day</div>
                <div className="text-sm text-pyrax-orange mt-1">${(dailyBurned * PYRAXPrice).toFixed(2)} USD</div>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                <div className="text-3xl font-bold text-red-400">{yearlyBurned.toLocaleString()}</div>
                <div className="text-xs text-gray-400">PYRAX burned/year</div>
                <div className="text-sm text-red-400 mt-1">${(yearlyBurned * PYRAXPrice).toFixed(2)} USD</div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Individual Worker Earnings</h2>
          <p className="text-gray-300 leading-relaxed">
            How much can a single GPU worker expect to earn? It depends on hardware, availability, and network demand:
          </p>

          <div className="overflow-x-auto my-8 not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-pyrax-orange">GPU</th>
                  <th className="py-3 px-4 text-gray-400">Jobs/Day*</th>
                  <th className="py-3 px-4 text-gray-400">Daily PYRAX</th>
                  <th className="py-3 px-4 text-gray-400">Monthly PYRAX</th>
                  <th className="py-3 px-4 text-gray-400">Monthly USD**</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 px-4 text-white">RTX 3080 (10GB)</td>
                  <td className="py-3 px-4 text-gray-400">~500</td>
                  <td className="py-3 px-4 text-green-400">42 PYRAX</td>
                  <td className="py-3 px-4 text-green-400">1,275 PYRAX</td>
                  <td className="py-3 px-4 text-white">$12.75 - $127.50</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">RTX 4090 (24GB)</td>
                  <td className="py-3 px-4 text-gray-400">~1,500</td>
                  <td className="py-3 px-4 text-green-400">127 PYRAX</td>
                  <td className="py-3 px-4 text-green-400">3,825 PYRAX</td>
                  <td className="py-3 px-4 text-white">$38.25 - $382.50</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">A100 (80GB)</td>
                  <td className="py-3 px-4 text-gray-400">~5,000</td>
                  <td className="py-3 px-4 text-green-400">425 PYRAX</td>
                  <td className="py-3 px-4 text-green-400">12,750 PYRAX</td>
                  <td className="py-3 px-4 text-white">$127.50 - $1,275</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">8x A100 Cluster</td>
                  <td className="py-3 px-4 text-gray-400">~40,000</td>
                  <td className="py-3 px-4 text-green-400">3,400 PYRAX</td>
                  <td className="py-3 px-4 text-green-400">102,000 PYRAX</td>
                  <td className="py-3 px-4 text-white">$1,020 - $10,200</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">*Assumes worker captures ~1% of network jobs. **Range assumes PYRAX = $0.01 to $0.10</p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why PYRAX, Not Fiat?</h2>
          <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Token Demand</h3>
              <p className="text-sm text-gray-400">Users must buy PYRAX to use AI. More usage = more demand = price appreciation for holders.</p>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
              <Flame className="w-6 h-6 text-pyrax-orange mb-3" />
              <h3 className="text-white font-semibold mb-2">Deflationary Pressure</h3>
              <p className="text-sm text-gray-400">5% of every fee is burned forever. High usage = significant supply reduction over time.</p>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
              <Users className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Permissionless</h3>
              <p className="text-sm text-gray-400">No KYC, no payment processors, no chargebacks. Anyone can pay, anyone can earn.</p>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
              <CheckCircle className="w-6 h-6 text-purple-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Instant Settlement</h3>
              <p className="text-sm text-gray-400">Workers get paid immediately on job completion. No invoices, no 30-day terms.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Summary</h2>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 my-8 not-prose">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300"><strong className="text-white">Users pay in PYRAX</strong> — creates token utility and demand</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300"><strong className="text-white">Workers earn 85%</strong> — most of the fee goes to compute providers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300"><strong className="text-white">5% is burned</strong> — deflationary mechanism reduces supply</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300"><strong className="text-white">50-600x cheaper</strong> than OpenAI, Anthropic, Midjourney</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300"><strong className="text-white">No fiat</strong> — fully crypto-native, permissionless, instant</span>
              </li>
            </ul>
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex justify-between">
            <Link href="/docs/crucible/smart-contracts" className="flex items-center gap-2 text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" /> Smart Contracts
            </Link>
            <Link href="/docs/crucible" className="flex items-center gap-2 text-pyrax-orange hover:underline">
              Back to Overview <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
