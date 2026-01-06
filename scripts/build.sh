#!/bin/bash

# Build Script
# This script fetches content and builds the static site

set -e  # Exit on error

echo "🏗️  Starting build process..."

# Sync essays from submodule
echo "📝 Step 1: Syncing essays from submodule..."
bash scripts/sync-content.sh

# Build the Docusaurus site
echo "🔨 Step 2: Building Docusaurus site..."
docusaurus build

echo "✨ Build complete! Static files are in the 'build' directory."
