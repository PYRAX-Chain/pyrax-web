import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";

const footerLinks = {
  protocol: [
    { href: "/technology", label: "Technology" },
    { href: "/tokenomics", label: "Tokenomics" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/governance", label: "Governance" },
  ],
  resources: [
    { href: "/docs", label: "Documentation" },
    { href: "/faq", label: "FAQ" },
    { href: "/status", label: "Status" },
    { href: "https://github.com/orgs/PYRAX-Chain", label: "GitHub", external: true },
  ],
  legal: [
    { href: "/security", label: "Security" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-pyrax-dark border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 group">
              <Image 
                src="/brand/pyrax-logo.svg" 
                alt="PYRAX" 
                width={120} 
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              A Layer 1 blockchain with TriStream ZK-DAG architecture. Dual
              mining streams, EVM compatible, ZK-proven finality.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://twitter.com/pyrax"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/orgs/PYRAX-Chain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Protocol</h3>
            <ul className="space-y-2">
              {footerLinks.protocol.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} PYRAX LLC. All rights reserved.
              </p>
              <p className="text-xs text-gray-500">
                PYRAX™ is a pending trademark of PYRAX LLC.
              </p>
            </div>
            <p className="text-xs text-gray-500 text-center">
              <strong>Legal Disclaimer:</strong> This website and its content do not constitute financial, legal, or investment advice. 
              Cryptocurrency investments are volatile and may result in loss of funds. Always conduct your own research before participating 
              in any blockchain network or cryptocurrency activity. PYRAX LLC. is not responsible for any losses incurred.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
