'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const STORAGE_KEY = 'grm_promo_dismissed';

/**
 * First-visit offer. Instead of a blocking modal it arrives as a small card in
 * the corner, so it never interrupts someone who is reading or booking.
 */
export function PromoModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {}
    if (dismissed || pathname.startsWith('/book')) return;
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const remember = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
  };

  const dismiss = () => {
    remember();
    setOpen(false);
  };

  const claim = () => {
    remember();
    setOpen(false);
    router.push('/book?promo=FIRSTGUEST');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="promo"
          id="welcome-promo-modal"
          role="dialog"
          aria-labelledby="promo-title"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed z-[45] left-3 right-3 bottom-[88px] md:left-auto md:right-6 md:bottom-6 md:w-[360px] tile-dark p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
        >
          <button
            type="button"
            id="close-promo-modal"
            onClick={dismiss}
            aria-label="Dismiss offer"
            className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={2.25} />
          </button>

          <p className="t-caption text-ember font-medium">First visit</p>
          <h2 id="promo-title" className="t-headline mt-1 pr-8">
            $4 off your first cut.
          </h2>
          <p className="t-caption text-white/60 mt-2">
            Or a beard tidy on the house. We’ll add the code FIRSTGUEST to your booking.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button type="button" id="claim-promo-button" onClick={claim} className="btn btn-ember btn-sm px-5">
              Use offer
            </button>
            <button type="button" onClick={dismiss} className="btn btn-sm text-white/70 hover:text-white px-3">
              Not now
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
