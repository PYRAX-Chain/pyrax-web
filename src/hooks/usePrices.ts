"use client";

import { useState, useEffect, useCallback } from "react";

interface PriceData {
  eth: { price: number; change24h: number };
  btc: { price: number; change24h: number };
  lastUpdated: number;
}

interface UsePricesResult {
  ethPrice: number;
  btcPrice: number;
  ethChange24h: number;
  btcChange24h: number;
  lastUpdated: Date | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const REFRESH_INTERVAL = 60 * 60 * 1000; // 1 hour

export function usePrices(): UsePricesResult {
  const [data, setData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/prices");
      const result = await response.json();
      
      if (result.success || result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to fetch prices");
      }
    } catch (err) {
      setError("Failed to fetch prices");
      console.error("Price fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    
    // Refresh prices every hour
    const interval = setInterval(fetchPrices, REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return {
    ethPrice: data?.eth.price ?? 3500,
    btcPrice: data?.btc.price ?? 100000,
    ethChange24h: data?.eth.change24h ?? 0,
    btcChange24h: data?.btc.change24h ?? 0,
    lastUpdated: data?.lastUpdated ? new Date(data.lastUpdated) : null,
    isLoading,
    error,
    refresh: fetchPrices,
  };
}

// Utility functions
export function usdToEth(usd: number, ethPrice: number): number {
  return usd / ethPrice;
}

export function formatEth(amount: number): string {
  if (amount >= 10000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  if (amount >= 1000) {
    return amount.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  return amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
