import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
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

  const actionPhoto =
    barber.actionPhoto ||
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="bg-brand-cream text-brand-dark pt-36 pb-28 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-16">
        <nav aria-label="Breadcrumb">
          <Link
            href="/gentlemen"
            className="link-editorial text-xs uppercase tracking-widest text-brand-navy font-semibold inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Craftsmen</span>
          </Link>
        </nav>

        {/* Profile Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Dual Imagery Layout (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-brand-navy/15 bg-brand-deep">
              <Image
                src={barber.photo}
                alt={`${barber.name} portrait`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 bg-brand-deep/90 px-3 py-1 rounded-[4px] text-xs font-mono text-brand-coral uppercase tracking-wider border border-brand-light/10">
                {barber.experienceYears} Years Craft
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-brand-navy/15 hidden sm:block bg-brand-deep">
              <Image
                src={actionPhoto}
                alt={`${barber.name} in action in Avondale studio`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-deep/30" />
              <div className="absolute bottom-3 left-3 text-[10px] uppercase font-mono tracking-widest text-brand-light bg-brand-deep/90 px-2.5 py-1 rounded-[4px] border border-brand-light/10">
                Studio Detailing
              </div>
            </div>
          </div>

          {/* Profile Narrative & Booking Module (Col 7) */}
          <div className="lg:col-span-7 space-y-8 font-sans">
            <header className="space-y-2 border-b border-brand-navy/15 pb-6">
              <span className="text-brand-coral micro-label block">
                {barber.role}
              </span>
              <h1 className="text-display-l font-normal text-brand-navy">
                {barber.name}
              </h1>
            </header>

            <div className="space-y-4 text-base sm:text-lg text-brand-dark/80 font-light leading-relaxed max-w-prose">
              <p>{barber.bio}</p>
              <p className="text-sm sm:text-base text-brand-dark/70">
                Known across Harare for measured scissor transitions and deep understanding of hair density, growth grain, and facial proportions.
              </p>
            </div>

            {/* Specialties */}
            <div className="space-y-3 pt-2">
              <span className="micro-label text-brand-dark/60 block">
                Signature Specialties
              </span>
              <div className="flex flex-wrap gap-2">
                {barber.specialties?.map((spec: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-[4px] bg-white border border-brand-navy/10 text-brand-navy font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Reservation Folio Card */}
            <div className="p-8 rounded-lg bg-brand-deep text-brand-light space-y-6 border border-brand-coral/25">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-coral block">
                  CHAIR RESERVATION
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-normal">
                  Reserve an hour with {barber.name.split(' ')[0]}.
                </h2>
                <p className="text-xs sm:text-sm text-brand-light/70 font-light">
                  Sessions include tailored consultation, wash, steam compress, and artisanal refreshments.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/book?barber=${barber.id}`}
                  className="btn-primary py-4 px-8 text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Chair with {barber.name.split(' ')[0]}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
