// PYRAX Network Configuration
// Shared across web and desktop apps
// Supports DevNet (local), Forge Testnet, and future networks

export type NetworkId = 'devnet' | 'forge' | 'blaze' | 'inferno' | 'phoenix' | 'mainnet';

export interface NetworkConfig {
  id: NetworkId;
  name: string;
  displayName: string;
  chainId: number;
  
  // RPC Endpoints
  rpcUrl: string;
  wsUrl: string;
  
  // Stream-specific endpoints
  streamA: {
    rpcUrl: string;
    wsUrl: string;
    p2pPort: number;
  };
  streamB: {
    rpcUrl: string;
    wsUrl: string;
    p2pPort: number;
  };
  streamC: {
    rpcUrl: string;
    wsUrl: string;
    p2pPort: number;
  };
  
  // Services
  explorerUrl: string;
  faucetUrl?: string;
  apiUrl: string;
  
  // Crucible & Foundry
  crucibleApi: string;
  foundryApi: string;
  workerRegistryUrl: string;
  
  // Mining pool
  stratumUrl: string;
  
  // Contract addresses
  contracts: {
    jobRegistry?: string;
    workerRegistry?: string;
    paymentChannel?: string;
    staking?: string;
    governance?: string;
  };
  
  // Network properties
  isTestnet: boolean;
  isLocal: boolean;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

// Network configurations
export const NETWORKS: Record<NetworkId, NetworkConfig> = {
  // Local development network
  devnet: {
    id: 'devnet',
    name: 'devnet',
    displayName: 'DevNet (Local)',
    chainId: 789536,
    
    rpcUrl: 'http://127.0.0.1:8546',
    wsUrl: 'ws://127.0.0.1:8547',
    
    streamA: {
      rpcUrl: 'http://127.0.0.1:8545',
      wsUrl: 'ws://127.0.0.1:8546',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'http://127.0.0.1:8546',
      wsUrl: 'ws://127.0.0.1:8547',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'http://127.0.0.1:8556',
      wsUrl: 'ws://127.0.0.1:8557',
      p2pPort: 30305,
    },
    
    explorerUrl: 'http://localhost:3001',
    faucetUrl: 'http://localhost:3002',
    apiUrl: 'http://localhost:3000/api/v1',
    
    crucibleApi: 'http://localhost:3000/api/v1/crucible',
    foundryApi: 'http://localhost:3000/api/v1/foundry',
    workerRegistryUrl: 'http://localhost:3000/api/v1/workers',
    
    stratumUrl: 'stratum+tcp://localhost:3333',
    
    contracts: {},
    
    isTestnet: true,
    isLocal: true,
    nativeCurrency: {
      name: 'PYRAX',
      symbol: 'PYRAX',
      decimals: 18,
    },
  },
  
  // Phase 1: Forge Testnet - Node Setup & Mining
  forge: {
    id: 'forge',
    name: 'forge',
    displayName: '🔥 Forge Testnet',
    chainId: 789537,
    
    rpcUrl: 'https://forge-rpc.pyrax.org',
    wsUrl: 'wss://forge-ws.pyrax.org',
    
    streamA: {
      rpcUrl: 'https://forge-rpc.pyrax.org',
      wsUrl: 'wss://forge-ws.pyrax.org',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'https://forge-rpc.pyrax.org',
      wsUrl: 'wss://forge-ws.pyrax.org',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'https://forge-rpc.pyrax.org',
      wsUrl: 'wss://forge-ws.pyrax.org',
      p2pPort: 30305,
    },
    
    explorerUrl: 'https://forge.pyrax.org',
    faucetUrl: 'https://faucet.pyrax.org',
    apiUrl: 'https://pyrax.org/api/v1',
    
    crucibleApi: 'https://pyrax.org/api/v1/crucible',
    foundryApi: 'https://pyrax.org/api/v1/foundry',
    workerRegistryUrl: 'https://pyrax.org/api/v1/workers',
    
    stratumUrl: 'stratum+tcp://forge-pool.pyrax.org:3333',
    
    contracts: {},
    
    isTestnet: true,
    isLocal: false,
    nativeCurrency: {
      name: 'PYRAX',
      symbol: 'PYRAX',
      decimals: 18,
    },
  },
  
  // Phase 2: Blaze Testnet - Transactions & Smart Contracts
  blaze: {
    id: 'blaze',
    name: 'blaze',
    displayName: '⚡ Blaze Testnet',
    chainId: 789538,
    
    rpcUrl: 'https://blaze-rpc.pyrax.org',
    wsUrl: 'wss://blaze-ws.pyrax.org',
    
    streamA: {
      rpcUrl: 'https://blaze-rpc.pyrax.org',
      wsUrl: 'wss://blaze-ws.pyrax.org',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'https://blaze-rpc.pyrax.org',
      wsUrl: 'wss://blaze-ws.pyrax.org',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'https://blaze-rpc.pyrax.org',
      wsUrl: 'wss://blaze-ws.pyrax.org',
      p2pPort: 30305,
    },
    
    explorerUrl: 'https://blaze.pyrax.org',
    faucetUrl: 'https://faucet.pyrax.org',
    apiUrl: 'https://pyrax.org/api/v1',
    
    crucibleApi: 'https://pyrax.org/api/v1/crucible',
    foundryApi: 'https://pyrax.org/api/v1/foundry',
    workerRegistryUrl: 'https://pyrax.org/api/v1/workers',
    
    stratumUrl: 'stratum+tcp://blaze-pool.pyrax.org:3333',
    
    contracts: {},
    
    isTestnet: true,
    isLocal: false,
    nativeCurrency: {
      name: 'PYRAX',
      symbol: 'PYRAX',
      decimals: 18,
    },
  },
  
  // Phase 3: Inferno Testnet - DEX & Liquidity
  inferno: {
    id: 'inferno',
    name: 'inferno',
    displayName: '🔴 Inferno Testnet',
    chainId: 789539,
    
    rpcUrl: 'https://inferno-rpc.pyrax.org',
    wsUrl: 'wss://inferno-ws.pyrax.org',
    
    streamA: {
      rpcUrl: 'https://inferno-rpc.pyrax.org',
      wsUrl: 'wss://inferno-ws.pyrax.org',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'https://inferno-rpc.pyrax.org',
      wsUrl: 'wss://inferno-ws.pyrax.org',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'https://inferno-rpc.pyrax.org',
      wsUrl: 'wss://inferno-ws.pyrax.org',
      p2pPort: 30305,
    },
    
    explorerUrl: 'https://inferno.pyrax.org',
    faucetUrl: 'https://faucet.pyrax.org',
    apiUrl: 'https://pyrax.org/api/v1',
    
    crucibleApi: 'https://pyrax.org/api/v1/crucible',
    foundryApi: 'https://pyrax.org/api/v1/foundry',
    workerRegistryUrl: 'https://pyrax.org/api/v1/workers',
    
    stratumUrl: 'stratum+tcp://inferno-pool.pyrax.org:3333',
    
    contracts: {},
    
    isTestnet: true,
    isLocal: false,
    nativeCurrency: {
      name: 'PYRAX',
      symbol: 'PYRAX',
      decimals: 18,
    },
  },
  
  // Phase 4: Phoenix Testnet - Full Ecosystem Stress Test
  phoenix: {
    id: 'phoenix',
    name: 'phoenix',
    displayName: '🟣 Phoenix Testnet',
    chainId: 789540,
    
    rpcUrl: 'https://phoenix-rpc.pyrax.org',
    wsUrl: 'wss://phoenix-ws.pyrax.org',
    
    streamA: {
      rpcUrl: 'https://phoenix-rpc.pyrax.org',
      wsUrl: 'wss://phoenix-ws.pyrax.org',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'https://phoenix-rpc.pyrax.org',
      wsUrl: 'wss://phoenix-ws.pyrax.org',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'https://phoenix-rpc.pyrax.org',
      wsUrl: 'wss://phoenix-ws.pyrax.org',
      p2pPort: 30305,
    },
    
    explorerUrl: 'https://phoenix.pyrax.org',
    faucetUrl: 'https://faucet.pyrax.org',
    apiUrl: 'https://pyrax.org/api/v1',
    
    crucibleApi: 'https://pyrax.org/api/v1/crucible',
    foundryApi: 'https://pyrax.org/api/v1/foundry',
    workerRegistryUrl: 'https://pyrax.org/api/v1/workers',
    
    stratumUrl: 'stratum+tcp://phoenix-pool.pyrax.org:3333',
    
    contracts: {},
    
    isTestnet: true,
    isLocal: false,
    nativeCurrency: {
      name: 'PYRAX',
      symbol: 'PYRAX',
      decimals: 18,
    },
  },
  
  // Production Mainnet
  mainnet: {
    id: 'mainnet',
    name: 'mainnet',
    displayName: '⭐ PYRAX Mainnet',
    chainId: 7895,
    
    rpcUrl: 'https://rpc.pyrax.org',
    wsUrl: 'wss://ws.pyrax.org',
    
    streamA: {
      rpcUrl: 'https://rpc.pyrax.org',
      wsUrl: 'wss://ws.pyrax.org',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'https://rpc.pyrax.org',
      wsUrl: 'wss://ws.pyrax.org',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'https://rpc.pyrax.org',
      wsUrl: 'wss://ws.pyrax.org',
      p2pPort: 30305,
    },
    
    explorerUrl: 'https://explorer.pyrax.org',
    apiUrl: 'https://pyrax.org/api/v1',
    
    crucibleApi: 'https://pyrax.org/api/v1/crucible',
    foundryApi: 'https://pyrax.org/api/v1/foundry',
    workerRegistryUrl: 'https://pyrax.org/api/v1/workers',
    
    stratumUrl: 'stratum+tcp://pool.pyrax.org:3333',
    
    contracts: {},
    
    isTestnet: false,
    isLocal: false,
    nativeCurrency: {
      name: 'PYRAX',
      symbol: 'PYRAX',
      decimals: 18,
    },
  },
};

// Get network by ID
export function getNetwork(id: NetworkId): NetworkConfig {
  return NETWORKS[id];
}

// Get all available networks
export function getAllNetworks(): NetworkConfig[] {
  return Object.values(NETWORKS);
}

// Default network (Forge testnet for production, DevNet for development)
export const DEFAULT_NETWORK: NetworkId = process.env.NODE_ENV === 'development' ? 'devnet' : 'forge';
