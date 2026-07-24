import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
/**
 * Lakshya Hospital — Dynamic Sitemap
 * Automatically served at: https://lakshyahospital.com/sitemap.xml
 *
 * Priority guide:
 *  1.0  → Homepage
 *  0.9  → High-conversion pages (Book Appointment)
 *  0.8  → Core informational pages (Services, Doctors, About, Contact)
 *  0.7  → Supporting pages (Articles)
 *  0.5  → Legal / utility pages (Privacy Policy)
 */

const BASE_URL = 'https://lakshyahospital.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Tier 1: Homepage ──────────────────────────────────────
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // ── Tier 2: High-conversion ───────────────────────────────
    {
      url: `${BASE_URL}/book-appointment`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // ── Tier 3: Core pages ────────────────────────────────────
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/doctors`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // ── Tier 4: Content pages ─────────────────────────────────
    {
      url: `${BASE_URL}/articles`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // ── Tier 5: Legal / Utility ───────────────────────────────
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
