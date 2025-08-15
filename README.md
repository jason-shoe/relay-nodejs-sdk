# relay-nodejs-sdk

[![npm version](https://img.shields.io/npm/v/relay-nodejs-sdk.svg)](https://www.npmjs.com/package/relay-nodejs-sdk)
[![npm downloads](https://img.shields.io/npm/dm/relay-nodejs-sdk.svg)](https://www.npmjs.com/package/relay-nodejs-sdk)

> **⚠️ Disclaimer: This is an unofficial, community-maintained SDK for the Relay Delivery API. It is not officially affiliated with or endorsed by Relay Delivery.**

A comprehensive Node.js SDK for the [Relay Delivery API](https://docs.relay.delivery/api/v2.html), providing type-safe access to all API endpoints with full TypeScript support.

## 📦 Installation

```bash
pnpm add relay-nodejs-sdk
```

## 🚀 Quick Start

```typescript
import { createRelayClient } from 'relay-nodejs-sdk';

// Create a client instance
const client = createRelayClient({
  apiKey: 'your-api-key',
  environment: 'production', // or 'development'
});

// Use the client to make API calls
// The client provides type-safe methods for all Relay API endpoints
```

## ✨ Features

- **Type-safe**: Full TypeScript support with generated types
- **Modern**: ES modules and CommonJS support
- **Lightweight**: Minimal dependencies
- **Comprehensive**: Covers all Relay Delivery API endpoints
- **Unofficial**: Community-maintained with no official affiliation

## 📚 Documentation

For detailed API documentation, see the [API package README](./src/api/README.md).

## 🏗️ Project Structure

```
relay-nodejs-sdk/
├── src/
│   ├── api/          # Main SDK package (published to npm)
│   └── generate/     # Code generation utilities
├── scripts/          # Build and release scripts
└── package.json      # Workspace configuration
```

## 🚀 Publishing the API Package

The main SDK is located in `src/api/` and can be published to npm using the following commands:

### Prerequisites

1. Ensure you have npm authentication set up
2. Make sure you're in the `src/api/` directory

### Publishing Commands

```bash
# Navigate to the API package
cd src/api

# Build and publish a patch version (1.0.7 → 1.0.8)
pnpm run release:patch

# Build and publish a minor version (1.0.7 → 1.1.0)
pnpm run release:minor

# Build and publish a major version (1.0.7 → 2.0.0)
pnpm run release:major
```

### Manual Publishing

```bash
cd src/api

# Clean and build
pnpm run clean
pnpm run build

# Publish to npm
npm publish
```

### What Gets Published

The package includes:

- Built JavaScript files (CommonJS and ES modules)
- TypeScript declaration files
- README.md
- Package metadata

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Development mode with watch (in api package)
cd src/api && pnpm run dev

# Clean build artifacts
pnpm run clean
```

## 📄 License

MIT

## 🤝 Contributing

This is an unofficial SDK maintained by the community. Contributions are welcome!

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/relay-nodejs-sdk)
- [Relay Delivery API Documentation](https://docs.relay.delivery/api/v2.html)
- [GitHub Repository](https://github.com/jason-shoe/relay-nodejs-sdk)
