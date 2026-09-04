import React from 'react';
import OriginalTitle from '@theme-original/BlogPostItem/Header/Title';
import TagsListInline from '@theme/TagsListInline';
import {useBlogPost} from '@docusaurus/theme-common/internal';

export default function BlogPostItemHeaderTitle(): JSX.Element {
  const {metadata, isBlogPostPage} = useBlogPost();
  return (
    <>
      {isBlogPostPage && metadata.tags.length > 0 && (
        <div className="blog-post-tags-inline">
          <TagsListInline tags={metadata.tags} />
        </div>
      )}
      <OriginalTitle />
    </>
  );
}
