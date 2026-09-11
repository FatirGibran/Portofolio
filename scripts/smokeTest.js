#!/usr/bin/env node

/**
 * Pre-deployment Smoke Test & Bundle Integrity Validator
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

console.log('🔍 Running Smoke Test & Production Bundle Validation...\n');

// 1. Verify dist folder exists
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: dist directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

// 2. Verify index.html
const indexHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ Error: dist/index.html is missing.');
  process.exit(1);
}

const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

const requiredStrings = [
  '<div id="root">',
  'https://fatirgibran.my.id/',
  'application/ld+json',
  '/manifest.json',
];

for (const req of requiredStrings) {
  if (!htmlContent.includes(req)) {
    console.error(`❌ Error: dist/index.html is missing required element: "${req}"`);
    process.exit(1);
  }
}

console.log('✅ dist/index.html verified successfully.');

// 3. Verify assets directory
const assetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('❌ Error: dist/assets directory is missing.');
  process.exit(1);
}

const assetFiles = fs.readdirSync(assetsDir);
const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
const cssFiles = assetFiles.filter(f => f.endsWith('.css'));

if (jsFiles.length === 0 || cssFiles.length === 0) {
  console.error('❌ Error: Missing JavaScript or CSS bundles in dist/assets.');
  process.exit(1);
}

console.log(`✅ Assets verified: ${jsFiles.length} JS chunk(s), ${cssFiles.length} CSS bundle(s).`);
console.log('\n🎉 Smoke tests passed! Build is ready for production deployment.\n');
