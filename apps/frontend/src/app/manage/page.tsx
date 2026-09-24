'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { ApiClient } from '@/lib/api';
import { Booking } from '@barber/shared';

function ManageBookingContent() {
  const searchParams = useSearchParams();
  const [reference, setReference] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Reschedule state
  const [isRescheduling, setIsRescheduling] = useState<boolean>(false);
  const [newDate, setNewDate] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('10:00');

  useEffect(() => {
    const urlRef = searchParams.get('ref');
    if (urlRef) {
      setReference(urlRef);
      ApiClient.getBooking(urlRef)
        .then(data => setBooking(data))
        .catch(() => {});
    }
  }, [searchParams]);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;

    setLoading(true);
    setMessage(null);
    try {
      const data = await ApiClient.getBooking(reference.trim(), email.trim() || undefined);
      setBooking(data);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'No booking matches that reference. Check the code in your confirmation email.' });
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = async () => {
    if (!booking || !newDate || !newTime) {
      setMessage({ type: 'error', text: 'Pick a new day and time first.' });
      return;
    }
    setActionLoading(true);
    setMessage(null);
    try {
      const updated = await ApiClient.rescheduleBooking(booking.reference, {
        date: newDate,
        startTime: newTime,
      });
      setBooking(updated);
      setIsRescheduling(false);
      setMessage({ type: 'success', text: 'Booking moved. We’ve emailed you the new time.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'That time isn’t free. Try another time.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!booking) return;
    if (!window.confirm('Cancel this booking? The time will be released to other guests.')) {
      return;
    }
    setActionLoading(true);
    setMessage(null);
    try {
      const updated = await ApiClient.cancelBooking(booking.reference);
      setBooking(updated);
      setMessage({ type: 'success', text: 'Booking cancelled.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'We couldn’t cancel the booking. Call the studio and we’ll sort it out.' });
    } finally {
      setActionLoading(false);
    }
  };

  const TIMES = ['09:00', '09:45', '10:30', '11:15', '14:00', '14:45', '15:30', '16:15'];
  const cancelled = booking?.status === 'CANCELLED';

  return (
    <div className="shell max-w-[640px] pt-[calc(var(--nav-h)+clamp(3rem,8vw,6rem))] pb-[clamp(5rem,10vw,8rem)]">
      <header className="text-center">
        <h1 className="t-display text-ink">Your booking.</h1>
        <p className="t-lede text-ink-2 mt-4 mx-auto max-w-[34ch]">
          Enter the reference from your confirmation to move or cancel it.
        </p>
      </header>

      <form onSubmit={handleLookup} className="mt-10 grid gap-3">
        <div className="field">
          <input
            id="reference"
            type="text"
            required
            value={reference}
            onChange={e => setReference(e.target.value.toUpperCase())}
            placeholder=" "
            autoComplete="off"
            className="field-input uppercase tracking-[0.04em]"
          />
          <label htmlFor="reference" className="field-label">
            Booking reference
          </label>
        </div>
        <div className="field">
          <input
            id="lookup-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder=" "
            autoComplete="email"
            className="field-input"
          />
          <label htmlFor="lookup-email" className="field-label">
            Email (optional)
          </label>
        </div>
        <button type="submit" disabled={loading || !reference.trim()} className="btn btn-ink btn-lg mt-2">
          {loading ? <span className="spinner w-4 h-4" aria-label="Searching" /> : 'Find booking'}
        </button>
      </form>

      <AnimatePresence>
        {message && (
          <motion.div
            key={message.text}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className={`mt-6 rounded-[14px] p-4 t-caption flex items-start gap-2.5 ${
              message.type === 'success' ? 'bg-[#eef8f1] text-[#1d6b3d]' : 'bg-[#fff2f0] text-[#9f2a19]'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-[18px] h-[18px] shrink-0 mt-px" />
            ) : (
              <AlertCircle className="w-[18px] h-[18px] shrink-0 mt-px" />
            )}
            <span>{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {booking && (
          <motion.section
            key={booking.reference}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="tile mt-10"
            aria-label="Booking details"
          >
            <div className="p-7 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="t-caption text-ink-2 tabular">{booking.reference}</p>
                  <h2 className={`t-headline mt-1 ${cancelled ? 'text-ink-3 line-through' : 'text-ink'}`}>
                    {booking.service?.name || 'Appointment'}
                  </h2>
                </div>
                <span
                  className={`t-fine font-semibold rounded-full px-3 py-1.5 ${
                    cancelled ? 'bg-[#fff2f0] text-[#9f2a19]' : 'bg-white text-ink'
                  }`}
                >
                  {cancelled ? 'Cancelled' : 'Confirmed'}
                </span>
              </div>

              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 pt-6 border-t border-hairline t-caption">
                <div>
                  <dt className="text-ink-2">Day</dt>
                  <dd className="text-ink font-medium mt-0.5">
                    {new Date(`${booking.date}T00:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-2">Time</dt>
                  <dd className="text-ink font-medium mt-0.5 tabular">
                    {booking.startTime} – {booking.endTime}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-2">Barber</dt>
                  <dd className="text-ink font-medium mt-0.5">{booking.barber?.name || 'Whoever is free'}</dd>
                </div>
                <div>
                  <dt className="text-ink-2">Name</dt>
                  <dd className="text-ink font-medium mt-0.5">{booking.customerName}</dd>
                </div>
              </dl>

              <AnimatePresence initial={false}>
                {isRescheduling && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-7 mt-7 border-t border-hairline">
                      <h3 className="t-subhead font-semibold text-ink">Pick a new time</h3>
                      <div className="field mt-4">
                        <input
                          id="new-date"
                          type="date"
                          value={newDate}
                          onChange={e => setNewDate(e.target.value)}
                          placeholder=" "
                          className="field-input"
                        />
                        <label htmlFor="new-date" className="field-label" style={{ transform: 'translateY(-0.6875rem) scale(0.7)' }}>
                          Day
                        </label>
                      </div>
                      <div className="mt-4 grid grid-cols-4 gap-2" role="radiogroup" aria-label="Time">
                        {TIMES.map(t => (
                          <button
                            key={t}
                            type="button"
                            role="radio"
                            aria-checked={newTime === t}
                            onClick={() => setNewTime(t)}
                            className={`h-11 rounded-full t-caption font-medium tabular transition-colors duration-200 ${
                              newTime === t ? 'bg-ink text-white' : 'bg-white text-ink shadow-[inset_0_0_0_1px_var(--hairline)] hover:shadow-[inset_0_0_0_1px_var(--ink-3)]'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center gap-3">
                        <button type="button" onClick={handleReschedule} disabled={actionLoading} className="btn btn-ink">
                          {actionLoading ? 'Moving…' : 'Move booking'}
                        </button>
                        <button type="button" onClick={() => setIsRescheduling(false)} className="btn text-ink-2 hover:text-ink px-3">
                          Keep current time
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!cancelled && !isRescheduling && (
              <div className="border-t border-hairline grid grid-cols-2 divide-x divide-hairline t-caption">
                <button type="button" onClick={() => setIsRescheduling(true)} className="p-4 text-ink hover:bg-black/[0.03] transition-colors">
                  Change time
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={actionLoading}
                  className="p-4 text-[#c4331f] hover:bg-black/[0.03] transition-colors disabled:opacity-40"
                >
                  Cancel booking
                </button>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ManagePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] grid place-items-center text-ink-3">
          <span className="spinner" aria-label="Loading" />
        </div>
      }
    >
      <ManageBookingContent />
    </Suspense>
  );
}
