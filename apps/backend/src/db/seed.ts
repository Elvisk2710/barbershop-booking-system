import { prisma } from './client.js';
import { INITIAL_SERVICES, INITIAL_BARBERS, PROMOTIONS } from '@barber/shared';

async function main() {
  console.log('--- Starting Gentleman\'s Grooming Bar Database Seed ---');

  // Seed Services
  for (const srv of INITIAL_SERVICES) {
    await prisma.service.upsert({
      where: { slug: srv.slug },
      update: {
        name: srv.name,
        description: srv.description,
        category: srv.category,
        price: srv.price,
        duration: srv.duration,
        featured: srv.featured,
        active: srv.active
      },
      create: {
        id: srv.id,
        name: srv.name,
        slug: srv.slug,
        description: srv.description,
        category: srv.category,
        price: srv.price,
        duration: srv.duration,
        featured: srv.featured,
        active: srv.active
      }
    });
    console.log(`✓ Seeded Service: ${srv.name}`);
  }

  // Seed Barbers and their schedules (Mon-Sat)
  for (const b of INITIAL_BARBERS) {
    const barber = await prisma.barber.upsert({
      where: { slug: b.slug },
      update: {
        name: b.name,
        role: b.role,
        bio: b.bio,
        specialties: JSON.stringify(b.specialties),
        photo: b.photo,
        actionPhoto: b.actionPhoto,
        experienceYears: b.experienceYears,
        active: b.active
      },
      create: {
        id: b.id,
        name: b.name,
        slug: b.slug,
        role: b.role,
        bio: b.bio,
        specialties: JSON.stringify(b.specialties),
        photo: b.photo,
        actionPhoto: b.actionPhoto,
        experienceYears: b.experienceYears,
        active: b.active
      }
    });

    // Seed standard schedule: Mon(1) - Fri(5) 08:00-18:00, Sat(6) 08:00-16:00
    for (let day = 1; day <= 5; day++) {
      await prisma.barberSchedule.create({
        data: {
          barberId: barber.id,
          dayOfWeek: day,
          startTime: '08:00',
          endTime: '18:00'
        }
      });
    }
    // Saturday
    await prisma.barberSchedule.create({
      data: {
        barberId: barber.id,
        dayOfWeek: 6,
        startTime: '08:00',
        endTime: '16:00'
      }
    });

    // Standard lunch break 13:00 - 14:00
    await prisma.barberBreak.create({
      data: {
        barberId: barber.id,
        startTime: '13:00',
        endTime: '14:00',
        reason: 'Lunch & Chair Prep'
      }
    });

    console.log(`✓ Seeded Barber & Schedules: ${b.name}`);
  }

  // Seed Promo Codes
  for (const promo of PROMOTIONS) {
    await prisma.promo.upsert({
      where: { code: promo.code },
      update: {
        title: promo.title,
        description: promo.description,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        active: promo.active
      },
      create: {
        code: promo.code,
        title: promo.title,
        description: promo.description,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        active: promo.active
      }
    });
    console.log(`✓ Seeded Promo Code: ${promo.code}`);
  }

  console.log('--- Seeding Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
