# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Next.js dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npx prisma generate` — Regenerate Prisma client (output: `app/generated/prisma/`)
- `npx prisma migrate dev` — Run database migrations (uses `DIRECT_URL` env var)

## Architecture

**Next.js 16 App Router** with TypeScript, Tailwind CSS v4, Prisma 7 (PostgreSQL via Supabase), and Supabase Auth.

### Routing & Layouts

- `app/(protected)/` — Route group for authenticated pages; shares a layout with `NavBar`
- `app/auth/login/` — Public login page
- Root layout (`app/layout.tsx`) loads Google Fonts: Josefin Sans, Alata, Montserrat

### Database

- **Prisma** with `@prisma/adapter-pg` for Supabase PostgreSQL connection pooling (port 6543)
- Direct connection (port 5432) used for migrations via `DIRECT_URL`
- Schema: `prisma/schema.prisma` — currently one model: `investments`
- Prisma client singleton: `app/lib/prisma.ts`
- Generated client path: `app/generated/prisma/` (gitignored)

### Styling — Windows 2000 Theme

The UI uses a retro Windows 2000 aesthetic. Custom theme colors and CSS component classes (`.button`, `.nav-link`) are defined in `app/globals.css` using Tailwind's `@theme` directive. Key design tokens: retro-purple, coral, orange, gold, cream, brown, plus Win2000 dialog grays and blue title bar gradients.

### Path Aliases

`@/*` maps to project root (e.g., `import { prisma } from '@/app/lib/prisma'`).
