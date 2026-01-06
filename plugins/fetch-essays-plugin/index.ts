import type { LoadContext, Plugin } from '@docusaurus/types';
import https from 'https';
import fs from 'fs';
import path from 'path';

interface GitHubFile {
  name: string;
  type: string;
  download_url: string;
  path: string;
}

// Manually load .env file
function loadEnvFile(siteDir: string): void {
  const envPath = path.join(siteDir, '.env');
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

const ESSAYS_DIR = 'essays';

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

function cleanBlogDirectory(blogDir: string): void {
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const stat = fs.statSync(filePath);

      // Remove placeholder posts and the welcome directory
      if (file.startsWith('2019-') || file.startsWith('2021-') || file === 'authors.yml' || file === 'tags.yml') {
        if (stat.isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
        console.log(`🗑️  Removed placeholder: ${file}`);
      }
    }
  } else {
    fs.mkdirSync(blogDir, { recursive: true });
  }
}

async function fetchEssays(blogDir: string): Promise<void> {
  const GH_TOKEN = process.env.GH_TOKEN;
  const REPO_OWNER = process.env.GH_USER_NAME || 'tanyaacjain';
  const REPO_NAME = process.env.GH_REPO_NAME || 'stellar-curation';

  if (!GH_TOKEN) {
    console.warn('⚠️  GH_TOKEN not found. Skipping essay fetch.');
    console.warn('   Set GH_TOKEN in Codespaces secrets or GitHub Actions secrets to fetch private essays.');
    return;
  }

  try {
    console.log(`📝 Fetching essays from ${REPO_OWNER}/${REPO_NAME}/${ESSAYS_DIR}...`);

    // Clean placeholder content
    cleanBlogDirectory(blogDir);

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

module.exports = async function fetchEssaysPlugin(context: LoadContext): Promise<Plugin> {
  // Load environment variables from .env file
  loadEnvFile(context.siteDir);

  const blogDir = path.join(context.siteDir, 'blog');
  const token = process.env.GH_TOKEN;

  console.log('🔍 Checking for GH_TOKEN...', token ? '✅ Found' : '❌ Not found');

  // Fetch essays immediately when plugin loads
  await fetchEssays(blogDir);

  return {
    name: 'fetch-essays-plugin',
  };
};
