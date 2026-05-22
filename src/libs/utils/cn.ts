import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Extend tailwind-merge with MHL's custom text-size scale.
// tailwind-merge doesn't know about custom --text-* CSS variables, so without
// this it cannot deduplicate conflicting text-size classes correctly.
//
// Standard sizes (xs, sm, lg, xl…) are already in Tailwind's default scale.
// Custom additions that must be listed:
//   - `md`          → Tailwind uses `base`, not `md`
//   - `code-sm/md`  → MHL code typography scale
//   - `display-*`   → MHL display / heading scale
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "md",
        "code-sm",
        "code-md",
        "display-xs",
        "display-sm",
        "display-md",
        "display-lg",
        "display-xl",
        "display-2xl",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const cx = cn;

/**
 * Identity helper that lets Tailwind IntelliSense sort classes inside
 * style objects (which the plugin doesn't support natively).
 */
export function sortCx<
  T extends Record<
    string,
    string | number | Record<string, string | number | Record<string, string | number>>
  >,
>(classes: T): T {
  return classes;
}
