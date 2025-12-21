"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http, createConfig } from "wagmi";
import { mainnet, sepolia, type Chain } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";

// PYRAX Network Chains
const pyraxForgeTestnet: Chain = {
  id: 789121,
  name: "PYRAX Forge Testnet",
  nativeCurrency: {
    name: "PYRAX",
    symbol: "PYRAX",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://forge-rpc.pyrax.org"] },
  },
  blockExplorers: {
    default: { name: "PYRAX Explorer", url: "https://forge.pyrax.org" },
  },
  testnet: true,
};

const pyraxMainnet: Chain = {
  id: 789100,
  name: "PYRAX Mainnet",
  nativeCurrency: {
    name: "PYRAX",
    symbol: "PYRAX",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.pyrax.org"] },
  },
  blockExplorers: {
    default: { name: "PYRAX Explorer", url: "https://explorer.pyrax.org" },
  },
  testnet: false,
};

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo";
const chains: readonly [Chain, ...Chain[]] = [pyraxForgeTestnet, pyraxMainnet, mainnet, sepolia];

// Configure wallets - shows modal with options instead of auto-connecting
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet], // This will show Firelink if installed
    },
    {
      groupName: "Other Wallets", 
      wallets: [metaMaskWallet, walletConnectWallet],
    },
  ],
  {
    appName: "PYRAX",
    projectId,
  }
);

// Create wagmi config with custom connectors
const config = createConfig({
  connectors,
  chains,
  transports: {
    [pyraxForgeTestnet.id]: http("https://forge-rpc.pyrax.org"),
    [pyraxMainnet.id]: http("https://rpc.pyrax.org"),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#F68724",
            accentColorForeground: "#0A0A0B",
            borderRadius: "medium",
          })}
          initialChain={pyraxForgeTestnet}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
