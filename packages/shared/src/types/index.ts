export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'HAIRCUTS' | 'BEARD' | 'COMBOS' | 'TREATMENTS';
  price: number;
  duration: number; // minutes
  featured?: boolean;
  image?: string;
  active: boolean;
}

export interface Barber {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  specialties: string[];
  photo: string;
  actionPhoto?: string;
  experienceYears: number;
  active: boolean;
  services?: Service[];
}

export interface BarberSchedule {
  id: string;
  barberId: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: string; // "08:00"
  endTime: string;   // "18:00"
  isActive: boolean;
}

export interface BarberBreak {
  id: string;
  barberId: string;
  date?: string; // YYYY-MM-DD or undefined for recurring
  startTime: string; // "13:00"
  endTime: string;   // "14:00"
  reason?: string;
}

export interface Booking {
  id: string;
  reference: string;
  serviceId: string;
  barberId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string | null;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  totalPrice: number;
  promoCode?: string | null;
  discountAmount?: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
  service?: Service;
  barber?: Barber;
}

export interface AvailabilitySlot {
  time: string; // "09:00"
  endTime: string; // "09:45"
  available: boolean;
  period: 'morning' | 'afternoon';
  barberId: string;
  barberName?: string;
}

export interface CalendarEventPayload {
  title: string;
  description: string;
  location: string;
  startTime: Date | string; // ISO string or Date
  endTime: Date | string;   // ISO string or Date
  reference: string;
  customerName: string;
}

export interface PromoCode {
  code: string;
  title: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED' | 'SERVICE_ADDON';
  discountValue: number;
  addonServiceName?: string;
  active: boolean;
}
