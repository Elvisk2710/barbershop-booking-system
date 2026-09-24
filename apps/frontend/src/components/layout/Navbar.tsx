'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scissors, Menu, X, Calendar, MapPin, Clock } from 'lucide-react';
import { BRAND } from '@barber/shared';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/services', label: 'Grooming Menu' },
    { href: '/gentlemen', label: 'The Craftsmen' },
    { href: '/about', label: 'Our Story' },
    { href: '/visit', label: 'Harare Studio' },
    { href: '/manage', label: 'Manage Booking' },
  ];

  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'glass-nav py-3.5 text-brand-light'
            : 'bg-gradient-to-b from-brand-deep/95 via-brand-deep/70 to-transparent py-4 sm:py-5 text-brand-light'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0" aria-label="Gentleman's Grooming Bar Home">
            <div className="w-8 h-8 rounded-[4px] bg-brand-coral/15 border border-brand-coral/30 flex items-center justify-center text-brand-coral transition-colors group-hover:border-brand-coral/60 flex-shrink-0">
              <Scissors className="w-3.5 h-3.5 -rotate-45" />
            </div>
            <div className="leading-tight">
              <span className="font-display text-lg sm:text-xl tracking-wider block font-medium leading-none text-brand-light whitespace-nowrap">
                GENTLEMAN’S
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-brand-coral font-sans font-medium block mt-0.5 whitespace-nowrap">
                Grooming Bar · Harare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-sans font-medium">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-brand-coral font-semibold'
                      : 'text-brand-light/75 hover:text-brand-coral'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-coral" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              href="/book"
              id="nav-book-button"
              className="hidden sm:inline-flex btn-primary text-xs uppercase tracking-wider font-semibold px-5 py-2.5 items-center space-x-2 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Chair</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-brand-light hover:text-brand-coral transition-colors rounded-[4px] flex items-center justify-center"
              aria-label="Open navigation menu"
              id="mobile-menu-toggle"
            >
              <Menu className="w-6 h-6 text-brand-light" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[60] bg-brand-deep text-brand-light flex flex-col justify-between p-6 sm:p-8 animate-fade-in overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-brand-light/10 pb-5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded-[4px] bg-brand-coral/15 border border-brand-coral/30 flex items-center justify-center text-brand-coral">
                <Scissors className="w-3.5 h-3.5 -rotate-45" />
              </div>
              <div className="leading-tight">
                <span className="font-display text-lg tracking-wider block font-medium leading-none text-brand-light">
                  GENTLEMAN’S
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-brand-coral font-sans font-medium block mt-0.5">
                  Harare Studio
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-brand-light/70 hover:text-brand-coral transition-colors rounded-[4px]"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 py-8">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-display text-3xl transition-colors text-left flex items-center justify-between ${
                    isActive ? 'text-brand-coral font-medium' : 'text-brand-light/85 hover:text-brand-coral'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs font-sans text-brand-coral tracking-widest">●</span>}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-6 pt-6 border-t border-brand-light/10">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full py-4 text-center font-semibold uppercase tracking-wider text-xs flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Your Chair</span>
            </Link>

            <div className="space-y-2 text-xs text-brand-light/60 font-light">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-coral flex-shrink-0" />
                <span>{BRAND.location.address}, {BRAND.location.city}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-brand-coral flex-shrink-0" />
                <span>Mon–Sat 08:00 – 18:00 · Avondale</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
