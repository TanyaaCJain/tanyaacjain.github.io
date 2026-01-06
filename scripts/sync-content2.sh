#!/bin/bash

# Sync Content to Final Locations
# Moves content directly to essays/ and docs/

set -e

echo "🔄 Syncing content to final locations..."

# Update repositories first
echo "📥 Updating repositories..."
bash scripts/init-content.sh

# Sync stellar-curation essays
echo "📝 Syncing essays..."
if [ -d "temp-stellar-curation/essays" ]; then
    # Clean essays directory
    rm -rf essays
    mkdir -p essays
    
    # Copy essays (or create symlinks)
    cp -r "temp-stellar-curation/essays"/*.md "temp-stellar-curation/essays"/*.mdx essays/ 2>/dev/null || true
    
    ESSAY_COUNT=$(find essays -maxdepth 1 -type f \( -name "*.md" -o -name "*.mdx" \) | wc -l | tr -d ' ')
    echo "   ✅ Copied $ESSAY_COUNT essay(s)"
else
    echo "   ⚠️  No essays found in stellar-curation"
fi

# Sync personal-penguin docs
echo "📚 Syncing docs..."
if [ -d "temp-personal-penguin" ]; then
    # Clean docs directory
    rm -rf docs
    mkdir -p docs
    
    # Copy entire repo
    cp -r "temp-personal-penguin/." docs/
    
    # Remove .git if copied
    rm -rf docs/.git 2>/dev/null || true
    
    DOC_COUNT=$(find docs -name "*.md" -o -name "*.mdx" | wc -l | tr -d ' ')
    echo "   ✅ Copied repository with $DOC_COUNT markdown files"
else
    echo "   ⚠️  No personal-penguin directory found"
fi

# Cleanup temp directories (optional)
echo "🧹 Cleaning up temporary directories..."
rm -rf temp-*

echo ""
echo "✨ Content synced!"
echo "   - Essays: essays/*.md"
echo "   - Docs: docs/*"
