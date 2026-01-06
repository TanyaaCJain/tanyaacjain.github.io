#!/bin/bash

# Project Setup Script
# This script initializes the project environment

set -e  # Exit on error

echo "🚀 Setting up tanyaacjain.github.io project..."

# Check if nvm is available
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  echo "📦 Loading nvm..."
  . "$HOME/.nvm/nvm.sh"
elif command -v nvm &> /dev/null; then
  echo "📦 nvm is available"
else
  echo "⚠️  nvm not found. Please install nvm or ensure Node.js 22 is installed."
fi

# Use Node.js 22
echo "🔧 Setting Node.js version to 22..."
if command -v nvm &> /dev/null; then
  nvm use 22 || nvm install 22
else
  echo "⚠️  Skipping nvm. Ensure you have Node.js 22 installed."
fi

# Check if .env file exists
if [ ! -f .env ]; then
  echo "📝 Creating .env file from .env.example..."
  cp .env.example .env
  echo "⚠️  Please edit .env file and add your GitHub token and repository details!"
else
  echo "✅ .env file already exists"
fi

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
    echo "✅ Environment variables loaded from .env"
else
    echo "⚠️  .env file not found. Skipping environment variable loading."
fi

# Install dependencies
echo "📦 Installing dependencies with yarn..."
yarn install

# Make scripts executable
echo "🔐 Making scripts executable..."
chmod +x scripts/*.sh

# Initialize git submodules for blog content
echo "📦 Initializing content submodules..."
if bash scripts/sync-content.sh; then
# if bash scripts/init-submodules.sh; then
  echo "✅ Submodules initialized successfully"
else
  echo "⚠️  Submodule initialization failed or skipped"
  echo "   You can run 'yarn init-submodules' manually later"
fi

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file and add your GitHub credentials (if using private repos)"
echo "2. Run 'yarn sync-essays' to sync latest blog content"
echo "3. Run 'yarn dev' to start development server"
echo "4. Run 'yarn build' to create production build"
