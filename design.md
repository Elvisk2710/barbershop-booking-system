# DESIGN.md
# Gentleman’s Grooming Bar — Frontend Design System

This is the reference for how the frontend looks, reads and moves. The code is the
source of truth for exact values: tokens live in `apps/frontend/src/app/globals.css`
and `apps/frontend/tailwind.config.ts`.

---

## 1. Direction

**One idea:** the shop runs on time, so the site should feel unhurried and certain.

The reference point is a product page from a company that is confident in its product:
big plain statements, generous space, photography doing the heavy lifting, and motion
that follows the reader’s hand rather than performing at them.

The page should make someone feel:

- There is room to breathe here.
- These people are careful.
- Booking will take a minute and nothing will go wrong.

What we avoid:

- Decoration standing in for content (eyebrow labels over every heading, numbered
  markers on things that aren’t sequences, icon-in-a-box logos, ornamental rules).
- Vocabulary that sells instead of says (“surgical”, “bespoke”, “privilege”,
  “curated”). Say what happens: “hot towel”, “your barber”, “book”.
- All-caps labels, monospace “data” labels, middle-dot strings, arrows appended to
  every link.
- Motion on things nobody touched.

---

## 2. Colour

| Token         | Hex       | Use |
|---------------|-----------|-----|
| `paper`       | `#ffffff` | Default page surface |
| `mist`        | `#f5f5f7` | Alternate sections, tiles, footer |
| `ink`         | `#1d1d1f` | Type, primary buttons, selected states |
| `ink-2`       | `#6e6e73` | Secondary type |
| `ink-3`       | `#86868b` | Tertiary type, placeholders |
| `hairline`    | `#d2d2d7` | Dividers, field and tile outlines |
| `night`       | `#000000` | The one dark section (barbers) |
| `night-2`     | `#161617` | Dark tiles on light pages |
| `ember`       | `#f79b72` | Accent on dark surfaces only: offer, “Meet …” links |
| `ember-ink`   | `#b4532a` | Focus ring (ember with enough contrast on white) |

Rules:

- The site is mostly white and mist. Black is used once per page at most, as a
  deliberate change of room.
- Ember never fills a large area and never carries body text on white.
- State is never shown by colour alone: selected tiles get a 2px ink ring, selected
  pills invert, unavailable times are struck through.

---

## 3. Type

Two optical cuts of one design, mirroring a display/text system:

- **Inter Tight** (`--font-display`) — every size from 19px up. Weight 600.
- **Inter** (`--font-text`) — body, captions, UI. Weight 400/500.

Tracking tightens as size grows; line-height shrinks.

| Class        | Size (clamp)          | Line | Tracking | Use |
|--------------|-----------------------|------|----------|-----|
| `.t-hero`    | 48 → 120px            | 0.95 | -0.045em | One per page, the page’s claim |
| `.t-display` | 40 → 80px             | 1.02 | -0.038em | Page and section titles |
| `.t-title`   | 32 → 56px             | 1.06 | -0.032em | Statements, card titles in dark tiles |
| `.t-headline`| 24 → 32px             | 1.12 | -0.024em | Sub-sections, step titles |
| `.t-subhead` | 19 → 24px             | 1.25 | -0.018em | Names, prices, list headings |
| `.t-lede`    | 19 → 21px             | 1.42 | -0.016em | Intro paragraphs |
| body         | 17px                  | 1.47 | -0.011em | Default |
| `.t-caption` | 14px                  | 1.43 |          | Secondary copy |
| `.t-fine`    | 12px                  | 1.34 |          | Nav, footer, meta |

Rules:

- Headlines are short, sentence case, and end with a full stop when they are a
  statement (“The menu.”). Questions end with a question mark.
- No accenting a single word with italics or colour.
- Numbers that line up (prices, times, durations) use `.tabular`.
- Keep measure under ~40ch for ledes and ~52ch for descriptions.

---

## 4. Layout and space

- `.shell` — 1080px max, 22px gutter on phones, 40px from 768px.
- `.shell-wide` — 1280px, for full-bleed-ish imagery and the nav.
- `.section` — vertical rhythm of 88 → 160px. Sections change surface
  (paper / mist / night) rather than being separated by rules.
- Content is left-aligned. Centre alignment is reserved for the hero, the closing
  call to action and single-purpose pages (confirmation, manage booking).
- Horizontal galleries use `.gallery-inset` so the first card lines up with the
  shell’s content edge while the row bleeds off the right side.

---

## 5. Shape

| Element                    | Radius |
|----------------------------|--------|
| Large tiles, photographs   | 28px   |
| Inline photographs         | 22px   |
| Choice tiles, day chips    | 18px   |
| Inputs, alerts             | 12–14px|
| Buttons, time slots        | pill   |

Hierarchy comes from size and surface, not shadows. The only shadows are on floating
things (offer card, mobile action bar).

---

## 6. Components

**Buttons** (`.btn` + variant): `btn-ink` (primary on light), `btn-light` (primary on
dark), `btn-ember` (offer only), `btn-ghost` (secondary, 1px ring), `btn-ghost-dark`.
Sizes: `btn-sm` (32px), default (44px), `btn-lg` (56px). Every button springs down to
0.97 on press.

**Links**: `.link-more` with a trailing chevron icon — used for “See the menu ›” style
navigation, never on buttons.

**Tiles**: `.tile` (mist) and `.tile-dark`. Bento grids mix tile sizes by importance;
never a row of identical cards.

**Fields**: `.field` > `.field-input` + `.field-label`. Floating labels, 56px tall,
ink border on focus. Placeholder must be a single space so the label can float.

**Choices**: `.choice` with `role="radio"` and `aria-checked`. Selected = 2px ink ring.

---

## 7. Motion

Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for movement, a slight overshoot
(`0.34, 1.36, 0.64, 1`) for things that respond to a press.

Unprompted motion happens in exactly one place: the home hero. The headline resolves
out of a blur word by word, the photograph rises underneath, and as the reader scrolls
the framed photograph opens to full width.

Everything else is driven by the reader:

- **Scroll-lit statement** — the founding sentence lights word by word as it scrolls.
- **Ritual** — the photograph stays pinned while the three steps pass; it crossfades
  and a three-segment progress bar fills as each step takes focus.
- **Booking** — steps slide in the direction of travel; the summary rows and total
  roll to their new values; the progress bar fills.
- **Confirmation** — a check mark draws itself once.
- Hover: photographs crossfade to a second shot or scale by 3–4%. Nothing else moves
  on hover.

`prefers-reduced-motion` disables every transform above; content is always fully
visible without motion.

---

## 8. Booking flow

- Four steps: Service, Barber, Time, Details. The progress bar is also navigation back
  to completed steps.
- One primary action per step, always bottom-right on desktop and in a frosted bar on
  phones, labelled for what it does (“Continue”, then “Book for $14”).
- A live summary sits beside the steps on wide screens so nothing is forgotten
  between steps.
- Errors say what happened and what to do next, in the interface’s voice.

---

## 9. Copy

- Write what happens, from the guest’s side: “Book a chair”, “Change time”,
  “Cancel booking”, “You’re booked.”
- One name per action across the whole flow (Book → Booking… → You’re booked).
- Short sentences. Contractions are fine. No exclamation marks.

---

## 10. Accessibility floor

- Visible focus on every interactive element (`ember-ink` ring, fields use their own
  ink focus state).
- 44px minimum touch targets for primary actions.
- Real `role`/`aria` for radio-like tiles, `aria-current` for nav and steps,
  `role="alert"` for booking errors.
- Text on photographs always sits on a gradient scrim.
- Works from 320px wide with no horizontal page scroll.
