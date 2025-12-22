"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
// ConnectButton removed from navbar - only used on presale page
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import {
  CpuChipIcon,
  DocumentTextIcon,
  MapIcon,
  ScaleIcon,
  BookOpenIcon,
  GlobeAltIcon,
  SparklesIcon,
  FireIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CloudIcon,
  BeakerIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  BanknotesIcon,
  NewspaperIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  PlayCircleIcon,
  ComputerDesktopIcon,
  BugAntIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";

// Mega Menu Data
const megaMenus = {
  network: {
    title: "The PYRAX Network",
    sections: [
      {
        title: "Technology",
        items: [
          {
            name: "Technology Overview",
            description: "Complete technical deep-dive",
            href: "/technology",
            icon: CpuChipIcon,
          },
          {
            name: "TriStream Architecture",
            description: "Three parallel streams as one",
            href: "/technology#tristream",
            icon: CpuChipIcon,
          },
          {
            name: "BlockDAG & GHOSTDAG",
            description: "DAG consensus protocol",
            href: "/technology#ghostdag",
            icon: CodeBracketIcon,
          },
          {
            name: "ZK-STARK Finality",
            description: "Quantum-safe cryptographic proofs",
            href: "/technology#zk",
            icon: ShieldCheckIcon,
          },
          {
            name: "EVM Compatible",
            description: "Deploy Solidity contracts",
            href: "/technology#evm",
            icon: CommandLineIcon,
          },
        ],
      },
      {
        title: "AI & Compute",
        items: [
          {
            name: "Crucible AI",
            description: "Native AI inference layer",
            href: "/crucible",
            icon: SparklesIcon,
            badge: "New",
            badgeColor: "bg-purple-500",
          },
          {
            name: "Foundry ML",
            description: "Decentralized ML training",
            href: "/foundry",
            icon: FireIcon,
            badge: "New",
            badgeColor: "bg-orange-500",
          },
          {
            name: "The Factory",
            description: "AI & ML Control Center",
            href: "/dashboard",
            icon: PlayCircleIcon,
          },
        ],
      },
      {
        title: "Ecosystem",
        items: [
          {
            name: "Explorer",
            description: "Block explorer & analytics",
            href: "https://explorer.pyrax.org",
            icon: GlobeAltIcon,
            external: true,
          },
          {
            name: "Security",
            description: "Audits & bug bounty",
            href: "/security",
            icon: ShieldCheckIcon,
          },
          {
            name: "Governance",
            description: "ETH-style decision making",
            href: "/governance",
            icon: UserGroupIcon,
          },
        ],
      },
      {
        title: "Downloads",
        items: [
          {
            name: "Network Hub",
            description: "All-in-one desktop app",
            href: "/network-hub",
            icon: ComputerDesktopIcon,
            badge: "New",
            badgeColor: "bg-cyan-500",
          },
          {
            name: "Node Binaries",
            description: "Run your own PYRAX node",
            href: "/downloads",
            icon: CloudIcon,
          },
          {
            name: "Mining Software",
            description: "CPU, GPU & ASIC miners",
            href: "/downloads",
            icon: CpuChipIcon,
          },
          {
            name: "Firelink Wallet",
            description: "Browser extension for dApps",
            href: "/firelink",
            icon: WalletIcon,
            badge: "New",
            badgeColor: "bg-orange-500",
          },
        ],
      },
    ],
    featured: {
      title: "Working Tech, Not Promises",
      description: "PYRAX is one of the first L1 blockchains to launch presale with fully functional technology. Our nodes, mining, and AI compute are already built.",
      href: "/technology",
      image: "/brand/pyrax-tech-preview.png",
    },
  },
  developers: {
    title: "Developers",
    sections: [
      {
        title: "Documentation",
        items: [
          {
            name: "Getting Started",
            description: "Quick start guides",
            href: "/docs/getting-started",
            icon: PlayCircleIcon,
          },
          {
            name: "API Reference",
            description: "Complete API documentation",
            href: "/docs/api",
            icon: CodeBracketIcon,
          },
          {
            name: "Smart Contracts",
            description: "Solidity development guide",
            href: "/docs/contracts",
            icon: DocumentTextIcon,
          },
          {
            name: "Crucible SDK",
            description: "AI inference integration",
            href: "/docs/crucible-sdk",
            icon: SparklesIcon,
          },
        ],
      },
      {
        title: "Tools & Resources",
        items: [
          {
            name: "CLI Tools",
            description: "Command line interface",
            href: "/docs/cli",
            icon: CommandLineIcon,
          },
          {
            name: "Node Setup",
            description: "Run your own node",
            href: "/docs/node-setup",
            icon: CloudIcon,
          },
          {
            name: "API Keys",
            description: "Manage API access",
            href: "/dashboard/api-keys",
            icon: BeakerIcon,
          },
          {
            name: "GitHub",
            description: "Open source repositories",
            href: "https://github.com/PYRAX-Chain",
            icon: CodeBracketIcon,
            external: true,
          },
        ],
      },
    ],
    quickLinks: [
      { name: "Full Documentation", href: "/docs", icon: BookOpenIcon },
      { name: "API Status", href: "/status", icon: WrenchScrewdriverIcon },
    ],
  },
  community: {
    title: "Community",
    sections: [
      {
        title: "Learn",
        items: [
          {
            name: "Whitepaper",
            description: "Technical specification",
            href: "/whitepaper",
            icon: DocumentTextIcon,
          },
          {
            name: "Tokenomics",
            description: "PYRAX token economics",
            href: "/tokenomics",
            icon: CurrencyDollarIcon,
          },
          {
            name: "Roadmap",
            description: "Development milestones",
            href: "/roadmap",
            icon: MapIcon,
          },
          {
            name: "FAQ",
            description: "Common questions",
            href: "/faq",
            icon: QuestionMarkCircleIcon,
          },
        ],
      },
      {
        title: "Feedback & Ideas",
        items: [
          {
            name: "Forge Council",
            description: "Public issue tracker",
            href: "/forge-council",
            icon: FireIcon,
          },
          {
            name: "Submit Issue",
            description: "Report a bug or request feature",
            href: "/forge-council/submit",
            icon: BugAntIcon,
          },
        ],
      },
      {
        title: "Connect",
        items: [
          {
            name: "Discord",
            description: "Join our community",
            href: "https://discord.gg/2UQCA9J2x7",
            icon: ChatBubbleLeftRightIcon,
            external: true,
          },
          {
            name: "Twitter/X",
            description: "Latest updates",
            href: "https://twitter.com/pyraxchain",
            icon: UserGroupIcon,
            external: true,
          },
          {
            name: "Telegram",
            description: "Community chat",
            href: "https://t.me/+TcjhrG7DvJg1OTgx",
            icon: ChatBubbleLeftRightIcon,
            external: true,
          },
          {
            name: "Blog",
            description: "News and updates",
            href: "/blog",
            icon: NewspaperIcon,
          },
        ],
      },
    ],
    quickLinks: [
      { name: "Test Program", href: "/test-program", icon: AcademicCapIcon },
      { name: "Bug Bounty", href: "/security#bounty", icon: ShieldCheckIcon },
    ],
  },
};

const directLinks = [
  { href: "/test-program", label: "Test Program", highlight: false },
  { href: "/presale", label: "Presale", highlight: true },
];

// Current active network configuration
const ACTIVE_NETWORK = {
  name: "Forge Testnet",
  shortName: "Forge",
  chainId: 789537,
  chainIdHex: "0xc0c21",
  rpcUrl: "https://forge-rpc.pyrax.org",
  explorerUrl: "https://forge.pyrax.org",
  symbol: "PYRAX",
  decimals: 18,
  color: "orange",
  emoji: "🔥",
};

// Add network to wallet function
const addNetworkToWallet = async () => {
  if (typeof window === "undefined" || !(window as any).ethereum) {
    alert("Please install MetaMask or another ERC-20 compatible wallet to add the network.");
    return;
  }

  try {
    await (window as any).ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: ACTIVE_NETWORK.chainIdHex,
          chainName: `PYRAX ${ACTIVE_NETWORK.name}`,
          nativeCurrency: {
            name: ACTIVE_NETWORK.symbol,
            symbol: ACTIVE_NETWORK.symbol,
            decimals: ACTIVE_NETWORK.decimals,
          },
          rpcUrls: [ACTIVE_NETWORK.rpcUrl],
          blockExplorerUrls: [ACTIVE_NETWORK.explorerUrl],
        },
      ],
    });
  } catch (error: any) {
    if (error.code === 4001) {
      console.log("User rejected the request");
    } else {
      console.error("Failed to add network:", error);
      alert("Failed to add network. Please try again.");
    }
  }
};

export function MegaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [networkModalOpen, setNetworkModalOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <>
    <header className="sticky top-0 z-50 bg-pyrax-darker/98 backdrop-blur-xl border-b border-white/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/brand/pyrax-logo.svg"
              alt="PYRAX"
              width={140}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-1">
            {/* Mega Menu Items */}
            {Object.entries(megaMenus).map(([key, menu]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-x-1 px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  {menu.title}
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${
                      activeMenu === key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mega Menu Panel */}
                {activeMenu === key && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-2"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-[900px] rounded-2xl bg-pyrax-darker/98 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
                      <div className="p-6">
                        <div className="grid grid-cols-4 gap-6">
                          {menu.sections.map((section) => (
                            <div key={section.title}>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                {section.title}
                              </h3>
                              <ul className="space-y-1">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      target={item.external ? "_blank" : undefined}
                                      className="group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 group-hover:bg-pyrax-orange/10 flex items-center justify-center transition-colors">
                                        <item.icon className="h-5 w-5 text-gray-400 group-hover:text-pyrax-orange transition-colors" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                          <span className="text-sm font-medium text-white group-hover:text-pyrax-orange transition-colors">
                                            {item.name}
                                          </span>
                                          {item.badge && (
                                            <span className={`px-1.5 py-0.5 text-[10px] font-bold text-white rounded flex-shrink-0 ${item.badgeColor}`}>
                                              {item.badge}
                                            </span>
                                          )}
                                          {item.external && (
                                            <ChevronRightIcon className="h-3 w-3 text-gray-500" />
                                          )}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                          {item.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Featured Section (only for platform menu) */}
                        {menu.featured && (
                          <div className="mt-6 pt-6 border-t border-white/10">
                            <Link
                              href={menu.featured.href}
                              className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-pyrax-orange/10 to-purple-500/10 hover:from-pyrax-orange/20 hover:to-purple-500/20 transition-colors"
                            >
                              <div className="flex-1">
                                <h4 className="font-semibold text-white group-hover:text-pyrax-orange transition-colors">
                                  {menu.featured.title}
                                </h4>
                                <p className="text-sm text-gray-400 mt-1">
                                  {menu.featured.description}
                                </p>
                              </div>
                              <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-pyrax-orange transition-colors" />
                            </Link>
                          </div>
                        )}

                        {/* Quick Links */}
                        {menu.quickLinks && (
                          <div className="mt-6 pt-6 border-t border-white/10 flex gap-4">
                            {menu.quickLinks.map((link) => (
                              <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors"
                              >
                                <link.icon className="h-4 w-4 text-pyrax-orange" />
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Direct Links */}
            {directLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  link.highlight
                    ? "text-pyrax-orange hover:text-pyrax-amber hover:bg-pyrax-orange/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Network Badge & Configure Wallet */}
          <div className="hidden lg:flex items-center gap-2 relative">
            {/* Animated Network Badge - Clickable */}
            <button
              onClick={() => setNetworkModalOpen(!networkModalOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pyrax-orange/10 border border-pyrax-orange/30 hover:bg-pyrax-orange/20 hover:border-pyrax-orange/50 transition-all cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pyrax-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pyrax-orange"></span>
              </span>
              <span className="text-xs font-semibold text-pyrax-orange">
                {ACTIVE_NETWORK.emoji} {ACTIVE_NETWORK.name}
              </span>
            </button>

            {/* Configure Wallet Button */}
            <button
              onClick={addNetworkToWallet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-pyrax-orange/20 to-pyrax-amber/20 border border-pyrax-orange/30 hover:border-pyrax-orange/50 text-white text-xs font-semibold transition-all hover:scale-105 group"
              title="Configure your wallet for PYRAX Forge Testnet"
            >
              <PlusCircleIcon className="h-4 w-4 text-pyrax-orange group-hover:text-pyrax-amber transition-colors" />
              <span className="hidden xl:inline">Configure my Wallet</span>
            </button>

          </div>

        </div>
      </nav>

      {/* Mobile Menu - Only render when open */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          {/* Backdrop with click to close */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)} 
            aria-hidden="true"
          />
          
          {/* Slide-in Panel */}
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-[#0A0A0B] shadow-2xl shadow-black/50 animate-slide-in-right">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0A0A0B]">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/brand/pyrax-logo.svg"
                  alt="PYRAX"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="h-[calc(100vh-73px)] overflow-y-auto bg-[#0A0A0B]">
              <div className="p-4 space-y-3">
                {/* Menu Sections */}
                {Object.entries(megaMenus).map(([key, menu]) => (
                  <MobileMenuSection key={key} menu={menu} onClose={() => setMobileMenuOpen(false)} />
                ))}

                {/* Direct Links */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {directLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                        link.highlight
                          ? "text-pyrax-dark bg-pyrax-orange hover:bg-pyrax-amber"
                          : "text-white bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile Network Badge & Configure Wallet */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <button
                    onClick={() => { setMobileMenuOpen(false); setTimeout(() => setNetworkModalOpen(true), 100); }}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-pyrax-orange/20 border border-pyrax-orange/40 hover:bg-pyrax-orange/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pyrax-orange opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pyrax-orange"></span>
                      </span>
                      <span className="text-sm font-semibold text-pyrax-orange">
                        {ACTIVE_NETWORK.emoji} {ACTIVE_NETWORK.name}
                      </span>
                    </div>
                    <ChevronRightIcon className="h-4 w-4 text-pyrax-orange" />
                  </button>
                  <button
                    onClick={() => { addNetworkToWallet(); setMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-pyrax-orange to-pyrax-amber text-pyrax-dark font-bold hover:opacity-90 transition-opacity"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    Configure my Wallet
                  </button>
                </div>

                {/* Bottom padding for safe area */}
                <div className="h-8" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>

    {/* Network Config Dropdown - Outside header so it appears below navbar */}
    {networkModalOpen && (
      <>
        <div className="fixed inset-0 z-40" onClick={() => setNetworkModalOpen(false)} />
        <div className="fixed top-20 z-40 w-[340px]" style={{ right: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))' }}>
          <div className="rounded-lg bg-pyrax-darker border border-white/10 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-lg">{ACTIVE_NETWORK.emoji}</span>
                <span className="font-semibold text-white">{ACTIVE_NETWORK.name}</span>
              </div>
              <button
                onClick={() => setNetworkModalOpen(false)}
                className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Network Details */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Chain ID</div>
                  <div className="text-sm font-bold text-white">{ACTIVE_NETWORK.chainId}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Currency</div>
                  <div className="text-sm font-bold text-pyrax-orange">{ACTIVE_NETWORK.symbol}</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">RPC Endpoint</div>
                <code className="text-xs text-pyrax-orange font-mono">{ACTIVE_NETWORK.rpcUrl}</code>
              </div>

              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Explorer</div>
                <a href={ACTIVE_NETWORK.explorerUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-pyrax-orange hover:text-pyrax-amber font-mono transition-colors">
                  {ACTIVE_NETWORK.explorerUrl} ↗
                </a>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify({
                      chainId: ACTIVE_NETWORK.chainIdHex,
                      chainName: `PYRAX ${ACTIVE_NETWORK.name}`,
                      nativeCurrency: { name: ACTIVE_NETWORK.symbol, symbol: ACTIVE_NETWORK.symbol, decimals: ACTIVE_NETWORK.decimals },
                      rpcUrls: [ACTIVE_NETWORK.rpcUrl],
                      blockExplorerUrls: [ACTIVE_NETWORK.explorerUrl]
                    }, null, 2));
                  }}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors"
                >
                  📋 Copy
                </button>
                <button
                  onClick={() => { addNetworkToWallet(); setNetworkModalOpen(false); }}
                  className="flex-1 px-3 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-pyrax-dark text-xs font-bold transition-colors"
                >
                  ⚡ Add to Wallet
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/5">
              <p className="text-[10px] text-gray-500 text-center">
                Testnet only • Tokens have no real value
              </p>
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
}

function MobileMenuSection({
  menu,
  onClose,
}: {
  menu: (typeof megaMenus)["platform"];
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl bg-white/5 overflow-hidden border border-white/10">
      {/* Dropdown Header - Always visible */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-between w-full px-4 py-4 text-base font-semibold text-white bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span>{menu.title}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-pyrax-orange transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expandable Content - Only show when isOpen */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#0F0F10]">
          <div className="p-3 space-y-3">
            {menu.sections.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-semibold text-pyrax-orange uppercase tracking-wider mb-2 px-2">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-200">{item.name}</span>
                      {item.badge && (
                        <span className={`ml-auto px-1.5 py-0.5 text-[10px] font-bold text-white rounded ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MegaNavbar;
