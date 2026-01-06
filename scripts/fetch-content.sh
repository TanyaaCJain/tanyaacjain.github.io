# Validate token
if [[ -z "$GH_TOKEN" ]]; then
    error "GH_TOKEN is required. Set it in .env file or export as environment variable."
fi

mkdir -p essays
curl -s -H "Authorization: token $GH_TOKEN" \
https://raw.githubusercontent.com/tanyaacjain/stellar-curation/main/essays/ \
| grep -o 'href="\K[^"]+\.md' | while read file; do
    curl -s -H "Authorization: token $GH_TOKEN" \
        "https://raw.githubusercontent.com/tanyaacjain/stellar-curation/main/essays/$file" \
        -o "essays/$file"
done


mkdir -p docs
# Simple recursive fetch using GitHub API
curl -s -H "Authorization: token $GH_TOKEN" \
    "https://api.github.com/repos/tanyaacjain/personal-penguin/git/trees/main?recursive=1" \
    | jq -r '.tree[] | select(.path | endswith(".md") or endswith(".mdx")) | .path' \
    | while read path; do
    mkdir -p "docs/$(dirname "$path")"
    curl -s -H "Authorization: token $GH_TOKEN" \
    "https://raw.githubusercontent.com/tanyaacjain/personal-penguin/main/$path" \
    -o "docs/$path"
done

