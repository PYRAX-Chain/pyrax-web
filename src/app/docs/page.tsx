import { FileText, Github, Book, Code, ExternalLink, Cpu, Pickaxe, Wallet, Shield, Server, Zap, Database, Terminal, ChevronRight, Search, Sparkles, Flame } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "getting-started",
    icon: Zap,
    title: "Getting Started",
    description: "New to PYRAX? Start here to learn the basics.",
    color: "from-green-500/20 to-emerald-600/20",
    borderColor: "border-green-500/30",
    articles: [
      { title: "What is PYRAX?", href: "/docs/getting-started", time: "5 min" },
      { title: "PYRAX vs Other Blockchains", href: "/docs/getting-started/comparison", time: "8 min" },
      { title: "Key Concepts & Terminology", href: "/docs/getting-started/concepts", time: "10 min" },
      { title: "Quick Start Guide", href: "/docs/getting-started/quickstart", time: "15 min" },
    ],
  },
  {
    id: "crucible",
    icon: Sparkles,
    title: "Crucible AI",
    description: "Native AI compute layer - where GPU compute forges intelligence.",
    color: "from-purple-500/20 to-violet-600/20",
    borderColor: "border-purple-500/30",
    highlight: true,
    articles: [
      { title: "What is Crucible?", href: "/docs/crucible", time: "5 min" },
      { title: "How Crucible Works", href: "/docs/crucible/how-it-works", time: "10 min" },
      { title: "Become a GPU Worker", href: "/docs/crucible/workers", time: "15 min" },
      { title: "Supported AI Models", href: "/docs/crucible/models", time: "8 min" },
      { title: "Smart Contract Integration", href: "/docs/crucible/smart-contracts", time: "12 min" },
      { title: "Worker Economics & Staking", href: "/docs/crucible/economics", time: "10 min" },
    ],
  },
  {
    id: "foundry",
    icon: Flame,
    title: "Foundry ML",
    description: "Decentralized ML training - train models on community GPUs.",
    color: "from-orange-500/20 to-red-600/20",
    borderColor: "border-orange-500/30",
    highlight: true,
    articles: [
      { title: "What is Foundry?", href: "/docs/foundry", time: "5 min" },
      { title: "Foundry Overview", href: "/docs/foundry/overview", time: "10 min" },
      { title: "Become a GPU Provider", href: "/docs/foundry/providers", time: "15 min" },
      { title: "Training Jobs", href: "/docs/foundry/training", time: "12 min" },
      { title: "Fine-Tuning (LoRA)", href: "/docs/foundry/fine-tuning", time: "10 min" },
      { title: "Federated Learning", href: "/docs/foundry/federated", time: "12 min" },
    ],
  },
  {
    id: "architecture",
    icon: Cpu,
    title: "Architecture",
    description: "Deep dive into the TriStream ZK-DAG architecture.",
    color: "from-blue-500/20 to-indigo-600/20",
    borderColor: "border-blue-500/30",
    articles: [
      { title: "TriStream Overview", href: "/docs/architecture/tristream", time: "12 min" },
      { title: "Stream A: ASIC Mining", href: "/docs/architecture/stream-a", time: "10 min" },
      { title: "Stream B: CPU/GPU Mining", href: "/docs/architecture/stream-b", time: "10 min" },
      { title: "Stream C: ZK Verification", href: "/docs/architecture/stream-c", time: "15 min" },
      { title: "GHOSTDAG Consensus", href: "/docs/architecture/ghostdag", time: "20 min" },
      { title: "Parallel Execution Engine", href: "/docs/architecture/parallel-execution", time: "12 min" },
    ],
  },
  {
    id: "mining",
    icon: Pickaxe,
    title: "Mining",
    description: "Start mining PYRAX on Stream A or Stream B.",
    color: "from-orange-500/20 to-amber-600/20",
    borderColor: "border-orange-500/30",
    articles: [
      { title: "Mining Overview", href: "/docs/mining/overview", time: "8 min" },
      { title: "Stream A Mining (ASIC)", href: "/docs/mining/stream-a", time: "15 min" },
      { title: "Stream B Mining (CPU/GPU)", href: "/docs/mining/stream-b", time: "15 min" },
      { title: "Mining Pool Setup", href: "/docs/mining/pools", time: "20 min" },
      { title: "Mining Rewards & Economics", href: "/docs/mining/rewards", time: "10 min" },
      { title: "Hardware Requirements", href: "/docs/mining/hardware", time: "8 min" },
    ],
  },
  {
    id: "node-operators",
    icon: Server,
    title: "Node Operators",
    description: "Run and maintain PYRAX network nodes.",
    color: "from-purple-500/20 to-violet-600/20",
    borderColor: "border-purple-500/30",
    articles: [
      { title: "Node Types Overview", href: "/docs/nodes/overview", time: "8 min" },
      { title: "Running a Full Node", href: "/docs/nodes/full-node", time: "20 min" },
      { title: "Running a Relay Node", href: "/docs/nodes/relay-node", time: "15 min" },
      { title: "Node Configuration", href: "/docs/nodes/configuration", time: "12 min" },
      { title: "Syncing & Pruning", href: "/docs/nodes/syncing", time: "10 min" },
      { title: "Monitoring & Metrics", href: "/docs/nodes/monitoring", time: "15 min" },
    ],
  },
  {
    id: "developers",
    icon: Code,
    title: "Developers",
    description: "Build dApps and smart contracts on PYRAX.",
    color: "from-cyan-500/20 to-teal-600/20",
    borderColor: "border-cyan-500/30",
    articles: [
      { title: "Developer Quick Start", href: "/docs/developers/quickstart", time: "15 min" },
      { title: "Smart Contract Development", href: "/docs/developers/smart-contracts", time: "25 min" },
      { title: "Deploying Contracts", href: "/docs/developers/deploying", time: "12 min" },
      { title: "Web3 Integration", href: "/docs/developers/web3", time: "15 min" },
      { title: "Testing & Debugging", href: "/docs/developers/testing", time: "18 min" },
      { title: "Best Practices", href: "/docs/developers/best-practices", time: "12 min" },
    ],
  },
  {
    id: "rpc-api",
    icon: Terminal,
    title: "RPC API",
    description: "JSON-RPC API reference and examples.",
    color: "from-rose-500/20 to-pink-600/20",
    borderColor: "border-rose-500/30",
    articles: [
      { title: "RPC Overview", href: "/docs/rpc", time: "8 min" },
      { title: "Ethereum-Compatible Methods", href: "/docs/rpc/eth-methods", time: "20 min" },
      { title: "PYRAX-Specific Methods", href: "/docs/rpc/pyrax-methods", time: "15 min" },
      { title: "WebSocket Subscriptions", href: "/docs/rpc/websockets", time: "12 min" },
      { title: "Error Codes & Handling", href: "/docs/rpc/errors", time: "8 min" },
    ],
  },
  {
    id: "firelink",
    icon: Wallet,
    title: "Firelink Extension",
    description: "Official PYRAX browser wallet for Chrome.",
    color: "from-orange-500/20 to-amber-600/20",
    borderColor: "border-orange-500/30",
    highlight: true,
    articles: [
      { title: "What is Firelink?", href: "/docs/firelink", time: "5 min" },
      { title: "Installation Guide", href: "/docs/firelink/installation", time: "8 min" },
      { title: "Creating a Wallet", href: "/docs/firelink/create-wallet", time: "10 min" },
      { title: "Importing a Wallet", href: "/docs/firelink/import-wallet", time: "8 min" },
      { title: "Sending & Receiving", href: "/docs/firelink/transactions", time: "10 min" },
      { title: "Connecting to dApps", href: "/docs/firelink/dapps", time: "12 min" },
      { title: "Network Switching", href: "/docs/firelink/networks", time: "5 min" },
      { title: "Security Best Practices", href: "/docs/firelink/security", time: "10 min" },
      { title: "Troubleshooting", href: "/docs/firelink/troubleshooting", time: "8 min" },
    ],
  },
  {
    id: "wallets",
    icon: Wallet,
    title: "Wallets & Transactions",
    description: "Manage PYRAX tokens and transactions.",
    color: "from-yellow-500/20 to-orange-600/20",
    borderColor: "border-yellow-500/30",
    articles: [
      { title: "Supported Wallets", href: "/docs/wallets/supported", time: "5 min" },
      { title: "MetaMask Setup", href: "/docs/wallets/metamask", time: "8 min" },
      { title: "PYRAX Desktop Wallet", href: "/docs/wallets/desktop", time: "10 min" },
      { title: "Transaction Types", href: "/docs/wallets/transactions", time: "12 min" },
      { title: "Gas & Fees (EIP-1559)", href: "/docs/wallets/gas", time: "10 min" },
    ],
  },
  {
    id: "security",
    icon: Shield,
    title: "Security",
    description: "Security practices and vulnerability reporting.",
    color: "from-red-500/20 to-rose-600/20",
    borderColor: "border-red-500/30",
    articles: [
      { title: "Security Model Overview", href: "/docs/security/overview", time: "10 min" },
      { title: "ZK Finality & Checkpoints", href: "/docs/security/zk-finality", time: "15 min" },
      { title: "Attack Mitigations", href: "/docs/security/mitigations", time: "12 min" },
      { title: "Bug Bounty Program", href: "/docs/security/bug-bounty", time: "8 min" },
      { title: "Responsible Disclosure", href: "/docs/security/disclosure", time: "5 min" },
    ],
  },
];

const featuredArticles = [
  { title: "What is PYRAX?", category: "Getting Started", href: "/docs/getting-started", color: "bg-green-500/10" },
  { title: "TriStream Architecture", category: "Architecture", href: "/docs/architecture/tristream", color: "bg-blue-500/10" },
  { title: "Start Mining PYRAX", category: "Mining", href: "/docs/mining/overview", color: "bg-orange-500/10" },
  { title: "RPC API Reference", category: "API", href: "/docs/rpc", color: "bg-rose-500/10" },
];

const repositories = [
  { name: "pyrax-node-a", desc: "Stream A Node (Rust)", href: "https://github.com/PYRAX-Chain/pyrax-node-a" },
  { name: "pyrax-node-b", desc: "Stream B/C Node (Rust)", href: "https://github.com/PYRAX-Chain/pyrax-node-b" },
  { name: "pyrax-desktop", desc: "Desktop App (Tauri)", href: "https://github.com/PYRAX-Chain/pyrax-desktop" },
  { name: "pyrax-explorer", desc: "Block Explorer (Next.js)", href: "https://github.com/PYRAX-Chain/pyrax-explorer" },
  { name: "pyrax-zk-stream", desc: "ZK Prover/Verifier", href: "https://github.com/PYRAX-Chain/pyrax-zk-stream" },
  { name: "pyrax-mining", desc: "Mining Software", href: "https://github.com/PYRAX-Chain/pyrax-mining" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-pyrax-darker">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-pyrax-orange/10 via-transparent to-purple-900/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              PYRAX Documentation
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Everything you need to build, mine, and operate on the PYRAX network.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange/50 focus:ring-1 focus:ring-pyrax-orange/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-lg font-semibold text-gray-400 uppercase tracking-wider mb-6">Popular Articles</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {featuredArticles.map((article) => (
              <Link key={article.href} href={article.href} className={`${article.color} border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors group`}>
                <div className="text-xs text-gray-500 mb-2">{article.category}</div>
                <div className="text-white font-semibold group-hover:text-pyrax-orange transition-colors">{article.title}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((cat) => (
            <div key={cat.id} className={`rounded-2xl border ${cat.borderColor} bg-gradient-to-br ${cat.color} p-6 hover:border-opacity-50 transition-colors`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/10">
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">{cat.title}</h2>
              </div>
              <p className="text-gray-400 text-sm mb-4">{cat.description}</p>
              <div className="space-y-2">
                {cat.articles.slice(0, 4).map((article) => (
                  <Link key={article.href} href={article.href} className="flex items-center justify-between py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <span className="text-gray-300 group-hover:text-white text-sm">{article.title}</span>
                    <span className="text-xs text-gray-500">{article.time}</span>
                  </Link>
                ))}
                {cat.articles.length > 4 && (
                  <Link href={`/docs/${cat.id}`} className="flex items-center gap-1 text-pyrax-orange text-sm pt-2 hover:underline">
                    View all {cat.articles.length} articles <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section: Resources & Repos */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Whitepaper & PIPs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-pyrax-orange/10 to-amber-500/10 border border-pyrax-orange/20">
              <div className="flex items-center gap-3 mb-4">
                <Book className="w-6 h-6 text-pyrax-orange" />
                <h3 className="text-xl font-bold text-white">Whitepaper</h3>
              </div>
              <p className="text-gray-400 mb-4">Read the complete technical specification of the PYRAX TriStream ZK-DAG protocol.</p>
              <Link href="/whitepaper" className="inline-flex items-center gap-2 px-4 py-2 bg-pyrax-orange hover:bg-pyrax-orange/80 text-white rounded-lg transition-colors">
                Read Whitepaper <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-pyrax-orange" />
                <h3 className="text-xl font-bold text-white">PYRAX Improvement Proposals (PIPs)</h3>
              </div>
              <p className="text-gray-400 mb-4">PIPs are the formal mechanism for proposing protocol changes. Review existing proposals or submit your own.</p>
              <div className="flex gap-4">
                <Link href="/docs/pips" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  Browse PIPs
                </Link>
                <Link href="/docs/pips/template" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  PIP Template
                </Link>
              </div>
            </div>
          </div>

          {/* GitHub Repos */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Github className="w-6 h-6 text-white" />
              <h3 className="text-lg font-bold text-white">Source Code</h3>
            </div>
            <div className="space-y-3">
              {repositories.map((repo) => (
                <a key={repo.name} href={repo.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors group">
                  <div>
                    <div className="text-white text-sm font-medium group-hover:text-pyrax-orange">{repo.name}</div>
                    <div className="text-xs text-gray-500">{repo.desc}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white" />
                </a>
              ))}
            </div>
            <a href="https://github.com/orgs/PYRAX-Chain" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-pyrax-orange text-sm pt-4 hover:underline">
              View all repositories <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
