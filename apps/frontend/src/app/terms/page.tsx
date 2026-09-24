import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
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
    <article className="shell max-w-[760px] pt-[calc(var(--nav-h)+clamp(3rem,8vw,6rem))] pb-[clamp(5rem,10vw,8rem)]">
      <header className="pb-8 border-b border-hairline">
        <h1 className="t-title text-ink">Terms of service</h1>
        <p className="t-caption text-ink-2 mt-3">Last updated September 2026</p>
      </header>

      <div className="prose-quiet">
        <section>
          <h2>Appointment reservations</h2>
          <p>
            By reserving an appointment at {BRAND.name}, you agree to honor your scheduled date and time slot. We reserve your chair exclusively for the duration of the chosen service to provide an unrushed experience.
          </p>
        </section>

        <section>
          <h2>Cancellations and rescheduling</h2>
          <p>
            We understand schedules change. We kindly request that any cancellations or appointment adjustments be submitted through our <Link href="/manage">Manage Booking portal</Link> at least <strong>2 hours prior</strong> to your scheduled appointment.
          </p>
        </section>

        <section>
          <h2>Arrival and punctuality</h2>
          <p>
            Please arrive 5 to 10 minutes before your reserved chair time to enjoy a complimentary beverage and initial styling consultation. Clients arriving more than 15 minutes past their appointment time may be requested to reschedule to prevent disruption for subsequent guests.
          </p>
        </section>

        <section>
          <h2>Pricing and payment</h2>
          <p>
            All prices listed on our menu are quoted in United States Dollars ($ USD). Payment is accepted upon service completion via cash, debit card, or verified mobile transfers at our Avondale studio concierge desk.
          </p>
        </section>

        <section>
          <h2>Hygiene and safety standards</h2>
          <p>
            We maintain strict clinical hygiene protocols. All straight-razor blades are single-use disposable blades, and cutting tools are sanitized with hospital-grade disinfectant between every client.
          </p>
        </section>

        <section>
          <h2>Contact and concierge inquiries</h2>
          <p>
            If you have questions regarding our terms or services, please contact our concierge team at <a href={`mailto:${BRAND.location.email}`}>{BRAND.location.email}</a> or phone {BRAND.location.phone}.
          </p>
        </section>
      </div>
    </article>
  );
}
