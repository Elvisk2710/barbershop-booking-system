import React from 'react';
import { Metadata } from 'next';
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
    <article className="shell max-w-[760px] pt-[calc(var(--nav-h)+clamp(3rem,8vw,6rem))] pb-[clamp(5rem,10vw,8rem)]">
      <header className="pb-8 border-b border-hairline">
        <h1 className="t-title text-ink">Privacy policy</h1>
        <p className="t-caption text-ink-2 mt-3">Last updated September 2026</p>
      </header>

      <div className="prose-quiet">
        <section>
          <h2>Information we collect</h2>
          <p>
            When you book an appointment at {BRAND.name}, we collect your name, email address, phone number, and any special grooming preferences you provide. This information is used strictly to confirm and manage your appointments.
          </p>
        </section>

        <section>
          <h2>How we use your data</h2>
          <p>
            Your contact details are used exclusively for sending booking confirmations, calendar synchronizations, and SMS/email appointment updates. We do not sell, rent, or distribute your personal data to any third-party advertisers.
          </p>
        </section>

        <section>
          <h2>Security and storage</h2>
          <p>
            All data is encrypted in transit using industry-standard Transport Layer Security (TLS/HTTPS). Database records are secured with strict access controls.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your booking history at any time by emailing <a href={`mailto:${BRAND.location.email}`}>{BRAND.location.email}</a>.
          </p>
        </section>
      </div>
    </article>
  );
}
