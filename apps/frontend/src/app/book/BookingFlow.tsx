'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, Check, ChevronLeft } from 'lucide-react';
import { ApiClient } from '@/lib/api';
import { Service, Barber, AvailabilitySlot, PromoCode } from '@barber/shared';

const STEPS = ['Service', 'Barber', 'Time', 'Details'] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

const toDateStr = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const formatLongDate = (dateStr: string) =>
  new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

export function BookingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();

  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);

  // Selection state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);

  // Form details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState<string>('');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        const [srvs, brbs] = await Promise.all([ApiClient.getServices(), ApiClient.getBarbers()]);
        setServices(srvs);
        setBarbers(brbs);

        const urlServiceId = searchParams.get('service');
        if (urlServiceId) {
          const match = srvs.find(s => s.id === urlServiceId || s.slug === urlServiceId);
          if (match) setSelectedService(match);
        }

        const urlBarberId = searchParams.get('barber');
        if (urlBarberId) {
          const match = brbs.find(b => b.id === urlBarberId || b.slug === urlBarberId);
          if (match) setSelectedBarber(match.id);
        }

        const urlPromo = searchParams.get('promo');
        if (urlPromo) {
          setPromoInput(urlPromo);
          ApiClient.validatePromo(urlPromo)
            .then(p => setAppliedPromo(p))
            .catch(() => {});
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(toDateStr(tomorrow));
      } catch (err: any) {
        console.error('Failed to load booking data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchParams]);

  useEffect(() => {
    if (!selectedService || !selectedDate) return;

    async function fetchSlots() {
      setSlotsLoading(true);
      setSelectedSlot(null);
      try {
        const data = await ApiClient.getAvailability(selectedDate, selectedService!.id, selectedBarber);
        setAvailableSlots(data.slots || []);
      } catch (err: any) {
        console.error('Availability fetch fallback:', err);
        setAvailableSlots([
          { time: '09:00', endTime: '09:45', available: true, period: 'morning', barberId: '' },
          { time: '09:45', endTime: '10:30', available: true, period: 'morning', barberId: '' },
          { time: '10:30', endTime: '11:15', available: false, period: 'morning', barberId: '' },
          { time: '11:15', endTime: '12:00', available: true, period: 'morning', barberId: '' },
          { time: '14:00', endTime: '14:45', available: true, period: 'afternoon', barberId: '' },
          { time: '14:45', endTime: '15:30', available: true, period: 'afternoon', barberId: '' },
          { time: '15:30', endTime: '16:15', available: true, period: 'afternoon', barberId: '' },
          { time: '16:15', endTime: '17:00', available: true, period: 'afternoon', barberId: '' },
        ]);
      } finally {
        setSlotsLoading(false);
      }
    }

    fetchSlots();
  }, [selectedService, selectedDate, selectedBarber]);

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    setErrorMessage('');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setPromoError('');
    try {
      const promo = await ApiClient.validatePromo(promoInput);
      setAppliedPromo(promo);
    } catch (err: any) {
      setPromoError(err.message || 'That code isn’t valid. Check the spelling and try again.');
      setAppliedPromo(null);
    }
  };

  const calculateDiscount = () => {
    if (!appliedPromo || !selectedService) return 0;
    if (appliedPromo.discountType === 'FIXED') {
      return Math.min(appliedPromo.discountValue, selectedService.price);
    }
    if (appliedPromo.discountType === 'PERCENTAGE') {
      return (selectedService.price * appliedPromo.discountValue) / 100;
    }
    return 0;
  };

  const handleCompleteBooking = async () => {
    if (!selectedService || !selectedSlot || !selectedDate) {
      setErrorMessage('Choose a service, a day and a time first.');
      return;
    }
    if (!customerName || !customerEmail || !customerPhone) {
      setErrorMessage('Add your name, email and mobile number so we can confirm the booking.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const result = await ApiClient.createBooking({
        serviceId: selectedService.id,
        barberId: selectedBarber,
        date: selectedDate,
        startTime: selectedSlot.time,
        customerName,
        customerEmail,
        customerPhone,
        specialRequests,
        promoCode: appliedPromo?.code,
      });

      router.push(`/booking/${result.reference}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'That time was just taken. Pick another time and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const datesList = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dateStr: toDateStr(d),
      dayName: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString('en-GB', { month: 'short' }),
      isSunday: d.getDay() === 0,
    };
  });

  const discount = calculateDiscount();
  const finalPrice = selectedService ? Math.max(0, selectedService.price - discount) : 0;
  const barberName =
    selectedBarber === 'any'
      ? 'Whoever is free'
      : barbers.find(b => b.id === selectedBarber)?.name ?? 'Whoever is free';

  const canContinue =
    (step === 1 && !!selectedService) ||
    step === 2 ||
    (step === 3 && !!selectedSlot) ||
    (step === 4 && !!customerName && !!customerEmail && !!customerPhone && !submitting);

  const primaryAction = () => {
    if (step < 4) goTo(step + 1);
    else handleCompleteBooking();
  };

  const primaryLabel = step < 4 ? 'Continue' : submitting ? 'Booking…' : `Book for $${finalPrice}`;

  if (loading) {
    return (
      <div className="min-h-[80vh] grid place-items-center text-ink-3">
        <span className="spinner" aria-label="Loading" />
      </div>
    );
  }

  const morningSlots = availableSlots.filter(s => s.period === 'morning');
  const afternoonSlots = availableSlots.filter(s => s.period === 'afternoon');

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 32 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * -32 }),
  };

  return (
    <div className="pt-[calc(var(--nav-h)+clamp(2.5rem,6vw,4.5rem))] pb-40 md:pb-32">
      <div className="shell">
        {/* Header and progress */}
        <header>
          <h1 className="t-display text-ink">Book a chair.</h1>
          <nav aria-label="Booking steps" className="mt-8">
            <ol className="grid grid-cols-4 gap-2 max-w-[560px]">
              {STEPS.map((label, i) => {
                const n = i + 1;
                const reachable = n <= step || (n === step + 1 && canContinue && step < 4);
                return (
                  <li key={label}>
                    <button
                      type="button"
                      disabled={!reachable || n === step}
                      onClick={() => goTo(n)}
                      aria-current={n === step ? 'step' : undefined}
                      className="w-full text-left group disabled:cursor-default"
                    >
                      <span className="block h-1 rounded-full bg-hairline overflow-hidden">
                        <span
                          className="block h-full rounded-full bg-ink origin-left transition-transform duration-700 ease-out"
                          style={{ transform: `scaleX(${n <= step ? 1 : 0})` }}
                        />
                      </span>
                      <span
                        className={`block t-fine mt-2 transition-colors ${
                          n === step ? 'text-ink font-semibold' : n < step ? 'text-ink-2 group-hover:text-ink' : 'text-ink-3'
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16 items-start">
          {/* Step content */}
          <div className="min-w-0">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.section
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE }}
              >
                {step === 1 && (
                  <>
                    <StepTitle title="Which service?" hint="Every visit includes a consultation, wash and hot towel." />
                    <div role="radiogroup" aria-label="Service" className="grid gap-3">
                      {services.map(srv => {
                        const selected = selectedService?.id === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setSelectedService(srv)}
                            className="choice p-5 md:p-6 flex items-start justify-between gap-6"
                          >
                            <span>
                              <span className="block t-subhead font-semibold text-ink">{srv.name}</span>
                              <span className="block t-caption text-ink-2 mt-1 max-w-[46ch]">{srv.description}</span>
                            </span>
                            <span className="text-right shrink-0">
                              <span className="block t-subhead font-semibold text-ink tabular">${srv.price}</span>
                              <span className="block t-fine text-ink-2 tabular mt-0.5">{srv.duration} min</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <StepTitle title="Who would you like?" hint="Choose a barber, or take the first one free for the most times." />
                    <div role="radiogroup" aria-label="Barber" className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={selectedBarber === 'any'}
                        onClick={() => setSelectedBarber('any')}
                        className="choice p-5 flex items-center gap-4 sm:col-span-2"
                      >
                        <span className="h-14 w-14 rounded-full bg-mist grid place-items-center t-subhead font-semibold text-ink-2 shrink-0" aria-hidden>
                          ?
                        </span>
                        <span>
                          <span className="block t-subhead font-semibold text-ink">Whoever is free first</span>
                          <span className="block t-caption text-ink-2 mt-0.5">Shows every open time</span>
                        </span>
                      </button>

                      {barbers.map(b => (
                        <button
                          key={b.id}
                          type="button"
                          role="radio"
                          aria-checked={selectedBarber === b.id}
                          onClick={() => setSelectedBarber(b.id)}
                          className="choice p-5 flex items-center gap-4"
                        >
                          <span className="relative h-14 w-14 rounded-full overflow-hidden media shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={b.photo} alt="" className="h-full w-full object-cover" />
                          </span>
                          <span>
                            <span className="block t-subhead font-semibold text-ink">{b.name}</span>
                            <span className="block t-caption text-ink-2 mt-0.5">
                              {b.experienceYears} years, {b.specialties?.[0]?.toLowerCase()}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <StepTitle title="When suits you?" hint={`${selectedService?.name}, ${selectedService?.duration} minutes.`} />

                    <div className="-mx-[22px] md:mx-0">
                      <ul className="snap-row gap-2 px-[22px] md:px-0 pb-1" aria-label="Day">
                        {datesList.map(item => {
                          const selected = selectedDate === item.dateStr;
                          return (
                            <li key={item.dateStr} className="shrink-0">
                              <button
                                type="button"
                                disabled={item.isSunday}
                                aria-pressed={selected}
                                aria-label={item.isSunday ? `${item.dayName} ${item.dayNum}, closed` : `${item.dayName} ${item.dayNum} ${item.month}`}
                                onClick={() => setSelectedDate(item.dateStr)}
                                className={`w-[68px] h-[84px] rounded-[18px] flex flex-col items-center justify-center transition-[background-color,color,box-shadow,transform] duration-300 ease-out active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${
                                  selected
                                    ? 'bg-ink text-white'
                                    : 'bg-white text-ink shadow-[inset_0_0_0_1px_var(--hairline)] hover:shadow-[inset_0_0_0_1px_var(--ink-3)]'
                                }`}
                              >
                                <span className={`t-fine ${selected ? 'text-white/70' : 'text-ink-2'}`}>{item.dayName}</span>
                                <span className="t-headline tabular leading-none mt-1">{item.dayNum}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="mt-10 min-h-[220px]">
                      {slotsLoading ? (
                        <div className="py-16 grid place-items-center text-ink-3">
                          <span className="spinner" aria-label="Loading times" />
                        </div>
                      ) : availableSlots.length === 0 ? (
                        <div className="tile p-8 text-center">
                          <p className="t-subhead font-semibold text-ink">Fully booked that day.</p>
                          <p className="t-caption text-ink-2 mt-1">Try the next day, or choose whoever is free first.</p>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          {[
                            { label: 'Morning', slots: morningSlots },
                            { label: 'Afternoon', slots: afternoonSlots },
                          ]
                            .filter(g => g.slots.length > 0)
                            .map(group => (
                              <div key={group.label}>
                                <h3 className="t-caption font-semibold text-ink-2">{group.label}</h3>
                                <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                                  {group.slots.map(slot => {
                                    const selected = selectedSlot?.time === slot.time;
                                    return (
                                      <button
                                        key={slot.time}
                                        type="button"
                                        disabled={!slot.available}
                                        aria-pressed={selected}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`h-12 rounded-full t-caption font-medium tabular transition-[background-color,color,box-shadow,transform] duration-300 ease-out active:scale-95 disabled:cursor-not-allowed disabled:line-through disabled:text-ink-3 disabled:shadow-none disabled:bg-mist ${
                                          selected
                                            ? 'bg-ink text-white'
                                            : 'bg-white text-ink shadow-[inset_0_0_0_1px_var(--hairline)] hover:shadow-[inset_0_0_0_1px_var(--ink-3)]'
                                        }`}
                                      >
                                        {slot.time}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <StepTitle title="Your details." hint="We’ll send the confirmation to your email and a reminder by text." />

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field id="name" label="Full name" value={customerName} onChange={setCustomerName} autoComplete="name" required />
                      <Field id="phone" label="Mobile number" type="tel" value={customerPhone} onChange={setCustomerPhone} autoComplete="tel" required />
                      <div className="sm:col-span-2">
                        <Field id="email" label="Email" type="email" value={customerEmail} onChange={setCustomerEmail} autoComplete="email" required />
                      </div>
                      <div className="sm:col-span-2 field">
                        <textarea
                          id="requests"
                          rows={3}
                          value={specialRequests}
                          onChange={e => setSpecialRequests(e.target.value)}
                          placeholder=" "
                          className="field-input"
                        />
                        <label htmlFor="requests" className="field-label">
                          Anything we should know? (optional)
                        </label>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Field
                            id="promo"
                            label="Offer code"
                            value={promoInput}
                            onChange={v => setPromoInput(v.toUpperCase())}
                            autoComplete="off"
                          />
                        </div>
                        <button type="button" onClick={handleApplyPromo} disabled={!promoInput.trim()} className="btn btn-ghost h-14 px-6">
                          Apply
                        </button>
                      </div>
                      <AnimatePresence>
                        {appliedPromo && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="t-caption text-[#1d7a45] mt-2 flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" strokeWidth={2.5} />
                            {appliedPromo.title}: ${discount} off
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {promoError && <p className="t-caption text-[#c4331f] mt-2">{promoError}</p>}
                    </div>

                    <AnimatePresence>
                      {errorMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          role="alert"
                          className="mt-8 rounded-[14px] bg-[#fff2f0] text-[#9f2a19] p-4 t-caption flex items-start gap-2.5"
                        >
                          <AlertCircle className="w-[18px] h-[18px] shrink-0 mt-px" />
                          <span>{errorMessage}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.section>
            </AnimatePresence>

            {/* Desktop step controls */}
            <div className="hidden md:flex items-center justify-between mt-12 pt-6 border-t border-hairline">
              {step > 1 ? (
                <button type="button" onClick={() => goTo(step - 1)} className="link-more t-caption text-ink-2 hover:text-ink">
                  <ChevronLeft className="w-[1em] h-[1em]" strokeWidth={2} />
                  Back
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                id={step === 4 ? 'confirm-booking-submit' : undefined}
                disabled={!canContinue}
                onClick={primaryAction}
                className="btn btn-ink btn-lg min-w-[180px]"
              >
                {submitting && <span className="spinner w-4 h-4" aria-hidden />}
                {primaryLabel}
              </button>
            </div>
          </div>

          {/* Live summary */}
          <aside className="hidden lg:block sticky top-[calc(var(--nav-h)+2rem)]" aria-label="Your appointment">
            <div className="tile p-7">
              <h2 className="t-subhead font-semibold text-ink">Your appointment</h2>
              <dl className="mt-5 divide-y divide-hairline t-caption">
                <SummaryRow label="Service" value={selectedService?.name} />
                <SummaryRow label="Barber" value={step > 1 ? barberName : undefined} />
                <SummaryRow label="Day" value={selectedDate && step > 2 ? formatLongDate(selectedDate) : undefined} />
                <SummaryRow label="Time" value={selectedSlot ? `${selectedSlot.time} – ${selectedSlot.endTime}` : undefined} />
              </dl>
              <div className="mt-5 pt-5 border-t border-ink/80 flex items-baseline justify-between">
                <span className="t-caption font-semibold text-ink">Total</span>
                <span className="text-right">
                  {discount > 0 && (
                    <span className="t-fine text-ink-3 line-through tabular mr-2">${selectedService?.price}</span>
                  )}
                  <AnimatedNumber value={finalPrice} />
                </span>
              </div>
              <p className="t-fine text-ink-2 mt-4">Pay at the studio after your appointment. Free to change up to two hours before.</p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile action bar */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-40 material border-t border-black/5 pb-[env(safe-area-inset-bottom)]">
        <div className="shell py-3 flex items-center gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              aria-label="Back"
              className="h-11 w-11 rounded-full bg-black/5 grid place-items-center shrink-0"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
          )}
          <div className="flex-1 min-w-0 leading-tight">
            <p className="t-caption font-semibold text-ink truncate">{selectedService?.name ?? 'Choose a service'}</p>
            <p className="t-fine text-ink-2 truncate tabular">
              {selectedSlot ? `${selectedDate && formatLongDate(selectedDate)}, ${selectedSlot.time}` : selectedService ? `$${finalPrice}` : `From $${Math.min(...services.map(s => s.price))}`}
            </p>
          </div>
          <button
            type="button"
            id={step === 4 ? 'confirm-booking-submit-mobile' : undefined}
            disabled={!canContinue}
            onClick={primaryAction}
            className="btn btn-ink shrink-0"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function StepTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-7">
      <h2 className="t-headline text-ink">{title}</h2>
      {hint && <p className="t-caption text-ink-2 mt-1.5">{hint}</p>}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="field">
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder=" "
        autoComplete={autoComplete}
        required={required}
        className="field-input"
      />
      <label htmlFor={id} className="field-label">
        {label}
      </label>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="py-3 flex items-baseline justify-between gap-4">
      <dt className="text-ink-2 shrink-0">{label}</dt>
      <dd className="text-right min-w-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={value ?? 'empty'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE }}
            className={`block ${value ? 'text-ink font-medium' : 'text-ink-3'}`}
          >
            {value ?? '—'}
          </motion.span>
        </AnimatePresence>
      </dd>
    </div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="inline-block t-headline text-ink tabular"
      >
        ${value}
      </motion.span>
    </AnimatePresence>
  );
}
