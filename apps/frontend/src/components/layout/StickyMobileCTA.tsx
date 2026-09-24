'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * A slim frosted bar that rises into view on phones once the reader has
 * scrolled past the first screen, so the booking action is always a thumb away.
 */
export function StickyMobileCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const excluded = ['/book', '/booking', '/manage', '/terms', '/privacy'].some(p =>
    pathname.startsWith(p)
  );
  if (excluded) return null;

  return (
    <div
      className={`md:hidden fixed inset-x-3 bottom-3 z-40 transition-[transform,opacity] duration-500 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-[calc(100%+1rem)] opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <div className="material rounded-[22px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] pl-5 pr-2 py-2 flex items-center justify-between">
        <div className="leading-tight">
          <p className="t-caption font-semibold text-ink">Cuts from $10</p>
          <p className="t-fine text-ink-2">Open Mon–Sat in Avondale</p>
        </div>
        <Link href="/book" tabIndex={visible ? 0 : -1} className="btn btn-ink btn-sm min-h-[40px] px-5">
          Book
        </Link>
      </div>
    </div>
  );
}
