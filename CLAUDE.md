# CLAUDE.md — MHL UI Vite Template

Instructions for Claude Code working in this project. This file is always loaded as context.

---

## Project overview

This is a **Vite 6 + React 19 + TypeScript** application using the **MHL UI** design system — an enterprise-grade component library built on React Aria and Tailwind CSS v4.

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Bundler | Vite 6 |
| Language | TypeScript 5.6+ (strict, zero `any`) |
| UI library | `@maholan/ui` (via `@/components/ui` barrel) |
| Theming | `@maholan/theme` — ThemeProvider + useTheme |
| Styling | Tailwind CSS v4 + semantic token classes |
| Class merging | `cn()` from `@/libs/utils` |

---

## Import conventions

```tsx
// Components — always use the local barrel
import { Button, Badge, Input, Modal, Tabs } from "@/components/ui";

// Utilities and hooks
import { cn, cx } from "@/libs/utils";
import { useBreakpoint } from "@/libs/hooks";

// Theming
import { ThemeProvider, useTheme } from "@maholan/theme";
```

Never import from `@maholan/ui` deep paths or component internals.

---

## Core rules

- **Named exports only** — no default component exports
- **`cn()` for all class merging** — never template literals or string concatenation
- **Semantic token classes only** — `bg-primary`, `text-primary`, `border-primary`, `bg-brand-solid`, etc.
- **No `dark:` prefixes** on semantic tokens — they resolve dark mode automatically via CSS variables
- **No inline `style={{}}`** — Tailwind classes only
- **No hardcoded colors** — no `bg-[#6938EF]`, no `text-gray-900`
- **`className` prop** accepted on every custom component
- **No manual ARIA** on interactive components — React Aria handles it internally

---

## Styling quick reference

```tsx
// ✅ Correct
<div className="bg-primary text-primary border-primary rounded-xl border p-6 shadow-xs">
<button className="bg-brand-solid text-white rounded-lg px-4 py-2">

// ❌ Wrong — hardcoded / breaks dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
<div className={`card ${isActive ? "active" : ""}`}>   // no cn()
<div style={{ padding: "1rem" }}>                       // no inline style
```

---

## Dark mode

```tsx
const { mode, setMode } = useTheme();
// "light" | "dark" | "system"
setMode("dark");
```

---

## Available skill

```
/mhl-template new-component <name>   — scaffold a feature component
/mhl-template new-page <name>        — scaffold a page layout
/mhl-template add <component-name>   — install an MHL component via CLI
/mhl-template token <use-case>       — look up the correct semantic token class
```

Full reference: [.claude/skills/mhl-template.md](.claude/skills/mhl-template.md)
