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
  metadataBase: new URL('https://www.lakshyahospital.co.in'),
  title: {
    default: 'Lakshya Hospital | Multi Super-Speciality Hospital in Kanpur',
    template: '%s | Lakshya Hospital Kanpur',
  },
  description: 'Founded in 2013 by Dr. Rohit Agarwal, a renowned pediatrician, Lakshya Hospital is one of Kanpur’s leading healthcare facilities. Over 13 years, it has grown into a 30-bed multi-speciality facility offering advanced tertiary and quaternary care in South Kanpur.',
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
    url: 'https://www.lakshyahospital.co.in',
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

import ChatbotWidget from "../components/ChatbotWidget";
import CinematicLoader from "../components/CinematicLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        <CinematicLoader />
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
