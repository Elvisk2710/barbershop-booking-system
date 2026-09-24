'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { Service } from '@barber/shared';

const SERVICE_EDITORIAL_PHOTOS: Record<string, string> = {
  'srv-classic': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
  'srv-fade': 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80',
  'srv-gentleman': 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80',
  'srv-beard-sculpt': 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=80',
  'srv-ritual': 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
  'srv-father-son': 'https://images.unsplash.com/photo-1517832606589-7157aff08e70?auto=format&fit=crop&w=1200&q=80',
};

interface EditorialServicesProps {
  services: Service[];
}

export function EditorialServices({ services }: EditorialServicesProps) {
  const featured = services.slice(0, 4);
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);

  const activePhoto =
    SERVICE_EDITORIAL_PHOTOS[featured[hoveredIdx]?.id] ||
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80';

  return (
    <section className="py-28 bg-brand-cream text-brand-dark px-6 md:px-12 lg:px-16 border-t border-brand-navy/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-navy/15 pb-8">
          <div>
            <span className="text-brand-coral micro-label block mb-2.5">
              The Treatment Menu
            </span>
            <h2 className="text-display-l font-normal text-brand-navy">
              Grooming as an art form.
            </h2>
          </div>
          <Link
            href="/services"
            className="link-editorial text-xs uppercase tracking-widest text-brand-navy font-semibold flex items-center space-x-2 group"
          >
            <span>Complete Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Editorial Menu Spread: Interactive Rows Left, Responsive Preview Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Numbered Editorial Rows */}
          <div className="lg:col-span-7 divide-y divide-brand-navy/15">
            {featured.map((service, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`py-8 transition-colors duration-200 group flex flex-col justify-between ${
                    isHovered ? 'bg-white/40 -mx-4 px-4 rounded-lg' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-2 max-w-lg">
                      <div className="flex items-baseline space-x-3">
                        <span className="text-xs font-mono font-medium tracking-widest text-brand-coral">
                          0{idx + 1}
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl text-brand-navy group-hover:text-brand-coral transition-colors font-normal">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-dark/70 font-light font-sans leading-relaxed pl-7">
                        {service.description}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="font-display text-2xl sm:text-3xl font-medium text-brand-navy">
                        ${service.price}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-brand-dark/50 justify-end font-sans">
                        <Clock className="w-3 h-3 text-brand-coral" />
                        <span>{service.duration} mins</span>
                      </div>
                    </div>
                  </div>

                  <div className="pl-7 pt-4 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-brand-dark/40">
                      {service.category} · INCLUDES BOTANICAL COMPRESS
                    </span>

                    <Link
                      href={`/book?service=${service.id}`}
                      className="btn-primary py-2.5 px-5 text-xs uppercase tracking-wider font-semibold"
                    >
                      <span>Reserve Chair</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Editorial Atmosphere Preview Window */}
          <div className="lg:col-span-5 sticky top-28 hidden lg:block">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-brand-navy/15 bg-brand-deep">
              <Image
                src={activePhoto}
                alt={featured[hoveredIdx]?.name || 'Grooming Service'}
                fill
                sizes="(max-width: 1200px) 40vw, 500px"
                className="object-cover transition-opacity duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-brand-light border-t border-brand-light/15 pt-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-coral block mb-1">
                  CHAIR PREVIEW · {featured[hoveredIdx]?.duration} MINUTES
                </span>
                <p className="font-serif text-lg text-brand-light font-normal">
                  {featured[hoveredIdx]?.name}
                </p>
                <p className="text-xs text-brand-light/70 font-light font-sans mt-1">
                  Calibrated to head anatomy with surgical straight-razor contours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
