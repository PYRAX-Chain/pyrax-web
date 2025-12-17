"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
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
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/crucible", icon: Sparkles, label: "Crucible AI" },
  { href: "/dashboard/foundry", icon: Flame, label: "Foundry ML" },
  { href: "/dashboard/history", icon: History, label: "Job History" },
  { href: "/dashboard/api-keys", icon: Key, label: "API Keys" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
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
          <Wallet className="h-16 w-16 text-pyrax-orange mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-gray-400 mb-6">
            Connect your wallet to access the Crucible AI and Foundry ML dashboard.
          </p>
          <ConnectButton />
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
          "fixed top-16 bottom-0 left-0 z-40 w-64 bg-pyrax-darker border-r border-white/10 transform transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
              <div className="w-8 h-8 rounded-full bg-pyrax-orange/20 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-pyrax-orange" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-mono truncate">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <div className="text-xs text-gray-500">Connected</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-pyrax-orange/10 text-pyrax-orange"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Credits Display */}
          <div className="p-4 border-t border-white/10">
            <div className="p-4 rounded-xl bg-gradient-to-r from-pyrax-orange/10 to-purple-500/10 border border-pyrax-orange/20">
              <div className="text-xs text-gray-400 mb-1">Available Credits</div>
              <div className="text-2xl font-bold text-white">0 PYRX</div>
              <Link
                href="/dashboard/billing"
                className="mt-3 block w-full py-2 text-center rounded-lg bg-pyrax-orange/20 text-pyrax-orange text-sm font-medium hover:bg-pyrax-orange/30 transition-colors"
              >
                Add Credits
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-64">
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
