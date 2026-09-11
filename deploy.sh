#!/bin/bash

# Exit immediately if any command exits with a non-zero status
set -e

echo "🚀 Starting portfolio deployment sequence..."

# 1. Build Vite production assets
echo "📦 Building production assets with Vite..."
npm run build

# 2. Add all changes to git
echo "🌿 Staging files for Git..."
git add .

# 3. Commit changes
echo "💾 Committing changes to Git..."
git commit -m "perf: complete performance audit, mobile-first refactor, memory cleanup, and zero CLS optimization" || echo "⚠️ Nothing to commit or commit failed, proceeding..."

# 4. Push to remote repository
echo "📤 Pushing to GitHub remote main branch..."
git push origin main

# 5. Deploy to Firebase Hosting
echo "🔥 Deploying to Firebase Hosting..."
firebase deploy --only hosting:main

echo "✅ Portfolio deployment complete and live at https://portofolio-fatir.web.app!"
