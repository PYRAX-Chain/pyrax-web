"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { mainnet, sepolia, type Chain } from "wagmi/chains";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
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

// Use getDefaultConfig - it auto-detects injected wallets including Firelink
// Firelink injects as window.ethereum so it will be detected automatically
const config = getDefaultConfig({
  appName: "PYRAX",
  projectId,
  chains: [pyraxForgeTestnet, pyraxMainnet, mainnet, sepolia],
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
