# Gentleman’s Grooming Bar — Full Stack Monorepo

> **"Traditional gentlemanly refinement interpreted through a modern African grooming studio."**
> Location: Avondale, Harare, Zimbabwe.

---

## 🏛️ Project Overview

This repository is a production-grade full-stack monorepo for **Gentleman’s Grooming Bar**, crafted to fulfill all specifications outlined in `gentlemans_grooming_bar_implementation_plan.md` and `Talent_Forge_Junior_Full_Stack_Developer_Practical_Assessment.pdf`.

---

## 📦 Monorepo Architecture

```text
barber-project/
├── apps/
│   ├── frontend/                 # Next.js 14 App Router Frontend
│   │   ├── src/
│   │   │   ├── app/              # Routes: /, /services, /gentlemen, /gentlemen/[slug], /about, /visit, /book, /booking/[reference], /manage, /terms, /privacy
│   │   │   ├── components/       # UI Components (Navbar, Footer, PromoModal, StickyCTA)
│   │   │   └── lib/              # Typed API Client & State Helpers
│   │   ├── tailwind.config.ts    # Brand Palette Tokens & Fonts
│   │   └── package.json
│   │
│   └── backend/                  # Express + TypeScript + Prisma ORM Backend API
│       ├── src/
│       │   ├── db/               # Prisma Client & Initial Harare Studio Seeder
│       │   ├── routes/           # Services, Barbers, Availability, Bookings, Promos
│       │   ├── services/         # Collision Prevention & Availability Engine
│       │   └── index.ts          # Express API server entry
│       ├── prisma/
│       │   └── schema.prisma     # SQLite (Dev) / PostgreSQL (Prod) Schema
│       └── package.json
│
└── packages/
    └── shared/                   # Shared TypeScript Types, Zod Schemas, Calendar Utilities & Constants
        ├── src/
        │   ├── types/            # Service, Barber, Booking, Status, Calendar types
        │   ├── schemas/          # Zod Validation Schemas
        │   ├── constants/        # Harare Studio Data, Default Services, Hours
        │   └── utils/            # Google Calendar URL builder & Apple .ics generator
        └── package.json
```

---

## 🎨 Brand System & Design Tokens

- **Primary Navy**: `#2A4759`
- **Accent Coral**: `#F79B72`
- **Neutral**: `#EEEEEE`
- **Warm Cream**: `#F7F3EC`
- **Deep Cinematic**: `#16232B`
- **Typography**: `Instrument Serif` (Headings & Editorial) + `Manrope` (Body & Interface)

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
From the root directory:
```bash
npm install
```

### 2. Initialize Database & Seed Initial Data
```bash
# Push schema to SQLite local database
npm run db:push

# Seed barbers, services, schedules, and welcome promo
npm run db:seed
```

### 3. Start Development Servers
Run frontend and backend simultaneously:
```bash
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:4000](http://localhost:4000)
- **API Health Check**: [http://localhost:4000/api/health](http://localhost:4000/api/health)

---

## 📋 Features Implemented

1. **Complete Editorial Pages**:
   - `/` — Cinematic Homepage with hero video/image, philosophy, signature menu preview, 3-stage grooming ritual (Arrive, Reset, Leave Sharp), and booking CTAs.
   - `/services` — Full grooming menu with pricing, duration, and direct service reservation.
   - `/gentlemen` — Barber profiles with experience, specialties, and chair booking.
   - `/gentlemen/[slug]` — Individual barber detail view with tailored bio and direct scheduler.
   - `/about` — Studio story, craft principles, and Harare heritage.
   - `/visit` — Avondale Harare location, operating hours, phone, email, parking info, and directions.
   - `/terms` — Real, comprehensive Terms & Conditions.
   - `/privacy` — Full Privacy Policy.

2. **Full-Stack Booking Engine (`/book`)**:
   - Step 1: Service selection.
   - Step 2: Barber selection ("First Available Craftsman" or specific barber).
   - Step 3: Real-time Date picker & available time slot grid calculated using barber working hours, breaks, and existing bookings.
   - Step 4: Customer details & Promo code support (e.g. `FIRSTGUEST` for $4 discount).
   - Step 5: Server-side collision detection to prevent double booking.

3. **Calendar Integration & Confirmation (`/booking/[reference]`)**:
   - Displays reference (e.g. `GRM-2041`), date, time, barber, and pricing.
   - **Add to Google Calendar** button with dynamic query parameters.
   - **Apple Calendar & Outlook (`.ics`)** direct download file generator.

4. **Booking Management (`/manage`)**:
   - Client portal to look up appointment by reference & email.
   - Live **Reschedule** feature checking for slot conflicts.
   - **Cancel Appointment** feature with status updates.

5. **First-Visit Promotional Modal**:
   - Welcome invitation popup triggering naturally with auto-applied discount and close control.
