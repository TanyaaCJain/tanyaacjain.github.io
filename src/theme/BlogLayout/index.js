import React, { useEffect } from 'react';
import OriginalBlogLayout from '@theme-original/BlogLayout';
import { getBlogFields } from '@site/src/components/FloatingNav/selection';
import FloatingNav from '@site/src/components/FloatingNav';
import './styles.css';

export default function BlogLayout(props) {
  const { blogFields } = getBlogFields();
  const activeLink = blogFields.activeLink;

  useEffect(() => {
    document.documentElement.classList.add('blog-page');
    document.documentElement.setAttribute('data-blog', activeLink);
    // Guarantee the .blog-post-page hook on <html> for article pages,
    // regardless of what any theme layer does.
    const segs = window.location.pathname.split('/').filter(Boolean);
    const isPostPage =
      segs.length > 1 &&
      segs[0] === activeLink &&
      !['tags', 'archive'].includes(segs[1]) &&
      !/^page\d*$/.test(segs[1]);
    if (isPostPage) document.documentElement.classList.add('blog-post-page');
    return () => {
      document.documentElement.classList.remove('blog-page');
      document.documentElement.classList.remove('blog-post-page');
      document.documentElement.removeAttribute('data-blog');
    };
  }, []);

  // Strip sidebar — we don't want it in the reading layout
  const { sidebar, toc, ...rest } = props;

  return (
    <>
      <FloatingNav activeLink={activeLink} />
      <OriginalBlogLayout toc={toc} {...rest} />
    </>
  );
}
