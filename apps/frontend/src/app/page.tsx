import React from 'react';
import Link from 'next/link';
import { ApiClient } from '@/lib/api';
import { Hero } from '@/components/home/Hero';
import { Statement } from '@/components/home/Statement';
import { MenuGallery } from '@/components/home/MenuGallery';
import { Ritual } from '@/components/home/Ritual';
import { Barbers } from '@/components/home/Barbers';
import { VisitBento } from '@/components/home/VisitBento';

export default async function HomePage() {
  const [services, barbers] = await Promise.all([
    ApiClient.getServices(),
    ApiClient.getBarbers(),
  ]);

  return (
    <>
      <Hero />
      <Statement />
      <MenuGallery services={services} />
      <Ritual />
      <Barbers barbers={barbers} />
      <VisitBento />

      <section className="section bg-mist text-center">
        <div className="shell">
          <h2 className="t-hero text-ink">See you in the chair.</h2>
          <div className="mt-10">
            <Link href="/book" className="btn btn-ink btn-lg">
              Book a chair
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
