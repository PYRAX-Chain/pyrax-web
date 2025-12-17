"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Save,
  Key,
  Wallet,
  CheckCircle,
} from "lucide-react";

export default function SettingsPage() {
  const { address } = useAccount();
  const [notifications, setNotifications] = useState({
    jobComplete: true,
    jobFailed: true,
    lowBalance: true,
    newsletter: false,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-500/20 flex items-center justify-center">
          <Settings className="h-6 w-6 text-gray-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your account preferences</p>
        </div>
      </div>

      {/* Account Info */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-5 w-5 text-pyrax-orange" />
          <h2 className="text-lg font-semibold text-white">Account</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-400">Connected Wallet</div>
                <div className="text-white font-mono">{address}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Connected</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Display Name (optional)</label>
            <input
              type="text"
              placeholder="Enter a display name"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
            />
          </div>

          <div className="p-4 rounded-lg bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Email (optional, for notifications)</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pyrax-orange"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-pyrax-orange" />
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
        </div>

        <div className="space-y-3">
          {[
            { key: "jobComplete", label: "Job Completed", desc: "Notify when a job finishes successfully" },
            { key: "jobFailed", label: "Job Failed", desc: "Notify when a job fails or times out" },
            { key: "lowBalance", label: "Low Balance", desc: "Notify when credits fall below 100 PYRX" },
            { key: "newsletter", label: "Newsletter", desc: "Receive product updates and announcements" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
              <div>
                <div className="text-white font-medium">{item.label}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications]
                    ? "bg-pyrax-orange"
                    : "bg-white/10"
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notifications[item.key as keyof typeof notifications]
                    ? "translate-x-6"
                    : "translate-x-0.5"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* API Settings */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Key className="h-5 w-5 text-pyrax-orange" />
          <h2 className="text-lg font-semibold text-white">API Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Default Model (Text)</label>
            </div>
            <select className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-pyrax-orange">
              <option value="llama-3-8b">Llama 3 8B</option>
              <option value="llama-3-70b">Llama 3 70B</option>
              <option value="mistral-7b">Mistral 7B</option>
              <option value="mixtral-8x7b">Mixtral 8x7B</option>
            </select>
          </div>

          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Default Model (Image)</label>
            </div>
            <select className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-pyrax-orange">
              <option value="flux-schnell">Flux Schnell</option>
              <option value="sd-xl">Stable Diffusion XL</option>
              <option value="sd-3">Stable Diffusion 3</option>
            </select>
          </div>

          <div className="p-4 rounded-lg bg-white/5">
            <label className="block text-sm text-gray-400 mb-2">Rate Limit (requests/min)</label>
            <input
              type="number"
              defaultValue={100}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-pyrax-orange"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white font-semibold transition-colors">
          <Save className="h-5 w-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
