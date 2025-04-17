/**
 * UserDNA-Community - Community edition of fingerprint generator library for creating unique user identifiers
 * @module UserDNA-Community
 */

import { FingerprintGenerator } from './core/FingerprintGenerator';
import { UserDNAOptions } from './types';

export { FingerprintGenerator } from './core/FingerprintGenerator';
export * from './types';

/**
 * Creates a new instance of UserDNA-Community fingerprint generator
 * @param options - Configuration options for UserDNA-Community
 * @returns FingerprintGenerator instance
 */
export function createUserDNA(options?: UserDNAOptions): FingerprintGenerator {
  return new FingerprintGenerator(options);
}

// Default export for easier access
const UserDNACommunity = {
  createUserDNA,
  FingerprintGenerator
};

export default UserDNACommunity; 