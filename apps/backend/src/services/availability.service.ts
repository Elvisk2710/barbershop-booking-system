import { prisma } from '../db/client.js';
import { generateAvailableSlots, AvailabilitySlot } from '@barber/shared';

export class AvailabilityService {
  /**
   * Calculates valid time slots for a given date, service, and optional barber
   */
  static async getAvailableSlots(
    dateStr: string,
    serviceId: string,
    barberId?: string
  ): Promise<{ slots: AvailabilitySlot[]; service: any; barber?: any }> {
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service || !service.active) {
      throw new Error('Service not found or inactive');
    }

    // Determine Day of Week (0 = Sun, 1 = Mon, ..., 6 = Sat)
    // Avoid timezone shift by splitting YYYY-MM-DD
    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = dateObj.getDay();

    if (dayOfWeek === 0) {
      // Sunday is closed by default
      return { slots: [], service };
    }

    let targetBarbers = [];
    if (barberId && barberId !== 'any') {
      const barber = await prisma.barber.findUnique({
        where: { id: barberId },
        include: {
          schedules: { where: { dayOfWeek, isActive: true } },
          breaks: true
        }
      });
      if (barber && barber.active) {
        targetBarbers.push(barber);
      }
    } else {
      // Fetch all active barbers scheduled on that day
      targetBarbers = await prisma.barber.findMany({
        where: { active: true },
        include: {
          schedules: { where: { dayOfWeek, isActive: true } },
          breaks: true
        }
      });
    }

    if (targetBarbers.length === 0) {
      return { slots: [], service };
    }

    const allSlotsMap = new Map<string, AvailabilitySlot>();

    for (const barber of targetBarbers) {
      const schedule = barber.schedules[0];
      if (!schedule) continue;

      // Existing bookings for this barber on this date
      const existingBookings = await prisma.booking.findMany({
        where: {
          barberId: barber.id,
          date: dateStr,
          status: { not: 'CANCELLED' }
        },
        select: {
          startTime: true,
          endTime: true,
          status: true
        }
      });

      const barberBreaks = barber.breaks.filter(
        b => !b.date || b.date === dateStr
      ).map(b => ({
        startTime: b.startTime,
        endTime: b.endTime
      }));

      const barberSlots = generateAvailableSlots(
        { start: schedule.startTime, end: schedule.endTime },
        service.duration,
        existingBookings,
        barberBreaks,
        30 // 30-minute intervals
      );

      for (const slot of barberSlots) {
        if (!allSlotsMap.has(slot.time)) {
          allSlotsMap.set(slot.time, {
            ...slot,
            barberId: barber.id,
            barberName: barber.name
          });
        } else {
          // If already recorded as unavailable, but this barber is available, flip to available
          const existing = allSlotsMap.get(slot.time)!;
          if (!existing.available && slot.available) {
            allSlotsMap.set(slot.time, {
              ...slot,
              barberId: barber.id,
              barberName: barber.name
            });
          }
        }
      }
    }

    const sortedSlots = Array.from(allSlotsMap.values()).sort((a, b) =>
      a.time.localeCompare(b.time)
    );

    return {
      slots: sortedSlots,
      service,
      barber: targetBarbers.length === 1 ? targetBarbers[0] : undefined
    };
  }
}
