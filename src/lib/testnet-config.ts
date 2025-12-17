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
  currentNetwork: "forge",
  lastUpdated: new Date().toISOString(),
  networks: [
    {
      id: "forge",
      name: "Forge",
      codename: "🔥 Node Setup & Mining",
      version: "Phase 1",
      status: "active",
      rpcUrl: "https://forge-rpc.pyrax.org",
      wsUrl: "wss://forge-ws.pyrax.org",
      explorerUrl: "https://explorer.pyrax.org",
      faucetUrl: "https://faucet.pyrax.org",
      chainId: 7921,
      description: "Learn to run PYRAX nodes and test the mining infrastructure.",
      launchDate: null,
      graduationDate: null,
      announcementDate: null,
      features: ["Stream A + B mining", "Block explorer", "Faucet", "Node setup guides"],
      milestones: [
        { text: "Set up a Stream A or Stream B node", done: false },
        { text: "Successfully mine 10 test blocks", done: false },
        { text: "Join the node operator Discord channel", done: false },
        { text: "Submit mining stats via the dashboard", done: false },
      ],
    },
    {
      id: "blaze",
      name: "Blaze",
      codename: "⚡ Transactions & Smart Contracts",
      version: "Phase 2",
      status: "planned",
      rpcUrl: "https://blaze-rpc.pyrax.org",
      wsUrl: "wss://blaze-ws.pyrax.org",
      explorerUrl: "https://explorer.pyrax.org",
      faucetUrl: "https://faucet.pyrax.org",
      chainId: 7922,
      description: "Test transaction processing and deploy smart contracts.",
      launchDate: null,
      graduationDate: null,
      announcementDate: null,
      features: ["Full EVM support", "Smart contract deployment", "dApp testing", "Bug bounty"],
      milestones: [
        { text: "Send 50+ test transactions", done: false },
        { text: "Deploy a smart contract to testnet", done: false },
        { text: "Interact with 5 different dApps", done: false },
        { text: "Report any bugs found", done: false },
      ],
    },
    {
      id: "inferno",
      name: "Inferno",
      codename: "🌊 DEX & Liquidity Testing",
      version: "Phase 3",
      status: "planned",
      rpcUrl: "https://inferno-rpc.pyrax.org",
      wsUrl: "wss://inferno-ws.pyrax.org",
      explorerUrl: "https://explorer.pyrax.org",
      faucetUrl: "https://faucet.pyrax.org",
      chainId: 7923,
      description: "Test PYSWAP DEX functionality and liquidity provision.",
      launchDate: null,
      graduationDate: null,
      announcementDate: null,
      features: ["PYSWAP DEX", "Liquidity pools", "Token creation", "Bonding curves"],
      milestones: [
        { text: "Complete 20+ token swaps on PYSWAP", done: false },
        { text: "Provide liquidity to at least 2 pools", done: false },
        { text: "Create a token on the launchpad", done: false },
        { text: "Trade on the bonding curve", done: false },
      ],
    },
    {
      id: "phoenix",
      name: "Phoenix",
      codename: "🦅 Full Ecosystem Stress Test",
      version: "Phase 4",
      status: "planned",
      rpcUrl: "https://phoenix-rpc.pyrax.org",
      wsUrl: "wss://phoenix-ws.pyrax.org",
      explorerUrl: "https://explorer.pyrax.org",
      faucetUrl: "https://faucet.pyrax.org",
      chainId: 7924,
      description: "Final stress test of the entire PYRAX ecosystem.",
      launchDate: null,
      graduationDate: null,
      announcementDate: null,
      features: ["TPS stress test", "Full ecosystem", "Community onboarding", "Final feedback"],
      milestones: [
        { text: "Participate in the TPS stress test event", done: false },
        { text: "Complete all previous phase tasks", done: false },
        { text: "Help onboard 3 new testers", done: false },
        { text: "Submit final feedback report", done: false },
      ],
    },
    {
      id: "mainnet",
      name: "Mainnet",
      codename: "🚀 Production Launch",
      version: "v1.0",
      status: "planned",
      rpcUrl: "https://rpc.pyrax.org",
      wsUrl: "wss://ws.pyrax.org",
      explorerUrl: "https://explorer.pyrax.org",
      faucetUrl: "",
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
