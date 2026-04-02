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

echo "📤 Deploying to GitHub Pages..."

# Set git user if not already set (useful for CI/CD)
if [ -z "$(git config user.name)" ]; then
  git config user.name "Tanya Jain"
  git config user.email "tanyaacjain@github.com"
fi

COMMIT_MSG="Deploy website - based on $(git rev-parse HEAD)"
GIT_USER_NAME=$(git config user.name)
GIT_USER_EMAIL=$(git config user.email)

# Get remote, embedding token for HTTPS auth in CI if GH_TOKEN is set
REMOTE=$(git remote get-url origin)
if [ -n "$GH_TOKEN" ]; then
  REMOTE=$(echo "$REMOTE" \
    | sed 's|git@github.com:|https://github.com/|' \
    | sed "s|https://github.com/|https://x-access-token:${GH_TOKEN}@github.com/|")
fi

# Use a temp dir outside the project to avoid .gitignore interference
TMP=$(mktemp -d)
cp -r build/. "$TMP/"

cd "$TMP"
git init -b gh-pages
git config user.name "$GIT_USER_NAME"
git config user.email "$GIT_USER_EMAIL"
git remote add origin "$REMOTE"
git add --all
git commit -m "$COMMIT_MSG"
git push --force origin gh-pages

cd -
rm -rf "$TMP"

echo "✨ Deployment complete!"
