import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { ApiClient } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Meet Our Master Barbers & Craftsmen',
  description:
    'Meet the master barbers at Gentleman’s Grooming Bar in Avondale, Harare. Over a decade of skin fade precision, texture artistry, and traditional straight-razor shave craft.',
  alternates: {
    canonical: 'https://gentlemansbar.co.zw/gentlemen',
  },
  openGraph: {
    title: "The Craftsmen | Master Barbers at Gentleman's Grooming Bar Harare",
    description:
      'Meet our master barbers, texture specialists, and straight razor craftsmen in Avondale, Harare.',
    url: 'https://gentlemansbar.co.zw/gentlemen',
  },
};

export default async function GentlemenPage() {
  const barbers = await ApiClient.getBarbers();

  return (
    <div className="bg-brand-cream text-brand-dark pt-36 pb-28 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Editorial Header */}
        <header className="max-w-3xl space-y-4">
          <span className="text-brand-coral micro-label block">
            The Studio Guild
          </span>
          <h1 className="text-display-l font-normal text-brand-navy">
            Your chair. Your barber.
          </h1>
          <p className="text-base sm:text-lg text-brand-dark/75 font-light font-sans leading-relaxed max-w-prose">
            Our craftsmen are selected for technical precision, calm presence, and dedication to the timeless ritual of gentlemanly grooming.
          </p>
        </header>

        {/* Craftsmen Roster with Dominant 4:5 Portraits */}
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
                {/* Dual-Portrait Container (4:5 Ratio, 8px Radius) */}
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-brand-deep border border-brand-navy/15">
                  <Image
                    src={barber.photo}
                    alt={`${barber.name} - ${barber.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
                  />
                  <Image
                    src={actionPhoto}
                    alt={`${barber.name} crafting haircut in Avondale studio`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-transparent to-transparent opacity-75" />

                  <div className="absolute top-4 right-4 bg-brand-deep/90 px-3 py-1 rounded-[4px] text-[10px] font-mono uppercase tracking-wider text-brand-coral border border-brand-light/10">
                    {barber.experienceYears} Years Craft
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-brand-light">
                    <div className="text-[10px] uppercase font-sans tracking-widest text-brand-coral mb-1 font-medium">
                      {barber.role}
                    </div>
                    <h2 className="font-display text-3xl text-brand-light font-normal">
                      {barber.name}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 pt-1 flex-grow flex flex-col justify-between font-sans">
                  <p className="text-xs sm:text-sm text-brand-dark/75 font-light leading-relaxed">
                    {barber.bio}
                  </p>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {barber.specialties?.map((spec: string, i: number) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded-[4px] bg-white border border-brand-navy/10 text-brand-navy font-normal"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 flex items-center justify-between border-t border-brand-navy/15">
                      <Link
                        href={`/gentlemen/${barber.slug}`}
                        className="text-xs uppercase tracking-wider font-semibold text-brand-navy hover:text-brand-coral transition-colors flex items-center space-x-1"
                      >
                        <span>Craft Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/book?barber=${barber.id}`}
                        className="btn-primary py-2.5 px-4 text-xs uppercase tracking-wider font-semibold"
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
      </div>
    </div>
  );
}
