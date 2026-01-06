# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated deployment and content synchronization.

## Workflows

### 1. `deploy.yml` - Main Deployment Workflow

**Trigger:** Runs on every push to `main` branch or manual trigger

**What it does:**
1. Checks out the repository
2. Sets up Node.js 22
3. Installs dependencies
4. Fetches essays from private repository
5. Builds the Docusaurus site
6. Deploys to GitHub Pages

### 2. `rebuild-on-webhook.yml` - Webhook-Triggered Rebuild

**Trigger:** Runs when a `repository_dispatch` event with type `content-updated` is received

**What it does:**
1. Logs webhook information
2. Checks out the repository
3. Sets up Node.js 22
4. Installs dependencies
5. Fetches latest essays from private repository
6. Rebuilds the Docusaurus site
7. Deploys updated site to GitHub Pages

## Setup Instructions

### Step 1: Configure GitHub Secrets

Add these secrets to your repository (`Settings` → `Secrets and variables` → `Actions`):

1. **GH_TOKEN** - Personal Access Token with `repo` scope
   - Create at: https://github.com/settings/tokens
   - Required scopes: `repo` (Full control of private repositories)

2. **GH_USER_NAME** - GitHub username (e.g., `tanyaacjain`)

3. **GH_REPO_NAME** - Private repository name containing essays (e.g., `stellar-curation`)

### Step 2: Set Up Webhooks in Private Repositories

To enable automatic rebuilds when content changes in your private repositories:

#### For each private content repository:

1. Go to repository `Settings` → `Webhooks` → `Add webhook`

2. Configure the webhook:
   - **Payload URL**: Use GitHub Actions repository dispatch endpoint
   - **Content type**: `application/json`
   - **Secret**: (Optional) Add a secret for security
   - **Events**: Select "Just the push event"

3. Use this curl command format (can be automated via GitHub Actions in the source repo):

```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/tanyaacjain/tanyaacjain.github.io/dispatches \
  -d '{
    "event_type": "content-updated",
    "client_payload": {
      "repository": "your-private-repo-name",
      "event_type": "push",
      "sender": "username"
    }
  }'
```

### Step 3: Automate Webhook Trigger from Private Repos

Add this workflow to your **private content repositories** (e.g., `stellar-curation`):

Create `.github/workflows/trigger-website-rebuild.yml`:

```yaml
name: Trigger Website Rebuild

on:
  push:
    branches:
      - main
    paths:
      - 'essays/**'

jobs:
  trigger-rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger website rebuild
        run: |
          curl -X POST \
            -H "Accept: application/vnd.github.v3+json" \
            -H "Authorization: token ${{ secrets.WEBSITE_REBUILD_TOKEN }}" \
            https://api.github.com/repos/tanyaacjain/tanyaacjain.github.io/dispatches \
            -d '{
              "event_type": "content-updated",
              "client_payload": {
                "repository": "${{ github.repository }}",
                "event_type": "${{ github.event_name }}",
                "sender": "${{ github.actor }}"
              }
            }'
```

**Note:** Add `WEBSITE_REBUILD_TOKEN` secret to your private repository with a GitHub token that has `repo` scope for the website repository.

## Testing

### Test Main Deploy Workflow
```bash
# Push to main branch
git push origin main
```

### Test Webhook Rebuild (Manual)
```bash
# Trigger via GitHub CLI
gh workflow run rebuild-on-webhook.yml

# Or via API
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/tanyaacjain/tanyaacjain.github.io/dispatches \
  -d '{"event_type": "content-updated"}'
```

## Monitoring

- View workflow runs: `Actions` tab in GitHub repository
- Check logs for each step
- Verify deployment at: https://www.jaintanya.com

## Troubleshooting

### Essays Not Fetching
- Verify `GH_TOKEN` secret has `repo` scope
- Check `GH_USER_NAME` and `GH_REPO_NAME` are correct
- Review fetch-essays.ts logs in workflow run

### Deployment Failing
- Check build logs in Actions tab
- Verify all dependencies installed correctly
- Ensure gh-pages branch has correct permissions

### Webhook Not Triggering
- Verify webhook is configured in source repository
- Check webhook delivery logs in source repo settings
- Ensure `WEBSITE_REBUILD_TOKEN` has correct permissions
