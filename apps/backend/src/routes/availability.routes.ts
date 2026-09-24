import { Router } from 'express';
import { AvailabilityService } from '../services/availability.service.js';
import { AvailabilityQuerySchema } from '@barber/shared';

export const availabilityRouter = Router();

availabilityRouter.get('/', async (req, res) => {
  try {
    const parseResult = AvailabilityQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        errors: parseResult.error.flatten().fieldErrors
      });
    }

    const { date, serviceId, barberId } = parseResult.data;
    const result = await AvailabilityService.getAvailableSlots(
      date,
      serviceId,
      barberId
    );

    return res.json({ success: true, data: result });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
});
