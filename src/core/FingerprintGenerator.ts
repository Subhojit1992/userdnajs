import { 
  UserDNAOptions, 
  FingerprintResult, 
  FingerprintComponents,
  CustomComponent
} from '../types';
import { combineHashes, generateUniqueId } from '../utils/hashUtils';
import { Storage } from '../utils/storageUtils';
import { getScreenInfo } from '../checks/screenCheck';
import { getBrowserInfo } from '../checks/browserCheck';

/**
 * Default options for UserDNA Community Edition
 */
const DEFAULT_OPTIONS: UserDNAOptions = {
  includeBrowserInfo: true,
  includeDeviceInfo: true,
  includeScreenInfo: true,
  includeTimezone: true,
  includeLanguage: true,
  includeStorage: true,
  storagePrefix: 'userdna',
  storageType: 'localStorage',
  customComponents: []
};

/**
 * Main class for generating and managing fingerprints
 */
export class FingerprintGenerator {
  /**
   * Options for the fingerprint generator
   */
  private options: UserDNAOptions;
  
  /**
   * Last generated fingerprint result
   */
  private lastResult: FingerprintResult | null = null;
  
  /**
   * Creates a new instance of FingerprintGenerator
   * @param options - Configuration options
   */
  constructor(options: UserDNAOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    
    // Limit number of custom components
    if (this.options.customComponents && this.options.customComponents.length > 2) {
      this.options.customComponents = this.options.customComponents.slice(0, 2);
    }
  }
  
  /**
   * Gets the fingerprint asynchronously
   * @param options - Options for getting the fingerprint
   * @returns Promise that resolves to the fingerprint result
   */
  async getFingerprint(options: { } = {}): Promise<FingerprintResult> {
    // Check cache first
    if (this.lastResult) {
      return this.lastResult;
    }
    
    // Check storage for existing fingerprint
    const cachedResult = this.getFromStorage();
    if (cachedResult) {
      this.lastResult = cachedResult;
      return cachedResult;
    }
    
    // Generate a new fingerprint
    const components = await this.collectComponents();
    const hashValues = Object.entries(components).map(([key, value]) => {
      if (value === null || value === undefined) {
        return null;
      }
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return String(value);
    }).filter(Boolean) as string[];
    
    // Generate the fingerprint ID
    const id = combineHashes(hashValues);
    
    // Create result
    const result: FingerprintResult = {
      id,
      components,
      createdAt: Date.now(),
      fromCache: false
    };
    
    // Save to storage if enabled
    if (this.options.storageType !== 'none') {
      this.saveToStorage(result);
    }
    
    // Update last result
    this.lastResult = result;
    
    return result;
  }
  
  /**
   * Gets a visitor ID that is unique for the current browser
   * @returns Promise that resolves to the visitor ID
   */
  async getVisitorId(): Promise<string> {
    const result = await this.getFingerprint();
    return result.id;
  }
  
  /**
   * Checks if the current fingerprint is likely from the same visitor
   * @param fingerprintId - Fingerprint ID to compare against
   * @returns Promise that resolves to whether the fingerprints match
   */
  async isSameVisitor(fingerprintId: string): Promise<boolean> {
    const result = await this.getFingerprint();
    return result.id === fingerprintId;
  }
  
  /**
   * Collects all the components for the fingerprint
   * @returns Promise that resolves to the fingerprint components
   */
  private async collectComponents(): Promise<FingerprintComponents> {
    const components: FingerprintComponents = {};
    
    // Browser info
    if (this.options.includeBrowserInfo) {
      components.browserInfo = getBrowserInfo();
    }
    
    // Screen info
    if (this.options.includeScreenInfo) {
      components.screenInfo = getScreenInfo();
    }
    
    // Timezone
    if (this.options.includeTimezone) {
      try {
        components.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (e) {
        components.timezone = String(new Date().getTimezoneOffset());
      }
    }
    
    // Language
    if (this.options.includeLanguage) {
      components.language = navigator.language || 
        // @ts-ignore
        navigator.userLanguage || 
        // @ts-ignore
        navigator.browserLanguage || 
        'unknown';
    }
    
    // Storage capabilities
    if (this.options.includeStorage) {
      components.storage = {
        localStorage: Storage.save({ test: true }, { storageType: 'localStorage' }),
        sessionStorage: Storage.save({ test: true }, { storageType: 'sessionStorage' }),
        cookies: false,
        indexedDB: 'indexedDB' in window
      };
    }
    
    // Custom components (limited to 2)
    if (this.options.customComponents && this.options.customComponents.length > 0) {
      components.custom = {};
      
      // Limit to maximum 2 custom components
      const customComponents = this.options.customComponents.slice(0, 2);
      
      await Promise.all(customComponents.map(async (component) => {
        try {
          components.custom![component.name] = await component.getValue();
        } catch (e) {
          components.custom![component.name] = null;
        }
      }));
    }
    
    return components;
  }
  
  /**
   * Gets fingerprint result from storage
   * @returns Fingerprint result or null if not found
   */
  private getFromStorage(): FingerprintResult | null {
    if (this.options.storageType === 'none') {
      return null;
    }
    
    const data = Storage.get<FingerprintResult>({
      storageType: this.options.storageType,
      storagePrefix: this.options.storagePrefix
    });
    
    if (!data || typeof data !== 'object') {
      return null;
    }
    
    try {
      const result = data as FingerprintResult;
      if (!result.id || !result.components || !result.createdAt) {
        return null;
      }
      
      // Mark as from cache
      result.fromCache = true;
      
      return result;
    } catch (e) {
      return null;
    }
  }
  
  /**
   * Saves fingerprint result to storage
   * @param result - Fingerprint result to save
   */
  private saveToStorage(result: FingerprintResult): void {
    if (this.options.storageType === 'none') {
      return;
    }
    
    Storage.save(result, {
      storageType: this.options.storageType,
      storagePrefix: this.options.storagePrefix
    });
  }
  
  /**
   * Updates the options for the fingerprint generator
   * @param options - New options to apply
   */
  updateOptions(options: Partial<UserDNAOptions>): void {
    // Update options
    this.options = { ...this.options, ...options };
    
    // Limit number of custom components
    if (this.options.customComponents && this.options.customComponents.length > 2) {
      this.options.customComponents = this.options.customComponents.slice(0, 2);
    }
    
    // Clear last result to force regeneration with new options
    this.lastResult = null;
  }
  
  /**
   * Gets the current options for the fingerprint generator
   * @returns Current options
   */
  getOptions(): UserDNAOptions {
    return { ...this.options };
  }
} 