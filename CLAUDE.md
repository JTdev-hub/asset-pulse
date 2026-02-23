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

### Auth

- Supabase Auth with email/password and Google OAuth
- Server client: `app/lib/supabase/server.ts` — used in Server Actions and Route Handlers
- Browser client: `app/lib/supabase/client.ts` — used only when `window` is needed (e.g. OAuth)
- Callback route: `app/auth/callback/route.ts` — handles OAuth code exchange
- `proxy.ts` (project root) — refreshes sessions and protects routes on every request (Next.js 16 convention, replaces `middleware.ts`)

### Server Actions Pattern

**All backend logic must live in Server Action files under `app/lib/actions/`.** Pages and components must never call Supabase or Prisma directly.

| Concern | Where it lives |
|---|---|
| Auth logic (sign in, sign up, sign out) | `app/lib/actions/auth.ts` |
| Database queries | `app/lib/actions/<feature>.ts` (e.g. `investments.ts`) |
| UI state, form handling | Page / component (`"use client"`) |
| OAuth (needs `window`) | Client component only — not a Server Action |

**Rules:**
- Server Action files use `"use server"` at the top
- Server Actions use the **server** Supabase client (`app/lib/supabase/server.ts`)
- Client components use the **browser** Supabase client (`app/lib/supabase/client.ts`) only for OAuth
- Server Actions return `{ error: string }` on failure — pages handle displaying errors
- Server Actions call `redirect()` from `next/navigation` on success — pages do not use `router.push()` for post-action navigation

### Database

- **Prisma** with `@prisma/adapter-pg` for Supabase PostgreSQL connection pooling (port 6543)
- Direct connection (port 5432) used for migrations via `DIRECT_URL`
- Schema: `prisma/schema.prisma` — models: `investments`, `Profile`
- Prisma client singleton: `app/lib/prisma.ts`
- Generated client path: `app/generated/prisma/` (gitignored)
- SQL that references `auth.users` (FK, triggers) must be run in the Supabase SQL editor — stored in `prisma/supabase-auth.sql`

### Win2000 UI Components

Reusable components in `app/components/`:
- `Win2000Window` — generic window chrome (frame + title bar + gray body + status bar). Use this for any dialog or panel.
- `Win2000TitleBar` — blue gradient title bar with window controls. Accepts `title` prop.
- `Win2000Input` — sunken-border styled input. Passes through all HTML input props.
- `Win2000StatusBar` — bottom status bar. Accepts optional `right` slot.
- `Win2000Taskbar` — bottom taskbar strip. Accepts `title` prop.

### Styling — Windows 2000 Theme

The UI uses a retro Windows 2000 aesthetic. Custom theme colors and CSS component classes (`.button`, `.nav-link`) are defined in `app/globals.css` using Tailwind's `@theme` directive. Key design tokens: retro-purple, coral, orange, gold, cream, brown, plus Win2000 dialog grays and blue title bar gradients.

### Path Aliases

`@/*` maps to project root (e.g., `import { prisma } from '@/app/lib/prisma'`).
