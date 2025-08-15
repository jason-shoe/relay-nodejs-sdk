#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootPackageJsonPath = path.join(__dirname, '..', 'package.json');
const apiPackageJsonPath = path.join(
  __dirname,
  '..',
  'src',
  'api',
  'package.json'
);

function runCommand(command, cwd = process.cwd()) {
  try {
    execSync(command, { stdio: 'inherit', cwd });
  } catch (error) {
    console.error(`Failed to execute: ${command}`);
    process.exit(1);
  }
}

function updateVersion(type) {
  // Read both package.json files
  const rootPackageJson = JSON.parse(
    fs.readFileSync(rootPackageJsonPath, 'utf8')
  );
  const apiPackageJson = JSON.parse(
    fs.readFileSync(apiPackageJsonPath, 'utf8')
  );

  const currentVersion = apiPackageJson.version;
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  let newVersion;
  switch (type) {
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    default:
      console.error('Invalid version type. Use: major, minor, or patch');
      process.exit(1);
  }

  // Update both package.json files
  apiPackageJson.version = newVersion;
  rootPackageJson.version = newVersion;

  fs.writeFileSync(
    apiPackageJsonPath,
    JSON.stringify(apiPackageJson, null, 2) + '\n'
  );

  fs.writeFileSync(
    rootPackageJsonPath,
    JSON.stringify(rootPackageJson, null, 2) + '\n'
  );

  console.log(`Version updated from ${currentVersion} to ${newVersion}`);
  return newVersion;
}

function main() {
  const args = process.argv.slice(2);
  const type = args[0];

  if (!type || !['major', 'minor', 'patch'].includes(type)) {
    console.log('Usage: node scripts/release.js <major|minor|patch>');
    console.log('Example: node scripts/release.js patch');
    process.exit(1);
  }

  console.log('🚀 Starting multi-package release process...');

  // Update version
  const newVersion = updateVersion(type);

  // Build all packages
  console.log('📦 Building all packages...');
  runCommand('pnpm run build');

  // Commit changes
  console.log('💾 Committing changes...');
  runCommand('git add .');
  runCommand(`git commit -m "chore: bump version to ${newVersion}"`);

  // Create and push tag
  console.log('🏷️  Creating tag...');
  runCommand(`git tag v${newVersion}`);
  runCommand(`git push origin v${newVersion}`);

  // Push changes
  console.log('📤 Pushing changes...');
  runCommand('git push origin main');

  console.log(`✅ Release ${newVersion} is ready!`);
  console.log(
    'The GitHub Action will automatically build and publish all packages to NPM.'
  );
}

main();
