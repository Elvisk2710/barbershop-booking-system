import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/booking/', '/manage', '/api/'],
    },
    sitemap: 'https://gentlemansbar.co.zw/sitemap.xml',
  };
}
