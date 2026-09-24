import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Archivo } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA';
import { PromoModal } from '@/components/promotions/PromoModal';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#16232B',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gentlemansbar.co.zw'),
  title: {
    default: "Gentleman's Grooming Bar | Harare's Premier Grooming Lounge",
    template: "%s | Gentleman's Grooming Bar",
  },
  description:
    'Traditional gentlemanly refinement interpreted through a modern African grooming studio in Avondale, Harare. Bespoke haircuts, precision beard sculpting, and hot towel rituals.',
  keywords: [
    'Gentleman’s Grooming Bar',
    'Barber Harare',
    'Avondale Barber Harare',
    'Beard Sculpting Harare',
    'Hot Towel Shave Harare',
    'Men Haircut Harare',
    'Luxury Men Grooming Zimbabwe',
  ],
  authors: [{ name: "Gentleman's Grooming Bar" }],
  creator: "Gentleman's Grooming Bar",
  publisher: "Gentleman's Grooming Bar",
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
  alternates: {
    canonical: 'https://gentlemansbar.co.zw',
  },
  openGraph: {
    title: "Gentleman's Grooming Bar | The Gentleman's Cut, Reconsidered",
    description:
      'Precision cuts, thoughtful grooming, and an hour that’s entirely yours in Avondale, Harare.',
    url: 'https://gentlemansbar.co.zw',
    siteName: "Gentleman's Grooming Bar",
    locale: 'en_ZW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gentleman's Grooming Bar | Avondale, Harare",
    description:
      'Traditional gentlemanly refinement interpreted through a modern African grooming studio.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BarberShop',
  name: "Gentleman's Grooming Bar",
  image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
  description:
    'Traditional gentlemanly refinement interpreted through a modern African grooming studio in Avondale, Harare.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12 Bath Road',
    addressLocality: 'Avondale',
    addressRegion: 'Harare',
    addressCountry: 'ZW',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -17.7844,
    longitude: 31.0289,
  },
  url: 'https://gentlemansbar.co.zw',
  telephone: '+263771234567',
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, EcoCash',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '16:00',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${archivo.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between font-sans selection:bg-brand-coral selection:text-brand-deep bg-brand-cream text-brand-dark antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <PromoModal />
      </body>
    </html>
  );
}
