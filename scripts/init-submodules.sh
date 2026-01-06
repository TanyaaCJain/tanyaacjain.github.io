#!/bin/bash

# Initialize Content Directories
# Uses modern sparse checkout WITHOUT submodules

set -e

echo "🚀 Setting up content directories..."

# Load environment
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

REPO_OWNER="${GH_USER_NAME:-tanyaacjain}"
GH_TOKEN="${GH_TOKEN}"

# Repository configurations
declare -A REPOS=(
    ["stellar-curation"]="essays"
    ["personal-penguin"]=""
)

echo "📦 Fetching content from private repositories..."

for repo_name in "${!REPOS[@]}"; do
    sparse_path="${REPOS[$repo_name]}"
    
    echo ""
    echo "🔗 Fetching: $repo_name"
    
    # Remove existing content
    rm -rf "temp-$repo_name"
    
    # Construct URL with token
    if [ -n "$GH_TOKEN" ]; then
        repo_url="https://${GH_TOKEN}@github.com/${REPO_OWNER}/${repo_name}.git"
    else
        repo_url="https://github.com/${REPO_OWNER}/${repo_name}.git"
    fi
    
    # Modern sparse clone approach
    echo "   📥 Cloning with sparse checkout..."
    git clone --filter=blob:none --sparse "$repo_url" "temp-$repo_name"
    
    cd "temp-$repo_name"
    
    if [ -n "$sparse_path" ]; then
        echo "   🎯 Setting sparse checkout to: $sparse_path"
        git sparse-checkout set "$sparse_path"
    else
        echo "   📚 Full repository checkout"
    fi
    
    # Pull latest
    git pull origin main
    
    cd ..
    
    echo "   ✅ $repo_name fetched"
done

echo ""
echo "✨ Content directories ready in temp-* folders"
