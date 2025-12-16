"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  CpuChipIcon,
  DocumentTextIcon,
  MapIcon,
  ScaleIcon,
  BookOpenIcon,
  GlobeAltIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";

const platformItems = [
  {
    name: "Crucible AI",
    description: "Native AI compute layer - where GPU compute forges intelligence",
    href: "/crucible",
    icon: SparklesIcon,
    highlight: true,
  },
  {
    name: "Technology",
    description: "Explore our tri-stream architecture and consensus mechanisms",
    href: "/technology",
    icon: CpuChipIcon,
  },
  {
    name: "Read our Whitepaper",
    description: "Read the complete technical specification and vision",
    href: "/whitepaper",
    icon: DocumentTextIcon,
  },
  {
    name: "Development Roadmap",
    description: "See our development milestones and future plans",
    href: "/roadmap",
    icon: MapIcon,
  },
  {
    name: "PYRAX Governance",
    description: "Learn how PYRAX is governed by the community",
    href: "/governance",
    icon: ScaleIcon,
  },
];

const callsToAction = [
  { name: "Read Docs", href: "/docs", icon: BookOpenIcon },
  { name: "View Explorer", href: "https://explorer.pyrax.io", icon: GlobeAltIcon },
];

const navLinks = [
  { href: "/tokenomics", label: "Tokenomics" },
  { href: "/security", label: "Security" },
  { href: "/downloads", label: "Downloads" },
  { href: "/presale", label: "Presale" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-pyrax-darker/95 backdrop-blur-lg border-b border-white/5">
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

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <PopoverGroup className="hidden lg:flex lg:items-center lg:gap-x-8">
            <Popover>
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-300 hover:text-white transition-colors outline-none">
                PYRAX Platform
                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-500" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute inset-x-0 top-16 bg-pyrax-darker/98 backdrop-blur-xl border-b border-white/10 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[enter]:ease-out data-[leave]:duration-150 data-[leave]:ease-in"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 top-1/2 bg-pyrax-darker shadow-2xl"
                />
                <div className="relative bg-pyrax-darker">
                  <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                    {platformItems.map((item) => (
                      <div
                        key={item.name}
                        className="group relative rounded-xl p-6 text-sm hover:bg-white/5 transition-colors"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pyrax-orange/10 group-hover:bg-pyrax-orange/20 transition-colors">
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 text-pyrax-orange group-hover:text-pyrax-orange"
                          />
                        </div>
                        <Link href={item.href} className="mt-6 block font-semibold text-white">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-400">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/5">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                      <div className="grid grid-cols-2 divide-x divide-white/10 border-x border-white/10">
                        {callsToAction.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                          >
                            <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-pyrax-orange" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </Popover>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </PopoverGroup>

          <div className="hidden lg:block">
            <ConnectButton
              chainStatus="icon"
              showBalance={false}
              accountStatus="address"
            />
          </div>
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-pyrax-darker p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">PYRAX</span>
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
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base font-semibold text-white hover:bg-white/5">
                    PYRAX Platform
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180 transition-transform" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...platformItems, ...callsToAction].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <ConnectButton
                  chainStatus="icon"
                  showBalance={false}
                  accountStatus="address"
                />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
