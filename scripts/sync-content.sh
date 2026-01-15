#!/bin/bash
# Update content with authentication

set -e

echo "🔄 Updating content..."

# Load configuration
if [ -f .env ]; then
    source .env
fi

GIT_TOKEN="${GH_TOKEN:-}"
USE_SSH="${USE_SSH:-false}"

GIT_PREFIX="git"

if [ "$USE_SSH" = "false" ]; then
    if [ -z "$GIT_TOKEN" ]; then
        echo "❌ GH_TOKEN required"
        exit 1
    fi
    GIT_PREFIX="https://${GIT_TOKEN}"
fi

ESSAYS_URL="${GIT_PREFIX}@github.com/tanyaacjain/essays.git"
DOCS_URL="${GIT_PREFIX}@github.com/tanyaacjain/personal-penguin.git"

# Update essays
echo "📝 Updating essays..."
git subtree pull --prefix=essays "$ESSAYS_URL" main --squash

# Update docs
echo "📚 Updating docs..."
git subtree pull --prefix=docs "$DOCS_URL" main --squash

echo "✅ Content updated!"
