import {themes as prismThemes} from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { BLOGS } from './src/config/blogs';

const techBlog   = BLOGS.find(b => b.key === 'tech')!;
const designBlog = BLOGS.find(b => b.key === 'design')!;

const config: Config = {
  title: 'Tanya Jain',
  tagline: 'Personal Website',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.jaintanya.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tanyaacjain', // Usually your GitHub org/user name.
  projectName: 'tanyaacjain.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,700;0,6..12,800;1,6..12,400;1,6..12,600;1,6..12,800&family=Nunito:wght@300&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,600;0,700;1,700&family=Tangerine:wght@400;700&family=Libre+Franklin:wght@500;600;700&family=Karla:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap',
      },
    },
  ],
  presets: [
    [
      'classic',
      {
        // docs: {
        //   routeBasePath: '/docs',
        //   path: './docs',
        //   sidebarPath: './sidebars.ts',
        // },
        docs: false,
        blog: {
          id: 'default',
          path: 'writings',
          routeBasePath: 'writings',
          showReadingTime: true,
        },
        theme: {
          customCss: [
            './src/css/custom.css',
          ]
        },
        gtag: {
          trackingID: 'G-65S284K0XJ',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: `${techBlog.key}-blog`,
        routeBasePath: techBlog.routeBasePath,
        path: techBlog.contentPath,
        showReadingTime: true,
        postsPerPage: 'ALL',
      },
    ],
    // Uncomment when ./design directory exists:
    [
      '@docusaurus/plugin-content-blog',
      {
        id: `${designBlog.key}-blog`,
        routeBasePath: designBlog.routeBasePath,
        path: designBlog.contentPath,
        showReadingTime: true,
        postsPerPage: 'ALL',
      },
    ],
    require.resolve('./src/plugins/workTagsMeta'),
  ],
  themeConfig: {
    image: 'img/social-card.PNG',
    metadata: [{name: 'theme-color', content: '#0a0e27'}],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Tanya Jain',
      logo: {
        alt: 'Tanya Jain Logo',
        src: 'img/profile-image.jpg',
      },
      items: [
        {
          href: 'https://github.com/tanyaacjain',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://linkedin.com/in/tanyaacjain',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          href: 'https://x.com/tanyaacjain',
          label: 'Twitter',
          position: 'right',
        },
        {
          href: 'https://www.behance.net/Tanya-Jain',
          label: 'Behance',
          position: 'right',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'Writings',
              to: '/writings',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/tanyaacjain',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Website, Inc. Built with Docusaurus and Sawatdee Haneu Theme.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
