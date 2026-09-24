import { Service, Barber, Booking, AvailabilitySlot, PromoCode, CreateBookingInput, RescheduleBookingInput } from '@barber/shared';
import { INITIAL_SERVICES, INITIAL_BARBERS, PROMOTIONS } from '@barber/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export class ApiClient {
  static async getServices(): Promise<Service[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/services`, { next: { revalidate: 60 } });
      if (!res.ok) throw new Error('Failed to fetch services');
      const json = await res.json();
      return json.data;
    } catch {
      // Fallback for resilient rendering
      return INITIAL_SERVICES as Service[];
    }
  }

  static async getServiceBySlug(slug: string): Promise<Service | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/services/${slug}`, { next: { revalidate: 60 } });
      if (!res.ok) throw new Error('Service not found');
      const json = await res.json();
      return json.data;
    } catch {
      const found = INITIAL_SERVICES.find(s => s.slug === slug);
      return (found as Service) || null;
    }
  }

  static async getBarbers(): Promise<Barber[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/barbers`, { next: { revalidate: 60 } });
      if (!res.ok) throw new Error('Failed to fetch barbers');
      const json = await res.json();
      return json.data;
    } catch {
      return INITIAL_BARBERS as Barber[];
    }
  }

  static async getBarberBySlug(slug: string): Promise<Barber | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/barbers/${slug}`, { next: { revalidate: 60 } });
      if (!res.ok) throw new Error('Barber not found');
      const json = await res.json();
      return json.data;
    } catch {
      const found = INITIAL_BARBERS.find(b => b.slug === slug);
      return (found as Barber) || null;
    }
  }

  static async getAvailability(date: string, serviceId: string, barberId?: string): Promise<{ slots: AvailabilitySlot[]; service?: Service; barber?: Barber }> {
    const params = new URLSearchParams({ date, serviceId });
    if (barberId && barberId !== 'any') {
      params.append('barberId', barberId);
    }
    const res = await fetch(`${API_BASE_URL}/availability?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to check availability');
    }
    const json = await res.json();
    return json.data;
  }

  static async createBooking(payload: CreateBookingInput): Promise<Booking> {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Failed to create booking');
    }
    return json.data;
  }

  static async getBooking(reference: string, email?: string): Promise<Booking> {
    const url = email 
      ? `${API_BASE_URL}/bookings/${reference}?email=${encodeURIComponent(email)}`
      : `${API_BASE_URL}/bookings/${reference}`;
    const res = await fetch(url, { cache: 'no-store' });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Appointment record not found');
    }
    return json.data;
  }

  static async rescheduleBooking(reference: string, payload: RescheduleBookingInput): Promise<Booking> {
    const res = await fetch(`${API_BASE_URL}/bookings/${reference}/reschedule`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Failed to reschedule appointment');
    }
    return json.data;
  }

  static async cancelBooking(reference: string): Promise<Booking> {
    const res = await fetch(`${API_BASE_URL}/bookings/${reference}/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Failed to cancel appointment');
    }
    return json.data;
  }

  static async validatePromo(code: string): Promise<PromoCode> {
    const res = await fetch(`${API_BASE_URL}/promos/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Invalid promo code');
    }
    return json.data;
  }
}
