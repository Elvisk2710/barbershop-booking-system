import { Booking, Service, Barber } from '../types/index.js';
import { BRAND } from '../constants/index.js';

export interface GenerateCalendarOptions {
  booking: Booking;
  service?: Service;
  barber?: Barber;
}

/**
 * Formats a Date object or date+time string into iCalendar UTC/Local format (YYYYMMDDTHHmmss)
 */
export function formatCalendarDateTime(dateStr: string, timeStr: string): string {
  // dateStr is YYYY-MM-DD, timeStr is HH:mm
  const [year, month, day] = dateStr.split('-');
  const [hours, minutes] = timeStr.split(':');
  return `${year}${month}${day}T${hours}${minutes}00`;
}

/**
 * Builds a direct Google Calendar Web Link with pre-filled title, time, location, details
 */
export function generateGoogleCalendarUrl(options: GenerateCalendarOptions): string {
  const { booking, service, barber } = options;
  const serviceName = service?.name || booking.service?.name || "Gentleman's Grooming Appointment";
  const barberName = barber?.name || booking.barber?.name || "Senior Barber";
  
  const startDt = formatCalendarDateTime(booking.date, booking.startTime);
  const endDt = formatCalendarDateTime(booking.date, booking.endTime);

  const title = encodeURIComponent(`${serviceName} - ${BRAND.name}`);
  const details = encodeURIComponent(
    `Appointment Reference: ${booking.reference}\n` +
    `Service: ${serviceName}\n` +
    `Barber: ${barberName}\n` +
    `Client: ${booking.customerName}\n` +
    `Phone: ${booking.customerPhone}\n\n` +
    `Location: ${BRAND.location.address}, ${BRAND.location.city}\n` +
    `We look forward to welcoming you to the chair.`
  );
  const location = encodeURIComponent(`${BRAND.location.address}, ${BRAND.location.city}, ${BRAND.location.country}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDt}/${endDt}&details=${details}&location=${location}`;
}

/**
 * Builds a standard iCalendar (.ics) string compatible with Apple Calendar, Outlook, and mobile OSs
 */
export function generateIcsContent(options: GenerateCalendarOptions): string {
  const { booking, service, barber } = options;
  const serviceName = service?.name || booking.service?.name || "Gentleman's Grooming Appointment";
  const barberName = barber?.name || booking.barber?.name || "Senior Barber";
  
  const startDt = formatCalendarDateTime(booking.date, booking.startTime);
  const endDt = formatCalendarDateTime(booking.date, booking.endTime);
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gentlemans Grooming Bar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${booking.reference}@gentlemansbar.co.zw`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDt}`,
    `DTEND:${endDt}`,
    `SUMMARY:${serviceName} at ${BRAND.name}`,
    `DESCRIPTION:Appointment Reference: ${booking.reference}\\nService: ${serviceName}\\nBarber: ${barberName}\\nClient: ${booking.customerName}\\nNotes: ${booking.specialRequests || 'None'}`,
    `LOCATION:${BRAND.location.address}, ${BRAND.location.city}, ${BRAND.location.country}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${serviceName} in 1 hour`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}
