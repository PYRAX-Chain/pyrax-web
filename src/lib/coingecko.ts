// CoinGecko API Integration for Live Price Data
// Supports both free and Pro API

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY || "";
const COINGECKO_PRO = !!COINGECKO_API_KEY;

// Use Pro API endpoint if key is available
const BASE_URL = COINGECKO_PRO 
  ? "https://pro-api.coingecko.com/api/v3"
  : "https://api.coingecko.com/api/v3";

interface PriceData {
  ethereum: {
    usd: number;
    usd_24h_change: number;
  };
  bitcoin: {
    usd: number;
    usd_24h_change: number;
  };
}

interface CachedPrice {
  price: number;
  change24h: number;
  timestamp: number;
}

// In-memory cache for prices (1 hour TTL)
const priceCache: Record<string, CachedPrice> = {};
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

async function fetchWithAuth(url: string): Promise<Response> {
  const headers: HeadersInit = {
    "Accept": "application/json",
  };
  
  if (COINGECKO_PRO && COINGECKO_API_KEY) {
    headers["x-cg-pro-api-key"] = COINGECKO_API_KEY;
  }
  
  return fetch(url, { headers, next: { revalidate: 3600 } }); // Cache for 1 hour
}

export async function getEthPrice(): Promise<{ price: number; change24h: number }> {
  const cacheKey = "eth_usd";
  const cached = priceCache[cacheKey];
  
  // Return cached price if still valid
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return { price: cached.price, change24h: cached.change24h };
  }
  
  try {
    const response = await fetchWithAuth(
      `${BASE_URL}/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true`
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data: PriceData = await response.json();
    const price = data.ethereum.usd;
    const change24h = data.ethereum.usd_24h_change;
    
    // Update cache
    priceCache[cacheKey] = {
      price,
      change24h,
      timestamp: Date.now(),
    };
    
    return { price, change24h };
  } catch (error) {
    console.error("Failed to fetch ETH price:", error);
    // Return cached price even if expired, or fallback
    if (cached) {
      return { price: cached.price, change24h: cached.change24h };
    }
    // Fallback price if no cache and API fails
    return { price: 3500, change24h: 0 };
  }
}

export async function getBtcPrice(): Promise<{ price: number; change24h: number }> {
  const cacheKey = "btc_usd";
  const cached = priceCache[cacheKey];
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return { price: cached.price, change24h: cached.change24h };
  }
  
  try {
    const response = await fetchWithAuth(
      `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true`
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data: PriceData = await response.json();
    const price = data.bitcoin.usd;
    const change24h = data.bitcoin.usd_24h_change;
    
    priceCache[cacheKey] = {
      price,
      change24h,
      timestamp: Date.now(),
    };
    
    return { price, change24h };
  } catch (error) {
    console.error("Failed to fetch BTC price:", error);
    if (cached) {
      return { price: cached.price, change24h: cached.change24h };
    }
    return { price: 100000, change24h: 0 };
  }
}

export async function getAllPrices(): Promise<{
  eth: { price: number; change24h: number };
  btc: { price: number; change24h: number };
  lastUpdated: number;
}> {
  const [eth, btc] = await Promise.all([getEthPrice(), getBtcPrice()]);
  
  return {
    eth,
    btc,
    lastUpdated: Date.now(),
  };
}

// Convert USD to ETH
export function usdToEth(usd: number, ethPrice: number): number {
  return usd / ethPrice;
}

// Convert ETH to USD
export function ethToUsd(eth: number, ethPrice: number): number {
  return eth * ethPrice;
}

// Format ETH amount
export function formatEth(amount: number, decimals: number = 2): string {
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(decimals)}K`;
  }
  return amount.toFixed(decimals);
}

// Format USD amount
export function formatUsd(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(1)}K`;
  }
  return `$${amount.toFixed(2)}`;
}
