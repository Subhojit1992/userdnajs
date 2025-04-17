/**
 * Storage key for the fingerprint
 */
const DEFAULT_STORAGE_KEY = 'userdna_fingerprint';

/**
 * Storage options
 */
interface StorageOptions {
  storageType?: 'localStorage' | 'sessionStorage' | 'none';
  storagePrefix?: string;
}

/**
 * Checks if localStorage is available
 * @returns Whether localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Checks if sessionStorage is available
 * @returns Whether sessionStorage is available
 */
export function isSessionStorageAvailable(): boolean {
  try {
    const testKey = '__test__';
    sessionStorage.setItem(testKey, testKey);
    sessionStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Checks if IndexedDB is available
 * @returns Whether IndexedDB is available
 */
export function isIndexedDBAvailable(): boolean {
  try {
    return !!window.indexedDB;
  } catch (e) {
    return false;
  }
}

/**
 * Saves a value to localStorage
 * @param key - Storage key
 * @param value - Value to store
 * @returns Whether the operation was successful
 */
export function saveToLocalStorage(key: string, value: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Retrieves a value from localStorage
 * @param key - Storage key
 * @returns Retrieved value or null if not found
 */
export function getFromLocalStorage<T>(key: string): T | null {
  if (!isLocalStorageAvailable()) return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Removes a value from localStorage
 * @param key - Storage key
 * @returns Whether the operation was successful
 */
export function removeFromLocalStorage(key: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Saves a value to sessionStorage
 * @param key - Storage key
 * @param value - Value to store
 * @returns Whether the operation was successful
 */
export function saveToSessionStorage(key: string, value: string): boolean {
  if (!isSessionStorageAvailable()) return false;
  
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Retrieves a value from sessionStorage
 * @param key - Storage key
 * @returns Retrieved value or null if not found
 */
export function getFromSessionStorage<T>(key: string): T | null {
  if (!isSessionStorageAvailable()) return null;
  
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Removes a value from sessionStorage
 * @param key - Storage key
 * @returns Whether the operation was successful
 */
export function removeFromSessionStorage(key: string): boolean {
  if (!isSessionStorageAvailable()) return false;
  
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Storage utilities for UserDNA
 */
export const Storage = {
  getKey: (prefix: string = 'userdna') => `${prefix}_${DEFAULT_STORAGE_KEY}`,
  
  /**
   * Saves fingerprint data to the specified storage
   * @param data - Data to store
   * @param options - Storage options
   * @returns Whether the operation was successful
   */
  save: (data: any, options: StorageOptions = {}): boolean => {
    const { storageType = 'localStorage', storagePrefix = 'userdna' } = options;
    const key = Storage.getKey(storagePrefix);
    const stringifiedData = JSON.stringify(data);
    
    switch (storageType) {
      case 'localStorage':
        return saveToLocalStorage(key, stringifiedData);
      case 'sessionStorage':
        return saveToSessionStorage(key, stringifiedData);
      case 'none':
      default:
        return false;
    }
  },
  
  /**
   * Retrieves fingerprint data from the specified storage
   * @param options - Storage options
   * @returns Retrieved data or null if not found
   */
  get: <T>(options: StorageOptions = {}): T | null => {
    const { storageType = 'localStorage', storagePrefix = 'userdna' } = options;
    const key = Storage.getKey(storagePrefix);
    
    switch (storageType) {
      case 'localStorage':
        return getFromLocalStorage<T>(key);
      case 'sessionStorage':
        return getFromSessionStorage<T>(key);
      case 'none':
      default:
        return null;
    }
  }
}; 