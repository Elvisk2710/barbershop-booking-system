'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Scissors } from 'lucide-react';
import { Barber } from '@barber/shared';

interface CraftsmenRosterProps {
  barbers: Barber[];
}

export function CraftsmenRoster({ barbers }: CraftsmenRosterProps) {
  return (
    <section className="py-28 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-navy/15 pb-8">
        <div>
          <span className="text-brand-coral micro-label block mb-2.5">
            The Studio Craftsmen
          </span>
          <h2 className="text-display-l font-normal text-brand-navy">
            Your chair. Your barber.
          </h2>
        </div>
        <Link
          href="/gentlemen"
          className="link-editorial text-xs uppercase tracking-widest text-brand-navy font-semibold flex items-center space-x-2 group"
        >
          <span>Meet The Guild</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Editorial Craftsmen Gallery: Dominant Portrait Photography */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {barbers.map(barber => {
          const actionPhoto =
            barber.actionPhoto ||
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80';

          return (
            <article
              key={barber.id}
              className="group flex flex-col justify-between space-y-5"
            >
              {/* Dominant Portrait Container (4:5 Ratio, Crisp 8px Bevel, Dual Hover Crossfade) */}
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-brand-deep border border-brand-navy/15">
                {/* Primary Studio Portrait */}
                <Image
                  src={barber.photo}
                  alt={`${barber.name} - ${barber.role} at Gentleman's Grooming Bar`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
                />

                {/* Secondary In-Motion Craft Photo */}
                <Image
                  src={actionPhoto}
                  alt={`${barber.name} sculpting in Avondale studio`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-transparent to-transparent opacity-75" />

                {/* Quiet Badge */}
                <div className="absolute top-4 right-4 bg-brand-deep/90 px-3 py-1 rounded-[4px] text-[10px] font-mono uppercase tracking-wider text-brand-coral border border-brand-light/10">
                  {barber.experienceYears} Years Craft
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-brand-light">
                  <div className="text-[10px] uppercase tracking-widest text-brand-coral font-sans font-medium mb-1">
                    {barber.role}
                  </div>
                  <h3 className="font-display text-3xl text-brand-light font-normal">
                    {barber.name}
                  </h3>
                </div>
              </div>

              {/* Bio & Specialties */}
              <div className="space-y-4 pt-1 flex-grow flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-brand-dark/75 font-light font-sans leading-relaxed">
                  {barber.bio}
                </p>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {barber.specialties?.slice(0, 3).map((spec: string, i: number) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-[4px] bg-white border border-brand-navy/10 text-brand-navy font-sans font-normal"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-brand-navy/15">
                    <Link
                      href={`/gentlemen/${barber.slug}`}
                      className="text-xs uppercase tracking-wider font-semibold text-brand-navy hover:text-brand-coral transition-colors font-sans"
                    >
                      Craft Profile →
                    </Link>

                    <Link
                      href={`/book?barber=${barber.id}`}
                      className="btn-primary text-xs uppercase tracking-wider font-semibold py-2.5 px-4"
                    >
                      <span>Book Chair</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
