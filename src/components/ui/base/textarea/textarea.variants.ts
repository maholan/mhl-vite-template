import { cva, type VariantProps } from "class-variance-authority";

// ── TextAreaBase variants ─────────────────────────────────────────────────────
// All visual styles for the textarea element live here.
// State-specific ring overrides (focus, invalid, disabled) are applied in the
// component via className render props — they are NOT part of CVA.

export const textAreaBaseVariants = cva(
  [
    // Layout
    "w-full scroll-py-3 rounded-lg",
    // Surface
    "bg-primary text-primary shadow-xs",
    // Border (simulated via inset ring)
    "ring-1 ring-inset ring-primary",
    // Typography
    "text-md font-normal leading-6 placeholder:text-placeholder",
    // Autofill reset
    "autofill:rounded-lg autofill:text-primary",
    // Focus outline — ring handles focus state instead
    "focus:outline-none",
    // Transition
    "transition duration-100 ease-linear",
    // Hide the native resize handle (we render our own SVG overlay)
    "resize-y [&::-webkit-resizer]:opacity-0",
  ],
  {
    variants: {
      size: {
        sm: "px-3 py-2.5 text-sm min-h-10",
        md: "px-3.5 py-3 text-md min-h-12",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export type TextAreaBaseVariantProps = VariantProps<typeof textAreaBaseVariants>;

// ── TextField root variants ───────────────────────────────────────────────────

export const textAreaRootVariants = cva([
  "group flex h-max w-full flex-col items-start justify-start gap-1.5",
]);

export type TextAreaRootVariantProps = VariantProps<typeof textAreaRootVariants>;
