'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Sparkles, Scissors, CheckCircle2 } from 'lucide-react';

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('grm_promo_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('grm_promo_dismissed', 'true');
    setIsOpen(false);
  };

  const handleClaim = () => {
    sessionStorage.setItem('grm_promo_dismissed', 'true');
    setIsOpen(false);
    router.push('/book?promo=FIRSTGUEST');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-deep/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      id="welcome-promo-modal"
    >
      <div className="relative w-full max-w-md bg-brand-deep text-brand-light rounded-lg border border-brand-coral/30 p-8 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-brand-light/60 hover:text-brand-coral transition-colors rounded-[4px]"
          aria-label="Close promotion dialog"
          id="close-promo-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal content */}
        <div className="flex items-center space-x-2 text-brand-coral text-xs uppercase tracking-[0.18em] font-sans font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>First Visit Privilege</span>
        </div>

        <h3 className="font-display text-3xl text-brand-light font-normal leading-snug mb-3">
          Welcome to the house.
        </h3>

        <p className="text-sm text-brand-light/75 leading-relaxed mb-6 font-light font-sans">
          Your first visit includes a complimentary beard tidy or <strong className="text-brand-coral font-medium">$4 welcome courtesy</strong> with any signature haircut.
        </p>

        <div className="bg-brand-navy/60 border border-brand-light/10 rounded-[6px] p-3.5 mb-6 flex items-center space-x-3 text-xs text-brand-light/90 font-sans">
          <CheckCircle2 className="w-4 h-4 text-brand-coral flex-shrink-0" />
          <span>Code <strong className="font-mono text-brand-coral tracking-wider">FIRSTGUEST</strong> applied at booking</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 font-sans">
          <button
            onClick={handleClaim}
            id="claim-promo-button"
            className="w-full sm:flex-1 btn-primary py-3 px-5 text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-2"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Claim Courtesy</span>
          </button>
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-4 py-3 text-xs text-brand-light/60 hover:text-brand-light transition-colors uppercase tracking-wider font-medium"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
