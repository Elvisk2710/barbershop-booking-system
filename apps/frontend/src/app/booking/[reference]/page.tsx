'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ApiClient } from '@/lib/api';
import { generateGoogleCalendarUrl, generateIcsContent, BRAND } from '@barber/shared';

export default function BookingConfirmationPage() {
  const params = useParams();
  const reference = String(params.reference || '').toUpperCase();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const reduce = useReducedMotion();

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
      <div className="min-h-[80vh] grid place-items-center text-ink-3">
        <span className="spinner" aria-label="Loading" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="shell min-h-[80vh] pt-[var(--nav-h)] flex flex-col items-center justify-center text-center">
        <h1 className="t-title text-ink">We can’t find that booking.</h1>
        <p className="t-lede text-ink-2 mt-4 max-w-[36ch]">
          Nothing matches the reference {reference}. Check the code in your confirmation email, or look it up with your email address.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link href={`/manage?ref=${reference}`} className="btn btn-ink">
            Look up a booking
          </Link>
          <Link href="/book" className="btn btn-ghost">
            Make a new booking
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

  const longDate = new Date(`${booking.date}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <div className="shell max-w-[720px] pt-[calc(var(--nav-h)+clamp(3rem,7vw,5rem))] pb-[clamp(5rem,10vw,8rem)]">
      <header className="text-center">
        <motion.svg
          viewBox="0 0 56 56"
          className="mx-auto h-14 w-14"
          aria-hidden
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <circle cx="28" cy="28" r="28" fill="var(--ink)" />
          <motion.path
            d="M17 29 l7 7 l15 -16"
            fill="none"
            stroke="#fff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          />
        </motion.svg>
        <motion.h1 {...rise(0.2)} className="t-display text-ink mt-8">
          You’re booked.
        </motion.h1>
        <motion.p {...rise(0.3)} className="t-lede text-ink-2 mt-4 mx-auto max-w-[34ch]">
          We’ve emailed the details to {booking.customerEmail ?? 'you'}. See you on {longDate}.
        </motion.p>
      </header>

      <motion.section {...rise(0.45)} className="tile mt-12" aria-label="Booking details">
        <div className="p-7 md:p-9">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="t-caption text-ink-2">{longDate}</p>
              <p className="t-title text-ink mt-1 tabular">{booking.startTime}</p>
              <p className="t-caption text-ink-2 mt-1 tabular">until {booking.endTime}</p>
            </div>
            <div className="text-right">
              <p className="t-caption text-ink-2">Reference</p>
              <p className="t-subhead font-semibold text-ink mt-1 tracking-[0.02em] tabular">{booking.reference}</p>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 pt-6 border-t border-hairline t-caption">
            <div>
              <dt className="text-ink-2">Service</dt>
              <dd className="text-ink font-medium mt-0.5">{booking.service?.name}</dd>
            </div>
            <div>
              <dt className="text-ink-2">Barber</dt>
              <dd className="text-ink font-medium mt-0.5">{booking.barber ? booking.barber.name : 'Whoever is free'}</dd>
            </div>
            <div>
              <dt className="text-ink-2">Name</dt>
              <dd className="text-ink font-medium mt-0.5">{booking.customerName}</dd>
            </div>
            <div>
              <dt className="text-ink-2">To pay at the studio</dt>
              <dd className="text-ink font-medium mt-0.5 tabular">${booking.pricePaid ?? booking.service?.price}</dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-hairline grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-hairline t-caption">
          <button type="button" onClick={handleDownloadIcs} className="p-4 text-ink hover:bg-black/[0.03] transition-colors">
            Add to Calendar
          </button>
          <a href={googleCalUrl} target="_blank" rel="noreferrer" className="p-4 text-center text-ink hover:bg-black/[0.03] transition-colors">
            Add to Google Calendar
          </a>
          <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="p-4 text-center text-ink hover:bg-black/[0.03] transition-colors">
            Directions
          </a>
        </div>
      </motion.section>

      <motion.p {...rise(0.55)} className="t-caption text-ink-2 text-center mt-8">
        Need to move it? You can change or cancel up to two hours before.{' '}
        <Link href={`/manage?ref=${booking.reference}`} className="link-more text-ink">
          Manage booking
          <ChevronRight className="w-[1em] h-[1em]" strokeWidth={2} />
        </Link>
      </motion.p>
    </div>
  );
}
