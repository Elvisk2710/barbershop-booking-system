import { prisma } from '../db/client.js';
import { CreateBookingInput, RescheduleBookingInput, addMinutesToTime, hasTimeOverlap } from '@barber/shared';
import { customAlphabet } from 'nanoid';

const generateRefCode = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZ', 4);

export class BookingService {
  /**
   * Creates a new booking with conflict check and auto-assigned barber if 'any' is selected
   */
  static async createBooking(input: CreateBookingInput) {
    const service = await prisma.service.findUnique({
      where: { id: input.serviceId }
    });

    if (!service || !service.active) {
      throw new Error('Selected service is unavailable');
    }

    const endTime = addMinutesToTime(input.startTime, service.duration);

    // Resolve barber
    let chosenBarberId = input.barberId;
    if (chosenBarberId === 'any' || !chosenBarberId) {
      // Find an available barber for this slot
      const [year, month, day] = input.date.split('-').map(Number);
      const dayOfWeek = new Date(year, month - 1, day).getDay();

      const availableBarbers = await prisma.barber.findMany({
        where: {
          active: true,
          schedules: { some: { dayOfWeek, isActive: true } }
        },
        include: {
          bookings: {
            where: {
              date: input.date,
              status: { not: 'CANCELLED' }
            }
          },
          breaks: true
        }
      });

      const freeBarber = availableBarbers.find(b => {
        const hasBookingConflict = b.bookings.some(bk =>
          hasTimeOverlap(input.startTime, endTime, bk.startTime, bk.endTime)
        );
        const hasBreakConflict = b.breaks.some(brk =>
          (!brk.date || brk.date === input.date) &&
          hasTimeOverlap(input.startTime, endTime, brk.startTime, brk.endTime)
        );
        return !hasBookingConflict && !hasBreakConflict;
      });

      if (!freeBarber) {
        throw new Error('No barbers are available at this selected time. Please choose another slot.');
      }
      chosenBarberId = freeBarber.id;
    } else {
      // Specific barber check
      const conflicts = await prisma.booking.findMany({
        where: {
          barberId: chosenBarberId,
          date: input.date,
          status: { not: 'CANCELLED' }
        }
      });

      const hasConflict = conflicts.some(c =>
        hasTimeOverlap(input.startTime, endTime, c.startTime, c.endTime)
      );

      if (hasConflict) {
        throw new Error('That chair was just taken for this time slot. Please choose an adjacent time.');
      }
    }

    // Handle Promo Code calculation
    let discountAmount = 0;
    if (input.promoCode) {
      const promo = await prisma.promo.findUnique({
        where: { code: input.promoCode.toUpperCase() }
      });
      if (promo && promo.active) {
        if (promo.discountType === 'FIXED') {
          discountAmount = promo.discountValue;
        } else if (promo.discountType === 'PERCENTAGE') {
          discountAmount = (service.price * promo.discountValue) / 100;
        }
      }
    }

    const finalPrice = Math.max(0, service.price - discountAmount);
    const reference = `GRM-${generateRefCode()}`;

    const booking = await prisma.booking.create({
      data: {
        reference,
        serviceId: service.id,
        barberId: chosenBarberId,
        customerName: input.customerName.trim(),
        customerEmail: input.customerEmail.toLowerCase().trim(),
        customerPhone: input.customerPhone.trim(),
        specialRequests: input.specialRequests?.trim() || null,
        date: input.date,
        startTime: input.startTime,
        endTime,
        totalPrice: finalPrice,
        discountAmount,
        promoCode: input.promoCode || null,
        status: 'CONFIRMED'
      },
      include: {
        service: true,
        barber: true
      }
    });

    return booking;
  }

  /**
   * Look up a booking by reference and optional email verification
   */
  static async getBookingByReference(reference: string, email?: string) {
    const booking = await prisma.booking.findUnique({
      where: { reference: reference.toUpperCase() },
      include: {
        service: true,
        barber: true
      }
    });

    if (!booking) {
      throw new Error('Booking not found. Please verify your reference code.');
    }

    if (email && booking.customerEmail.toLowerCase() !== email.toLowerCase().trim()) {
      throw new Error('The email does not match the booking records.');
    }

    return booking;
  }

  /**
   * Reschedule a booking
   */
  static async rescheduleBooking(reference: string, input: RescheduleBookingInput) {
    const booking = await prisma.booking.findUnique({
      where: { reference: reference.toUpperCase() },
      include: { service: true }
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status === 'CANCELLED') {
      throw new Error('Cannot reschedule a cancelled appointment');
    }

    const barberId = input.barberId || booking.barberId;
    const endTime = addMinutesToTime(input.startTime, booking.service.duration);

    // Collision check
    const conflicts = await prisma.booking.findMany({
      where: {
        barberId,
        date: input.date,
        id: { not: booking.id },
        status: { not: 'CANCELLED' }
      }
    });

    const hasConflict = conflicts.some(c =>
      hasTimeOverlap(input.startTime, endTime, c.startTime, c.endTime)
    );

    if (hasConflict) {
      throw new Error('Selected time slot is not available for this barber.');
    }

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        date: input.date,
        startTime: input.startTime,
        endTime,
        barberId
      },
      include: {
        service: true,
        barber: true
      }
    });

    return updated;
  }

  /**
   * Cancel a booking
   */
  static async cancelBooking(reference: string) {
    const booking = await prisma.booking.findUnique({
      where: { reference: reference.toUpperCase() }
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: 'CANCELLED'
      },
      include: {
        service: true,
        barber: true
      }
    });

    return updated;
  }
}
