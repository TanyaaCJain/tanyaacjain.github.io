# tanyaacjain.github.io

Personal website built using [Docusaurus](https://docusaurus.io/) with the Sawatdee Haneu theme.

## Architecture

This website uses a script-based build system that:
- Fetches blog content from private GitHub repositories during build time
- Generates static files to the `build/` directory
- Deploys to GitHub Pages
- Automatically rebuilds when content changes via webhooks

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

### 2. Configure Environment Variables

Edit `.env` file and add your credentials:

```env
# GitHub Personal Access Token with 'repo' scope
GH_TOKEN=ghp_your_token_here

# Repository details
GH_USER_NAME=tanyaacjain
GH_REPO_NAME=stellar-curation
```

Get a token at: https://github.com/settings/tokens (needs `repo` scope)

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
# Build with latest content from private repo
yarn build
```

This will:
1. Fetch essays from `stellar-curation/essays`
2. Build static site to `build/` directory

### 5. Deploy

```bash
# Deploy to GitHub Pages
yarn deploy
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn setup` | Initial project setup |
| `yarn dev` / `yarn start` | Start development server |
| `yarn build` | Fetch content and build site |
| `yarn deploy` | Deploy to GitHub Pages |
| `yarn fetch-essays` | Fetch content only (no build) |
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
├── blog/                    # Blog posts (populated during build)
├── docs/                    # Documentation pages
├── scripts/                 # Build and deployment scripts
│   ├── fetch-essays.ts      # Fetch content from private repo
│   ├── build.sh             # Build script
│   ├── deploy.sh            # Deployment script
│   └── setup.sh             # Project setup script
├── src/                     # React components and pages
├── static/                  # Static assets
├── .env                     # Environment variables (gitignored)
├── .env.example             # Environment variables template
└── docusaurus.config.ts     # Docusaurus configuration
```

## Automated Workflows

### 1. Deploy on Push (deploy.yml)

Automatically builds and deploys when you push to `main` branch.

**Trigger:** Push to `main` or manual trigger

**GitHub Secrets Required:**
- `GH_TOKEN` - GitHub token with repo access
- `GH_USER_NAME` - GitHub username
- `GH_REPO_NAME` - Private repo name

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

### Essays Not Fetching

- Verify `.env` file exists with `GH_TOKEN`
- Check token has `repo` scope
- Verify repository name is correct

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
