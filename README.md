# MHL UI — Vite + React Template

A production-ready starter template for building enterprise-grade applications with **MHL UI** — the accessible design system built on React Aria and Tailwind CSS v4.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-8-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)

---

## Stack

| Layer | Technology |
|---|---|
| Bundler | Vite 6 |
| Language | TypeScript 5.6+ — strict mode, zero `any` |
| UI | React 19 |
| Component library | `@maholan/ui` — 40+ components |
| Accessibility | `react-aria-components` — WCAG 2.1 AA |
| Theming | `@maholan/theme` — ThemeProvider + no-FOUC ThemeScript |
| Design tokens | `@maholan/tokens` — 4-tier token architecture |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Class merging | `clsx` + `tailwind-merge` via `cn()` |
| Component explorer | Storybook 8 — 40+ stories, dark mode, autodocs |
| Linting | ESLint 9 flat config — strict typed rules |
| Formatting | Prettier 3 + `prettier-plugin-tailwindcss` |

---

## Getting started

```bash
# Using the MHL CLI (recommended)
npx @maholan/cli init --template vite

# Or clone directly
git clone https://github.com/maholan/mhl-untitledui-platform.git
cd templates/vite
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the app and [http://localhost:6006](http://localhost:6006) for Storybook (run both simultaneously):

```bash
npm run dev          # App dev server → localhost:5173
npm run storybook    # Storybook dev server → localhost:6006
```

---

## Project structure

The template ships with a production-ready folder structure designed to scale from a small team to a large enterprise product. Every convention below is intentional.

```
├── .storybook/
│   ├── main.ts              # Storybook config — stories glob, Tailwind plugin, @ alias
│   ├── manager.ts           # Storybook chrome theme — mirrors dark/light toggle
│   ├── preview.tsx          # Global decorators — withThemeByClassName dark mode
│   ├── preview-head.html    # Injected into story iframe — Inter font CDN link
│   └── storybook.css        # Storybook-only globals — imports src/index.css + dark docs fixes
│
├── public/
│   ├── favicon.svg
│   └── fonts/               # Self-hosted Inter variable font (place inter-variable.woff2 here)
│
├── src/
│   ├── components/
│   │   ├── index.ts          # App component barrel (your own components go here)
│   │   └── ui/               # MHL UI components — managed by @maholan/cli
│   │       ├── assets/       # SVG icons + payment icons
│   │       ├── base/         # Primitive components
│   │       │   ├── avatar/
│   │       │   ├── badges/
│   │       │   ├── buttons/  # Button, ButtonGroup, ButtonUtility, CloseButton
│   │       │   ├── checkbox/
│   │       │   ├── dropdown/
│   │       │   ├── input/    # Input, InputBase, InputDate, InputFile, InputNumber…
│   │       │   ├── progress-indicators/
│   │       │   ├── radio/
│   │       │   ├── select/   # Select, MultiSelect, NativeSelect, TagSelect
│   │       │   ├── slider/
│   │       │   ├── tags/
│   │       │   ├── textarea/
│   │       │   ├── toggle/
│   │       │   └── tooltip/
│   │       ├── composite/    # Higher-order components
│   │       │   ├── breadcrumbs/
│   │       │   ├── carousel/
│   │       │   ├── data-picker/  # Calendar, DatePicker, DateRangePicker
│   │       │   ├── indicator/    # Loading spinner
│   │       │   ├── modals/
│   │       │   ├── paginations/
│   │       │   ├── table/
│   │       │   └── tabs/
│   │       └── index.ts      # Single import barrel for all MHL components
│   │
│   ├── libs/
│   │   ├── hooks/            # useBreakpoint, useResize
│   │   └── utils/            # cn(), cx(), sortCx()
│   │
│   ├── App.tsx               # Root — ThemeProvider wraps everything
│   ├── index.css             # Tailwind entry point + MHL token import
│   ├── main.tsx              # React mount + ThemeScript (no-FOUC)
│   └── vite-env.d.ts         # Vite env type declarations
│
├── .gitignore
├── CLAUDE.md                 # Claude Code project instructions
├── eslint.config.mjs         # ESLint 9 flat config — 3-tier rule set
├── index.html                # Entry HTML — Inter font CDN fallback
├── mhl.config.json           # MHL CLI config — component install path
├── package.json
├── postcss.config.mjs
├── tsconfig.json             # App TypeScript config
├── tsconfig.node.json        # Node config (vite.config.ts, storybook/main.ts)
└── vite.config.ts
```

---

## Recommended enterprise structure

When growing beyond a prototype, extend the `src/` directory following this pattern. Every layer has a clear responsibility and dependency direction flows strictly downward — no circular imports.

```
src/
│
├── app/                     # App-shell concerns
│   ├── router.tsx           # Route definitions (React Router / TanStack Router)
│   ├── providers.tsx        # Global providers (Theme, Query, Auth, i18n)
│   └── store.ts             # Global state (Zustand / Jotai)
│
├── pages/                   # Route-level components — one folder per route
│   ├── dashboard/
│   │   ├── dashboard.page.tsx
│   │   ├── dashboard.loader.ts   # Data fetching / route loader
│   │   └── components/           # Page-local components (not shared)
│   ├── settings/
│   └── ...
│
├── features/                # Domain-bounded feature modules
│   ├── auth/                # Everything owned by auth domain
│   │   ├── components/      # Auth-specific components
│   │   ├── hooks/           # useAuth, useSession
│   │   ├── api/             # Auth API calls
│   │   ├── store/           # Auth slice / atoms
│   │   └── index.ts         # Public API — only export what pages need
│   ├── billing/
│   ├── users/
│   └── ...
│
├── components/              # Shared, reusable app-level components
│   ├── ui/                  # MHL UI — managed by @maholan/cli (do not edit)
│   ├── layout/              # AppShell, Sidebar, Navbar, PageHeader
│   └── common/              # DataTable wrapper, ConfirmDialog, EmptyState…
│
├── libs/                    # Pure utilities — no React, no side effects
│   ├── hooks/               # useBreakpoint, useDebounce, useLocalStorage
│   ├── utils/               # cn(), formatDate(), formatCurrency()
│   ├── api/                 # API client, interceptors, error handling
│   └── constants/           # APP_ROUTES, QUERY_KEYS, REGEX patterns
│
├── assets/                  # Static files imported by source code
│   ├── images/
│   └── icons/               # App-specific icons (not MHL icons)
│
└── types/                   # Global TypeScript types and interfaces
    ├── api.ts               # API response shapes
    ├── models.ts            # Domain models (User, Product…)
    └── env.d.ts             # Extended ImportMetaEnv
```

### Key conventions

**Dependency direction** — components can import from `libs/`, `features/` can import from `components/`, pages can import from `features/`. Nothing imports upward.

```
pages → features → components/ui → libs
                ↘ libs
```

**Feature module public API** — each `features/<name>/index.ts` only exports what is safe to use from outside. Internal implementation stays private.

```ts
// features/auth/index.ts — public API
export { LoginForm } from "./components/login-form";
export { useAuth } from "./hooks/use-auth";
export type { AuthUser } from "./types";
// AuthStore, apiClient, internal helpers — NOT exported
```

**Co-location** — keep tests, stories, and styles next to the file they describe. A component that moves takes its tests with it automatically.

```
features/auth/components/
├── login-form.tsx
├── login-form.test.tsx   # co-located test
└── login-form.stories.tsx  # co-located story (picked up by Storybook glob)
```

---

## Import paths

```ts
// MHL UI components — always via the barrel
import { Button, Badge, Input, Modal, Select, Tabs } from "@/components/ui";

// Utilities
import { cn } from "@/libs/utils";
import { useBreakpoint } from "@/libs/hooks";

// Theming
import { useTheme } from "@maholan/theme";
```

Never import from deep paths inside `@maholan/ui` or `@/components/ui/base/...` — always go through the barrel export.

---

## Dark mode

Dark mode is handled entirely through CSS custom properties. No `dark:` prefixes needed — semantic tokens resolve dark values automatically.

```tsx
import { useTheme } from "@maholan/theme";

function ThemeToggle() {
  const { mode, setMode } = useTheme();
  return (
    <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  );
}
```

The `ThemeScript` injected in `main.tsx` reads `localStorage` before React hydrates — eliminating flash of wrong theme (FOWT) even on hard reload.

---

## Storybook

All 40+ MHL components ship with co-located stories. Storybook is configured with:

- **Dark mode** — `@storybook/addon-themes` with `withThemeByClassName` decorator mirrors the app's `.dark` class toggle
- **Autodocs** — every story tagged with `autodocs` generates a full prop table
- **Consistent fonts** — `preview-head.html` injects Inter into every story iframe, matching the app

```bash
npm run storybook          # Dev server → http://localhost:6006
npm run build-storybook    # Static build → storybook-static/
```

The Storybook URL in the app defaults to `http://localhost:6006`. Override for deployed environments:

```bash
# .env.local
VITE_STORYBOOK_URL=https://storybook.your-domain.com
```

---

## Font setup

The template loads Inter from Google Fonts CDN by default (non-blocking, no layout shift). For production, self-host the variable font:

1. Download [Inter Variable](https://github.com/rsms/inter/releases) (`inter-variable.woff2`)
2. Place it at `public/fonts/inter-variable.woff2`
3. Remove the Google Fonts `<link>` tags from `index.html` and `.storybook/preview-head.html`

The `@font-face` declaration in `src/index.css` takes over automatically.

---

## ESLint configuration

The ESLint config uses three tiers to balance strictness with practicality:

| Files | Ruleset | Purpose |
|---|---|---|
| `*.config.ts` / `.storybook/main.ts` | `recommendedTypeChecked` | Node config files |
| `src/components/ui/**` | `recommendedTypeChecked` + unsafe rules as `warn` | Upstream MHL components — visible but non-blocking |
| `src/*.tsx` / `src/pages/**` | `strictTypeChecked` | Your app code — full strict enforcement |

---

## Available scripts

```bash
npm run dev              # App dev server → localhost:5173
npm run build            # Type-check + production build → dist/
npm run preview          # Preview production build
npm run storybook        # Storybook dev server → localhost:6006
npm run build-storybook  # Build Storybook → storybook-static/
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run type-check       # tsc --noEmit
npm run format           # Prettier write
```

---

## Adding components

Install any MHL component into your project:

```bash
npx @maholan/cli add <component-name>

# Examples
npx @maholan/cli add button
npx @maholan/cli add date-picker
npx @maholan/cli add data-table
```

This copies the component source into `src/components/ui/`, rewrites import aliases to match your project, and installs any required npm dependencies.

---

## License

MIT — see [LICENSE](LICENSE).
