import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story & Grooming Philosophy',
  description:
    'Learn about the heritage, craftsmanship, and African modern refinement behind Gentleman’s Grooming Bar in Avondale, Harare. Founded in 2018.',
  alternates: {
    canonical: 'https://gentlemansbar.co.zw/about',
  },
  openGraph: {
    title: "Our Story & Philosophy | Gentleman's Grooming Bar Harare",
    description:
      'Learn about the heritage, craftsmanship, and African modern refinement behind Gentleman’s Grooming Bar in Avondale, Harare.',
    url: 'https://gentlemansbar.co.zw/about',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-brand-cream text-brand-dark pt-36 pb-28 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Editorial Story Header */}
        <header className="max-w-3xl space-y-4">
          <span className="text-brand-coral micro-label block">
            The Studio Story
          </span>
          <h1 className="text-display-l font-normal text-brand-navy">
            Refinement, craft, <br />
            and unhurried ease.
          </h1>
          <p className="text-base sm:text-lg text-brand-dark/75 font-light font-sans leading-relaxed max-w-prose">
            Traditional gentlemanly refinement interpreted through a contemporary African grooming studio in Avondale, Harare.
          </p>
        </header>

        {/* Feature Narrative Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-lg overflow-hidden border border-brand-navy/15 bg-brand-deep">
            <Image
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80"
              alt="Artisan Barber at Gentleman's Grooming Bar Avondale"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-brand-light border-t border-brand-light/15 pt-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-coral block mb-1">
                Avondale Studio
              </span>
              <p className="font-serif text-lg text-brand-light/90">
                12 Bath Road · Harare, Zimbabwe
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 font-sans">
            <h2 className="font-display text-3xl sm:text-4xl text-brand-navy font-normal leading-tight">
              Built on the belief that how you take care of yourself matters.
            </h2>
            <p className="text-sm sm:text-base text-brand-dark/80 font-light leading-relaxed">
              Founded in 2018 in Avondale, Harare, Gentleman’s Grooming Bar was designed to bridge old-world barbershop traditions with contemporary aesthetic excellence.
            </p>
            <p className="text-sm sm:text-base text-brand-dark/80 font-light leading-relaxed">
              We eliminated the chaos of noisy waiting rooms and rushed 15-minute cuts. Instead, we curated a space where you can unwind, savor a single-origin roast espresso, discuss your desired silhouette, and walk out feeling completely revitalized.
            </p>
            <p className="text-sm sm:text-base text-brand-dark/80 font-light leading-relaxed">
              Our studio combines classical scissor mechanics, hot eucalyptus towel compresses, straight razor detailing, and organic botanical aftershave formulas.
            </p>

            <div className="pt-4 border-t border-brand-navy/15 flex items-center space-x-8 text-xs font-sans">
              <div>
                <span className="text-brand-coral uppercase tracking-widest block font-medium text-[10px]">
                  CHAIR DISCIPLINE
                </span>
                <span className="text-brand-navy font-medium text-sm mt-0.5 block">
                  Strictly Reserved
                </span>
              </div>
              <div className="border-l border-brand-navy/15 pl-8">
                <span className="text-brand-coral uppercase tracking-widest block font-medium text-[10px]">
                  ESTABLISHED
                </span>
                <span className="text-brand-navy font-medium text-sm mt-0.5 block">
                  2018 · Harare
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Guild Pillars (No Icons in Circles — Structured Editorial Columns) */}
        <section className="space-y-8" aria-labelledby="house-pillars">
          <div className="border-b border-brand-navy/15 pb-4">
            <span className="text-[10px] font-mono text-brand-coral uppercase tracking-widest block mb-1">
              THE HOUSE CANON
            </span>
            <h2 id="house-pillars" className="font-display text-3xl text-brand-navy font-normal">
              Three tenets of our studio.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
            <article className="border-l-2 border-brand-navy/20 pl-6 space-y-3">
              <span className="text-brand-coral font-mono text-xs tracking-widest block font-medium">
                01 · CRAFT
              </span>
              <h3 className="font-display text-2xl text-brand-navy font-normal">
                Uncompromising Precision
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/75 font-light leading-relaxed">
                Every barber on our floor is trained in classical scissor transitions, skin fade gradients, and straight-razor blade angle protocols.
              </p>
            </article>

            <article className="border-l-2 border-brand-navy/20 pl-6 space-y-3">
              <span className="text-brand-coral font-mono text-xs tracking-widest block font-medium">
                02 · HOSPITALITY
              </span>
              <h3 className="font-display text-2xl text-brand-navy font-normal">
                Unhurried Hospitality
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/75 font-light leading-relaxed">
                A serene lounge environment with private seating, artisanal beverages, secure parking, and zero crowded waiting queues.
              </p>
            </article>

            <article className="border-l-2 border-brand-navy/20 pl-6 space-y-3">
              <span className="text-brand-coral font-mono text-xs tracking-widest block font-medium">
                03 · HYGIENE
              </span>
              <h3 className="font-display text-2xl text-brand-navy font-normal">
                Clinical Cleanliness
              </h3>
              <p className="text-xs sm:text-sm text-brand-dark/75 font-light leading-relaxed">
                Hospital-grade autoclave sterilization for all metal instruments, fresh single-use straight razor blades, and fresh steam linens for every client.
              </p>
            </article>
          </div>
        </section>

        {/* Bottom Editorial Closing Statement */}
        <section className="p-10 sm:p-14 rounded-lg bg-brand-deep text-brand-light flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border border-brand-light/10 font-sans">
          <div className="space-y-3 max-w-xl">
            <span className="text-brand-coral micro-label">
              Experience The Lounge
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-brand-light font-normal">
              Experience the craft in person.
            </h2>
            <p className="text-xs sm:text-sm text-brand-light/70 font-light leading-relaxed">
              Reserve your chair today or stop by our studio lounge on Bath Road in Avondale.
            </p>
          </div>

          <Link
            href="/book"
            className="btn-primary py-4 px-8 text-xs uppercase tracking-wider font-semibold whitespace-nowrap flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve a Chair</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
