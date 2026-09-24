import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { ApiClient } from '@/lib/api';
import { BRAND } from '@barber/shared';
import { EditorialHero } from '@/components/home/EditorialHero';
import { EditorialServices } from '@/components/home/EditorialServices';
import { LoungeAtmosphere } from '@/components/home/LoungeAtmosphere';
import { CraftsmenRoster } from '@/components/home/CraftsmenRoster';
import { RitualStages } from '@/components/home/RitualStages';

export default async function HomePage() {
  const [services, barbers] = await Promise.all([
    ApiClient.getServices(),
    ApiClient.getBarbers(),
  ]);

  return (
    <div className="bg-brand-cream text-brand-dark overflow-hidden">
      {/* 01 — Full-Width Editorial Hero & Integrated Architectural Ledger */}
      <EditorialHero />

      {/* 02 — The House Canon (Broadsheet Editorial Spread — No Generic Stat Counters) */}
      <section className="py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto space-y-16">
        <div className="border-b border-brand-navy/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-brand-coral micro-label block mb-2.5">
              The House Canon
            </span>
            <h2 className="text-display-l font-normal text-brand-navy leading-tight">
              Grooming should <br className="hidden sm:block" />
              never feel rushed.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-brand-dark/70 font-light font-sans max-w-md leading-relaxed">
            Traditional gentlemanly refinement interpreted through a contemporary African grooming studio in Avondale.
          </p>
        </div>

        {/* Asymmetrical 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Narrative & Studio Creed (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <p className="font-display text-2xl sm:text-3xl text-brand-navy leading-snug font-normal">
              “We eliminated the chaos of noisy waiting rooms and hurried cuts.”
            </p>
            <p className="text-sm text-brand-dark/75 font-light font-sans leading-relaxed">
              Founded in 2018 in Avondale, Harare, Gentleman’s Grooming Bar was created to bridge old-world barbershop traditions with contemporary aesthetic excellence.
            </p>
            <p className="text-sm text-brand-dark/75 font-light font-sans leading-relaxed">
              Every appointment is treated as an unhurried consultation. We calibrate each cut to hair density, facial structure, and personal style, finishing each session with eucalyptus steam therapy and artisanal refreshments.
            </p>

            <div className="pt-4 border-t border-brand-navy/15 flex items-center justify-between text-xs font-sans">
              <span className="uppercase tracking-widest text-brand-coral font-medium text-[10px]">
                12 BATH ROAD · AVONDALE
              </span>
              <span className="text-brand-dark/50">
                STRICTLY RESERVED CHAIRS
              </span>
            </div>
          </div>

          {/* Column 2: Large Centerpiece Artisan Photography (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[16/11] rounded-lg overflow-hidden border border-brand-navy/15 bg-brand-deep">
            <Image
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=80"
              alt="Artisan Barber sculpting in Avondale Harare Studio"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-brand-light flex justify-between items-end border-t border-brand-light/15 pt-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-coral block mb-0.5">
                  Avondale Studio
                </span>
                <p className="font-serif text-lg text-brand-light/95">
                  Surgical scissor precision and botanical steam towels.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-brand-light/60 font-sans hidden sm:block">
                EST. 2018
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — The Treatment Menu (Editorial Numbered Rows with Interactive Preview) */}
      <EditorialServices services={services} />

      {/* 04 — The Harare Lounge Atmosphere (Cinematic Split Sequence) */}
      <LoungeAtmosphere />

      {/* 05 — Master Craftsmen Roster (Dominant 4:5 Portraits) */}
      <CraftsmenRoster barbers={barbers} />

      {/* 06 — Three Stages of the Ritual (Quiet Editorial Journey) */}
      <RitualStages />

      {/* 07 — The Harare Studio Folio (Full-Bleed Architectural Closing) */}
      <section className="py-28 bg-brand-deep text-brand-light px-6 md:px-12 lg:px-16 border-t border-brand-light/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-brand-coral micro-label">
              <MapPin className="w-3.5 h-3.5" />
              <span>Avondale Studio · 12 Bath Road, Harare</span>
            </div>
            <h2 className="text-display-l font-normal text-brand-light leading-tight">
              See you in the chair.
            </h2>
            <p className="text-base text-brand-light/75 font-light font-sans leading-relaxed">
              Appointments are strictly reserved to guarantee zero waiting time and complete master barber focus.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-sans">
            <Link
              href="/book"
              className="btn-primary py-4 px-8 text-center flex items-center justify-center space-x-2.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Your Chair</span>
            </Link>
            <Link
              href="/visit"
              className="btn-secondary-dark py-4 px-7 text-center flex items-center justify-center space-x-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap"
            >
              <span>Studio Directions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
