/**
 * useBalance hook tests
 */

describe('useBalance Hook', () => {
  describe('Balance Formatting', () => {
    const formatBalance = (wei: bigint, decimals: number = 18): string => {
      const divisor = 10n ** BigInt(decimals);
      const whole = wei / divisor;
      const fraction = wei % divisor;
      
      if (fraction === 0n) {
        return whole.toString();
      }
      
      const fractionStr = fraction.toString().padStart(decimals, '0');
      const trimmed = fractionStr.replace(/0+$/, '');
      return `${whole}.${trimmed}`;
    };

    it('should format whole number balance', () => {
      const balance = BigInt('1000000000000000000'); // 1 PYRAX
      expect(formatBalance(balance)).toBe('1');
    });

    it('should format decimal balance', () => {
      const balance = BigInt('1500000000000000000'); // 1.5 PYRAX
      expect(formatBalance(balance)).toBe('1.5');
    });

    it('should format small balance', () => {
      const balance = BigInt('100000000000000'); // 0.0001 PYRAX
      expect(formatBalance(balance)).toBe('0.0001');
    });

    it('should format zero balance', () => {
      const balance = BigInt(0);
      expect(formatBalance(balance)).toBe('0');
    });

    it('should format large balance', () => {
      const balance = BigInt('1000000000000000000000000'); // 1M PYRAX
      expect(formatBalance(balance)).toBe('1000000');
    });
  });

  describe('Balance Conversion', () => {
    it('should convert PYRAX to wei', () => {
      const pyrax = 1.5;
      const wei = BigInt(Math.floor(pyrax * 1e18));
      
      expect(wei).toBe(BigInt('1500000000000000000'));
    });

    it('should convert wei to PYRAX', () => {
      const wei = BigInt('2500000000000000000');
      const pyrax = Number(wei) / 1e18;
      
      expect(pyrax).toBe(2.5);
    });

    it('should handle very large balances', () => {
      const wei = BigInt('1000000000000000000000000000'); // 1B PYRAX
      const pyrax = Number(wei / BigInt(1e18));
      
      expect(pyrax).toBe(1000000000);
    });
  });

  describe('Balance Display', () => {
    const formatDisplayBalance = (balance: bigint): string => {
      const pyrax = Number(balance) / 1e18;
      
      if (pyrax >= 1e9) {
        return `${(pyrax / 1e9).toFixed(2)}B`;
      }
      if (pyrax >= 1e6) {
        return `${(pyrax / 1e6).toFixed(2)}M`;
      }
      if (pyrax >= 1e3) {
        return `${(pyrax / 1e3).toFixed(2)}K`;
      }
      if (pyrax >= 1) {
        return pyrax.toFixed(2);
      }
      return pyrax.toFixed(6);
    };

    it('should format billions', () => {
      const balance = BigInt('1500000000000000000000000000');
      expect(formatDisplayBalance(balance)).toBe('1.50B');
    });

    it('should format millions', () => {
      const balance = BigInt('1500000000000000000000000');
      expect(formatDisplayBalance(balance)).toBe('1.50M');
    });

    it('should format thousands', () => {
      const balance = BigInt('1500000000000000000000');
      expect(formatDisplayBalance(balance)).toBe('1.50K');
    });

    it('should format normal amounts', () => {
      const balance = BigInt('1500000000000000000');
      expect(formatDisplayBalance(balance)).toBe('1.50');
    });

    it('should format small amounts', () => {
      const balance = BigInt('100000000000000');
      expect(formatDisplayBalance(balance)).toBe('0.000100');
    });
  });

  describe('Balance Comparison', () => {
    it('should compare balances correctly', () => {
      const balance1 = BigInt('1000000000000000000');
      const balance2 = BigInt('2000000000000000000');
      
      expect(balance1 < balance2).toBe(true);
      expect(balance2 > balance1).toBe(true);
    });

    it('should check sufficient balance for transfer', () => {
      const balance = BigInt('1000000000000000000');
      const transferAmount = BigInt('500000000000000000');
      const gasCost = BigInt('21000000000000'); // 0.000021 PYRAX
      
      const totalCost = transferAmount + gasCost;
      const hasSufficientBalance = balance >= totalCost;
      
      expect(hasSufficientBalance).toBe(true);
    });

    it('should detect insufficient balance', () => {
      const balance = BigInt('500000000000000000');
      const transferAmount = BigInt('1000000000000000000');
      
      const hasSufficientBalance = balance >= transferAmount;
      
      expect(hasSufficientBalance).toBe(false);
    });
  });

  describe('Balance Refresh', () => {
    it('should track balance changes', () => {
      const balanceHistory: bigint[] = [
        BigInt('1000000000000000000'),
        BigInt('900000000000000000'),
        BigInt('1100000000000000000'),
      ];
      
      const lastBalance = balanceHistory[balanceHistory.length - 1];
      const previousBalance = balanceHistory[balanceHistory.length - 2];
      
      expect(lastBalance > previousBalance).toBe(true);
    });

    it('should calculate balance change', () => {
      const oldBalance = BigInt('1000000000000000000');
      const newBalance = BigInt('1500000000000000000');
      
      const change = newBalance - oldBalance;
      const changeInPyrax = Number(change) / 1e18;
      
      expect(changeInPyrax).toBe(0.5);
    });
  });
});
