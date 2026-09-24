'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Service } from '@barber/shared';
import { serviceImage } from '@/lib/imagery';

interface MenuGalleryProps {
  services: Service[];
}

export function MenuGallery({ services }: MenuGalleryProps) {
  const rowRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const page = (dir: 1 | -1) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="section bg-mist overflow-hidden" aria-labelledby="menu-title">
      <div className="shell flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 id="menu-title" className="t-display text-ink">
          The menu.
        </h2>
        <Link href="/services" className="link-more t-lede text-ink pb-2">
          All prices and details
          <ChevronRight className="w-[1em] h-[1em]" strokeWidth={2} />
        </Link>
      </div>

      <ul
        ref={rowRef}
        onScroll={measure}
        className="snap-row gallery-inset gap-5 mt-10 md:mt-14 pb-2"
        aria-label="Services"
      >
        {services.map(service => (
          <li key={service.id} className="shrink-0 w-[78vw] max-w-[340px] md:w-[340px] md:max-w-none">
            <article className="group relative tile-dark aspect-[4/5] flex flex-col justify-between p-7">
              <div className="media absolute inset-0 -z-10">
                <Image
                  src={serviceImage(service.id)}
                  alt=""
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/60" />
              </div>

              <div>
                <p className="t-caption text-white/70 tabular">{service.duration} minutes</p>
                <h3 className="t-headline text-white mt-1.5 max-w-[14ch]">{service.name}</h3>
              </div>

              <div className="flex items-end justify-between gap-4">
                <p className="t-caption text-white/80 max-w-[22ch] line-clamp-3">{service.description}</p>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="t-subhead text-white tabular">${service.price}</span>
                  <Link
                    href={`/book?service=${service.id}`}
                    aria-label={`Book ${service.name}`}
                    className="h-9 w-9 rounded-full bg-white/90 text-ink grid place-items-center transition-transform duration-300 ease-spring hover:scale-110 active:scale-95"
                  >
                    <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="shell mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => page(-1)}
          disabled={atStart}
          aria-label="Previous services"
          className="h-9 w-9 rounded-full bg-[#e3e3e8] text-ink grid place-items-center transition-[opacity,background-color] hover:bg-[#d8d8dd] disabled:opacity-40 disabled:cursor-default"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          disabled={atEnd}
          aria-label="More services"
          className="h-9 w-9 rounded-full bg-[#e3e3e8] text-ink grid place-items-center transition-[opacity,background-color] hover:bg-[#d8d8dd] disabled:opacity-40 disabled:cursor-default"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
