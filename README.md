# Keba Schneiderei

Website for **Keba Schneiderei** — Ahmad Keba's bespoke tailoring atelier in Marl, Germany.
Bilingual one-pager (German + Arabic RTL), scrollytelling with GSAP + Lenis.

> Berststraße 25, 45770 Marl · +49 2365 5125212 · [kebaschneiderei.com](https://kebaschneiderei.com)

## Stack

- **Next.js 16** (App Router) + **React 19**
- **GSAP 3** + ScrollTrigger + @gsap/react (letter-splits, pin choreography, scroll-driven media)
- **Lenis** smooth scroll
- **Tailwind CSS v4** (design tokens in CSS)
- **TypeScript** strict mode
- Bilingual: **German** (default) + **Arabic** (RTL mirror at `/ar`)

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm start
```

## Structure

```
src/
  app/
    page.tsx              # DE home (one-pager)
    ar/page.tsx           # Arabic home
    layout.tsx            # fonts, metadata, JSON-LD, LocalizedShell
    globals.css           # design tokens + primitives
    icon.png              # favicon
    apple-icon.png        # iOS home-screen icon
  components/
    PageIntro.tsx         # logo curtain intro (session-persistent)
    SmoothScroll.tsx      # Lenis + GSAP ticker
    Cursor.tsx            # mix-blend-difference cursor
    ScrollProgress.tsx    # top progress hairline
    Navbar.tsx            # anchor nav + lang toggle + mobile menu
    Hero.tsx              # letter-split title, video bg, hero marquee
    Philosophy.tsx        # pinned quote, giant bg word, stage reveal
    CraftSequence.tsx     # pinned image stack, 5 steps, giant numbers
    FabricMarquee.tsx     # dual counter-rotating marquees
    ServicesRail.tsx      # 4 services, hover preview desktop / accordion mobile
    WorkGallery.tsx       # asymmetric masonry w/ clip-path reveal
    AtelierPortrait.tsx   # Ahmad Keba story, video slot, CountUp stats
    Reviews.tsx           # 1 featured + 6 cards, cursor-follow
    ContactSection.tsx    # dark form section
    Footer.tsx            # full hours + links
    MobileActionBar.tsx   # bottom sticky call/WhatsApp on mobile
  lib/
    business.ts           # contact + split-shift opening hours
    services.ts           # 4 services × DE/AR
    dictionary.ts         # all UI strings × DE/AR
    gallery.ts            # image catalog
    reviews.ts            # real Google reviews × DE/AR
public/
  logo.png                # amber K logo
  videos/                 # AI b-roll (hero.mp4, atelier.mp4) — see README in folder
  robots.txt
```

## Design tokens

Colors — `src/app/globals.css`:

| Token | Value |
|---|---|
| `--color-ink` | `#0A0908` |
| `--color-paper` | `#F5EFE4` |
| `--color-cognac` | `#7A4E2D` |
| `--color-mushroom` | `#A99B87` |
| `--color-rule` | `#C7BDA9` |

Type — `Fraunces` variable (SOFT + WONK axes) + `Instrument Serif` italic + `Inter` body + `Amiri` / `Noto Naskh Arabic` for RTL.

## Videos

Drop your own AI-generated b-roll into `public/videos/` — the site auto-plays them muted and loops, falls back to poster images if missing. Generation prompts for Veo3 / Higgsfield are in `public/videos/README.md`.

## Content swaps

- **Real photos** → `public/images/` then update URLs in `src/lib/gallery.ts`, `src/lib/services.ts`, `src/components/Hero.tsx`, `src/components/AtelierPortrait.tsx`, `src/components/Philosophy.tsx`
- **Reviews** → `src/lib/reviews.ts` (currently 11 verbatim reviews from Google, set `featured: true` on your pick)
- **Hours** → `src/lib/business.ts` (`sessions: string[]` — empty array = closed)
- **Contact** → `src/lib/business.ts`
- **Copy** → `src/lib/dictionary.ts`

## Accessibility

- `prefers-reduced-motion` disables intro curtain, custom cursor, and reduces GSAP durations
- Full keyboard nav, visible focus states, `aria-expanded` on accordions, semantic landmarks
- Alt text on images, `aria-label` on icon-only buttons
- Arabic RTL: direction set on `<html>`, letter-spacing reset for connected script, arrow icons mirrored

## License

Private — commissioned for Keba Schneiderei, Marl.
