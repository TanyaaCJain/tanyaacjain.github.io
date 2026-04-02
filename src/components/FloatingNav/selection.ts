import { useLocation } from '@docusaurus/router';
import { getBlogConfigByPath, BLOGS } from '@site/src/config/blogs';

const fallback = BLOGS.find(b => b.key === 'essays')!;

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
