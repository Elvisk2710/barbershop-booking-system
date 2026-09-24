import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Barber } from '@barber/shared';

interface BarbersProps {
  barbers: Barber[];
}

export function Barbers({ barbers }: BarbersProps) {
  return (
    <section className="section bg-night text-white" aria-labelledby="barbers-title">
      <div className="shell">
        <div className="max-w-[40rem]">
          <h2 id="barbers-title" className="t-display">
            Pick your barber. Keep your barber.
          </h2>
          <p className="t-lede text-white/60 mt-5 max-w-[38ch]">
            Book the same person every time and they’ll remember how you like it — down to the
            guard number.
          </p>
        </div>

        <ul className="mt-14 md:mt-20 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {barbers.map(barber => (
            <li key={barber.id}>
              <Link href={`/gentlemen/${barber.slug}`} className="group block">
                <div className="media rounded-[28px] aspect-[4/5]">
                  <Image
                    src={barber.photo}
                    alt={`${barber.name}, ${barber.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                    className="object-cover transition-[opacity,transform] duration-700 ease-out group-hover:opacity-0 group-hover:scale-[1.03]"
                  />
                  {barber.actionPhoto && (
                    <Image
                      src={barber.actionPhoto}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                      className="object-cover opacity-0 scale-[1.03] transition-[opacity,transform] duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
                    />
                  )}
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="t-subhead font-semibold">{barber.name}</h3>
                    <p className="t-caption text-white/55 mt-0.5">{barber.role}</p>
                  </div>
                  <p className="t-caption text-white/55 tabular shrink-0 pt-1">
                    {barber.experienceYears} yrs
                  </p>
                </div>
                <span className="link-more t-caption text-ember mt-3">
                  Meet {barber.name.split(' ')[0]}
                  <ChevronRight className="w-[1em] h-[1em]" strokeWidth={2} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
