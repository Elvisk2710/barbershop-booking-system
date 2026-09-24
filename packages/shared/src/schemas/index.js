"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityQuerySchema = exports.ManageBookingLookupSchema = exports.CancelBookingSchema = exports.RescheduleBookingSchema = exports.CreateBookingSchema = void 0;
const zod_1 = require("zod");
exports.CreateBookingSchema = zod_1.z.object({
    serviceId: zod_1.z.string().min(1, 'Please select a service'),
    barberId: zod_1.z.string().min(1, 'Please select a barber or choose any available'),
    date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    startTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Time must be in HH:mm format'),
    customerName: zod_1.z.string().min(2, 'Name must be at least 2 characters').max(100),
    customerEmail: zod_1.z.string().email('Please enter a valid email address'),
    customerPhone: zod_1.z.string().min(6, 'Please enter a valid phone number').max(20),
    specialRequests: zod_1.z.string().max(500).optional(),
    promoCode: zod_1.z.string().optional()
});
exports.RescheduleBookingSchema = zod_1.z.object({
    date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    startTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Time must be in HH:mm format'),
    barberId: zod_1.z.string().optional()
});
exports.CancelBookingSchema = zod_1.z.object({
    reason: zod_1.z.string().max(300).optional()
});
exports.ManageBookingLookupSchema = zod_1.z.object({
    reference: zod_1.z.string().min(4, 'Reference is required').toUpperCase(),
    email: zod_1.z.string().email('Valid email is required')
});
exports.AvailabilityQuerySchema = zod_1.z.object({
    date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    serviceId: zod_1.z.string().min(1, 'serviceId is required'),
    barberId: zod_1.z.string().optional()
});
