# tanyaacjain.github.io

Personal website built using [Docusaurus](https://docusaurus.io/) with the Sawatdee Haneu theme.

## Architecture

This website uses a git submodule-based build system that:
- Uses git submodules to include blog content from private GitHub repositories
- Configures sparse checkout to only get the `/essays/` directory (not entire repo)
- Syncs content during build time to the `blog/` directory
- Generates static files to the `build/` directory
- Deploys to GitHub Pages
- Automatically rebuilds when content changes via webhooks
- Maintains version control through submodule commit tracking

### Content Flow

```
stellar-curation (private repo)
└── essays/
    └── *.md files          → Essays source

                ↓ (git submodule with sparse checkout)

essays/stellar-curation/ (submodule)
└── essays/
    └── *.md files          → Sparse checkout maintains directory structure

                ↓ (sync-content.sh copies files)

essays/*.md files           → Where Docusaurus reads essays

                ↓ (docusaurus build)

build/                      → Static site output
```

## Prerequisites

- Node.js 22+ (managed via nvm)
- Yarn package manager
- GitHub Personal Access Token (for private content fetching)

## Quick Start

### 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/tanyaacjain/tanyaacjain.github.io.git
cd tanyaacjain.github.io

# Run setup script
yarn setup
```

The setup script will:
- Configure Node.js 22
- Create `.env` file from template
- Install dependencies
- Make scripts executable

### 2. Configure Environment Variables (Optional for Private Repos)

If using private repositories, edit `.env` file and add your credentials:

```env
# GitHub Personal Access Token with 'repo' scope (for private repos)
GH_TOKEN=ghp_your_token_here

# Repository details
GH_USER_NAME=tanyaacjain
GH_REPO_NAME=stellar-curation
```

Get a token at: https://github.com/settings/tokens (needs `repo` scope for private repos)

### 3. Development

```bash
# Start development server
yarn dev
# or
yarn start
```

Development server runs at http://localhost:3000

### 4. Build

```bash
# Build with latest content from submodule
yarn build
```

This will:
1. Update submodule to latest commit
2. Copy essays from `essays/stellar-curation/essays/` to `essays/` directory (where Docusaurus reads them)
3. Build static site to `build/` directory

**Note:** The submodule uses sparse checkout to only get the `/essays/` directory from stellar-curation. Git maintains the directory structure, so essays appear at `essays/stellar-curation/essays/*.md`, then get copied to `essays/*.md` for Docusaurus.

### 5. Deploy

```bash
# Deploy to GitHub Pages
yarn deploy
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn setup` | Initial project setup (includes submodule init) |
| `yarn dev` / `yarn start` | Start development server |
| `yarn build` | Sync content from submodule and build site |
| `yarn deploy` | Deploy to GitHub Pages |
| `yarn init-submodules` | Initialize git submodules for blog content |
| `yarn sync-essays` | Sync content from submodule only (no build) |
| `yarn serve` | Preview production build locally |

See [`scripts/README.md`](scripts/README.md) for detailed script documentation.

## Project Structure

```
tanyaacjain.github.io/
├── .github/
│   └── workflows/           # GitHub Actions workflows
│       ├── deploy.yml       # Auto-deploy on push to main
│       ├── rebuild-on-webhook.yml  # Rebuild when content changes
│       └── trigger-website-rebuild.yml.template  # Template for content repos
├── docs/                    # Documentation pages
├── essays/                  # Essays directory (Docusaurus blog)
│   ├── stellar-curation/    # Git submodule (with sparse checkout)
│   │   └── essays/          # Essays directory (sparse checkout of /essays/ only)
│   │       └── *.md         # Essay markdown files from stellar-curation/essays/
│   └── *.md                 # Essay files (synced from stellar-curation/essays/, gitignored)
├── scripts/                 # Build and deployment scripts
│   ├── init-submodules.sh   # Initialize submodules with sparse checkout
│   ├── sync-content.sh       # Sync from essays/stellar-curation/essays/ to essays/
│   ├── build.sh             # Build script
│   ├── deploy.sh            # Deployment script
│   └── setup.sh             # Project setup script
├── src/                     # React components and pages
├── static/                  # Static assets
├── .env                     # Environment variables (gitignored)
├── .env.example             # Environment variables template
├── .gitmodules              # Git submodules configuration
└── docusaurus.config.ts     # Docusaurus configuration
```

## Automated Workflows

### 1. Deploy on Push (deploy.yml)

Automatically builds and deploys when you push to `main` branch.

**Trigger:** Push to `main` or manual trigger

**GitHub Secrets Required:**
- `GH_TOKEN` - GitHub token with repo access (for checking out private submodules)

### 2. Rebuild on Content Change (rebuild-on-webhook.yml)

Automatically rebuilds when content changes in private repositories.

**Trigger:** Repository dispatch event (`content-updated`)

**Setup:** Add webhook workflow to your content repositories using the template at `.github/workflows/trigger-website-rebuild.yml.template`

See [`.github/workflows/README.md`](.github/workflows/README.md) for detailed workflow documentation.

## Setting Up Content Repository Webhooks

To automatically rebuild when essays change:

1. Copy the template workflow to your content repo:
   ```bash
   cp .github/workflows/trigger-website-rebuild.yml.template \
      path/to/stellar-curation/.github/workflows/trigger-website-rebuild.yml
   ```

2. Add `WEBSITE_REBUILD_TOKEN` secret to content repository:
   - Go to content repo Settings → Secrets → Actions
   - Add secret with GitHub token having `repo` scope for this website

3. Push changes - website will auto-rebuild on content updates!

## Deployment

### Manual Deployment

```bash
yarn build
yarn deploy
```

### Automatic Deployment

The website automatically deploys via GitHub Actions:
- On every push to `main`
- When webhook is triggered from content repos
- Manual workflow dispatch

View deployments: https://github.com/tanyaacjain/tanyaacjain.github.io/actions

Live site: https://www.jaintanya.com

## Troubleshooting

### Submodule Not Initializing

- Verify `.env` file exists with `GH_TOKEN` (for private repos)
- Check token has `repo` scope
- Run `yarn init-submodules` manually
- Verify submodule repository exists and is accessible

### Essays Not Syncing

- Ensure submodule is initialized (`essays/stellar-curation/` directory exists)
- Run `yarn sync-essays` manually
- Check that essays exist in the submodule repository at `/essays/` directory
- Verify sparse checkout is configured: `cat essays/stellar-curation/.git/info/sparse-checkout`

### Build Failures

- Run `yarn install` to update dependencies
- Check Node.js version is 22 (`node --version`)
- Review build logs for specific errors

### Deployment Issues

- Ensure you've run `yarn build` first
- Check git credentials are configured
- Verify you have write access to repository

## Documentation

- [Scripts Documentation](scripts/README.md)
- [Workflows Documentation](.github/workflows/README.md)
- [Docusaurus Documentation](https://docusaurus.io/)

## Tech Stack

- **Framework:** Docusaurus 3.4.0
- **Language:** TypeScript
- **Styling:** CSS, Tailwind CSS
- **Theme:** Sawatdee Haneu
- **Package Manager:** Yarn
- **Deployment:** GitHub Pages
- **CI/CD:** GitHub Actions
