# Publishing Guide

This guide explains how to publish the `@relay/relay-nodejs-sdk` package to npm.

## Prerequisites

1. **NPM Account**: You need an npm account with access to the `@relay` organization
2. **NPM Token**: Generate an npm access token from your npm account settings
3. **GitHub Secrets**: Add your npm token to GitHub repository secrets

## Setup

### 1. NPM Authentication

```bash
# Login to npm (if not already logged in)
pnpm login

# Verify you're logged in
pnpm whoami
```

### 2. GitHub Secrets

Add the following secret to your GitHub repository:

- **Name**: `NPM_TOKEN`
- **Value**: Your npm access token

Go to: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

### 3. Organization Access

Ensure you have publish access to the `@relay` organization on npm. Contact your npm organization admin if you don't have access.

## Publishing Process

### Automated Publishing (Recommended)

The package is automatically published when you push a version tag:

1. **Create a release**:

   ```bash
   npm run release:patch  # for patch releases (1.0.0 → 1.0.1)
   npm run release:minor  # for minor releases (1.0.0 → 1.1.0)
   npm run release:major  # for major releases (1.0.0 → 2.0.0)
   ```

2. **The release script will**:
   - Update the version in `package.json`
   - Build the package
   - Commit changes
   - Create and push a git tag
   - Push changes to main branch

3. **GitHub Actions will automatically**:
   - Build the package
   - Publish to npm
   - Create a GitHub release

### Manual Publishing

If you prefer to publish manually:

```bash
# Build the package
pnpm run build

# Publish to npm
pnpm publish
```

## Version Management

### Semantic Versioning

- **Patch** (`1.0.0` → `1.0.1`): Bug fixes, no breaking changes
- **Minor** (`1.0.0` → `1.1.0`): New features, backward compatible
- **Major** (`1.0.0` → `2.0.0`): Breaking changes

### Pre-release Versions

For pre-release versions (alpha, beta, rc), you can manually update the version:

```bash
pnpm version 1.0.0-alpha.1
pnpm publish --tag alpha
```

## Package Contents

The published package includes:

- `dist/` - Built JavaScript and TypeScript files
- `README.md` - Package documentation
- `package.json` - Package metadata

Excluded from the package:

- `src/` - Source code
- `tsconfig.json` - TypeScript configuration
- Development dependencies
- Test files

## Troubleshooting

### Common Issues

1. **Authentication Error**: Ensure you're logged in to npm and have the correct token
2. **Access Denied**: Verify you have publish access to the `@relay` organization
3. **Build Failures**: Check that all dependencies are installed and TypeScript compiles
4. **Version Conflicts**: Ensure the version you're trying to publish doesn't already exist

### Rollback

If you need to unpublish a version:

```bash
pnpm unpublish @relay/relay-nodejs-sdk@1.0.1
```

**Note**: npm only allows unpublishing within 72 hours of publishing.

## Best Practices

1. **Always test builds** before publishing
2. **Use semantic versioning** consistently
3. **Write clear release notes** in GitHub releases
4. **Test the published package** in a clean environment
5. **Keep dependencies up to date**

## Support

If you encounter issues:

1. Check the GitHub Actions logs for build/publish errors
2. Verify npm authentication and permissions
3. Ensure all required secrets are configured
4. Contact the development team for assistance
