import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Clock } from 'lucide-react';
import { ApiClient } from '@/lib/api';

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

  const groupedCategories = [
    {
      title: 'Haircuts & Precision Fades',
      description: 'Hand-tailored cuts calibrated to head anatomy, textured tapering, and matte or lustrous finish.',
      services: services.filter(s => s.category === 'HAIRCUTS'),
    },
    {
      title: 'Beard Sculpting & Contouring',
      description: 'Freehand sculpting, straight razor line definition, and botanical hot oil hydration.',
      services: services.filter(s => s.category === 'BEARD'),
    },
    {
      title: 'Signature Grooming Combinations',
      description: 'Complete unhurried lounge sessions combining cut, beard sculpting, steam towels, and refreshments.',
      services: services.filter(s => s.category === 'COMBOS'),
    },
    {
      title: 'Restorative Therapies',
      description: 'Facial cleanses, scalp acupressure therapies, and full studio takeover rituals.',
      services: services.filter(s => s.category === 'TREATMENTS'),
    },
  ];

  return (
    <div className="bg-brand-cream text-brand-dark pt-36 pb-28 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Editorial Header */}
        <header className="max-w-3xl space-y-4">
          <span className="text-brand-coral micro-label block">
            The Treatment Catalogue
          </span>
          <h1 className="text-display-l font-normal text-brand-navy">
            The Gentleman’s Menu.
          </h1>
          <p className="text-base sm:text-lg text-brand-dark/75 font-light font-sans leading-relaxed max-w-prose">
            Every session begins with a dialogue. Each cut includes hair wash, eucalyptus hot-steam compress, and finish with imported botanical tonics.
          </p>
        </header>

        {/* Categories List (Editorial Layout, No Ecommerce Cards) */}
        <div className="space-y-20">
          {groupedCategories.map((group, groupIdx) => {
            if (group.services.length === 0) return null;

            return (
              <section key={groupIdx} className="space-y-8" aria-labelledby={`category-${groupIdx}`}>
                <div className="border-b border-brand-navy/15 pb-4 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-brand-coral uppercase tracking-widest block mb-1">
                      SECTION 0{groupIdx + 1}
                    </span>
                    <h2 id={`category-${groupIdx}`} className="font-display text-3xl sm:text-4xl text-brand-navy font-normal">
                      {group.title}
                    </h2>
                  </div>
                  <p className="text-xs text-brand-dark/60 font-light font-sans max-w-md">
                    {group.description}
                  </p>
                </div>

                <div className="divide-y divide-brand-navy/15">
                  {group.services.map((service, srvIdx) => (
                    <article
                      key={service.id}
                      className="py-8 flex flex-col md:flex-row justify-between md:items-center gap-6 group hover:bg-white/40 px-4 -mx-4 rounded-[6px] transition-colors duration-200"
                    >
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex items-baseline space-x-3">
                          <span className="text-xs font-mono font-medium text-brand-coral tracking-widest">
                            0{srvIdx + 1}
                          </span>
                          <h3 className="font-display text-2xl sm:text-3xl text-brand-navy group-hover:text-brand-coral transition-colors font-normal">
                            {service.name}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-brand-dark/70 font-light font-sans leading-relaxed pl-7">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between md:justify-end space-x-8 pl-7 md:pl-0 font-sans">
                        <div className="text-right">
                          <div className="font-display text-2xl sm:text-3xl font-medium text-brand-navy">
                            ${service.price}
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-brand-dark/50 justify-end">
                            <Clock className="w-3 h-3 text-brand-coral" />
                            <span>{service.duration} mins</span>
                          </div>
                        </div>

                        <Link
                          href={`/book?service=${service.id}`}
                          className="btn-primary py-3 px-6 text-xs uppercase tracking-wider font-semibold shadow-sm flex items-center space-x-1.5"
                        >
                          <span>Reserve</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Private Inquiries / Bespoke Studio Takeovers */}
        <section className="p-10 sm:p-12 rounded-lg bg-brand-deep text-brand-light flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-brand-light/10 font-sans">
          <div className="space-y-2 max-w-xl">
            <span className="text-brand-coral micro-label">
              Private Studio Takeovers
            </span>
            <h3 className="font-display text-3xl font-normal text-brand-light">
              Wedding parties & private lounge reservations.
            </h3>
            <p className="text-xs sm:text-sm text-brand-light/70 font-light leading-relaxed">
              We accommodate private groomsmen sessions and executive retreats with dedicated baristas and private chair takeovers.
            </p>
          </div>

          <Link
            href="/visit"
            className="btn-primary py-4 px-8 text-xs uppercase tracking-wider font-semibold whitespace-nowrap self-start md:self-auto"
          >
            Inquire at Studio Desk →
          </Link>
        </section>
      </div>
    </div>
  );
}
