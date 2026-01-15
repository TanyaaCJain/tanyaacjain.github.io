import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          path: './docs',
          sidebarPath: './sidebars.ts',
        },
        blog: {
          path: 'essays',
          routeBasePath: 'essays',
          showReadingTime: true,
        },
        theme: {
          customCss: [
            './src/css/custom.css',
            require.resolve('@sawatdeehaneu/docusaurus-theme')
          ]
        },
        gtag: {
          trackingID: 'G-65S284K0XJ',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.PNG',
    navbar: {
      title: 'Tanya Jain',
      logo: {
        alt: 'Tanya Jain Logo',
        src: 'img/profile-image.jpg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'About Me',
        },
        {to: '/essays', label: 'Essays', position: 'left'},
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
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/docs/intro',
        //     },
        //   ],
        // },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Essays',
              to: '/essays',
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
