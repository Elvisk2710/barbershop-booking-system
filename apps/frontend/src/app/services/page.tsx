import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { ApiClient } from '@/lib/api';
import { serviceImage } from '@/lib/imagery';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Grooming Services & Treatment Menu',
  description:
    'Explore the complete treatment menu at Gentleman’s Grooming Bar in Avondale, Harare. Bespoke haircuts, precision skin fades, straight-razor hot lather shaves, and beard sculpting.',
  alternates: {
    canonical: 'https://gentlemansbar.co.zw/services',
  },
  openGraph: {
    title: "Grooming Services & Rituals | Gentleman's Grooming Bar Harare",
    description:
      'Bespoke haircuts, skin fades, hot towel straight-razor shave rituals, and beard sculpting in Avondale, Harare.',
    url: 'https://gentlemansbar.co.zw/services',
  },
};

export default async function ServicesPage() {
  const services = await ApiClient.getServices();

  const groups = [
    { title: 'Haircuts', category: 'HAIRCUTS' },
    { title: 'Beard', category: 'BEARD' },
    { title: 'Cut and beard together', category: 'COMBOS' },
    { title: 'The long visit', category: 'TREATMENTS' },
  ]
    .map(g => ({ ...g, services: services.filter(s => s.category === g.category) }))
    .filter(g => g.services.length > 0);

  return (
    <>
      <PageHeader
        title="Menu and prices."
        lede="Every appointment starts with a conversation and ends with a hot towel. Prices are in US dollars and include everything listed."
      />

      <div className="shell section pt-16 md:pt-20 space-y-20 md:space-y-28">
        {groups.map(group => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2 id={`cat-${group.category}`} className="t-headline text-ink pb-4 border-b border-hairline">
              {group.title}
            </h2>

            <ul className="divide-y divide-hairline">
              {group.services.map(service => (
                <li key={service.id} className="py-7 md:py-8 grid grid-cols-[72px_1fr] md:grid-cols-[96px_1fr_auto] gap-x-5 md:gap-x-8 gap-y-4 items-center">
                  <div className="media rounded-[18px] aspect-square">
                    <Image src={serviceImage(service.id)} alt="" fill sizes="96px" className="object-cover" />
                  </div>

                  <div>
                    <h3 className="t-subhead font-semibold text-ink">{service.name}</h3>
                    <p className="t-caption text-ink-2 mt-1 max-w-[52ch]">{service.description}</p>
                  </div>

                  <div className="col-start-2 md:col-start-3 flex items-center gap-6 md:justify-end">
                    <div className="md:text-right">
                      <p className="t-subhead font-semibold text-ink tabular">${service.price}</p>
                      <p className="t-fine text-ink-2 tabular">{service.duration} min</p>
                    </div>
                    <Link href={`/book?service=${service.id}`} className="btn btn-ghost btn-sm">
                      Book
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="tile-dark p-8 md:p-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[36ch]">
            <h2 className="t-title">Booking for a wedding party?</h2>
            <p className="t-lede text-white/60 mt-4">
              We close the studio for groomsmen and small groups. Call or email and we’ll plan the morning with you.
            </p>
          </div>
          <Link href="/visit" className="btn btn-light self-start md:self-auto">
            Contact the studio
          </Link>
        </section>
      </div>
    </>
  );
}
