import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { ApiClient } from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';

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
    <>
      <PageHeader
        title="Our barbers."
        lede="Three people, each with their own chair and their own regulars. Book one by name, or take whoever is free first."
      />

      <ul className="shell section pt-16 md:pt-20 grid gap-x-5 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {barbers.map(barber => {
          const first = barber.name.split(' ')[0];
          return (
            <li key={barber.id} className="flex flex-col">
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
                <h2 className="t-headline text-ink mt-6">{barber.name}</h2>
                <p className="t-caption text-ink-2 mt-1">
                  {barber.role}, {barber.experienceYears} years behind the chair
                </p>
              </Link>

              <p className="t-caption text-ink-2 mt-4 max-w-[40ch]">{barber.bio}</p>

              <div className="mt-auto pt-6 flex items-center gap-6">
                <Link href={`/book?barber=${barber.id}`} className="btn btn-ink btn-sm">
                  Book with {first}
                </Link>
                <Link href={`/gentlemen/${barber.slug}`} className="link-more t-caption text-ink">
                  Profile
                  <ChevronRight className="w-[1em] h-[1em]" strokeWidth={2} />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
