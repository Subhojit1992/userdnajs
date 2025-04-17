import { FingerprintGenerator } from '../src/core/FingerprintGenerator';

describe('FingerprintGenerator', () => {
  let generator: FingerprintGenerator;
  
  beforeEach(() => {
    // Create a new generator before each test
    generator = new FingerprintGenerator({
      // Use minimal options for testing
      includeBrowserInfo: true,
      includeDeviceInfo: false,
      includeScreenInfo: true,
      includeTimezone: false,
      includeLanguage: false,
      includeStorage: false,
      storageType: 'none', // Don't use storage for tests
      customComponents: []
    });
  });
  
  describe('constructor', () => {
    it('should create an instance with default options', () => {
      const defaultGenerator = new FingerprintGenerator();
      expect(defaultGenerator).toBeInstanceOf(FingerprintGenerator);
    });
    
    it('should create an instance with custom options', () => {
      expect(generator).toBeInstanceOf(FingerprintGenerator);
    });
  });
  
  describe('getFingerprint', () => {
    it('should return a fingerprint result', async () => {
      const result = await generator.getFingerprint();
      
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(typeof result.id).toBe('string');
      expect(result.components).toBeDefined();
      expect(result.fromCache).toBe(false);
    });
    
    it('should include specified components in the fingerprint', async () => {
      const result = await generator.getFingerprint();
      
      // Should have browser info since it was enabled in options
      expect(result.components.browserInfo).toBeDefined();
      
      // Should have screen info since it was enabled in options
      expect(result.components.screenInfo).toBeDefined();
      
      // Should not have timezone since it was disabled in options
      expect(result.components.timezone).toBeUndefined();
    });
    
    it('should cache the result and return from cache on subsequent calls', async () => {
      const result1 = await generator.getFingerprint();
      const result2 = await generator.getFingerprint();
      
      expect(result1).toEqual(result2);
    });
    
    it('should generate a new fingerprint when forceRefresh is true', async () => {
      await generator.getFingerprint();
      
      // Create a custom component that changes the value each time
      generator.updateOptions({
        customComponents: [
          {
            name: 'timestamp',
            getValue: () => Date.now()
          }
        ]
      });
      
      const refreshedResult = await generator.getFingerprint({ forceRefresh: true });
      expect(refreshedResult.fromCache).toBe(false);
    });
  });
  
  describe('getVisitorId', () => {
    it('should return a visitor ID string', async () => {
      const id = await generator.getVisitorId();
      
      expect(id).toBeDefined();
      expect(typeof id).toBe('string');
    });
  });
  
  describe('isSameVisitor', () => {
    it('should return true when the fingerprints match', async () => {
      const result = await generator.getFingerprint();
      const isSame = await generator.isSameVisitor(result.id);
      
      expect(isSame).toBe(true);
    });
    
    it('should return false when the fingerprints do not match', async () => {
      const isSame = await generator.isSameVisitor('different-id');
      
      expect(isSame).toBe(false);
    });
  });
  
  describe('updateOptions', () => {
    it('should update the options', () => {
      generator.updateOptions({
        includeTimezone: true,
        includeLanguage: true
      });
      
      const options = generator.getOptions();
      expect(options.includeTimezone).toBe(true);
      expect(options.includeLanguage).toBe(true);
    });
  });
  
  describe('getOptions', () => {
    it('should return the current options', () => {
      const options = generator.getOptions();
      
      expect(options.includeBrowserInfo).toBe(true);
      expect(options.includeScreenInfo).toBe(true);
      expect(options.includeTimezone).toBe(false);
    });
  });
}); 