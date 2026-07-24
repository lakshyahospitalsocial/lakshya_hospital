import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lakshyahospital.com'),
  title: {
    default: 'Lakshya Hospital | Multi Super-Speciality Hospital in Kanpur',
    template: '%s | Lakshya Hospital Kanpur',
  },
  description: 'Lakshya Hospital, Kanpur — a 30-bed multi super-speciality hospital offering General Surgery, Obstetrics & Gynecology, Pediatrics, Orthopedics, Neuro & Spine Surgery, ENT, Urosurgery, Plastic Surgery and Critical Care (ICU/NICU). Empanelled under Ayushman Bharat.',
  keywords: [
    'Lakshya Hospital Kanpur',
    'best hospital in Kanpur',
    'multi speciality hospital Kanpur',
    'Ayushman Bharat hospital Kanpur',
    'Kidwai Nagar hospital',
    'gynecology hospital Kanpur',
    'pediatrician Kanpur',
    'orthopedic surgeon Kanpur',
    'neurosurgery Kanpur',
    'NICU Kanpur',
    'book appointment Kanpur hospital',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lakshyahospital.com',
    siteName: 'Lakshya Hospital',
    title: 'Lakshya Hospital | Multi Super-Speciality Hospital in Kanpur',
    description: 'World-class healthcare close to home. 11 super-specialists, 12 departments, 24/7 emergency care. Empanelled under Ayushman Bharat.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lakshya Hospital | Multi Super-Speciality Hospital in Kanpur',
    description: 'World-class healthcare close to home. 11 super-specialists, 12 departments, 24/7 emergency care.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        {children}
      </body>
    </html>
  );
}
