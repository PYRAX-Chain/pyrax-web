// React hook for API key management
// Provides CRUD operations for user's API keys

import { useState, useCallback, useEffect } from "react";
import { useAccount } from "wagmi";

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  permissions: string[];
  rateLimit: number;
  lastUsedAt: string | null;
  createdAt: string;
  expiresAt: string | null;
}

export function useApiKeys() {
  const { address } = useAccount();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's API keys
  const fetchKeys = useCallback(async () => {
    if (!address) {
      setKeys([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/v1/api-keys", {
        headers: { "x-wallet-address": address },
      });

      const data = await response.json();

      if (data.success) {
        setKeys(data.data.keys);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch API keys");
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Create a new API key
  const createKey = useCallback(async (name: string, permissions: string[]) => {
    if (!address) {
      return { success: false, error: "Wallet not connected" };
    }

    try {
      const response = await fetch("/api/v1/api-keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-wallet-address": address,
        },
        body: JSON.stringify({ name, permissions }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh the keys list
        await fetchKeys();
        // Return the full key (only shown once!)
        return { success: true, key: data.data.key, id: data.data.id };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: "Failed to create API key" };
    }
  }, [address, fetchKeys]);

  // Delete an API key
  const deleteKey = useCallback(async (keyId: string) => {
    if (!address) {
      return { success: false, error: "Wallet not connected" };
    }

    try {
      const response = await fetch(`/api/v1/api-keys?id=${keyId}`, {
        method: "DELETE",
        headers: { "x-wallet-address": address },
      });

      const data = await response.json();

      if (data.success) {
        // Remove from local state
        setKeys(keys.filter(k => k.id !== keyId));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: "Failed to delete API key" };
    }
  }, [address, keys]);

  // Initial fetch
  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  return {
    keys,
    loading,
    error,
    createKey,
    deleteKey,
    refresh: fetchKeys,
  };
}
