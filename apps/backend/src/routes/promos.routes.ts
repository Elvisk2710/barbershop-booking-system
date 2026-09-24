import { Router } from 'express';
import { prisma } from '../db/client.js';

export const promosRouter = Router();

promosRouter.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: 'Promo code is required' });
    }

    const promo = await prisma.promo.findUnique({
      where: { code: String(code).toUpperCase().trim() }
    });

    if (!promo || !promo.active) {
      return res.status(404).json({ success: false, error: 'Invalid or expired promotional code' });
    }

    return res.json({ success: true, data: promo });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
