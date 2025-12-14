import { Code, Copy } from "lucide-react";

const rpcMethods = [
  {
    category: "Ethereum Compatible",
    methods: [
      { name: "eth_chainId", desc: "Returns the chain ID (78912 / 0x13440)", params: "none" },
      { name: "eth_blockNumber", desc: "Returns current block height", params: "none" },
      { name: "eth_getBalance", desc: "Returns account balance in wei", params: "[address, block]" },
      { name: "eth_getBlockByNumber", desc: "Returns block by number", params: "[number, includeTxs]" },
      { name: "eth_getBlockByHash", desc: "Returns block by hash", params: "[hash, includeTxs]" },
      { name: "eth_gasPrice", desc: "Returns current gas price", params: "none" },
      { name: "eth_getTransactionCount", desc: "Returns account nonce", params: "[address, block]" },
      { name: "net_version", desc: "Returns network ID", params: "none" },
      { name: "net_peerCount", desc: "Returns connected peer count", params: "none" },
    ],
  },
  {
    category: "PYRAX Extensions",
    methods: [
      { name: "pyrax_streamStats", desc: "Returns Stream A/B block counts and hashrates", params: "none" },
      { name: "pyrax_dagInfo", desc: "Returns DAG statistics (tips, blue/red blocks)", params: "none" },
      { name: "pyrax_getMiningInfo", desc: "Returns mining difficulty and target", params: "none" },
      { name: "pyrax_getBlockTemplate", desc: "Returns block template for mining", params: "[stream]" },
      { name: "pyrax_submitBlock", desc: "Submits a mined block", params: "[blockData]" },
      { name: "pyrax_getRecentBlocks", desc: "Returns recent blocks from DAG", params: "[count]" },
      { name: "pyrax_faucet", desc: "Mints testnet tokens (testnet only)", params: "[address, amount]" },
    ],
  },
];

export default function RpcDocsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">RPC API Reference</h1>
          <p className="text-gray-400">
            PYRAX nodes expose a JSON-RPC API compatible with Ethereum tooling, plus custom extensions for DAG and stream functionality.
          </p>
        </div>

        <div className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Connection</h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-400">Forgefire Testnet RPC:</span>
              <code className="ml-2 px-2 py-1 bg-white/10 rounded text-pyrax-orange">http://localhost:8545</code>
            </div>
            <div>
              <span className="text-gray-400">Chain ID:</span>
              <code className="ml-2 px-2 py-1 bg-white/10 rounded text-pyrax-orange">78912 (0x13440)</code>
            </div>
            <div>
              <span className="text-gray-400">Currency Symbol:</span>
              <code className="ml-2 px-2 py-1 bg-white/10 rounded text-pyrax-orange">PYRX</code>
            </div>
          </div>
        </div>

        {rpcMethods.map((category) => (
          <div key={category.category} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{category.category}</h2>
            <div className="space-y-3">
              {category.methods.map((method) => (
                <div key={method.name} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-pyrax-orange font-mono">{method.name}</code>
                    <span className="text-xs text-gray-500">params: {method.params}</span>
                  </div>
                  <p className="text-sm text-gray-400">{method.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Example Request</h2>
          <pre className="p-4 bg-black/50 rounded-lg overflow-x-auto text-sm">
            <code className="text-gray-300">{`curl -X POST http://localhost:8545 \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "pyrax_streamStats",
    "params": []
  }'`}</code>
          </pre>
          <h3 className="text-sm font-semibold text-white mt-4 mb-2">Response</h3>
          <pre className="p-4 bg-black/50 rounded-lg overflow-x-auto text-sm">
            <code className="text-gray-300">{`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "streamABlocks": 150,
    "streamBBlocks": 200,
    "streamAHashrate": "30000.00 KH/s",
    "streamBHashrate": "3333.33 H/s"
  }
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
