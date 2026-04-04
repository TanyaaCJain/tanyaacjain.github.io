export type BlogLayout = 'essays' | 'work';

export interface BlogConfig {
  key: string;           // internal identifier
  routeBasePath: string; // URL base path + active link detection
  contentPath: string;   // filesystem directory (for docusaurus.config.ts)
  title: string;
  subheading: string;
  navLabel: string;
  layout: BlogLayout;
  styleKey?: string;     // if set, merges styles.{styleKey}.module.css over base
}

export const BLOGS: BlogConfig[] = [
  {
    key: 'writings',
    routeBasePath: 'writings',
    contentPath: './writings',
    title: 'Writings',
    subheading: 'Thoughts on living, thinking, and becoming',
    navLabel: 'Writings',
    layout: 'essays',
  },
  {
    key: 'tech',
    routeBasePath: 'tech',
    contentPath: './work',
    title: 'Tech',
    subheading: 'Projects, case studies, and experiments',
    navLabel: 'Tech',
    layout: 'work',
  },
  {
    key: 'design',
    routeBasePath: 'design',
    contentPath: './design',
    title: 'Design',
    subheading: 'Visual systems and interfaces with a point of view',
    navLabel: 'Design',
    layout: 'work',
    styleKey: 'design',
  },
];

export const FALLBACK_BLOG_KEY = 'writings';

// Nav items in display order (blogs + standalone pages)
export const NAV_ITEMS = [
  ...BLOGS.map(b => ({ label: b.navLabel, link: b.routeBasePath })),
  { label: 'About', link: 'about' },
];

export function getBlogConfigByPath(pathname: string): BlogConfig | undefined {
  return BLOGS.find(b => pathname.startsWith('/' + b.routeBasePath));
}
