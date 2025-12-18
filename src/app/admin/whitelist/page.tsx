"use client";

import { useState, useEffect } from "react";
import { UserPlus, Trash2, Shield, User, AlertCircle, Check, X } from "lucide-react";

interface WhitelistEntry {
  id: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
  createdBy: string | null;
}

export default function AdminWhitelistPage() {
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("ADMIN");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchWhitelist();
  }, []);

  const fetchWhitelist = async () => {
    try {
      const res = await fetch("/api/admin/whitelist");
      if (res.ok) {
        const data = await res.json();
        setWhitelist(data.whitelist);
      }
    } catch (error) {
      console.error("Failed to fetch whitelist:", error);
    } finally {
      setLoading(false);
    }
  };

  const addAdmin = async () => {
    setError("");
    setSuccess("");
    
    if (!newEmail || !newPassword) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await fetch("/api/admin/whitelist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail, password: newPassword, role: newRole }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(`Added ${newEmail} to whitelist`);
        setNewEmail("");
        setNewPassword("");
        setNewRole("ADMIN");
        setShowAddForm(false);
        fetchWhitelist();
      } else {
        setError(data.error || "Failed to add admin");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const removeAdmin = async (id: string, email: string) => {
    if (!confirm(`Remove ${email} from the whitelist?`)) return;

    try {
      const res = await fetch(`/api/admin/whitelist?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccess(`Removed ${email} from whitelist`);
        fetchWhitelist();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to remove admin");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pyrax-orange"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Whitelist</h1>
          <p className="text-gray-400">Manage who can access the admin dashboard</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-pyrax-orange hover:bg-pyrax-amber rounded-lg text-white"
        >
          <UserPlus className="h-5 w-5" />
          Add Admin
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
          <Check className="h-5 w-5" />
          {success}
        </div>
      )}

      {showAddForm && (
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
          <h2 className="text-lg font-semibold text-white">Add New Admin</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="admin@pyrax.org"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Strong password"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              >
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="MANAGER">Manager</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={addAdmin}
              className="px-4 py-2 bg-pyrax-orange hover:bg-pyrax-amber rounded-lg text-white"
            >
              Add Admin
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Role</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Added</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Added By</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {whitelist.map((entry) => (
              <tr key={entry.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pyrax-orange/20 flex items-center justify-center">
                      {entry.role === "SUPER_ADMIN" ? (
                        <Shield className="h-4 w-4 text-pyrax-orange" />
                      ) : (
                        <User className="h-4 w-4 text-pyrax-orange" />
                      )}
                    </div>
                    <span className="text-white">{entry.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    entry.role === "SUPER_ADMIN" 
                      ? "bg-pyrax-orange/20 text-pyrax-orange" 
                      : "bg-white/10 text-gray-400"
                  }`}>
                    {entry.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">
                  {entry.createdBy || "System"}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => removeAdmin(entry.id, entry.email)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
