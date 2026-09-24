import { generateGoogleCalendarUrl, generateIcsContent } from '@barber/shared';
import { prisma } from './db/client.js';
import { AvailabilityService } from './services/availability.service.js';
import { BookingService } from './services/booking.service.js';

async function testAllIntegrations() {
  console.log('====================================================');
  console.log('🧪 Starting Full System Integration Verification Test');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  // 1. Database Connection & Seed Check
  try {
    const serviceCount = await prisma.service.count();
    const barberCount = await prisma.barber.count();
    const promoCount = await prisma.promo.count();
    console.log(`✓ 1. Database Connected: ${serviceCount} services, ${barberCount} barbers, ${promoCount} promo codes found.`);
    passed++;
  } catch (err: any) {
    console.error(`✗ 1. Database Connection Failed:`, err.message);
    failed++;
  }

  // 2. Services Retrieval
  let testService: any = null;
  try {
    const services = await prisma.service.findMany({ where: { active: true } });
    if (services.length === 0) throw new Error('No services returned');
    testService = services[0];
    console.log(`✓ 2. Services Integration: Retrieved ${services.length} services (Sample: "${testService.name}" - $${testService.price}, ${testService.duration}m).`);
    passed++;
  } catch (err: any) {
    console.error(`✗ 2. Services Retrieval Failed:`, err.message);
    failed++;
  }

  // 3. Barbers Retrieval & Schedules
  let testBarber: any = null;
  try {
    const barbers = await prisma.barber.findMany({
      where: { active: true },
      include: { schedules: true, breaks: true }
    });
    if (barbers.length === 0) throw new Error('No barbers returned');
    testBarber = barbers[0];
    console.log(`✓ 3. Barbers Integration: Retrieved ${barbers.length} barbers (Sample: "${testBarber.name}" with ${testBarber.schedules.length} active schedule blocks).`);
    passed++;
  } catch (err: any) {
    console.error(`✗ 3. Barbers Retrieval Failed:`, err.message);
    failed++;
  }

  // 4. Availability Engine Integration
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
  const testDate = tomorrow.toISOString().split('T')[0];

  let chosenSlotTime = '10:00';
  try {
    const result = await AvailabilityService.getAvailableSlots(testDate, testService.id, testBarber.id);
    if (!result.slots || result.slots.length === 0) throw new Error('No availability slots generated');
    const openSlots = result.slots.filter(s => s.available);
    if (openSlots.length > 0) chosenSlotTime = openSlots[0].time;
    console.log(`✓ 4. Availability Engine: Generated ${result.slots.length} time slots for ${testDate} (${openSlots.length} open slots).`);
    passed++;
  } catch (err: any) {
    console.error(`✗ 4. Availability Engine Failed:`, err.message);
    failed++;
  }

  // 5. Promo Code Validation Integration
  try {
    const promo = await prisma.promo.findUnique({ where: { code: 'FIRSTGUEST' } });
    if (!promo || !promo.active) throw new Error('Promo code FIRSTGUEST not found or inactive');
    console.log(`✓ 5. Promo Validation: Verified code "${promo.code}" ($${promo.discountValue} discount).`);
    passed++;
  } catch (err: any) {
    console.error(`✗ 5. Promo Validation Failed:`, err.message);
    failed++;
  }

  // 6. Booking Creation with Conflict Prevention
  let createdBooking: any = null;
  try {
    createdBooking = await BookingService.createBooking({
      serviceId: testService.id,
      barberId: testBarber.id,
      date: testDate,
      startTime: chosenSlotTime,
      customerName: 'Kudakwashe Musarurwa',
      customerEmail: 'kuda.test@groomingbar.co.zw',
      customerPhone: '+263 77 987 6543',
      specialRequests: 'Warm eucalyptus steam towel preference',
      promoCode: 'FIRSTGUEST'
    });

    console.log(`✓ 6. Booking Engine: Created booking ref ${createdBooking.reference} for ${createdBooking.customerName} on ${createdBooking.date} at ${createdBooking.startTime} (Price: $${createdBooking.totalPrice}, Status: ${createdBooking.status}).`);
    passed++;
  } catch (err: any) {
    console.error(`✗ 6. Booking Creation Failed:`, err.message);
    failed++;
  }

  // 7. Collision Detection Verification (Attempting double-booking on same slot)
  try {
    let collisionDetected = false;
    try {
      await BookingService.createBooking({
        serviceId: testService.id,
        barberId: testBarber.id,
        date: testDate,
        startTime: chosenSlotTime,
        customerName: 'Duplicate Attempt',
        customerEmail: 'duplicate@test.com',
        customerPhone: '+263 77 000 0000'
      });
    } catch (collisionError: any) {
      collisionDetected = true;
      console.log(`✓ 7. Conflict Prevention: Successfully prevented double-booking collision ("${collisionError.message}").`);
      passed++;
    }
    if (!collisionDetected) {
      throw new Error('Collision detection failed: double booking was erroneously permitted');
    }
  } catch (err: any) {
    console.error(`✗ 7. Collision Detection Failed:`, err.message);
    failed++;
  }

  // 8. Calendar Integrations (Google Calendar & Apple/Outlook .ics)
  try {
    if (!createdBooking) throw new Error('No booking to test calendar with');
    
    const googleUrl = generateGoogleCalendarUrl({
      booking: createdBooking,
      service: testService,
      barber: testBarber
    });

    const icsContent = generateIcsContent({
      booking: createdBooking,
      service: testService,
      barber: testBarber
    });

    const hasExpectedGoogleParams = googleUrl.includes('calendar.google.com') && googleUrl.includes(encodeURIComponent(createdBooking.reference));
    const hasExpectedIcsFields = icsContent.includes('BEGIN:VCALENDAR') && icsContent.includes(createdBooking.reference) && icsContent.includes('STATUS:CONFIRMED');

    if (!hasExpectedGoogleParams || !hasExpectedIcsFields) {
      throw new Error('Calendar output payload incomplete or malformed');
    }

    console.log(`✓ 8. Calendar Integrations: Generated Google Calendar URL and valid iCalendar (.ics) string with booking reference ${createdBooking.reference}.`);
    passed++;
  } catch (err: any) {
    console.error(`✗ 8. Calendar Integrations Failed:`, err.message);
    failed++;
  }

  // 9. Booking Rescheduling Flow
  try {
    if (!createdBooking) throw new Error('No booking to test rescheduling with');
    
    const rescheduled = await BookingService.rescheduleBooking(createdBooking.reference, {
      date: testDate,
      startTime: '15:30',
      barberId: testBarber.id
    });

    if (rescheduled.startTime !== '15:30') throw new Error('Start time not updated');
    console.log(`✓ 9. Rescheduling Integration: Successfully updated booking ${rescheduled.reference} to ${rescheduled.startTime}.`);
    passed++;
  } catch (err: any) {
    console.error(`✗ 9. Rescheduling Integration Failed:`, err.message);
    failed++;
  }

  // 10. Booking Cancellation Flow
  try {
    if (!createdBooking) throw new Error('No booking to test cancellation with');

    const cancelled = await BookingService.cancelBooking(createdBooking.reference);
    if (cancelled.status !== 'CANCELLED') throw new Error(`Expected status CANCELLED, got ${cancelled.status}`);
    console.log(`✓ 10. Cancellation Integration: Successfully updated booking ${cancelled.reference} status to CANCELLED.`);
    passed++;
  } catch (err: any) {
    console.error(`✗ 10. Cancellation Integration Failed:`, err.message);
    failed++;
  }

  console.log('\n====================================================');
  console.log(`📊 Verification Summary: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================\n');

  await prisma.$disconnect();
  if (failed > 0) process.exit(1);
}

testAllIntegrations().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
