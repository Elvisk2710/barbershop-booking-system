import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BRAND } from '@barber/shared';

export function VisitBento() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BRAND.name}, ${BRAND.location.address}, ${BRAND.location.city}`
  )}`;

  return (
    <section className="section bg-paper" aria-labelledby="visit-title">
      <div className="shell">
        <h2 id="visit-title" className="t-display text-ink">
          Come by.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <div className="tile p-8 md:p-10 md:col-span-4 md:row-span-2 md:min-h-[520px] flex flex-col justify-between gap-10">
            <div>
              <h3 className="t-headline text-ink">Opening hours</h3>
              <p className="t-caption text-ink-2 mt-1">Appointments only. Sundays by request.</p>
            </div>
            <dl className="divide-y divide-hairline">
              {BRAND.hours.map(h => (
                <div key={h.day} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="t-lede text-ink">{h.day}</dt>
                  <dd className="t-lede text-ink-2 tabular text-right">
                    {h.time.replace(' (By Special Request Only)', '')}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group tile-dark p-8 md:col-span-2 md:min-h-[252px] flex flex-col justify-between gap-8"
          >
            <p className="t-caption text-white/55">Find us</p>
            <div>
              <p className="t-headline">{BRAND.location.address}</p>
              <p className="t-caption text-white/55 mt-1">
                {BRAND.location.city}. Two minutes from Avondale Shopping Centre.
              </p>
              <span className="link-more t-caption text-ember mt-4 group-hover:underline">
                Open in Maps
                <ChevronRight className="w-[1em] h-[1em]" strokeWidth={2} />
              </span>
            </div>
          </a>

          <div className="tile p-8 md:col-span-2 md:min-h-[252px] flex flex-col justify-between gap-8">
            <p className="t-caption text-ink-2">Parking</p>
            <p className="t-subhead text-ink">
              Free, gated and watched, right outside the door.
            </p>
          </div>

          <div className="tile p-8 md:col-span-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="t-headline text-ink">Plans changed?</p>
              <p className="t-caption text-ink-2 mt-1">
                Move or cancel your booking online up to two hours before.
              </p>
            </div>
            <Link href="/manage" className="btn btn-ghost self-start md:self-auto">
              Manage your booking
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
