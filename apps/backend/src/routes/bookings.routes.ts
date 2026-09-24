import { Router } from 'express';
import { BookingService } from '../services/booking.service.js';
import { CreateBookingSchema, RescheduleBookingSchema, generateIcsContent } from '@barber/shared';

export const bookingsRouter = Router();

// Create new booking
bookingsRouter.post('/', async (req, res) => {
  try {
    const parseResult = CreateBookingSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        errors: parseResult.error.flatten().fieldErrors
      });
    }

    const booking = await BookingService.createBooking(parseResult.data);
    return res.status(201).json({ success: true, data: booking });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// Get booking by reference
bookingsRouter.get('/:reference', async (req, res) => {
  try {
    const email = req.query.email as string | undefined;
    const booking = await BookingService.getBookingByReference(req.params.reference, email);
    return res.json({ success: true, data: booking });
  } catch (error: any) {
    return res.status(404).json({ success: false, error: error.message });
  }
});

// Download .ics file for calendar
bookingsRouter.get('/:reference/ics', async (req, res) => {
  try {
    const booking = await BookingService.getBookingByReference(req.params.reference);
    const icsString = generateIcsContent({
      booking: booking as any,
      service: booking.service as any,
      barber: booking.barber as any
    });

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${booking.reference}-appointment.ics"`);
    return res.send(icsString);
  } catch (error: any) {
    return res.status(404).json({ success: false, error: error.message });
  }
});

// Reschedule
bookingsRouter.patch('/:reference/reschedule', async (req, res) => {
  try {
    const parseResult = RescheduleBookingSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        errors: parseResult.error.flatten().fieldErrors
      });
    }

    const updated = await BookingService.rescheduleBooking(req.params.reference, parseResult.data);
    return res.json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// Cancel
bookingsRouter.post('/:reference/cancel', async (req, res) => {
  try {
    const updated = await BookingService.cancelBooking(req.params.reference);
    return res.json({ success: true, data: updated });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
});
