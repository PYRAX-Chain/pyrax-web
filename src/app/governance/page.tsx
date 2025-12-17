import { Users, FileText, GitBranch, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const pipStages = [
  { name: "Draft", description: "Formal proposal written" },
  { name: "Review", description: "Community review and feedback" },
  { name: "Accepted", description: "Approved for implementation" },
  { name: "Final", description: "Specification complete" },
  { name: "Active", description: "Deployed on mainnet" },
];

export default function GovernancePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Governance
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            PYRAX follows an Ethereum-style governance model. No token voting,
            no community ownership of the protocol. Decisions emerge from open
            discussion, technical merit, and rough consensus — not token holdings.
          </p>
        </div>

        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Why No Token Voting?
              </h2>
              <p className="text-gray-400 mb-6">
                On-chain token voting for consensus rule changes creates
                fundamental problems that undermine decentralization and
                long-term network health.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Plutocracy Risk",
                    description:
                      "Wealthy holders have disproportionate influence over protocol direction.",
                  },
                  {
                    title: "Voter Apathy",
                    description:
                      "Low participation leads to minority rule by active voters.",
                  },
                  {
                    title: "Exchange Influence",
                    description:
                      "Custodial tokens may vote against actual user interests.",
                  },
                  {
                    title: "Short-term Thinking",
                    description:
                      "Financial incentives may conflict with long-term network health.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-xl bg-gradient-to-b from-pyrax-orange/10 to-transparent border border-pyrax-orange/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ethereum-Style Governance
              </h3>
              <p className="text-gray-400 mb-6">
                Like Ethereum, PYRAX consensus rules are a social contract.
                There is no &quot;ownership&quot; of the protocol — it belongs to no one
                and everyone. Changes require broad agreement through discussion.
              </p>
              <ul className="space-y-3">
                {[
                  "Rough consensus through open discussion",
                  "Technical merit drives decisions",
                  "Running code demonstrates viability",
                  "Client diversity encouraged",
                  "Scheduled network upgrades",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-pyrax-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            PYRAX Improvement Proposals (PIPs)
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-gray-400 text-center mb-8">
              PIPs are the primary mechanism for proposing changes to PYRAX.
              They document design decisions and provide a structured process
              for protocol evolution.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {pipStages.map((stage, index) => (
                <div key={stage.name} className="flex items-center">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center min-w-[120px]">
                    <div className="font-semibold text-white">{stage.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {stage.description}
                    </div>
                  </div>
                  {index < pipStages.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-gray-500 mx-2" />
                  )}
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: FileText,
                  title: "Core PIPs",
                  description: "Consensus-critical changes like fork rules and block structure",
                },
                {
                  icon: GitBranch,
                  title: "Networking PIPs",
                  description: "P2P protocol changes like message formats and discovery",
                },
                {
                  icon: Users,
                  title: "Interface PIPs",
                  description: "API specifications like RPC methods and ABIs",
                },
                {
                  icon: Shield,
                  title: "Informational PIPs",
                  description: "Guidelines and best practices for the ecosystem",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-pyrax-orange/10">
                      <item.icon className="h-5 w-5 text-pyrax-orange" />
                    </div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Network Upgrades
          </h2>

          <div className="max-w-3xl mx-auto p-8 rounded-xl bg-white/5 border border-white/10">
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Proposal",
                  description: "Relevant PIPs reach 'Final' status through community consensus",
                },
                {
                  step: "2",
                  title: "Implementation",
                  description: "All major client teams implement the approved changes",
                },
                {
                  step: "3",
                  title: "Testing",
                  description: "Changes are thoroughly tested on public testnets",
                },
                {
                  step: "4",
                  title: "Announcement",
                  description: "Upgrade block height announced with sufficient lead time",
                },
                {
                  step: "5",
                  title: "Activation",
                  description: "Changes activate at the specified block height",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pyrax-orange/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-pyrax-orange font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="p-8 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Checks and Balances
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-pyrax-orange mb-2">
                  No Admin Keys
                </h3>
                <p className="text-sm text-gray-400">
                  The core protocol has no admin keys that can seize funds,
                  change consensus rules, or censor transactions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-pyrax-orange mb-2">
                  Client Diversity
                </h3>
                <p className="text-sm text-gray-400">
                  Multiple independent client implementations ensure no single
                  point of failure and cross-validation of protocol rules.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-pyrax-orange mb-2">
                  Open Development
                </h3>
                <p className="text-sm text-gray-400">
                  All development is public with open source code, public
                  discussions, and transparent decision making.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
