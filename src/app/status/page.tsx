import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";

const networks = [
  {
    name: "Smelter",
    type: "Internal Devnet",
    status: "planned",
    rpc: null,
    explorer: null,
  },
  {
    name: "Kindling",
    type: "Public Testnet v0.1",
    status: "planned",
    rpc: null,
    explorer: null,
  },
  {
    name: "Forgefire",
    type: "Public Testnet v0.2",
    status: "planned",
    rpc: null,
    explorer: null,
  },
  {
    name: "Crownflame",
    type: "Public Testnet v0.3",
    status: "planned",
    rpc: null,
    explorer: null,
  },
  {
    name: "Furnace",
    type: "Mainnet v1.0",
    status: "planned",
    rpc: null,
    explorer: null,
  },
];

const services = [
  { name: "Marketing Website", status: "operational" },
  { name: "Presale Contract", status: "planned" },
  { name: "Presale API", status: "planned" },
  { name: "Block Explorer", status: "planned" },
  { name: "Faucet", status: "planned" },
];

function StatusBadge({ status }: { status: string }) {
  const config = {
    operational: {
      icon: CheckCircle,
      text: "Operational",
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    degraded: {
      icon: AlertCircle,
      text: "Degraded",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    down: {
      icon: XCircle,
      text: "Down",
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
    planned: {
      icon: Clock,
      text: "Planned",
      color: "text-gray-400",
      bg: "bg-gray-400/10",
    },
  }[status] || {
    icon: Clock,
    text: status,
    color: "text-gray-400",
    bg: "bg-gray-400/10",
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${config.bg} ${config.color}`}
    >
      <Icon className="h-4 w-4" />
      {config.text}
    </span>
  );
}

export default function StatusPage() {
  const allOperational = services.every(
    (s) => s.status === "operational" || s.status === "planned"
  );

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            System Status
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Current status of PYRAX networks and services.
          </p>
        </div>

        <div
          className={`p-6 rounded-xl mb-12 ${
            allOperational
              ? "bg-green-500/10 border border-green-500/20"
              : "bg-yellow-500/10 border border-yellow-500/20"
          }`}
        >
          <div className="flex items-center gap-3">
            {allOperational ? (
              <CheckCircle className="h-8 w-8 text-green-400" />
            ) : (
              <AlertCircle className="h-8 w-8 text-yellow-400" />
            )}
            <div>
              <h2 className="text-xl font-semibold text-white">
                {allOperational
                  ? "All Systems Operational"
                  : "Some Systems Experiencing Issues"}
              </h2>
              <p className="text-gray-400 text-sm">
                Last updated: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Networks</h2>
          <div className="space-y-4">
            {networks.map((network) => (
              <div
                key={network.name}
                className="p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-semibold text-white">{network.name}</h3>
                    <p className="text-sm text-gray-400">{network.type}</p>
                  </div>
                  <StatusBadge status={network.status} />
                </div>
                {(network.rpc || network.explorer) && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-4 text-sm">
                    {network.rpc && (
                      <div>
                        <span className="text-gray-400">RPC: </span>
                        <code className="text-pyrax-orange">{network.rpc}</code>
                      </div>
                    )}
                    {network.explorer && (
                      <div>
                        <span className="text-gray-400">Explorer: </span>
                        <a
                          href={network.explorer}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pyrax-orange hover:text-pyrax-amber"
                        >
                          {network.explorer}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Services</h2>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-white">{service.name}</span>
                  <StatusBadge status={service.status} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Incident History</h2>
          <div className="p-8 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-gray-400">No incidents reported.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
