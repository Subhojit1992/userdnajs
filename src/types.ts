/**
 * Options for configuring the UserDNA fingerprint generator
 */
export interface UserDNAOptions {
  /** Include browser-specific information in fingerprint */
  includeBrowserInfo?: boolean;
  /** Include device-specific information in fingerprint */
  includeDeviceInfo?: boolean;
  /** Include screen resolution and color depth in fingerprint */
  includeScreenInfo?: boolean;
  /** Include timezone information in fingerprint */
  includeTimezone?: boolean;
  /** Include language preference in fingerprint */
  includeLanguage?: boolean;
  /** Include session storage capabilities in fingerprint */
  includeStorage?: boolean;
  /** Prefix for storage keys */
  storagePrefix?: string;
  /** Storage mechanism to use */
  storageType?: 'localStorage' | 'sessionStorage' | 'none';
  /** Custom components to include in fingerprint (limited to 2) */
  customComponents?: CustomComponent[];
}

/**
 * Custom component for extending fingerprinting
 */
export interface CustomComponent {
  /** Unique name for the component */
  name: string;
  /** Function that returns a value to be included in the fingerprint */
  getValue: () => Promise<string | number | boolean | null> | string | number | boolean | null;
}

/**
 * Represents the result of fingerprinting
 */
export interface FingerprintResult {
  /** Generated unique identifier */
  id: string;
  /** Components used to generate the fingerprint */
  components: FingerprintComponents;
  /** Timestamp when fingerprint was generated */
  createdAt: number;
  /** Whether the fingerprint was retrieved from storage */
  fromCache: boolean;
}

/**
 * Components that make up the fingerprint
 */
export interface FingerprintComponents {
  [key: string]: any;
  browserInfo?: BrowserInfo;
  screenInfo?: ScreenInfo;
  timezone?: string;
  language?: string;
  storage?: StorageInfo;
  custom?: {
    [key: string]: any;
  };
}

/**
 * Browser information
 */
export interface BrowserInfo {
  userAgent: string;
  browserName?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
  device?: string;
  vendor?: string;
  cookiesEnabled?: boolean;
  doNotTrack?: string | null;
}

/**
 * Screen information
 */
export interface ScreenInfo {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
  colorDepth: number;
  pixelRatio: number;
}

/**
 * Storage information
 */
export interface StorageInfo {
  localStorage: boolean;
  sessionStorage: boolean;
  cookies: boolean;
  indexedDB: boolean;
} 