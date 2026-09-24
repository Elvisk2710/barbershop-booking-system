import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { ApiClient } from '@/lib/api';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const barber = await ApiClient.getBarberBySlug(params.slug);
  if (!barber) return { title: 'Craftsman Not Found' };
  return {
    title: `${barber.name} | Master Barber Harare`,
    description: `${barber.role} at Gentleman's Grooming Bar in Avondale, Harare. ${barber.bio}`,
    alternates: {
      canonical: `https://gentlemansbar.co.zw/gentlemen/${params.slug}`,
    },
    openGraph: {
      title: `${barber.name} | Gentleman's Grooming Bar Harare`,
      description: `${barber.role} at Gentleman's Grooming Bar in Avondale, Harare.`,
      url: `https://gentlemansbar.co.zw/gentlemen/${params.slug}`,
    },
  };
}

export default async function BarberDetailPage({ params }: { params: { slug: string } }) {
  const barber = await ApiClient.getBarberBySlug(params.slug);

  if (!barber) {
    notFound();
  }

  const first = barber.name.split(' ')[0];

  return (
    <article className="pt-[calc(var(--nav-h)+1.5rem)]">
      <div className="shell">
        <Link href="/gentlemen" className="link-more t-caption text-ink-2 hover:text-ink">
          <ChevronLeft className="w-[1em] h-[1em]" strokeWidth={2} />
          All barbers
        </Link>
      </div>

      <div className="shell pt-10 md:pt-14 pb-[clamp(5rem,10vw,8rem)] grid gap-12 md:grid-cols-2 md:gap-16 items-start">
        <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)] space-y-4">
          <div className="media rounded-[28px] aspect-[4/5]">
            <Image
              src={barber.photo}
              alt={`Portrait of ${barber.name}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:pt-6">
          <p className="t-subhead text-ink-2">{barber.role}</p>
          <h1 className="t-display text-ink mt-2">{barber.name}</h1>
          <p className="t-caption text-ink-2 mt-4">{barber.experienceYears} years behind the chair</p>
          <p className="t-lede text-ink mt-8 max-w-[38ch]">{barber.bio}</p>


          {barber.specialties && barber.specialties.length > 0 && (
            <div className="mt-10">
              <h2 className="t-subhead font-semibold text-ink">Ask {first} about</h2>
              <ul className="mt-3 divide-y divide-hairline border-y border-hairline">
                {barber.specialties.map(spec => (
                  <li key={spec} className="py-3.5 t-lede text-ink-2">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {barber.actionPhoto && (
            <div className="media rounded-[22px] aspect-[16/10] mt-12">
              <Image
                src={barber.actionPhoto}
                alt={`${barber.name} at work in the studio`}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Link href={`/book?barber=${barber.id}`} className="btn btn-ink btn-lg">
              Book with {first}
            </Link>
            <p className="t-caption text-ink-2 max-w-[28ch]">
              Pick the service and time on the next screen.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
