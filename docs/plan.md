# Layout base: next-intl routing + EditorPanel (gutter) + Sidebar

## Context

The repo currently has only a placeholder `src/app/` (no `[locale]` segment, "hola mundo" page, no i18n) even though `AGENTS.md` mandates next-intl routing (`/en`, `/es`, default `en`) and a "terminal/editor" visual system (`docs/design-system.md`): black sidebar file-tree nav + glassmorphism panel with a line-number gutter, over a full-bleed background photo. `docs/content-model.md` defines the nav item shape (`ISidebarItem`) and confirms Home/Experience/Projects/Contact as the four sections, with Projects deliberately content-less for now.

This task builds only the **structural shell** — i18n routing, `Sidebar`/`SidebarNavItem`, `EditorPanel`/`LineNumberGutter`, and the root layout that composes them over the background photo — with empty section stubs so the page compiles and scrolls correctly. No section copy, no SEO metadata, no content data files. That's explicitly future work per `content-model.md`.

## Key decisions

- **`next-intl` is not installed** — add it (`npm install next-intl`, let npm resolve the version compatible with Next 16.3.1 / React 19.2.8; sanity-check peer deps after install).
- **`tsconfig.json`** alias `@/*` currently points at `./*` (repo root) but all code lives under `src/` — fix to `"@/*": ["./src/*"]`.
- **No separate root `src/app/layout.tsx`.** `src/app/[locale]/layout.tsx` owns `<html>`/`<body>` (avoids nested `<html>`). Matches AGENTS.md's tree, which never lists a bare `src/app/layout.tsx`.
- **`middleware.ts` goes at `src/middleware.ts`** (repo has a `src/` dir) — handles the `/` → `/en` redirect via `createMiddleware(routing)`, so no root `page.tsx` is needed.
- **Nav `href`s are in-page anchors** (`#home`, `#experience`, …) — the page is one scrollable page per locale, not separate routes. `Sidebar` uses `useTranslations` for labels; no `createNavigation`/locale switcher yet.
- **`EditorPanel` renders in the layout**, wrapping `{children}`; `page.tsx` just returns the four section stubs, which land inside the panel.
- **Sidebar active state defaults to `"home"`**, no scroll-spy/IntersectionObserver yet — `SidebarNavItem` takes an `isActive` prop so wiring real scroll tracking later is isolated.
- **Section stubs are empty** (`<section id="..." />`, `min-h-[40vh]`), no visible copy — avoids inventing hardcoded strings outside `messages/`.
- **`EditorPanel` takes an optional `lineCount` prop** (default ~40) rather than auto-measuring via `ResizeObserver` — keeps it a Server Component.
- **Deferred, not built this pass:** `sitemap.ts`, `robots.ts`, `generateMetadata`/`seo.ts`, `date.ts`, `TechBadge`/`ExperienceCard`/`SocialLink`, `createNavigation`/language switcher, scroll-spy, circular avatar badge.

## Files to create/modify

**Config**
- `tsconfig.json` — fix `@/*` path alias to `./src/*`.
- `next.config.ts` — wrap with `createNextIntlPlugin("./src/i18n/request.ts")`.
- `package.json` — add `next-intl` dependency.

**i18n core**
- `src/i18n/routing.ts` — `defineRouting({ locales: ["en","es"], defaultLocale: "en" })`.
- `src/i18n/request.ts` — `getRequestConfig`, resolves locale via `hasLocale`, imports `../messages/${locale}.json`.
- `src/middleware.ts` — `createMiddleware(routing)` + standard matcher.
- `src/messages/en.json`, `src/messages/es.json` — minimal `nav` namespace only (`home`, `experience`, `projects`, `contact`).

**App shell**
- `src/app/[locale]/layout.tsx` — `generateStaticParams` over locales, `hasLocale` guard + `notFound()`, `setRequestLocale`, `NextIntlClientProvider`, renders background photo (`next/image`, `fill`, `object-cover`, `-z-10`) + dark overlay, then `Sidebar` + `EditorPanel` in a `max-w-[1400px]` responsive (`flex-col md:flex-row`) container. Sets `<html lang>`, applies Inter font.
- `src/app/[locale]/page.tsx` — awaits `params`, `setRequestLocale`, renders the four section stubs as a fragment.
- `src/app/[locale]/globals.css` (moved from `src/app/globals.css`) — `@import "tailwindcss";` plus `@theme` block mapping every design-system.md color token (`--color-panel-bg`, `--color-sidebar-bg`, `--color-sidebar-active-bg`, `--color-border-subtle`, `--color-text-primary/secondary/muted`, `--color-accent`, `--color-accent-hover`) so Tailwind v4 auto-derives utilities (`bg-panel-bg`, `text-accent`, etc.) — no `tailwind.config.*` file, per existing v4 setup.
- Delete old `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` (superseded by the `[locale]` versions).

**Fonts**
- `src/lib/fonts.ts` — `Inter` via `next/font/google`, `variable: "--font-inter"`, wired into `globals.css` `@theme` as `--font-sans`.

**Interfaces**
- `src/interfaces/navigation.interface.ts` — `ISidebarItem { id: "home"|"experience"|"projects"|"contact"; labelKey: string; href: string }`. (`INavSection` intentionally skipped — no fields to justify it yet.)

**Nav data**
- `src/lib/navigation.ts` — `export const NAV_ITEMS: ISidebarItem[]` (four entries, `labelKey` relative to the `nav` message namespace, `href` = in-page anchor).

**Components**
- `src/components/ui/LineNumberGutter.tsx` — Server Component, `ILineNumberGutterProps { lineCount: number }`, right-aligned `w-8` numbered column, `select-none`, `tabular-nums`, `hidden md:flex`.
- `src/components/layout/EditorPanel.tsx` — Server Component, `IEditorPanelProps { children: ReactNode; lineCount?: number }`, glassmorphism container (`bg-panel-bg`, `backdrop-blur-[20px]`, `border-border-subtle`, `rounded-2xl`) composing `LineNumberGutter` + content column.
- `src/components/layout/SidebarNavItem.tsx` — Server Component, `ISidebarNavItemProps { href: string; label: string; isActive: boolean }`, `"> "` prefix + label with active/inactive styling per design-system.md.
- `src/components/layout/Sidebar.tsx` — `"use client"` (uses `useTranslations`, holds active-id state), solid `bg-sidebar-bg`, renders `NAV_ITEMS` as `SidebarNavItem`s, `w-full md:w-[300px]`.
- `src/components/sections/HomeSection.tsx`, `ExperienceSection.tsx`, `ProjectsSection.tsx`, `ContactSection.tsx` — trivial Server Components, `<section id="..." className="min-h-[40vh]" />`, no copy.

## Verification

1. `npm install`, `npm run dev` — confirm `/` redirects to `/en`.
2. Visit `/en` and `/es` — nav labels translate, gutter shows numbered lines for the full panel height, background photo + dark overlay + glass blur all visible.
3. Resize below 768px — sidebar stacks, gutter hides per the mobile rule.
4. `npm run build` — confirm static generation succeeds for both locale params, no nested-`<html>` or missing-locale errors.
5. `npx tsc --noEmit` — confirm the `@/*` alias fix compiles cleanly.
