import { FileText, Github, Book, Code, ExternalLink } from "lucide-react";
import Link from "next/link";

const docSections = [
  {
    icon: Book,
    title: "Whitepaper",
    description: "Technical specification of the TriStream ZK-DAG protocol.",
    links: [
      { label: "Read Whitepaper", href: "/docs/whitepaper", external: false },
    ],
  },
  {
    icon: FileText,
    title: "Protocol Specifications",
    description: "Detailed specs for consensus, execution, and streams.",
    links: [
      { label: "GHOSTDAG Consensus", href: "/docs/ghostdag", external: false },
      { label: "TriStream Architecture", href: "/docs/tristream", external: false },
      { label: "Stream C (ZK Proofs)", href: "/docs/zk-stream", external: false },
    ],
  },
  {
    icon: Code,
    title: "Developer Guides",
    description: "Guides for building on PYRAX.",
    links: [
      { label: "Getting Started", href: "/docs/getting-started", external: false },
      { label: "RPC API Reference", href: "/docs/rpc", external: false },
      { label: "Running a Node", href: "/docs/node-setup", external: false },
    ],
  },
  {
    icon: Github,
    title: "Source Code",
    description: "Open source repositories.",
    links: [
      { label: "pyrax-node-a (Stream A)", href: "https://github.com/PYRAX-Chain/pyrax-node-a", external: true },
      { label: "pyrax-node-b (Stream B)", href: "https://github.com/PYRAX-Chain/pyrax-node-b", external: true },
      { label: "pyrax-explorer", href: "https://github.com/PYRAX-Chain/pyrax-explorer", external: true },
    ],
  },
];

const quickLinks = [
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "Governance", href: "/governance" },
  { label: "Security Policy", href: "/security" },
  { label: "Roadmap", href: "/roadmap" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Documentation
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Technical documentation, specifications, and developer resources for
            the PYRAX blockchain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {docSections.map((section) => (
            <div
              key={section.title}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-pyrax-orange/10">
                  <section.icon className="h-6 w-6 text-pyrax-orange" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-400 mb-4">{section.description}</p>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber transition-colors"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-4 w-4" />}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-8 rounded-xl bg-gradient-to-b from-pyrax-orange/10 to-transparent border border-pyrax-orange/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              PYRAX Improvement Proposals (PIPs)
            </h2>
            <p className="text-gray-400 mb-6">
              PIPs are the formal mechanism for proposing changes to the PYRAX
              protocol. They document design decisions and provide a structured
              process for protocol evolution.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 bg-pyrax-orange hover:bg-pyrax-amber text-white rounded-lg transition-colors"
              >
                <FileText className="h-4 w-4" />
                Browse PIPs
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                PIP Template
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 rounded-xl bg-white/5 border border-white/10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Documentation In Progress
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We are actively developing comprehensive documentation. As the
              project progresses through testnet phases, detailed guides and API
              references will be published here.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="https://github.com/orgs/PYRAX-Chain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pyrax-orange hover:text-pyrax-amber"
              >
                <Github className="h-5 w-5" />
                Follow on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
