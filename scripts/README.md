# Build Scripts

This directory contains scripts for project setup, building, and deployment.

## Scripts Overview

### `setup.sh` - Project Setup

Initializes the project environment.

**Usage:**
```bash
./scripts/setup.sh
# or
yarn setup
```

**What it does:**
1. Loads nvm (if available)
2. Sets Node.js version to 22
3. Creates `.env` file from `.env.example` (if not exists)
4. Installs dependencies with yarn
5. Makes all scripts executable

**When to use:**
- First time setting up the project
- After cloning the repository
- When resetting your development environment

---

### `init-submodules.sh` - Initialize Git Submodules

Initializes the essays directory as a git submodule from a private repository.

**Usage:**
```bash
./scripts/init-submodules.sh
# or
yarn init-submodules
```

**Environment Variables Required:**
- `GH_TOKEN` - GitHub Personal Access Token with `repo` scope (for private repos)
- `GH_USER_NAME` - GitHub username (default: `tanyaacjain`)
- `GH_REPO_NAME` - Repository name (default: `stellar-curation`)

**What it does:**
1. Loads environment variables from `.env`
2. Checks if submodule already exists
3. Adds the private repository as a git submodule at `essays/stellar-curation/`
4. Configures sparse checkout to only get the `/essays/` directory
5. Uses authenticated URL with token for private repos

**Output:**
- Git submodule configured at `essays/stellar-curation/`
- Sparse checkout configured (only `/essays/` directory is checked out)
- Essays appear at `essays/stellar-curation/essays/*.md` (git maintains directory structure)
- `.gitmodules` file created/updated

**Note:** Sparse checkout pattern `essays/*` ensures only the essays directory from stellar-curation is checked out, not the entire repo. This reduces clone size and focuses on just the content we need.

---

### `sync-content.sh` - Sync Content from Submodule

Updates the submodule and syncs essay files to the blog directory.

**Usage:**
```bash
./scripts/sync-content.sh
# or
yarn sync:content
```

**What it does:**
1. Checks if submodule is initialized
2. Updates submodule to latest commit (`git submodule update --remote`)
3. Copies markdown files from `essays/stellar-curation/essays/` to `essays/` root
   - `essays/stellar-curation/` = stellar-curation repo (submodule with sparse checkout)
   - `essays/stellar-curation/essays/` = essays directory within that repo
4. Reports number of essays synced

**Output:**
- Updated submodule content in `essays/stellar-curation/`
- Essay files copied from `essays/stellar-curation/essays/` to `essays/` directory (where Docusaurus expects them)

---

### `build.sh` - Build Static Site

Syncs content from submodule and builds the Docusaurus static site.

**Usage:**
```bash
./scripts/build.sh
# or
yarn build:with-content
```

**What it does:**
1. Runs `sync-content.sh` to get latest content from submodule
2. Runs `docusaurus build` to create static site
3. Generates static files in `build/` directory

**Prerequisites:**
- Git submodule initialized (`essays/stellar-curation/` exists)
- Dependencies installed (`yarn install`)

**Output:**
- Static site files in `build/` directory

---

### `deploy.sh` - Deploy to GitHub Pages

Deploys the built site to GitHub Pages.

**Usage:**
```bash
./scripts/deploy.sh
# or
yarn deploy:with-content
```

**What it does:**
1. Checks if `build/` directory exists
2. Configures git user (if not set)
3. Deploys to gh-pages branch using Docusaurus deploy command

**Prerequisites:**
- Site must be built first (`yarn build:with-content`)
- Git credentials configured
- Write access to repository

**Environment Variables:**
- `GIT_USER` - Set to `tanyaacjain` (configured in script)
- `USE_SSH` - Set to `false` (uses HTTPS)

---

## Common Workflows

### Development
```bash
# Initial setup
yarn setup

# Start development server (no fetch needed)
yarn dev:with-content
```

### Production Build
```bash
# Build with latest content
yarn build:with-content

# Preview the build
yarn serve
```

### Manual Deployment
```bash
# Build and deploy
yarn build:with-content
yarn deploy
```

### Sync Content Only
```bash
# Just sync essays from submodule without building
yarn sync:content
```

### Update Submodule to Latest
```bash
# Pull latest changes in submodule
cd blog/essays
git pull origin main
cd ../..
# Then sync to blog directory
yarn sync:content
```

## Environment Variables

Create a `.env` file in the project root:

```env
# GitHub Personal Access Token
GH_TOKEN=ghp_your_token_here

# GitHub repository details
GH_USER_NAME=tanyaacjain
GH_REPO_NAME=stellar-curation
```

### Getting a GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Website Blog Fetcher")
4. Select scopes: `repo` (Full control of private repositories)
5. Click "Generate token"
6. Copy the token and add to `.env` file

**Important:** Never commit `.env` file to git. It's already in `.gitignore`.

## Troubleshooting

### "Submodule not initialized"
- Run `yarn init-submodules` to initialize submodules
- Ensure `.env` file exists with `GH_TOKEN` (for private repos)
- Verify `GH_TOKEN` has `repo` scope
- Check repository exists and is accessible

### "No essays found in essays/stellar-curation/essays/"
- Verify essays exist in the submodule repository at `/essays/` directory
- Check that markdown files are in the `essays/` directory of stellar-curation repo
- Run `git submodule update --remote essays/stellar-curation` to pull latest
- Ensure submodule is pointing to correct branch
- Verify directory structure: `essays/stellar-curation/essays/*.md`
- Check sparse checkout config: `git -C essays/stellar-curation sparse-checkout list`

### "Build directory not found" (during deploy)
- Run `yarn build` before `yarn deploy`
- Check build completed successfully

### Permission denied on scripts
- Run: `chmod +x scripts/*.sh`
- Or use yarn commands instead

## Script Execution Flow

```
setup.sh
  └─> Creates .env
  └─> Installs dependencies
  └─> init-submodules.sh
        └─> Adds git submodule at essays/stellar-curation/
        └─> Configures sparse checkout (cone mode)
        └─> Only checks out essays/ directory

build.sh
  └─> sync-content.sh
  │     └─> Updates submodule (git submodule update --remote)
  │     └─> Copies *.md files from essays/stellar-curation/essays/ to essays/
  └─> docusaurus build
        └─> Processes essays/ content
        └─> Generates build/ directory

deploy.sh
  └─> Checks build/ exists
  └─> docusaurus deploy
        └─> Pushes to gh-pages branch
```

## CI/CD Integration

These scripts are used in GitHub Actions workflows:

- **deploy.yml**: Checks out submodules → runs `sync-content` → `build` → deploys
- **rebuild-on-webhook.yml**: Triggered by content updates, checks out submodules → runs `sync-content` → `build` → deploys

GitHub Actions automatically checks out submodules using:
```yaml
- uses: actions/checkout@v4
  with:
    submodules: 'recursive'
    token: ${{ secrets.GH_TOKEN }}
```

See `.github/workflows/README.md` for workflow documentation.
