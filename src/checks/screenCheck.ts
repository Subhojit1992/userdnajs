import { ScreenInfo } from '../types';

/**
 * Gets screen information for fingerprinting
 * @returns Screen information
 */
export function getScreenInfo(): ScreenInfo {
  if (typeof window === 'undefined' || !window.screen) {
    // Fallback for non-browser environments
    return {
      width: 0,
      height: 0,
      availWidth: 0,
      availHeight: 0,
      colorDepth: 0,
      pixelRatio: 1
    };
  }

  const { screen } = window;
  
  return {
    width: screen.width,
    height: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio || 1
  };
}

/**
 * Gets the orientation type of the device
 * @returns Orientation type
 */
export function getOrientationType(): string {
  if (typeof window === 'undefined' || !window.screen || !window.screen.orientation) {
    return 'unknown';
  }
  
  return window.screen.orientation.type;
}

/**
 * Generates an enhanced screen info object including orientation
 * @returns Enhanced screen information
 */
export function getEnhancedScreenInfo(): ScreenInfo & { orientation: string } {
  const screenInfo = getScreenInfo();
  const orientation = getOrientationType();
  
  return {
    ...screenInfo,
    orientation
  };
}

/**
 * Checks if the screen is a touch-enabled device
 * @returns Whether touch is available
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    (navigator.msMaxTouchPoints > 0);
}

/**
 * Gets a fingerprint value based on screen properties
 * @returns Screen fingerprint value
 */
export function getScreenFingerprint(): string {
  const screenInfo = getEnhancedScreenInfo();
  const touchEnabled = isTouchDevice();
  
  return JSON.stringify({
    ...screenInfo,
    touchEnabled
  });
} 