export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
export interface Service {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: 'HAIRCUTS' | 'BEARD' | 'COMBOS' | 'TREATMENTS';
    price: number;
    duration: number;
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
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isActive: boolean;
}
export interface BarberBreak {
    id: string;
    barberId: string;
    date?: string;
    startTime: string;
    endTime: string;
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
    date: string;
    startTime: string;
    endTime: string;
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
    time: string;
    endTime: string;
    available: boolean;
    period: 'morning' | 'afternoon';
    barberId: string;
    barberName?: string;
}
export interface CalendarEventPayload {
    title: string;
    description: string;
    location: string;
    startTime: Date | string;
    endTime: Date | string;
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
