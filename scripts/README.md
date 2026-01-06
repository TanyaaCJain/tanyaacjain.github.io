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

### `fetch-essays.ts` - Fetch Content from Private Repository

Fetches markdown essays from a private GitHub repository.

**Usage:**
```bash
tsx scripts/fetch-essays.ts
# or
yarn fetch-essays
```

**Environment Variables Required:**
- `GH_TOKEN` - GitHub Personal Access Token with `repo` scope
- `GH_USER_NAME` - GitHub username (default: `tanyaacjain`)
- `GH_REPO_NAME` - Repository name (default: `stellar-curation`)

**What it does:**
1. Loads environment variables from `.env`
2. Fetches list of markdown files from `essays/` directory in private repo
3. Downloads each markdown file
4. Saves files to `blog/` directory
5. Reports success/failure for each file

**Output:**
- Markdown files saved to `blog/` directory
- Console logs showing progress and results

---

### `build.sh` - Build Static Site

Fetches content and builds the Docusaurus static site.

**Usage:**
```bash
./scripts/build.sh
# or
yarn build
```

**What it does:**
1. Runs `fetch-essays.ts` to get latest content
2. Runs `docusaurus build` to create static site
3. Generates static files in `build/` directory

**Prerequisites:**
- `.env` file configured with GitHub credentials
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
yarn deploy
```

**What it does:**
1. Checks if `build/` directory exists
2. Configures git user (if not set)
3. Deploys to gh-pages branch using Docusaurus deploy command

**Prerequisites:**
- Site must be built first (`yarn build`)
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
yarn dev
# or
yarn start
```

### Production Build
```bash
# Build with latest content
yarn build

# Preview the build
yarn serve
```

### Manual Deployment
```bash
# Build and deploy
yarn build
yarn deploy
```

### Fetch Content Only
```bash
# Just fetch essays without building
yarn fetch-essays
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

### "GH_TOKEN not found"
- Ensure `.env` file exists in project root
- Verify `GH_TOKEN` is set correctly
- Check token has `repo` scope

### "Failed to download file"
- Verify token has access to private repository
- Check repository name and username are correct
- Ensure `essays/` directory exists in private repo

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

build.sh
  └─> fetch-essays.ts
  │     └─> Downloads from GitHub API
  │     └─> Saves to blog/
  └─> docusaurus build
        └─> Processes blog/ content
        └─> Generates build/ directory

deploy.sh
  └─> Checks build/ exists
  └─> docusaurus deploy
        └─> Pushes to gh-pages branch
```

## CI/CD Integration

These scripts are used in GitHub Actions workflows:

- **deploy.yml**: Runs `fetch-essays` → `build:docusaurus` → deploys
- **rebuild-on-webhook.yml**: Triggered by content updates, runs same flow

See `.github/workflows/README.md` for workflow documentation.
