#!/bin/bash

# Deploy Script
# This script deploys the built site to GitHub Pages

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Check if build directory exists
if [ ! -d "build" ]; then
  echo "❌ Build directory not found. Run 'yarn build' first."
  exit 1
fi

# Deploy using Docusaurus built-in deployment
echo "📤 Deploying to GitHub Pages..."

# Set git user if not already set (useful for CI/CD)
if [ -z "$(git config user.name)" ]; then
  git config user.name "Tanya Jain"
  git config user.email "tanyaacjain@github.com"
fi

# Use Docusaurus deploy command
USE_SSH=false GIT_USER=tanyaacjain yarn docusaurus deploy

echo "✨ Deployment complete!"
