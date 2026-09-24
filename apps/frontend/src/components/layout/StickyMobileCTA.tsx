'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar } from 'lucide-react';

export function StickyMobileCTA() {
  const pathname = usePathname();

  // Hide on booking, management, and legal pages
  const isExcluded =
    pathname.startsWith('/book') ||
    pathname.startsWith('/manage') ||
    pathname.startsWith('/terms') ||
    pathname.startsWith('/privacy');

  if (isExcluded) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <Link
        href="/book"
        className="w-full btn-primary py-3.5 px-5 flex items-center justify-between font-sans font-medium tracking-wider uppercase text-xs border border-brand-coral/40"
      >
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Reserve a Chair</span>
        </div>
        <span className="text-brand-dark/80 font-semibold">From $10 →</span>
      </Link>
    </div>
  );
}
