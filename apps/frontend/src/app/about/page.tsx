import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { IMAGES } from '@/lib/imagery';
import { PageHeader } from '@/components/ui/PageHeader';

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

const PRINCIPLES = [
  {
    title: 'Time, not turnover',
    body: 'We book fewer people a day than a walk-in shop. That is the whole business model, and it is why no one ever hurries your cut.',
  },
  {
    title: 'Clean, every time',
    body: 'Tools go through an autoclave between guests. Razor blades are single-use. Towels and capes are fresh for every appointment.',
  },
  {
    title: 'A room worth sitting in',
    body: 'Proper chairs, good coffee, gated parking and a volume level where you can still hear yourself think.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="A barbershop that runs on time."
        lede="Gentleman’s opened on Bath Road in 2018 because we were tired of waiting two hours for a fifteen-minute cut."
      />

      <div className="shell-wide mt-16 md:mt-24">
        <div className="media rounded-[28px] aspect-[16/10] md:aspect-[21/9]">
          <Image
            src={IMAGES.chair}
            alt="A barber working at his station in the Avondale studio"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      <section className="shell section">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <h2 className="t-title text-ink max-w-[14ch]">We built the shop we wanted to sit in.</h2>
          <div className="space-y-6 t-lede text-ink-2 max-w-[38ch]">
            <p>
              The idea was simple: take the craft of a traditional barbershop and remove the
              waiting. Every chair is booked. Every guest gets their barber’s full attention from
              the moment they sit down.
            </p>
            <p>
              We spend the first few minutes talking — how your hair grows, how you wear it, what
              went wrong last time. Then we cut, finish with a hot towel, and let you get on with
              your day looking like you meant it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist section" aria-labelledby="principles">
        <div className="shell">
          <h2 id="principles" className="t-title text-ink">What we hold to.</h2>
          <div className="mt-12 md:mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {PRINCIPLES.map(p => (
              <div key={p.title} className="border-t border-ink pt-6">
                <h3 className="t-subhead font-semibold text-ink">{p.title}</h3>
                <p className="t-caption text-ink-2 mt-3 max-w-[34ch]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="shell">
          <h2 className="t-display text-ink">Try it for yourself.</h2>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book" className="btn btn-ink btn-lg">
              Book a chair
            </Link>
            <Link href="/visit" className="btn btn-ghost btn-lg">
              Plan your visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
