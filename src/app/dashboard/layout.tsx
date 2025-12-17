"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import {
  LayoutDashboard,
  Sparkles,
  Flame,
  History,
  Key,
  Settings,
  CreditCard,
  Menu,
  X,
  Wallet,
  Factory,
  Server,
  Cpu,
  Activity,
  Database,
  Boxes,
  Zap,
  Shield,
  ChevronDown,
  Bell,
  HelpCircle,
} from "lucide-react";
import clsx from "clsx";

const navSections = [
  {
    title: "Overview",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/dashboard/activity", icon: Activity, label: "Activity Feed" },
    ],
  },
  {
    title: "AI Inference",
    items: [
      { href: "/dashboard/crucible", icon: Sparkles, label: "Crucible AI" },
      { href: "/dashboard/models", icon: Database, label: "Model Registry" },
    ],
  },
  {
    title: "ML Training",
    items: [
      { href: "/dashboard/foundry", icon: Flame, label: "Foundry ML" },
      { href: "/dashboard/jobs", icon: Boxes, label: "Training Jobs" },
    ],
  },
  {
    title: "Network",
    items: [
      { href: "/dashboard/workers", icon: Server, label: "GPU Workers" },
      { href: "/dashboard/compute", icon: Cpu, label: "Compute Pool" },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/dashboard/api-keys", icon: Key, label: "API Keys" },
      { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
      { href: "/dashboard/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { isConnected, address } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pyrax-dark">
        <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pyrax-orange/20 to-purple-500/20 flex items-center justify-center mx-auto mb-6">
            <Factory className="h-10 w-10 text-pyrax-orange" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">The Factory</h1>
          <p className="text-gray-400 mb-6">
            Connect your wallet to access the PYRAX AI & ML Dashboard
          </p>
          <ConnectButton />
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-purple-400" />
                Crucible AI
              </div>
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-400" />
                Foundry ML
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pyrax-dark">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/10 text-white"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-16 bottom-0 left-0 z-40 w-72 bg-pyrax-darker border-r border-white/10 transform transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header - The Factory Branding */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pyrax-orange to-red-500 flex items-center justify-center">
                <Factory className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">The Factory</div>
                <div className="text-xs text-gray-500">AI & ML Dashboard</div>
              </div>
            </div>
            
            {/* Connected Wallet */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-mono truncate">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <div className="text-xs text-green-400">Connected to PYRAX</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            {navSections.map((section) => (
              <div key={section.title} className="mb-6">
                <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href || 
                      (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                          isActive
                            ? "bg-pyrax-orange/10 text-pyrax-orange border-l-2 border-pyrax-orange"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Network Status & Credits */}
          <div className="p-4 border-t border-white/10 space-y-3">
            {/* Network Status */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-400">Network</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm text-green-400">Online</span>
              </div>
            </div>

            {/* Credits Display */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-pyrax-orange/10 to-purple-500/10 border border-pyrax-orange/20">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-400">Available Credits</div>
                <Zap className="h-4 w-4 text-pyrax-orange" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">0 PYRX</div>
              <div className="text-xs text-gray-500 mb-3">≈ $0.00 USD</div>
              <Link
                href="/dashboard/billing"
                className="block w-full py-2 text-center rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white text-sm font-medium transition-colors"
              >
                Add Credits
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="p-6 lg:p-8">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
