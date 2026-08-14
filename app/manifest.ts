import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lakshya Hospital Kanpur',
    short_name: 'Lakshya Hospital',
    description: 'Multi-Super-Speciality Hospital in Kidwai Nagar, Kanpur. Committed to bringing clinical excellence, personal trust, and cutting-edge treatments.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4A90E2',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
  };
}
