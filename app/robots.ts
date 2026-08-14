import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
/**
 * Lakshya Hospital — robots.txt
 * Automatically served at: https://www.lakshyahospital.co.in/robots.txt
 *
 * Allows all search engine crawlers and points them to the sitemap.
 */

const BASE_URL = 'https://www.lakshyahospital.co.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all well-behaved crawlers (Google, Bing, etc.)
        userAgent: '*',
        allow: '/',
        // Block internal Next.js API and build routes from being indexed
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
