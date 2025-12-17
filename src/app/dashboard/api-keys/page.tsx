"use client";

import { useState } from "react";
import {
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Terminal,
  Code,
  Globe,
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string | null;
  permissions: string[];
}

// Demo data - will be fetched from API
const demoKeys: ApiKey[] = [];

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(demoKeys);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>(["crucible", "foundry"]);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  const handleCreateKey = () => {
    // In production, this would call the API
    const newKey = {
      id: `key_${Date.now()}`,
      name: newKeyName || "Unnamed Key",
      prefix: `pyrax_${Math.random().toString(36).substring(2, 10)}`,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      permissions: newKeyPermissions,
    };
    setKeys([...keys, newKey]);
    setCreatedKey(`pyrax_${Math.random().toString(36).substring(2, 40)}`);
    setNewKeyName("");
    setShowCreateModal(false);
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <p className="text-gray-400">
            Manage API keys for programmatic access to Crucible and Foundry
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create API Key
        </button>
      </div>

      {/* New Key Created Alert */}
      {createdKey && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-400">API Key Created</h3>
              <p className="text-sm text-gray-400 mt-1">
                Make sure to copy your API key now. You won&apos;t be able to see it again!
              </p>
              <div className="mt-3 flex items-center gap-2">
                <code className="flex-1 px-3 py-2 rounded bg-black/30 text-green-400 font-mono text-sm">
                  {createdKey}
                </code>
                <button
                  onClick={() => copyToClipboard(createdKey)}
                  className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => setCreatedKey(null)}
                className="mt-3 text-sm text-gray-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Keys List */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Your API Keys</h2>

        {keys.length > 0 ? (
          <div className="space-y-3">
            {keys.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pyrax-orange/10 flex items-center justify-center">
                    <Key className="h-5 w-5 text-pyrax-orange" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{key.name}</div>
                    <div className="text-sm text-gray-400 font-mono">
                      {key.prefix}...
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Created</div>
                    <div className="text-sm text-gray-400">
                      {new Date(key.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {key.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="px-2 py-1 rounded text-xs bg-white/10 text-gray-300"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleDeleteKey(key.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Key className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No API keys yet</p>
            <p className="text-sm text-gray-600 mt-1">
              Create an API key to start using the PYRAX API
            </p>
          </div>
        )}
      </div>

      {/* API Documentation Quick Reference */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="h-5 w-5 text-pyrax-orange" />
            <h3 className="font-semibold text-white">CLI Usage</h3>
          </div>
          <pre className="text-xs font-mono text-gray-400 p-3 rounded bg-black/30 overflow-x-auto">
{`# Install CLI
npm install -g @pyrax/cli

# Configure API key
pyrax config set api_key YOUR_KEY

# Run inference
pyrax crucible run \\
  --model llama-3-8b \\
  --prompt "Hello world"`}
          </pre>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-5 w-5 text-pyrax-orange" />
            <h3 className="font-semibold text-white">SDK Usage</h3>
          </div>
          <pre className="text-xs font-mono text-gray-400 p-3 rounded bg-black/30 overflow-x-auto">
{`import { Pyrax } from '@pyrax/sdk';

const client = new Pyrax({
  apiKey: 'YOUR_API_KEY'
});

const result = await client.crucible
  .text({
    model: 'llama-3-8b',
    prompt: 'Hello world'
  });`}
          </pre>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-pyrax-orange" />
            <h3 className="font-semibold text-white">REST API</h3>
          </div>
          <pre className="text-xs font-mono text-gray-400 p-3 rounded bg-black/30 overflow-x-auto">
{`curl -X POST \\
  https://api.pyrax.network/v1/crucible/text \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama-3-8b",
    "prompt": "Hello world"
  }'`}
          </pre>
        </div>
      </div>

      {/* Rate Limits */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Rate Limits</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white/5">
            <div className="text-2xl font-bold text-white">100</div>
            <div className="text-sm text-gray-400">Requests per minute</div>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <div className="text-2xl font-bold text-white">10,000</div>
            <div className="text-sm text-gray-400">Requests per day</div>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <div className="text-2xl font-bold text-white">50</div>
            <div className="text-sm text-gray-400">Concurrent jobs</div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Rate limits are based on your account tier. Contact us for higher limits.
        </p>
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md p-6 rounded-2xl bg-pyrax-darker border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Create API Key</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Key Name (optional)
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production Server"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Permissions
                </label>
                <div className="space-y-2">
                  {["crucible", "foundry", "billing"].map((perm) => (
                    <label
                      key={perm}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={newKeyPermissions.includes(perm)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKeyPermissions([...newKeyPermissions, perm]);
                          } else {
                            setNewKeyPermissions(
                              newKeyPermissions.filter((p) => p !== perm)
                            );
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-500 text-pyrax-orange focus:ring-pyrax-orange"
                      />
                      <span className="text-white capitalize">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                className="flex-1 py-3 rounded-lg bg-pyrax-orange text-white font-medium hover:bg-pyrax-amber transition-colors"
              >
                Create Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
