import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function RitualStages() {
  return (
    <section className="py-28 bg-brand-cream border-t border-brand-navy/15 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-brand-coral micro-label block">
            The Studio Experience
          </span>
          <h2 className="text-display-l font-normal text-brand-navy">
            Three stages of intentional grooming.
          </h2>
          <p className="text-base text-brand-dark/75 font-light font-sans leading-relaxed">
            We eliminated the rush. Every appointment follows a deliberate choreography from arrival to the final mirror inspection.
          </p>
        </div>

        {/* Asymmetrical 3-Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Stage 01: Arrive & Unwind (Featured Large Left) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-brand-navy/15 bg-brand-deep">
              <Image
                src="https://images.unsplash.com/photo-1517832606589-7157aff08e70?auto=format&fit=crop&w=1200&q=80"
                alt="Client relaxing in Avondale studio lounge with single origin coffee"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-brand-light">
                <span className="text-brand-coral font-mono text-xs tracking-widest block mb-1">
                  STAGE 01 · ARRIVE
                </span>
                <h3 className="font-display text-3xl font-normal">The Consultation & Pour</h3>
              </div>
            </div>
            <p className="text-sm text-brand-dark/75 font-light font-sans leading-relaxed max-w-xl">
              Take a comfortable seat in our quiet lounge. Savor a single-origin espresso or cold craft beverage while your barber conducts a thoughtful consultation on facial anatomy and hair growth patterns.
            </p>
          </div>

          {/* Stage 02 & 03: Reset & Leave Sharp (Stacked Right) */}
          <div className="lg:col-span-5 space-y-10">
            {/* Stage 02 */}
            <div className="space-y-3 border-l-2 border-brand-coral/50 pl-6">
              <span className="text-brand-coral font-mono text-xs tracking-widest block font-medium">
                STAGE 02 · RESET
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-brand-navy font-normal">
                The Recline & Hot Towel
              </h3>
              <p className="text-sm text-brand-dark/75 font-light font-sans leading-relaxed">
                Recline into custom-stitched leather. Scissor shaping, skin fade tapering, and botanical eucalyptus steam towels open your pores and completely reset your focus.
              </p>
            </div>

            {/* Stage 03 */}
            <div className="space-y-3 border-l-2 border-brand-navy/20 pl-6">
              <span className="text-brand-navy font-mono text-xs tracking-widest block font-medium">
                STAGE 03 · FINISH
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-brand-navy font-normal">
                Detailing & Maintenance
              </h3>
              <p className="text-sm text-brand-dark/75 font-light font-sans leading-relaxed">
                Finished with bespoke aftershave balm and custom matte pomade. Your next appointment is automatically synchronized with your digital calendar.
              </p>
              <div className="pt-2">
                <Link
                  href="/book"
                  className="link-editorial text-xs uppercase tracking-wider font-semibold text-brand-navy flex items-center space-x-1.5"
                >
                  <span>Experience the Ritual in Avondale</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
