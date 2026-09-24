import { AvailabilitySlot } from '../types/index.js';

export interface WorkingHours {
  start: string; // "08:00"
  end: string;   // "18:00"
}

export interface ExistingSlot {
  startTime: string; // "09:00"
  endTime: string;   // "09:45"
  status?: string;
}

export function parseMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

export function formatMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function addMinutesToTime(timeStr: string, minutesToAdd: number): string {
  return formatMinutes(parseMinutes(timeStr) + minutesToAdd);
}

/**
 * Checks if two time windows [startA, endA) and [startB, endB) overlap
 */
export function hasTimeOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {
  const aStart = parseMinutes(startA);
  const aEnd = parseMinutes(endA);
  const bStart = parseMinutes(startB);
  const bEnd = parseMinutes(endB);

  return aStart < bEnd && aEnd > bStart;
}

/**
 * Generates slots for a day given working hours, service duration, existing bookings, and breaks
 */
export function generateAvailableSlots(
  workingHours: WorkingHours,
  durationMinutes: number,
  existingBookings: ExistingSlot[],
  breaks: ExistingSlot[] = [],
  stepMinutes: number = 30
): AvailabilitySlot[] {
  const slots: AvailabilitySlot[] = [];
  const startMin = parseMinutes(workingHours.start);
  const endMin = parseMinutes(workingHours.end);

  for (let current = startMin; current + durationMinutes <= endMin; current += stepMinutes) {
    const slotStart = formatMinutes(current);
    const slotEnd = formatMinutes(current + durationMinutes);

    // Check collision with existing active bookings
    const collidesWithBooking = existingBookings.some(b => 
      b.status !== 'CANCELLED' && hasTimeOverlap(slotStart, slotEnd, b.startTime, b.endTime)
    );

    // Check collision with scheduled breaks
    const collidesWithBreak = breaks.some(brk => 
      hasTimeOverlap(slotStart, slotEnd, brk.startTime, brk.endTime)
    );

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
