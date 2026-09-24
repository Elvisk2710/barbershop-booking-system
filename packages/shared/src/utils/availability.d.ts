import { AvailabilitySlot } from '../types/index.js';
export interface WorkingHours {
    start: string;
    end: string;
}
export interface ExistingSlot {
    startTime: string;
    endTime: string;
    status?: string;
}
export declare function parseMinutes(timeStr: string): number;
export declare function formatMinutes(totalMinutes: number): string;
export declare function addMinutesToTime(timeStr: string, minutesToAdd: number): string;
/**
 * Checks if two time windows [startA, endA) and [startB, endB) overlap
 */
export declare function hasTimeOverlap(startA: string, endA: string, startB: string, endB: string): boolean;
/**
 * Generates slots for a day given working hours, service duration, existing bookings, and breaks
 */
export declare function generateAvailableSlots(workingHours: WorkingHours, durationMinutes: number, existingBookings: ExistingSlot[], breaks?: ExistingSlot[], stepMinutes?: number): AvailabilitySlot[];
