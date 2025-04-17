import { simpleHash, combineHashes, normalizeString } from '../src/utils/hashUtils';

describe('hashUtils', () => {
  describe('simpleHash', () => {
    it('should generate a hash for a string', () => {
      const hash = simpleHash('test');
      expect(hash).toBeTruthy();
      expect(typeof hash).toBe('string');
    });
    
    it('should return consistent results for the same input', () => {
      const hash1 = simpleHash('test');
      const hash2 = simpleHash('test');
      expect(hash1).toEqual(hash2);
    });
    
    it('should return different results for different inputs', () => {
      const hash1 = simpleHash('test1');
      const hash2 = simpleHash('test2');
      expect(hash1).not.toEqual(hash2);
    });
  });
  
  describe('combineHashes', () => {
    it('should combine multiple values into a single hash', () => {
      const hash = combineHashes(['test', 123, true]);
      expect(hash).toBeTruthy();
      expect(typeof hash).toBe('string');
    });
    
    it('should handle null and undefined values', () => {
      const hash = combineHashes(['test', null, undefined]);
      expect(hash).toBeTruthy();
    });
    
    it('should handle objects', () => {
      const hash = combineHashes(['test', { a: 1, b: 2 }]);
      expect(hash).toBeTruthy();
    });
    
    it('should return consistent results for the same input', () => {
      const hash1 = combineHashes(['test', 123, true]);
      const hash2 = combineHashes(['test', 123, true]);
      expect(hash1).toEqual(hash2);
    });
    
    it('should return different results for different inputs', () => {
      const hash1 = combineHashes(['test', 123, true]);
      const hash2 = combineHashes(['test', 123, false]);
      expect(hash1).not.toEqual(hash2);
    });
  });
  
  describe('normalizeString', () => {
    it('should convert to lowercase', () => {
      expect(normalizeString('TEST')).toEqual('test');
    });
    
    it('should trim whitespace', () => {
      expect(normalizeString('  test  ')).toEqual('test');
    });
    
    it('should normalize multiple spaces', () => {
      expect(normalizeString('test    string')).toEqual('test string');
    });
    
    it('should handle combination of cases', () => {
      expect(normalizeString('  TEST    String  ')).toEqual('test string');
    });
  });
}); 