'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { IMAGES } from '@/lib/imagery';

const STEPS = [
  {
    title: 'Arrive',
    body: 'Your barber is free when you walk in. Take an espresso, sit down, and talk through what you want — how it grows, how you wear it, how long it needs to last.',
    image: IMAGES.duo,
    alt: 'A guest seated in the lounge with a coffee before his appointment',
  },
  {
    title: 'Recline',
    body: 'The cut, done without watching the clock. Then a hot eucalyptus towel, a straight-razor edge on the neckline, and a few quiet minutes in the chair.',
    image: IMAGES.towel,
    alt: 'A barber finishing a cut with a straight razor',
  },
  {
    title: 'Leave sharp',
    body: 'A finish that suits your hair, a look in the mirror together, and your next visit booked before you stand up — if you want it.',
    image: IMAGES.fade,
    alt: 'A finished skin fade seen from the side',
  },
];

/**
 * An appointment told in three steps. On wide screens the photograph stays
 * pinned while the steps scroll past it, crossfading as each one takes focus.
 */
export function Ritual() {
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-paper" aria-labelledby="ritual-title">
      <div className="shell">
        <h2 id="ritual-title" className="t-display text-ink max-w-[14ch]">
          An appointment, start to finish.
        </h2>

        <div className="mt-14 md:mt-20 grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="hidden md:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">
              <div className="media rounded-[28px] aspect-[4/5]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={STEPS[active].image}
                      alt={STEPS[active].alt}
                      fill
                      sizes="(max-width: 1080px) 50vw, 500px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-6 bottom-6 flex gap-1.5" aria-hidden>
                  {STEPS.map((_, i) => (
                    <span key={i} className="h-[3px] flex-1 rounded-full bg-white/30 overflow-hidden">
                      <span
                        className="block h-full bg-white rounded-full origin-left transition-transform duration-700 ease-out"
                        style={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ol className="md:pt-[12vh] md:pb-[8vh] space-y-16 md:space-y-0">
            {STEPS.map((step, i) => (
              <Step key={step.title} index={i} active={active === i} onActive={setActive} {...step} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  title,
  body,
  image,
  alt,
  active,
  onActive,
}: (typeof STEPS)[number] & {
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="md:min-h-[60vh] md:flex md:flex-col md:justify-center">
      <div className="media rounded-[22px] aspect-[4/3] mb-6 md:hidden">
        <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div
        className={`transition-opacity duration-500 ease-out ${
          active ? 'md:opacity-100' : 'md:opacity-30'
        }`}
      >
        <p className="t-subhead text-ink-3 tabular">{index + 1}</p>
        <h3 className="t-title text-ink mt-1">{title}</h3>
        <p className="t-lede text-ink-2 mt-4 max-w-[36ch]">{body}</p>
      </div>
    </li>
  );
}
