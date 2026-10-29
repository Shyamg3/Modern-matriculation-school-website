# Modern Matric Higher Secondary School — Demo Website

A single-page, bilingual (English / தமிழ்) presentation site for **Modern Matric Higher Secondary School, Semmandalam, Cuddalore**. Built with Vite + React and plain CSS, using the "Heritage Plum" design system (see `DESIGN-SYSTEM.md`).

This replaces the earlier Expo / React Native Web prototype. The old entry points (`App.js`, `app.json`, `preview.html`, root `assets/*.png`) are left untouched for reference and are not used by this build.

## Run it

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # static output in dist/
npm run preview   # serve the production build locally
```

Requires Node 18+ (developed on Node 24).

## What's on the page

Utility bar → sticky header → hero → welcome / about → academics (Pre-primary to Higher secondary) → why Modern → campus gallery → achievements → admissions (3 steps + school office card) → visit / map → footer. Mobile adds a full-screen menu drawer and a sticky Call / WhatsApp / Apply bar.

- **Language:** the EN / தமிழ் toggle switches the whole page. Choice is saved in `localStorage` under `modern-matric-lang`. Link a preview directly with `?lang=ta` or `?lang=en`.
- **Admissions:** no backend or form submission. Every call to action goes to the school phone (`+91 98430 12464`) or WhatsApp (`wa.me/919843012464`).
- **Map:** keyless Google Maps embed, lazily loaded, with an "Open the location in Google Maps" fallback link.

## Editing content

| File | Purpose |
| --- | --- |
| `src/copy.js` | All English and Tamil strings, plus contact constants (phone, WhatsApp, address, map links) |
| `src/photos.js` | Image imports and the gallery order/captions |
| `src/App.jsx` | Page structure and the language behaviour |
| `src/styles.css` | Design tokens, layout, typography, breakpoints, motion |
| `src/icons.jsx` | Inline SVG icon set |
| `src/assets/*.webp` | Optimised school photos (converted from the originals) |

Change text in `copy.js` only — both languages are keyed together, so a missing key shows up immediately. Phone/WhatsApp/map URLs live in the `CONTACT` object at the top of the same file.

## Content rules

Only verified school facts are presented: the 1969 founding year, LKG–Class XII, Government recognition **04-M-0065-0516**, Junior Red Cross, the Cuddalore address, and the supplied photographs.

No timings, fees, streams, exam results, or student/teacher counts are stated anywhere. Office hours are explicitly deferred to the school ("Office hours are confirmed by the school. Please call ahead."). If the school supplies more facts, add them to `copy.js` in both languages.

**Tamil copy is a first draft and needs review by a native speaker before the demo.**

## Responsive behaviour

Breakpoints at **1150px**, **1023px**, **767px**, and **399px**.

- Desktop: two-column hero, five-stage academics grid, 5-column photo mosaic, sticky office card.
- Tablet (≤1023): single-column hero, stacked admissions with a static office card, 3-column gallery; the drawer replaces the nav.
- Mobile (≤767): full-width buttons, 2-column gallery, sticky action bar, full-screen menu.
- Small phones (≤399): reduced type scale.

Tamil strings use Noto Sans Tamil with taller line-heights so the script doesn't crowd the layout.

## Accessibility

Skip link, `lang` attribute synced to the selected language, keyboard-focusable menu drawer with Escape-to-close and focus restoration, `aria-expanded` / `aria-modal` / `aria-pressed` states, visible focus rings, 44px+ tap targets, and `prefers-reduced-motion` support (reveal animations are disabled). Scroll-reveal only runs when JavaScript is available.

## Images

The six photographs come from the school's own supplied `assets/` folder. They were resized and converted to WebP in `src/assets/` (~155 KB hero, 100–200 KB gallery). The originals are untouched. If you swap a photo, export a WebP around 1360px wide for gallery use and update the import in `src/photos.js`.

## Deployment

`npm run build` produces a fully static `dist/` (≈1.1 MB total, mostly photos). Upload it to any static host — Netlify, Vercel, GitHub Pages, or the school's existing hosting. No environment variables, API keys, or server are required. When deploying under a subpath, set `base` in `vite.config.js`.
