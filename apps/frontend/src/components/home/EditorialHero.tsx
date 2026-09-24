'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';
import { BRAND } from '@barber/shared';

export function EditorialHero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-brand-deep text-brand-light pt-32 pb-8 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2400&q=85"
          alt="Gentleman's Grooming Lounge Interior in Avondale, Harare"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/80 to-brand-deep/60" />
      </div>

      {/* Top Heritage Line */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between items-center text-xs text-brand-light/60 border-b border-brand-light/10 pb-4">
        <div className="flex items-center space-x-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
          <span className="font-sans font-medium text-brand-coral uppercase tracking-widest text-[11px]">
            Avondale Studio · Harare
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 font-sans text-[11px] tracking-wider text-brand-light/50 uppercase">
          <span>Est. 2018</span>
          <span>·</span>
          <span>Bespoke Grooming</span>
        </div>
      </div>

      {/* Main Editorial Statement & Asymmetric Composition */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-16 lg:py-20 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          {/* Left Column: Dominant Editorial Statement */}
          <div className="lg:col-span-8 space-y-6">
            <span className="text-brand-coral text-xs font-sans font-medium uppercase tracking-[0.2em] block">
              The Gentleman’s Cut, Reconsidered
            </span>

            <h1 className="text-display-xl font-normal text-brand-light tracking-tight leading-[0.92]">
              Looking sharp <br className="hidden sm:block" />
              is only half <br className="hidden sm:block" />
              the story.
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-brand-light/75 font-light font-sans leading-relaxed pt-2">
              Precision fades, straight-razor detailing, and an unhurried hour that’s entirely yours. Traditional gentlemanly refinement interpreted through a contemporary Harare lounge.
            </p>

            {/* Disciplined Call to Action: One dominant, one understated secondary */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-5">
              <Link
                href="/book"
                id="hero-reserve-cta"
                className="btn-primary py-4 px-8 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2.5 shadow-lg self-start"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Your Chair</span>
              </Link>

              <Link
                href="/services"
                className="link-editorial text-xs font-sans uppercase tracking-widest text-brand-light/80 hover:text-brand-coral py-2 flex items-center space-x-2 group self-start sm:self-auto"
              >
                <span>View Treatment Menu</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame (Square / Restrained Bevel) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-brand-light/15 bg-brand-navy/60">
              <Image
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80"
                alt="Master Barber detailing a client at Gentleman's Grooming Bar Harare"
                fill
                sizes="(max-width: 1200px) 33vw, 400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-sans text-brand-light/80 border-t border-brand-light/10 pt-3">
                <span className="text-[10px] text-brand-coral uppercase tracking-widest block font-medium">
                  Studio Principle
                </span>
                <span className="font-serif text-sm text-brand-light mt-0.5 block italic">
                  One guest per chair. Zero queue friction.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Architectural Studio Ledger (Replaces Floating Card) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-brand-light/10 pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-brand-coral flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brand-coral block font-medium">
                Studio Location
              </span>
              <span className="text-brand-light block font-medium">12 Bath Road, Avondale</span>
              <span className="text-brand-light/50">Harare, Zimbabwe</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-4 h-4 text-brand-coral flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brand-coral block font-medium">
                Hours & Policy
              </span>
              <span className="text-brand-light block font-medium">Mon–Sat 08:00 – 18:00</span>
              <span className="text-brand-light/50">Strictly Scheduled Reservations</span>
            </div>
          </div>

          <div className="hidden sm:flex items-start space-x-3">
            <div className="w-4 h-4 text-brand-coral flex-shrink-0 mt-0.5 flex items-center justify-center font-serif font-bold text-sm">
              §
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brand-coral block font-medium">
                Harare Lounge Privilege
              </span>
              <span className="text-brand-light block font-medium">Private Gated Parking</span>
              <span className="text-brand-light/50">Espresso Bar & Steam Towels</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
