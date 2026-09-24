import React from 'react';
import Link from 'next/link';
import { Scissors, MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { BRAND } from '@barber/shared';

export function Footer() {
  return (
    <footer className="bg-brand-deep text-brand-light pt-20 pb-12 border-t border-brand-light/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Editorial Statement */}
        <div className="border-b border-brand-light/10 pb-16 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-brand-coral uppercase text-xs font-semibold tracking-[0.2em] font-sans block mb-3">
              The Gentleman’s House
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-light leading-tight font-normal">
              See you in the chair.
            </h2>
          </div>
          <Link
            href="/book"
            id="footer-book-cta"
            className="btn-primary text-xs uppercase tracking-wider font-semibold px-7 py-4 whitespace-nowrap self-start md:self-auto"
          >
            Reserve an Appointment →
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-brand-light/10 font-sans">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-[4px] bg-brand-coral/15 border border-brand-coral/30 flex items-center justify-center text-brand-coral">
                <Scissors className="w-3.5 h-3.5 -rotate-45" />
              </div>
              <span className="font-display text-xl font-normal tracking-wider">
                GENTLEMAN’S
              </span>
            </div>
            <p className="text-sm text-brand-light/70 leading-relaxed font-light">
              Traditional gentlemanly refinement interpreted through a modern African grooming studio in Avondale, Harare.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-[4px] bg-brand-light/5 hover:bg-brand-coral hover:text-brand-deep flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-[4px] bg-brand-light/5 hover:bg-brand-coral hover:text-brand-deep flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-brand-coral mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-light/75">
              <li>
                <Link href="/services" className="hover:text-brand-coral transition-colors">
                  Grooming Menu
                </Link>
              </li>
              <li>
                <Link href="/gentlemen" className="hover:text-brand-coral transition-colors">
                  The Craftsmen
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-coral transition-colors">
                  House Philosophy
                </Link>
              </li>
              <li>
                <Link href="/visit" className="hover:text-brand-coral transition-colors">
                  Avondale Studio & Map
                </Link>
              </li>
              <li>
                <Link href="/manage" className="hover:text-brand-coral transition-colors">
                  Manage Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-brand-coral mb-4 flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-brand-coral" />
              <span>Studio Hours</span>
            </h4>
            <ul className="space-y-2 text-sm text-brand-light/75">
              {BRAND.hours.map((h, i) => (
                <li key={i} className="flex justify-between border-b border-brand-light/5 pb-1">
                  <span className="text-brand-light/60">{h.day}</span>
                  <span className="font-medium text-brand-light">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-brand-coral mb-4 flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-brand-coral" />
              <span>Harare Studio</span>
            </h4>
            <address className="not-italic text-sm text-brand-light/75 space-y-2">
              <p>{BRAND.location.address}</p>
              <p>{BRAND.location.city}, {BRAND.location.country}</p>
              <p className="pt-2 flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-brand-coral" />
                <a href={`tel:${BRAND.location.phone}`} className="hover:text-brand-coral transition-colors">
                  {BRAND.location.phone}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-brand-coral" />
                <a href={`mailto:${BRAND.location.email}`} className="hover:text-brand-coral transition-colors">
                  {BRAND.location.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-brand-light/50 gap-4">
          <p>© {new Date().getFullYear()} Gentleman’s Grooming Bar. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/terms" id="footer-terms-link" className="hover:text-brand-light transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" id="footer-privacy-link" className="hover:text-brand-light transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
