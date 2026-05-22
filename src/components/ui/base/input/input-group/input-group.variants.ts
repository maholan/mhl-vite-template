import { cva, type VariantProps } from "class-variance-authority";

// ── Addon wrapper variants ────────────────────────────────────────────────────
// Styles for the leading / trailing addon divs (e.g. "$", "USD", "https://").
//
// The addon div is the OUTER visual container that owns the border/ring/bg of the
// attached pill.  The inner content (usually <InputPrefix>) provides only text
// colour.
//
// Size-based padding produces the SAME outer height as InputBase:
//   md → py-2   + text-sm leading-6 = 8+8+24 = 40 px  (h-10 input)
//   lg → py-2.5 + text-sm leading-6 = 10+10+24 = 44 px (h-11 input)
//
// NO `dark:` prefixes — semantic tokens handle dark mode automatically.

export const inputAddonVariants = cva(
  [
    // Layout
    "flex shrink-0 items-center",

    // Typography — leading-6 locks the content-height to 24 px so py-* gives
    // the exact same total height as InputBase's inner <input> element.
    "text-sm leading-6 text-tertiary",

    // Visual box
    "bg-primary shadow-xs ring-1 ring-primary ring-inset",
    "transition-shadow duration-100 ease-linear",

    // ── Disabled (from ancestor PrimitiveTextField via data-disabled) ─────
    "in-data-[disabled]:cursor-not-allowed in-data-[disabled]:bg-disable-subtle in-data-[disabled]:text-disable in-data-[disabled]:ring-disable-subtle",

    // ── Invalid (from ancestor PrimitiveTextField via data-invalid) ───────
    "in-data-[invalid]:ring-error-secondary",
  ],
  {
    variants: {
      // ── Position ──────────────────────────────────────────────────────────
      // leading: sits LEFT of the inner field, overlaps its left ring by 1 px.
      //          Inner field is z-10, so a single clean border line shows.
      // trailing: mirrors the above on the right side.
      position: {
        leading: ["rounded-l-lg", "-mr-px"],
        trailing: ["rounded-r-lg", "-ml-px"],
      },

      // ── Size ──────────────────────────────────────────────────────────────
      size: {
        md: "py-2 px-3.5",
        lg: "py-2.5 px-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type InputAddonVariantProps = VariantProps<typeof inputAddonVariants>;

// ── Inner field variants ──────────────────────────────────────────────────────
// The div that visually IS the "input box": holds the inline prefix text and
// the transparent InputBase.
//
// This element owns the ring, background, focus ring, and corner rounding.
// InputBase's own ring/shadow/bg are suppressed via TextField context
// (wrapperClassName) so this is the single visual source of truth.

export const inputGroupFieldVariants = cva(
  [
    // Layout — flex-1 so it fills the space between any addons
    "relative flex flex-1 flex-row items-center",

    // Visual box
    "rounded-lg bg-primary shadow-xs",
    "ring-1 ring-primary ring-inset",
    "transition-shadow duration-100 ease-linear",

    // z-10: field sits above the addon's overlapping -mr/-ml-px edge
    "z-10",

    // ── Focus ring — brand ─────────────────────────────────────────────────
    // CSS :focus-within fires when the <input> inside gains keyboard focus.
    "focus-within:ring-2 focus-within:ring-brand-600 focus-within:ring-inset",

    // ── Disabled ─────────────────────────────────────────────────────────
    "in-data-[disabled]:cursor-not-allowed in-data-[disabled]:bg-disable-subtle in-data-[disabled]:ring-disable-subtle",

    // ── Invalid default ring ──────────────────────────────────────────────
    "in-data-[invalid]:ring-error-secondary",

    // ── Invalid focused ring — overrides brand ring ────────────────────────
    // :is([data-invalid] *) adds attribute-selector specificity → beats plain
    // :focus-within selector above.
    "in-data-[invalid]:focus-within:ring-2 in-data-[invalid]:focus-within:ring-error in-data-[invalid]:focus-within:ring-inset",
  ],
  {
    variants: {
      // Remove the corner radius on the side adjacent to an addon so the
      // join appears seamless.
      hasLeading: {
        true: "rounded-l-none",
        false: "",
      },
      hasTrailing: {
        true: "rounded-r-none",
        false: "",
      },
    },
    defaultVariants: {
      hasLeading: false,
      hasTrailing: false,
    },
  }
);

export type InputGroupFieldVariantProps = VariantProps<typeof inputGroupFieldVariants>;

// ── InputPrefix content variants ──────────────────────────────────────────────
// Minimal styles for the <InputPrefix> content element rendered inside an addon
// wrapper or as a standalone inline element.
//
// The addon wrapper (inputAddonVariants) handles sizing and the visual border;
// InputPrefix only provides the text colour.

export const inputPrefixVariants = cva(
  [
    "flex items-center",

    // leading-6 keeps the element height consistent with the addon wrapper
    "text-sm leading-6 text-tertiary",

    // Disabled from parent
    "in-data-[disabled]:text-disable",
  ],
  {
    variants: {
      /**
       * Explicit disabled state for standalone usage outside an InputGroup.
       * When nested inside a disabled group, `in-data-[disabled]:` above handles it.
       */
      isDisabled: {
        true: "text-disable",
        false: "",
      },
    },
    defaultVariants: {
      isDisabled: false,
    },
  }
);

export type InputPrefixVariantProps = VariantProps<typeof inputPrefixVariants>;
