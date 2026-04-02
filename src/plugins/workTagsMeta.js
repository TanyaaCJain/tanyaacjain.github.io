/**
 * workTagsMeta.js
 *
 * Reads work/tags.yml at build time and exposes each tag's description via
 * Docusaurus global data so the WorkListPage can look up section blurbs
 * without importing from the filesystem at runtime.
 *
 * Access in components:
 *   import { usePluginData } from '@docusaurus/useGlobalData';
 *   const tagsMeta = usePluginData('work-tags-meta');
 *   tagsMeta['tech']?.description  // → string | undefined
 */

const path = require('path');
const fs   = require('fs');

/**
 * Minimal YAML parser for the flat tags.yml structure:
 *   key:
 *     label: ...
 *     permalink: ...
 *     description: ...
 */
function parseTagsYaml(content) {
  const result  = {};
  let current   = null;

  for (const raw of content.split('\n')) {
    const line = raw.replace(/\r$/, '');

    // Top-level key (no leading spaces, ends with colon)
    const top = line.match(/^([A-Za-z0-9_-]+):\s*$/);
    if (top) {
      current = top[1];
      result[current] = {};
      continue;
    }

    // Field under current key (2 spaces indent)
    if (current) {
      const field = line.match(/^  ([A-Za-z0-9_-]+):\s*(.*)/);
      if (field) {
        result[current][field[1]] = field[2].trim();
      }
    }
  }

  return result;
}

module.exports = function workTagsMetaPlugin(context) {
  return {
    name: 'work-tags-meta',

    async loadContent() {
      const tagsFile = path.join(context.siteDir, 'work', 'tags.yml');
      if (!fs.existsSync(tagsFile)) return {};
      return parseTagsYaml(fs.readFileSync(tagsFile, 'utf-8'));
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
