'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Check, Calendar, Download, MapPin, ArrowRight, User, Phone, Scissors } from 'lucide-react';
import { ApiClient } from '@/lib/api';
import { generateGoogleCalendarUrl, generateIcsContent, BRAND } from '@barber/shared';

export default function BookingConfirmationPage() {
  const params = useParams();
  const reference = String(params.reference || '').toUpperCase();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!reference) return;

    ApiClient.getBooking(reference)
      .then(data => setBooking(data))
      .catch(err => setError(err.message || 'Could not find booking record'))
      .finally(() => setLoading(false));
  }, [reference]);

  const handleDownloadIcs = () => {
    if (!booking) return;
    const icsContent = generateIcsContent({
      booking,
      service: booking.service,
      barber: booking.barber,
    });

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${booking.reference}-grooming-appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center pt-24 font-sans">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-coral border-t-transparent" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center pt-24 px-6 text-center font-sans">
        <div className="bg-white p-10 rounded-lg max-w-md space-y-4 border border-brand-navy/15">
          <div className="text-brand-coral font-display text-2xl font-normal">Record Not Located</div>
          <p className="text-sm text-brand-dark/70 font-light">
            We could not find reservation details for reference <strong>{reference}</strong>.
          </p>
          <Link href="/book" className="btn-primary text-xs uppercase tracking-wider font-semibold py-3 px-6 block">
            Reserve New Chair
          </Link>
        </div>
      </div>
    );
  }

  const googleCalUrl = generateGoogleCalendarUrl({
    booking,
    service: booking.service,
    barber: booking.barber,
  });

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BRAND.name}, ${BRAND.location.address}, ${BRAND.location.city}`
  )}`;

  return (
    <div className="bg-brand-cream min-h-screen text-brand-dark pt-36 pb-28 px-4 sm:px-6 md:px-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-10 animate-fade-in">
        {/* Header */}
        <header className="text-center space-y-3">
          <span className="text-brand-coral micro-label block">
            Reservation Secured
          </span>
          <h1 className="text-display-l font-normal text-brand-navy">
            You’re in the book.
          </h1>
          <p className="text-sm text-brand-dark/70 font-light max-w-md mx-auto">
            Your chair has been reserved at our Avondale studio lounge. Your official appointment voucher is detailed below.
          </p>
        </header>

        {/* The Gentleman's Boarding-Pass Voucher Card (Crisp 8px Radius, Hairline Border) */}
        <div className="bg-brand-deep text-brand-light rounded-lg border border-brand-coral/30 overflow-hidden relative">
          {/* Top Pass Section */}
          <div className="p-8 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-brand-light/10 pb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-[4px] bg-brand-coral/15 border border-brand-coral/30 flex items-center justify-center text-brand-coral">
                  <Scissors className="w-4 h-4 -rotate-45" />
                </div>
                <div>
                  <span className="font-display text-lg tracking-wider block leading-none font-normal">
                    GENTLEMAN’S
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-brand-coral font-medium block mt-0.5">
                    Avondale Studio Lounge
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right font-mono">
                <span className="text-[10px] uppercase text-brand-light/50 tracking-widest block">
                  REFERENCE NUMBER
                </span>
                <span className="text-xl font-bold tracking-widest text-brand-coral">
                  {booking.reference}
                </span>
              </div>
            </div>

            {/* Voucher Body Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-brand-light/40 block">
                  TREATMENT
                </span>
                <p className="font-display text-2xl text-brand-light font-normal">
                  {booking.service?.name}
                </p>
                <span className="text-xs text-brand-light/60 block">
                  {booking.service?.duration} Minutes · Botanical Compress
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-brand-light/40 block">
                  CRAFTSMAN
                </span>
                <p className="font-display text-2xl text-brand-light font-normal">
                  {booking.barber ? booking.barber.name : 'First Available Master'}
                </p>
                <span className="text-xs text-brand-light/60 block">
                  Avondale Studio Floor
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-brand-light/40 block">
                  DATE & TIME
                </span>
                <p className="font-mono text-xl font-bold text-brand-coral">
                  {booking.date}
                </p>
                <span className="text-xs text-brand-light/80 font-mono block">
                  {booking.startTime} – {booking.endTime}
                </span>
              </div>
            </div>

            {/* Client Record Strip */}
            <div className="bg-brand-navy/60 p-4 rounded-[6px] border border-brand-light/10 flex flex-col sm:flex-row justify-between text-xs text-brand-light/80 gap-3">
              <div className="flex items-center space-x-2">
                <User className="w-3.5 h-3.5 text-brand-coral" />
                <span>Guest: <strong>{booking.customerName}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-brand-coral" />
                <span>Mobile: {booking.customerPhone}</span>
              </div>
              <div>
                <span>Total Courtesy: <strong className="text-brand-coral font-mono text-sm">${booking.pricePaid ?? booking.service?.price}</strong></span>
              </div>
            </div>
          </div>

          {/* Tear-Off Actions Strip */}
          <div className="bg-brand-navy/90 border-t border-dashed border-brand-light/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleDownloadIcs}
                className="btn-secondary-dark py-3 px-5 text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Add to Apple / Outlook (.ics)</span>
              </button>

              <a
                href={googleCalUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-dark py-3 px-5 text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Google Calendar</span>
              </a>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-wider font-semibold text-brand-coral hover:underline inline-flex items-center space-x-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Studio Directions →</span>
            </a>
          </div>
        </div>

        {/* Helpful Advice */}
        <div className="bg-white rounded-lg p-6 border border-brand-navy/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-brand-dark/70">
          <div className="space-y-1">
            <h4 className="font-semibold text-brand-navy text-sm">Need to make adjustments?</h4>
            <p className="font-light">
              You can reschedule or modify your appointment freely online up to 2 hours prior to your scheduled chair time.
            </p>
          </div>

          <Link
            href={`/manage?ref=${booking.reference}`}
            className="link-editorial text-xs uppercase tracking-wider font-semibold text-brand-navy whitespace-nowrap"
          >
            <span>Manage Reservation →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
