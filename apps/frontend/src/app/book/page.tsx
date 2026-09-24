import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { BookingFlow } from './BookingFlow';

export const metadata: Metadata = {
  title: 'Book a Barber Appointment | Reserve Online',
  description:
    'Reserve your chair online at Gentleman’s Grooming Bar in Avondale, Harare. Select your grooming service, choose your craftsman, and schedule your appointment.',
  alternates: {
    canonical: 'https://gentlemansbar.co.zw/book',
  },
  openGraph: {
    title: "Book a Barber Appointment | Gentleman's Grooming Bar Harare",
    description:
      'Reserve your chair online at Gentleman’s Grooming Bar in Avondale, Harare.',
    url: 'https://gentlemansbar.co.zw/book',
  },
};

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] grid place-items-center text-ink-3">
          <span className="spinner" aria-label="Loading" />
        </div>
      }
    >
      <BookingFlow />
    </Suspense>
  );
}
