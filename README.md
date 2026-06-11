# For You <3

A mobile-native (9:16) **Dark Glassy Liquid** web experience built for NIKITA.

- Vertical stack of **N-I-K-I-T-A** — every letter is a fully state-managed interactive component.
- Tap a letter → it expands horizontally into a beautiful glassmorphic card.
- The card reveals the poetic phrase + an ultra-immersive **Song Widget**.
- The widget uses the song artwork as its background **and** a real-time **WebGL refractive glass shader** (glass index 1.52 + strong -100 magnification lens + liquid micro-wobble).
- All animations use hand-calibrated Framer Motion springs (soft, high-damping, viscous liquid physics).
- 100dvh × 100vw forced viewport — no browser toolbar clipping.
- Official `jiosaavn://song/[ID]` deep links with robust timeout + web fallback.

Optimized for Vercel (vercel.json + performance headers included).

## Tech highlights
- Next.js 16 App Router + TypeScript
- Framer Motion (liquid springs)
- Custom high-performance WebGL + GLSL refraction/magnification shader
- Hand-crafted multi-layer CSS glassmorphism
- Sonner toasts for deep-link UX

## Development

```bash
npm run dev
```

Open http://localhost:3000 — the experience is designed to feel like a native 9:16 mobile app.

## Deploy

```bash
vercel
```

The included `vercel.json` sets proper security headers and long-lived image caching.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
