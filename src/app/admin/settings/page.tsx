"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  RefreshCw,
  Globe,
  Bell,
  Shield,
  Palette,
  Mail,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface SettingsData {
  siteName: string;
  siteUrl: string;
  maintenanceMode: boolean;
  presaleEnabled: boolean;
  faucetEnabled: boolean;
  emailNotifications: boolean;
  discordWebhook: string;
  primaryColor: string;
  chainId: number;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>({
    siteName: "PYRAX",
    siteUrl: "https://pyrax.org",
    maintenanceMode: false,
    presaleEnabled: true,
    faucetEnabled: true,
    emailNotifications: true,
    discordWebhook: "",
    primaryColor: "#F68724",
    chainId: 789120,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Settings saved successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to save settings" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 text-pyrax-orange animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Configure site-wide settings</p>
        </div>
        <button onClick={saveSettings} disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pyrax-orange hover:bg-pyrax-amber text-white transition-colors disabled:opacity-50">
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${message.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
          {message.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
          {message.text}
        </div>
      )}

      {/* General Settings */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-pyrax-orange" /> General
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Site Name</label>
            <input type="text" value={settings.siteName} onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Site URL</label>
            <input type="text" value={settings.siteUrl} onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Chain ID</label>
            <input type="number" value={settings.chainId} onChange={(e) => setSettings({...settings, chainId: parseInt(e.target.value)})}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Primary Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={settings.primaryColor} onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                className="w-12 h-10 rounded cursor-pointer" />
              <input type="text" value={settings.primaryColor} onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono" />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-pyrax-orange" /> Features
        </h2>
        <div className="space-y-4">
          {[
            { key: "maintenanceMode", label: "Maintenance Mode", desc: "Show maintenance page to visitors" },
            { key: "presaleEnabled", label: "Presale Enabled", desc: "Allow new presale contributions" },
            { key: "faucetEnabled", label: "Faucet Enabled", desc: "Allow testnet faucet requests" },
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-white/5 cursor-pointer">
              <div>
                <div className="text-white font-medium">{item.label}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
              <input
                type="checkbox"
                checked={(settings as any)[item.key]}
                onChange={(e) => setSettings({...settings, [item.key]: e.target.checked})}
                className="w-5 h-5 rounded accent-pyrax-orange"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-pyrax-orange" /> Notifications
        </h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 cursor-pointer">
            <div>
              <div className="text-white font-medium">Email Notifications</div>
              <div className="text-sm text-gray-500">Receive email alerts for new contributions</div>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
              className="w-5 h-5 rounded accent-pyrax-orange"
            />
          </label>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Discord Webhook URL</label>
            <input type="text" value={settings.discordWebhook} onChange={(e) => setSettings({...settings, discordWebhook: e.target.value})}
              placeholder="https://discord.com/api/webhooks/..."
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
