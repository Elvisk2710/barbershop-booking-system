"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMinutes = parseMinutes;
exports.formatMinutes = formatMinutes;
exports.addMinutesToTime = addMinutesToTime;
exports.hasTimeOverlap = hasTimeOverlap;
exports.generateAvailableSlots = generateAvailableSlots;
function parseMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}
function formatMinutes(totalMinutes) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
function addMinutesToTime(timeStr, minutesToAdd) {
    return formatMinutes(parseMinutes(timeStr) + minutesToAdd);
}
/**
 * Checks if two time windows [startA, endA) and [startB, endB) overlap
 */
function hasTimeOverlap(startA, endA, startB, endB) {
    const aStart = parseMinutes(startA);
    const aEnd = parseMinutes(endA);
    const bStart = parseMinutes(startB);
    const bEnd = parseMinutes(endB);
    return aStart < bEnd && aEnd > bStart;
}
/**
 * Generates slots for a day given working hours, service duration, existing bookings, and breaks
 */
function generateAvailableSlots(workingHours, durationMinutes, existingBookings, breaks = [], stepMinutes = 30) {
    const slots = [];
    const startMin = parseMinutes(workingHours.start);
    const endMin = parseMinutes(workingHours.end);
    for (let current = startMin; current + durationMinutes <= endMin; current += stepMinutes) {
        const slotStart = formatMinutes(current);
        const slotEnd = formatMinutes(current + durationMinutes);
        // Check collision with existing active bookings
        const collidesWithBooking = existingBookings.some(b => b.status !== 'CANCELLED' && hasTimeOverlap(slotStart, slotEnd, b.startTime, b.endTime));
        // Check collision with scheduled breaks
        const collidesWithBreak = breaks.some(brk => hasTimeOverlap(slotStart, slotEnd, brk.startTime, brk.endTime));
        const isAvailable = !collidesWithBooking && !collidesWithBreak;
        const period = current < 12 * 60 ? 'morning' : 'afternoon';
        slots.push({
            time: slotStart,
            endTime: slotEnd,
            available: isAvailable,
            period,
            barberId: ''
        });
    }
    return slots;
}
