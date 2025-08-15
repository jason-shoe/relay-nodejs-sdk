# @relay/relay-nodejs-sdk

Official Node.js SDK for Relay Delivery API

## Installation

```bash
pnpm add @relay/relay-nodejs-sdk
```

## Usage

```typescript
import { createRelayClient } from '@relay/relay-nodejs-sdk';

// Create a client instance
const client = createRelayClient({
  apiKey: 'your-api-key',
  environment: 'production', // or 'development'
});

// Use the client to make API calls
// The client provides type-safe methods for all Relay API endpoints
```

## Features

- **Type-safe**: Full TypeScript support with generated types
- **Modern**: ES modules and CommonJS support
- **Lightweight**: Minimal dependencies
- **Comprehensive**: Covers all Relay Delivery API endpoints

## API Reference

### `createRelayClient(options)`

Creates a new Relay API client instance.

#### Options

- `apiKey` (string, required): Your Relay API key
- `environment` (string, optional): API environment ('production' or 'development', defaults to 'production')

### `RelayEnvironment`

Enum for available API environments.

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm run build

# Development mode with watch
pnpm run dev

# Clean build artifacts
pnpm run clean
```

## License

MIT
