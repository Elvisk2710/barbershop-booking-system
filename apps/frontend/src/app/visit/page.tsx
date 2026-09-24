import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { BRAND } from '@barber/shared';

export const metadata: Metadata = {
  title: 'Visit Harare Studio | Avondale Location & Directions',
  description:
    'Find Gentleman’s Grooming Bar at 12 Bath Road, Avondale, Harare. Opening hours, contact concierge, directions, and secure on-site gated parking details.',
  alternates: {
    canonical: 'https://gentlemansbar.co.zw/visit',
  },
  openGraph: {
    title: "Visit Studio & Location | Gentleman's Grooming Bar Avondale Harare",
    description:
      'Find Gentleman’s Grooming Bar at 12 Bath Road, Avondale, Harare. Opening hours, contact info, and directions.',
    url: 'https://gentlemansbar.co.zw/visit',
  },
};

export default function VisitPage() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BRAND.name}, ${BRAND.location.address}, ${BRAND.location.city}`
  )}`;
  const tel = BRAND.location.phone.replace(/\s/g, '');

  return (
    <>
      <PageHeader
        title="Visit the studio."
        lede="On a quiet street in Avondale, two minutes from the shopping centre, with parking at the gate."
      />

      <div className="shell section pt-16 md:pt-20 grid gap-4 md:grid-cols-6">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="group tile-dark p-8 md:p-10 md:col-span-4 min-h-[320px] md:min-h-[420px] flex flex-col justify-between"
        >
          <p className="t-caption text-white/55">Address</p>
          <div>
            <p className="t-title">{BRAND.location.address}</p>
            <p className="t-lede text-white/60 mt-2">
              {BRAND.location.city}, {BRAND.location.country}
            </p>
            <span className="link-more t-lede text-ember mt-6 group-hover:underline">
              Get directions
              <ChevronRight className="w-[1em] h-[1em]" strokeWidth={2} />
            </span>
          </div>
        </a>

        <div className="tile p-8 md:col-span-2 flex flex-col justify-between gap-10">
          <p className="t-caption text-ink-2">Talk to us</p>
          <div className="space-y-4">
            <a href={`tel:${tel}`} className="block t-subhead font-semibold text-ink hover:underline underline-offset-4 tabular">
              {BRAND.location.phone}
            </a>
            <a href={`mailto:${BRAND.location.email}`} className="block t-caption text-ink-2 hover:text-ink hover:underline underline-offset-4 break-all">
              {BRAND.location.email}
            </a>
          </div>
        </div>

        <div className="tile p-8 md:p-10 md:col-span-3">
          <h2 className="t-headline text-ink">Hours</h2>
          <dl className="mt-6 divide-y divide-hairline">
            {BRAND.hours.map(h => (
              <div key={h.day} className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="text-ink">{h.day}</dt>
                <dd className="text-ink-2 tabular text-right">{h.time.replace(' (By Special Request Only)', '')}</dd>
              </div>
            ))}
          </dl>
          <p className="t-caption text-ink-2 mt-5">Sundays are available for groups by request.</p>
        </div>

        <div className="tile p-8 md:p-10 md:col-span-3 flex flex-col justify-between gap-8">
          <div>
            <h2 className="t-headline text-ink">Appointments only</h2>
            <p className="t-caption text-ink-2 mt-3 max-w-[40ch]">
              We don’t take walk-ins, so the chair is ready when you arrive. You can move or cancel
              a booking online up to two hours before it starts.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/book" className="btn btn-ink">
              Book a chair
            </Link>
            <Link href="/manage" className="link-more t-caption text-ink">
              Change a booking
              <ChevronRight className="w-[1em] h-[1em]" strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div className="tile p-8 md:p-10 md:col-span-6 grid gap-6 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="t-subhead font-semibold text-ink">Parking</h2>
            <p className="t-caption text-ink-2 mt-2 max-w-[44ch]">
              Free gated parking with a guard on duty, directly outside the studio entrance on Bath Road.
            </p>
          </div>
          <div>
            <h2 className="t-subhead font-semibold text-ink">Getting here</h2>
            <p className="t-caption text-ink-2 mt-2 max-w-[44ch]">
              Take King George Road to Bath Road. About ten minutes from the CBD, Borrowdale or Belgravia outside rush hour.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
