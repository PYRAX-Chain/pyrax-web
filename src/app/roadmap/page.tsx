import { CheckCircle, Circle, Flame } from "lucide-react";

const phases = [
  {
    name: "Smelter",
    type: "Internal Devnet",
    status: "complete",
    description: "Core protocol development and internal testing environment.",
    milestones: [
      "Basic node implementation",
      "Stream A mining functional",
      "Simple RPC interface",
      "Internal testing tools",
    ],
  },
  {
    name: "Kindling",
    type: "Public Testnet v0.1",
    status: "in_development",
    description: "Initial public testing and community feedback.",
    milestones: [
      "Stable node release",
      "Stream A and B functional",
      "Block explorer v1",
      "Faucet operational",
      "Developer documentation",
    ],
  },
  {
    name: "Forgefire",
    type: "Public Testnet v0.2",
    status: "planned",
    description: "Feature completeness and stress testing.",
    milestones: [
      "Full GHOSTDAG implementation",
      "Complete RPC API",
      "Mining software releases",
      "Performance optimization",
      "Bug bounty program launch",
    ],
  },
  {
    name: "Crownflame",
    type: "Public Testnet v0.3",
    status: "planned",
    description: "Stream C integration and finality testing.",
    milestones: [
      "ZK checkpoint generation",
      "Prover network operational",
      "End-to-end finality",
      "Claim rehearsal (testnet)",
      "Security audits initiated",
    ],
  },
  {
    name: "Furnace",
    type: "Mainnet v1.0",
    status: "planned",
    description: "Production network launch.",
    milestones: [
      "Audited codebase",
      "Genesis block",
      "Presale claim mechanism",
      "Full documentation",
      "Support infrastructure",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Roadmap
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Progressive rollout from internal development through public
            testnets to mainnet launch. Milestone-based progress, no fixed
            dates.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10" />

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div
                key={phase.name}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div
                  className={`${
                    index % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"
                  }`}
                >
                  <div
                    className={`inline-block p-6 rounded-xl bg-white/5 border border-white/10 ${
                      index % 2 === 0 ? "lg:ml-auto" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-pyrax-orange/10">
                        <Flame className="h-6 w-6 text-pyrax-orange" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {phase.name}
                        </h3>
                        <div className="text-sm text-pyrax-orange">
                          {phase.type}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-4">{phase.description}</p>

                    <ul className="space-y-2">
                      {phase.milestones.map((milestone) => (
                        <li
                          key={milestone}
                          className="flex items-center gap-2 text-sm"
                        >
                          {phase.status === "complete" ? (
                            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          )}
                          <span className="text-gray-300">{milestone}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs ${
                      phase.status === "complete" ? "text-green-400" :
                      phase.status === "in_development" ? "text-pyrax-amber" : "text-gray-400"
                    }`}>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          phase.status === "complete"
                            ? "bg-green-400"
                            : phase.status === "in_development"
                            ? "bg-pyrax-amber animate-pulse"
                            : "bg-gray-500"
                        }`}
                      />
                      {phase.status === "complete"
                        ? "Complete"
                        : phase.status === "in_development"
                        ? "In Development"
                        : "Planned"}
                    </div>
                  </div>
                </div>

                <div
                  className={`hidden lg:flex items-center justify-center ${
                    index % 2 === 0 ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-pyrax-dark border-4 border-pyrax-orange flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Post-Launch Development
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Future development areas under consideration (not committed):
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "Light client improvements",
              "Cross-chain bridges",
              "Developer tooling",
              "Protocol optimizations",
            ].map((item) => (
              <div
                key={item}
                className="p-4 rounded-lg bg-white/5 border border-white/10 text-center"
              >
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="p-8 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">
              Development Philosophy
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-pyrax-orange mb-2">
                  Milestone-Based Progress
                </h4>
                <p className="text-gray-400 text-sm">
                  We do not commit to specific dates. Each phase advances when
                  its technical milestones are complete and thoroughly tested.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pyrax-orange mb-2">
                  Quality Over Speed
                </h4>
                <p className="text-gray-400 text-sm">
                  Security and correctness take priority. We will not rush
                  releases that compromise the integrity of the network.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pyrax-orange mb-2">
                  Community Feedback
                </h4>
                <p className="text-gray-400 text-sm">
                  Each testnet phase incorporates community feedback. Public
                  testing helps identify issues and improve the protocol.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pyrax-orange mb-2">
                  Transparent Development
                </h4>
                <p className="text-gray-400 text-sm">
                  All development is open source. Progress, challenges, and
                  decisions are communicated openly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
            <p className="text-sm text-gray-400">
              <strong className="text-yellow-400">Disclaimer:</strong> This
              roadmap represents current development plans and may change based
              on technical requirements, security considerations, or community
              feedback. No guarantees are made regarding specific features or
              timelines. Cryptocurrency projects carry inherent risks.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
