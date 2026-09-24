import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Car, Navigation, ShieldCheck, Calendar } from 'lucide-react';
import { BRAND } from '@barber/shared';

export const metadata: Metadata = {
  title: 'Visit Harare Studio | Avondale Location & Directions',
  description:
    'Find Gentleman’s Grooming Bar at 12 Bath Road, Avondale, Harare. Opening hours, contact concierge, directions, and secure on-site gated parking details.',
  alternates: {
    canonical: 'https://gentlemansbar.co.zw/visit',
  },
  openGraph: {
    title: "Visit Studio & Location | Gentleman's Grooming Bar Avondale Harare",
    description:
      'Find Gentleman’s Grooming Bar at 12 Bath Road, Avondale, Harare. Opening hours, contact info, and directions.',
    url: 'https://gentlemansbar.co.zw/visit',
  },
};

export default function VisitPage() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BRAND.name}, ${BRAND.location.address}, ${BRAND.location.city}`
  )}`;

  return (
    <div className="bg-brand-cream text-brand-dark pt-36 pb-28 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Editorial Header */}
        <header className="max-w-3xl space-y-4">
          <span className="text-brand-coral micro-label block">
            Studio Location & Concierge
          </span>
          <h1 className="text-display-l font-normal text-brand-navy">
            Visit our Harare studio.
          </h1>
          <p className="text-base sm:text-lg text-brand-dark/75 font-light font-sans leading-relaxed max-w-prose">
            Conveniently situated in the quiet, leafy heart of Avondale with secure gated parking and a dedicated guest espresso bar.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans">
          {/* Details Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-lg p-8 sm:p-10 border border-brand-navy/15 space-y-8">
              <div>
                <h2 className="text-xs uppercase tracking-[0.18em] font-semibold text-brand-coral mb-3 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-brand-coral" />
                  <span>Address & Studio</span>
                </h2>
                <p className="font-display text-2xl text-brand-navy font-normal">
                  {BRAND.location.address}
                </p>
                <p className="text-sm text-brand-dark/70 font-light mt-1">
                  {BRAND.location.city}, {BRAND.location.country}
                </p>
                <div className="pt-3">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-brand-navy hover:text-brand-coral transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps →</span>
                  </a>
                </div>
              </div>

              <div className="border-t border-brand-navy/10 pt-6">
                <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-brand-coral mb-3 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-brand-coral" />
                  <span>Studio Hours</span>
                </h3>
                <ul className="space-y-2 text-sm text-brand-dark/80">
                  {BRAND.hours.map((h, i) => (
                    <li key={i} className="flex justify-between border-b border-brand-navy/5 pb-2">
                      <span className="text-brand-dark/60 font-light">{h.day}</span>
                      <span className="font-medium text-brand-navy">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-brand-navy/10 pt-6 space-y-3">
                <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-brand-coral mb-2">
                  Contact & Concierge Desk
                </h3>
                <div className="text-sm text-brand-dark/80 space-y-2 font-light">
                  <p className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-brand-coral" />
                    <a href={`tel:${BRAND.location.phone}`} className="hover:text-brand-coral transition-colors font-medium text-brand-navy">
                      {BRAND.location.phone}
                    </a>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-brand-coral" />
                    <a href={`mailto:${BRAND.location.email}`} className="hover:text-brand-coral transition-colors font-medium text-brand-navy">
                      {BRAND.location.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Parking & Accessibility Notice */}
            <div className="p-6 rounded-lg bg-brand-navy/5 border border-brand-navy/15 flex items-start space-x-4">
              <Car className="w-5 h-5 text-brand-coral flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-brand-navy">Complimentary Private Parking</h4>
                <p className="text-xs text-brand-dark/70 mt-1 leading-relaxed font-light">
                  Gated private parking with dedicated security on-site directly outside the studio entrance on Bath Road.
                </p>
              </div>
            </div>
          </div>

          {/* Policy & Booking Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-brand-deep rounded-lg p-8 sm:p-10 border border-brand-light/15 text-brand-light space-y-6">
              <span className="text-xs uppercase tracking-[0.18em] text-brand-coral font-semibold block">
                Appointment Protocol
              </span>
              <h2 className="font-display text-3xl font-normal leading-tight">
                Strictly reserved chairs.
              </h2>
              <p className="text-xs sm:text-sm text-brand-light/75 font-light leading-relaxed">
                To preserve our unrushed lounge atmosphere and ensure every gentleman receives complete dedicated focus, we operate exclusively on scheduled reservations.
              </p>

              <div className="space-y-3 border-t border-brand-light/10 pt-6 text-xs text-brand-light/80">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-brand-coral flex-shrink-0" />
                  <span>Reschedule or cancel freely up to 2 hours prior</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-brand-coral flex-shrink-0" />
                  <span>Real-time availability calendar synchronization</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/book"
                  className="w-full btn-primary py-4 text-center text-xs uppercase tracking-wider font-semibold block flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Your Chair</span>
                </Link>
              </div>
            </div>

            {/* Landmarks guide */}
            <div className="bg-white rounded-lg p-8 border border-brand-navy/15 space-y-2">
              <h3 className="font-display text-xl text-brand-navy font-normal">Harare Connections</h3>
              <p className="text-xs text-brand-dark/70 leading-relaxed font-light">
                Located 2 minutes from Avondale Shopping Centre, easily accessible via King George Road / Bath Road with quick connections from Borrowdale, Belgravia, and the Harare CBD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
