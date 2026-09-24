import { z } from 'zod';

export const CreateBookingSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  barberId: z.string().min(1, 'Please select a barber or choose any available'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Time must be in HH:mm format'),
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  customerEmail: z.string().email('Please enter a valid email address'),
  customerPhone: z.string().min(6, 'Please enter a valid phone number').max(20),
  specialRequests: z.string().max(500).optional(),
  promoCode: z.string().optional()
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;

export const RescheduleBookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Time must be in HH:mm format'),
  barberId: z.string().optional()
});

export type RescheduleBookingInput = z.infer<typeof RescheduleBookingSchema>;

export const CancelBookingSchema = z.object({
  reason: z.string().max(300).optional()
});

export type CancelBookingInput = z.infer<typeof CancelBookingSchema>;

export const ManageBookingLookupSchema = z.object({
  reference: z.string().min(4, 'Reference is required').toUpperCase(),
  email: z.string().email('Valid email is required')
});

export type ManageBookingLookupInput = z.infer<typeof ManageBookingLookupSchema>;

export const AvailabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  serviceId: z.string().min(1, 'serviceId is required'),
  barberId: z.string().optional()
});

export type AvailabilityQueryInput = z.infer<typeof AvailabilityQuerySchema>;
