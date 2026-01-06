#!/bin/bash

# fetch_content.sh
# Fetch content from private repositories with recursive directory copying.
# Follows Python-style readability principles.

set -eo pipefail

log() {
    echo "📥 $*"
}

error() {
    echo "❌ Error: $*" >&2
    exit 1
}

fetch_repo() {
    local repo_name="$1"
    local sparse_path="$2"
    local target_dir="$3"
    
    log "Fetching $repo_name → $target_dir"
    
    # Clean up existing directories
    rm -rf "$target_dir" "temp-$repo_name"
    
    # Clone with sparse checkout
    git clone --filter=blob:none --sparse --depth=1 \
        "https://${GH_TOKEN}@github.com/${REPO_OWNER}/${repo_name}.git" \
        "temp-$repo_name"
    
    cd "temp-$repo_name"
    
    if [[ -n "$sparse_path" ]]; then
        git sparse-checkout set "$sparse_path"
    fi
    
    cd ..
    
    # Copy recursively, excluding hidden files
    mkdir -p "$target_dir"
    
    if [[ -n "$sparse_path" ]]; then
        # Use find + cp for recursive copy excluding hidden files
        find "temp-$repo_name/$sparse_path" -type f ! -name '.*' -exec cp --parents {} "$target_dir" \;
    else
        # Copy entire repo, excluding .git directory
        find "temp-$repo_name" -type f ! -name '.*' -exec cp --parents {} "$target_dir" \;
    fi
    
    # Clean up temp directory
    rm -rf "temp-$repo_name"
}

count_markdown_files() {
    local dir="$1"
    find "$dir" -type f \( -name "*.md" -o -name "*.mdx" \) 2>/dev/null | wc -l
}

main() {
    log "Fetching latest content..."
    
    # Configuration
    REPO_OWNER="${GH_USER_NAME:-tanyaacjain}"
    GH_TOKEN="${GH_TOKEN:-}"
    
    # Validate token
    if [[ -z "$GH_TOKEN" ]]; then
        error "GH_TOKEN is required. Set it in .env file or export as environment variable."
    fi
    
    # Fetch repositories
    fetch_repo "stellar-curation" "essays" "essays"
    fetch_repo "personal-penguin" "" "docs"
    
    # Summary
    echo ""
    echo "✨ Content fetched:"
    echo "   - Essays: essays/ ($(count_markdown_files essays) files)"
    echo "   - Docs: docs/ ($(count_markdown_files docs) files)"
}

# Run main function
main
