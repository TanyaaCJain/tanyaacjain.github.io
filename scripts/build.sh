#!/bin/bash

# Build Script
# This script fetches content and builds the static site

set -e  # Exit on error

echo "🏗️  Starting build process..."

# Fetch essays from private repository
echo "📝 Step 1: Fetching essays from private repository..."
tsx scripts/fetch-essays.ts

# Build the Docusaurus site
echo "🔨 Step 2: Building Docusaurus site..."
docusaurus build

echo "✨ Build complete! Static files are in the 'build' directory."
