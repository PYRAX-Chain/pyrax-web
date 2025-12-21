"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia, type Chain } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
  Wallet,
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

// Custom Firelink wallet definition for RainbowKit
const firelinkWallet = (): Wallet => ({
  id: "pyrax-firelink",
  name: "PYRAX Firelink",
  iconUrl: "https://pyrax.org/firelink-icon.png",
  iconBackground: "#F68724",
  downloadUrls: {
    chrome: "https://pyrax.org/firelink",
    browserExtension: "https://pyrax.org/firelink",
  },
  createConnector: (walletDetails) => {
    const connector = injected({
      target: () => ({
        id: "pyrax-firelink",
        name: "PYRAX Firelink",
        provider: typeof window !== "undefined" ? (window as any).pyrax || (window as any).ethereum : undefined,
      }),
    });
    return {
      connector,
      mobile: undefined,
      qrCode: undefined,
      extension: {
        instructions: {
          learnMoreUrl: "https://pyrax.org/firelink",
          steps: [
            {
              description: "Download the PYRAX Firelink extension from pyrax.org/firelink",
              step: "install",
              title: "Install Firelink",
            },
            {
              description: "Create or import a wallet using your recovery phrase",
              step: "create",
              title: "Create Wallet",
            },
            {
              description: "Refresh this page and click Connect to link your wallet",
              step: "refresh",
              title: "Refresh & Connect",
            },
          ],
        },
      },
    };
  },
});

// MetaMask wallet for fallback
const metaMaskWallet = (): Wallet => ({
  id: "metamask",
  name: "MetaMask",
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  iconBackground: "#ffffff",
  downloadUrls: {
    chrome: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
    browserExtension: "https://metamask.io/download/",
  },
  createConnector: () => ({
    connector: injected({ target: "metaMask" }),
    mobile: undefined,
    qrCode: undefined,
  }),
});

// Configure wallets with Firelink FIRST
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [firelinkWallet],
    },
    {
      groupName: "Other Wallets",
      wallets: [metaMaskWallet],
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
  chains: [pyraxForgeTestnet, pyraxMainnet, mainnet, sepolia],
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
