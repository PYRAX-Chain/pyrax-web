import { PieChart, TrendingUp, Coins, Users, Shield, CircleDollarSign, Rocket } from "lucide-react";

// Genesis allocation: 25% of 30B = 7.5B tokens
// Presale: 18% of total (5.4B) at avg $0.0185 = $100M capacity
// Testing Program: 2% (600M) for testnet participants
const genesisAllocation = [
  { name: "Presale", percentage: 18, amount: "5.4B", color: "bg-pyrax-orange" },
  { name: "Testing Program", percentage: 2, amount: "0.6B", color: "bg-cyan-500" },
  { name: "Ecosystem & Community", percentage: 2, amount: "0.6B", color: "bg-blue-500" },
  { name: "Core Contributors", percentage: 1.5, amount: "0.45B", color: "bg-green-500" },
  { name: "Security & Audits", percentage: 0.5, amount: "0.15B", color: "bg-purple-500" },
  { name: "Liquidity", percentage: 0.5, amount: "0.15B", color: "bg-yellow-500" },
  { name: "Strategic Partnerships", percentage: 0.5, amount: "0.15B", color: "bg-pink-500" },
];

const feeDistribution = [
  { name: "Burned", percentage: 50, description: "Base fee burned", color: "bg-red-500" },
  { name: "Miners", percentage: 40, description: "Block producer rewards", color: "bg-blue-500" },
  { name: "Provers", percentage: 10, description: "Stream C incentives", color: "bg-purple-500" },
];

export default function TokenomicsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Tokenomics
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            PYRAX is the native token of the PYRAX blockchain, powering gas fees,
            mining rewards, staking, and governance.
          </p>
        </div>

        <section className="mb-24">
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard
              icon={CircleDollarSign}
              label="Token"
              value="PYRAX"
              sublabel="Native Token"
            />
            <StatCard
              icon={Coins}
              label="Gas Unit"
              value="Cinders"
              sublabel="1 PYRAX = 10⁹ Cinders"
            />
            <StatCard
              icon={TrendingUp}
              label="Primary Emission"
              value="30B"
              sublabel="~10-12 years"
            />
            <StatCard
              icon={PieChart}
              label="Genesis Mint"
              value="25%"
              sublabel="7.5B PYRAX"
            />
          </div>
        </section>

        {/* Token Overview */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            PYRAX Token
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="p-8 rounded-xl bg-gradient-to-br from-pyrax-orange/20 to-amber-900/20 border border-pyrax-orange/30">
              <div className="flex items-center gap-4 mb-6">
                <img src="/brand/pyrax-coin.svg" alt="PYRAX" className="h-12 w-12" />
                <div>
                  <div className="text-2xl font-bold text-white">PYRAX</div>
                  <div className="text-sm text-pyrax-orange">Native Blockchain Token</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-gray-400 mb-1">Total Supply</div>
                  <div className="text-white font-semibold">30 Billion</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-gray-400 mb-1">Emission Period</div>
                  <div className="text-white font-semibold">~10-12 years</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-gray-400 mb-1">Genesis Mint</div>
                  <div className="text-white font-semibold">7.5B (25%)</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-gray-400 mb-1">Mining Rewards</div>
                  <div className="text-white font-semibold">22.5B (75%)</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-gray-400 text-sm mb-2">Use Cases</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-pyrax-orange/20 text-pyrax-orange text-sm">Gas Fees</span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">Mining</span>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Staking</span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">Governance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            PYRAX Genesis Distribution
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative w-64 h-64 mx-auto">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {genesisAllocation.reduce(
                    (acc, item, index) => {
                      const startAngle = acc.total;
                      const angle = (item.percentage / 25) * 360;
                      const endAngle = startAngle + angle;
                      const largeArc = angle > 180 ? 1 : 0;

                      const startX =
                        50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                      const startY =
                        50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                      const endX =
                        50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                      const endY =
                        50 + 40 * Math.sin((endAngle * Math.PI) / 180);

                      acc.paths.push(
                        <path
                          key={item.name}
                          d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                          className={item.color}
                          style={{ opacity: 0.8 }}
                        />
                      );
                      acc.total = endAngle;
                      return acc;
                    },
                    { paths: [] as JSX.Element[], total: 0 }
                  ).paths}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">7.5B</div>
                    <div className="text-sm text-gray-400">PYRAX</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {genesisAllocation.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-white">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">
                      {item.percentage}%
                    </div>
                    <div className="text-sm text-gray-400">{item.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Emission Schedule
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-xl bg-white/5 border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Primary Emission
                  </h3>
                  <p className="text-gray-400 mb-4">
                    30 billion PYRAX emitted over approximately 10-12 years
                    through mining rewards. The emission follows a smooth decay
                    curve rather than abrupt halvings.
                  </p>
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-gray-400">Mining Split</div>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white">Stream A (ASIC)</span>
                        <span className="text-pyrax-orange font-semibold">
                          60%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Stream B (CPU/GPU)</span>
                        <span className="text-pyrax-orange font-semibold">
                          40%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Tail Emission
                  </h3>
                  <p className="text-gray-400 mb-4">
                    After primary emission completes, a perpetual tail emission
                    of 0.5% annually ensures ongoing security budget for miners
                    and provers.
                  </p>
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 text-green-400">
                      <Shield className="h-5 w-5" />
                      <span className="font-semibold">
                        Perpetual Security Budget
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Ensures long-term network security without relying solely
                      on transaction fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Fee Distribution
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-xl bg-white/5 border border-white/10">
              <p className="text-gray-400 text-center mb-8">
                PYRAX implements an EIP-1559-style fee mechanism with the
                following distribution:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {feeDistribution.map((item) => (
                  <div
                    key={item.name}
                    className="text-center p-6 rounded-lg bg-white/5"
                  >
                    <div
                      className={`w-16 h-16 mx-auto rounded-full ${item.color} flex items-center justify-center mb-4`}
                    >
                      <span className="text-2xl font-bold text-white">
                        {item.percentage}%
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm text-gray-400 text-center">
                  <strong className="text-yellow-400">Note:</strong> The 50%
                  burn rate creates deflationary pressure during periods of high
                  network usage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Vesting Schedules
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-green-400" />
                <h3 className="font-semibold text-white">Core Contributors</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <strong className="text-white">Cliff:</strong> 1 year
                </li>
                <li>
                  <strong className="text-white">Vesting:</strong> 4 years total
                </li>
                <li>
                  <strong className="text-white">Release:</strong> Linear monthly
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-pink-400" />
                <h3 className="font-semibold text-white">
                  Strategic Partnerships
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <strong className="text-white">Structure:</strong>{" "}
                  Milestone-based
                </li>
                <li>
                  <strong className="text-white">Release:</strong> Upon delivery
                </li>
                <li>
                  <strong className="text-white">Rationale:</strong> Value-driven
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <img src="/brand/pyrax-coin.svg" alt="PYRAX" className="h-6 w-6" />
                <h3 className="font-semibold text-white">Presale</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <strong className="text-white">Claim:</strong> At mainnet launch
                </li>
                <li>
                  <strong className="text-white">Lock:</strong> Per presale terms
                </li>
                <li>
                  <strong className="text-white">Network:</strong> PYRAX mainnet
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="p-8 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">
              Risk Disclosure
            </h3>
            <p className="text-gray-400">
              This tokenomics documentation describes the planned token economy
              of PYRAX. Actual implementation may vary based on development
              progress and community feedback. Cryptocurrency investments carry
              significant risks including potential total loss of capital. PYRAX
              tokens provide no ownership rights, dividends, or governance
              voting power over consensus rules. This is not financial,
              investment, or legal advice. Always conduct your own research and
              consult professional advisors before participating.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
      <Icon className="h-8 w-8 text-pyrax-orange mx-auto mb-3" />
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-3xl font-bold text-white mt-1">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{sublabel}</div>
    </div>
  );
}
