# CLAUDE.md — demo-restauracja

Context for AI agents working in this repository.

## What this is

A portfolio demo website for a premium restaurant, part of Konrad Malinowski's
freelance portfolio (http://konrad.malinowski.ct8.pl). It is a static frontend with
mock data — there is **no backend**; reservations, cart, and checkout are simulated
client-side.

- **Live demo:** https://konradxmalinowski.github.io/demo-restauracja/
- Site copy is in **Polish** (target audience: Polish local businesses).

## Stack

- React 19 + TypeScript, bundled with Vite (`vite-ssg` for static generation)
- React Router 7 for routing
- TanStack Query 5 for (mock) server-state management and caching
- Zustand for cart state, React Hook Form + Zod for validation
- Framer Motion for animations, Embla Carousel, lucide-react icons, react-helmet-async for meta tags
- Tailwind CSS 3 for styling
- Vitest + Testing Library (jsdom) for tests, ESLint (flat config) for linting

## Commands

```bash
npm install
npm run dev          # dev server at http://localhost:5173
npm run build        # tsc -b && vite build → dist/
npm run lint         # eslint .
npm test             # vitest run
npm run test:watch   # vitest watch mode
npm run preview      # preview production build
```

## Structure

```
src/
├── components/    # UI components (menu/, cart/, reservations/, layout/, demo/)
├── pages/         # Pages: Home, Menu, Reservations, Events
├── routes/        # Route definitions
├── store/         # Zustand cart store
├── hooks/         # Custom hooks (useCart, useMenu, useReservation)
├── data/          # Mock data (dishes, events)
├── types/         # Shared TypeScript types
├── constants/     # Shared constants
└── __tests__/     # Vitest tests
```

## Conventions & constraints

- Mock data only — do not add real API calls, payments, or backends; this is a showcase.
- Mobile-first; food photography is the visual centerpiece — keep images optimized.
- Deployed to GitHub Pages under the `/demo-restauracja/` base path — keep asset URLs base-aware.
- Conventional Commits, English, imperative mood.
