import { useLocation } from '@docusaurus/router';
import { getBlogConfigByPath, BLOGS, FALLBACK_BLOG_KEY } from '@site/src/config/blogs';

const fallback = BLOGS.find(b => b.key === FALLBACK_BLOG_KEY)!;

export function getBlogFields() {
  const { pathname } = useLocation();
  const blog = getBlogConfigByPath(pathname) || fallback;
  return {
    blogFields: {
      title: blog.title,
      subheading: blog.subheading,
      activeLink: blog.routeBasePath,
      layout: blog.layout,
      styleKey: blog.styleKey,
    },
  };
}
