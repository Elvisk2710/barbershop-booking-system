'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const SEQUENCE_STAGES = [
  {
    step: '01',
    lead: 'More than a haircut.',
    sub: 'An intentional hour carved out of the city rhythm. Unhurried acoustic ambiance, tailored consultation, and zero distraction.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=85',
    detail: 'Avondale Lounge',
  },
  {
    step: '02',
    lead: 'Time to switch off.',
    sub: 'Warm botanical steam towels infused with organic eucalyptus. Recline in bespoke leather while facial tension dissolves.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=85',
    detail: 'Steam Therapy',
  },
  {
    step: '03',
    lead: 'Time to reset.',
    sub: 'Surgical straight-razor contours, calibrated scissor tapering, and scalp acupressure that invigorates the senses.',
    image: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1600&q=85',
    detail: 'Master Detailing',
  },
  {
    step: '04',
    lead: 'Walk out sharper.',
    sub: 'Finished with custom small-batch matte pomade, cooling aftershave balm, and an enduring, distinguished silhouette.',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1600&q=85',
    detail: 'The Finish',
  },
];

export function CinematicSequence() {
  const [activeStage, setActiveStage] = useState(0);

  // Gentle auto-rotation every 7 seconds, user click instantly selects
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage(prev => (prev + 1) % SEQUENCE_STAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = SEQUENCE_STAGES[activeStage];

  return (
    <section className="py-28 bg-brand-deep text-brand-light px-6 md:px-12 lg:px-16 border-t border-brand-light/10 relative overflow-hidden">
      {/* Background subtle ambient warmth */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-coral/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-light/10 pb-8">
          <div>
            <span className="text-brand-coral micro-label block mb-3">
              The Lounge Atmosphere
            </span>
            <h2 className="text-heading-1 font-normal text-brand-light">
              More than a haircut.
            </h2>
          </div>
          <p className="text-sm text-brand-light/60 font-light max-w-md">
            Four deliberate chapters engineered to reset your focus and restore your confidence.
          </p>
        </div>

        {/* Stable Split-Screen Grid with Constant Heights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Fixed-Height Story Cards (Zero Layout Shifts) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3.5">
            {SEQUENCE_STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStage(idx)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border text-left flex flex-col justify-between ${
                    isActive
                      ? 'bg-brand-navy/90 border-brand-coral/60 shadow-xl'
                      : 'bg-brand-navy/20 border-brand-light/10 hover:border-brand-light/30 hover:bg-brand-navy/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-xs font-mono tracking-widest transition-colors ${
                          isActive ? 'text-brand-coral font-bold' : 'text-brand-light/40'
                        }`}
                      >
                        PHASE {stage.step}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-mono tracking-wider transition-colors ${
                          isActive ? 'text-brand-light/70' : 'text-brand-light/30'
                        }`}
                      >
                        {stage.detail}
                      </span>
                    </div>

                    <h3
                      className={`font-display text-2xl transition-colors duration-200 ${
                        isActive ? 'text-brand-light' : 'text-brand-light/65'
                      }`}
                    >
                      {stage.lead}
                    </h3>
                  </div>

                  {/* Fixed in-place subtext with pure opacity transition (no height change) */}
                  <p
                    className={`text-xs sm:text-sm font-light leading-relaxed pt-2 transition-opacity duration-300 ${
                      isActive
                        ? 'text-brand-light/85 opacity-100'
                        : 'text-brand-light/40 opacity-60'
                    }`}
                  >
                    {stage.sub}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Matched Monolithic Viewport */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full min-h-[420px] lg:min-h-full rounded-3xl overflow-hidden shadow-2xl border border-brand-light/10 bg-brand-navy flex flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.step}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0 z-0"
                >
                  <Image
                    src={current.image}
                    alt={current.lead}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Viewport Overlay Caption */}
              <div className="relative z-10 m-6 p-6 rounded-2xl bg-brand-deep/85 backdrop-blur-md border border-brand-light/10 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-coral block mb-0.5">
                    HARARE STUDIO EXPERIENCE
                  </span>
                  <div className="font-display text-xl text-brand-light">
                    {current.lead}
                  </div>
                </div>

                <Link
                  href="/book"
                  className="btn-primary py-2.5 px-4 text-xs uppercase tracking-wider font-semibold shadow-md whitespace-nowrap"
                >
                  <span>Reserve →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
