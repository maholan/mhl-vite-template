# /mhl-template

MHL UI Vite template skill — scaffolding, component lookup, and token reference.

## Usage

```
/mhl-template new-component <name> [description]
/mhl-template new-page <name> [description]
/mhl-template add <component-name> [component-name...]
/mhl-template token <use-case>
```

---

## `new-component` — Scaffold a feature component

Creates a new component in `src/components/<kebab-name>/`.

### Steps

1. Create `src/components/<kebab-name>/<name>.tsx`
2. Create `src/components/<kebab-name>/index.ts`

### Rules

- Named export only — no default exports
- Accept `className?: string` for consumer overrides
- Use `cn()` from `@/libs/utils` for all class merging
- Import MHL components from `@/components/ui`
- Semantic token classes only — no hardcoded colors, no `dark:` prefixes

### Example

```tsx
// src/components/stat-card/stat-card.tsx
import { cn } from "@/libs/utils";
import { Badge } from "@/components/ui";

export interface StatCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({ label, value, trend, className }: StatCardProps) {
  return (
    <div className={cn("bg-primary-alt border-primary rounded-xl border p-5 shadow-xs", className)}>
      <p className="text-tertiary mb-1 text-sm font-medium">{label}</p>
      <p className="text-primary text-2xl font-semibold">{value}</p>
      {trend && (
        <Badge
          variant="soft"
          color={trend === "up" ? "success" : trend === "down" ? "error" : "gray"}
          size="sm"
          className="mt-2"
        >
          {trend}
        </Badge>
      )}
    </div>
  );
}
```

```ts
// src/components/stat-card/index.ts
export { StatCard, type StatCardProps } from "./stat-card";
```

---

## `new-page` — Scaffold a page layout

Creates a new page in `src/pages/<kebab-name>/`.

### Steps

1. Create `src/pages/<kebab-name>/<name>-page.tsx`
2. Create `src/pages/<kebab-name>/index.ts`
3. Add export to `src/pages/index.ts` (create if it does not exist)

### Rules

- Page is a layout container — no data fetching, no global state
- Use `bg-primary` on the root for correct dark mode background
- Standard content width: `max-w-6xl mx-auto`
- Standard horizontal padding: `px-6`
- Standard content top padding: `py-8`

### Example

```tsx
// src/pages/dashboard/dashboard-page.tsx
import { cn } from "@/libs/utils";

interface DashboardPageProps {
  className?: string;
}

export function DashboardPage({ className }: DashboardPageProps) {
  return (
    <div className={cn("bg-primary flex min-h-screen flex-col", className)}>
      <header className="border-primary border-b px-6 py-4">
        {/* page header */}
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {/* page content */}
      </main>
    </div>
  );
}
```

```ts
// src/pages/dashboard/index.ts
export { DashboardPage } from "./dashboard-page";
```

---

## `add` — Install an MHL UI component

Runs the MHL CLI to copy a component into `src/components/ui/` and install its dependencies.

### Command

```bash
npx @maholan/cli add <component-name>
```

### After installing

The component is already re-exported from `src/components/ui/index.ts` — no new import path needed:

```tsx
import { NewComponent } from "@/components/ui";
```

### Available components

| Name | Exports |
|------|---------|
| `button` | `Button`, `ButtonGroup`, `CloseButton`, `ButtonUtility` |
| `badge` | `Badge`, `BadgeGroup` |
| `input` | `Input`, `InputPassword`, `InputNumber`, `InputDate`, `InputFile`, `PinInput` |
| `select` | `Select`, `MultiSelect`, `TagSelect` |
| `checkbox` | `Checkbox` |
| `radio` | `Radio` |
| `toggle` | `Toggle` |
| `avatar` | `Avatar`, `ProfilePhoto`, `ProfilePack` |
| `tags` | `Tag`, `TagClose`, `TagCheckbox` |
| `tooltip` | `Tooltip` |
| `modal` | `Modal` |
| `tabs` | `Tabs` |
| `dropdown` | `Dropdown` |
| `slider` | `Slider` |
| `textarea` | `Textarea` |
| `breadcrumbs` | `Breadcrumbs` |
| `pagination` | `Pagination`, `PaginationDot` |
| `table` | `Table` |
| `date-picker` | `DatePicker`, `DateRangePicker`, `Calendar`, `RangeCalendar` |
| `carousel` | `Carousel` |
| `loading` | `Loading` |

---

## `token` — Semantic token reference

MHL tokens resolve dark mode automatically. Never use `dark:` prefixes or hardcoded colors.

### Background (`bg-*`)

| Class | Use case |
|-------|----------|
| `bg-primary` | Canvas / page background |
| `bg-primary-alt` | Card, panel, elevated surface |
| `bg-secondary` | Muted background |
| `bg-brand-solid` | Primary brand fill (CTA buttons) |
| `bg-error-solid` | Destructive fill |
| `bg-success-solid` | Success fill |
| `bg-warning-solid` | Warning fill |
| `bg-brand-50` | Brand tint surface |
| `bg-error-50` | Error tint surface |
| `bg-success-50` | Success tint surface |

### Text (`text-*`)

| Class | Use case |
|-------|----------|
| `text-primary` | Main body text, headings |
| `text-secondary` | Secondary labels, subtitles |
| `text-tertiary` | Hints, placeholders, captions |
| `text-brand-primary` | Brand-colored text |
| `text-error-primary` | Error / validation message |
| `text-success-primary` | Success message |
| `text-warning-primary` | Warning message |

### Border & ring (`border-*` / `ring-*`)

| Class | Use case |
|-------|----------|
| `border-primary` | Default border |
| `border-secondary` | Subtle border |
| `border-error` | Error state border |
| `ring-brand-500` | Keyboard focus ring |
| `ring-error` | Error focus ring |

### Shadow (`shadow-*`)

| Class | Use case |
|-------|----------|
| `shadow-xs` | Cards, inputs (default) |
| `shadow-sm` | Hover state |
| `shadow-md` | Popovers, dropdowns |
| `shadow-lg` | Modals, sheets |
| `shadow-xs-skeuomorphic` | Button depth effect |

### Typography (`text-*`)

| Class | Size | Use case |
|-------|------|----------|
| `text-display-lg` | 48px | Page title |
| `text-display-md` | 36px | Major section heading |
| `text-display-sm` | 30px | Section heading |
| `text-display-xs` | 24px | Sub-section heading |
| `text-xl` | 20px | Large body |
| `text-lg` | 18px | Lead text |
| `text-md` | 16px | Body (MHL custom — use instead of `text-base`) |
| `text-sm` | 14px | Secondary text |
| `text-xs` | 12px | Caption, labels |
