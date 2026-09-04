import React from 'react';
import {useBlogPost} from '@docusaurus/theme-common/internal';

export default function BlogPostItemFooter(): JSX.Element | null {
  const {isBlogPostPage} = useBlogPost();
  // Tags now render in the header (see Header swizzle); on post pages the
  // footer has nothing left to show.
  if (isBlogPostPage) {
    return null;
  }
  return null; // list view truncation/edit UI is suppressed site-wide
}
