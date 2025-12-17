// PYRAX Network Configuration
// Shared across web and desktop apps
// Supports Devnet, Testnets, and Mainnet

export type NetworkId = 'devnet' | 'testnet-alpha' | 'testnet-beta' | 'testnet-gamma' | 'mainnet';

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
  devnet: {
    id: 'devnet',
    name: 'devnet',
    displayName: 'Local Devnet',
    chainId: 31337,
    
    rpcUrl: 'http://localhost:8545',
    wsUrl: 'ws://localhost:8546',
    
    streamA: {
      rpcUrl: 'http://localhost:8545',
      wsUrl: 'ws://localhost:8546',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'http://localhost:8555',
      wsUrl: 'ws://localhost:8556',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'http://localhost:8565',
      wsUrl: 'ws://localhost:8566',
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
      symbol: 'PYRX',
      decimals: 18,
    },
  },
  
  'testnet-alpha': {
    id: 'testnet-alpha',
    name: 'testnet-alpha',
    displayName: 'Testnet Alpha (Phase 1)',
    chainId: 7001,
    
    rpcUrl: 'https://rpc-alpha.pyrax.network',
    wsUrl: 'wss://ws-alpha.pyrax.network',
    
    streamA: {
      rpcUrl: 'https://stream-a-alpha.pyrax.network',
      wsUrl: 'wss://ws-a-alpha.pyrax.network',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'https://stream-b-alpha.pyrax.network',
      wsUrl: 'wss://ws-b-alpha.pyrax.network',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'https://stream-c-alpha.pyrax.network',
      wsUrl: 'wss://ws-c-alpha.pyrax.network',
      p2pPort: 30305,
    },
    
    explorerUrl: 'https://explorer-alpha.pyrax.network',
    faucetUrl: 'https://faucet-alpha.pyrax.network',
    apiUrl: 'https://api-alpha.pyrax.network/v1',
    
    crucibleApi: 'https://api-alpha.pyrax.network/v1/crucible',
    foundryApi: 'https://api-alpha.pyrax.network/v1/foundry',
    workerRegistryUrl: 'https://api-alpha.pyrax.network/v1/workers',
    
    stratumUrl: 'stratum+tcp://pool-alpha.pyrax.network:3333',
    
    contracts: {
      jobRegistry: '0x...',
      workerRegistry: '0x...',
    },
    
    isTestnet: true,
    isLocal: false,
    nativeCurrency: {
      name: 'Test PYRAX',
      symbol: 'tPYRX',
      decimals: 18,
    },
  },
  
  'testnet-beta': {
    id: 'testnet-beta',
    name: 'testnet-beta',
    displayName: 'Testnet Beta (Phase 2)',
    chainId: 7002,
    
    rpcUrl: 'https://rpc-beta.pyrax.network',
    wsUrl: 'wss://ws-beta.pyrax.network',
    
    streamA: {
      rpcUrl: 'https://stream-a-beta.pyrax.network',
      wsUrl: 'wss://ws-a-beta.pyrax.network',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'https://stream-b-beta.pyrax.network',
      wsUrl: 'wss://ws-b-beta.pyrax.network',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'https://stream-c-beta.pyrax.network',
      wsUrl: 'wss://ws-c-beta.pyrax.network',
      p2pPort: 30305,
    },
    
    explorerUrl: 'https://explorer-beta.pyrax.network',
    faucetUrl: 'https://faucet-beta.pyrax.network',
    apiUrl: 'https://api-beta.pyrax.network/v1',
    
    crucibleApi: 'https://api-beta.pyrax.network/v1/crucible',
    foundryApi: 'https://api-beta.pyrax.network/v1/foundry',
    workerRegistryUrl: 'https://api-beta.pyrax.network/v1/workers',
    
    stratumUrl: 'stratum+tcp://pool-beta.pyrax.network:3333',
    
    contracts: {
      jobRegistry: '0x...',
      workerRegistry: '0x...',
      paymentChannel: '0x...',
    },
    
    isTestnet: true,
    isLocal: false,
    nativeCurrency: {
      name: 'Test PYRAX',
      symbol: 'tPYRX',
      decimals: 18,
    },
  },
  
  'testnet-gamma': {
    id: 'testnet-gamma',
    name: 'testnet-gamma',
    displayName: 'Testnet Gamma (Phase 3)',
    chainId: 7003,
    
    rpcUrl: 'https://rpc-gamma.pyrax.network',
    wsUrl: 'wss://ws-gamma.pyrax.network',
    
    streamA: {
      rpcUrl: 'https://stream-a-gamma.pyrax.network',
      wsUrl: 'wss://ws-a-gamma.pyrax.network',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'https://stream-b-gamma.pyrax.network',
      wsUrl: 'wss://ws-b-gamma.pyrax.network',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'https://stream-c-gamma.pyrax.network',
      wsUrl: 'wss://ws-c-gamma.pyrax.network',
      p2pPort: 30305,
    },
    
    explorerUrl: 'https://explorer-gamma.pyrax.network',
    faucetUrl: 'https://faucet-gamma.pyrax.network',
    apiUrl: 'https://api-gamma.pyrax.network/v1',
    
    crucibleApi: 'https://api-gamma.pyrax.network/v1/crucible',
    foundryApi: 'https://api-gamma.pyrax.network/v1/foundry',
    workerRegistryUrl: 'https://api-gamma.pyrax.network/v1/workers',
    
    stratumUrl: 'stratum+tcp://pool-gamma.pyrax.network:3333',
    
    contracts: {
      jobRegistry: '0x...',
      workerRegistry: '0x...',
      paymentChannel: '0x...',
      staking: '0x...',
    },
    
    isTestnet: true,
    isLocal: false,
    nativeCurrency: {
      name: 'Test PYRAX',
      symbol: 'tPYRX',
      decimals: 18,
    },
  },
  
  mainnet: {
    id: 'mainnet',
    name: 'mainnet',
    displayName: 'PYRAX Mainnet',
    chainId: 7000,
    
    rpcUrl: 'https://rpc.pyrax.network',
    wsUrl: 'wss://ws.pyrax.network',
    
    streamA: {
      rpcUrl: 'https://stream-a.pyrax.network',
      wsUrl: 'wss://ws-a.pyrax.network',
      p2pPort: 30303,
    },
    streamB: {
      rpcUrl: 'https://stream-b.pyrax.network',
      wsUrl: 'wss://ws-b.pyrax.network',
      p2pPort: 30304,
    },
    streamC: {
      rpcUrl: 'https://stream-c.pyrax.network',
      wsUrl: 'wss://ws-c.pyrax.network',
      p2pPort: 30305,
    },
    
    explorerUrl: 'https://explorer.pyrax.network',
    apiUrl: 'https://api.pyrax.network/v1',
    
    crucibleApi: 'https://api.pyrax.network/v1/crucible',
    foundryApi: 'https://api.pyrax.network/v1/foundry',
    workerRegistryUrl: 'https://api.pyrax.network/v1/workers',
    
    stratumUrl: 'stratum+tcp://pool.pyrax.network:3333',
    
    contracts: {
      jobRegistry: '0x...',
      workerRegistry: '0x...',
      paymentChannel: '0x...',
      staking: '0x...',
      governance: '0x...',
    },
    
    isTestnet: false,
    isLocal: false,
    nativeCurrency: {
      name: 'PYRAX',
      symbol: 'PYRX',
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

// Default network
export const DEFAULT_NETWORK: NetworkId = 'testnet-alpha';
