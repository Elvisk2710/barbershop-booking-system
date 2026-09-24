# Gentleman’s Grooming Bar — Implementation Plan

## Project Goal

Build a premium, production-ready gentleman’s grooming website that goes beyond a standard barber shop site.

The experience should feel like a refined grooming lounge: classy, cinematic, welcoming, modern, and memorable.

The visual direction should take inspiration from sophisticated gentleman-focused film aesthetics: tailored typography, editorial layouts, premium interiors, understated confidence, layered motion, and beautiful photography — without becoming intimidating, overly dark, or cliché.

The final product should feel like a real grooming business that could launch immediately.

---

## 1. Creative North Star

The website should communicate three things immediately:

- **Refinement**
- **Craft**
- **Ease**

The user should feel:

> “This is a premium place, but I would still feel comfortable walking in.”

### Tone

The brand should feel:

- Confident
- Warm
- Elegant
- Modern
- Editorial
- Welcoming
- Slightly playful

### Avoid

- Overly dark styling
- Aggressive masculinity
- Too much gold
- Generic barber-pole clichés
- “Gangster” styling
- Overly exclusive language
- Template-like layouts
- Excessive animation

### Internal Design Statement

> **Traditional gentlemanly refinement interpreted through a modern African grooming studio.**

---

# 2. Brand System

## Core Colour Palette

Use the palette from the supplied brand reference:

| Role | Colour | Usage |
|---|---|---|
| Primary | `#2A4759` | Navigation, hero overlays, major sections, footer |
| Accent | `#F79B72` | CTAs, highlights, hover states, small details |
| Neutral | `#EEEEEE` | Cards, borders, muted surfaces |

### Supporting Colours

| Role | Colour | Usage |
|---|---|---|
| Warm Background | `#F7F3EC` | Main light surfaces |
| Deep Background | `#16232B` | Cinematic dark sections |
| Dark Text | `#18252C` | Main text |
| Light Text | `#F8F5EF` | Text on dark surfaces |

### Colour Principles

- Navy should communicate sophistication.
- Coral should add warmth and personality.
- Warm cream should prevent the site from feeling sterile.
- Dark sections should be used deliberately, not everywhere.
- Accent colour should be used sparingly so it remains impactful.

---

# 3. Typography Direction

The typography should feel editorial, cinematic, and sophisticated.

## Display Typography

Recommended:

- Instrument Serif
- Cormorant Garamond
- DM Serif Display
- Libre Caslon Display

### Preferred Direction

**Instrument Serif**

Use it for:

- Hero headings
- Section titles
- Large statements
- Editorial quotations

Example:

> **The gentleman’s cut, reconsidered.**

---

## Interface Typography

Recommended:

- Manrope
- Inter
- Geist

### Preferred Direction

**Manrope**

Use it for:

- Body text
- Navigation
- Buttons
- Forms
- Pricing
- Labels
- Booking UI

### Primary Pairing

**Instrument Serif + Manrope**

---

## Accent Script Font

Use a script font only for very small decorative moments such as:

> Est. 2018

or:

> Take your time.

Never use script fonts for body copy or navigation.

---

# 4. Visual & Photography Direction

The site should look like one cohesive professional photoshoot.

Avoid random unrelated stock images.

## Hero Imagery

Recommended composition:

- Gentleman seated in a premium barber chair
- Barber working naturally
- Warm directional lighting
- Navy or dark teal interiors
- Wood and leather
- Mirrors
- Subtle coral accents
- Premium grooming environment

African clientele and African barbers should feature prominently.

---

## Supporting Imagery

Create a consistent set of images showing:

- Barber portraits
- Close-up fades
- Beard detailing
- Hot-towel treatments
- Haircut preparation
- Scissors and tools
- Workstations
- Gentleman adjusting jacket after grooming
- Hands cutting hair
- Interior seating
- Product shelves
- Coffee or refreshment moments
- Mirror reflections
- Barber-client interactions

### Visual Consistency

All images should share:

- Similar lighting
- Similar colour grading
- Similar environment
- Similar mood
- Similar framing
- Similar image quality

---

# 5. Homepage Experience

The homepage should feel like a visual journey rather than a stack of generic sections.

---

## Section 01 — Cinematic Hero

### Copy Direction

> **Looking sharp is only half the story.**

Supporting copy:

> Precision cuts, thoughtful grooming and an hour that’s entirely yours.

### CTAs

- **Reserve your chair**
- **Explore the menu**

Small operational text:

> Harare · Open today until 18:00

### Motion

On page load:

1. Logo fades in
2. Navigation gently reveals
3. Heading reveals line-by-line
4. Supporting text fades upward
5. Hero image reveals through a mask

### Parallax

- Background image moves slower than page scroll
- Foreground content moves slightly faster
- Decorative details move independently

Avoid excessive movement.

---

# 6. Philosophy Section

Use a spacious warm background.

Eyebrow:

> THE HOUSE PHILOSOPHY

Headline:

> **Grooming should never feel rushed.**

Support this with concise brand copy.

Use a large portrait beside the text.

### Motion

- Image vertical parallax
- Text reveals independently
- Small staggered paragraph movement

---

# 7. Signature Grooming Menu

Avoid normal ecommerce-style cards.

Use a premium editorial service layout.

### Example

#### 01 — The Classic

Traditional cut finished with styling.

**35 min · $10**

#### 02 — The Fade

Skin fade, detailing and finish.

**45 min · $14**

#### 03 — The Gentleman

Cut, beard sculpting and hot towel.

**60 min · $20**

### Interaction

Hovering over each service can:

- Change a large image
- Animate service numbering
- Expand underline
- Shift the CTA arrow slightly

Each item should include:

> **Reserve this service →**

Clicking should open booking with that service already selected.

---

# 8. Signature Parallax Showcase

Create a memorable cinematic section.

Headline:

> **Craft is in the details.**

Use full-screen images and layered content.

Possible sequence:

- Precision
- Ritual
- Conversation
- Finish

### Motion Layers

- Background image
- Foreground typography
- Detail objects
- Decorative line work

Keep parallax elegant and controlled.

---

# 9. The Barbers

Use a more premium title than “Our Team”.

Recommended:

> **Your chair. Your barber.**

Each barber should have:

- Professional portrait
- Name
- Role
- Specialties
- Bio
- Available days
- Services
- Next available time

Example:

### Tawanda Moyo

Senior Barber

> Fades / Texture / Beard work

CTA:

> **Meet Tawanda →**

### Hover Interaction

Portrait transitions subtly to a second image of the barber working.

### Barber Profile CTA

> **Book with Tawanda**

This should automatically preselect the barber in the booking system.

---

# 10. Signature Scroll Sequence

Create one standout scroll-driven section rather than animating everything.

### Sequence

Dark navy background.

Large text:

> **More than a haircut.**

Scroll.

Image appears.

> Time to switch off.

Scroll.

Second image.

> Time to reset.

Scroll.

Finished client.

> Walk out sharper.

### Implementation

Use GSAP + ScrollTrigger.

Possible techniques:

- Pinned section
- Image masks
- Text transitions
- Cross-fades
- Controlled parallax
- Layered depth

This should be the visual highlight of the site.

---

# 11. Grooming Experience Section

Use three experience stages.

## 01 — ARRIVE

Take a seat. Grab a coffee.

## 02 — RESET

Consultation, cut and grooming.

## 03 — LEAVE SHARP

Final styling and finishing.

Use real photography instead of icons.

---

# 12. Booking Experience

The booking system should be one of the strongest parts of the project.

## Booking Flow

```text
SERVICE
    ↓
BARBER
    ↓
DATE
    ↓
TIME
    ↓
YOUR DETAILS
    ↓
REVIEW
    ↓
CONFIRMED
```

Show progress throughout.

Example:

> Service · Barber · Time · Details

---

# 13. Booking Step 1 — Service

Heading:

> **What are we doing today?**

Suggested services:

- Classic Cut
- Skin Fade
- Beard Sculpt
- The Gentleman
- Father & Son
- Full Grooming Ritual

Each service should show:

- Name
- Description
- Duration
- Price
- Optional image

---

# 14. Booking Step 2 — Barber

Heading:

> **Who would you like behind the chair?**

Options:

- Any available barber
- Specific barber profiles

Show:

- Portrait
- Name
- Specialties
- Availability hint

---

# 15. Booking Step 3 — Date & Availability

Use a horizontal date selector.

Example:

```text
MON   TUE   WED   THU   FRI
28    29    30    01    02
```

Group times into:

### Morning

- 09:00
- 09:45
- 10:30

### Afternoon

- 13:00
- 13:45
- 15:15

Only valid time slots should appear.

### Availability Logic

Calculate using:

- Business hours
- Barber working hours
- Existing bookings
- Service duration
- Break periods
- Closed dates

---

# 16. Booking Step 4 — Customer Details

Keep the form simple.

Fields:

- Name
- Email
- Phone
- Special request — optional

Helpful microcopy:

> We’ll only use your number for this appointment.

Include clear validation states.

---

# 17. Booking Review

Heading:

> **Everything looking sharp?**

Display:

```text
The Gentleman
with Tawanda Moyo

Thursday, 1 October
14:30 – 15:30

$20
```

Actions:

- **Confirm booking**
- Change appointment

---

# 18. Booking Confirmation

This should be one of the best-designed screens in the project.

Headline:

> **You’re in.**

Appointment card:

```text
THE GENTLEMAN

Tawanda Moyo

Thu 01 Oct
14:30 – 15:30

REF: GRM-2041
```

Actions:

- Add to Google Calendar
- Add to Apple Calendar
- Download calendar file
- Get directions
- Manage booking

---

# 19. Booking Backend

Recommended stack:

- Next.js
- TypeScript
- PostgreSQL
- Supabase

## Core Data Models

### Service

```text
id
name
description
price
duration
active
```

### Barber

```text
id
name
bio
photo
active
```

### BarberService

```text
barberId
serviceId
```

### Schedule

```text
barberId
dayOfWeek
startTime
endTime
```

### Break

```text
barberId
date
startTime
endTime
```

### Booking

```text
id
reference
serviceId
barberId
customerName
email
phone
date
startTime
endTime
status
createdAt
```

### Booking Statuses

```text
CONFIRMED
CANCELLED
COMPLETED
NO_SHOW
```

---

# 20. Booking Conflict Prevention

Availability should not be enforced only in the frontend.

Before saving a booking:

1. Recheck availability on the server
2. Confirm the slot is still open
3. Create the booking only if valid

If the selected slot is gone:

> **That chair was just taken.**

Then recommend nearby times:

- 14:45
- 15:30
- 16:15

---

# 21. Manage Booking

Route:

```text
/manage
```

Customer enters:

- Booking reference
- Email

Allow:

- View appointment
- Reschedule
- Cancel

This makes the experience feel like a complete product.

---

# 22. Calendar Integration

## Google Calendar

Generate a calendar event using actual booking information.

## ICS Calendar File

Generate `.ics` files for:

- Apple Calendar
- Outlook
- Other compatible calendar apps

Event information should include:

- Barber shop name
- Service
- Barber
- Correct date
- Start time
- End time
- Location
- Booking reference
- Useful appointment notes

Do not hard-code appointment times.

---

# 23. Promotional Modal

Use the required modal naturally.

Trigger after meaningful engagement rather than immediately.

Example:

> **New around here?**

> Your first visit comes with a complimentary beard tidy when booked with a haircut.

Buttons:

- **Claim it**
- Maybe later

The offer can automatically apply to the booking flow.

---

# 24. Motion System

Use motion deliberately.

## Recommended Stack

### GSAP + ScrollTrigger

Use for:

- Scroll-driven timelines
- Pinned sections
- Parallax
- Image masks
- Large text reveals

### Lenis

Use for:

- Smooth scrolling

### Framer Motion

Use for:

- Modals
- Booking transitions
- Mobile menu
- Page transitions
- Small UI interactions

---

# 25. Motion Timing Tokens

## Quick

`180–250ms`

Use for:

- Hover
- Buttons
- Small UI transitions

## Normal

`350–500ms`

Use for:

- Menus
- Cards
- Booking steps

## Editorial

`700–1000ms`

Use for:

- Image reveals
- Hero reveals
- Large headings

## Scroll-Based

Use progress-based animation rather than fixed timing.

---

# 26. Reveal Language

## Headings

```text
clip
↓
translateY(110%)
↓
translateY(0)
```

## Images

```text
clip-path reveal
+
scale 1.08 → 1
```

## Supporting Copy

```text
opacity 0 → 1
translateY 20 → 0
```

## Cards

Stagger:

`60–100ms`

---

# 27. Parallax Rules

Use three depth layers.

```text
Background    0.15x
Content       1x
Foreground    1.2x
```

Prefer moving images inside containers rather than moving entire sections.

Text readability must never be compromised.

---

# 28. Hover Interactions

## Service Item

- Image scales slightly
- Number shifts
- Underline expands
- CTA arrow moves

## Button

- Coral fill sweep
- Text colour shift
- Arrow movement

## Barber Portrait

- Portrait 1 transitions to portrait 2

## Navigation

- Subtle underline reveal

No bouncing or cartoon-like animation.

---

# 29. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable or simplify:

- Smooth scrolling
- Aggressive parallax
- Large transforms
- Long animations
- Pinned sequences where necessary

---

# 30. Navigation

## Desktop

```text
LOGO

Services
The Gentlemen
Our Story
Visit

                  Reserve a Chair
```

### Behaviour

- Transparent over hero
- Becomes solid after scrolling
- Slightly reduces height on scroll

## Mobile

Use a clean overlay menu.

Include a prominent:

> **Reserve a Chair**

---

# 31. Sticky Mobile CTA

On mobile:

```text
RESERVE A CHAIR →
```

Keep this visible at the bottom where appropriate.

Do not allow it to obstruct forms or legal pages.

---

# 32. Page Structure

| Route | Purpose |
|---|---|
| `/` | Main brand experience |
| `/services` | Grooming menu |
| `/gentlemen` | Barber profiles |
| `/gentlemen/[slug]` | Individual barber page |
| `/about` | Story and philosophy |
| `/book` | Booking flow |
| `/booking/[reference]` | Booking confirmation |
| `/manage` | Manage appointment |
| `/visit` | Contact and location |
| `/terms` | Terms and Conditions |
| `/privacy` | Privacy Policy |

---

# 33. Footer

Use a deep navy background.

Large headline:

> **See you in the chair.**

Suggested footer structure:

```text
THE HOUSE

Services
Our Gentlemen
Our Story
Visit
Book

CONTACT

+263 XX XXX XXXX
hello@...

VISIT

Avondale
Harare

HOURS

Mon–Fri  08:00–18:00
Sat      08:00–16:00
Sun      Closed
```

Bottom row:

- Terms
- Privacy
- Instagram
- Facebook
- Copyright

---

# 34. Technical Architecture

```text
Next.js
│
├── App Router
│
├── TypeScript
│
├── Tailwind CSS
│
├── GSAP
│   └── ScrollTrigger
│
├── Framer Motion
│
├── Lenis
│
├── Supabase
│   └── PostgreSQL
│
├── Booking Engine
│
├── Google Calendar Generator
│
└── ICS Generator
```

## Deployment

Recommended:

- Vercel
- Supabase

## Image Handling

Use:

- Next.js Image
- AVIF/WebP where appropriate
- Responsive image sizing
- Lazy loading
- Hero preload only where justified

---

# 35. Component Architecture

```text
components/
│
├── layout/
│   ├── Navbar
│   ├── MobileMenu
│   └── Footer
│
├── motion/
│   ├── RevealText
│   ├── RevealImage
│   ├── ParallaxImage
│   ├── StaggerChildren
│   └── MagneticButton
│
├── services/
│   ├── ServiceRow
│   ├── ServiceCard
│   └── ServicePreview
│
├── barbers/
│   ├── BarberCard
│   ├── BarberPortrait
│   └── BarberAvailability
│
└── booking/
    ├── BookingStepper
    ├── ServiceSelector
    ├── BarberSelector
    ├── DatePicker
    ├── TimeSelector
    ├── CustomerForm
    ├── BookingReview
    └── ConfirmationCard
```

---

# 36. Recommended Build Order

Do not start by building random pages.

| Phase | Deliverable |
|---|---|
| 1 | Brand and creative direction |
| 2 | Design tokens and typography |
| 3 | Photography direction |
| 4 | Database schema |
| 5 | Booking engine |
| 6 | Calendar integration |
| 7 | Site shell |
| 8 | Homepage |
| 9 | Services |
| 10 | Barber experience |
| 11 | About and Visit |
| 12 | Booking UI |
| 13 | Manage booking |
| 14 | Motion system |
| 15 | Responsive polish |
| 16 | Accessibility |
| 17 | Performance |
| 18 | Full QA |
| 19 | Deployment |
| 20 | Final assessment run |

---

# 37. Development Milestones

## Milestone 1 — Foundation

Complete:

- Brand
- Palette
- Typography
- Spacing
- Grid
- Breakpoints
- Motion principles
- Photography direction

---

## Milestone 2 — Full-Stack Core

Complete:

- Database
- Services
- Barber schedules
- Availability algorithm
- Booking creation
- Booking collision protection
- Confirmation
- Calendar generation

---

## Milestone 3 — Main Experience

Build:

- Navigation
- Homepage
- Services
- Barber profiles
- About
- Visit
- Footer
- Legal pages

---

## Milestone 4 — Motion

Add:

- Lenis
- ScrollTrigger
- Hero sequence
- Text reveals
- Image masks
- Parallax
- Signature pinned section
- Page transitions

---

## Milestone 5 — Polish

Focus on:

- Spacing
- Typography
- Image crops
- Responsive details
- Loading states
- Empty states
- Hover states
- Keyboard behaviour
- Validation
- Error handling

---

# 38. Performance Budget

The site must remain fast despite the cinematic design.

## Target Metrics

- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

### Lighthouse Targets

```text
Performance      90+
Accessibility    95+
Best Practices   95+
SEO              95+
```

### Rules

- Use AVIF/WebP
- Preload only critical hero content
- Lazy load non-critical images
- Avoid massive background videos
- Remove inactive ScrollTriggers on unmount
- Prefer transforms and opacity
- Avoid continuous heavy blur effects

---

# 39. Mobile Motion Strategy

Desktop can support richer cinematic effects.

## Desktop

- 3-layer parallax
- Pinned sequences
- Large typography
- Image masks

## Mobile

- Lightweight parallax
- Shorter reveals
- Reduced motion distance
- Fewer pinned sequences
- Optimized imagery

The mobile experience should feel intentional, not like a reduced desktop version.

---

# 40. Testing Matrix

## Booking

Test:

- Service selection
- Barber selection
- Date selection
- Time selection
- Booking creation
- Slot blocking
- Double-booking prevention
- Correct duration
- Correct price
- Confirmation generation

## Calendar

Test:

- Google Calendar
- ICS
- Correct start time
- Correct end time
- Correct service
- Correct barber
- Correct location

## UI

Test:

- Desktop
- Tablet
- Mobile
- Navigation
- Modal
- Forms
- Buttons
- Links
- Footer
- 404 page

## Edge Cases

Test:

- Closed day
- Past date
- No availability
- Invalid email
- Invalid phone
- Expired booking reference
- Cancelled appointment
- Reschedule collision
- Server error

---

# 41. Final QA Standard

Before submission, the website must have:

- Zero placeholder content
- Zero console errors
- Zero broken links
- Zero development copy
- Zero Lorem Ipsum
- Zero missing images
- Zero dead buttons
- Zero unfinished pages
- Zero fake functionality

The site should be usable without any explanation.

---

# 42. Three Flagship Differentiators

The project should focus on three exceptional areas.

## 1. Signature Cinematic Scroll Sequence

The visual “wow”.

## 2. Real Availability-Based Booking Engine

The technical “wow”.

## 3. Immaculate Confirmation and Calendar Experience

The attention-to-detail “wow”.

Everything else should reinforce these three.

---

# 43. Desired Reviewer Experience

The reviewer should experience this progression:

### First 5 seconds

> “This looks unusually polished.”

### First 30 seconds

> “This feels like a real brand.”

### After interacting

> “Everything actually works.”

### After booking

> “They built proper availability.”

### After calendar integration

> “They paid attention to the brief.”

### On mobile

> “This is just as polished here.”

---

# 44. Final Design Principle

The goal is not to build the most features.

The goal is to build the most **convincing, cohesive and complete product**.

The final experience should feel less like:

> “A barber website built for an assessment.”

and more like:

> **“A fully designed and engineered digital experience for a premium gentleman’s grooming brand.”**
