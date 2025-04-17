import { BrowserInfo } from '../types';

/**
 * Gets browser information for fingerprinting
 * @returns Browser information
 */
export function getBrowserInfo(): BrowserInfo {
  if (typeof navigator === 'undefined') {
    // Fallback for non-browser environments
    return {
      userAgent: '',
      browserName: 'unknown',
      browserVersion: 'unknown',
      os: 'unknown',
      osVersion: 'unknown',
      device: 'unknown',
      vendor: 'unknown',
      cookiesEnabled: false,
      doNotTrack: null
    };
  }

  const { userAgent } = navigator;
  
  // Browser name and version detection
  const browserData = detectBrowser(userAgent);
  
  // OS detection
  const osData = detectOS(userAgent);
  
  // Device detection
  const device = detectDevice(userAgent);
  
  return {
    userAgent,
    browserName: browserData.name,
    browserVersion: browserData.version,
    os: osData.name,
    osVersion: osData.version,
    device,
    vendor: navigator.vendor || 'unknown',
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: getDoNotTrack()
  };
}

/**
 * Detects browser name and version from user agent
 * @param userAgent - User agent string
 * @returns Browser name and version
 */
function detectBrowser(userAgent: string): { name: string; version: string } {
  // Default values
  let name = 'unknown';
  let version = 'unknown';
  
  // Edge (Chromium-based)
  if (userAgent.includes('Edg/')) {
    name = 'Edge';
    version = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || 'unknown';
  }
  // Chrome
  else if (userAgent.includes('Chrome/')) {
    name = 'Chrome';
    version = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'unknown';
  }
  // Safari
  else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) {
    name = 'Safari';
    version = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'unknown';
  }
  // Firefox
  else if (userAgent.includes('Firefox/')) {
    name = 'Firefox';
    version = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'unknown';
  }
  // Opera
  else if (userAgent.includes('OPR/') || userAgent.includes('Opera/')) {
    name = 'Opera';
    version = userAgent.match(/(?:OPR|Opera)\/([0-9.]+)/)?.[1] || 'unknown';
  }
  // IE
  else if (userAgent.includes('Trident/')) {
    name = 'Internet Explorer';
    version = userAgent.match(/rv:([0-9.]+)/)?.[1] || 'unknown';
  }
  
  return { name, version };
}

/**
 * Detects operating system from user agent
 * @param userAgent - User agent string
 * @returns OS name and version
 */
function detectOS(userAgent: string): { name: string; version: string } {
  // Default values
  let name = 'unknown';
  let version = 'unknown';
  
  // Windows
  if (userAgent.includes('Windows')) {
    name = 'Windows';
    if (userAgent.includes('Windows NT 10.0')) version = '10';
    else if (userAgent.includes('Windows NT 6.3')) version = '8.1';
    else if (userAgent.includes('Windows NT 6.2')) version = '8';
    else if (userAgent.includes('Windows NT 6.1')) version = '7';
    else if (userAgent.includes('Windows NT 6.0')) version = 'Vista';
    else if (userAgent.includes('Windows NT 5.1')) version = 'XP';
    else if (userAgent.includes('Windows NT 5.0')) version = '2000';
  }
  // macOS
  else if (userAgent.includes('Macintosh') || userAgent.includes('Mac OS X')) {
    name = 'macOS';
    const macVersion = userAgent.match(/Mac OS X (\d+[._]\d+[._]\d+)/)?.[1] || 
                      userAgent.match(/Mac OS X (\d+[._]\d+)/)?.[1];
    if (macVersion) {
      version = macVersion.replace(/_/g, '.');
    }
  }
  // iOS
  else if (/iPhone|iPad|iPod/.test(userAgent)) {
    name = 'iOS';
    version = userAgent.match(/OS (\d+[._]\d+[._]?\d*)/)?.[1]?.replace(/_/g, '.') || 'unknown';
  }
  // Android
  else if (userAgent.includes('Android')) {
    name = 'Android';
    version = userAgent.match(/Android (\d+[._]\d+[._]?\d*)/)?.[1]?.replace(/_/g, '.') || 'unknown';
  }
  // Linux
  else if (userAgent.includes('Linux')) {
    name = 'Linux';
  }
  
  return { name, version };
}

/**
 * Detects device type from user agent
 * @param userAgent - User agent string
 * @returns Device type
 */
function detectDevice(userAgent: string): string {
  if (/iPhone|iPod/.test(userAgent)) {
    return 'iPhone';
  } else if (/iPad/.test(userAgent)) {
    return 'iPad';
  } else if (/Android/.test(userAgent)) {
    if (/Mobile/.test(userAgent)) {
      return 'Android Mobile';
    }
    return 'Android Tablet';
  } else if (/Windows Phone/.test(userAgent)) {
    return 'Windows Phone';
  } else if (/Macintosh|Mac OS X/.test(userAgent)) {
    return 'Mac';
  } else if (/Windows/.test(userAgent)) {
    return 'Windows';
  } else if (/Linux/.test(userAgent)) {
    return 'Linux';
  }
  
  return 'unknown';
}

/**
 * Gets the Do Not Track preference
 * @returns Do Not Track value
 */
function getDoNotTrack(): string | null {
  if (typeof navigator === 'undefined') {
    return null;
  }
  
  if (navigator.doNotTrack) {
    return navigator.doNotTrack;
  } else if ('doNotTrack' in window) {
    // @ts-ignore
    return window.doNotTrack;
  } else if ('msDoNotTrack' in navigator) {
    // @ts-ignore
    return navigator.msDoNotTrack;
  }
  
  return null;
}

/**
 * Checks if the browser supports WebGL
 * @returns Whether WebGL is supported
 */
export function hasWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

/**
 * Gets a fingerprint value based on browser properties
 * @returns Browser fingerprint value
 */
export function getBrowserFingerprint(): string {
  const browserInfo = getBrowserInfo();
  const webglSupport = hasWebGLSupport();
  
  return JSON.stringify({
    ...browserInfo,
    webglSupport
  });
} 