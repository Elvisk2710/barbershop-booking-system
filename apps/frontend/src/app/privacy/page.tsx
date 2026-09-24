import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { BRAND } from '@barber/shared';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy and client personal data protection policy for Gentleman’s Grooming Bar in Avondale, Harare.',
  alternates: {
    canonical: 'https://gentlemansbar.co.zw/privacy',
  },
  openGraph: {
    title: "Privacy Policy | Gentleman's Grooming Bar",
    description:
      'Privacy and personal data protection policy for Gentleman’s Grooming Bar clients.',
    url: 'https://gentlemansbar.co.zw/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-brand-cream text-brand-dark pt-36 pb-28 px-6 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <nav aria-label="Breadcrumb">
          <Link
            href="/"
            className="link-editorial text-xs uppercase tracking-widest text-brand-navy font-semibold inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </nav>

        <div className="bg-white rounded-lg p-8 sm:p-12 border border-brand-navy/15 space-y-8">
          <header className="border-b border-brand-navy/10 pb-6 space-y-2">
            <span className="text-brand-coral micro-label block">
              Client Data Protection
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-brand-navy font-normal">
              Privacy Policy
            </h1>
            <p className="text-xs text-brand-dark/50">
              Effective Date: January 1, 2024 · Last Updated: September 2026
            </p>
          </header>

          <div className="space-y-8 text-sm text-brand-dark/80 font-light leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display text-2xl text-brand-navy font-normal">
                1. Information We Collect
              </h2>
              <p>
                When you book an appointment at {BRAND.name}, we collect your name, email address, phone number, and any special grooming preferences you provide. This information is used strictly to confirm and manage your appointments.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-2xl text-brand-navy font-normal">
                2. How We Use Your Data
              </h2>
              <p>
                Your contact details are used exclusively for sending booking confirmations, calendar synchronizations, and SMS/email appointment updates. We do not sell, rent, or distribute your personal data to any third-party advertisers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-2xl text-brand-navy font-normal">
                3. Security & Storage
              </h2>
              <p>
                All data is encrypted in transit using industry-standard Transport Layer Security (TLS/HTTPS). Database records are secured with strict access controls.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-2xl text-brand-navy font-normal">
                4. Your Rights
              </h2>
              <p>
                You may request access to, correction of, or deletion of your booking history at any time by emailing <a href={`mailto:${BRAND.location.email}`} className="text-brand-coral font-medium hover:underline">{BRAND.location.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
