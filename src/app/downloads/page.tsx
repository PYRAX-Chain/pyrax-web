"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, Apple, Download, ExternalLink } from "lucide-react";

const SPACES_BASE = "https://pyrax-assets.nyc3.cdn.digitaloceanspaces.com";

const platforms = [
  {
    id: "windows",
    name: "Windows",
    icon: Monitor,
    downloads: [
      {
        name: "PYRAX Network Hub (Installer)",
        file: "PYRAX-Network-Hub-1.2.0-x64-setup.exe",
        path: "/releases/network-hub",
        size: "~80 MB",
        description: "Run blockchain nodes, mine PYRAX, and manage your network participation.",
      },
    ],
  },
  {
    id: "macos",
    name: "macOS",
    icon: Apple,
    downloads: [
      {
        name: "PYRAX Network Hub (DMG)",
        file: "PYRAX-Network-Hub-1.2.0.dmg",
        path: "/releases/network-hub",
        size: "~85 MB",
        description: "Coming soon - macOS version in development.",
        disabled: true,
      },
    ],
  },
  {
    id: "linux",
    name: "Linux",
    icon: Monitor,
    downloads: [
      {
        name: "PYRAX Network Hub (AppImage)",
        file: "PYRAX-Network-Hub-1.2.0.AppImage",
        path: "/releases/network-hub",
        size: "~90 MB",
        description: "Coming soon - Linux version in development.",
        disabled: true,
      },
    ],
  },
];

export default function DownloadsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("windows");

  const currentPlatform = platforms.find((p) => p.id === selectedPlatform);

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-4">Downloads</h1>
        <p className="text-gray-400 mb-8">
          Download the PYRAX Desktop application for your platform.
        </p>

        {/* Platform Selector */}
        <div className="flex gap-4 mb-8">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedPlatform === platform.id
                    ? "bg-[#F68724] text-black"
                    : "bg-[#1A1A1C] text-gray-300 hover:bg-[#2A2A2C]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {platform.name}
              </button>
            );
          })}
        </div>

        {/* Downloads List */}
        <div className="space-y-4">
          {currentPlatform?.downloads.map((download) => (
            <div
              key={download.file}
              className="bg-[#1A1A1C] rounded-xl p-6 flex items-center justify-between"
            >
              <div>
                <h3 className="text-white font-semibold text-lg">{download.name}</h3>
                <p className="text-gray-500 text-sm">
                  {download.file} • {download.size}
                </p>
              </div>
              {download.disabled ? (
                <span className="flex items-center gap-2 bg-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
                  Coming Soon
                </span>
              ) : (
                <a
                  href={`${SPACES_BASE}${download.path}/${download.file}`}
                  className="flex items-center gap-2 bg-[#F68724] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#E5771A] transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Chrome Extension */}
        <div className="mt-12 bg-gradient-to-r from-[#1A1A1C] to-[#2A2A2C] rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">PYRAX Firelink Wallet</h2>
          <p className="text-gray-400 mb-4">
            Browser extension wallet for Chrome. Connect to dApps, send & receive PYRAX.
          </p>
          <Link
            href="/firelink"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Get Firelink
          </Link>
        </div>
      </div>
    </div>
  );
}
