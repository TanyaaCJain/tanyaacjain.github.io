#!/bin/bash
# Setup content with proper authentication

set -e

echo "🔧 Setting up content..."

# Load token from .env if exists
if [ -f .env ]; then
    source .env
fi

GIT_TOKEN="${GH_TOKEN:-}"
USE_SSH="${USE_SSH:-false}"

if [ "$USE_SSH" = "true" ]; then
    # Use SSH URLs
    ESSAYS_URL="git@github.com:tanyaacjain/stellar-curation.git"
    DOCS_URL="git@github.com:tanyaacjain/personal-penguin.git"
    echo "🔑 Using SSH authentication"
else
    if [ -z "$GIT_TOKEN" ]; then
        echo "❌ GH_TOKEN not found in .env"
        echo "   Either:"
        echo "   1. Add GH_TOKEN to .env file"
        echo "   2. Or set USE_SSH=true"
        echo "   3. Or use git credential helper"
        exit 1
    fi
    # Use token in URL
    ESSAYS_URL="https://${GIT_TOKEN}@github.com/tanyaacjain/stellar-curation.git"
    DOCS_URL="https://${GIT_TOKEN}@github.com/tanyaacjain/personal-penguin.git"
    echo "🔑 Using token authentication"
fi

# Add essays
echo "📝 Adding essays..."
git subtree add --prefix=essays "$ESSAYS_URL" main --squash

# Add docs
echo "📚 Adding docs..."
git subtree add --prefix=docs "$DOCS_URL" main --squash

echo "✅ Content setup complete!"
