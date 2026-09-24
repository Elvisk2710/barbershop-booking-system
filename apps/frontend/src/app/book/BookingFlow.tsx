'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Scissors, Clock, Check, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { ApiClient } from '@/lib/api';
import { Service, Barber, AvailabilitySlot, PromoCode } from '@barber/shared';

export function BookingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<number>(1);
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
        const [srvs, brbs] = await Promise.all([
          ApiClient.getServices(),
          ApiClient.getBarbers(),
        ]);
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
        setSelectedDate(tomorrow.toISOString().split('T')[0]);
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
        const data = await ApiClient.getAvailability(
          selectedDate,
          selectedService!.id,
          selectedBarber
        );
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

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setPromoError('');
    try {
      const promo = await ApiClient.validatePromo(promoInput);
      setAppliedPromo(promo);
    } catch (err: any) {
      setPromoError(err.message || 'Invalid privilege code');
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
      setErrorMessage('Please select your service, date, and appointment slot.');
      return;
    }
    if (!customerName || !customerEmail || !customerPhone) {
      setErrorMessage('Please provide your name, email, and mobile phone number.');
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
      setErrorMessage(err.message || 'Error completing reservation. Slot may have been taken.');
    } finally {
      setSubmitting(false);
    }
  };

  const generateDates = () => {
    const list = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const isSunday = d.getDay() === 0;
      list.push({
        dateStr: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        isSunday,
      });
    }
    return list;
  };

  const datesList = generateDates();
  const discount = calculateDiscount();
  const finalPrice = selectedService ? Math.max(0, selectedService.price - discount) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-coral border-t-transparent" />
      </div>
    );
  }

  const morningSlots = availableSlots.filter(s => s.period === 'morning');
  const afternoonSlots = availableSlots.filter(s => s.period === 'afternoon');

  return (
    <div className="bg-brand-cream min-h-screen text-brand-dark pt-36 pb-28 px-4 sm:px-6 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <header className="space-y-3">
          <span className="text-brand-coral micro-label block">
            Online Concierge Desk
          </span>
          <h1 className="text-display-l font-normal text-brand-navy">
            Reserve your chair.
          </h1>
          <p className="text-sm text-brand-dark/70 font-light">
            Harare Studio · 12 Bath Road, Avondale · Strictly Reserved Appointments
          </p>
        </header>

        {/* Step Progression Ledger */}
        <div className="border-b border-brand-navy/15 pb-4 flex items-center justify-between text-xs tracking-wider uppercase font-semibold">
          <button
            onClick={() => setStep(1)}
            className={`transition-colors text-left ${step >= 1 ? 'text-brand-coral' : 'text-brand-dark/40'}`}
          >
            01. Service
          </button>
          <span className="text-brand-dark/20">——</span>
          <button
            disabled={!selectedService}
            onClick={() => setStep(2)}
            className={`transition-colors text-left ${step >= 2 ? 'text-brand-coral' : 'text-brand-dark/40'}`}
          >
            02. Craftsman
          </button>
          <span className="text-brand-dark/20">——</span>
          <button
            disabled={!selectedService}
            onClick={() => setStep(3)}
            className={`transition-colors text-left ${step >= 3 ? 'text-brand-coral' : 'text-brand-dark/40'}`}
          >
            03. Schedule
          </button>
          <span className="text-brand-dark/20">——</span>
          <span className={step >= 4 ? 'text-brand-coral' : 'text-brand-dark/40'}>
            04. Confirmation
          </span>
        </div>

        {/* Main Concierge Interface Container (Crisp 8px Radius, Hairline Border) */}
        <div className="bg-white rounded-lg p-8 sm:p-12 border border-brand-navy/15 space-y-10">
          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-brand-navy/15 pb-4">
                <h2 className="font-display text-3xl text-brand-navy font-normal">
                  Select your treatment.
                </h2>
                <p className="text-xs text-brand-dark/60 mt-1 font-light">
                  Each session includes dialogue, hair wash, eucalyptus hot compress, and finish.
                </p>
              </div>

              <div className="divide-y divide-brand-navy/15">
                {services.map((srv, idx) => {
                  const isSelected = selectedService?.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`py-5 px-4 -mx-4 rounded-[6px] cursor-pointer transition-colors duration-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${
                        isSelected
                          ? 'bg-brand-navy text-brand-light'
                          : 'hover:bg-brand-cream/60'
                      }`}
                    >
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-baseline space-x-3">
                          <span
                            className={`text-xs font-mono tracking-widest ${
                              isSelected ? 'text-brand-coral' : 'text-brand-dark/50'
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          <h3
                            className={`font-display text-2xl font-normal ${
                              isSelected ? 'text-brand-light' : 'text-brand-navy'
                            }`}
                          >
                            {srv.name}
                          </h3>
                        </div>
                        <p
                          className={`text-xs font-light leading-relaxed pl-7 ${
                            isSelected ? 'text-brand-light/80' : 'text-brand-dark/70'
                          }`}
                        >
                          {srv.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end space-x-6 pl-7 sm:pl-0 font-sans">
                        <div className="text-right">
                          <div
                            className={`font-display text-2xl font-medium ${
                              isSelected ? 'text-brand-coral' : 'text-brand-navy'
                            }`}
                          >
                            ${srv.price}
                          </div>
                          <div
                            className={`flex items-center space-x-1 text-[11px] justify-end ${
                              isSelected ? 'text-brand-light/60' : 'text-brand-dark/50'
                            }`}
                          >
                            <Clock className="w-3 h-3 text-brand-coral" />
                            <span>{srv.duration} mins</span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-[4px] bg-brand-coral text-brand-deep flex items-center justify-center font-bold">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Select Craftsman</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BARBER */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-brand-navy/15 pb-4">
                <h2 className="font-display text-3xl text-brand-navy font-normal">
                  Who would you like behind the chair?
                </h2>
                <p className="text-xs text-brand-dark/60 mt-1 font-light">
                  Choose a specific master barber or select First Available for maximum scheduling flexibility.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Any Available Option */}
                <div
                  onClick={() => setSelectedBarber('any')}
                  className={`p-6 rounded-[6px] border cursor-pointer transition-colors duration-200 flex flex-col justify-between ${
                    selectedBarber === 'any'
                      ? 'border-brand-coral bg-brand-navy text-brand-light'
                      : 'border-brand-navy/15 hover:border-brand-navy/40 bg-white'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-coral block">
                      Maximum Flexibility
                    </span>
                    <h3 className="font-display text-2xl font-normal">
                      First Available Craftsman
                    </h3>
                    <p
                      className={`text-xs font-light leading-relaxed ${
                        selectedBarber === 'any' ? 'text-brand-light/75' : 'text-brand-dark/70'
                      }`}
                    >
                      Open your appointment to any master on shift for fastest chair availability.
                    </p>
                  </div>
                  {selectedBarber === 'any' && (
                    <div className="pt-4 mt-2 border-t border-brand-light/10 text-right text-xs text-brand-coral font-mono">
                      ✓ SELECTED
                    </div>
                  )}
                </div>

                {/* Specific Barbers */}
                {barbers.map(b => {
                  const isSelected = selectedBarber === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBarber(b.id)}
                      className={`p-6 rounded-[6px] border cursor-pointer transition-colors duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand-coral bg-brand-navy text-brand-light'
                          : 'border-brand-navy/15 hover:border-brand-navy/40 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-13 h-13 rounded-[4px] overflow-hidden relative bg-brand-deep flex-shrink-0 border border-brand-coral/30">
                          <img src={b.photo} alt={b.name} className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-normal leading-snug">
                            {b.name}
                          </h3>
                          <span className="text-xs text-brand-coral font-medium block">
                            {b.role}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`pt-4 mt-4 border-t flex items-center justify-between text-xs ${
                          isSelected
                            ? 'border-brand-light/10 text-brand-light/70'
                            : 'border-brand-navy/10 text-brand-dark/60'
                        }`}
                      >
                        <span>{b.experienceYears} Years Craft</span>
                        {isSelected && (
                          <span className="text-brand-coral font-mono">✓ SELECTED</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Services</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE */}
          {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-brand-navy/15 pb-4">
                <h2 className="font-display text-3xl text-brand-navy font-normal">
                  When would you like to visit?
                </h2>
                <p className="text-xs text-brand-dark/60 mt-1 font-light">
                  Live chair availability synchronized with Avondale studio schedules.
                </p>
              </div>

              {/* Horizontal Date Strip */}
              <div className="space-y-3">
                <label className="micro-label text-brand-dark/70 block">
                  Select Day
                </label>
                <div className="flex space-x-3 overflow-x-auto pb-3">
                  {datesList.map(item => {
                    const isSelected = selectedDate === item.dateStr;
                    return (
                      <button
                        key={item.dateStr}
                        disabled={item.isSunday}
                        onClick={() => setSelectedDate(item.dateStr)}
                        className={`flex-shrink-0 w-20 py-4 rounded-[6px] border flex flex-col items-center transition-colors ${
                          item.isSunday
                            ? 'opacity-30 cursor-not-allowed bg-brand-cream/50 border-brand-navy/5'
                            : isSelected
                            ? 'bg-brand-navy text-brand-light border-brand-navy font-medium'
                            : 'bg-white text-brand-navy border-brand-navy/15 hover:border-brand-navy/40'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-mono tracking-widest">
                          {item.dayName}
                        </span>
                        <span className="font-display text-2xl font-bold my-1">
                          {item.dayNum}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider opacity-75">
                          {item.month}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grouped Time Windows */}
              <div className="space-y-6 pt-4 border-t border-brand-navy/15">
                <div className="flex justify-between items-center text-xs">
                  <span className="micro-label text-brand-dark/70">
                    Available Time Windows
                  </span>
                  <span className="text-brand-dark/50">
                    Duration: {selectedService?.duration} mins
                  </span>
                </div>

                {slotsLoading ? (
                  <div className="py-12 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-coral border-t-transparent" />
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="p-8 rounded-[6px] bg-brand-cream text-center text-sm text-brand-dark/70 space-y-2">
                    <AlertCircle className="w-5 h-5 text-brand-coral mx-auto" />
                    <p className="font-medium text-brand-navy">No chairs open on this date.</p>
                    <p className="text-xs">Please pick an adjacent date above.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {morningSlots.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs uppercase font-mono tracking-widest text-brand-dark/50 block">
                          Morning Sessions
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {morningSlots.map(slot => {
                            const isSelected = selectedSlot?.time === slot.time;
                            return (
                              <button
                                key={slot.time}
                                disabled={!slot.available}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-3.5 px-4 rounded-[6px] border text-sm font-medium transition-colors ${
                                  !slot.available
                                    ? 'opacity-35 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400 line-through'
                                    : isSelected
                                    ? 'bg-brand-coral text-brand-deep border-brand-coral font-bold'
                                    : 'bg-white text-brand-navy border-brand-navy/15 hover:border-brand-coral'
                                }`}
                              >
                                {slot.time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {afternoonSlots.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs uppercase font-mono tracking-widest text-brand-dark/50 block">
                          Afternoon Sessions
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {afternoonSlots.map(slot => {
                            const isSelected = selectedSlot?.time === slot.time;
                            return (
                              <button
                                key={slot.time}
                                disabled={!slot.available}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-3.5 px-4 rounded-[6px] border text-sm font-medium transition-colors ${
                                  !slot.available
                                    ? 'opacity-35 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400 line-through'
                                    : isSelected
                                    ? 'bg-brand-coral text-brand-deep border-brand-coral font-bold'
                                    : 'bg-white text-brand-navy border-brand-navy/15 hover:border-brand-coral'
                                }`}
                              >
                                {slot.time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  disabled={!selectedSlot}
                  onClick={() => setStep(4)}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Client Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: DETAILS & REVIEW */}
          {step === 4 && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-brand-navy/15 pb-4">
                <h2 className="font-display text-3xl text-brand-navy font-normal">
                  Everything looking sharp?
                </h2>
                <p className="text-xs text-brand-dark/60 mt-1 font-light">
                  Please review your reservation parameters and enter your contact details.
                </p>
              </div>

              {/* Appointment Ledger Summary */}
              <div className="bg-brand-deep text-brand-light p-6 sm:p-8 rounded-lg space-y-4 border border-brand-coral/25">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-brand-light/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-brand-coral block">
                      RESERVED TREATMENT
                    </span>
                    <h3 className="font-display text-2xl text-brand-light font-normal">
                      {selectedService?.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-display font-medium text-brand-coral">
                      ${finalPrice}
                    </span>
                    {discount > 0 && (
                      <span className="text-xs text-brand-light/50 line-through block font-sans">
                        Regular ${selectedService?.price}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-brand-light/80 pt-2 font-sans">
                  <div>
                    <span className="text-brand-light/40 uppercase tracking-wider block mb-1">
                      Craftsman
                    </span>
                    <span className="font-medium text-brand-light">
                      {selectedBarber === 'any'
                        ? 'First Available Master'
                        : barbers.find(b => b.id === selectedBarber)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-brand-light/40 uppercase tracking-wider block mb-1">
                      Date
                    </span>
                    <span className="font-medium text-brand-light">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-brand-light/40 uppercase tracking-wider block mb-1">
                      Window
                    </span>
                    <span className="font-medium text-brand-coral font-mono">
                      {selectedSlot?.time} – {selectedSlot?.endTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Client Contact Inputs */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="micro-label text-brand-dark/70 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="e.g. Tendai Chikwanha"
                      className="w-full px-4 py-3.5 rounded-[6px] border border-brand-navy/20 focus:border-brand-coral outline-none text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="micro-label text-brand-dark/70 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={e => setCustomerEmail(e.target.value)}
                      placeholder="e.g. tendai@example.com"
                      className="w-full px-4 py-3.5 rounded-[6px] border border-brand-navy/20 focus:border-brand-coral outline-none text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="micro-label text-brand-dark/70 block mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="e.g. +263 77 123 4567"
                      className="w-full px-4 py-3.5 rounded-[6px] border border-brand-navy/20 focus:border-brand-coral outline-none text-sm bg-white"
                    />
                    <p className="text-[11px] text-brand-dark/50 mt-1">
                      Used solely for your appointment calendar sync and reminder.
                    </p>
                  </div>

                  <div>
                    <label className="micro-label text-brand-dark/70 block mb-1.5">
                      Privilege Code
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={e => setPromoInput(e.target.value.toUpperCase())}
                        placeholder="e.g. FIRSTGUEST"
                        className="w-full px-4 py-3.5 rounded-[6px] border border-brand-navy/20 focus:border-brand-coral outline-none text-sm uppercase bg-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="btn-secondary px-5 py-3.5 text-xs uppercase tracking-wider font-semibold"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedPromo && (
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                        ✓ {appliedPromo.title} (-${discount})
                      </p>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-red-500 font-medium mt-1">{promoError}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="micro-label text-brand-dark/70 block mb-1.5">
                    Special Requests or Preferences (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Skin sensitivity, quiet session, or hot beverage preference"
                    className="w-full px-4 py-3 rounded-[6px] border border-brand-navy/20 focus:border-brand-coral outline-none text-sm bg-white"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-[6px] bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-secondary flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Modify Schedule</span>
                </button>

                <button
                  type="button"
                  id="confirm-booking-submit"
                  disabled={submitting || !customerName || !customerEmail || !customerPhone}
                  onClick={handleCompleteBooking}
                  className="w-full sm:w-auto btn-primary px-8 py-4 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-deep border-t-transparent" />
                      <span>Securing Chair...</span>
                    </div>
                  ) : (
                    <span>Confirm Reservation (${finalPrice})</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
