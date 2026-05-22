# GitHub Copilot Instructions — MHL UI Vite Template

## Project overview

This project uses **MHL UI** — an enterprise-grade React design system built on React Aria and Tailwind CSS v4. Follow these instructions when generating or suggesting code.

---

## Import paths

Always import components from the barrel, never from internal paths:

```tsx
// ✅ Correct
import { Button, Badge, Input, Modal, Select, Tabs } from "@/components/ui";
import { cn, useBreakpoint } from "@/libs";

// ❌ Never do this
import { Button } from "@maholan/ui/src/components/button/button";
import { cn } from "../../libs/utils/cn";
```

---

## Component usage patterns

### Button

Icon slots use `iconLeading` and `iconTrailing` (accepts an FC or ReactNode):

```tsx
<Button color="primary" size="md">Label</Button>
<Button color="secondary" size="lg" iconLeading={<SearchIcon />}>Search</Button>
<Button color="primary" size="lg" iconTrailing={<ArrowRightIcon />}>Continue</Button>
<Button color="primary-destructive" onPress={handleDelete}>Delete</Button>
<Button color="primary" isDisabled>Disabled</Button>
<Button color="primary" isLoading>Saving…</Button>
```

Available `color` values: `primary`, `secondary`, `tertiary`, `link-gray`, `link-color`, `primary-destructive`, `secondary-destructive`, `tertiary-destructive`

Available `size` values: `sm`, `md`, `lg`, `xl`, `2xl`

### Badge

```tsx
<Badge variant="soft" color="brand" size="md">Label</Badge>
<Badge variant="outline" color="error">Error</Badge>
```

### Input

```tsx
<Input label="Email" placeholder="you@example.com" type="email" isRequired />
<Input label="Name" isInvalid hint="This field is required." />
```

### Modal

`Modal` is a controlled root — `Modal.Header` takes `title` and `description` as **props**, not children:

```tsx
<Modal isOpen={open} onOpenChange={setOpen}>
  <Modal.Header
    title="Confirm action"
    description="This action cannot be undone."
  />
  <Modal.Footer>
    <Button color="tertiary" onPress={() => setOpen(false)}>Cancel</Button>
    <Button color="primary" onPress={handleConfirm}>Confirm</Button>
  </Modal.Footer>
</Modal>
```

### Select

`Select` requires a `children` render-prop and `Select.Item` requires an `id` prop:

```tsx
const items = [
  { id: "a", label: "Option A" },
  { id: "b", label: "Option B" },
];

<Select label="Choose one" placeholder="Select…" items={items}>
  {(item) => <Select.Item key={item.id} id={item.id} label={item.label} />}
</Select>
```

### Tabs

Tabs uses a compound component pattern: `Tabs.Root` → `Tabs.List` → `Tabs.Item` → `Tabs.Panel`:

```tsx
<Tabs.Root defaultSelectedKey="overview" aria-label="Dashboard tabs">
  <Tabs.List>
    <Tabs.Item id="overview">Overview</Tabs.Item>
    <Tabs.Item id="settings">Settings</Tabs.Item>
  </Tabs.List>
  <Tabs.Panel id="overview">…</Tabs.Panel>
  <Tabs.Panel id="settings">…</Tabs.Panel>
</Tabs.Root>
```

### Tooltip

`Tooltip` wraps its trigger as `children`. Use `TooltipTrigger` for icon-only buttons:

```tsx
<Tooltip title="Save file" placement="top">
  <TooltipTrigger aria-label="Save" onPress={handleSave}>
    <SaveIcon />
  </TooltipTrigger>
</Tooltip>

<Tooltip title="More info" description="Supporting detail." arrow>
  <Button color="secondary">Hover me</Button>
</Tooltip>
```

---

## Styling rules

Use semantic token classes — they automatically handle dark mode:

```tsx
// ✅ Correct — token-based, dark mode aware
<div className="bg-primary text-primary border-primary rounded-xl border p-6">
<button className="bg-brand-solid text-white rounded-lg px-4 py-2">

// ❌ Wrong — breaks dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
<button className="bg-[#6938EF]">
```

**Never use `dark:` prefixes on MHL semantic tokens.** The CSS variables resolve the correct value for each mode automatically.

Common semantic classes:
- Background: `bg-primary`, `bg-primary-alt`, `bg-secondary`, `bg-brand-solid`
- Text: `text-primary`, `text-secondary`, `text-tertiary`
- Border: `border-primary`, `border-secondary`
- Ring: `ring-brand-500`, `ring-error`

---

## Class merging

Always use `cn()` to combine classes conditionally:

```tsx
import { cn } from "@/libs/utils";

// ✅ Correct
<div className={cn("rounded-xl p-4", isActive && "ring-2 ring-brand-500", className)}>

// ❌ Wrong — template literal loses deduplication
<div className={`rounded-xl p-4 ${isActive ? "ring-2" : ""}`}>
```

---

## Dark mode toggle

```tsx
import { useTheme } from "@maholan/theme";

const { mode, setMode } = useTheme();
// mode: "light" | "dark" | "system"
// setMode("dark") | setMode("light") | setMode("system")
```

---

## TypeScript

- Zero `any` — use proper types or `unknown`.
- Use `interface` for component props, `type` for unions.
- Always use inline `type` imports:
  ```ts
  import { Button, type ButtonProps } from "@/components/ui";
  ```

---

## Do not suggest

- `style={{}}` inline styles in components (use Tailwind classes)
- `dark:` prefixes on semantic token colors
- `leadingIcon` / `trailingIcon` on Button — use `iconLeading` / `iconTrailing`
- `<Modal.Header><Modal.Title>…` children pattern — use `<Modal.Header title="…" />`
- `<Tabs>`, `<Tabs.Tab>` — use `<Tabs.Root>`, `<Tabs.Item>`
- `getByTestId` in tests (use accessible role queries)
- `fireEvent` in tests (use `userEvent`)
- Default exports for components (named exports only)
- Hardcoded hex/hsl colors instead of token classes
