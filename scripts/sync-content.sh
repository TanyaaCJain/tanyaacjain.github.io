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

if [ "$USE_SSH" = "true" ]; then
    ESSAYS_URL="git@github.com:tanyaacjain/stellar-curation.git"
    DOCS_URL="git@github.com:tanyaacjain/personal-penguin.git"
else
    if [ -z "$GIT_TOKEN" ]; then
        echo "❌ GH_TOKEN required"
        exit 1
    fi
    ESSAYS_URL="https://${GIT_TOKEN}@github.com/tanyaacjain/stellar-curation.git"
    DOCS_URL="https://${GIT_TOKEN}@github.com/tanyaacjain/personal-penguin.git"
fi

# Update essays
echo "📝 Updating essays..."
git subtree pull --prefix=essays "$ESSAYS_URL" main --squash

# Update docs
echo "📚 Updating docs..."
git subtree pull --prefix=docs "$DOCS_URL" main --squash

echo "✅ Content updated!"
