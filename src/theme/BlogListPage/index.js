import React, { useEffect } from 'react';
import { PageMetadata, HtmlClassNameProvider } from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import { getBlogFields } from '@site/src/components/FloatingNav/selection';
import FloatingNav from '@site/src/components/FloatingNav';
import { BlogStylesContext } from './BlogStylesContext';
import baseStyles from './styles.module.css';
import designStyles from './styles.design.module.css';
import { groupWorkBySection, WorkSection } from './WorkListPage';

const STYLE_OVERRIDES = { design: designStyles };
const styles = baseStyles;

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function groupByTag(items) {
  const groups = new Map();

  for (const item of items) {
    const { metadata } = item.content;
    const tags = metadata.tags && metadata.tags.length > 0
      ? metadata.tags
      : [{ label: 'Miscellaneous', permalink: null }];

    // Use first tag as primary category
    const tag = tags[0];
    const key = tag.label;

    if (!groups.has(key)) {
      groups.set(key, { tag, posts: [] });
    }
    groups.get(key).posts.push(metadata);
  }

  // Sort groups alphabetically
  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value);
}

function BlogSections({tag, posts}) {
  return (
    <section key={tag.label} className={styles.group}>
      <p className={styles.groupLabel}>{tag.label}</p>
      <hr className={styles.divider} />
      <ul className={styles.postList}>
        {posts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((post) => (
            <li key={post.permalink} className={styles.postItem}>
              <a href={post.permalink} className={styles.postLink}>
                {post.title}
              </a>
              <span className={styles.postDate}>
                {formatDate(post.date)}
              </span>
            </li>
          ))}
      </ul>
    </section>
  )
}

export default function BlogListPage({ metadata, items }) {
  const { siteConfig } = useDocusaurusContext();
  const { blogFields } = getBlogFields();
  const isWorkLayout = blogFields.layout === 'work';
  const activeStyles = { ...baseStyles, ...(STYLE_OVERRIDES[blogFields.styleKey] || {}) };

  const tagsMeta = usePluginData('work-tags-meta') || {};
  const tagsYmlOrder = Object.values(tagsMeta);

  useEffect(() => {
    document.documentElement.classList.add('blog-list-page');
    return () => {
      document.documentElement.classList.remove('blog-list-page');
    };
  }, []);

  const rawGroups = isWorkLayout ? groupWorkBySection(items) : groupByTag(items);
  const groups = isWorkLayout
    ? [...rawGroups].sort((a, b) => {
        const ai = tagsYmlOrder.findIndex(t => t.label === a.tag.label);
        const bi = tagsYmlOrder.findIndex(t => t.label === b.tag.label);
        if (ai === -1 && bi === -1) return a.tag.label.localeCompare(b.tag.label);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      })
    : rawGroups;

  return (
    <BlogStylesContext.Provider value={activeStyles}>
    <HtmlClassNameProvider className="blog-list-page">
      <PageMetadata
        title={blogFields.title || metadata.blogTitle}
        description={metadata.blogDescription || `${blogFields.title} by ${siteConfig.title}`}
      />
      <SearchMetadata tag="blog_posts_list" />

      <FloatingNav activeLink={blogFields.activeLink} />

      <main className={styles.page} tabIndex={-1}>
        <div className={isWorkLayout ? styles.containerWork : styles.container}>
          <h1 className={styles.heading}>{blogFields.title}</h1>
          <p className={styles.subheading}>
            {blogFields.subheading}
          </p>

          {isWorkLayout
            ? groups.map(({ tag, aboutDesc, remarks, articles, projects }) => (
                <WorkSection key={tag.label} tag={tag} aboutDesc={aboutDesc} remarks={remarks} articles={articles} projects={projects} />
              ))
            : groups.map(({ tag, posts }) => (
                <BlogSections key={tag.label} tag={tag} posts={posts} />
              ))
          }

        </div>
      </main>
    </HtmlClassNameProvider>
    </BlogStylesContext.Provider>
  );
}
