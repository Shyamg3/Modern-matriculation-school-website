# Modern Matric — Design System (Proposal v1)

Modern Matric Higher Secondary School · Rajeev Gandhi Nagar, Semmandalam, Cuddalore 607001
Status: **direction, stack, language and scope approved 2026-10-29** · awaiting final go-ahead to build
Decisions: Heritage Plum · Vite + React · English + Tamil · one-page demo

---

## 1. Design direction

**Working concept: “Heritage, made welcoming.”**

The design is built from the school's own identity, not a generic template:

| Source | What we take |
| --- | --- |
| Gate signboard | Deep plum/maroon field, marigold lettering, school crest |
| Campus facade | Curved yellow balconies, green pillars, teal walls |
| Uniforms | Grey check + charcoal — used only in photography, never as UI colour |
| Heritage | Founded 1969 · Golden Jubilee 1969–2019 · Govt. Recognition No. 04-M-0065-0516 |
| School life | Junior Red Cross, Annual Sports Day, handwriting & award ceremonies |
| Motifs | The arch (balconies, crest) and a restrained bunting line (festival flags) |

The result should feel like a real, established Cuddalore school: warm, proud, orderly, and easy for parents — not a boutique café or a design-studio portfolio.

### Why the current UI does not fit
- **Wrong identity.** Cream + charcoal + orange, 8–10px letterspaced labels and editorial headlines read as a lifestyle brand. Nothing connects to the plum/yellow gate parents see every day.
- **Too small to read.** Body copy is 12–14px; labels are 8.5px; nav is 11px. On a phone in daylight this fails.
- **Navigation disappears.** Below 1024px the nav links are removed with no hamburger; users can only tap “Admissions”.
- **No tablet design.** One breakpoint at 1024px means 768–1023px gets a stretched phone layout.
- **Credibility leaks.** A fabricated animated “500+” count, a visible “Replace this photo…” instruction, and a second, unrelated design in `preview.html`.
- **No parent tasks.** No class range, timings, admission steps, documents, facilities, transport, results, or events.

---

## 2. Colour

**Direction A — Heritage Plum (approved).** Sampled from the gate, crest, and campus.

| Token | Hex | Use |
| --- | --- | --- |
| `--plum-900` | `#3B1F52` | Brand, headings, dark bands, footer |
| `--plum-700` | `#5A3475` | Hover, secondary emphasis |
| `--plum-100` | `#F3EDF7` | Tinted panels |
| `--marigold-500` | `#F0B23C` | Primary CTA, highlights, focus ring |
| `--marigold-100` | `#FDF2DA` | Soft callouts |
| `--leaf-700` | `#17694F` | Success, admissions accents, seals |
| `--leaf-100` | `#E8F3ED` | Quiet panels |
| `--ink-900` | `#221A2B` | Primary text |
| `--ink-600` | `#5B5566` | Secondary text |
| `--paper` | `#FBF7F0` | Page background |
| `--card` | `#FFFFFF` | Cards, header |
| `--line` | `#E8E0D2` | Borders, dividers |

Rules:
- Ratio ≈ 60% paper/white · 25% plum · 10% marigold · 5% leaf.
- Marigold is a **button/decoration** colour, never small text on white.
- Text on plum is `--paper`; body on plum is `#E7DCF0`.
- Contrast targets: plum/paper ≥ 10:1 · ink/marigold ≥ 8:1 · leaf/white ≥ 6:1 · ink-600/paper ≥ 6:1.
- Photography sits on `--paper`; no coloured photo overlays except a 25% plum scrim behind white captions.

Alternatives considered: **B — Campus Green** (deep green + turmeric + sky blue) and **C — Modern Classic** (navy + gold). Both rejected in favour of A, the only direction a parent would recognise from the street.

---

## 3. Typography

| Role | Family | Weight | Notes |
| --- | --- | --- | --- |
| Display / headings | **Source Serif 4** | 600 | Warm, institutional, excellent on screen |
| Body / UI | **Manrope** | 400 / 500 / 700 | Open, highly legible at 16px |
| Tamil (if enabled) | **Noto Sans Tamil** | 400 / 600 | Matches Manrope's x-height |

Scale (mobile → desktop):

| Style | Mobile | Desktop | Line height |
| --- | --- | --- | --- |
| Display | 40px | 64px | 1.05 |
| H1 | 38px | 52px | 1.1 |
| H2 | 30px | 40px | 1.15 |
| H3 | 24px | 28px | 1.2 |
| H4 | 18px | 20px | 1.3 |
| Lead | 18px | 20px | 1.55 |
| Body | **16px** | 17px | 1.6 |
| Small | 14px | 15px | 1.55 |
| Caption | 13px | 13px | 1.45 |
| Eyebrow | 11.5px | 12px | 1.35 · uppercase · 0.1em |

Rules: no text below 13px; no uppercase label below 11px; headlines use `-0.02em` tracking; body max 65ch; **no emoji as icons**.

---

## 4. Layout, spacing, breakpoints

- Spacing scale: `4 8 12 16 20 24 32 40 48 64 80 96 120`.
- Container: max **1200px**, gutters **20 / 32 / 48px**.
- Section rhythm: **56px** mobile · **80px** tablet · **104px** desktop.
- Grid: 4 columns mobile · 8 tablet · 12 desktop; gap 16 / 24 / 32.
- Radii: inputs 8 · cards 16 · media 20 · arch/hero 24–160 · pills 999.
- Elevation: borders first; one shadow only `0 12px 32px rgba(59,31,82,.08)`.

| Breakpoint | Range | Behaviour |
| --- | --- | --- |
| Mobile | 360–639 | 1 column, drawer nav, sticky bottom actions |
| Tablet | 640–1023 | 2 columns, drawer or condensed nav, 2-up cards |
| Desktop | 1024–1439 | Full nav, 2–3 column sections, 12-col grid |
| Wide | 1440+ | Container 1200 centred, larger media |

Header switches at **1024px**; cards switch 1 → 2 at **640px** and 2 → 3 at **1024px**. Gallery 1 → 2 → 3.

---

## 5. Components

- **Utility bar** (40px, plum): phone, school hours, “Admissions open” link. Collapses to phone + admissions on mobile.
- **Header** (72px desktop / 64px mobile, sticky): crest + wordmark, 6 links, marigold “Apply” button, accessible drawer below 1024px.
- **Hero**: 5/7 split desktop, stacked mobile. Eyebrow, H1, lead, primary + text CTA, one strong photo with arch top and a “Since 1969” seal. **No autoplay carousel.**
- **Trust strip**: Since 1969 · Govt. recognised · LKG–XII · Cuddalore (only verified facts).
- **Section header**: eyebrow + serif H2 + optional lead.
- **Card**: 4:3 photo (`object-fit: cover`), eyebrow, title, arrow; 2px lift on hover.
- **Programme card**: class range, short description, “Enquire” link.
- **Steps**: 01–03 with a connecting rule for the admission process.
- **Notice/event row**: date block + title + tag.
- **CTA band**: plum, restrained bunting line, marigold button.
- **Contact + map**: address, phone, WhatsApp, timings, directions.
- **Sticky mobile action bar** (56px + safe area): Call · WhatsApp · Apply.
- **Footer**: crest, Tamil school name, nav, recognition number, credits.

Buttons: 48px min height, 16px Manrope 700, radius 8; primary marigold/ink, secondary plum outline, ghost plum text. Touch targets ≥ 44px; carousel dots (if any) ≥ 24px hit area.

Icons: 1.5px-stroke SVG set (phone, pin, clock, WhatsApp, arrow, menu); 20/24px. No glyph/emoji icons.

Motion: 180–450ms; reveal is a 12px fade-up, once; hover 2px lift; honour `prefers-reduced-motion`. No auto-moving content.

---

## 6. Content and information architecture

Parent-first order:

1. Hero + trust strip
2. Welcome / about
3. Academics (LKG–XII, streams — **data needed**)
4. Why Modern (3 pillars)
5. Campus life gallery
6. Achievements (JRC, Sports Day, awards — already evidenced by photos)
7. Admissions (3 steps + documents + WhatsApp enquiry)
8. Visit (address, phone, map, timings — **timings needed**)
9. Footer

Voice: plain, concrete, local. Replace “A brighter future starts with a strong foundation” with a heritage line such as **“More than 50 years of learning, growing and shining in Cuddalore.”** Keep “Learn · Grow · Shine” as the eyebrow.

Remove: the animated student counter, visible placeholder instructions, duplicated quick-link/nav sets, and every unverified number. Add later only with school-supplied data: student/teacher counts, fees, results, timings, transport routes, stream list.

Photography: consistent 4:3 or 3:2 crops; `cover` (no letterboxing); warm neutral grade; alt text on every image. The gate photo is a scan with glare — use it small as heritage, and request fresh photos of the gate, classrooms, labs, library, sports, and events.

---

## 7. Accessibility and performance

- WCAG 2.2 AA: contrast, 16px body, visible marigold focus ring, keyboard-operable drawer, semantic landmarks and heading order.
- Real `<a>` links on web; labelled buttons; `aria-current` for the active section.
- Images: WebP/AVIF, responsive `srcset`, lazy-load below the fold; fixed aspect ratios to prevent layout shift.
- Fonts: self-host or preconnect + `display=swap`; only 3 families/5 weights.
- SEO: title, description, OG image, favicon, `School`/`LocalBusiness` JSON-LD, `lang="en"` (Tamil alternate if enabled).
- Map iframe: lazy, titled, with a visible address fallback.

---

## 8. Decisions (resolved 2026-10-29)

1. **Direction** — A Heritage Plum.
2. **Stack** — rebuild as Vite + React + CSS; the Expo `App.js` is replaced.
3. **Language** — English + Tamil toggle on all copy.
4. **Scope** — one-page demo with anchor navigation.
5. **Content** — only verified school facts. Items the school has not supplied (timings, streams, facilities, fees, results) are omitted or marked “Details on enquiry”, never invented.

### Tamil implementation
- Every visible string lives in one `copy.js` dictionary: `{ en: {...}, ta: {...} }`.
- Toggle in the utility bar (`EN | தமிழ்`), persisted in `localStorage`; updates `<html lang>`.
- Tamil uses Noto Sans Tamil with a slightly taller line height (1.7); layout must be tested at both languages.
- Tamil school name from the gate: **மாடர்ன் மெட்ரிக் மேல்நிலைப் பள்ளி**.
- Draft translations are provided for review; a native speaker at the school should sign off before the demo is shown.

---

## 9. Build plan (after go-ahead)

1. Scaffold Vite + React, design tokens (`tokens.css`), fonts, container/grid, language dictionary.
2. Header + drawer + utility bar + language toggle; hero + trust strip.
3. About, academics, why-Modern, campus life gallery.
4. Achievements, admissions steps, visit/map, footer, sticky mobile action bar.
5. Responsive pass at **390 / 768 / 1024 / 1440**, both languages; keyboard, contrast, reduced motion.
6. Production build + local preview; screenshot review before handover.

No backend, no form submission: admissions CTA uses WhatsApp, phone, and a prefilled `mailto:` only if the school supplies an email. Map remains a lazy Google Maps embed with a visible address fallback.