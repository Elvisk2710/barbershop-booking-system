import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { BRAND } from '@barber/shared';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and conditions for appointment reservations, cancellations, and grooming lounge services at Gentleman’s Grooming Bar.',
  alternates: {
    canonical: 'https://gentlemansbar.co.zw/terms',
  },
  openGraph: {
    title: "Terms & Conditions | Gentleman's Grooming Bar",
    description:
      "Terms and conditions for appointments, cancellations, and salon services at Gentleman's Grooming Bar.",
    url: 'https://gentlemansbar.co.zw/terms',
  },
};

export default function TermsPage() {
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
              Studio Policy & Protocol
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-brand-navy font-normal">
              Terms & Conditions
            </h1>
            <p className="text-xs text-brand-dark/50">
              Effective Date: January 1, 2024 · Last Updated: September 2026
            </p>
          </header>

          <div className="space-y-8 text-sm text-brand-dark/80 font-light leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display text-2xl text-brand-navy font-normal">
                1. Appointment Reservations
              </h2>
              <p>
                By reserving an appointment at {BRAND.name}, you agree to honor your scheduled date and time slot. We reserve your chair exclusively for the duration of the chosen service to provide an unrushed experience.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-2xl text-brand-navy font-normal">
                2. Cancellations & Rescheduling
              </h2>
              <p>
                We understand schedules change. We kindly request that any cancellations or appointment adjustments be submitted through our <Link href="/manage" className="text-brand-coral font-medium hover:underline">Manage Booking portal</Link> at least <strong>2 hours prior</strong> to your scheduled appointment.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-2xl text-brand-navy font-normal">
                3. Arrival & Punctuality
              </h2>
              <p>
                Please arrive 5 to 10 minutes before your reserved chair time to enjoy a complimentary beverage and initial styling consultation. Clients arriving more than 15 minutes past their appointment time may be requested to reschedule to prevent disruption for subsequent guests.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-2xl text-brand-navy font-normal">
                4. Pricing & Payment
              </h2>
              <p>
                All prices listed on our menu are quoted in United States Dollars ($ USD). Payment is accepted upon service completion via cash, debit card, or verified mobile transfers at our Avondale studio concierge desk.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-2xl text-brand-navy font-normal">
                5. Hygiene & Safety Standards
              </h2>
              <p>
                We maintain strict clinical hygiene protocols. All straight-razor blades are single-use disposable blades, and cutting tools are sanitized with hospital-grade disinfectant between every client.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-2xl text-brand-navy font-normal">
                6. Contact & Concierge Inquiries
              </h2>
              <p>
                If you have questions regarding our terms or services, please contact our concierge team at <a href={`mailto:${BRAND.location.email}`} className="text-brand-coral font-medium hover:underline">{BRAND.location.email}</a> or phone {BRAND.location.phone}.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
