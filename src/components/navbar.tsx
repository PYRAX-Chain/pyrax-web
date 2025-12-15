"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { href: "/technology", label: "Technology" },
  { href: "/tokenomics", label: "Tokenomics" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/governance", label: "Governance" },
  { href: "/security", label: "Security" },
  { href: "/downloads", label: "Downloads" },
  { href: "/press", label: "Press Kit" },
  { href: "/presale", label: "Presale" },
  { href: "/faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-pyrax-darker/80 backdrop-blur-lg border-b border-white/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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

          <div className="hidden lg:flex lg:items-center lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <ConnectButton
              chainStatus="icon"
              showBalance={false}
              accountStatus="address"
            />
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        <div
          className={clsx(
            "lg:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-[500px] pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <ConnectButton
                chainStatus="icon"
                showBalance={false}
                accountStatus="address"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
