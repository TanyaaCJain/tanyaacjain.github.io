import React, { useState, useEffect } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useBlogStyles } from './BlogStylesContext';

// ── Group items into { tag, aboutDesc, articles[], projects[] } ───────────
// Posts with type: about are filtered out and their Docusaurus-extracted
// description becomes the section blurb (priority over tags.yml).
export function groupWorkBySection(items) {
  const groups = new Map();

  for (const item of items) {
    const { metadata } = item.content;
    const tags = metadata.tags?.length > 0
      ? metadata.tags
      : [{ label: 'Other', permalink: null }];
    const tag  = tags[0];
    const type = metadata.frontMatter?.type || 'article';

    if (!groups.has(tag.label)) {
      groups.set(tag.label, { tag, aboutDesc: null, remarks: [], articles: [], projects: [] });
    }
    const g = groups.get(tag.label);

    if (type === 'about') {
      // Use the auto-extracted description (first paragraph before truncate)
      g.aboutDesc = metadata.description || null;
      g.remarks   = metadata.frontMatter?.remarks || [];
    } else {
      (type === 'project' ? g.projects : g.articles).push(metadata);
    }
  }

  return Array.from(groups.values());
}

// ── Helpers ────────────────────────────────────────────────────────────────
const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

// ── RemarksCarousel ────────────────────────────────────────────────────────
function RemarksCarousel({ remarks }) {
  const styles = useBlogStyles();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (remarks.length <= 1) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % remarks.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [remarks.length]);

  const r = remarks[index];
  return (
    <div className={styles.remarksStrip}>
      <figure className={`${styles.remarkCard} ${visible ? styles.remarkVisible : styles.remarkHidden}`}>
        <blockquote className={styles.remarkQuote}>
          <p>"{r.quote}"</p>
        </blockquote>
        <figcaption className={styles.remarkAttrib}>
          <span className={styles.remarkName}>{r.name}</span>
          {r.role && <span className={styles.remarkRole}>{r.role}</span>}
        </figcaption>
      </figure>
    </div>
  );
}

// ── ProjectCard ────────────────────────────────────────────────────────────
function ProjectCard({ post }) {
  const styles = useBlogStyles();
  const { title, permalink, frontMatter = {} } = post;
  const { cover_image } = frontMatter;

  return (
    <a href={permalink} className={styles.projectCard} role="listitem">
      <div className={styles.projectImg}>
        {cover_image
          ? <img src={cover_image} alt={title} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add(styles.projectImgPlaceholder); }} />
          : <div className={styles.projectImgPlaceholder} aria-hidden="true" />}
      </div>
      <div className={styles.projectInfo}>
        <span className={styles.projectTitle}>{title}</span>
        <span className={styles.projectCta} aria-hidden="true">View →</span>
      </div>
    </a>
  );
}

// ── WorkSection ────────────────────────────────────────────────────────────
export function WorkSection({ tag, aboutDesc, remarks, articles, projects }) {
  const styles = useBlogStyles();
  // tags.yml lookup: match by label across all keys
  const tagsMeta = usePluginData('work-tags-meta') || {};
  const tagMeta  = Object.values(tagsMeta).find(t => t.label === tag.label);

  // Priority: about.mdx description > tags.yml description
  const desc = aboutDesc || tagMeta?.description || null;

  return (
    <section className={styles.workGroup}>
      <h2 className={styles.workGroupLabel}>{tag.label}</h2>
      {desc && <p className={styles.workGroupDesc}>{desc}</p>}
      <hr className={styles.divider} />

      {articles.length > 0 && (
        <ul className={styles.postList}>
          {[...articles].sort(byDateDesc).map(post => (
            <li key={post.permalink} className={styles.postItem}>
              <a href={post.permalink} className={styles.postLink}>{post.title}</a>
              <span className={styles.postDate}>{formatDate(post.date)}</span>
            </li>
          ))}
        </ul>
      )}

      {projects.length > 0 && (
        <div
          className={styles.projectStrip}
          role="list"
          aria-label={`${tag.label} projects`}
        >
          {[...projects].sort(byDateDesc).map(post => (
            <ProjectCard key={post.permalink} post={post} />
          ))}
        </div>
      )}

      {remarks?.length > 0 && <RemarksCarousel remarks={remarks} />}
    </section>
  );
}
