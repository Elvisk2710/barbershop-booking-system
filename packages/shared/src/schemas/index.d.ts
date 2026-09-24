import { z } from 'zod';
export declare const CreateBookingSchema: z.ZodObject<{
    serviceId: z.ZodString;
    barberId: z.ZodString;
    date: z.ZodString;
    startTime: z.ZodString;
    customerName: z.ZodString;
    customerEmail: z.ZodString;
    customerPhone: z.ZodString;
    specialRequests: z.ZodOptional<z.ZodString>;
    promoCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    serviceId: string;
    barberId: string;
    date: string;
    startTime: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    specialRequests?: string | undefined;
    promoCode?: string | undefined;
}, {
    serviceId: string;
    barberId: string;
    date: string;
    startTime: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    specialRequests?: string | undefined;
    promoCode?: string | undefined;
}>;
export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
export declare const RescheduleBookingSchema: z.ZodObject<{
    date: z.ZodString;
    startTime: z.ZodString;
    barberId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    date: string;
    startTime: string;
    barberId?: string | undefined;
}, {
    date: string;
    startTime: string;
    barberId?: string | undefined;
}>;
export type RescheduleBookingInput = z.infer<typeof RescheduleBookingSchema>;
export declare const CancelBookingSchema: z.ZodObject<{
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reason?: string | undefined;
}, {
    reason?: string | undefined;
}>;
export type CancelBookingInput = z.infer<typeof CancelBookingSchema>;
export declare const ManageBookingLookupSchema: z.ZodObject<{
    reference: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reference: string;
    email: string;
}, {
    reference: string;
    email: string;
}>;
export type ManageBookingLookupInput = z.infer<typeof ManageBookingLookupSchema>;
export declare const AvailabilityQuerySchema: z.ZodObject<{
    date: z.ZodString;
    serviceId: z.ZodString;
    barberId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    serviceId: string;
    date: string;
    barberId?: string | undefined;
}, {
    serviceId: string;
    date: string;
    barberId?: string | undefined;
}>;
export type AvailabilityQueryInput = z.infer<typeof AvailabilityQuerySchema>;
