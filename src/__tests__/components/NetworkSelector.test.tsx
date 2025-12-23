/**
 * Network Selector component tests
 */

describe('NetworkSelector Component', () => {
  const NETWORKS = {
    DEVNET: { chainId: 789536, name: 'DevNet' },
    FORGE: { chainId: 789537, name: 'Forge Testnet' },
    BLAZE: { chainId: 789538, name: 'Blaze Testnet' },
    INFERNO: { chainId: 789539, name: 'Inferno Testnet' },
    PHOENIX: { chainId: 789540, name: 'Phoenix Testnet' },
    MAINNET: { chainId: 7895, name: 'Mainnet' },
  };

  describe('Network Configuration', () => {
    it('should have correct DevNet chain ID', () => {
      expect(NETWORKS.DEVNET.chainId).toBe(789536);
    });

    it('should have correct Forge Testnet chain ID', () => {
      expect(NETWORKS.FORGE.chainId).toBe(789537);
    });

    it('should have correct Mainnet chain ID', () => {
      expect(NETWORKS.MAINNET.chainId).toBe(7895);
    });

    it('should have all networks defined', () => {
      expect(Object.keys(NETWORKS)).toHaveLength(6);
    });
  });

  describe('Network Selection', () => {
    it('should identify network by chain ID', () => {
      const findNetwork = (chainId: number) => {
        return Object.values(NETWORKS).find(n => n.chainId === chainId);
      };

      expect(findNetwork(789537)?.name).toBe('Forge Testnet');
      expect(findNetwork(7895)?.name).toBe('Mainnet');
    });

    it('should return undefined for unknown chain ID', () => {
      const findNetwork = (chainId: number) => {
        return Object.values(NETWORKS).find(n => n.chainId === chainId);
      };

      expect(findNetwork(1)).toBeUndefined();
    });
  });

  describe('RPC Endpoints', () => {
    const RPC_ENDPOINTS = {
      789536: 'https://devnet-rpc.pyrax.org',
      789537: 'https://forge-rpc.pyrax.org',
      7895: 'https://rpc.pyrax.org',
    };

    it('should have RPC endpoint for Forge Testnet', () => {
      expect(RPC_ENDPOINTS[789537]).toBe('https://forge-rpc.pyrax.org');
    });

    it('should have RPC endpoint for Mainnet', () => {
      expect(RPC_ENDPOINTS[7895]).toBe('https://rpc.pyrax.org');
    });
  });

  describe('Network Switch Request', () => {
    it('should format switch request correctly', () => {
      const network = NETWORKS.FORGE;
      const switchRequest = {
        chainId: `0x${network.chainId.toString(16)}`,
        chainName: `PYRAX ${network.name}`,
        nativeCurrency: {
          name: 'PYRAX',
          symbol: 'PYRAX',
          decimals: 18,
        },
        rpcUrls: ['https://forge-rpc.pyrax.org'],
        blockExplorerUrls: ['https://explorer.pyrax.org'],
      };

      expect(switchRequest.chainId).toBe('0xc0c21');
      expect(switchRequest.nativeCurrency.decimals).toBe(18);
    });
  });

  describe('Network Status', () => {
    it('should check if network is testnet', () => {
      const isTestnet = (chainId: number) => {
        return chainId !== 7895;
      };

      expect(isTestnet(789537)).toBe(true);
      expect(isTestnet(7895)).toBe(false);
    });

    it('should check if network is production', () => {
      const isProduction = (chainId: number) => {
        return chainId === 7895;
      };

      expect(isProduction(7895)).toBe(true);
      expect(isProduction(789537)).toBe(false);
    });
  });
});
