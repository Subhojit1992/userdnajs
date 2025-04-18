# UserDNA JS
**[community-edition]**
 
A lightweight, modular fingerprint generator library for creating unique user identifiers in web applications.

## Features

- **Simple User Identification**: Generate consistent fingerprints for returning visitors
- **Modular Architecture**: Only use the fingerprinting techniques you need
- **Privacy-Focused**: No server-side components or data collection
- **Basic Customization**: Support for up to 2 custom components
- **TypeScript Support**: Full TypeScript definitions included
- **Multiple Formats**: Use as an ES module, CommonJS module, or via CDN
- **Small Footprint**: Minimal impact on page load times
- **Easy Storage**: Built-in support for localStorage and sessionStorage

## Installation

### NPM

```bash
npm install userdnajs
```

### Yarn

```bash
yarn add userdnajs
```

### CDN

```html
<script src="https://unpkg.com/userdnajs@0.1.2/dist/index.umd.min.js"></script>
```

## Quick Start

```javascript
import { createUserDNA } from 'userdnajs';

// Create a new instance with default options
const userDNA = createUserDNA();

// Get a visitor ID
userDNA.getVisitorId().then(id => {
  console.log('Visitor ID:', id);
});

// Get the full fingerprint
userDNA.getFingerprint().then(result => {
  console.log('Fingerprint result:', result);
});
```

## Configuration

UserDNA-Community is configurable with basic options:

```javascript
import { createUserDNA } from 'userdnajs';

const userDNA = createUserDNA({
  // What components to include in the fingerprint
  includeBrowserInfo: true,
  includeScreenInfo: true,
  includeTimezone: true,
  includeLanguage: true,
  includeStorage: true,
  
  // Storage configuration
  storagePrefix: 'myapp',
  storageType: 'localStorage', // 'localStorage', 'sessionStorage', or 'none'
  
  // Add custom fingerprinting components (max 2)
  customComponents: [
    {
      name: 'customData',
      getValue: () => 'some-custom-value'
    },
    {
      name: 'timestamp',
      getValue: () => new Date().toISOString()
    }
  ]
});
```

## API Reference

### Core Methods

#### `createUserDNA(options)`

Creates a new instance of the UserDNA-Community fingerprint generator.

#### `getFingerprint()`

Gets the full fingerprint result. Returns a Promise that resolves to a `FingerprintResult` object.

```javascript
userDNA.getFingerprint().then(result => {
  console.log(result);
});
```

#### `getVisitorId()`

Gets just the visitor ID (fingerprint hash). Returns a Promise that resolves to a string.

```javascript
userDNA.getVisitorId().then(id => {
  console.log(id);
});
```

#### `isSameVisitor(fingerprintId)`

Checks if the current visitor matches a previous fingerprint ID. Returns a Promise that resolves to a boolean.

```javascript
userDNA.isSameVisitor('previous-id').then(isSame => {
  if (isSame) {
    console.log('Same visitor detected');
  }
});
```

#### `updateOptions(options)`

Updates the options for the fingerprint generator.

```javascript
userDNA.updateOptions({
  includeScreenInfo: false,
  storageType: 'sessionStorage'
});
```

#### `getOptions()`

Gets the current options for the fingerprint generator.

```javascript
const options = userDNA.getOptions();
```

## Use Cases

- **Basic User Identification**: Track returning visitors
- **Simple Analytics**: Understand visitor patterns
- **A/B Testing**: Ensure consistent user experiences in tests

## Browser Support

UserDNA-Community works in all modern browsers:

- Chrome 49+
- Firefox 52+
- Safari 10+
- Edge 18+
- Opera 36+
- Mobile browsers (iOS Safari, Android Chrome)

## License

MIT