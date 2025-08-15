#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute: ${command}`);
    process.exit(1);
  }
}

function updateVersion(type) {
  const currentVersion = packageJson.version;
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

  packageJson.version = newVersion;
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n'
  );

  console.log(`Version updated from ${currentVersion} to ${newVersion}`);
  return newVersion;
}

function main() {
  const args = process.argv.slice(2);
  const type = args[0];

  if (!type || !['major', 'minor', 'patch'].includes(type)) {
    console.log('Usage: node release.js <major|minor|patch>');
    console.log('Example: node release.js patch');
    process.exit(1);
  }

  console.log('🚀 Starting release process...');

  // Update version
  const newVersion = updateVersion(type);

  // Build package
  console.log('📦 Building package...');
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
  console.log('The GitHub Action will automatically publish to NPM.');
}

main();
