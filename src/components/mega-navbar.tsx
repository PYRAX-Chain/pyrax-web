"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
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
            name: "GPU Dashboard",
            description: "Manage AI & ML jobs",
            href: "/dashboard",
            icon: PlayCircleIcon,
          },
        ],
      },
      {
        title: "Ecosystem",
        items: [
          {
            name: "PYSWAP DEX",
            description: "Decentralized exchange",
            href: "/dex",
            icon: BanknotesIcon,
          },
          {
            name: "Explorer",
            description: "Block explorer & analytics",
            href: "https://explorer.pyrax.org",
            icon: GlobeAltIcon,
            external: true,
          },
          {
            name: "Downloads",
            description: "Desktop app, nodes, miners",
            href: "/downloads",
            icon: CloudIcon,
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
    ],
    featured: {
      title: "Working Tech, Not Promises",
      description: "PYRAX is one of the first L1 blockchains to launch presale with fully functional technology. Our nodes, mining, and AI compute are already built.",
      href: "/technology",
      image: "/brand/pyrax-tech-preview.png",
    },
  },
  xferno: {
    title: "XFERNO",
    sections: [
      {
        title: "Launchpad",
        items: [
          {
            name: "XFERNO Launchpad",
            description: "Professional project tokenization platform",
            href: "/launchpad",
            icon: RocketLaunchIcon,
            badge: "New",
            badgeColor: "bg-orange-500",
          },
          {
            name: "Launch a Project",
            description: "Tokenize and launch your project",
            href: "/launchpad/create",
            icon: SparklesIcon,
          },
          {
            name: "Active Projects",
            description: "Browse live token launches",
            href: "/launchpad/projects",
            icon: FireIcon,
          },
        ],
      },
      {
        title: "For Projects",
        items: [
          {
            name: "How It Works",
            description: "Launch process & requirements",
            href: "/launchpad/how-it-works",
            icon: PlayCircleIcon,
          },
          {
            name: "Pricing & Fees",
            description: "Transparent fee structure",
            href: "/launchpad/pricing",
            icon: BanknotesIcon,
          },
          {
            name: "Apply to Launch",
            description: "Submit your project",
            href: "/launchpad/apply",
            icon: DocumentTextIcon,
          },
        ],
      },
      {
        title: "For Investors",
        items: [
          {
            name: "Upcoming Launches",
            description: "Projects launching soon",
            href: "/launchpad/upcoming",
            icon: RocketLaunchIcon,
          },
          {
            name: "Graduated Projects",
            description: "Successfully launched tokens",
            href: "/launchpad/graduated",
            icon: AcademicCapIcon,
          },
          {
            name: "XF Token",
            description: "XFERNO utility token",
            href: "/tokenomics#xf",
            icon: CurrencyDollarIcon,
          },
        ],
      },
    ],
    quickLinks: [
      { name: "Launch Now", href: "/launchpad/create", icon: RocketLaunchIcon },
      { name: "Documentation", href: "/docs/launchpad", icon: BookOpenIcon },
    ],
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
            description: "PYRX & XF token economics",
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
        title: "Connect",
        items: [
          {
            name: "Discord",
            description: "Join our community",
            href: "https://discord.gg/pyrax",
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
            href: "https://t.me/pyraxchain",
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
      { name: "Testnet Program", href: "/testnet", icon: AcademicCapIcon },
      { name: "Bug Bounty", href: "/security#bounty", icon: ShieldCheckIcon },
    ],
  },
};

const directLinks = [
  { href: "/presale", label: "Presale", highlight: true },
];

export function MegaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
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
                    <div className="w-[800px] rounded-2xl bg-pyrax-darker/98 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
                      <div className="p-6">
                        <div className="grid grid-cols-3 gap-6">
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
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium text-white group-hover:text-pyrax-orange transition-colors">
                                            {item.name}
                                          </span>
                                          {item.badge && (
                                            <span className={`px-1.5 py-0.5 text-[10px] font-bold text-white rounded ${item.badgeColor}`}>
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

          {/* Connect Button */}
          <div className="hidden lg:block">
            <ConnectButton
              chainStatus="icon"
              showBalance={false}
              accountStatus="address"
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-pyrax-darker overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
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
                className="p-2 text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {Object.entries(megaMenus).map(([key, menu]) => (
                <MobileMenuSection key={key} menu={menu} onClose={() => setMobileMenuOpen(false)} />
              ))}

              <div className="pt-4 border-t border-white/10 space-y-2">
                {directLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-semibold ${
                      link.highlight
                        ? "text-pyrax-orange bg-pyrax-orange/10"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                <ConnectButton
                  chainStatus="icon"
                  showBalance={false}
                  accountStatus="address"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
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
    <div className="border-b border-white/10 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-white"
      >
        {menu.title}
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 space-y-4 px-4">
          {menu.sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5"
                  >
                    <item.icon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-300">{item.name}</span>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 text-[10px] font-bold text-white rounded ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MegaNavbar;
