import React, { useEffect } from 'react';
import OriginalBlogLayout from '@theme-original/BlogLayout';
import FloatingNav from '@site/src/components/FloatingNav';
import './styles.css';

export default function BlogLayout(props) {
  useEffect(() => {
    document.documentElement.classList.add('blog-page');
    return () => {
      document.documentElement.classList.remove('blog-page');
    };
  }, []);

  // Strip sidebar — we don't want it in the reading layout
  const { sidebar, toc, ...rest } = props;

  return (
    <>
      <FloatingNav activeLink="essays" />
      <OriginalBlogLayout toc={toc} {...rest} />
    </>
  );
}
