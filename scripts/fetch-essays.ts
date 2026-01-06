#!/usr/bin/env node
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

interface GitHubFile {
  name: string;
  type: string;
  download_url: string;
  path: string;
}

// Load environment variables from .env file
function loadEnvFile(rootDir: string): void {
  const envPath = path.join(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value;
        }
      }
    });
  }
}

function makeGitHubRequest(apiPath: string): Promise<GitHubFile[]> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: apiPath,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.GH_TOKEN}`,
        'User-Agent': 'tanyaacjain-blog-fetcher',
        'Accept': 'application/vnd.github+json'
      }
    };

    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} - ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function downloadFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Authorization': `Bearer ${process.env.GH_TOKEN}`,
        'User-Agent': 'tanyaacjain-blog-fetcher',
        'Accept': 'application/vnd.github.raw'
      }
    };

    https.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Failed to download file: ${res.statusCode}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function fetchEssays(blogDir: string): Promise<void> {
  const GH_TOKEN = process.env.GH_TOKEN;
  const REPO_OWNER = process.env.GH_USER_NAME || 'tanyaacjain';
  const REPO_NAME = process.env.GH_REPO_NAME || 'stellar-curation';
  const ESSAYS_DIR = 'essays';

  if (!GH_TOKEN) {
    console.warn('⚠️  GH_TOKEN not found. Skipping essay fetch.');
    console.warn('   Set GH_TOKEN environment variable to fetch private essays.');
    console.warn('   You can also set it in GitHub Actions secrets.');
    return;
  }

  try {
    console.log(`📝 Fetching essays from ${REPO_OWNER}/${REPO_NAME}/${ESSAYS_DIR}...`);

    // Ensure blog directory exists
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    // Fetch the contents of the essays directory
    const contents = await makeGitHubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${ESSAYS_DIR}`);

    if (!Array.isArray(contents)) {
      throw new Error('Expected array of files from GitHub API');
    }

    // Filter for markdown files
    const markdownFiles = contents.filter(file =>
      file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.mdx'))
    );

    console.log(`📦 Found ${markdownFiles.length} essay(s) to fetch`);

    // Download each markdown file
    for (const file of markdownFiles) {
      console.log(`   ⬇️  Downloading: ${file.name}`);
      const content = await downloadFile(file.download_url);

      const targetPath = path.join(blogDir, file.name);
      fs.writeFileSync(targetPath, content, 'utf8');
      console.log(`   ✅ Saved: ${file.name}`);
    }

    console.log(`✨ Successfully fetched ${markdownFiles.length} essay(s)!`);
  } catch (error) {
    console.error('❌ Error fetching essays:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// Main execution
async function main() {
  // Get project root directory (parent of scripts dir)
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const rootDir = path.resolve(scriptDir, '..');

  // Load environment variables
  loadEnvFile(rootDir);

  // Determine target directory based on build phase
  // During build, write to blog directory which gets included in static build
  const blogDir = path.join(rootDir, 'blog');

  console.log('🚀 Starting essay fetch process...');
  console.log(`📁 Target directory: ${blogDir}`);

  await fetchEssays(blogDir);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
