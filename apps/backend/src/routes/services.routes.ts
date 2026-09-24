import { Router } from 'express';
import { prisma } from '../db/client.js';

export const servicesRouter = Router();

servicesRouter.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: [{ featured: 'desc' }, { price: 'asc' }]
    });
    return res.json({ success: true, data: services });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

servicesRouter.get('/:slug', async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { slug: req.params.slug }
    });
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    return res.json({ success: true, data: service });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
