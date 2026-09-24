import { Booking, Service, Barber } from '../types/index.js';
export interface GenerateCalendarOptions {
    booking: Booking;
    service?: Service;
    barber?: Barber;
}
/**
 * Formats a Date object or date+time string into iCalendar UTC/Local format (YYYYMMDDTHHmmss)
 */
export declare function formatCalendarDateTime(dateStr: string, timeStr: string): string;
/**
 * Builds a direct Google Calendar Web Link with pre-filled title, time, location, details
 */
export declare function generateGoogleCalendarUrl(options: GenerateCalendarOptions): string;
/**
 * Builds a standard iCalendar (.ics) string compatible with Apple Calendar, Outlook, and mobile OSs
 */
export declare function generateIcsContent(options: GenerateCalendarOptions): string;
