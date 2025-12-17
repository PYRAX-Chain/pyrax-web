"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Rocket, Clock, ArrowRight } from "lucide-react";
import { TestnetConfig, getUpcomingNetwork, getDaysUntilLaunch } from "@/lib/testnet-config";

export function TestnetUpgradeBanner() {
  const [config, setConfig] = useState<TestnetConfig | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user dismissed the banner in this session
    const isDismissed = sessionStorage.getItem("testnet-banner-dismissed");
    if (isDismissed) {
      setDismissed(true);
      setLoading(false);
      return;
    }

    // Fetch testnet config
    fetch("/api/admin/testnet/config")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("testnet-banner-dismissed", "true");
  };

  if (loading || dismissed || !config) return null;

  const upcomingNetwork = getUpcomingNetwork(config);
  if (!upcomingNetwork || !upcomingNetwork.announcementDate) return null;

  const daysUntilLaunch = getDaysUntilLaunch(upcomingNetwork);
  if (daysUntilLaunch === null || daysUntilLaunch < 0) return null;

  const launchDate = new Date(upcomingNetwork.launchDate!);
  const formattedDate = launchDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-pyrax-orange to-amber-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Rocket className="h-4 w-4 animate-bounce" />
            <span className="font-bold">Network Upgrade:</span>
          </div>
          
          <span>
            <strong>{upcomingNetwork.name}</strong> testnet launching {formattedDate}
          </span>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20">
            <Clock className="h-3 w-3" />
            <span className="font-bold">
              {daysUntilLaunch === 0 ? "TODAY!" : daysUntilLaunch === 1 ? "1 day" : `${daysUntilLaunch} days`}
            </span>
          </div>

          <Link
            href="/roadmap"
            className="flex items-center gap-1 underline hover:no-underline font-medium"
          >
            Learn more <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
