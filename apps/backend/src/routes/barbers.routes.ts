import { Router } from 'express';
import { prisma } from '../db/client.js';

export const barbersRouter = Router();

barbersRouter.get('/', async (req, res) => {
  try {
    const barbers = await prisma.barber.findMany({
      where: { active: true },
      include: {
        schedules: { where: { isActive: true } }
      }
    });

    const parsed = barbers.map(b => ({
      ...b,
      specialties: JSON.parse(b.specialties || '[]')
    }));

    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

barbersRouter.get('/:slug', async (req, res) => {
  try {
    const barber = await prisma.barber.findUnique({
      where: { slug: req.params.slug },
      include: {
        schedules: { where: { isActive: true } }
      }
    });

    if (!barber) {
      return res.status(404).json({ success: false, error: 'Barber not found' });
    }

    return res.json({
      success: true,
      data: {
        ...barber,
        specialties: JSON.parse(barber.specialties || '[]')
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
