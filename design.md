# DESIGN.md
# Gentleman’s Grooming Bar — Frontend Design System & Principles

## 0. Purpose

This document defines the visual, interaction, motion, responsive, and accessibility principles for the Gentleman’s Grooming Bar frontend.

The objective is to create a website that feels:

- Refined
- Welcoming
- Editorial
- Cinematic
- Premium
- Modern
- Masculine without being aggressive
- Distinctive without becoming difficult to use

The experience should feel closer to a **gentleman’s grooming lounge, private members’ club, contemporary tailor, and premium editorial publication** than a conventional barbershop website.

The frontend should never feel like a generic template.

---

# 1. Creative Direction

## Core Design Statement

> Traditional gentlemanly refinement interpreted through a modern African grooming studio.

## Emotional Goals

The interface should make users feel:

- Comfortable
- Looked after
- Confident
- Curious
- Relaxed
- Impressed by the level of craft

The experience should communicate:

> “This is premium, but I belong here.”

## Tone

Use:

- Quiet confidence
- Warmth
- Craftsmanship
- Editorial restraint
- Hospitality
- Understated sophistication

Avoid:

- Loud luxury
- Excessive gold
- Overly dark interfaces
- Hyper-masculine styling
- Aggressive copy
- Generic barber-pole motifs
- Too many visual gimmicks
- Unnecessary animation
- Sterile minimalism
- Overly corporate UI

---

# 2. Design Priorities

Every frontend decision should prioritize these qualities in this order:

1. **Clarity**
2. **Brand character**
3. **Visual hierarchy**
4. **Ease of booking**
5. **Consistency**
6. **Motion quality**
7. **Responsiveness**
8. **Accessibility**
9. **Performance**
10. **Novelty**

Never sacrifice usability for visual spectacle.

---

# 3. Brand Colour System

## Core Palette

| Token | Hex | Usage |
|---|---:|---|
| `brand.navy` | `#2A4759` | Primary brand colour, navigation, dark sections |
| `brand.coral` | `#F79B72` | Accent colour, CTAs, highlights |
| `brand.softGray` | `#EEEEEE` | Neutral cards, borders, muted surfaces |

## Supporting Palette

| Token | Hex | Usage |
|---|---:|---|
| `surface.warm` | `#F7F3EC` | Main background |
| `surface.deep` | `#16232B` | Cinematic dark sections |
| `text.primary` | `#18252C` | Main text |
| `text.inverse` | `#F8F5EF` | Text on dark surfaces |
| `text.muted` | `#6D777D` | Secondary text |
| `border.light` | `#D9D6CF` | Light borders |
| `surface.white` | `#FCFBF8` | Elevated surfaces |

## Colour Usage Rules

### Navy

Use navy for:

- Navigation
- Hero overlays
- Footer
- Large statement sections
- Premium section backgrounds
- Secondary buttons
- Text accents

Do not use navy for every section. Dark surfaces should feel intentional.

### Coral

Use coral for:

- Primary CTA
- Active states
- Small highlight lines
- Selected booking slots
- Important labels
- Hover accents
- Small decorative details

Do not use coral as a large full-page background unless specifically required. Coral should remain special.

### Warm Cream

Use warm cream as the default light background. This gives the interface warmth and avoids sterile white space.

### Contrast

All text and interactive elements must maintain accessible contrast. Decorative colour should never become the sole indicator of state.

---

# 4. Typography System

## Primary Display Font

Use **Instrument Serif** for:

- Hero headings
- Section titles
- Pull quotes
- Editorial statements
- Large numeric details

## Interface Font

Use **Manrope** for:

- Navigation
- Buttons
- Form fields
- Body copy
- Labels
- Booking UI
- Pricing
- Captions

## Optional Accent Script

Use only for small decorative moments such as:

- “Est. 2018”
- “Take your time.”
- Signature marks

Never use script fonts for body copy, navigation, buttons, forms, or instructions.

---

# 5. Typographic Hierarchy

## Display XL

```css
font-size: clamp(4rem, 10vw, 9rem);
line-height: 0.88;
letter-spacing: -0.04em;
```

Use for hero statements and major cinematic sections.

## Display L

```css
font-size: clamp(3rem, 7vw, 6rem);
line-height: 0.95;
letter-spacing: -0.03em;
```

## Heading 1

```css
font-size: clamp(2.6rem, 5vw, 4.5rem);
line-height: 1;
```

## Heading 2

```css
font-size: clamp(2rem, 4vw, 3.5rem);
line-height: 1.05;
```

## Heading 3

```css
font-size: clamp(1.5rem, 2vw, 2.25rem);
line-height: 1.15;
```

## Body Large

```css
font-size: 1.125rem;
line-height: 1.65;
```

## Body

```css
font-size: 1rem;
line-height: 1.65;
```

## Small / Label

```css
font-size: 0.75rem;
line-height: 1.4;
letter-spacing: 0.08em;
text-transform: uppercase;
```

## Typography Rules

Do:

- Keep major headings short
- Allow generous line breaks
- Use strong contrast in size
- Let type breathe
- Use uppercase labels sparingly
- Keep body line length readable

Avoid:

- Huge paragraphs
- Too many font weights
- Long all-caps headings
- Multiple competing display fonts
- Excessive letter spacing
- Decorative fonts in functional UI

---

# 6. Layout System

## Grid

Desktop:

```text
12-column grid
max-width: 1440px
```

Tablet:

```text
8-column grid
```

Mobile:

```text
4-column grid
```

## Container Width

```css
max-width: 1440px;
margin-inline: auto;
```

## Horizontal Page Padding

Desktop:

```css
clamp(48px, 5vw, 96px)
```

Tablet:

```text
32px
```

Mobile:

```text
20px
```

---

# 7. Spacing System

Use a consistent scale:

```text
4
8
12
16
24
32
48
64
80
96
128
160
```

Recommended tokens:

```text
space.1 = 4px
space.2 = 8px
space.3 = 12px
space.4 = 16px
space.5 = 24px
space.6 = 32px
space.7 = 48px
space.8 = 64px
space.9 = 80px
space.10 = 96px
space.11 = 128px
space.12 = 160px
```

## Section Spacing

Desktop:

```text
96–160px vertical
```

Mobile:

```text
64–96px vertical
```

Avoid arbitrary spacing values.

---

# 8. Visual Rhythm

Alternate between:

- Open light sections
- Rich dark sections
- Image-led editorial sections
- Functional booking sections

Avoid stacking too many dense sections together. Every major section should have one dominant idea. Do not make every section visually loud.

---

# 9. Shape Language

## Border Radius

```text
Small controls: 8px
Cards: 12px
Large media: 16px
Pills: 999px
```

Avoid overly rounded SaaS-style cards. The site should feel editorial, not bubbly.

## Borders

Use thin, quiet borders:

```css
1px solid rgba(...)
```

Avoid heavy outlines.

---

# 10. Buttons

## Primary Button

Default:

- Coral background
- Deep navy text
- Medium-large height
- Slight radius
- Clear arrow or directional icon

Hover:

- Dark navy sweep or fill
- Text becomes light
- Arrow moves slightly

## Secondary Button

Default:

- Transparent
- 1px border
- Navy or cream text depending on background

Hover:

- Background fills subtly

## Text Button

Use for editorial CTAs.

Example:

> View the full menu →

## Sizing

Desktop:

```text
Height: 48–56px
Horizontal padding: 24–32px
```

Mobile:

```text
Minimum height: 48px
```

All tap targets should be at least `44 × 44px`.

---

# 11. Iconography

Use clean line icons with:

- 1.5–2px stroke
- Rounded line caps
- Minimal detail

Use icons primarily for:

- Calendar
- Clock
- Location
- Phone
- Email
- Arrow
- Menu
- Booking actions

Do not use icons where text alone is clearer.

---

# 12. Image Direction

Images are a primary brand device.

## Photography Style

Use:

- Warm cinematic lighting
- Deep shadows
- Rich skin tones
- Navy, wood, leather, coral accents
- Editorial framing
- Human interaction
- Natural poses
- Premium interiors

Avoid:

- Generic smiling stock models
- White-background salon imagery
- Different photographic styles mixed together
- Overly bright commercial stock photography
- Poor crops
- Low-resolution imagery
- Overuse of barber tools as decorative filler

## Composition

Favor:

- Off-center subjects
- Negative space
- Reflections
- Foreground framing
- Hands/details
- Layered depth
- Portrait orientation for barbers
- Wide cinematic crops for hero areas

When text overlays images, ensure contrast with vignette, gradient, dark overlay, or controlled crop.

## Image Ratios

```text
Hero: 16:9 or wider
Barber portrait: 4:5
Editorial image: 3:4
Service detail: 4:3
Wide feature: 16:9
Mobile hero: 4:5 or 3:4
```

Use intentional crops for each viewport.

---

# 13. Navigation

## Desktop

```text
LOGO

Services
The Gentlemen
Our Story
Visit

Reserve a Chair
```

Behaviour:

- Transparent or semi-transparent over hero
- Solid cream or navy after scroll
- Slightly reduced height after scroll
- Smooth but quick transition

## Mobile

Use a full-screen or large overlay with:

- Large readable links
- Clear close button
- Strong Reserve a Chair CTA

Avoid tiny dropdown menus.

---

# 14. Footer

The footer should feel like a final editorial statement, not a dump of links.

Use deep navy.

Lead line:

> **See you in the chair.**

Include:

- Primary navigation
- Booking CTA
- Contact details
- Address
- Opening hours
- Social links
- Terms
- Privacy
- Copyright

---

# 15. Homepage Structure

Recommended sequence:

```text
Hero
↓
Brand philosophy
↓
Signature services
↓
Cinematic visual sequence
↓
Barbers
↓
Experience / process
↓
Social proof
↓
Visit / contact
↓
Booking CTA
↓
Footer
```

Avoid repeating the same card layout section after section.

---

# 16. Hero Principles

The hero should:

- Occupy most of the initial viewport
- Feature one dominant image
- Have one memorable headline
- Provide immediate booking CTA
- Reveal location/opening context
- Use motion sparingly

Avoid:

- Multiple competing CTAs
- Carousels
- Too much body copy
- Overly complex overlays
- Heavy auto-playing video

---

# 17. Service Design

Services should feel like a grooming menu, not ecommerce products.

Each service should show:

- Name
- Description
- Duration
- Price
- CTA

Recommended presentation:

- Editorial rows
- Large numbering
- Hover image preview
- Category grouping

Examples:

```text
CUT
BEARD
COMBINATIONS
RITUALS
```

---

# 18. Barber Profiles

Each barber should feel like a person, not an employee card.

Include:

- Large portrait
- Name
- Role
- Specialties
- Short bio
- Availability
- Book with barber CTA

Hover:

- Secondary portrait reveal
- Minimal image scale

Avoid excessive card lifting.

---

# 19. Booking UI Principles

Booking is the most important functional experience.

It should feel:

- Calm
- Clear
- Premium
- Fast
- Reassuring

Recommended flow:

```text
Service
Barber
Date
Time
Details
Review
Confirmation
```

Keep one major decision per step.

---

# 20. Booking Progress

Always show the user where they are.

Example:

```text
01 Service
02 Barber
03 Time
04 Details
```

Use:

- Step indicator
- Progress line
- Completion state

Avoid overwhelming users with every field at once.

---

# 21. Booking Service Selector

Each option should display:

- Service name
- Short description
- Duration
- Price
- Selection state

Selected state should use:

- Coral accent
- Stronger border
- Clear selection marker

Do not use colour alone.

---

# 22. Barber Selector

Each barber should show:

- Portrait
- Name
- Specialties
- Availability hint

Always include:

> Any available barber

---

# 23. Date Picker

Use a horizontally scrollable date strip on mobile.

Example:

```text
MON
28
```

Selected date:

- Coral accent
- High contrast
- Clear visual state

Disabled dates:

- Reduced emphasis
- Not clickable

---

# 24. Time Slot Design

Group time slots by:

- Morning
- Afternoon
- Evening where relevant

Buttons should be large and easy to scan. Selected state should be unmistakable. Unavailable slots should not appear interactive.

---

# 25. Form Design

Forms should feel elegant and minimal.

Use:

- Clear labels
- Large input height
- Comfortable padding
- Quiet borders
- Strong focus state

Never rely solely on placeholder text as labels.

## Validation

Validate on blur and submit without being aggressive while typing.

Error messages should be specific and short.

Good:

> Enter a valid email address.

Avoid:

> Invalid input.

---

# 26. Confirmation Screen

The confirmation page should feel celebratory but restrained.

Use:

- Large editorial heading
- Appointment summary
- Booking reference
- Calendar actions
- Directions
- Manage booking action

Recommended headline:

> **You’re in.**

Avoid confetti-style visuals.

---

# 27. Cards

Cards should be used only where containment improves clarity.

Use:

- Light borders
- Soft elevation
- Subtle surface difference

Avoid:

- Excessive shadows
- Floating dashboard-style cards everywhere
- Deep gradients
- Strong outlines

---

# 28. Shadows

Shadows should be nearly invisible.

Example:

```css
box-shadow: 0 8px 30px rgba(20, 30, 36, 0.08);
```

Use primarily for modals, dropdowns, and elevated booking surfaces.

---

# 29. Modal Design

Modals must feel purposeful.

Use for:

- First-visit offer
- Important confirmation
- Booking action
- Limited contextual content

Modal requirements:

- Dismissible
- Focus trapped
- Escape key supported
- Keyboard accessible
- Clear close control

Avoid showing a modal immediately on page load.

---

# 30. Motion Philosophy

Every animation should do at least one of these:

1. Reinforce hierarchy
2. Guide attention
3. Create depth
4. Clarify state
5. Improve continuity

If an animation does none of these, remove it.

---

# 31. Motion Stack

Recommended:

- **GSAP**
- **ScrollTrigger**
- **Lenis**
- **Framer Motion**

## GSAP + ScrollTrigger

Use for:

- Scroll sequences
- Parallax
- Image masks
- Pinned scenes
- Large typography movement

## Lenis

Use for subtle smooth scrolling.

## Framer Motion

Use for:

- Menus
- Modals
- Booking transitions
- Page transitions
- Small UI interactions

---

# 32. Motion Timing

## Micro

```text
180–250ms
```

For buttons, hover, and small controls.

## Standard

```text
350–500ms
```

For menus, cards, and booking steps.

## Editorial

```text
700–1000ms
```

For hero reveals, image masks, and large text.

Avoid long waits before content becomes usable.

---

# 33. Easing

Preferred:

```text
cubic-bezier(0.22, 1, 0.36, 1)
```

Avoid:

- Bounce
- Elastic
- Cartoon easing
- Aggressive spring behaviour

---

# 34. Reveal Patterns

## Text

Use:

- Mask/clip reveal
- Small vertical translation
- Controlled stagger

## Images

Use:

- Clip-path reveal
- Scale from `1.05–1.08` to `1`
- Optional light parallax

## Cards

Use:

- Opacity
- Small translate
- Short stagger

Avoid animating everything from below by default.

---

# 35. Parallax Rules

Use parallax as depth, not decoration.

Recommended:

```text
Background: 0.15x
Content: 1x
Foreground: 1.1–1.2x
```

Use no more than 2–3 active depth layers in one section. Text must remain readable.

---

# 36. Signature Scroll Sequence

Use one standout cinematic sequence.

Recommended copy direction:

> More than a haircut.

> Time to switch off.

> Time to reset.

> Walk out sharper.

Use:

- Pinned section
- Changing photography
- Controlled typography
- Mask reveals
- Crossfade transitions

This should be the visual peak of the page. Do not repeat the same treatment everywhere.

---

# 37. Hover Principles

Hover effects should be subtle.

### Buttons

- Fill transition
- Arrow moves 3–5px
- Slight colour shift

### Services

- Image changes
- Number moves subtly
- Underline expands

### Barbers

- Secondary portrait reveal
- Minimal image scale

### Navigation

- Thin underline or colour transition

Avoid:

- Large scale jumps
- Rotation
- Excessive lifting
- Glow effects

---

# 38. Responsive Strategy

Design responsively by intention, not merely by wrapping content.

Suggested breakpoints:

```text
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Use fluid typography and spacing wherever possible.

---

# 39. Mobile Principles

Mobile should feel first-class.

Prioritize:

- Large touch targets
- Simplified motion
- Strong hierarchy
- Sticky booking CTA
- Easy date/time selection
- Short content blocks
- Optimized imagery

Avoid:

- Excessive pinned scroll sections
- Desktop typography scaled down poorly
- Tiny multi-column layouts
- Hover-dependent interactions

---

# 40. Tablet Principles

Do not treat tablet as enlarged mobile.

Ensure:

- Grid remains intentional
- Navigation remains usable
- Booking controls do not stretch awkwardly
- Images remain properly cropped
- Two-column sections remain balanced

---

# 41. Sticky Mobile CTA

Use:

> RESERVE A CHAIR →

Rules:

- Hide during the booking flow
- Hide near footer where appropriate
- Do not obstruct inputs
- Respect safe areas
- Maintain strong contrast

---

# 42. Accessibility

Accessibility is part of the design, not a final checklist.

Required:

- Semantic HTML
- Keyboard support
- Visible focus states
- Proper labels
- Alt text
- Colour contrast
- Reduced motion
- Logical heading hierarchy
- Accessible modal behaviour
- Accessible form errors

## Focus State

Recommended:

```css
outline: 2px solid #F79B72;
outline-offset: 3px;
```

Never remove focus outlines without replacement.

---

# 43. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Reduce or disable:

- Smooth scrolling
- Parallax
- Pinned scroll effects
- Large scale transforms
- Long reveal animations

Content must remain fully visible and functional.

---

# 44. Performance Principles

Visual richness must not damage performance.

Rules:

- Optimize all imagery
- Prefer AVIF/WebP
- Lazy load non-critical images
- Preload hero only
- Avoid huge autoplay video
- Use transform/opacity for animation
- Clean up GSAP timelines
- Avoid constant blur filters
- Avoid unnecessary client components

---

# 45. Loading States

Use elegant loading states.

Examples:

> Finding available chairs…

> Reserving your appointment…

Prefer skeleton UI or subtle progress over spinning loaders everywhere.

---

# 46. Empty States

Empty states should be intentional.

Example:

> No appointments are available that afternoon.

Then offer:

- Next available time
- Another barber
- Another date

Never leave blank areas.

---

# 47. Error States

Errors should explain what happened and offer a recovery action.

Example:

> That appointment was just taken.

Then:

> Here are the closest available times.

Avoid technical language.

---

# 48. Success States

Keep success messaging concise.

Examples:

- Booking confirmed.
- Appointment cancelled.
- Your new time is saved.

Avoid unnecessary celebration animations.

---

# 49. Content Tone

Copy should feel:

- Polished
- Human
- Calm
- Confident
- Slightly witty

Good examples:

> Your chair is ready.

> Everything looking sharp?

> Take your time.

> See you in the chair.

Avoid loud, urgent marketing language.

---

# 50. Microcopy

Use microcopy to reduce uncertainty.

Examples:

Under phone field:

> We’ll only use your number for this appointment.

Unavailable barber:

> Tawanda is fully booked that afternoon.

Alternative:

> Kuda is available at 14:30.

---

# 51. Legal Pages

Terms and Privacy must use the same design system.

Use:

- Clear headings
- Comfortable line length
- Strong typography
- Table of contents where helpful
- Same header/footer

Do not create unfinished-looking legal pages.

---

# 52. Social Proof

Use sparingly.

Possible elements:

- Review score
- Appointment count
- Client quote
- Featured testimonial

Presentation should remain premium and restrained.

---

# 53. Maps & Contact

The Visit page should prioritize practical information.

Include:

- Address
- Opening hours
- Phone
- Email
- Map
- Directions
- Booking CTA

Use dynamic open/closed state if implemented.

---

# 54. Design Consistency Rules

Standardize:

- Radius
- Button heights
- Input heights
- Headings
- Section spacing
- Container width
- Card padding
- Icon size
- Hover behaviour
- Focus states
- Motion easing

Do not hand-style every page independently.

---

# 55. Frontend Token Strategy

Define tokens centrally.

Suggested categories:

```text
colors
typography
spacing
radius
shadow
motion
breakpoints
zIndex
```

Example:

```ts
export const tokens = {
  colors: {
    navy: '#2A4759',
    coral: '#F79B72',
    softGray: '#EEEEEE',
    warm: '#F7F3EC',
    deep: '#16232B',
    text: '#18252C',
    inverse: '#F8F5EF',
  },
}
```

Use semantic tokens wherever possible.

---

# 56. Component Principles

Components should be:

- Reusable
- Predictable
- Accessible
- Responsive
- Token-driven

Avoid page-specific hardcoded styles where possible.

Each major component should support:

- Default state
- Hover state
- Focus state
- Disabled state
- Loading state where appropriate

---

# 57. Component Naming

Prefer semantic names.

Good:

```text
BookingStepper
ServiceSelector
BarberProfile
EditorialSection
RevealImage
PrimaryButton
```

Avoid:

```text
BlueBox
BigCard
ThingContainer
```

---

# 58. Motion Component Strategy

Create reusable motion primitives:

```text
RevealText
RevealImage
ParallaxImage
StaggerGroup
FadeIn
SlideReveal
MotionSection
```

Keep timing and easing centralized. Do not invent unique animation rules inside every component.

---

# 59. Z-Index Scale

Define a controlled scale:

```text
base: 0
raised: 10
sticky: 20
header: 30
dropdown: 40
modalBackdrop: 50
modal: 60
toast: 70
```

Avoid random `z-index: 9999` values.

---

# 60. Scroll Behaviour

Smooth scrolling should feel subtle.

Do not hijack scrolling.

Avoid:

- Forced snapping everywhere
- Excessive inertia
- Slow scroll lag
- Horizontal scrolling for primary navigation

Users should always feel in control.

---

# 61. Cursor Effects

Do not use custom cursors unless they add real value.

If used:

- Desktop only
- Subtle
- Disabled on touch
- Never replace pointer semantics

Prefer standard cursor behaviour.

---

# 62. Page Transitions

Use light transitions:

- Fade
- Small translate
- Shared visual continuity

Recommended duration:

```text
250–400ms
```

Avoid long cinematic transitions that delay navigation.

---

# 63. SEO-Aware Design

Frontend should support:

- Logical headings
- Real text instead of text embedded in images
- Descriptive alt text
- Clean content structure
- Shareable page titles
- OpenGraph imagery

Visual design should not block discoverability.

---

# 64. Browser & Brand Polish

Include:

- Favicon
- Apple touch icon
- Theme colour
- OpenGraph preview
- Correct viewport settings

The live site should feel fully branded outside the page itself.

---

# 65. Do / Don’t Summary

## Do

- Use editorial typography
- Use warm negative space
- Use navy with restraint
- Use coral for meaningful emphasis
- Create one strong cinematic scroll moment
- Make booking the functional centerpiece
- Keep mobile excellent
- Animate with purpose
- Use consistent photography
- Use generous spacing
- Maintain accessible contrast
- Keep the brand welcoming

## Don’t

- Turn everything dark
- Use gold everywhere
- Overanimate
- Use random stock imagery
- Build endless card grids
- Use generic SaaS design language
- Make every section parallax
- Use tiny text
- Hide important information behind hover
- Depend on colour alone for state
- Sacrifice speed for visual effects
- Use visual gimmicks that interfere with booking

---

# 66. Frontend Definition of Done

Before any frontend feature is considered complete, verify:

## Visual

- Alignment is clean
- Spacing matches tokens
- Typography hierarchy is correct
- Image crop is intentional
- Colours use semantic roles
- Contrast is accessible

## Interaction

- Hover works
- Focus works
- Disabled state works
- Loading state works
- Mobile interaction works

## Responsive

- Desktop works
- Tablet works
- Mobile works
- No overflow
- No broken images
- No clipped content

## Motion

- Motion has purpose
- Timing is consistent
- Reduced motion works
- Scroll remains smooth
- No animation blocks interaction

## Functional

- CTA works
- Links work
- Forms validate
- Booking states are clear
- Errors recover gracefully

---

# 67. Final Design Principle

Every screen should answer one question:

> **Does this feel intentionally designed for this grooming brand, or could it belong to any website?**

If it could belong to any website, redesign it.

The frontend should feel unmistakably like a refined gentleman’s grooming experience — **premium, cinematic, confident, and welcoming** — while remaining fast, clear, accessible, and effortless to use.
