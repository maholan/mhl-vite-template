// ── Size configuration lookup ──────────────────────────────────────────────────
// Plain typed record (not CVA) — values depend on runtime state and are
// applied via cn() in the component.

export const inputTagOuterSizes = {
  sm: { gap: "gap-1.5", tagSize: "sm" as const },
  md: { gap: "gap-2", tagSize: "md" as const },
  lg: { gap: "gap-2", tagSize: "md" as const },
} as const;

export type InputTagOuterSize = keyof typeof inputTagOuterSizes;
