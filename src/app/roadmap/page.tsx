"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Circle, Rocket, Globe, Clock, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TestnetConfig, TestnetNetwork, getDaysUntilLaunch, defaultTestnetConfig } from "@/lib/testnet-config";

// Map network status to display status
function getDisplayStatus(status: string): "complete" | "in_development" | "planned" {
  switch (status) {
    case "graduated":
      return "complete";
    case "active":
    case "upcoming":
      return "in_development";
    default:
      return "planned";
  }
}

export default function RoadmapPage() {
  const [config, setConfig] = useState<TestnetConfig>(defaultTestnetConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/testnet/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.networks) setConfig(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activeNetwork = config.networks.find((n) => n.status === "active");
  const upcomingNetwork = config.networks.find((n) => n.status === "upcoming");

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Network Roadmap</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Progressive rollout from internal development through public testnets to mainnet launch.
          </p>
        </div>

        {/* Current Network Status */}
        {activeNetwork && (
          <div className="mb-12 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Zap className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-green-400">Current Active Network</div>
                  <div className="text-xl font-bold text-white">{activeNetwork.name}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Globe className="h-4 w-4" />
                  <code className="text-green-400">{activeNetwork.rpcUrl}</code>
                </div>
                <div className="text-gray-400">Chain ID: {activeNetwork.chainId}</div>
              </div>
            </div>

            {upcomingNetwork && upcomingNetwork.launchDate && (
              <div className="p-6 rounded-xl bg-pyrax-orange/10 border border-pyrax-orange/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-pyrax-orange/20">
                    <Rocket className="h-5 w-5 text-pyrax-orange animate-bounce" />
                  </div>
                  <div>
                    <div className="text-sm text-pyrax-orange">Upcoming Upgrade</div>
                    <div className="text-xl font-bold text-white">{upcomingNetwork.name}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>
                      Launching {new Date(upcomingNetwork.launchDate).toLocaleDateString()} ({getDaysUntilLaunch(upcomingNetwork)} days)
                    </span>
                  </div>
                  <div className="text-gray-400">New RPC: <code className="text-pyrax-orange">{upcomingNetwork.rpcUrl}</code></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Phase Timeline */}
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10" />

          <div className="space-y-12">
            {config.networks.map((network, index) => {
              const displayStatus = getDisplayStatus(network.status);
              const isActive = network.status === "active";
              const isUpcoming = network.status === "upcoming";
              const daysUntil = getDaysUntilLaunch(network);

              return (
                <div
                  key={network.id}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
                >
                  <div className={`${index % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"}`}>
                    <div className={`inline-block p-6 rounded-xl border ${
                      isActive ? "bg-green-500/10 border-green-500/30" :
                      isUpcoming ? "bg-pyrax-orange/10 border-pyrax-orange/30" :
                      "bg-white/5 border-white/10"
                    } ${index % 2 === 0 ? "lg:ml-auto" : ""}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${
                          isActive ? "bg-green-500/20" :
                          isUpcoming ? "bg-pyrax-orange/20" :
                          "bg-pyrax-orange/10"
                        }`}>
                          <Rocket className={`h-6 w-6 ${
                            isActive ? "text-green-400" :
                            isUpcoming ? "text-pyrax-orange animate-bounce" :
                            "text-pyrax-orange"
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{network.name}</h3>
                          <div className={`text-sm ${isActive ? "text-green-400" : "text-pyrax-orange"}`}>
                            {network.codename}
                          </div>
                        </div>
                        {isUpcoming && daysUntil !== null && (
                          <span className="ml-auto px-2 py-1 rounded-full bg-pyrax-orange/20 text-pyrax-orange text-xs font-bold">
                            {daysUntil} days
                          </span>
                        )}
                      </div>

                      <p className="text-gray-400 mb-4">{network.description}</p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {network.features.map((f) => (
                          <span key={f} className="px-2 py-1 rounded bg-white/5 text-xs text-gray-300">{f}</span>
                        ))}
                      </div>

                      {/* Milestones */}
                      <ul className="space-y-2 mb-4">
                        {network.milestones.map((m) => (
                          <li key={m.text} className="flex items-center gap-2 text-sm">
                            {m.done ? (
                              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            )}
                            <span className={m.done ? "text-gray-300" : "text-gray-500"}>{m.text}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Status Badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs ${
                        displayStatus === "complete" ? "text-green-400" :
                        displayStatus === "in_development" ? "text-pyrax-amber" : "text-gray-400"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          displayStatus === "complete" ? "bg-green-400" :
                          displayStatus === "in_development" ? "bg-pyrax-amber animate-pulse" : "bg-gray-500"
                        }`} />
                        {displayStatus === "complete" ? "Complete" :
                         displayStatus === "in_development" ? (isActive ? "Active" : "Upcoming") : "Planned"}
                      </div>

                      {/* RPC Info for active/upcoming */}
                      {(isActive || isUpcoming) && (
                        <div className="mt-4 pt-4 border-t border-white/10 text-xs">
                          <div className="text-gray-500">RPC Endpoint</div>
                          <code className={isActive ? "text-green-400" : "text-pyrax-orange"}>{network.rpcUrl}</code>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`hidden lg:flex items-center justify-center ${
                    index % 2 === 0 ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"
                  }`}>
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                        isActive ? "bg-green-500 text-white" :
                        isUpcoming ? "bg-pyrax-orange text-white" :
                        displayStatus === "complete" ? "bg-blue-500 text-white" :
                        "bg-pyrax-dark border-4 border-pyrax-orange text-white"
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
