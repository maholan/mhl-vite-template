import { cva } from "class-variance-authority";

// ── Display input — plain <input> that bypasses React Aria's InputContext ──────
// InputBase sits inside InputGroup's TextField context; useContextProps merges
// context value on top of local props, so value={fileNames} is silently overridden.
// A plain <input> has no such context — value is always respected.

export const inputFileDisplayVariants = cva([
  "m-0 w-full min-w-0 flex-1 bg-transparent outline-hidden ring-0",
  "text-sm leading-6 text-primary",
  "placeholder:text-placeholder",
  "cursor-pointer select-none",
  // disabled state — driven by the ancestor data-[disabled] from InputGroup/TextField
  "in-data-[disabled]:cursor-not-allowed in-data-[disabled]:text-disable",
]);

export type InputFileDisplaySize = "md" | "lg";

export const inputFileDisplayPadding: Record<InputFileDisplaySize, string> = {
  md: "py-2 px-3",
  lg: "py-2.5 px-3.5",
};

// ── Upload button — rendered inside InputGroup's trailingAddon ────────────────
// The addon wrapper (inputAddonVariants) already owns all padding, height, and
// the visual border/ring. This button fills the entire wrapper so every pixel
// of the addon area is clickable — no dead zone inside the box.

export const inputFileButtonVariants = cva([
  "flex h-full w-full items-center justify-center gap-1",
  "bg-transparent",
  // text-sm + leading-6 matches inputAddonVariants so baselines align exactly
  "text-sm font-semibold text-secondary",
  "leading-6",
  "cursor-pointer select-none whitespace-nowrap",
  "outline-hidden transition-colors duration-100",
  "hover:text-secondary-hover",
  "active:scale-[0.98]",
  "disabled:cursor-not-allowed disabled:text-disable disabled:active:scale-100",
]);

export type InputFileSize = "md" | "lg";

// ── Spinner ───────────────────────────────────────────────────────────────────

export const inputFileSpinnerVariants = cva([
  "pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 z-10",
  "text-icon-quaternary",
]);
