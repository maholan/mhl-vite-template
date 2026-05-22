import { cva } from "class-variance-authority";

// ── Card root ─────────────────────────────────────────────────────────────────

export const tableCardRootVariants = cva(
  "overflow-hidden rounded-xl bg-primary shadow-xs ring-1 ring-secondary"
);

// ── Card header ───────────────────────────────────────────────────────────────

export const tableCardHeaderVariants = cva(
  "relative flex flex-col items-start gap-4 border-b border-secondary bg-primary px-4 md:flex-row",
  {
    variants: {
      size: {
        sm: "py-4 md:px-5",
        md: "py-5 md:px-6",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// ── Table header (thead) ──────────────────────────────────────────────────────

export const tableHeaderVariants = cva("relative bg-secondary", {
  variants: {
    size: {
      sm: "h-9",
      md: "h-11",
    },
    bordered: {
      true: "[&>tr>th]:after:pointer-events-none [&>tr>th]:after:absolute [&>tr>th]:after:inset-x-0 [&>tr>th]:after:bottom-0 [&>tr>th]:after:h-px [&>tr>th]:after:bg-secondary [&>tr>th]:focus-visible:after:bg-transparent",
      false: "",
    },
  },
  defaultVariants: { size: "md", bordered: true },
});

// ── Column checkbox cell ──────────────────────────────────────────────────────

export const tableHeaderCheckboxVariants = cva("relative py-2 pr-0", {
  variants: {
    size: {
      sm: "w-9 pl-4 md:pl-5",
      md: "w-11 pl-4 md:pl-6",
    },
  },
  defaultVariants: { size: "md" },
});

// ── Column head (th) ──────────────────────────────────────────────────────────

export const tableHeadVariants = cva(
  "relative p-0 px-6 py-2 outline-hidden focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
);

// ── Sort icon ─────────────────────────────────────────────────────────────────

export const tableSortIconVariants = cva("size-3 stroke-[3px] text-icon-quaternary", {
  variants: {
    direction: {
      ascending: "rotate-180",
      descending: "",
    },
  },
});

// ── Row ───────────────────────────────────────────────────────────────────────

export const tableRowVariants = cva(
  [
    "relative transition-colors hover:bg-secondary",
    "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500",
    // Row separator via after pseudo-element (avoids border consuming space)
    "[&>td]:after:absolute [&>td]:after:inset-x-0 [&>td]:after:bottom-0 [&>td]:after:h-px [&>td]:after:w-full [&>td]:after:bg-secondary",
    "last:[&>td]:after:hidden [&>td]:focus-visible:after:opacity-0 focus-visible:[&>td]:after:opacity-0",
  ],
  {
    variants: {
      size: {
        sm: "h-14",
        md: "h-18",
      },
      highlightSelectedRow: {
        true: "selected:bg-secondary",
        false: "",
      },
    },
    defaultVariants: { size: "md", highlightSelectedRow: true },
  }
);

// ── Row checkbox cell ─────────────────────────────────────────────────────────

export const tableRowCheckboxVariants = cva("relative py-2 pr-0", {
  variants: {
    size: {
      sm: "pl-4 md:pl-5",
      md: "pl-4 md:pl-6",
    },
  },
  defaultVariants: { size: "md" },
});

// ── Cell ──────────────────────────────────────────────────────────────────────

export const tableCellVariants = cva(
  "relative text-sm text-tertiary focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500",
  {
    variants: {
      size: {
        sm: "px-5 py-3",
        md: "px-6 py-4",
      },
    },
    defaultVariants: { size: "md" },
  }
);
