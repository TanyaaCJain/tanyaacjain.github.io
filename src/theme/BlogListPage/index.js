import React, { useEffect } from 'react';
import { PageMetadata, HtmlClassNameProvider } from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FloatingNav from '@site/src/components/FloatingNav';
import styles from './styles.module.css';

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

  useEffect(() => {
    document.documentElement.classList.add('blog-list-page');
    return () => {
      document.documentElement.classList.remove('blog-list-page');
    };
  }, []);

  const groups = groupByTag(items);

  return (
    <HtmlClassNameProvider className="blog-list-page">
      <PageMetadata
        title={metadata.blogTitle || 'Essays'}
        description={metadata.blogDescription || `Essays by ${siteConfig.title}`}
      />
      <SearchMetadata tag="blog_posts_list" />

      <FloatingNav activeLink="essays" />

      <main className={styles.page} tabIndex={-1}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Essays</h1>
          <p className={styles.subheading}>Thoughts on living, thinking, and becoming</p>

          {groups.map(({ tag, posts }) => (
            <BlogSections tag={tag} posts={posts} />
          ))}

        </div>
      </main>
    </HtmlClassNameProvider>
  );
}
