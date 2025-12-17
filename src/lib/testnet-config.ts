// Testnet Phase Configuration
// This file manages all testnet phase data, RPC endpoints, and status

export type NetworkStatus = "planned" | "upcoming" | "active" | "graduated" | "deprecated";

export interface TestnetNetwork {
  id: string;
  name: string;
  codename: string;
  version: string;
  status: NetworkStatus;
  rpcUrl: string;
  wsUrl: string;
  explorerUrl: string;
  faucetUrl: string;
  chainId: number;
  description: string;
  launchDate: string | null; // ISO date string
  graduationDate: string | null; // ISO date string
  announcementDate: string | null; // 7 days before launch
  features: string[];
  milestones: { text: string; done: boolean }[];
}

export interface TestnetConfig {
  currentNetwork: string; // ID of the current active network
  networks: TestnetNetwork[];
  lastUpdated: string;
}

// Default testnet configuration aligned with presale schedule
export const defaultTestnetConfig: TestnetConfig = {
  currentNetwork: "kindling",
  lastUpdated: new Date().toISOString(),
  networks: [
    {
      id: "smelter",
      name: "Smelter",
      codename: "Internal Devnet",
      version: "v0.0.x",
      status: "graduated",
      rpcUrl: "https://smelter-rpc.pyrax.io",
      wsUrl: "wss://smelter-ws.pyrax.io",
      explorerUrl: "https://smelter-explorer.pyrax.io",
      faucetUrl: "https://smelter-faucet.pyrax.io",
      chainId: 7920,
      description: "Core protocol development and internal testing environment.",
      launchDate: "2024-06-01T00:00:00Z",
      graduationDate: "2024-09-01T00:00:00Z",
      announcementDate: null,
      features: ["Basic consensus", "Stream A mining", "Simple RPC"],
      milestones: [
        { text: "Basic node implementation", done: true },
        { text: "Stream A mining functional", done: true },
        { text: "Simple RPC interface", done: true },
        { text: "Internal testing tools", done: true },
      ],
    },
    {
      id: "kindling",
      name: "Kindling",
      codename: "Public Testnet v0.1",
      version: "v0.1.x",
      status: "active",
      rpcUrl: "https://kindling-rpc.pyrax.io",
      wsUrl: "wss://kindling-ws.pyrax.io",
      explorerUrl: "https://explorer.pyrax.io",
      faucetUrl: "https://faucet.pyrax.io",
      chainId: 7921,
      description: "Initial public testing - node setup, mining, basic transactions.",
      launchDate: "2024-09-15T00:00:00Z",
      graduationDate: null,
      announcementDate: null,
      features: ["Stream A + B mining", "Block explorer", "Faucet", "Basic wallet support"],
      milestones: [
        { text: "Stable node release", done: true },
        { text: "Stream A and B functional", done: true },
        { text: "Block explorer v1", done: true },
        { text: "Faucet operational", done: true },
        { text: "Developer documentation", done: true },
      ],
    },
    {
      id: "forgefire",
      name: "Forgefire",
      codename: "Public Testnet v0.2",
      version: "v0.2.x",
      status: "planned",
      rpcUrl: "https://forgefire-rpc.pyrax.io",
      wsUrl: "wss://forgefire-ws.pyrax.io",
      explorerUrl: "https://forgefire-explorer.pyrax.io",
      faucetUrl: "https://forgefire-faucet.pyrax.io",
      chainId: 7922,
      description: "Smart contracts, DEX testing, Crucible AI beta.",
      launchDate: null,
      graduationDate: null,
      announcementDate: null,
      features: ["Full EVM", "PYSWAP DEX", "Crucible AI beta", "Mining software releases"],
      milestones: [
        { text: "Full GHOSTDAG implementation", done: true },
        { text: "Complete RPC API", done: true },
        { text: "Crucible AI inference beta", done: false },
        { text: "Mining software releases", done: false },
        { text: "Bug bounty program launch", done: false },
      ],
    },
    {
      id: "crownflame",
      name: "Crownflame",
      codename: "Public Testnet v0.3",
      version: "v0.3.x",
      status: "planned",
      rpcUrl: "https://crownflame-rpc.pyrax.io",
      wsUrl: "wss://crownflame-ws.pyrax.io",
      explorerUrl: "https://crownflame-explorer.pyrax.io",
      faucetUrl: "https://crownflame-faucet.pyrax.io",
      chainId: 7923,
      description: "Stream C + ZK-STARK finality + full AI ecosystem.",
      launchDate: null,
      graduationDate: null,
      announcementDate: null,
      features: ["Stream C (100ms blocks)", "ZK-STARK proofs", "Foundry ML", "Full Crucible"],
      milestones: [
        { text: "ZK checkpoint generation", done: false },
        { text: "Foundry ML training beta", done: false },
        { text: "Prover network operational", done: false },
        { text: "End-to-end finality", done: false },
        { text: "Full Crucible integration", done: false },
      ],
    },
    {
      id: "furnace",
      name: "Furnace",
      codename: "Mainnet v1.0",
      version: "v1.0.x",
      status: "planned",
      rpcUrl: "https://rpc.pyrax.io",
      wsUrl: "wss://ws.pyrax.io",
      explorerUrl: "https://explorer.pyrax.io",
      faucetUrl: "", // No faucet on mainnet
      chainId: 792,
      description: "Production mainnet launch with full feature set.",
      launchDate: null,
      graduationDate: null,
      announcementDate: null,
      features: ["Full production network", "Presale claims", "All features live"],
      milestones: [
        { text: "Audited codebase", done: false },
        { text: "Genesis block", done: false },
        { text: "Presale claim mechanism", done: false },
        { text: "Full documentation", done: false },
        { text: "Support infrastructure", done: false },
      ],
    },
  ],
};

// Helper functions
export function getCurrentNetwork(config: TestnetConfig): TestnetNetwork | undefined {
  return config.networks.find((n) => n.id === config.currentNetwork);
}

export function getActiveNetwork(config: TestnetConfig): TestnetNetwork | undefined {
  return config.networks.find((n) => n.status === "active");
}

export function getUpcomingNetwork(config: TestnetConfig): TestnetNetwork | undefined {
  return config.networks.find((n) => n.status === "upcoming");
}

export function isUpgradeAnnounced(config: TestnetConfig): boolean {
  const upcoming = getUpcomingNetwork(config);
  return upcoming !== null && upcoming !== undefined && upcoming.announcementDate !== null;
}

export function getDaysUntilLaunch(network: TestnetNetwork): number | null {
  if (!network.launchDate) return null;
  const launch = new Date(network.launchDate);
  const now = new Date();
  const diff = launch.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getNetworkStatusColor(status: NetworkStatus): string {
  switch (status) {
    case "active":
      return "text-green-400";
    case "upcoming":
      return "text-pyrax-amber";
    case "graduated":
      return "text-blue-400";
    case "deprecated":
      return "text-gray-500";
    default:
      return "text-gray-400";
  }
}

export function getNetworkStatusBgColor(status: NetworkStatus): string {
  switch (status) {
    case "active":
      return "bg-green-500/20";
    case "upcoming":
      return "bg-pyrax-amber/20";
    case "graduated":
      return "bg-blue-500/20";
    case "deprecated":
      return "bg-gray-500/20";
    default:
      return "bg-gray-500/20";
  }
}
