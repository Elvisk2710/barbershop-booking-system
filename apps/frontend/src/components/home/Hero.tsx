'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { IMAGES } from '@/lib/imagery';

const EASE = [0.22, 1, 0.36, 1] as const;
const HEADLINE = ['The', 'hour', 'is', 'yours.'];

/**
 * The page's one orchestrated moment: the headline resolves out of a soft blur
 * word by word, then the studio photograph rises beneath it. As the reader
 * scrolls, the framed photograph opens out to the full width of the screen,
 * like stepping through the door.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'start 0.1'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.84, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [44, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1]);

  const word = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28, filter: 'blur(12px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1.1, delay: 0.15 + i * 0.09, ease: EASE },
  });

  const after = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative bg-paper pt-[calc(var(--nav-h)+clamp(3.5rem,9vw,7rem))]">
      <div className="shell text-center">
        <motion.p {...after(0.05)} className="t-subhead text-ink-2">
          Barbershop in Avondale, Harare
        </motion.p>

        <h1 className="t-hero mt-3 text-ink" aria-label="The hour is yours.">
          {HEADLINE.map((w, i) => (
            <motion.span key={w} {...word(i)} aria-hidden className="inline-block will-change-transform">
              {w}
              {i < HEADLINE.length - 1 && ' '}
            </motion.span>
          ))}
        </h1>

        <motion.p {...after(0.65)} className="t-lede text-ink-2 mt-6 mx-auto max-w-[34ch]">
          Cuts, fades and hot-towel shaves by appointment only. One guest per chair, and nobody
          waiting behind you.
        </motion.p>

        <motion.div
          {...after(0.8)}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-x-7 gap-y-4"
        >
          <Link href="/book" id="hero-reserve-cta" className="btn btn-ink btn-lg">
            Book a chair
          </Link>
          <Link href="/services" className="link-more t-lede text-ink">
            See the menu
            <ChevronRight className="w-[1em] h-[1em]" strokeWidth={2} />
          </Link>
        </motion.div>
      </div>

      <motion.div
        {...(reduce ? {} : { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } })}
        transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
        className="mt-[clamp(3.5rem,8vw,6rem)]"
      >
        <motion.div
          ref={frameRef}
          style={{ scale, borderRadius: radius }}
          className="media h-[62vh] min-h-[380px] md:h-[88vh] origin-top will-change-transform"
        >
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src={IMAGES.lounge}
              alt="The lounge at Gentleman’s Grooming Bar: leather chairs, warm lamps and mirrors"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          <p className="absolute left-6 bottom-6 md:left-10 md:bottom-10 t-caption text-white/85 max-w-[32ch]">
            Three chairs, one espresso machine and a playlist that stays below conversation.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
