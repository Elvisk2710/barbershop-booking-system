"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCalendarDateTime = formatCalendarDateTime;
exports.generateGoogleCalendarUrl = generateGoogleCalendarUrl;
exports.generateIcsContent = generateIcsContent;
const index_js_1 = require("../constants/index.js");
/**
 * Formats a Date object or date+time string into iCalendar UTC/Local format (YYYYMMDDTHHmmss)
 */
function formatCalendarDateTime(dateStr, timeStr) {
    // dateStr is YYYY-MM-DD, timeStr is HH:mm
    const [year, month, day] = dateStr.split('-');
    const [hours, minutes] = timeStr.split(':');
    return `${year}${month}${day}T${hours}${minutes}00`;
}
/**
 * Builds a direct Google Calendar Web Link with pre-filled title, time, location, details
 */
function generateGoogleCalendarUrl(options) {
    const { booking, service, barber } = options;
    const serviceName = service?.name || booking.service?.name || "Gentleman's Grooming Appointment";
    const barberName = barber?.name || booking.barber?.name || "Senior Barber";
    const startDt = formatCalendarDateTime(booking.date, booking.startTime);
    const endDt = formatCalendarDateTime(booking.date, booking.endTime);
    const title = encodeURIComponent(`${serviceName} - ${index_js_1.BRAND.name}`);
    const details = encodeURIComponent(`Appointment Reference: ${booking.reference}\n` +
        `Service: ${serviceName}\n` +
        `Barber: ${barberName}\n` +
        `Client: ${booking.customerName}\n` +
        `Phone: ${booking.customerPhone}\n\n` +
        `Location: ${index_js_1.BRAND.location.address}, ${index_js_1.BRAND.location.city}\n` +
        `We look forward to welcoming you to the chair.`);
    const location = encodeURIComponent(`${index_js_1.BRAND.location.address}, ${index_js_1.BRAND.location.city}, ${index_js_1.BRAND.location.country}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDt}/${endDt}&details=${details}&location=${location}`;
}
/**
 * Builds a standard iCalendar (.ics) string compatible with Apple Calendar, Outlook, and mobile OSs
 */
function generateIcsContent(options) {
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
        `SUMMARY:${serviceName} at ${index_js_1.BRAND.name}`,
        `DESCRIPTION:Appointment Reference: ${booking.reference}\\nService: ${serviceName}\\nBarber: ${barberName}\\nClient: ${booking.customerName}\\nNotes: ${booking.specialRequests || 'None'}`,
        `LOCATION:${index_js_1.BRAND.location.address}, ${index_js_1.BRAND.location.city}, ${index_js_1.BRAND.location.country}`,
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
