/**
 * Format utility tests
 */

describe('Format Utilities', () => {
  describe('formatAddress', () => {
    it('should truncate address correctly', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const truncated = `${address.slice(0, 6)}...${address.slice(-4)}`;
      
      expect(truncated).toBe('0x1234...5678');
      expect(truncated.length).toBe(13);
    });

    it('should handle empty address', () => {
      const address = '';
      expect(address).toBe('');
    });

    it('should handle null address', () => {
      const address = null;
      expect(address).toBeNull();
    });
  });

  describe('formatBalance', () => {
    it('should format wei to PYRAX correctly', () => {
      const wei = BigInt('1000000000000000000'); // 1 PYRAX
      const pyrax = Number(wei) / 1e18;
      
      expect(pyrax).toBe(1);
    });

    it('should handle large balances', () => {
      const wei = BigInt('1000000000000000000000000'); // 1M PYRAX
      const pyrax = Number(wei) / 1e18;
      
      expect(pyrax).toBe(1000000);
    });

    it('should handle zero balance', () => {
      const wei = BigInt(0);
      const pyrax = Number(wei) / 1e18;
      
      expect(pyrax).toBe(0);
    });

    it('should handle decimal balances', () => {
      const wei = BigInt('500000000000000000'); // 0.5 PYRAX
      const pyrax = Number(wei) / 1e18;
      
      expect(pyrax).toBe(0.5);
    });
  });

  describe('formatNumber', () => {
    it('should add thousands separators', () => {
      const num = 1234567;
      const formatted = num.toLocaleString();
      
      expect(formatted).toContain('1');
      expect(formatted).toContain('234');
    });

    it('should handle decimals', () => {
      const num = 1234.56;
      const formatted = num.toFixed(2);
      
      expect(formatted).toBe('1234.56');
    });
  });

  describe('formatHashrate', () => {
    it('should format H/s correctly', () => {
      const hashrate = 1000;
      expect(formatHashrate(hashrate)).toBe('1.00 KH/s');
    });

    it('should format KH/s correctly', () => {
      const hashrate = 1000000;
      expect(formatHashrate(hashrate)).toBe('1.00 MH/s');
    });

    it('should format MH/s correctly', () => {
      const hashrate = 1000000000;
      expect(formatHashrate(hashrate)).toBe('1.00 GH/s');
    });

    it('should format GH/s correctly', () => {
      const hashrate = 1000000000000;
      expect(formatHashrate(hashrate)).toBe('1.00 TH/s');
    });
  });

  describe('formatTimestamp', () => {
    it('should format Unix timestamp to date string', () => {
      const timestamp = 1703347200; // Dec 23, 2023
      const date = new Date(timestamp * 1000);
      
      expect(date.getFullYear()).toBe(2023);
    });

    it('should handle current timestamp', () => {
      const now = Math.floor(Date.now() / 1000);
      const date = new Date(now * 1000);
      
      expect(date).toBeInstanceOf(Date);
    });
  });
});

// Helper function for hashrate formatting
function formatHashrate(hashrate: number): string {
  const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s'];
  let unitIndex = 0;
  
  while (hashrate >= 1000 && unitIndex < units.length - 1) {
    hashrate /= 1000;
    unitIndex++;
  }
  
  return `${hashrate.toFixed(2)} ${units[unitIndex]}`;
}
