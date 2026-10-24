<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# next-adventure-client

Next.js 16 App Router app, currently a shadcn/ui starter. The only route is `src/app/page.tsx`; the `@/*` alias maps to `src/*`.

Leave the managed block above intact; `next dev` rewrites it.

## Commands

- `npm run dev` / `npm run build` / `npm run start`
- `npm run lint` — runs bare `eslint` (flat config). There is no `next lint`.
- `npx tsc --noEmit` — typecheck; no npm script for it. `next build` also typechecks.
- No tests or test runner are configured.
- Use Node 22+ (`cn` declares `>=22`; Next.js 16 itself needs `>=20.9`).

## Toolchain quirks

- Turbopack is the default for both dev and build. Do not add a webpack config.
- Tailwind is v4 CSS-first, compiled by the `@tailwindcss/turbopack` loader configured in `next.config.ts`. There is no `tailwind.config.*` or PostCSS config; theme tokens live in `src/app/globals.css`. If a newly added utility (especially an arbitrary value like `grid-cols-[...]`) does not appear in dev, restart `next dev` — the dev CSS cache can stay stale.
- `cacheComponents`, `partialPrefetching`, and `reactCompiler` are enabled in `next.config.ts`. With Cache Components:
  - `cookies()`, `headers()`, `searchParams`, and uncached async data must be behind a `<Suspense>` boundary, or the build fails during prerendering. Opt into caching with `"use cache"`.
  - Synchronous IO during prerender (`new Date()`, `Math.random()`, `crypto.randomUUID()`) is a build error unless it runs in a Client Component or behind `<Suspense>` / `connection()`.
- Route props use Next 16's generated globals, e.g. `LayoutProps<"/">` and `PageProps<"/route">`; `params` and `searchParams` are Promises.
- React Compiler is on; don't add `useMemo`/`useCallback` by reflex.

## UI conventions

- shadcn style is `base-nova`, built on Base UI (`@base-ui/react`), not Radix. Use the `render` prop (`render={<Button />}`) instead of `asChild`; Radix-style snippets will not typecheck.
- Add components with `npx shadcn add <name>`; they land in `src/components/ui` according to `components.json`.
- Class merging uses the compiled `cn` package: `import { cn } from "cn"`. `src/lib/utils.ts` only re-exports it — don't introduce `clsx`/`tailwind-merge`.
- `src/lib/highlighter.tsx` is a lazy Shiki singleton with a fixed language map. Add new languages to its `languages` map; unknown languages silently render as plain text.

## Known state

- `npm run lint` currently fails on two upstream shadcn files: `react-hooks/set-state-in-effect` in `src/hooks/use-mobile.ts` and `src/components/ui/carousel.tsx`. `npx tsc --noEmit` and `npm run build` pass. Don't attribute these errors to new work.
