'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ATMOSPHERE_CHAPTERS = [
  {
    step: '01',
    lead: 'The Arrival & Consultation',
    subtitle: 'THE ARRIVAL',
    description: 'An intentional hour carved out of the city rhythm. Unhurried acoustic ambiance, tailored consultation on hair growth grain, and zero distraction.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=85',
    detail: 'Avondale Lounge',
  },
  {
    step: '02',
    lead: 'Eucalyptus Steam & Release',
    subtitle: 'THE RESET',
    description: 'Warm botanical steam towels infused with organic eucalyptus. Recline in bespoke leather while facial tension and daily noise dissolve.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=85',
    detail: 'Steam Therapy',
  },
  {
    step: '03',
    lead: 'Scissor Tapering & Razor Contours',
    subtitle: 'THE CRAFT',
    description: 'Surgical straight-razor detailing, hand-calibrated scissor transitions, and invigorating scalp acupressure.',
    image: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1600&q=85',
    detail: 'Master Detailing',
  },
  {
    step: '04',
    lead: 'Matte Finish & Clean Silhouette',
    subtitle: 'THE FINISH',
    description: 'Finished with custom small-batch matte pomade, cooling aftershave tonic, and a sharp, enduring silhouette.',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1600&q=85',
    detail: 'The Silhouette',
  },
];

export function LoungeAtmosphere() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = ATMOSPHERE_CHAPTERS[activeIdx];

  return (
    <section className="py-28 bg-brand-deep text-brand-light px-6 md:px-12 lg:px-16 border-t border-brand-light/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-light/10 pb-8">
          <div>
            <span className="text-brand-coral micro-label block mb-2.5">
              The Harare Atmosphere
            </span>
            <h2 className="text-display-l font-normal text-brand-light">
              More than a haircut.
            </h2>
          </div>
          <p className="text-sm text-brand-light/70 font-light font-sans max-w-md leading-relaxed">
            Four deliberate chapters engineered to reset your focus and restore your presence.
          </p>
        </div>

        {/* Editorial Split: Chapter List Left, High-Impact Cinematic Viewport Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Chapter Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {ATMOSPHERE_CHAPTERS.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-6 rounded-lg cursor-pointer transition-colors duration-200 border text-left ${
                    isActive
                      ? 'bg-brand-navy border-brand-coral/60'
                      : 'bg-brand-navy/20 border-brand-light/10 hover:border-brand-light/25 hover:bg-brand-navy/35'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-mono tracking-widest ${
                        isActive ? 'text-brand-coral font-medium' : 'text-brand-light/40'
                      }`}
                    >
                      PHASE {item.step}
                    </span>
                    <span className="text-[10px] uppercase font-sans tracking-wider text-brand-light/40">
                      {item.detail}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-2xl transition-colors ${
                      isActive ? 'text-brand-light font-normal' : 'text-brand-light/70'
                    }`}
                  >
                    {item.lead}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm font-light font-sans leading-relaxed pt-2 transition-opacity duration-200 ${
                      isActive ? 'text-brand-light/80 opacity-100' : 'text-brand-light/40 opacity-60'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Cinematic Viewport */}
          <div className="lg:col-span-7 flex">
            <div className="relative w-full min-h-[440px] lg:min-h-full rounded-lg overflow-hidden border border-brand-light/15 bg-brand-navy flex flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.step}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-0"
                >
                  <Image
                    src={current.image}
                    alt={current.lead}
                    fill
                    sizes="(max-width: 1200px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/30 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Viewport Caption Bar */}
              <div className="relative z-10 m-6 p-6 rounded-lg bg-brand-deep/90 border border-brand-light/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-coral block mb-1">
                    STUDIO RITUAL · PHASE {current.step}
                  </span>
                  <div className="font-display text-2xl text-brand-light font-normal">
                    {current.lead}
                  </div>
                </div>

                <Link
                  href="/book"
                  className="btn-primary py-2.5 px-5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap self-start sm:self-auto"
                >
                  <span>Reserve Chair</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
