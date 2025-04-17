/**
 * Utility functions for hashing and data manipulation
 */

/**
 * Creates a simple hash from a string - used in free version
 * @param input - String to hash
 * @returns Hashed string
 */
export function simpleHash(input: string): string {
  let hash = 0;
  
  if (input.length === 0) return hash.toString(16);
  
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16);
}

/**
 * Combines multiple values into a single hash
 * @param values - Array of values to combine
 * @returns Combined hash
 */
export function combineHashes(values: any[]): string {
  const stringToHash = values
    .map(value => {
      if (value === null || value === undefined) {
        return 'null';
      }
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return String(value);
    })
    .join('|');
  
  return simpleHash(stringToHash);
}

/**
 * Normalizes a string for consistent comparisons
 * @param str - String to normalize
 * @returns Normalized string
 */
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Generates a unique ID
 * @returns Unique ID
 */
export function generateUniqueId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
} 