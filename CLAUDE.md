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
- Schema: `prisma/schema.prisma` — models: `investments`, `Profile`, `Instrument`
- Prisma client singleton: `app/lib/prisma.ts`
- Generated client path: `app/generated/prisma/` (gitignored)
- SQL that references `auth.users` (FK, triggers, RLS policies) must be run in the Supabase SQL editor — stored in `prisma/supabase-auth.sql`

### Styling

Custom theme colors and CSS component classes (`.button`, `.nav-link`, `.ph-*`) are defined in `app/globals.css` using Tailwind's `@theme` directive. Prefer CSS pseudo-classes (`:hover`, `:focus`) over state-driven hover handlers.

**Tailwind v4 CSS variable syntax:** use `bg-(--ph-var)` not `bg-[var(--ph-var)]` — the shorthand is canonical in v4.

### Auth

- Supabase Auth with email/password and Google OAuth
- Server client: `app/lib/supabase/server.ts` — used in Server Actions and Route Handlers
- Browser client: `app/lib/supabase/client.ts` — used only when `window` is needed (e.g. OAuth)
- Callback route: `app/auth/callback/route.ts` — handles OAuth code exchange
- `proxy.ts` (project root) — refreshes sessions and protects routes on every request (Next.js 16 convention, replaces `middleware.ts`)

## Security Model

**Access control lives at the application layer.** Prisma connects via Supabase's pooler with a role that bypasses RLS, so Postgres-level policies in `prisma/supabase-auth.sql` do **not** fire for Prisma queries.

**Consequences every contributor must internalize:**
- Every user-scoped Server Action MUST call `getUserId()` (from `app/lib/actions/auth.ts`) and include `userId` in the `where` clause — or verify ownership before mutating (see `deleteInvestment` in `app/lib/actions/investments.ts`).
- Never trust a `userId` passed as an argument from the client. Derive it from the session.
- Never cache user-scoped data with a cache key that omits `userId`.
- RLS policies in `prisma/supabase-auth.sql` exist as documentation and as a safety net for future `supabase-js` queries, but they are NOT enforced today.

## Server Actions Pattern

**All backend logic must live in Server Action files under `app/lib/actions/`.** Pages and components must never call Supabase or Prisma directly.

| Concern | Where it lives |
|---|---|
| Auth logic (sign in, sign up, sign out) | `app/lib/actions/auth.ts` |
| Database queries | `app/lib/actions/<feature>.ts` (e.g. `investments.ts`, `instruments.ts`) |
| Zod validation schemas | `app/lib/schemas/<feature>.ts` |
| UI state, form handling | Page / component (`"use client"`) |
| OAuth (needs `window`) | Client component only — not a Server Action |

**Rules:**
- Server Action files use `"use server"` at the top.
- Server Actions use the **server** Supabase client (`app/lib/supabase/server.ts`).
- Client components use the **browser** Supabase client (`app/lib/supabase/client.ts`) only for OAuth.
- **Every user-scoped action starts with `await getUserId()`** — redirects to `/auth/login` if unauthenticated.
- Actions return `{ error: string }` on validation/DB failure — pages handle displaying errors.
- Actions call `redirect()` from `next/navigation` on success — pages do not use `router.push()` for post-action navigation.
- Mutations call `revalidatePath()` (or `revalidateTag()`) before `redirect()` so stale caches clear.
- Input validation uses Zod via `Schema.safeParse(input)` — return the first error message (`result.error.issues[0].message`).

**Every exported function in a `"use server"` file becomes an RPC endpoint.** If a function shouldn't be callable from the client (internal helpers, functions that accept `userId` as an argument), put it in a non-`"use server"` module — see "Non-Server Helpers" below.

## Data Layer (`app/lib/data/`)

Cacheable read queries that need `"use cache"` live outside `app/lib/actions/` in plain (non-`"use server"`) modules under `app/lib/data/`. Server Actions import and call them.

| File | Purpose |
|---|---|
| `app/lib/data/instruments.ts` | `fetchInstruments(query, filters?)` — cached instrument search |
| `app/lib/data/investmetnts.ts` | `fetchMyInvestments(userId)` — cached per-user investment list |

**Rules:**
- Place `"use cache"` as the first statement inside the function body (not at the file top).
- Always call `cacheLife(...)` and `cacheTag(...)` immediately after `"use cache"`.
- Functions in this layer accept `userId` as a plain argument — they are not Server Actions and are never exposed as RPC endpoints.
- `"use cache"` is stable in Next.js 16 and requires no experimental config flag.

**Prisma serialization:** `Decimal` and `BigInt` fields cannot cross the server/client boundary as-is. Map them to plain primitives before returning:
- `Decimal` → `.toNumber()`
- `BigInt` → `String(id)`

Define the serialized shape with `Omit` + extend so the Prisma model stays the source of truth:

```ts
import type { investments } from "@/app/generated/prisma";

export type Investment = Omit<investments, "id" | "quantity" | "sharePrice" | "fee"> & {
  id: string;
  quantity: number;
  sharePrice: number;
  fee: number;
};
```

## Non-Server Helpers

Shared server-side logic that must NOT be exposed as an RPC endpoint lives outside `app/lib/actions/`.

| Path | Purpose |
|---|---|
| `app/lib/auth/post-login.ts` | `getPostLoginDestination(userId)` — internal helper used by `signInWithEmail` and the OAuth callback. Not a Server Action. |

**Rule:** if a function accepts an identity claim (like `userId`) as a parameter, it does not belong in a `"use server"` file. Either (a) derive the identity from the session inside the function, or (b) move it to a plain module and import it from route handlers / other actions.

## Schemas (Zod Validation)

**All input validation lives in `app/lib/schemas/` as separate files per domain.** Schemas are the source of truth for both runtime validation and TypeScript types — never hand-write a type that duplicates a schema.

| File | Contents |
|---|---|
| `app/lib/schemas/auth.ts` | `LoginSchema`, `SignupSchema` + derived types |
| `app/lib/schemas/currencies.ts` | `CurrencyCodeSchema` |
| `app/lib/schemas/investments.ts` | `CreateInvestmentSchema` + `CreateInvestmentInput` / `CreateInvestmentData` types |

**Rules:**
- Use `z.coerce` on fields that accept raw form strings (`z.coerce.number()`, `z.coerce.date()`) so the schema accepts what `<input>` produces and hands back typed data.
- Export both `z.input<typeof Schema>` (pre-parse, what callers pass in) and `z.output<typeof Schema>` (post-parse, what the action works with). Server Actions accept the `input` type.
- Apply `.transform()` inside the schema for normalization (e.g. `.trim()`, `.toUpperCase()`) — don't repeat this logic in the action.
- Server Actions always re-validate even if the client validated. The client is untrusted.

## Constants

**All constants must live in `app/lib/constants/` as separate files per domain.** Never declare constants inline inside pages or components.

| File | Contents |
|---|---|
| `app/lib/constants/currencies.ts` | `CURRENCIES` array + `CurrencyCode` type |
| `app/lib/constants/tradeTypes.ts` | `TRADETYPES` array + `TradeType` type |

**Rules:**
- Use `as const` on arrays so TypeScript infers literal types.
- Export a derived type (e.g. `CurrencyCode`) alongside each constant array.
- Import constants with `@/app/lib/constants/<file>`.
- Consume constants from Zod schemas via `z.enum(CONSTANT_ARRAY, { message: "..." })`.

## UI Components

Reusable components in `app/components/`:

| Component | Purpose |
|---|---|
| `Input` | Styled input. Passes through all HTML input props. |
| `FormField` | Label + `Input` wrapper. Accepts `label` plus all HTML input props. |
| `InstrumentSearch` | Owns the ticker search dropdown state; parent provides `selectedInstrument`, `onSelect`, `onClear`. |
| `TypeBadge` | Renders STOCK / ETF / CRYPTO type badges with themed styling. |
| `BuySellToggle` | Segmented control for BUY / SELL. |
| `Breadcrumb`, `PageHeader`, `StatCard`, `EmptyState`, `PnLDisplay`, `UserMenu`, `NavBar`, `AuthLayout` | Layout and presentational primitives. |
| `icons/` | SVG icon components (`DashboardIcon`, `PortfolioIcon`, `SearchIcon`, etc.). |

**Extraction rule:** extract a component when it (a) owns state that shouldn't leak to the parent, (b) will be reused elsewhere, or (c) is a stable subtree that benefits from `memo`. Don't split just for file size — prop-drilling parent state into a child that isn't reused is worse than a longer file.

## Form Event Types (React 19)

`React.FormEvent` is **deprecated** in `@types/react@19`. Use the named DOM-aligned event types instead:

| Handler | Old (deprecated) | New |
|---|---|---|
| `<form onSubmit>` | `FormEvent<HTMLFormElement>` | `SubmitEvent<HTMLFormElement>` |
| `<input onChange>` | `FormEvent<HTMLInputElement>` | `ChangeEvent<HTMLInputElement>` |
| `<input onInput>` | `FormEvent<HTMLInputElement>` | `InputEvent<HTMLInputElement>` |
| Generic fallback | `FormEvent<T>` | `SyntheticEvent<T>` |

Import types directly from `react` rather than via the `React.*` namespace:

```ts
import { SubmitEvent } from "react";
async function handleSubmit(e: SubmitEvent<HTMLFormElement>) { ... }
```

## Path Aliases

`@/*` maps to project root (e.g., `import { prisma } from '@/app/lib/prisma'`). Prefer the alias over relative imports (`../../lib/prisma`) for consistency.
