import { Terminal, Wallet, Droplets, Search } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "1. Set Up MetaMask",
    content: `Add the PYRAX Forgefire Testnet to MetaMask:
    
• Network Name: PYRAX Forgefire
• RPC URL: https://rpc.pyrax.org
• Chain ID: 78912
• Currency Symbol: PYRX
• Block Explorer: https://explorer.pyrax.org`,
  },
  {
    icon: Droplets,
    title: "2. Get Testnet Tokens",
    content: `Visit the faucet to receive testnet PYRX:

• Faucet URL: https://faucet.pyrax.org
• Limits: 100 PYRX per request, 300 PYRX per day
• Paste your wallet address and click "Request PYRX"`,
  },
  {
    icon: Search,
    title: "3. Explore the Network",
    content: `Use the block explorer to view activity:

• Explorer: https://explorer.pyrax.org
• Search for addresses, blocks, and transactions
• View real-time block production from both streams`,
  },
  {
    icon: Terminal,
    title: "4. Run Your Own Node (Optional)",
    content: `Clone and build a PYRAX node:

git clone https://github.com/PYRAX-Chain/pyrax-node-a
cd pyrax-node-a
cargo build --release
./target/release/pyrax-node-a --config config.toml --dev`,
  },
];

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Getting Started</h1>
          <p className="text-gray-400">
            Get started with PYRAX testnet in minutes. Connect your wallet, get testnet tokens, and start exploring.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.title} className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-pyrax-orange/10">
                  <step.icon className="h-6 w-6 text-pyrax-orange" />
                </div>
                <h2 className="text-xl font-semibold text-white">{step.title}</h2>
              </div>
              <pre className="whitespace-pre-wrap text-gray-400 text-sm font-mono">
                {step.content}
              </pre>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-gradient-to-b from-pyrax-orange/10 to-transparent border border-pyrax-orange/20">
          <h2 className="text-xl font-semibold text-white mb-4">Need Help?</h2>
          <p className="text-gray-400 mb-4">
            Join our community for support and updates:
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://twitter.com/pyrax" className="text-pyrax-orange hover:text-pyrax-amber">
              Twitter
            </a>
            <a href="https://github.com/orgs/PYRAX-Chain" className="text-pyrax-orange hover:text-pyrax-amber">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
