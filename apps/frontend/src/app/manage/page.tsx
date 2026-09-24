'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Calendar, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
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
      setMessage({ type: 'error', text: err.message || 'Appointment not found. Please check your reference code.' });
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = async () => {
    if (!booking || !newDate || !newTime) {
      setMessage({ type: 'error', text: 'Please select a new date and time.' });
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
      setMessage({ type: 'success', text: 'Appointment rescheduled successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to reschedule. Time slot may be unavailable.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!booking) return;
    if (!window.confirm('Are you sure you want to cancel this appointment reservation?')) {
      return;
    }
    setActionLoading(true);
    setMessage(null);
    try {
      const updated = await ApiClient.cancelBooking(booking.reference);
      setBooking(updated);
      setMessage({ type: 'success', text: 'Your appointment has been cancelled.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to cancel appointment.' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen text-brand-dark pt-36 pb-28 px-4 sm:px-6 md:px-12 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <span className="text-brand-coral micro-label block">
            Client Concierge Portal
          </span>
          <h1 className="text-display-l font-normal text-brand-navy">
            Manage your booking.
          </h1>
          <p className="text-sm text-brand-dark/70 font-light">
            Look up your appointment reference to reschedule, verify details, or cancel.
          </p>
        </header>

        {/* Lookup Card (Crisp 8px Radius, Hairline Border) */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-brand-navy/15">
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/70 block mb-1.5 font-sans">
                Booking Reference *
              </label>
              <input
                type="text"
                required
                value={reference}
                onChange={e => setReference(e.target.value.toUpperCase())}
                placeholder="e.g. GRM-2041"
                className="w-full px-4 py-3 rounded-[6px] border border-brand-navy/20 focus:border-brand-coral outline-none text-sm uppercase font-mono bg-white"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-brand-dark/70 block mb-1.5 font-sans">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. tendai@example.com"
                className="w-full px-4 py-3 rounded-[6px] border border-brand-navy/20 focus:border-brand-coral outline-none text-sm bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !reference.trim()}
              className="w-full btn-primary py-3.5 text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-deep border-t-transparent" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Find Appointment</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Feedback Messages */}
        {message && (
          <div
            className={`p-4 rounded-[6px] text-xs flex items-center space-x-2.5 font-sans ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Found Booking Card */}
        {booking && (
          <div className="bg-brand-deep text-brand-light rounded-lg p-6 sm:p-8 border border-brand-coral/30 space-y-6 animate-fade-in font-sans">
            <div className="flex justify-between items-start border-b border-brand-light/10 pb-4">
              <div>
                <span className="text-xs font-mono text-brand-coral tracking-widest block mb-1">
                  REF: {booking.reference}
                </span>
                <h3 className="font-display text-2xl text-brand-light font-normal">
                  {booking.service?.name || 'Grooming Service'}
                </h3>
              </div>
              <div
                className={`px-3 py-1 rounded-[4px] text-xs font-semibold uppercase tracking-wider ${
                  booking.status === 'CANCELLED'
                    ? 'bg-red-900/60 text-red-300 border border-red-700'
                    : 'bg-brand-navy text-brand-coral border border-brand-coral/40'
                }`}
              >
                {booking.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-brand-light/80">
              <div>
                <span className="text-brand-light/50 block">Barber</span>
                <span className="font-medium text-brand-light">{booking.barber?.name || 'Assigned Barber'}</span>
              </div>
              <div>
                <span className="text-brand-light/50 block">Client</span>
                <span className="font-medium text-brand-light">{booking.customerName}</span>
              </div>
              <div>
                <span className="text-brand-light/50 block">Date</span>
                <span className="font-medium text-brand-light">{booking.date}</span>
              </div>
              <div>
                <span className="text-brand-light/50 block">Time</span>
                <span className="font-medium text-brand-coral font-mono">
                  {booking.startTime} – {booking.endTime}
                </span>
              </div>
            </div>

            {/* Reschedule Form Toggle */}
            {isRescheduling && (
              <div className="p-4 rounded-[6px] bg-brand-navy border border-brand-light/10 space-y-4 text-xs">
                <h4 className="font-semibold text-brand-light uppercase tracking-wider">
                  Select New Date & Time
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-brand-light/70 block mb-1">Date</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={e => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-[4px] bg-brand-deep border border-brand-light/20 text-brand-light outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-brand-light/70 block mb-1">Time</label>
                    <select
                      value={newTime}
                      onChange={e => setNewTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-[4px] bg-brand-deep border border-brand-light/20 text-brand-light outline-none"
                    >
                      <option value="09:00">09:00</option>
                      <option value="09:45">09:45</option>
                      <option value="10:30">10:30</option>
                      <option value="11:15">11:15</option>
                      <option value="14:00">14:00</option>
                      <option value="14:45">14:45</option>
                      <option value="15:30">15:30</option>
                      <option value="16:15">16:15</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={handleReschedule}
                    disabled={actionLoading}
                    className="btn-primary py-2 px-4 text-xs uppercase tracking-wider font-semibold"
                  >
                    {actionLoading ? 'Saving...' : 'Confirm New Time'}
                  </button>
                  <button
                    onClick={() => setIsRescheduling(false)}
                    className="btn-secondary-dark py-2 px-4 text-xs uppercase tracking-wider font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {booking.status !== 'CANCELLED' && (
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-brand-light/10">
                {!isRescheduling && (
                  <button
                    onClick={() => setIsRescheduling(true)}
                    className="btn-primary py-2.5 px-5 text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Reschedule Chair</span>
                  </button>
                )}

                <button
                  onClick={handleCancel}
                  disabled={actionLoading}
                  className="px-4 py-2.5 rounded-[6px] border border-red-400/40 text-red-300 hover:bg-red-950/40 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Cancel Appointment</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link href="/" className="link-editorial text-xs uppercase tracking-widest text-brand-navy font-semibold">
            ← Return to Gentleman’s Grooming Bar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ManagePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-cream flex items-center justify-center pt-24 font-sans">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-coral border-t-transparent" />
        </div>
      }
    >
      <ManageBookingContent />
    </Suspense>
  );
}
